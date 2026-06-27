'use strict';
/*
 * db.js — the "Database" box in the architecture diagram.
 *
 * An in-memory document store seeded from the canonical demo dataset and
 * persisted to disk (server/db.json) so supervision actions, pipeline runs and
 * audit events survive a server restart. POST /api/reset reseeds it.
 *
 * Shape (everything the UI bootstraps from `window.CCData`, plus runtime state):
 *   - all CCData collections (matter, findings, queue, audit, sources, …)
 *   - reviews            { [findingId]: 'Approved'|'Amended'|'Rejected'|'Escalated' }
 *   - partnerApproved    { [findingId]: true }
 *   - docEdits           { [findingId]: { revised, mode } }
 *   - amendments         { [findingId]: text }
 *   - promotedSources    [ id … ]   discovered authorities promoted into the corpus
 *   - documents          [ { id, name, status, uploadedAt, … } ]
 *   - runs               [ { id, documentId, stages[], startedAt, finishedAt } ]
 *   - meta               { seededAt, revision }
 */
const fs = require('fs');
const path = require('path');
const { loadSeed } = require('./seed-loader');

const DB_FILE = path.join(__dirname, 'db.json');
const seed = loadSeed();

let state = null;

function deepClone(v) { return JSON.parse(JSON.stringify(v)); }

function freshState(stamp) {
  const data = deepClone(seed.CCData);
  return Object.assign(data, {
    reviews: {},
    partnerApproved: {},
    docEdits: {},
    amendments: {},
    promotedSources: [],
    documents: [
      {
        id: 'doc-crestholm',
        name: 'Crestholm-skeleton-argument.pdf',
        projectId: 'crestholm',
        status: 'Analysed',
        citations: data.findings.length,
        uploadedAt: stamp,
        analysedAt: stamp,
      },
    ],
    runs: [],
    meta: { seededAt: stamp, revision: 1 },
  });
}

function persist() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2));
  } catch (e) {
    console.error('[db] persist failed:', e.message);
  }
}

function init(stamp) {
  if (fs.existsSync(DB_FILE)) {
    try {
      state = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      // Forward-compat: ensure newer runtime keys exist on an older db.json.
      const base = freshState(stamp);
      for (const k of Object.keys(base)) if (!(k in state)) state[k] = base[k];
      return state;
    } catch (e) {
      console.error('[db] db.json unreadable, reseeding:', e.message);
    }
  }
  state = freshState(stamp);
  persist();
  return state;
}

function reset(stamp) {
  state = freshState(stamp);
  persist();
  return state;
}

function get() { return state; }

/* Mutate under a function and persist once. Returns whatever fn returns. */
function tx(fn) {
  const out = fn(state);
  state.meta.revision += 1;
  persist();
  return out;
}

/* ---- Derived helpers (kept here so routes stay thin) ---- */

const seedGuardrails = seed.CCDefaultGuardrails;

// Recompute headline scores + queue metrics from current findings using the
// SAME flow engine the client uses, so the API and UI never disagree.
function recomputeScores() {
  const flow = seed.CCFlow;
  const findings = state.findings;
  const g = seedGuardrails;
  const s = flow.summary(findings, g);
  const verified = findings.filter((f) => f.status === 'Verified').length;
  const mischar = findings.filter((f) => f.status === 'Mischaracterised').length;
  const fabricated = findings.filter((f) => f.status === 'Fabricated').length;
  // Health: verified weigh full, mischaracterised half, fabricated zero.
  const health = findings.length
    ? Math.round(((verified + mischar * 0.5) / findings.length) * 100)
    : 100;
  const avgConf = findings.length
    ? Math.round(findings.reduce((a, f) => a + (f.confidence || 0), 0) / findings.length)
    : 0;
  return {
    total: findings.length,
    verified,
    mischaracterised: mischar,
    fabricated,
    health,
    confidence: avgConf,
    risk: state.scores.risk,
    action: state.scores.action,
    pass: s.pass,
    review: s.review,
    readyToFile: s.readyToFile,
  };
}

module.exports = {
  init,
  reset,
  get,
  tx,
  persist,
  recomputeScores,
  seed,
  DB_FILE,
};
