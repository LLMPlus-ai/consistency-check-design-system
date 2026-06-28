# Consistency Check — Full-Stack Back-End

A dependency-free Node back-end that turns the static Consistency Check design
system into a **fully connected product**, implementing the architecture in the
brief — *Legal AI Citation Verification & Supervision System, powered by NVIDIA
Open Models and Perplexity*.

```
            INPUTS              NVIDIA AI PROCESSING        VERIFICATION + LIVE        OUTPUTS + SUPERVISION
  ┌────────────────────┐   ┌────────────────────────┐  ┌──────────────────────┐  ┌────────────────────────┐
  │ Legal documents    │   │ Parse / OCR            │  │ Deterministic engine │  │ Citation verdicts      │
  │ Case-law corpus    │──▶│ Citation extraction    │─▶│  (internal corpus)   │─▶│ Risk score + reasons   │
  │ Open legal sources │   │ Normalisation          │  │ Perplexity sonar     │  │ Partner review board   │
  └────────────────────┘   │ Mischaracterisation    │  │  (live web retrieval)│  │ Audit trail / report   │
                           └────────────────────────┘  └──────────────────────┘  └────────────────────────┘
        UI  ·  API  ·  Database  ·  Reports         (Application Infrastructure)
```

## Run

```bash
node server/index.js          # or: npm start
# open http://localhost:4000/
```

No `npm install` is required — the server uses only Node's standard library
(Node ≥ 18). The front-end is served statically by the same server, so the API,
database, pipeline and UI are all same-origin.

### Enable the live AI models (optional)

The verification engine works offline using the local corpus. To turn on the
**NVIDIA Nemotron** processing layer and **Perplexity** live retrieval, provide
keys (copy `server/.env.example` → `server/.env`):

```
OPENROUTER_API_KEY=sk-or-v1-...     # NVIDIA Nemotron, via OpenRouter
PERPLEXITY_API_KEY=pplx-...         # Perplexity `sonar`
```

With no keys, `/api/llm/status` reports `mode: "deterministic-only"` and live
verification falls back to the corpus matcher — the product still works fully.

## Architecture

| File | Role |
|---|---|
| `server/index.js` | HTTP server, router, static file serving, all REST endpoints |
| `server/db.js` | In-memory document store, persisted to `server/db.json`; reset/seed |
| `server/seed-loader.js` | Loads `data.js` + `flow.js` as the single source of truth (UI ↔ API never drift) |
| `server/pipeline.js` | The 6-stage processing/verification trace (parse → extract → normalise → mischar → deterministic → live) |
| `server/corpus.js` | Deterministic verification against the real 58-case UK corpus (`corpus.json`) |
| `server/nvidia.js` | Live clients: NVIDIA Nemotron (OpenRouter) + Perplexity `sonar` |
| `server/verify.js` | Orchestrates corpus → Perplexity → Nemotron → verdict + audit trace |
| `server/architecture.js` | Machine-readable diagram model powering the linkable System page |
| `scripts/ingest-corpus.js` | Builds the sanitized `corpus.json` from the brief's case files |

The verdict logic (`Verified · Mischaracterised · Fabricated`) is computed with
the **same `flow.js` engine the UI uses**, so the server and client can never
disagree.

## API reference

### System / health
| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | Liveness, db revision, queue size (drives the status chip) |
| GET | `/api/architecture` | The diagram model (4 columns + infrastructure) |
| GET | `/api/bootstrap` | Full DB snapshot used to hydrate `window.CCData` |
| POST | `/api/reset` | Reseed the database |

### Live AI models
| Method | Path | Purpose |
|---|---|---|
| GET | `/api/llm/status` | NVIDIA / Perplexity configured? + corpus stats + mode |
| POST | `/api/llm/verify` | Verify one citation live: `{citation, proposition, holding}` → corpus → Perplexity → Nemotron → verdict + trace |
| POST | `/api/llm/extract` | Nemotron citation extraction from `{text}` |
| GET | `/api/corpus` | The trusted corpus snapshot + stats |
| GET | `/api/corpus/match?q=` | Deterministic match for a citation/case string |

### Documents & pipeline
| Method | Path | Purpose |
|---|---|---|
| GET/POST | `/api/documents` | List / register an uploaded document |
| POST | `/api/documents/:id/analyze` | Run the 6-stage pipeline; returns staged trace + verdicts |
| GET | `/api/runs` | Pipeline run history |

### Findings & supervision (Stage 4)
| Method | Path | Purpose |
|---|---|---|
| GET | `/api/findings` · `/api/findings/:id` | Citation findings (+ corpus/ratio/analysis detail) |
| POST | `/api/findings/:id/review` | `{decision: Approved\|Amended\|Rejected\|Escalated, note}` |
| POST | `/api/findings/:id/partner-approve` · `/partner-send-back` | Partner sign-off |
| POST | `/api/document-edits/:id` | Tracked-change edits (apply fix / manual / revert) |
| POST | `/api/sources/:id/promote` | Promote a discovered authority into the corpus |

### Outputs
| Method | Path | Purpose |
|---|---|---|
| GET | `/api/scores` · `/api/queue` · `/api/audit` | Risk scores, supervision queue, audit trail |
| GET | `/api/reports/:projectId` | Partner-ready filing report + readiness |

Every supervision action appends to the **audit trail** (Challenge 1 —
auditability), and every live verification is recorded with the models used.

## How the front-end connects

`ui_kits/consistency-check/api.js` exposes `window.CCApi` and `window.CCBoot()`.
`index.html` calls `CCBoot()` before the first React render: it pings
`/api/health`, hydrates `window.CCData` from `/api/bootstrap`, and sets the live
status chip. Supervision actions in `App.jsx` persist optimistically through the
API and re-sync. If the back-end is unreachable the app degrades gracefully to
the static seed in `data.js`, clearly labelled "Offline — static seed".

## Tests

```bash
npm run smoke      # boots the API on :4099 (throwaway DB) and asserts the
                   # bootstrap → upload → analyze → review → report → corpus flow
```

## Security

`challenges_documents/` (the brief data, which contains **live API keys**) and
`server/db.json` are git-ignored and never committed. Keys are read from the
environment; the committed `corpus.json` is a sanitized, key-free snapshot.
