---
name: consistency-check-design
description: Use this skill to generate well-branded interfaces and assets for Consistency Check, a legal-AI document verification platform — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `readme.md` — full design guide: product context, content fundamentals, visual foundations, iconography, font notes.
- `styles.css` — the single global stylesheet to link. Imports all tokens + fonts.
- `tokens/` — colour, typography, spacing, radius, elevation, base reset (CSS custom properties).
- `components/` — React primitives (`forms/`, `status/`, `surfaces/`). Each has `.jsx` + `.d.ts` + `.prompt.md`.
- `ui_kits/consistency-check/` — full click-through verification dashboard (the reference product surface).
- `foundations/` — specimen cards for the design-system gallery.
- `assets/` — supplied system-flow and architecture diagrams.

## House rules (the short version)
- Warm cream canvas (`--canvas`), never pure white. Ink type, full grey ramp for hierarchy.
- Hot orange (`--primary`) is a scarce stamp — one per viewport. Never decorative.
- Verification verdicts: **Verified · Mischaracterised · Fabricated**. Risk ladder: **Low · Medium · High · Critical**. These are the only sanctioned non-neutral hues.
- Three type lanes: Bricolage Grotesque (display) · Geist (UI/body) · JetBrains Mono (every citation/reference). Emphasis = change family, not weight.
- Interactive elements are full pills; cards step to `--radius-md`/`lg`. Never sharpen a button or pill-shape a card.
- Voice: calm, precise, institutional. British spelling. No emoji. Actions are verbs.
- Icons: Lucide, 1.5–2px stroke, `currentColor`. No emoji.
