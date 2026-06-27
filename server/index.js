'use strict';
/*
 * index.js — Consistency Check back-end.
 *
 * A dependency-free Node http server (no npm install required) that provides
 * the four "Application Infrastructure" boxes from the system diagram:
 *   • API      — the REST endpoints below
 *   • Database — server/db.js (persisted in-memory store)
 *   • Reports  — /api/reports/:projectId
 *   • UI       — serves the existing React design-system front-end statically
 *
 * Run:  node server/index.js      then open  http://localhost:4000/
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./db');
const pipeline = require('./pipeline');
const architecture = require('./architecture');

const PORT = process.env.PORT || 4000;
const ROOT = path.join(__dirname, '..');

db.init(new Date().toISOString());

/* ----------------------------- helpers ----------------------------- */

function nowTime() {
  const d = new Date();
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

function send(res, code, body, headers) {
  const json = JSON.stringify(body);
  res.writeHead(code, Object.assign({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
  }, headers || {}));
  res.end(json);
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => { data += c; if (data.length > 5e6) req.destroy(); });
    req.on('end', () => { try { resolve(data ? JSON.parse(data) : {}); } catch { resolve({}); } });
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
  if (rel === '/' || rel === '') rel = '/ui_kits/consistency-check/index.html';
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
// Each entry: [method, RegExp, handler(req,res,match,body)]
const routes = [];
const on = (method, pattern, handler) => routes.push([method, pattern, handler]);

// Health / liveness — drives the "Backend connected" status chip.
on('GET', /^\/api\/health$/, (req, res) => {
  const s = db.get();
  send(res, 200, {
    ok: true,
    service: 'consistency-check-api',
    revision: s.meta.revision,
    seededAt: s.meta.seededAt,
    findings: s.findings.length,
    queueOpen: s.queue.filter((q) => q.status === 'Pending Review' || q.status === 'Needs Amendment').length,
    uptime: Math.round(process.uptime()),
    time: new Date().toISOString(),
  });
});

// Architecture model (the diagram) + pipeline stage catalogue.
on('GET', /^\/api\/architecture$/, (req, res) => send(res, 200, architecture.model()));
on('GET', /^\/api\/pipeline\/stages$/, (req, res) => send(res, 200, { stages: pipeline.stageDefs() }));
on('GET', /^\/api\/engines$/, (req, res) => send(res, 200, { engines: db.get().engines }));

// Full snapshot for the client bootstrap (everything window.CCData needs +
// runtime overlay state so reloads restore supervision decisions).
on('GET', /^\/api\/bootstrap$/, (req, res) => {
  const s = db.get();
  send(res, 200, Object.assign({}, s, { scores: db.recomputeScores() }));
});

// Resource reads.
on('GET', /^\/api\/matter$/, (req, res) => send(res, 200, db.get().matter));
on('GET', /^\/api\/scores$/, (req, res) => send(res, 200, db.recomputeScores()));
on('GET', /^\/api\/findings$/, (req, res) => {
  const s = db.get();
  const items = s.findings.map((f) => ({
    ...f,
    review: s.reviews[f.id] || null,
    partnerApproved: !!s.partnerApproved[f.id],
  }));
  send(res, 200, { findings: items });
});
on('GET', /^\/api\/findings\/([\w-]+)$/, (req, res, m) => {
  const s = db.get();
  const f = s.findings.find((x) => x.id === m[1]);
  if (!f) return send(res, 404, { error: 'finding not found' });
  send(res, 200, {
    ...f,
    review: s.reviews[f.id] || null,
    partnerApproved: !!s.partnerApproved[f.id],
    corpus: s.corpus[f.id] || null,
    analysis: s.analysis[f.id] || null,
    ratio: (s.ratioAnalysis || {})[f.id] || null,
    parallelCites: (s.parallelCites || {})[f.id] || null,
  });
});
on('GET', /^\/api\/queue$/, (req, res) => send(res, 200, { queue: db.get().queue, metrics: db.get().queueMetrics }));
on('GET', /^\/api\/audit$/, (req, res) => send(res, 200, { audit: db.get().audit }));
on('GET', /^\/api\/sources$/, (req, res) => send(res, 200, { sources: db.get().dataSources }));
on('GET', /^\/api\/source-library$/, (req, res) => {
  const s = db.get();
  send(res, 200, { sourceLibrary: s.sourceLibrary, discovered: s.discovered, promoted: s.promotedSources, stats: s.corpusStats });
});
on('GET', /^\/api\/projects$/, (req, res) => send(res, 200, { projects: db.get().projects }));
on('GET', /^\/api\/documents$/, (req, res) => send(res, 200, { documents: db.get().documents }));
on('GET', /^\/api\/documents\/([\w-]+)$/, (req, res, m) => {
  const d = db.get().documents.find((x) => x.id === m[1]);
  if (!d) return send(res, 404, { error: 'document not found' });
  send(res, 200, d);
});
on('GET', /^\/api\/runs$/, (req, res) => send(res, 200, { runs: db.get().runs }));

// ---- Inputs: register an uploaded document ----
on('POST', /^\/api\/documents$/, (req, res, m, body) => {
  const out = db.tx((s) => {
    const id = 'doc-' + (s.documents.length + 1) + '-' + Date.now().toString(36);
    const doc = {
      id,
      name: body.name || 'Untitled.pdf',
      projectId: body.projectId || null,
      status: 'Uploaded',
      citations: null,
      uploadedAt: new Date().toISOString(),
    };
    s.documents.push(doc);
    appendAudit(s, 'Consistency Check Engine', 'Document received', `${doc.name} queued for analysis.`);
    return doc;
  });
  send(res, 201, out);
});

// ---- Stage 2 + 3: run the verification pipeline over a document ----
on('POST', /^\/api\/documents\/([\w-]+)\/analyze$/, (req, res, m) => {
  const out = db.tx((s) => {
    const doc = s.documents.find((x) => x.id === m[1]);
    if (!doc) return { error: 'document not found' };
    const result = pipeline.run(s, doc);
    result.startedAt = new Date().toISOString();
    result.finishedAt = new Date().toISOString();
    s.runs.push(result);
    doc.status = 'Analysed';
    doc.citations = result.verdicts.length;
    doc.analysedAt = result.finishedAt;
    appendAudit(s, 'Consistency Check Engine', 'Document analysed',
      `${result.verdicts.length} citations extracted; ${result.tally.fabricated} fabricated, ${result.tally.mischaracterised} mischaracterised, ${result.tally.verified} verified.`);
    return result;
  });
  if (out.error) return send(res, 404, out);
  send(res, 200, out);
});

// ---- Stage 4: human supervision — per-citation decisions ----
const DECISIONS = {
  Approved: { event: 'Citation approved', actor: 'Reviewer' },
  Amended: { event: 'Citation marked for amendment', actor: 'Reviewer' },
  Rejected: { event: 'Citation rejected', actor: 'Reviewer' },
  Escalated: { event: 'Finding escalated', actor: 'Partner Reviewer' },
};
on('POST', /^\/api\/findings\/([\w-]+)\/review$/, (req, res, m, body) => {
  const out = db.tx((s) => {
    const f = s.findings.find((x) => x.id === m[1]);
    if (!f) return { error: 'finding not found' };
    const decision = body.decision;
    if (!DECISIONS[decision]) return { error: 'invalid decision' };
    s.reviews[f.id] = decision;
    if (body.note) s.amendments[f.id] = body.note;
    const meta = DECISIONS[decision];
    appendAudit(s, meta.actor, meta.event, `${meta.event}: ${f.citation}` + (body.note ? ` — ${body.note}` : ''));
    // Resolve any matching queue entry.
    const q = s.queue.find((x) => x.citation === f.citation);
    if (q) q.status = decision === 'Approved' ? 'Approved' : decision === 'Rejected' ? 'Rejected' : decision === 'Amended' ? 'Amended' : 'Escalated';
    recomputeQueueMetrics(s);
    return { id: f.id, review: decision, scores: db.recomputeScores(), queueMetrics: s.queueMetrics };
  });
  if (out.error) return send(res, 400, out);
  send(res, 200, out);
});

// Partner approve / send-back.
on('POST', /^\/api\/findings\/([\w-]+)\/partner-approve$/, (req, res, m) => {
  const out = db.tx((s) => {
    const f = s.findings.find((x) => x.id === m[1]);
    if (!f) return { error: 'finding not found' };
    s.partnerApproved[f.id] = true;
    appendAudit(s, 'Partner Reviewer', 'Citation approved for filing', f.citation);
    return { id: f.id, partnerApproved: true };
  });
  if (out.error) return send(res, 404, out);
  send(res, 200, out);
});
on('POST', /^\/api\/findings\/([\w-]+)\/partner-send-back$/, (req, res, m) => {
  const out = db.tx((s) => {
    const f = s.findings.find((x) => x.id === m[1]);
    if (!f) return { error: 'finding not found' };
    delete s.partnerApproved[f.id];
    appendAudit(s, 'Partner Reviewer', 'Citation sent back to associate', f.citation);
    return { id: f.id, partnerApproved: false };
  });
  if (out.error) return send(res, 404, out);
  send(res, 200, out);
});

// Tracked-change document edits (apply suggested fix / manual edit / revert).
on('POST', /^\/api\/document-edits\/([\w-]+)$/, (req, res, m, body) => {
  const out = db.tx((s) => {
    const id = m[1];
    if (body.revert) { delete s.docEdits[id]; appendAudit(s, 'Reviewer', 'Tracked change reverted', id); return { id, removed: true }; }
    const revised = body.mode === 'applied' ? (s.revisions[id] || body.revised) : body.revised;
    if (!revised) return { error: 'no revision text' };
    s.docEdits[id] = { revised, mode: body.mode || 'manual' };
    appendAudit(s, 'Reviewer', body.mode === 'applied' ? 'Suggested fix applied' : 'Paragraph amended', id);
    return { id, edit: s.docEdits[id] };
  });
  if (out.error) return send(res, 400, out);
  send(res, 200, out);
});

// Promote a discovered authority into the trusted corpus / source library.
on('POST', /^\/api\/sources\/([\w-]+)\/promote$/, (req, res, m) => {
  const out = db.tx((s) => {
    const id = m[1];
    const disc = s.discovered.find((d) => d.id === id);
    if (!disc) return { error: 'discovered source not found' };
    if (!s.promotedSources.includes(id)) s.promotedSources.push(id);
    // Move it into the trusted library if not already present.
    if (!s.sourceLibrary.find((x) => x.id === id)) {
      s.sourceLibrary.push({ id: disc.id, case: disc.case, citation: disc.citation, court: disc.court, jur: disc.jur, area: disc.area, year: null, promoted: true });
    }
    if (s.corpusStats) s.corpusStats.base += 1;
    appendAudit(s, 'Reviewer', 'Authority promoted to corpus', `${disc.case} ${disc.citation} (via ${disc.foundVia}).`);
    return { id, promoted: true, stats: s.corpusStats };
  });
  if (out.error) return send(res, 404, out);
  send(res, 200, out);
});

// ---- Reports: partner-ready filing record for a project ----
on('GET', /^\/api\/reports\/([\w-]+)$/, (req, res, m) => {
  const s = db.get();
  const project = s.projects.find((p) => p.id === m[1]) || s.projects[0];
  const scores = db.recomputeScores();
  const findings = s.findings.map((f) => ({
    id: f.id, citation: f.citation, status: f.status, risk: f.risk, confidence: f.confidence,
    recommendedAction: f.recommendedAction, review: s.reviews[f.id] || 'Pending',
    partnerApproved: !!s.partnerApproved[f.id],
  }));
  const reviewed = findings.filter((f) => f.review !== 'Pending').length;
  send(res, 200, {
    project,
    matter: s.matter,
    scores,
    generatedAt: new Date().toISOString(),
    summary: s.matter.summary,
    findings,
    progress: { reviewed, total: findings.length, partnerApproved: findings.filter((f) => f.partnerApproved).length },
    readyForFiling: reviewed === findings.length && findings.every((f) => f.partnerApproved),
    audit: s.audit,
  });
});

// Reset the database back to the seed.
on('POST', /^\/api\/reset$/, (req, res) => {
  db.reset(new Date().toISOString());
  send(res, 200, { ok: true, reset: true });
});

function recomputeQueueMetrics(s) {
  const open = s.queue.filter((q) => q.status === 'Pending Review' || q.status === 'Needs Amendment').length;
  s.queueMetrics = {
    open,
    critical: s.queue.filter((q) => q.priority === 'Critical' && (q.status === 'Pending Review' || q.status === 'Needs Amendment')).length,
    high: s.queue.filter((q) => q.priority === 'High' && (q.status === 'Pending Review' || q.status === 'Needs Amendment')).length,
    approved: s.queue.filter((q) => q.status === 'Approved').length,
    readyForFiling: open === 0 ? 'Yes' : 'No',
  };
}

/* ----------------------------- server ------------------------------ */
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (req.method === 'OPTIONS') { send(res, 204, {}); return; }

  if (pathname.startsWith('/api/')) {
    const body = req.method === 'POST' ? await readBody(req) : null;
    for (const [method, pattern, handler] of routes) {
      if (method !== req.method) continue;
      const match = pattern.exec(pathname);
      if (match) {
        try { return handler(req, res, match, body); }
        catch (e) { console.error('[api]', pathname, e); return send(res, 500, { error: e.message }); }
      }
    }
    return send(res, 404, { error: 'no such endpoint', path: pathname });
  }

  serveStatic(req, res, pathname);
});

server.listen(PORT, () => {
  console.log(`\n  Consistency Check — full-stack server`);
  console.log(`  ─────────────────────────────────────`);
  console.log(`  App   →  http://localhost:${PORT}/`);
  console.log(`  API   →  http://localhost:${PORT}/api/health`);
  console.log(`  DB    →  ${db.DB_FILE}`);
  console.log(`  Reset →  POST http://localhost:${PORT}/api/reset\n`);
});
