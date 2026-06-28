'use strict';
/*
 * corpus.js — the "Case-Law Corpus / internal authority database" box.
 *
 * Loads the sanitized corpus snapshot (server/corpus.json, produced by
 * scripts/ingest-corpus.js from the real UK/Commonwealth case files) and
 * provides deterministic verification: given a citation or case name, is this
 * authority actually in the trusted corpus? This is the local, free, fast first
 * leg of the verification engine — Perplexity is only consulted when this misses.
 */
// require() the JSON so serverless bundlers (Vercel) include it automatically.
let corpus = { generatedAt: null, count: 0, cases: [], index: {} };
try {
  corpus = require('./corpus.json');
} catch (e) { console.error('[corpus] failed to load corpus.json:', e.message); }

function norm(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }

function byId(id) { return corpus.cases.find((c) => c.id === id) || null; }

// Pull citation-like tokens out of a free-text reference for index lookups.
function citationKeys(text) {
  const out = [];
  const re = /(\[\d{4}\]\s*[A-Z][A-Za-z. ]*?\d+(?:\s*\([A-Za-z]+\))?|\(\d{4}\)\s*\d+\s*[A-Z][A-Za-z &]*?\d+)/g;
  let m; while ((m = re.exec(text))) out.push(norm(m[0]));
  return out;
}

/*
 * Match a free-text citation/case reference against the corpus.
 * Returns { found, confidence, method, case } where method ∈
 * exact-citation | exact-name | fuzzy-name | none.
 */
function match(reference) {
  const ref = String(reference || '');
  const nref = norm(ref);
  if (!nref) return { found: false, confidence: 0, method: 'none', case: null };

  // 1) Exact citation hit (strongest, deterministic).
  for (const k of citationKeys(ref)) {
    if (corpus.index[k]) return { found: true, confidence: 99, method: 'exact-citation', case: byId(corpus.index[k]) };
  }
  // 2) Exact normalised name / full-reference hit.
  if (corpus.index[nref]) return { found: true, confidence: 96, method: 'exact-name', case: byId(corpus.index[nref]) };
  // The part before the citation brackets ("Lumley v Gye [1853]…" → "lumley v gye").
  const nameOnly = norm(ref.replace(/[\[(].*$/, ''));
  if (nameOnly.length > 3 && corpus.index[nameOnly]) {
    return { found: true, confidence: 94, method: 'exact-name', case: byId(corpus.index[nameOnly]) };
  }
  // 3) Fuzzy: token overlap on the "X v Y" party names.
  const partyTokens = new Set(nameOnly.split(' ').filter((w) => w.length > 2 && w !== 'and' && w !== 'ltd'));
  if (partyTokens.size >= 1) {
    let best = null, bestScore = 0;
    for (const c of corpus.cases) {
      const cn = norm((c.case || '').replace(/[\[(].*$/, ''));
      const ctoks = new Set(cn.split(' ').filter((w) => w.length > 2));
      let overlap = 0; partyTokens.forEach((t) => { if (ctoks.has(t)) overlap += 1; });
      const score = overlap / Math.max(partyTokens.size, 1);
      if (score > bestScore) { bestScore = score; best = c; }
    }
    if (best && bestScore >= 0.6) {
      return { found: true, confidence: Math.round(60 + bestScore * 30), method: 'fuzzy-name', case: best };
    }
  }
  return { found: false, confidence: 0, method: 'none', case: null };
}

function stats() {
  return {
    count: corpus.count,
    indexKeys: Object.keys(corpus.index || {}).length,
    generatedAt: corpus.generatedAt,
    source: corpus.source || null,
  };
}

function list() { return corpus.cases; }

module.exports = { match, stats, list, byId, loaded: corpus.count > 0 };
