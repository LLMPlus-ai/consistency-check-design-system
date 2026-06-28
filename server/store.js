'use strict';
/*
 * store.js — persistence backend for the runtime state ("Database" box).
 *
 * The whole mutable app state is stored as a single JSONB document so the model
 * maps directly onto the existing in-memory structure. Three backends, chosen
 * automatically by environment so the same code runs locally and on Vercel:
 *
 *   1. Supabase  — SUPABASE_URL + SUPABASE_KEY  (HTTPS via supabase-js).
 *                  Ideal for serverless: no TCP connection pooling to exhaust.
 *   2. Postgres  — DATABASE_URL                 (postgres.js; auto-creates the
 *                  table when the role has DDL rights — e.g. a direct/pooler
 *                  connection string).
 *   3. File      — server/db.json               (local dev default, no deps).
 *
 * Interface (all async):  loadRaw() → { data, revision } | null,  saveRaw(data, revision)
 */
const fs = require('fs');
const path = require('path');

const TABLE = 'cc_state';
const ROW_ID = 'singleton';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY
  || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const DATABASE_URL = process.env.DATABASE_URL || '';
const FILE = process.env.CC_DB_FILE || path.join(__dirname, 'db.json');

let backend = null;

function makeSupabase() {
  const { createClient } = require('@supabase/supabase-js');
  const sb = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
  return {
    kind: 'supabase',
    detail: SUPABASE_URL,
    async loadRaw() {
      const { data, error } = await sb.from(TABLE).select('data,revision').eq('id', ROW_ID).maybeSingle();
      if (error) throw new Error('supabase load: ' + error.message);
      return data ? { data: data.data, revision: data.revision } : null;
    },
    async saveRaw(stateData, revision) {
      const { error } = await sb.from(TABLE).upsert(
        { id: ROW_ID, data: stateData, revision, updated_at: new Date().toISOString() },
        { onConflict: 'id' },
      );
      if (error) throw new Error('supabase save: ' + error.message);
    },
  };
}

function makePostgres() {
  const postgres = require('postgres');
  const sql = postgres(DATABASE_URL, { prepare: false, idle_timeout: 20, max: 1, ssl: 'require' });
  let ready = null;
  const ensure = () => (ready || (ready = sql`
    create table if not exists cc_state (
      id text primary key,
      data jsonb not null,
      revision integer not null default 0,
      updated_at timestamptz not null default now()
    )`));
  return {
    kind: 'postgres',
    detail: DATABASE_URL.replace(/:[^:@/]+@/, ':****@'),
    async loadRaw() {
      await ensure();
      const rows = await sql`select data, revision from cc_state where id = ${ROW_ID}`;
      return rows.length ? { data: rows[0].data, revision: rows[0].revision } : null;
    },
    async saveRaw(stateData, revision) {
      await ensure();
      await sql`
        insert into cc_state (id, data, revision, updated_at)
        values (${ROW_ID}, ${sql.json(stateData)}, ${revision}, now())
        on conflict (id) do update set data = excluded.data, revision = excluded.revision, updated_at = now()`;
    },
  };
}

function makeFile() {
  return {
    kind: 'file',
    detail: FILE,
    async loadRaw() {
      if (!fs.existsSync(FILE)) return null;
      try {
        const parsed = JSON.parse(fs.readFileSync(FILE, 'utf8'));
        return { data: parsed, revision: (parsed.meta && parsed.meta.revision) || 0 };
      } catch (e) { console.error('[store] db.json unreadable:', e.message); return null; }
    },
    async saveRaw(stateData) {
      try { fs.writeFileSync(FILE, JSON.stringify(stateData, null, 2)); }
      catch (e) { console.error('[store] file save failed:', e.message); }
    },
  };
}

function get() {
  if (backend) return backend;
  if (SUPABASE_URL && SUPABASE_KEY) backend = makeSupabase();
  else if (DATABASE_URL) backend = makePostgres();
  else backend = makeFile();
  return backend;
}

module.exports = {
  loadRaw: (...a) => get().loadRaw(...a),
  saveRaw: (...a) => get().saveRaw(...a),
  info: () => ({ kind: get().kind, detail: get().detail }),
};
