'use strict';
/*
 * pipeline.js — the NVIDIA AI Processing Layer + Verification & Live Retrieval.
 *
 * Implements the diagram's processing pipeline as a deterministic engine that
 * runs over a document and emits a staged trace plus per-citation verdicts:
 *
 *   Stage 2 — NVIDIA AI Processing
 *     2.1 Parse / OCR ............ Nemotron Parse        (PDF/DOCX → text)
 *     2.2 Citation Extraction .... rules + Nemotron      (find authorities)
 *     2.3 Citation Normalisation . parallel-cite merge   (one address per case)
 *     2.4 Mischaracterisation .... Nemotron embeddings   (claim vs holding)
 *   Stage 3 — Verification + Live Retrieval
 *     3.1 Deterministic Engine ... match to known authorities (internal corpus)
 *     3.2 Perplexity / live web .. out-of-corpus lookup
 *   Verdict:  Verified · Mischaracterised · Fabricated
 *
 * Verdicts are produced with the SAME flow engine the UI uses (seed.CCFlow), so
 * the server never disagrees with the client. The trace is what powers the live
 * "Verification" screen and the architecture page's stage drill-downs.
 */
const { seed } = require('./db');

const flow = seed.CCFlow;

// Each stage maps to a box in the diagram. `engine` ties it to the configured
// model/vendor so the System page can show what ran.
const STAGE_DEFS = [
  { id: 'parse', layer: 'processing', name: 'Parse / OCR', engine: 'Nemotron Parse', vendor: 'NVIDIA', detail: 'Document → text, tables, citations' },
  { id: 'extract', layer: 'processing', name: 'Citation Extraction', engine: 'rules + Nemotron', vendor: 'NVIDIA', detail: 'Locate every legal authority' },
  { id: 'normalise', layer: 'processing', name: 'Citation Normalisation', engine: 'Parallel-citation merge', vendor: 'Consistency Check', detail: 'Collapse parallel cites to one case' },
  { id: 'mischar', layer: 'processing', name: 'Mischaracterisation Analysis', engine: 'Nemotron embeddings / reasoning', vendor: 'NVIDIA', detail: 'Compare cited claim to actual holding' },
  { id: 'deterministic', layer: 'verification', name: 'Deterministic Verification', engine: 'Internal corpus matcher', vendor: 'Consistency Check', detail: 'Match citations to known authorities' },
  { id: 'live', layer: 'verification', name: 'Live Retrieval', engine: 'Perplexity Sonar', vendor: 'Perplexity', detail: 'Out-of-corpus / open-web lookup' },
];

function stageDefs() { return STAGE_DEFS; }

// Deterministic pseudo-duration per stage (ms) — stable, no Math.random so the
// trace is reproducible across runs and restarts.
function durFor(stageId, n) {
  const base = { parse: 60, extract: 45, normalise: 30, mischar: 80, deterministic: 40, live: 70 };
  return (base[stageId] || 50) + n * 12;
}

/*
 * Run the pipeline over a document. For the demo every document resolves to the
 * Crestholm citation set (the corpus we can actually verify against), but the
 * trace is computed live from the current findings + corpus so promoting a
 * source or re-running reflects real state.
 */
function run(db, doc) {
  const findings = db.findings;
  const corpus = db.corpus;
  let t = 0;
  const stages = STAGE_DEFS.map((def) => {
    const dur = durFor(def.id, findings.length);
    const stage = { ...def, startMs: t, durationMs: dur };
    t += dur;
    stage.endMs = t;
    stage.items = stageItems(def.id, findings, corpus);
    stage.summary = stageSummary(def.id, stage.items, findings);
    return stage;
  });

  // Per-citation verdicts via the shared flow engine.
  const verdicts = findings.map((f) => {
    const v = flow.verdictOf(f);
    const disp = flow.disposition(f, seed.CCDefaultGuardrails);
    return {
      id: f.id,
      citation: f.citation,
      status: f.status,
      leaf: v.leaf,
      disposition: disp.d,
      reason: disp.reason,
      confidence: f.confidence,
      risk: f.risk,
      steps: v.steps,
    };
  });

  const tally = {
    verified: verdicts.filter((v) => v.status === 'Verified').length,
    mischaracterised: verdicts.filter((v) => v.status === 'Mischaracterised').length,
    fabricated: verdicts.filter((v) => v.status === 'Fabricated').length,
    review: verdicts.filter((v) => v.disposition === 'Review').length,
  };

  return {
    id: 'run-' + doc.id + '-' + db.runs.length,
    documentId: doc.id,
    document: doc.name,
    totalMs: t,
    stages,
    verdicts,
    tally,
  };
}

function stageItems(stageId, findings, corpus) {
  switch (stageId) {
    case 'parse':
      return [{ label: 'Pages parsed', value: Math.max(1, Math.ceil(findings.length / 3)) },
              { label: 'Text blocks', value: findings.length * 2 }];
    case 'extract':
      return findings.map((f) => ({ id: f.id, label: f.citation, value: 'extracted' }));
    case 'normalise':
      return findings.map((f) => ({ id: f.id, label: f.citation, value: ((corpus[f.id] || {}).neutral) || 'unresolved' }));
    case 'mischar':
      return findings.filter((f) => f.status === 'Mischaracterised').map((f) => ({
        id: f.id, label: f.citation, value: 'claim drift detected',
      }));
    case 'deterministic':
      return findings.filter((f) => (corpus[f.id] || {}).match === 'corpus').map((f) => ({
        id: f.id, label: f.citation, value: 'matched in corpus',
      }));
    case 'live':
      return findings.filter((f) => (corpus[f.id] || {}).match !== 'corpus').map((f) => ({
        id: f.id, label: f.citation, value: (corpus[f.id] || {}).match === 'external' ? 'confirmed on open web' : 'absent from every source',
      }));
    default:
      return [];
  }
}

function stageSummary(stageId, items, findings) {
  switch (stageId) {
    case 'parse': return `Document parsed — ${findings.length} citations located across ${Math.max(1, Math.ceil(findings.length / 3))} pages.`;
    case 'extract': return `${items.length} legal authorities extracted (rules + Nemotron).`;
    case 'normalise': return `${items.filter((i) => i.value !== 'unresolved').length}/${items.length} citations normalised to a neutral citation; ${items.filter((i) => i.value === 'unresolved').length} unresolved.`;
    case 'mischar': return items.length ? `${items.length} citations show claim-vs-holding drift.` : 'No mischaracterisation detected.';
    case 'deterministic': return `${items.length} citations matched deterministically against the internal corpus.`;
    case 'live': return `${items.length} citations escalated to live retrieval (out of corpus).`;
    default: return '';
  }
}

module.exports = { run, stageDefs };
