/* Consistency Check — verification flow engine.
   Mirrors the two-stage decision flow:
     Stage 1 (internal corpus) → described correctly?  → Verified / Real-misused
     Stage 2 (external check)   → found? described?     → Externally-verified / Externally-real-misused / Likely-fabricated
   Firm guardrails (set pre-run) then route each leaf verdict to Pass or Review. */
(function () {
  const VERDICT = {
    'Verified': { stage: 'internal', status: 'Verified', tone: 'var(--verified)' },
    'Real, misused': { stage: 'internal', status: 'Mischaracterised', tone: 'var(--mischar)' },
    'Externally verified': { stage: 'external', status: 'Verified', tone: 'var(--verified)' },
    'Externally real, misused': { stage: 'external', status: 'Mischaracterised', tone: 'var(--mischar)' },
    'Not found': { stage: 'external', status: 'Fabricated', tone: 'var(--fabricated)' },
  };

  const EXTERNAL_CASE_SOURCES = ['CourtListener', 'Perplexity Live Search'];

  function matchOf(f) { return (window.CCData.corpus[f.id] || {}).match; }

  // Derive the leaf verdict + the decision path for a finding.
  function verdictOf(f) {
    const m = matchOf(f);
    const steps = [];
    let leaf;
    if (m === 'corpus') {
      steps.push({ stage: 'Stage 1 · internal', q: 'Found in trusted corpus?', a: 'Yes — case in internal corpus', result: 'yes' });
      if (f.status === 'Verified') {
        steps.push({ q: 'Claim matches the holding?', a: 'Yes — proposition supported', result: 'yes' });
        leaf = 'Verified';
      } else {
        steps.push({ q: 'Claim matches the holding?', a: 'No — proposition not supported', result: 'no' });
        leaf = 'Real, misused';
      }
    } else {
      steps.push({ stage: 'Stage 1 · internal', q: 'Found in trusted corpus?', a: 'No — not in internal corpus', result: 'no' });
      steps.push({ stage: 'Stage 2 · external', q: 'Escalate to external check', a: 'Authoritative / open-source search', result: 'go' });
      if (m === 'external') {
        steps.push({ q: 'Found in an approved external source?', a: 'Yes — source exists externally', result: 'yes' });
        if (f.status === 'Verified') {
          steps.push({ q: 'Claim matches external text?', a: 'Yes — described correctly', result: 'yes' });
          leaf = 'Externally verified';
        } else {
          steps.push({ q: 'Claim matches external text?', a: 'No — described incorrectly', result: 'no' });
          leaf = 'Externally real, misused';
        }
      } else {
        steps.push({ q: 'Found in an approved external source?', a: 'No — absent from every source checked', result: 'no' });
        leaf = 'Not found';
      }
    }
    return { leaf, steps, meta: VERDICT[leaf] };
  }

  function externalSupported(g) {
    return EXTERNAL_CASE_SOURCES.some((s) => g.trusted[s]);
  }

  const RISK_RANK = { Critical: 4, High: 3, Medium: 2, Low: 1 };
  function jurisdictionOf(f) {
    const j = (window.CCData.analysis[f.id] || {}).jurisdiction || '';
    return { label: j, out: /\bUS\b|United States|\bEU\b|European/i.test(j), inUk: /England|Wales|United Kingdom|\bUK\b/i.test(j) };
  }

  // Apply firm guardrails → Pass or Review, with the reason for the flag.
  function disposition(f, g) {
    const { leaf, meta } = verdictOf(f);
    if (meta.stage === 'external' && !externalSupported(g)) {
      return { d: 'Review', leaf, reason: 'No approved external source enabled — manual check required' };
    }
    const jur = jurisdictionOf(f);
    if (jur.out && (g.jurisdiction === 'flag')) {
      return { d: 'Review', leaf, reason: 'Out-of-jurisdiction authority (' + jur.label + ') — flagged: persuasive only, not binding in E&W' };
    }
    switch (leaf) {
      case 'Verified':
        return { d: 'Pass', leaf, reason: 'Exists in corpus and correctly applied' };
      case 'Externally verified':
        return g.routeExtVerified === 'review'
          ? { d: 'Review', leaf, reason: 'Firm routes externally-verified citations to review' }
          : { d: 'Pass', leaf, reason: 'Confirmed in approved external source' };
      case 'Real, misused':
        return { d: 'Review', leaf, reason: 'Authority exists but is misapplied' };
      case 'Externally real, misused':
        return { d: 'Review', leaf, reason: 'External authority exists but is misapplied' };
      case 'Not found':
        return g.absent === 'ignore'
          ? { d: 'Pass', leaf, reason: 'Absent from checked sources — ignored per firm threshold' }
          : { d: 'Review', leaf, reason: 'Not found in any available source — suspected fabrication' };
      default:
        return { d: 'Review', leaf, reason: 'Needs review' };
    }
  }

  // Triage order — what to fix first against the clock (severity, then weakest fidelity).
  function triage(findings, g) {
    const items = findings.map((f) => ({ f, disp: disposition(f, g), min: (window.CCData.analysis[f.id] || {}).triageMin || 0 }))
      .filter((x) => x.disp.d === 'Review')
      .sort((a, b) => (RISK_RANK[b.f.risk] - RISK_RANK[a.f.risk]) || (((window.CCData.analysis[a.f.id] || {}).fidelity ?? 999) - ((window.CCData.analysis[b.f.id] || {}).fidelity ?? 999)));
    return { items, totalMin: items.reduce((s, x) => s + x.min, 0), count: items.length };
  }

  function summary(findings, g) {
    const s = {
      total: findings.length,
      stage1Found: 0, stage1Escalate: 0,
      internalVerified: 0, internalMisused: 0,
      stage2Found: 0, stage2Absent: 0,
      extVerified: 0, extMisused: 0, fabricated: 0,
      pass: 0, review: 0,
    };
    findings.forEach((f) => {
      const { leaf } = verdictOf(f);
      if (leaf === 'Verified') { s.stage1Found++; s.internalVerified++; }
      else if (leaf === 'Real, misused') { s.stage1Found++; s.internalMisused++; }
      else if (leaf === 'Externally verified') { s.stage1Escalate++; s.stage2Found++; s.extVerified++; }
      else if (leaf === 'Externally real, misused') { s.stage1Escalate++; s.stage2Found++; s.extMisused++; }
      else { s.stage1Escalate++; s.stage2Absent++; s.fabricated++; }
      const disp = disposition(f, g);
      if (disp.d === 'Pass') s.pass++; else s.review++;
    });
    s.readyToFile = s.review === 0 ? 'Yes' : 'No';
    return s;
  }

  window.CCFlow = { verdictOf, disposition, summary, externalSupported, jurisdictionOf, triage, EXTERNAL_CASE_SOURCES };

  // Default firm guardrails — conservative base posture: anything short of clear
  // certainty is flagged. The lawyer can relax each control.
  window.CCDefaultGuardrails = {
    posture: 'conservative',
    routeExtVerified: 'review',   // ext. verified → review
    absent: 'flag',               // absent = flag (vs ignore)
    jurisdiction: 'flag',         // out-of-jurisdiction → flag (vs persuasive / allow)
    trusted: {
      'CourtListener': true,
      'legislation.gov.uk': true,
      'EUR-Lex / CELLAR SPARQL': true,
      'Caselaw Access Project': true,
      'UK Supreme Court': true,
      'Perplexity Live Search': true,
    },
  };

  // Named review postures the lawyer can pick at upload time.
  // Conservative is the safe base; Flexible relaxes the external-verified routing
  // (and treats out-of-jurisdiction authority as persuasive rather than a flag),
  // while STILL flagging suspected fabrications — that guardrail is never relaxed.
  window.CCPostures = {
    conservative: {
      key: 'conservative',
      label: 'Conservative',
      tag: 'recommended',
      blurb: 'Flag anything short of certainty. Externally-verified citations still go to a human, and out-of-jurisdiction authority is flagged.',
      rules: { routeExtVerified: 'review', absent: 'flag', jurisdiction: 'flag' },
    },
    flexible: {
      key: 'flexible',
      label: 'Flexible',
      tag: 'fewer reviews',
      blurb: 'Accept approved external sources without flagging, and treat foreign authority as persuasive. Suspected fabrications are always flagged.',
      rules: { routeExtVerified: 'pass', absent: 'flag', jurisdiction: 'persuasive' },
    },
  };
  // Build a full guardrails object for a posture, preserving the trusted-source list.
  window.CCGuardrailsForPosture = function (key, base) {
    const p = window.CCPostures[key] || window.CCPostures.conservative;
    const b = base || window.CCDefaultGuardrails;
    return { ...JSON.parse(JSON.stringify(b)), ...p.rules, posture: p.key };
  };
})();
