'use strict';
/*
 * api/index.js — Vercel serverless function entry for the Consistency Check API.
 *
 * Vercel rewrites /api/* to this function (see vercel.json). It reuses the exact
 * same request handler as the local server (server/app.js), so behaviour is
 * identical in both environments. State persists in Supabase/Postgres via
 * server/store.js (configured through environment variables).
 */
const app = require('../server/app');

module.exports = (req, res) => app.handle(req, res).catch((e) => {
  console.error('[vercel-api]', e);
  res.statusCode = 500;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: e.message }));
});
