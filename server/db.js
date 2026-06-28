'use strict';
/*
 * db.js — the runtime document store, backed by server/store.js.
 *
 * State is loaded from and saved to the configured backend (Supabase / Postgres
 * / file) on each request, so it works on stateless serverless functions. The
 * static reference data (matter, findings, corpus, analysis…) is seeded from
 * data.js/flow.js; only the mutable overlay (reviews, audit, documents, runs…)
 * changes and is persisted.
 *
 * Async interface:
 *   load()            → current state (seeds + persists on first ever call)
 *   save(state)       → bump revision + persist
 *   reset(stamp)      → reseed + persist
 *   recomputeScores(state)  → headline scores from current findings
 */
const { loadSeed } = require('./seed-loader');
const store = require('./store');

const seed = loadSeed();

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

// Forward-compat: make sure a state loaded from an older snapshot has every key.
function ensureKeys(state, stamp) {
  const base = freshState(stamp);
  for (const k of Object.keys(base)) if (!(k in state)) state[k] = base[k];
  return state;
}

async function load() {
  const raw = await store.loadRaw();
  if (raw && raw.data) return ensureKeys(raw.data, raw.data.meta ? raw.data.meta.seededAt : nowStamp());
  const state = freshState(nowStamp());
  await store.saveRaw(state, state.meta.revision);
  return state;
}

async function save(state) {
  state.meta.revision = (state.meta.revision || 0) + 1;
  await store.saveRaw(state, state.meta.revision);
  return state;
}

async function reset(stamp) {
  const state = freshState(stamp || nowStamp());
  await store.saveRaw(state, state.meta.revision);
  return state;
}

function nowStamp() { return new Date().toISOString(); }

const seedGuardrails = seed.CCDefaultGuardrails;

// Recompute headline scores from the current findings using the SAME flow
// engine the client uses. Citation health is curated reference data (58/100) —
// it reflects the citations, not review progress — so it is preserved.
function recomputeScores(state) {
  const flow = seed.CCFlow;
  const findings = state.findings;
  const s = flow.summary(findings, seedGuardrails);
  return {
    total: findings.length,
    verified: findings.filter((f) => f.status === 'Verified').length,
    mischaracterised: findings.filter((f) => f.status === 'Mischaracterised').length,
    fabricated: findings.filter((f) => f.status === 'Fabricated').length,
    health: state.scores.health,
    confidence: state.scores.confidence,
    risk: state.scores.risk,
    action: state.scores.action,
    pass: s.pass,
    review: s.review,
    readyToFile: s.readyToFile,
  };
}

function recomputeQueueMetrics(state) {
  const open = state.queue.filter((q) => q.status === 'Pending Review' || q.status === 'Needs Amendment').length;
  state.queueMetrics = {
    open,
    critical: state.queue.filter((q) => q.priority === 'Critical' && (q.status === 'Pending Review' || q.status === 'Needs Amendment')).length,
    high: state.queue.filter((q) => q.priority === 'High' && (q.status === 'Pending Review' || q.status === 'Needs Amendment')).length,
    approved: state.queue.filter((q) => q.status === 'Approved').length,
    readyForFiling: open === 0 ? 'Yes' : 'No',
  };
  return state.queueMetrics;
}

module.exports = {
  load,
  save,
  reset,
  recomputeScores,
  recomputeQueueMetrics,
  freshState,
  seed,
  storeInfo: store.info,
};
