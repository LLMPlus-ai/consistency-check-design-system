# Consistency Check — Design System

**Legal document verification for AI-assisted legal work.**
*"Grammarly for legal consistency — with citation verification and a defensible AI supervision trail."*

Consistency Check is an AI-powered legal document verification and supervision platform. It scans legal documents (skeleton arguments, filings, memos) for **fabricated citations**, **mischaracterised authorities**, internal contradictions, and risky AI-generated claims — then routes findings through a human supervision queue and an immutable audit trail so the work is **defensible for filing**.

This design system reframes **Replicate's** warm developer-tools brand language — cream canvas, ink type, a single scarce hot-orange accent, oversized display type, and monospace code wells — for a serious legal-AI product. Orange becomes the *risk stamp*; JetBrains Mono carries every case citation and statutory reference.

---

## Sources

The system was built from materials supplied in the hackathon brief:

- **`hard_coding/DESIGN-replicate.md`** — the authoritative visual brief (a Replicate brand analysis). All colour, type, spacing, radius and elevation tokens derive from it.
- **`hard_coding/consistency_check_claude_design_prompt.md`** — the product brief: screens, copy, and the static demo dataset (12 citations, supervisor queue, audit events, data sources, architecture layers).
- **`hard_coding/system_diagram_v0.png`** — the verification decision flow (internal corpus → external check → verdict).
- **`hard_coding/WhatsApp Image 2026-06-27...jpeg`** — high-level system architecture (Input → Extraction → Verification → Supervision → Output).
- **`hard_coding/main_data/*.md`** — the local UK/Commonwealth case corpus (~57 authorities) used as the primary verification source.

---

## What's in here

| Path | Purpose |
|---|---|
| `styles.css` | Global entry point — link this one file. Imports only. |
| `tokens/` | Colour, typography, spacing, radius, elevation, fonts, base reset. |
| `components/core/` | Reusable primitives (Button, Badge, RiskBadge, Card, StatCard, Input, Tabs, FilterChip, Avatar, HealthMeter). |
| `ui_kits/consistency-check/` | Full-screen recreation of the verification dashboard. |
| `foundations/` | Specimen cards for the Design System tab. |
| `SKILL.md` | Agent-Skill manifest for downloadable use. |

Bundle namespace: `window.ConsistencyCheckDesignSystem_77c3a7`.

---

## CONTENT FUNDAMENTALS

How Consistency Check writes.

- **Voice: calm, precise, institutional.** This is a tool partners stake their professional reputation on. Copy never hypes. It states facts and consequences. "No reliable authority found." "Partner review required before filing."
- **Person: third-person / imperative, never chatty.** The system describes what it did ("12 citations extracted from skeleton argument") and what the human should do ("Revise the paragraph to distinguish reliance loss from expectation loss"). It does **not** say "I think" or "We found". Avoid first person. Address the user implicitly through recommended actions, not "you should".
- **Risk language is graded and unambiguous.** Four verdicts only — **Verified · Mischaracterised · Fabricated** for citations, and a **Low · Medium · High · Critical** risk ladder. Never soften: a fabricated case is "Fabricated", not "unconfirmed".
- **Legal register, British spelling.** "Mischaracterised", "authorities", "skeleton argument", "without-notice injunction", "£47m". Case names in italics by convention but rendered in monospace here to read as verifiable data. Citations are quoted exactly: *Lumley v Gye* (1853) 2 E & B 216.
- **Recommended actions are verbs.** "Remove or replace citation", "Revise legal proposition", "Check quotation and procedural context", "No action required".
- **Numbers are confident and bounded.** Confidence as a whole percentage (96%), health as a score out of 100 (58 / 100). No spurious decimals.
- **No emoji. No exclamation marks. No playful illustration.** The most expressive the UI gets is a coloured status dot.
- **Honest about being a demo.** Persistent labels: "Demo Dataset Loaded", "Static Demo Data", "Partner Review Mode". The product never implies live verification it isn't doing.

**Casing:** Sentence case for body and most labels. Title Case for proper nouns, product tabs (Dashboard, Citation Checker, Supervision, Audit Trail, Data Sources) and status words (Verified, Fabricated, Critical). UPPERCASE + letter-spacing only for small overline/eyebrow labels.

---

## VISUAL FOUNDATIONS

The look: *AI lab notebook crossed with a printed legal brief.*

### Colour
- **Warm cream canvas (`--canvas` #f9f7f3), never pure white.** White (`--surface-card`) appears only on cards, inputs, and table rows. The cream temperature is load-bearing — it makes the product feel like paper and ink rather than a cold SaaS console.
- **Ink (`--ink` #202020) for type**, a hair warmer than black to sit on cream. A full grey ramp (`--body` → `--charcoal` → `--mute` → `--ash` → `--stone`) handles hierarchy without colour.
- **Hot orange (`--primary` #ea2804) is a stamp, used scarcely** — the single most consequential action per view (escalate, the high-risk count, an inline link). One orange element per viewport at most. Pressed state deepens to `--primary-deep` #c01f00.
- **Functional risk hues only.** Verification statuses and the risk ladder are the *only* sanctioned non-neutral colours beyond orange: verified green (#2b9a66), mischaracterised ochre (#b8730a), fabricated/critical deep red (#c01f00 / #8b1500). Each has a faint tinted background for badges that still reads on cream. No decorative colour, ever.

### Type
- **Three families, strict lanes.** Bricolage Grotesque (display, 30px→128px, tight `line-height:1.0`, negative tracking) · Geist (all UI, body, labels) · JetBrains Mono (every citation, case slug, reference, score readout). Emphasis comes from *changing family*, not bumping weight.
- Display headlines run large and pack into geometric blocks. Body stays 400 weight; never 500 for emphasis.

### Shape & border
- **Curves are soft and intentional.** Every *interactive* element is fully rounded (`--radius-full`): buttons, inputs, badges, pills, avatars, filter chips. Content **cards** step to `--radius-md` (10px) or `--radius-lg` (16px). Never pill-shape a card; never sharpen a button.
- **Hairlines, not boxes.** Dividers are 1px `--hairline` (rgba ink 12%). Structural borders use `--hairline-strong` (#202020) on buttons/focus.

### Elevation
- **Colour-blocking is the primary depth language**, exactly as Replicate. A card is lifted by becoming white-on-cream, or dark-inverting to `--surface-dark`, not by shadow.
- Shadows are restrained and reserved: `--elev-card` (barely-there 1px seat) on cards, `--elev-panel` on the finding detail drawer that slides in from the right, `--elev-pop` on menus. No drop shadows on flat cream.

### Backgrounds & motifs
- Flat cream and bone fields; **no gradients** except the optional orange→pink atmospheric mesh reserved for a marketing hero (not used in the dashboard).
- **Dark code/data wells** (`--surface-dark` #202020) sit inside cream as full-bleed reading surfaces — used here for the audit trail and the architecture diagram, mimicking print pull-quotes.
- No textures, no photography in the product surfaces. The case corpus *is* the imagery — rendered as monospace data.

### Motion & states
- Restrained. Short opacity/translate fades (~120–160ms, ease-out) on hover and drawer entry. No bounces, no infinite loops.
- **Hover:** white cards tint to `--surface-bone` or lift one hairline; buttons darken one step. **Press:** orange → `--primary-deep`; dark → slightly lighter; a 1px inset. **Focus:** 3px `--ring-focus` orange-tinted ring.
- Status badges are static colour-blocks — the risk *is* the decoration.

### Layout rules
- Max content width ~1280px; the app shell is a fixed 60px top nav (cream, single hairline bottom border) over a cream working canvas.
- Generous editorial whitespace on cream (24–32px between groups); tighter 12–16px rhythm inside data-dense cards and tables.
- The finding detail panel is a fixed right-hand drawer over the findings table — strong separation between *document → findings → evidence → supervisor actions*.

---

## ICONOGRAPHY

- **Lucide** (https://lucide.dev) is the chosen icon system — open-source, 1.5–2px stroke, rounded line joins. It matches the brand's "friendly precision": geometric, calm, no fill. Linked from CDN (`lucide@latest`) in the UI kit and component cards. **Substitution flag:** the original brief ships no icon set, so Lucide is a chosen stand-in consistent with the stroke weight of the system.
- **Stroke, not fill.** Icons inherit `currentColor` and sit in `--charcoal` / `--mute` by default, going `--ink` on emphasis or a risk hue when paired with a status.
- **No emoji, anywhere.** The brand voice is institutional; emoji would undercut trust.
- **A coloured status dot** (8px filled circle in the verdict hue) is the one near-iconographic flourish used inline in tables and queues.
- The architecture/flow diagrams are rendered from HTML/CSS boxes + hairlines (see the diagram in `system_diagram_v0.png`), not illustration — black-ink flow-chart style on cream.
- **Assets:** `assets/` holds the supplied `system_diagram_v0.png` (verification decision flow) and `architecture.png` (high-level system map) for reference and embedding. No proprietary logo was supplied — the wordmark is set in Bricolage Grotesque (see Brand cards).

---

## INDEX — what lives where

**Foundations & tokens**
- `styles.css` — global entry point (imports only).
- `tokens/colors.css · typography.css · spacing.css · elevation.css · fonts.css · base.css`.
- `foundations/` — specimen cards: `color-brand · color-surfaces · color-text · color-status` (Colors), `type-display · type-body · type-mono` (Type), `spacing-scale · spacing-radius` (Spacing), `brand-wordmark · brand-voice` (Brand).

**Components** (`window.ConsistencyCheckDesignSystem_77c3a7`)
- `components/forms/` — **Button · IconButton · Input · FilterChip · Tabs** (`forms.card.html`).
- `components/status/` — **StatusBadge · RiskBadge · HealthMeter** (`status.card.html`).
- `components/surfaces/` — **Card · StatCard · Avatar** (`surfaces.card.html`).
- Each component ships `.jsx` + `.d.ts` + `.prompt.md`.

**UI kit** (`ui_kits/consistency-check/`)
- `index.html` — full click-through app shell + tab routing (also a Starting Point).
- Screens: `Dashboard · CitationChecker (table + detail drawer) · Supervision · AuditTrail · DataSources (+ architecture snapshot)`.
- `CaseHeader.jsx`, `shared.jsx` (Icon/Overline/Meta helpers), `data.js` (all static demo data).

**Assets** — `assets/system-flow-diagram.png` (verification decision flow), `assets/architecture-diagram.png` (high-level system map).

**Skill** — `SKILL.md` (Agent-Skill manifest for downloadable use).

---

## Font substitution notice

The proprietary originals (**rb-freigeist-neue**, **basier-square**) could not be licensed. Per the brief's own guidance they are substituted with **Bricolage Grotesque** (display) and **Geist** (UI/body) from Google Fonts; **JetBrains Mono** is the genuine family. If you have the original font files, drop them in and update `tokens/fonts.css` — **please send them and I'll swap them in.**
