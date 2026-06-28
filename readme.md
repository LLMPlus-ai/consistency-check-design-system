# Consistency Check

**A legal-AI citation verification and supervision platform.**
*Grammarly for legal consistency — with citation verification and a defensible AI supervision trail.*

Consistency Check scans legal documents — skeleton arguments, filings, memos — for **fabricated citations**, **mischaracterised authorities**, and risky AI-generated claims, then routes every finding through a human supervision queue and an immutable audit trail so the work is **defensible for filing**. It pairs a deterministic case-law corpus matcher with live large-language-model reasoning, and surfaces the result through a calm, partner-grade interface.

It is delivered as a **complete full-stack application**: a dependency-free Node back-end (REST API, persisted database, verification pipeline, reporting) connected to a React front-end, with live **NVIDIA Nemotron** and **Perplexity** model integration, all built on a rigorous, self-contained design system.

```
            INPUTS              NVIDIA AI PROCESSING        VERIFICATION + LIVE        OUTPUTS + SUPERVISION
  ┌────────────────────┐   ┌────────────────────────┐  ┌──────────────────────┐  ┌────────────────────────┐
  │ Legal documents    │   │ Parse / OCR            │  │ Deterministic engine │  │ Citation verdicts      │
  │ Case-law corpus    │──▶│ Citation extraction    │─▶│  (internal corpus)   │─▶│ Risk score + reasons   │
  │ Open legal sources │   │ Normalisation          │  │ Perplexity sonar     │  │ Partner review board   │
  └────────────────────┘   │ Mischaracterisation    │  │  (live web retrieval)│  │ Audit trail / report   │
                           └────────────────────────┘  └──────────────────────┘  └────────────────────────┘
              UI    ·    API    ·    Database    ·    Reports        (Application Infrastructure)
```

---

## Contents

- [Overview](#overview)
- [Feature summary](#feature-summary)
- [How verification works](#how-verification-works)
- [AI models and data](#ai-models-and-data)
- [Quick start](#quick-start)
- [Configuration](#configuration)
- [API surface](#api-surface)
- [The application](#the-application)
- [Design system](#design-system)
- [Project structure](#project-structure)
- [Testing](#testing)
- [Security and privacy](#security-and-privacy)
- [Tech stack](#tech-stack)
- [Licensing and fonts](#licensing-and-fonts)

---

## Overview

The platform addresses two connected problems that arise when lawyers rely on AI drafting tools:

1. **Citation integrity** — AI tools confidently invent plausible-looking authorities (case names that echo the dispute's industry) and misapply real ones. Every citation in a document must be confirmed to exist *and* to support the proposition it is cited for, before filing.
2. **AI supervision** — a human must be able to understand what the AI did, challenge its outputs proportionately, retain accountability for the legal judgement, and scale that oversight without reverting to line-by-line manual review.

Consistency Check answers both: it classifies each citation as **Verified · Mischaracterised · Fabricated**, attaches a confidence score and a plain-language explanation, and records every machine and human action in an auditable trail, ending in a partner-ready report.

---

## Feature summary

### Verification and AI

| Feature | Description |
|---|---|
| **Six-stage pipeline** | Parse/OCR → citation extraction → normalisation → mischaracterisation analysis → deterministic verification → live retrieval, each with an inspectable trace. |
| **Deterministic corpus matching** | Citations are matched against a real 58-authority UK/Commonwealth case-law corpus by exact citation, exact name, or fuzzy party-name overlap — fast, free, and offline. |
| **Live web retrieval** | Authorities absent from the corpus are checked against the open web via the Perplexity `sonar` model to determine whether they genuinely exist. |
| **Mischaracterisation analysis** | NVIDIA Nemotron compares each cited proposition to the authority's actual holding and flags wrong-measure / overstated / distorted uses (calibrated to a practising litigator's standard, not pedantry). |
| **Three-verdict classification** | Every citation resolves to **Verified · Mischaracterised · Fabricated**, with a confidence percentage and a written rationale. |
| **Parallel-citation normalisation** | One judgment reported across multiple series (neutral citation, AC, WLR, All ER) resolves to a single authority, so any reference form is accepted. |
| **Ratio vs obiter weighting** | Distinguishes binding ratio from obiter/plurality reasoning, flagging citations that overstate an authority's *weight*. |
| **Jurisdiction awareness** | Tracks England & Wales, Scotland, Northern Ireland, Privy Council, and US/EU persuasive authority, flagging out-of-jurisdiction use. |
| **Graceful degradation** | With no API keys configured, the system runs in deterministic, corpus-only mode and still produces verdicts — clearly labelled. |

### Supervision and governance

| Feature | Description |
|---|---|
| **Two-stage review workflow** | Associate review followed by partner sign-off, with per-citation approve / amend / reject / escalate and a "trust associate" bulk path. |
| **Configurable firm guardrails** | Conservative and Flexible review postures control how externally-verified, out-of-jurisdiction, and absent citations are routed (suspected fabrications are never auto-passed). |
| **Triage by urgency** | Findings are ordered by severity and weakest fidelity against the filing clock. |
| **Tracked-change working copy** | Apply suggested corrections, edit paragraphs manually, or revert — then export a clean filing copy. |
| **Immutable audit trail** | Every engine and human action is timestamped and recorded, including each live model verification and the models used. |
| **Partner-ready reports** | A generated report summarises verdicts, review progress, filing readiness, and the full audit record. |

### Application and platform

| Feature | Description |
|---|---|
| **Full-stack and connected** | A REST API and persisted database back the UI; the front-end hydrates from the API on load and persists every supervision action. |
| **Zero runtime dependencies** | The server uses only the Node standard library — no `npm install`, no build step. |
| **Linkable System map** | A live, data-driven rendering of the architecture diagram where every node links to the screen it powers *and* the API endpoint behind it, with live model status and an interactive verification tool. |
| **Document ingestion** | Upload PDF / DOCX / text; citations are extracted client-side and the document is analysed server-side. |
| **Live connection status** | A status indicator reflects back-end liveness and database revision in real time. |
| **Reset and reseed** | The database can be reset to a clean seed at any time. |

### Design system

| Feature | Description |
|---|---|
| **Token-driven foundations** | Colour, typography, spacing, radius, elevation, and fonts as CSS custom properties behind a single stylesheet. |
| **Reusable component library** | Buttons, inputs, tabs, filter chips, status and risk badges, health meter, cards, stat cards, avatars — each with `.jsx`, `.d.ts`, and prompt documentation. |
| **Full reference UI kit** | A complete click-through verification dashboard built from the tokens and components. |
| **Documented brand voice** | A calm, precise, institutional content standard with a graded, unambiguous risk vocabulary. |

---

## How verification works

Each citation flows through a two-stage decision, applied with the same engine on the server and the client so verdicts never disagree:

```
Stage 1 — internal corpus
  ├─ Found in trusted corpus?
  │    ├─ Yes → proposition matches the holding?
  │    │         ├─ Yes → Verified
  │    │         └─ No  → Mischaracterised
  │    └─ No  → escalate to Stage 2
  │
Stage 2 — live retrieval
  └─ Found in an approved external source?
       ├─ Yes → proposition matches the source?
       │         ├─ Yes → Verified (external)
       │         └─ No  → Mischaracterised (external)
       └─ No  → Fabricated  (absent from every source checked)
```

Firm guardrails then route each leaf verdict to **Pass** or **Review**, with the reason recorded. The result is a verdict, a confidence score, a written explanation, and a step-by-step trace suitable for audit.

The demonstration scenario — *Crestholm Dynamics plc v Veltros Industries Inc*, a £47m skeleton argument with 12 citations — resolves to 7 verified, 2 mischaracterised, and 3 fabricated, mirroring the canonical challenge expectations (the fabricated authorities carry invented party names that echo the dispute's industries — the classic tell of AI confabulation).

---

## AI models and data

| Component | Provider / source | Role |
|---|---|---|
| **NVIDIA Nemotron** | `nvidia/nemotron-3-super-120b-a12b` via OpenRouter | Citation extraction and mischaracterisation analysis |
| **Perplexity `sonar`** | Perplexity API | Live web retrieval for out-of-corpus citations |
| **Case-law corpus** | Real UK/Commonwealth judgments | Deterministic first-pass verification (58 authorities) |

The corpus is ingested from the source case files into a sanitized, key-free snapshot (`server/corpus.json`) by `scripts/ingest-corpus.js`. Model access is optional: the platform is fully functional in deterministic mode without keys.

---

## Quick start

**Requirements:** Node.js 18 or later. No other dependencies.

```bash
node server/index.js          # or: npm start
# open http://localhost:4000/
```

The same server hosts the API, the database, the verification pipeline, and the static front-end — so everything is same-origin and works out of the box.

To rebuild the corpus snapshot from source case files (optional):

```bash
npm run ingest
```

---

## Configuration

All configuration is optional. Copy `server/.env.example` to `server/.env` to enable the live AI processing layer:

```ini
OPENROUTER_API_KEY=sk-or-v1-...   # NVIDIA Nemotron, via OpenRouter
PERPLEXITY_API_KEY=pplx-...       # Perplexity sonar (live web retrieval)
# PORT=4000                       # server port (default 4000)
# CC_DB_FILE=                     # database file path (default server/db.json)
```

With no keys present, `GET /api/llm/status` reports `mode: "deterministic-only"` and verification falls back to the corpus matcher. The product remains fully usable.

---

## API surface

A REST API exposes every capability. Highlights below; the complete reference is in **[`BACKEND.md`](BACKEND.md)**.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Liveness, database revision, queue size |
| `GET` | `/api/bootstrap` | Full snapshot used to hydrate the front-end |
| `GET` | `/api/architecture` | The system diagram model (drives the System page) |
| `GET` | `/api/llm/status` | NVIDIA / Perplexity availability, corpus stats, mode |
| `POST` | `/api/llm/verify` | Verify one citation live: corpus → Perplexity → Nemotron |
| `POST` | `/api/documents/:id/analyze` | Run the six-stage pipeline; returns the staged trace |
| `POST` | `/api/findings/:id/review` | Approve / amend / reject / escalate a finding |
| `GET` | `/api/reports/:projectId` | Partner-ready filing report and readiness |
| `POST` | `/api/reset` | Reseed the database |

Every supervision action appends to the audit trail; every live verification records the models used.

---

## The application

The front-end is a single-page React application (Babel-in-browser, no build step) served by the back-end. On load it pings the API, hydrates its data store, and shows a live connection status; if the back-end is unreachable it degrades to the static seed, clearly labelled "Offline".

**Screens**

- **Document** — the working skeleton argument with tracked-change corrections.
- **Citation Checker** — the findings table with a right-hand evidence drawer.
- **Verification** — the live decision flow and pipeline trace.
- **Insights** — deep analysis: risk decomposition, fidelity, triage.
- **Source Library** — the trusted corpus and authorities discovered during verification, promotable into the corpus.
- **Audit Trail** — the immutable supervision record.
- **Data Sources** — connected legal sources and configured engines.
- **System** — the linkable architecture map, live model status, and an interactive live-verification tool.

---

## Design system

The interface is built on a strict, self-contained design language: *an AI lab notebook crossed with a printed legal brief.*

**Colour.** A warm cream canvas (`--canvas` #f9f7f3), never pure white; ink type (`--ink` #202020) with a full grey ramp for hierarchy. Hot orange (`--primary` #ea2804) is a scarce *risk stamp* — at most one orange element per viewport. The only other non-neutral hues are functional verdict colours: verified green, mischaracterised ochre, fabricated/critical deep red.

**Type.** Three families in strict lanes — **Bricolage Grotesque** (display), **Geist** (UI and body), **JetBrains Mono** (every citation, reference, and score). Emphasis comes from changing family, not weight.

**Shape, elevation, motion.** Interactive elements are fully rounded; cards step to softer radii. Depth is colour-blocking (white-on-cream, or dark-inverted wells), not shadow. Motion is restrained — short opacity and translate fades, no bounces.

**Voice.** Calm, precise, institutional. British spelling. Graded, unambiguous risk language. Recommended actions are verbs. No emoji, anywhere — the most expressive the UI gets is a coloured status dot.

**Iconography.** [Lucide](https://lucide.dev) line icons at 1.5–2px stroke, inheriting `currentColor`.

The component library (`window.ConsistencyCheckDesignSystem_77c3a7`) ships Button, IconButton, Input, FilterChip, Tabs, StatusBadge, RiskBadge, HealthMeter, Card, StatCard, and Avatar — each with a `.jsx` implementation, a `.d.ts` type definition, and prompt documentation. Foundations and tokens live under `tokens/` and `foundations/`, with `styles.css` as the single global entry point.

---

## Project structure

```
.
├── server/                     Zero-dependency Node back-end
│   ├── index.js                HTTP server, router, static serving, REST API
│   ├── db.js                   Persisted in-memory database + reset/seed
│   ├── seed-loader.js          Single source of truth (loads data.js + flow.js)
│   ├── pipeline.js             Six-stage verification pipeline + trace
│   ├── corpus.js               Deterministic corpus matcher
│   ├── corpus.json             Sanitized 58-authority corpus snapshot
│   ├── nvidia.js               NVIDIA Nemotron (OpenRouter) + Perplexity clients
│   ├── verify.js               Live verification orchestrator
│   ├── architecture.js         Machine-readable system-diagram model
│   ├── smoke-test.js           End-to-end API test (22 assertions)
│   └── .env.example            Configuration template
├── scripts/
│   └── ingest-corpus.js        Builds corpus.json from source case files
├── ui_kits/consistency-check/  Full React application + API client (api.js)
├── components/                 Reusable component library (forms/status/surfaces)
├── foundations/                Design-system specimen cards
├── tokens/                     CSS custom-property tokens
├── assets/                     Diagrams and logo
├── styles.css                  Global stylesheet entry point
├── BACKEND.md                  Full back-end architecture and API reference
└── SKILL.md                    Agent-Skill manifest
```

---

## Testing

```bash
npm run smoke
```

The smoke test boots the API on a dedicated port with a throwaway database and asserts the full path: bootstrap → document upload → pipeline analysis → supervision review → report generation → corpus matching → model status. All 22 assertions must pass.

---

## Security and privacy

- **No secrets in version control.** API keys are read from the environment. The source brief data — which contains live keys — and the runtime database are git-ignored and never committed. The shipped `corpus.json` is a sanitized, key-free snapshot.
- **Local-first verification.** The deterministic corpus matcher runs entirely offline; external model calls are made only when keys are configured and a citation requires live retrieval or reasoning.
- **Auditable by design.** Every machine and human decision is recorded with a timestamp and attribution, supporting accountability and post-hoc review.

---

## Tech stack

- **Back-end:** Node.js (standard library only — `http`, `fs`), zero runtime dependencies.
- **Front-end:** React 18 (Babel standalone, no build step), CSS custom-property design tokens.
- **AI:** NVIDIA Nemotron via OpenRouter; Perplexity `sonar`.
- **Data:** Sanitized UK/Commonwealth case-law corpus (JSON).
- **Icons:** Lucide.

---

## Licensing and fonts

The proprietary display originals (**rb-freigeist-neue**, **basier-square**) could not be licensed and are substituted, per the brief's guidance, with **Bricolage Grotesque** (display) and **Geist** (UI/body) from Google Fonts; **JetBrains Mono** is the genuine family. To restore the originals, add the font files and update `tokens/fonts.css`.

The design system reinterprets Replicate's warm developer-tools brand language for a serious legal-AI product. All case authorities referenced in the corpus are genuine published judgments; the demonstration matter and the fabricated citations within it are fictional by design.
