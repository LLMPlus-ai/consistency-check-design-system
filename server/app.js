'use strict';
/*
 * app.js — request handler shared by the local HTTP server (server/index.js)
 * and the Vercel serverless function (api/index.js).
 *
 * State is loaded from the store at the start of every /api request and saved
 * after any mutation, so the same handlers run statelessly on serverless and
 * statefully on a long-running local server. Route handlers receive the loaded
 * `state` and call `db.save(state)` to persist.
 */
const fs = require('fs');
const path = require('path');
const db = require('./db');
const pipeline = require('./pipeline');
const architecture = require('./architecture');
const corpus = require('./corpus');
const nvidia = require('./nvidia');
const verify = require('./verify');

const ROOT = path.join(__dirname, '..');

/* ----------------------------- helpers ----------------------------- */
function nowTime() {
  const d = new Date();
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

function send(res, code, body, headers) {
  res.writeHead(code, Object.assign({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
  }, headers || {}));
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body); // Vercel pre-parses
    let data = '';
    req.on('data', (c) => { data += c; if (data.length > 5e6) req.destroy(); });
    req.on('end', () => { try { resolve(data ? JSON.parse(data) : {}); } catch { resolve({}); } });
    req.on('error', () => resolve({}));
  });
}

function appendAudit(state, actor, event, detail) {
  state.audit.push({ time: nowTime(), actor, event, detail });
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/babel; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.map': 'application/json',
};

function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname);
  // Redirect root to the app's real path so the HTML's relative asset URLs
  // (../../styles.css, data.js, *.jsx) resolve correctly — matching Vercel.
  if (rel === '/' || rel === '') {
    res.writeHead(302, { Location: '/ui_kits/consistency-check/index.html' });
    return res.end();
  }
  const filePath = path.normalize(path.join(ROOT, rel));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found: ' + rel); return; }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*' });
    fs.createReadStream(filePath).pipe(res);
  });
}

/* ----------------------------- routes ------------------------------ */
// Each handler: async (req, res, match, body, state). `state` is pre-loaded;
// handlers that mutate must call `await db.save(state)`.
const routes = [];
const on = (method, pattern, handler, opts) => routes.push([method, pattern, handler, opts || {}]);

// --- System / health ---
// Liveness of the FUNCTION, deliberately independent of the database so the app
// connects (and live verification works) even before the cc_state table exists.
on('GET', /^\/api\/health$/, (req, res) => {
  const cfg = nvidia.configured();
  send(res, 200, {
    ok: true,
    service: 'consistency-check-api',
    store: db.storeInfo().kind,
    models: { nvidia: cfg.openrouter, perplexity: cfg.perplexity },
    corpus: corpus.stats().count,
    time: new Date().toISOString(),
  });
}, { noState: true });

// --- Live AI models ---
on('GET', /^\/api\/llm\/status$/, (req, res) => {
  const cfg = nvidia.configured();
  send(res, 200, {
    providers: {
      nvidia: { name: 'NVIDIA Nemotron', via: 'OpenRouter', configured: cfg.openrouter, models: nvidia.MODELS },
      perplexity: { name: 'Perplexity', model: nvidia.MODELS.perplexity, configured: cfg.perplexity },
    },
    corpus: corpus.stats(),
    store: db.storeInfo().kind,
    mode: (cfg.openrouter || cfg.perplexity) ? 'live' : 'deterministic-only',
  });
}, { noState: true });

on('POST', /^\/api\/llm\/verify$/, async (req, res, m, body, s) => {
  if (!body || !body.citation) return send(res, 400, { error: 'citation required' });
  const result = await verify.verifyCitation({ citation: body.citation, proposition: body.proposition, holding: body.holding });
  appendAudit(s, 'AI Verification Engine', 'Live citation verification', `${body.citation} → ${result.status} (${result.confidence}%) via ${result.models.join(', ')}`);
  await db.save(s);
  send(res, 200, result);
});

on('POST', /^\/api\/llm\/extract$/, async (req, res, m, body) => {
  if (!body || !body.text) return send(res, 400, { error: 'text required' });
  send(res, 200, await verify.extractCitations(body.text));
}, { noState: true });

on('GET', /^\/api\/corpus$/, (req, res) => send(res, 200, { stats: corpus.stats(), cases: corpus.list().slice(0, 200) }), { noState: true });
on('GET', /^\/api\/corpus\/match$/, (req, res, m, b, s, url) => send(res, 200, corpus.match(url.searchParams.get('q') || '')), { noState: true });

// --- Architecture / catalogues ---
on('GET', /^\/api\/architecture$/, (req, res) => send(res, 200, architecture.model()), { noState: true });
on('GET', /^\/api\/pipeline\/stages$/, (req, res) => send(res, 200, { stages: pipeline.stageDefs() }), { noState: true });
on('GET', /^\/api\/engines$/, (req, res, m, b, s) => send(res, 200, { engines: s.engines }));

// --- Bootstrap + resource reads ---
on('GET', /^\/api\/bootstrap$/, (req, res, m, b, s) => send(res, 200, Object.assign({}, s, { scores: db.recomputeScores(s) })));
on('GET', /^\/api\/matter$/, (req, res, m, b, s) => send(res, 200, s.matter));
on('GET', /^\/api\/scores$/, (req, res, m, b, s) => send(res, 200, db.recomputeScores(s)));
on('GET', /^\/api\/findings$/, (req, res, m, b, s) => {
  send(res, 200, { findings: s.findings.map((f) => ({ ...f, review: s.reviews[f.id] || null, partnerApproved: !!s.partnerApproved[f.id] })) });
});
on('GET', /^\/api\/findings\/([\w-]+)$/, (req, res, m, b, s) => {
  const f = s.findings.find((x) => x.id === m[1]);
  if (!f) return send(res, 404, { error: 'finding not found' });
  send(res, 200, {
    ...f, review: s.reviews[f.id] || null, partnerApproved: !!s.partnerApproved[f.id],
    corpus: s.corpus[f.id] || null, analysis: s.analysis[f.id] || null,
    ratio: (s.ratioAnalysis || {})[f.id] || null, parallelCites: (s.parallelCites || {})[f.id] || null,
  });
});
on('GET', /^\/api\/queue$/, (req, res, m, b, s) => send(res, 200, { queue: s.queue, metrics: s.queueMetrics }));
on('GET', /^\/api\/audit$/, (req, res, m, b, s) => send(res, 200, { audit: s.audit }));
on('GET', /^\/api\/sources$/, (req, res, m, b, s) => send(res, 200, { sources: s.dataSources }));
on('GET', /^\/api\/source-library$/, (req, res, m, b, s) => send(res, 200, { sourceLibrary: s.sourceLibrary, discovered: s.discovered, promoted: s.promotedSources, stats: s.corpusStats }));
on('GET', /^\/api\/projects$/, (req, res, m, b, s) => send(res, 200, { projects: s.projects }));
on('GET', /^\/api\/documents$/, (req, res, m, b, s) => send(res, 200, { documents: s.documents }));
on('GET', /^\/api\/documents\/([\w-]+)$/, (req, res, m, b, s) => {
  const d = s.documents.find((x) => x.id === m[1]);
  if (!d) return send(res, 404, { error: 'document not found' });
  send(res, 200, d);
});
on('GET', /^\/api\/runs$/, (req, res, m, b, s) => send(res, 200, { runs: s.runs }));

// --- Inputs: register an uploaded document ---
on('POST', /^\/api\/documents$/, async (req, res, m, body, s) => {
  const id = 'doc-' + (s.documents.length + 1) + '-' + Date.now().toString(36);
  const doc = { id, name: body.name || 'Untitled.pdf', projectId: body.projectId || null, status: 'Uploaded', citations: null, uploadedAt: new Date().toISOString() };
  s.documents.push(doc);
  appendAudit(s, 'Consistency Check Engine', 'Document received', `${doc.name} queued for analysis.`);
  await db.save(s);
  send(res, 201, doc);
});

// --- Stage 2 + 3: run the verification pipeline ---
on('POST', /^\/api\/documents\/([\w-]+)\/analyze$/, async (req, res, m, body, s) => {
  const doc = s.documents.find((x) => x.id === m[1]);
  if (!doc) return send(res, 404, { error: 'document not found' });
  const result = pipeline.run(s, doc);
  result.startedAt = new Date().toISOString();
  result.finishedAt = result.startedAt;
  s.runs.push(result);
  doc.status = 'Analysed'; doc.citations = result.verdicts.length; doc.analysedAt = result.finishedAt;
  appendAudit(s, 'Consistency Check Engine', 'Document analysed',
    `${result.verdicts.length} citations extracted; ${result.tally.fabricated} fabricated, ${result.tally.mischaracterised} mischaracterised, ${result.tally.verified} verified.`);
  await db.save(s);
  send(res, 200, result);
});

// --- Stage 4: supervision ---
const DECISIONS = {
  Approved: { event: 'Citation approved', actor: 'Reviewer' },
  Amended: { event: 'Citation marked for amendment', actor: 'Reviewer' },
  Rejected: { event: 'Citation rejected', actor: 'Reviewer' },
  Escalated: { event: 'Finding escalated', actor: 'Partner Reviewer' },
};
on('POST', /^\/api\/findings\/([\w-]+)\/review$/, async (req, res, m, body, s) => {
  const f = s.findings.find((x) => x.id === m[1]);
  if (!f) return send(res, 404, { error: 'finding not found' });
  const decision = body.decision;
  if (!DECISIONS[decision]) return send(res, 400, { error: 'invalid decision' });
  s.reviews[f.id] = decision;
  if (body.note) s.amendments[f.id] = body.note;
  const meta = DECISIONS[decision];
  appendAudit(s, meta.actor, meta.event, `${meta.event}: ${f.citation}` + (body.note ? ` — ${body.note}` : ''));
  const q = s.queue.find((x) => x.citation === f.citation);
  if (q) q.status = decision === 'Approved' ? 'Approved' : decision === 'Rejected' ? 'Rejected' : decision === 'Amended' ? 'Amended' : 'Escalated';
  db.recomputeQueueMetrics(s);
  await db.save(s);
  send(res, 200, { id: f.id, review: decision, scores: db.recomputeScores(s), queueMetrics: s.queueMetrics });
});

on('POST', /^\/api\/findings\/([\w-]+)\/partner-approve$/, async (req, res, m, body, s) => {
  const f = s.findings.find((x) => x.id === m[1]);
  if (!f) return send(res, 404, { error: 'finding not found' });
  s.partnerApproved[f.id] = true;
  appendAudit(s, 'Partner Reviewer', 'Citation approved for filing', f.citation);
  await db.save(s);
  send(res, 200, { id: f.id, partnerApproved: true });
});
on('POST', /^\/api\/findings\/([\w-]+)\/partner-send-back$/, async (req, res, m, body, s) => {
  const f = s.findings.find((x) => x.id === m[1]);
  if (!f) return send(res, 404, { error: 'finding not found' });
  delete s.partnerApproved[f.id];
  appendAudit(s, 'Partner Reviewer', 'Citation sent back to associate', f.citation);
  await db.save(s);
  send(res, 200, { id: f.id, partnerApproved: false });
});

on('POST', /^\/api\/document-edits\/([\w-]+)$/, async (req, res, m, body, s) => {
  const id = m[1];
  if (body.revert) { delete s.docEdits[id]; appendAudit(s, 'Reviewer', 'Tracked change reverted', id); await db.save(s); return send(res, 200, { id, removed: true }); }
  const revised = body.mode === 'applied' ? (s.revisions[id] || body.revised) : body.revised;
  if (!revised) return send(res, 400, { error: 'no revision text' });
  s.docEdits[id] = { revised, mode: body.mode || 'manual' };
  appendAudit(s, 'Reviewer', body.mode === 'applied' ? 'Suggested fix applied' : 'Paragraph amended', id);
  await db.save(s);
  send(res, 200, { id, edit: s.docEdits[id] });
});

on('POST', /^\/api\/sources\/([\w-]+)\/promote$/, async (req, res, m, body, s) => {
  const id = m[1];
  const disc = s.discovered.find((d) => d.id === id);
  if (!disc) return send(res, 404, { error: 'discovered source not found' });
  if (!s.promotedSources.includes(id)) s.promotedSources.push(id);
  if (!s.sourceLibrary.find((x) => x.id === id)) {
    s.sourceLibrary.push({ id: disc.id, case: disc.case, citation: disc.citation, court: disc.court, jur: disc.jur, area: disc.area, year: null, promoted: true });
  }
  if (s.corpusStats) s.corpusStats.base += 1;
  appendAudit(s, 'Reviewer', 'Authority promoted to corpus', `${disc.case} ${disc.citation} (via ${disc.foundVia}).`);
  await db.save(s);
  send(res, 200, { id, promoted: true, stats: s.corpusStats });
});

// --- Reports ---
on('GET', /^\/api\/reports\/([\w-]+)$/, (req, res, m, b, s) => {
  const project = s.projects.find((p) => p.id === m[1]) || s.projects[0];
  const findings = s.findings.map((f) => ({
    id: f.id, citation: f.citation, status: f.status, risk: f.risk, confidence: f.confidence,
    recommendedAction: f.recommendedAction, review: s.reviews[f.id] || 'Pending', partnerApproved: !!s.partnerApproved[f.id],
  }));
  const reviewed = findings.filter((f) => f.review !== 'Pending').length;
  send(res, 200, {
    project, matter: s.matter, scores: db.recomputeScores(s), generatedAt: new Date().toISOString(),
    summary: s.matter.summary, findings,
    progress: { reviewed, total: findings.length, partnerApproved: findings.filter((f) => f.partnerApproved).length },
    readyForFiling: reviewed === findings.length && findings.every((f) => f.partnerApproved),
    audit: s.audit,
  });
});

// --- Reset ---
on('POST', /^\/api\/reset$/, async (req, res) => { await db.reset(); send(res, 200, { ok: true, reset: true }); }, { noState: true });

/* ----------------------------- dispatch ---------------------------- */
async function handle(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  if (req.method === 'OPTIONS') return send(res, 204, {});

  if (pathname.startsWith('/api/')) {
    const body = req.method === 'POST' ? await readBody(req) : null;
    for (const [method, pattern, handler, opts] of routes) {
      if (method !== req.method) continue;
      const match = pattern.exec(pathname);
      if (!match) continue;
      try {
        const state = opts.noState ? null : await db.load();
        return await handler(req, res, match, body, state, url);
      } catch (e) {
        console.error('[api]', pathname, e);
        return send(res, 500, { error: e.message });
      }
    }
    return send(res, 404, { error: 'no such endpoint', path: pathname });
  }

  serveStatic(req, res, pathname);
}

module.exports = { handle, serveStatic, send };
