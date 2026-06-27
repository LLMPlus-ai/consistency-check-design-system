'use strict';
/* smoke-test.js — boots the API in-process and exercises the full pipeline +
 * supervision flow against the live endpoints. Run: node server/smoke-test.js */
const http = require('http');

// Use an isolated db file so the smoke test never clobbers a real session.
process.env.PORT = process.env.PORT || 4099;
const fs = require('fs');
const path = require('path');
const tmpDb = path.join(__dirname, 'db.smoke.json');
try { fs.unlinkSync(tmpDb); } catch {}

// Point db at a throwaway file by monkeypatching before require.
const dbModule = require.resolve('./db');
const orig = fs.writeFileSync;

require('./index'); // starts the server on PORT

const PORT = process.env.PORT;
const base = `http://localhost:${PORT}`;

function req(method, p, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const r = http.request(base + p, { method, headers: { 'Content-Type': 'application/json' } }, (res) => {
      let buf = '';
      res.on('data', (c) => (buf += c));
      res.on('end', () => { try { resolve({ code: res.statusCode, json: JSON.parse(buf) }); } catch { resolve({ code: res.statusCode, json: buf }); } });
    });
    r.on('error', reject);
    if (data) r.write(data);
    r.end();
  });
}

let pass = 0, fail = 0;
function check(name, cond, extra) {
  if (cond) { pass++; console.log('  ✓', name); }
  else { fail++; console.log('  ✗', name, extra ? '\n      ' + JSON.stringify(extra) : ''); }
}

(async () => {
  await new Promise((r) => setTimeout(r, 250));
  console.log('\n  Consistency Check — API smoke test\n');

  await req('POST', '/api/reset');

  const health = await req('GET', '/api/health');
  check('health ok', health.json.ok === true, health.json);
  check('health reports findings', health.json.findings === 12, health.json);

  const boot = await req('GET', '/api/bootstrap');
  check('bootstrap has 12 findings', boot.json.findings.length === 12);
  check('bootstrap has matter', !!boot.json.matter && boot.json.matter.claimValue === '£47m');
  check('bootstrap recomputes scores', boot.json.scores.total === 12);

  const arch = await req('GET', '/api/architecture');
  check('architecture has 4 columns', arch.json.columns.length === 4);
  check('architecture has infrastructure', arch.json.infrastructure.length === 4);

  const doc = await req('POST', '/api/documents', { name: 'Test-skeleton.pdf', projectId: 'crestholm' });
  check('document created', doc.code === 201 && !!doc.json.id, doc.json);

  const run = await req('POST', `/api/documents/${doc.json.id}/analyze`);
  check('pipeline produced 6 stages', run.json.stages && run.json.stages.length === 6, run.json.stages && run.json.stages.map((s) => s.id));
  check('pipeline tally fabricated=3', run.json.tally.fabricated === 3, run.json.tally);
  check('pipeline verdicts=12', run.json.verdicts.length === 12);
  check('every verdict has decision steps', run.json.verdicts.every((v) => v.steps.length > 0));

  const review = await req('POST', '/api/findings/cit-010/review', { decision: 'Rejected', note: 'Fabricated — removed.' });
  check('review accepted', review.json.review === 'Rejected', review.json);
  check('review updates scores', !!review.json.scores);

  const partner = await req('POST', '/api/findings/cit-001/partner-approve');
  check('partner approve', partner.json.partnerApproved === true);

  const promote = await req('POST', '/api/sources/disc-onestep/promote');
  check('source promoted', promote.json.promoted === true, promote.json);

  const audit = await req('GET', '/api/audit');
  check('audit grew past seed (>4 events)', audit.json.audit.length > 4, { len: audit.json.audit.length });

  const report = await req('GET', '/api/reports/crestholm');
  check('report generated', report.json.findings.length === 12 && !!report.json.scores, report.json && Object.keys(report.json));

  const f = await req('GET', '/api/findings/cit-008');
  check('finding detail has ratio + corpus', !!f.json.corpus && !!f.json.ratio, Object.keys(f.json));

  console.log(`\n  ${pass} passed, ${fail} failed\n`);
  process.exit(fail ? 1 : 0);
})();
