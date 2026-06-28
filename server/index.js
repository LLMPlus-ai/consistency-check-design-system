'use strict';
/*
 * index.js — local development server.
 *
 * Wraps the shared request handler (server/app.js) in a long-running Node HTTP
 * server and also serves the static front-end. On Vercel the same handler runs
 * as a serverless function (see api/index.js); locally it runs here.
 *
 * Run:  node server/index.js   then open  http://localhost:4000/
 */
const http = require('http');
const app = require('./app');
const db = require('./db');

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  app.handle(req, res).catch((e) => {
    console.error('[server]', e);
    try { app.send(res, 500, { error: e.message }); } catch {}
  });
});

server.listen(PORT, () => {
  const store = db.storeInfo();
  console.log('\n  Consistency Check — full-stack server');
  console.log('  ─────────────────────────────────────');
  console.log(`  App   →  http://localhost:${PORT}/`);
  console.log(`  API   →  http://localhost:${PORT}/api/health`);
  console.log(`  Store →  ${store.kind} (${store.detail})`);
  console.log(`  Reset →  POST http://localhost:${PORT}/api/reset\n`);
});
