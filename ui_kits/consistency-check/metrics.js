/* Per-matter analytics. The live Crestholm matter derives every figure from
   the real findings + corpus + flow engine; the other three matters carry
   summarized figures so each one shows a full, distinct Insights view.
   Static demo workspace — no figures are computed from a live backend. */
(function () {
  // existence → x position on the risk map (in corpus / external / not found), kept off the axes
  const EXIST_X = { 'confirmed-internal': 0.9, 'confirmed-external': 0.58, 'absent': 0.08 };
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // Deterministic pseudo-spread so synthesized points look organic but stable.
  function jitter(seed, span) {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return (x - Math.floor(x) - 0.5) * span;
  }

  // Build scatter points from verdict buckets for non-live matters.
  function synthPoints(v, m, n, ext) {
    const pts = [];
    let k = 0;
    for (let i = 0; i < v; i++) {
      const isExt = i < ext;
      pts.push({ id: 'v' + i, label: 'Verified authority', status: 'Verified', risk: 'Low',
        x: clamp((isExt ? 0.58 : 0.88) + jitter(k, isExt ? 0.06 : 0.1), 0.03, 0.95), y: clamp(90 + jitter(k + 7, 14), 4, 96), fidNull: false });
      k++;
    }
    for (let i = 0; i < m; i++) {
      pts.push({ id: 'm' + i, label: 'Mischaracterised authority', status: 'Mischaracterised', risk: 'High',
        x: clamp(0.88 + jitter(k, 0.1), 0.03, 0.95), y: clamp(42 + jitter(k + 3, 22), 4, 96), fidNull: false });
      k++;
    }
    for (let i = 0; i < n; i++) {
      pts.push({ id: 'n' + i, label: 'Not found', status: 'Fabricated', risk: 'Critical',
        x: clamp(0.08 + jitter(k, 0.05), 0.03, 0.2), y: clamp(7 + jitter(k + 1, 6), 4, 16), fidNull: true });
      k++;
    }
    return pts;
  }

  function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }

  function normalize(raw) {
    const saved = Math.max(0, raw.manualMin - raw.assistedMin);
    return Object.assign({
      savedMin: saved,
      pctFaster: pct(saved, raw.manualMin),
      verifiedPct: pct(raw.verified, raw.total),
    }, raw);
  }

  // Live matter — everything from real data.
  function crestholm(g) {
    const F = window.CCData.findings;
    const A = window.CCData.analysis;
    const C = window.CCData.corpus;
    const sum = window.CCFlow.summary(F, g);
    const tri = window.CCFlow.triage(F, g);

    let internal = 0, external = 0, noneProv = 0;
    F.forEach((f) => { const mm = (C[f.id] || {}).match; if (mm === 'corpus') internal++; else if (mm === 'external') external++; else noneProv++; });

    let uk = 0, foreign = 0, unresolved = 0;
    F.forEach((f) => {
      const j = (A[f.id] || {}).jurisdiction || '';
      const m = (C[f.id] || {}).match;
      if (m === 'none' || /unresolved/i.test(j) || !j) unresolved++;
      else if (/\bUS\b|United States|Texas|\bEU\b|European/i.test(j)) foreign++;
      else uk++;
    });

    const existConfirmed = F.filter((f) => /confirmed/.test((A[f.id] || {}).existence || '')).length;
    const fidVals = F.map((f) => (A[f.id] || {}).fidelity).filter((v) => v != null);
    const avgFid = Math.round(fidVals.reduce((s, v) => s + v, 0) / (fidVals.length || 1));

    const points = F.map((f, i) => {
      const a = A[f.id] || {}; const m = (C[f.id] || {}).match;
      const baseX = EXIST_X[a.existence] != null ? EXIST_X[a.existence] : (m === 'none' ? 0.08 : 0.9);
      const baseY = a.fidelity == null ? (m === 'none' ? 7 : 50) : a.fidelity;
      const notFound = m === 'none';
      return {
        id: f.id, label: f.citation, status: f.status, risk: f.risk,
        x: clamp(baseX + jitter(i + 1, notFound ? 0.05 : 0.06), 0.03, 0.95),
        y: clamp(baseY + jitter(i + 9, notFound ? 5 : 5), 4, 96),
        fidNull: a.fidelity == null,
        flagged: window.CCFlow.disposition(f, g).d === 'Review',
      };
    });

    const manualMin = F.length * 18;             // unaided: ~18 min to read, locate & verify each authority
    const assistedMin = tri.totalMin + sum.pass * 2; // assisted: triage the flagged + a 2-min confirm per pass

    return normalize({
      id: 'crestholm', live: true,
      total: F.length, verified: sum.internalVerified + sum.extVerified, mischar: sum.internalMisused + sum.extMisused, none: sum.fabricated,
      pass: sum.pass, review: sum.review, flagged: tri.count, flaggedMin: tri.totalMin,
      prov: { internal, external, none: noneProv },
      jur: { uk, foreign, unresolved },
      existConfirmed, avgFid, manualMin, assistedMin,
      points, health: window.CCData.scores.health, deadline: window.CCData.filing.deadline, status: 'Partner review',
    });
  }

  const STATIC = {
    penrose: {
      id: 'penrose', total: 9, verified: 9, mischar: 0, none: 0, pass: 9, review: 0, flagged: 0, flaggedMin: 0,
      prov: { internal: 7, external: 2, none: 0 }, jur: { uk: 9, foreign: 0, unresolved: 0 },
      existConfirmed: 9, avgFid: 93, manualMin: 162, assistedMin: 20, health: 92, deadline: '—', status: 'Filed',
      points: synthPoints(9, 0, 0, 2),
    },
    harwell: {
      id: 'harwell', total: 14, verified: 13, mischar: 1, none: 0, pass: 13, review: 1, flagged: 1, flaggedMin: 10,
      prov: { internal: 11, external: 3, none: 0 }, jur: { uk: 12, foreign: 2, unresolved: 0 },
      existConfirmed: 14, avgFid: 86, manualMin: 252, assistedMin: 38, health: 81, deadline: '—', status: 'Cleared',
      points: synthPoints(13, 1, 0, 3),
    },
    lockton: {
      id: 'lockton', total: 7, verified: 4, mischar: 2, none: 1, pass: 4, review: 3, flagged: 3, flaggedMin: 34,
      prov: { internal: 4, external: 2, none: 1 }, jur: { uk: 5, foreign: 1, unresolved: 1 },
      existConfirmed: 6, avgFid: 71, manualMin: 126, assistedMin: 46, health: 64, deadline: '15:30', status: 'In review',
      points: synthPoints(4, 2, 1, 2),
    },
  };

  window.CCMetrics = function (projectId, guardrails) {
    if (projectId === 'crestholm') return crestholm(guardrails || window.CCDefaultGuardrails);
    const raw = STATIC[projectId];
    return raw ? normalize(raw) : null;
  };
})();
