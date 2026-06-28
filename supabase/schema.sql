-- Consistency Check — Supabase schema
-- Run this once in your Supabase project's SQL editor
-- (Dashboard → SQL Editor → New query → paste → Run).
--
-- It creates the single table the app uses to persist all runtime state
-- (reviews, audit trail, documents, pipeline runs) as one JSONB document.
-- Only needed when connecting via SUPABASE_URL + SUPABASE_KEY (publishable key).
-- If you connect via a Postgres DATABASE_URL instead, the table is created
-- automatically and you can skip this.

create table if not exists public.cc_state (
  id         text primary key,
  data       jsonb not null,
  revision   integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.cc_state enable row level security;

-- The API connects with the publishable (anon) key from server-side env only,
-- so scope full access to just this one table for the anon + authenticated roles.
drop policy if exists "cc_state full access" on public.cc_state;
create policy "cc_state full access" on public.cc_state
  for all to anon, authenticated
  using (true) with check (true);
