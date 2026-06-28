'use strict';
/*
 * verify.js — live citation verification orchestrator (Stages 3 + 2.4).
 *
 * Implements the decision flow from the architecture diagram against REAL
 * services and data:
 *
 *   1. Deterministic Verification — corpus.match() against the trusted UK
 *      case-law corpus (local, free, fast).
 *   2. Live Retrieval — if absent from corpus, ask Perplexity `sonar` whether
 *      the authority exists on the open web.
 *   3. Mischaracterisation Analysis — if the authority exists, ask NVIDIA
 *      Nemotron whether the proposition it is cited for matches the actual
 *      holding (Verified vs Mischaracterised).
 *
 * Yields: Verified · Mischaracterised · Fabricated  + confidence + explanation
 * + a step-by-step trace (for transparency / audit — Challenge 1).
 *
 * Degrades gracefully: with no API keys it returns the deterministic corpus
 * result alone, clearly labelled, rather than failing.
 */
const corpus = require('./corpus');
const nvidia = require('./nvidia');

async function existsOnWeb(citation) {
  const sys = 'You are a UK legal research assistant. Answer ONLY with strict JSON.';
  const q = `Does the following legal authority genuinely exist (is it a real, reported case)? `
    + `Citation: "${citation}". Reply as JSON: {"exists": true|false, "court": string, "year": number|null, "confidence": "high"|"medium"|"low", "notes": string}.`;
  const r = await nvidia.perplexity(q, { system: sys, maxTokens: 300 });
  const json = nvidia.parseJSON(r.text) || {};
  return { exists: !!json.exists, court: json.court || null, year: json.year || null, confidence: json.confidence || 'low', notes: json.notes || r.text.slice(0, 240), citations: r.citations || [] };
}

async function fidelityCheck({ citation, proposition, holding }) {
  const sys = 'You are a senior UK litigation partner assessing whether a cited authority fairly supports the proposition it is cited for, the way a court would expect. Answer ONLY with strict JSON.';
  const user = [
    `Citation: ${citation}`,
    proposition ? `Cited in the document for this proposition: "${proposition}"` : 'Cited proposition: (not supplied)',
    holding ? `Actual holding / ratio of the case: "${holding}"` : '',
    '',
    'Calibration — judge as a practising litigator, not a pedant:',
    '• "Verified" — the authority genuinely supports the proposition. A fair, modern, or reasonably generalised statement of a principle the case established IS verified, even if the original ratio was narrower or has since been restated by later cases. Established propositions stated at their normal level of generality are Verified.',
    '• "Mischaracterised" — the authority is cited for something it does NOT support: the WRONG measure/limb of damages, a materially broader or different proposition than it decides, or a holding it reached on different facts. Reserve this for genuine distortions a court would object to (e.g. citing a reliance-loss case for expectation/lost-profit damages, or a negotiating-damages case for ordinary lost profits).',
    '',
    'Default to "Verified" unless there is a clear, material distortion. Reply as JSON:',
    '{"verdict": "Verified"|"Mischaracterised", "fidelity": 0-100, "explanation": string}.',
    'fidelity is your confidence (0-100) that the citation is used faithfully; use >=80 for Verified, <=45 for Mischaracterised.',
  ].join('\n');
  const r = await nvidia.nemotron([
    { role: 'system', content: sys },
    { role: 'user', content: user },
  ], { tier: 'super', json: true, maxTokens: 500 });
  const json = nvidia.parseJSON(r.text) || {};
  return {
    verdict: json.verdict === 'Mischaracterised' ? 'Mischaracterised' : 'Verified',
    fidelity: typeof json.fidelity === 'number' ? json.fidelity : null,
    explanation: json.explanation || r.text.slice(0, 400),
    model: r.model,
  };
}

/*
 * Verify one citation end-to-end. Options:
 *   citation     (required) — the citation string as it appears in the document
 *   proposition  — what the document cites it for (enables mischar analysis)
 *   holding      — known holding (from corpus grounding) if available
 */
async function verifyCitation({ citation, proposition, holding }) {
  const cfg = nvidia.configured();
  const trace = [];
  const t0 = Date.now();

  // Stage 1 — deterministic corpus match.
  const local = corpus.match(citation);
  trace.push({ stage: 'Deterministic corpus match', engine: 'internal corpus', result: local.found ? `matched (${local.method}, ${local.confidence}%)` : 'no match', detail: local.case ? local.case.case : null });

  let existence = local.found ? 'confirmed-internal' : null;
  let resolvedHolding = holding || (local.case && local.case.holding) || null;
  let webNotes = null;

  // Stage 2 — live retrieval if absent locally.
  if (!local.found) {
    if (cfg.perplexity) {
      try {
        const web = await existsOnWeb(citation);
        webNotes = web.notes;
        existence = web.exists ? 'confirmed-external' : 'absent';
        trace.push({ stage: 'Live retrieval', engine: 'Perplexity sonar', result: web.exists ? `exists on open web (${web.confidence})` : 'absent from open web', detail: web.notes });
      } catch (e) {
        trace.push({ stage: 'Live retrieval', engine: 'Perplexity sonar', result: 'error', detail: e.message });
        existence = 'unknown';
      }
    } else {
      trace.push({ stage: 'Live retrieval', engine: 'Perplexity sonar', result: 'skipped — no API key', detail: null });
      existence = 'unknown-offline';
    }
  }

  // Decide fabricated vs (verify/mischar).
  if (existence === 'absent') {
    return finalize({ citation, status: 'Fabricated', existence, confidence: 92, explanation: 'No reliable match in the trusted corpus or on open-web search. Treat as suspected fabrication — partner verification required.', trace, t0, models: usedModels(cfg, true) });
  }
  if (existence === 'unknown-offline' || existence === 'unknown') {
    return finalize({ citation, status: 'Unverified', existence, confidence: 40, explanation: 'Not found in the local corpus; live web verification was unavailable. Manual check required.', trace, t0, models: usedModels(cfg, false) });
  }

  // Stage 3 — mischaracterisation analysis (authority exists).
  if (cfg.openrouter && proposition) {
    try {
      const fid = await fidelityCheck({ citation, proposition, holding: resolvedHolding });
      trace.push({ stage: 'Mischaracterisation analysis', engine: 'NVIDIA Nemotron (super)', result: fid.verdict + (fid.fidelity != null ? ` · fidelity ${fid.fidelity}%` : ''), detail: fid.explanation });
      // Confidence is confidence IN THE VERDICT. For a faithful citation that is
      // the fidelity; for a mischaracterisation, low fidelity means HIGH
      // confidence the authority is misused — so invert it.
      const conf = fid.verdict === 'Mischaracterised'
        ? (fid.fidelity != null ? Math.max(60, 100 - fid.fidelity) : 75)
        : (fid.fidelity != null ? fid.fidelity : (existence === 'confirmed-internal' ? 90 : 80));
      return finalize({ citation, status: fid.verdict, existence, confidence: conf, fidelity: fid.fidelity, explanation: fid.explanation, trace, t0, models: usedModels(cfg, !local.found) });
    } catch (e) {
      trace.push({ stage: 'Mischaracterisation analysis', engine: 'NVIDIA Nemotron (super)', result: 'error', detail: e.message });
    }
  } else {
    trace.push({ stage: 'Mischaracterisation analysis', engine: 'NVIDIA Nemotron', result: cfg.openrouter ? 'skipped — no proposition supplied' : 'skipped — no API key', detail: null });
  }

  // Existence-only verdict (authority confirmed, fidelity not assessed live).
  return finalize({ citation, status: 'Verified', existence, confidence: existence === 'confirmed-internal' ? 88 : 78,
    explanation: existence === 'confirmed-internal' ? 'Authority confirmed in the trusted corpus.' : 'Authority confirmed on open-web search (outside the curated corpus — verify quotation manually).',
    trace, t0, models: usedModels(cfg, !local.found), webNotes });
}

function usedModels(cfg, usedWeb) {
  const m = [];
  if (cfg.openrouter) m.push('NVIDIA Nemotron (OpenRouter)');
  if (usedWeb && cfg.perplexity) m.push('Perplexity sonar');
  m.push('Deterministic corpus');
  return m;
}

function finalize({ citation, status, existence, confidence, fidelity, explanation, trace, t0, models, webNotes }) {
  return { citation, status, existence, confidence, fidelity: fidelity != null ? fidelity : null, explanation, models, webNotes: webNotes || null, durationMs: Date.now() - t0, trace, live: true };
}

/* Extract citations from free document text using Nemotron (falls back to the
 * client-side regex detector shape when no key is configured). */
async function extractCitations(text) {
  const cfg = nvidia.configured();
  if (!cfg.openrouter) return { live: false, citations: regexExtract(text) };
  const sys = 'You extract legal case citations from UK legal documents. Answer ONLY with strict JSON.';
  const user = `Extract every case citation from the text below. For each, give the case name, the neutral/reported citation, and the proposition it is cited for. Reply as JSON: {"citations":[{"case":string,"citation":string,"proposition":string}]}.\n\nTEXT:\n${text.slice(0, 6000)}`;
  try {
    const r = await nvidia.nemotron([{ role: 'system', content: sys }, { role: 'user', content: user }], { tier: 'super', json: true, maxTokens: 900 });
    const json = nvidia.parseJSON(r.text) || {};
    return { live: true, model: r.model, citations: Array.isArray(json.citations) ? json.citations : [] };
  } catch (e) {
    return { live: false, error: e.message, citations: regexExtract(text) };
  }
}

function regexExtract(text) {
  const out = []; const seen = new Set();
  const re = /\b([A-Z][A-Za-z'’.&-]+(?:\s+[A-Z][A-Za-z'’.&-]+){0,4})\s+v\.?\s+([A-Z][A-Za-z'’.&-]+(?:\s+[A-Z][A-Za-z'’.&-]+){0,4})/g;
  let m; while ((m = re.exec(text)) && out.length < 60) { const s = m[0].replace(/\s+/g, ' ').trim(); if (!seen.has(s)) { seen.add(s); out.push({ case: s, citation: '', proposition: '' }); } }
  return out;
}

module.exports = { verifyCitation, extractCitations };
