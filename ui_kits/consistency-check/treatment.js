/* Consistency Check — citation treatment / triangulation layer.
   The primary judgment is the ultimate authority for "is the holding-claim correct".
   This layer adds the SECONDARY signal a lawyer uses to triangulate good law:
   how the authority has been treated across the corpus (applied / considered /
   distinguished / doubted / overruled), and what that pattern implies.

   Every citing case below is a real authority from the provided UK/Commonwealth
   corpus or the Source Library; the cross-citations are genuine relationships
   (e.g. OBG v Allan re-affirming Lumley v Gye; The Achilleas qualifying Hadley
   v Baxendale; One Step v Morris-Garner narrowing Wrotham Park).

   signal taxonomy (Bernard's four scenarios):
     settled     — exists + applied consistently in the same way   → triangulation reinforces
     developing  — exists + applied but refined/qualified over time → correct, evolving
     contested   — exists + cited divergently (applied vs doubted)  → correct, but FLAG
     isolated    — exists but no corpus cross-citation              → not yet triangulated
     corroborated— treatment INDEPENDENTLY contradicts the brief's use (mischaracterised)
     confabulation— not found, but the proposition maps onto real dicta the draft drifted from
*/
window.CCData.treatment = {
  // ── Verified, well-triangulated ──────────────────────────────────────────
  'cit-001': {
    signal: 'settled', citingCount: 4,
    summary: 'Applied as the foundational authority for accessory liability in four later corpus cases — consistently, and without contradiction. Strong triangulation: the brief uses it for exactly the proposition the line of cases settles.',
    citedBy: [
      { case: 'OBG Ltd v Allan', citation: '[2007] UKHL 21', court: 'House of Lords', treatment: 'applied', point: 'Lord Hoffmann and Lord Nicholls re-affirmed Lumley as the genus tort of inducing breach, restoring it after a period of doctrinal drift.', para: '[1], [32]–[44]' },
      { case: 'Quinn v Leathem', citation: '[1901] AC 495', court: 'House of Lords', treatment: 'applied', point: 'Approved and extended the Lumley principle to interference effected by unlawful means.' },
      { case: 'DC Thomson & Co Ltd v Deakin', citation: '[1952] Ch 646', court: 'Court of Appeal', treatment: 'considered', point: 'Carried the principle into indirect procurement, requiring knowledge of the contract and unlawful means.' },
      { case: 'Allen v Flood', citation: '[1898] AC 1', court: 'House of Lords', treatment: 'distinguished', point: 'Confined Lumley: no liability for intentional harm by lawful means absent a procured breach.' },
    ],
    ratio: { binding: true, note: 'The existence of the tort is ratio in Lumley itself and re-affirmed as ratio in OBG v Allan. The brief relies on it for precisely that binding proposition.' },
  },
  'cit-002': {
    signal: 'settled', citingCount: 2,
    summary: 'The modern apex restatement of the economic torts. Applied without dissent in the corpus authorities that follow it — a current, settled foundation.',
    citedBy: [
      { case: 'HM Revenue & Customs v Total Network SL', citation: '[2008] UKHL 19', court: 'House of Lords', treatment: 'applied', point: "Adopted OBG's unlawful-means framework when analysing unlawful-means conspiracy.", para: '[43]–[45]' },
      { case: 'Meretz Investments NV v ACP Ltd', citation: '[2007] EWCA Civ 1303', court: 'Court of Appeal', treatment: 'applied', point: "Applied OBG's separation of the inducing-breach tort from the unlawful-means tort." },
    ],
    ratio: { binding: true, note: "OBG's two-tort taxonomy is ratio. The brief invokes it for that distinction — on point." },
  },
  'cit-003': {
    signal: 'developing', citingCount: 1,
    summary: "Sound authority, but its reasoning has been partly absorbed. OBG v Allan reorganised the economic torts and folded aspects of Thomson's 'indirect interference' analysis into the unlawful-means tort — so parts of it no longer stand wholly independently.",
    citedBy: [
      { case: 'OBG Ltd v Allan', citation: '[2007] UKHL 21', court: 'House of Lords', treatment: 'considered', point: "Re-characterised Thomson's indirect-procurement reasoning within the unified unlawful-means framework; the result survives, the route was re-cast.", para: '[36]–[39]' },
    ],
    ratio: { binding: true, note: 'The knowledge + unlawful-means requirement remains good law; read it through the OBG lens rather than in isolation.' },
  },
  'cit-004': {
    signal: 'developing', citingCount: 3,
    summary: 'The remoteness rule is bedrock and heavily triangulated — but live. Applied repeatedly, then qualified by The Achilleas. Strong support, with one material gloss the draft should acknowledge.',
    citedBy: [
      { case: 'Czarnikow Ltd v Koufos (The Heron II)', citation: '[1969] 1 AC 350', court: 'House of Lords', treatment: 'applied', point: "Refined the second limb to a 'not unlikely to result' standard of contemplation." },
      { case: 'H Parsons (Livestock) Ltd v Uttley Ingham & Co', citation: '[1978] QB 791', court: 'Court of Appeal', treatment: 'applied', point: 'Applied the type-of-loss approach: foreseeability attaches to the type of loss, not its extent.' },
      { case: 'Transfield Shipping v Mercator (The Achilleas)', citation: '[2008] UKHL 48', court: 'House of Lords', treatment: 'distinguished', point: 'Overlaid an assumption-of-responsibility filter, so a foreseeable loss may still be too remote where market understanding would not place that risk on the defendant.', para: '[9], [21]–[23]' },
    ],
    ratio: { binding: true, note: 'The two-limb test is ratio. Whether the Achilleas assumption-of-responsibility gloss is itself ratio or a narrow exception is the open question — see cit-005.' },
  },
  'cit-005': {
    signal: 'contested', citingCount: 2,
    summary: 'The authority exists and is correctly named — but its ratio is genuinely unsettled. The House of Lords split on the reasoning, and later cases have read it narrowly. This is exactly why the brief is flagged "review wording": the wide principle it leans on may be the contested, not the binding, reading.',
    citedBy: [
      { case: 'Transfield (The Achilleas) — within the decision', citation: '[2008] UKHL 48', court: 'House of Lords', treatment: 'doubted', point: 'Internally divergent: Lord Hoffmann decided on assumption of responsibility; Lords Rodger and Baroness Hale reached the same result on orthodox Hadley grounds — leaving which rationale is binding unclear.', para: '[11]–[15] cf [60]–[63]' },
      { case: 'Sylvia Shipping Co v Progress Bulk Carriers', citation: '[2010] EWHC 542 (Comm)', court: 'Commercial Court', treatment: 'distinguished', point: 'Read The Achilleas narrowly — assumption of responsibility is an exception for unusual cases, not a general re-writing of Hadley.', external: true },
    ],
    ratio: { binding: null, note: 'Whether the assumption-of-responsibility principle is ratio or obiter is itself disputed across the bench and later cases. The deepest fidelity question here — ratio vs dicta — is roadmap, not yet automated.', roadmap: true },
  },
  'cit-006': {
    signal: 'settled', citingCount: 1,
    summary: 'The standard interim-injunction test, settled for 50 years. One corpus authority glosses it — Series 5 Software — which is itself relied on later in this very brief (cit-007).',
    citedBy: [
      { case: 'Series 5 Software Ltd v Clarke', citation: '[1996] 1 All ER 853', court: 'Chancery Division', treatment: 'considered', point: 'Laddie J read American Cyanamid as permitting a limited assessment of the relative merits where the evidence credibly allows it.', external: true },
    ],
    ratio: { binding: true, note: 'Serious-question-to-be-tried + balance of convenience is ratio and undisturbed. The brief states it correctly.' },
  },
  'cit-007': {
    signal: 'isolated', citingCount: 0,
    summary: 'Confirmed on open-web search but outside the curated corpus — and no in-corpus authority cites it, so it cannot yet be triangulated. Promoting it into the Source Library would let future matters cross-check it deterministically rather than re-running an open-web search.',
    citedBy: [],
    ratio: { binding: null, note: 'Outside the corpus; treatment unknown to this system. Verify the quotation and procedural context against the judgment before filing.' },
  },
  // ── Mischaracterised — treatment INDEPENDENTLY corroborates the flag ──────
  'cit-008': {
    signal: 'corroborated', citingCount: 3,
    summary: 'The decisive secondary check. Across the corpus, Anglia v Reed is cited uniformly for RELIANCE loss — never once for the expectation / lost-profit proposition the brief advances. The treatment pattern independently corroborates the mischaracterisation flag: the case is real and good law, but for a different measure of damages.',
    citedBy: [
      { case: 'C & P Haulage v Middleton', citation: '[1983] 1 WLR 1461', court: 'Court of Appeal', treatment: 'applied', point: 'Applied Anglia for reliance loss — and held a claimant cannot use reliance damages to escape a bad bargain. Squarely a reliance-measure authority.' },
      { case: 'Doyle v Olby (Ironmongers) Ltd', citation: '[1969] 2 QB 158', court: 'Court of Appeal', treatment: 'considered', point: 'Reliance/out-of-pocket measure in deceit — the same family of loss as Anglia, not expectation.' },
      { case: 'East v Maurer', citation: '[1991] 1 WLR 461', court: 'Court of Appeal', treatment: 'considered', point: 'Lost-opportunity reliance measure; again, not the expectation/lost-profit basis the brief asserts.' },
    ],
    ratio: { binding: true, note: "Denning MR's reliance-loss holding is the ratio. The brief cites the case for expectation loss — a proposition that is neither its ratio nor its dicta." },
  },
  'cit-009': {
    signal: 'corroborated', citingCount: 2,
    summary: 'Triangulation contradicts the brief twice over. Every corpus treatment places Wrotham Park in the negotiating-damages line — and the Supreme Court in One Step has since narrowed it expressly. It is not, and after One Step plainly cannot be, authority for ordinary lost-profit expectation damages.',
    citedBy: [
      { case: 'One Step (Support) Ltd v Morris-Garner', citation: '[2018] UKSC 20', court: 'UK Supreme Court', treatment: 'doubted', point: "Re-characterised 'Wrotham Park damages' as negotiating damages and confined them — emphatically NOT a route to ordinary lost-profit expectation damages.", para: '[91]–[95]' },
      { case: 'Pell Frischmann Engineering v Bow Valley Iran', citation: '[2009] UKPC 45', court: 'Privy Council', treatment: 'applied', point: 'Applied Wrotham Park to assess a negotiating / release-fee award for breach of an exclusivity obligation.', external: true },
    ],
    ratio: { binding: true, note: 'The release-fee / negotiating measure is the ratio, narrowed by One Step. The brief relies on it for a measure the line of authority excludes.' },
  },
  // ── Not found — confabulation trace (scenario 4) ─────────────────────────
  'cit-010': {
    signal: 'confabulation', citingCount: 0,
    summary: 'No such case exists in any source checked — that verdict stands. But its stated proposition maps cleanly onto well-settled dicta in real authorities, which is how the error most likely arose: a plausible-sounding name confabulated around a genuine principle the draft had seen cross-cited.',
    citedBy: [
      { case: 'OBG Ltd v Allan', citation: '[2007] UKHL 21', court: 'House of Lords', treatment: 'source-of-drift', point: 'The proposition the passage needs — interference with commercial and contractual relations — is governed by OBG. The likely real authority the draft drifted from.' },
      { case: 'Lumley v Gye', citation: '(1853) 2 E & B 216', court: "Queen's Bench", treatment: 'source-of-drift', point: 'The root authority for the inducing-breach principle the fabricated case was invented to support.' },
    ],
    ratio: { binding: false, note: 'There is no judgment to read. Use the real authorities above; do not cite the fabricated name.' },
  },
  'cit-011': {
    signal: 'confabulation', citingCount: 0,
    summary: 'Unverifiable — and the party names appear synthetic. Its proposition (recovery of procurement and investment loss) tracks the established pure-economic-loss line, the likely source the draft drifted from.',
    citedBy: [
      { case: 'Hedley Byrne & Co Ltd v Heller & Partners Ltd', citation: '[1964] AC 465', court: 'House of Lords', treatment: 'source-of-drift', point: 'The genuine route to recovering pure financial / investment loss — negligent misstatement on an assumption of responsibility.' },
    ],
    ratio: { binding: false, note: 'No judgment exists to verify. Rely on Hedley Byrne for the underlying proposition.' },
  },
  'cit-012': {
    signal: 'confabulation', citingCount: 0,
    summary: 'Not found in any source available here; treat as suspected fabrication. The consequential supply-chain proposition it is cited for is governed by the remoteness line — the principle the draft most likely generalised from.',
    citedBy: [
      { case: 'Czarnikow Ltd v Koufos (The Heron II)', citation: '[1969] 1 AC 350', court: 'House of Lords', treatment: 'source-of-drift', point: 'Controls recoverability of consequential loss on a commercial supply contract — remoteness measured by what was "not unlikely" to result.' },
    ],
    ratio: { binding: false, note: 'No judgment to read. The genuine authority for the proposition is The Heron II.' },
  },
};

/* Signal + treatment visual metadata, plus a triangulation summary helper. */
window.CCTreatmentMeta = {
  signal: {
    settled:      { label: 'Settled',          hue: 'var(--verified)',     bg: 'var(--verified-bg)',   icon: 'shield-check',  blurb: 'applied consistently' },
    developing:   { label: 'Developing',       hue: 'var(--primary-deep)', bg: 'var(--primary-soft)',  icon: 'route',         blurb: 'applied, then refined' },
    contested:    { label: 'Contested',        hue: 'var(--mischar)',      bg: 'var(--mischar-bg)',    icon: 'split',         blurb: 'divergent treatment' },
    isolated:     { label: 'Not triangulated', hue: 'var(--charcoal)',     bg: 'var(--surface-bone)',  icon: 'circle-dashed', blurb: 'no corpus cross-cites' },
    corroborated: { label: 'Corroborates flag',hue: 'var(--mischar)',      bg: 'var(--mischar-bg)',    icon: 'target',        blurb: 'treatment contradicts the brief' },
    confabulation:{ label: 'Confabulation trace',hue: 'var(--fabricated)', bg: 'var(--fabricated-bg)', icon: 'git-branch',    blurb: 'maps onto real dicta' },
  },
  treatment: {
    applied:          { label: 'Applied',        hue: 'var(--verified)',     bg: 'var(--verified-bg)',   icon: 'check' },
    followed:         { label: 'Followed',       hue: 'var(--verified)',     bg: 'var(--verified-bg)',   icon: 'check' },
    considered:       { label: 'Considered',     hue: 'var(--charcoal)',     bg: 'var(--surface-bone)',  icon: 'eye' },
    distinguished:    { label: 'Distinguished',  hue: 'var(--mischar)',      bg: 'var(--mischar-bg)',    icon: 'git-fork' },
    doubted:          { label: 'Doubted',        hue: 'var(--primary-deep)', bg: 'var(--primary-soft)',  icon: 'help-circle' },
    overruled:        { label: 'Overruled',      hue: 'var(--fabricated)',   bg: 'var(--fabricated-bg)', icon: 'x' },
    'source-of-drift':{ label: 'Likely source',  hue: 'var(--fabricated)',   bg: 'var(--fabricated-bg)', icon: 'git-branch' },
  },
};

/* Per-signal one-line verdict used in the table row + report. */
window.CCTreatmentVerdict = function (id) {
  const t = (window.CCData.treatment || {})[id];
  if (!t) return null;
  const m = window.CCTreatmentMeta.signal[t.signal] || {};
  const n = t.citingCount || 0;
  const cited = n === 0 ? 'no corpus cites' : n + ' corpus cite' + (n === 1 ? '' : 's');
  return { signal: t.signal, label: m.label, hue: m.hue, bg: m.bg, icon: m.icon, blurb: m.blurb, citingCount: n, citedText: cited };
};
