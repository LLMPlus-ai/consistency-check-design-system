/* Insights tab — analytical decomposition of a matter's citation risk.
   Every figure is computed from the matter's own data (window.CCMetrics),
   so each matter in the rail shows its own distinct, correct figures. */
const { Card } = window.ConsistencyCheckDesignSystem_77c3a7;
const { CCIcon: Icon, CCOverline: Overline, CCCountUp: CountUp } = window;

function Figure({ title, hint, badge, children, caption, span }) {
  return (
    <div style={{ gridColumn: span ? '1 / -1' : 'auto', background: 'var(--surface-card)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--elev-card)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '16px 18px 12px' }}>
        <div>
          <div style={{ font: 'var(--heading-sm)', fontSize: 15, color: 'var(--ink)' }}>{title}</div>
          {hint && <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 3 }}>{hint}</div>}
        </div>
        {badge && <span style={{ flex: '0 0 auto', display: 'inline-flex', alignItems: 'center', gap: 5, height: 22, padding: '0 9px', borderRadius: 'var(--radius-full)', background: 'var(--surface-bone)', border: '1px solid var(--hairline)', font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--charcoal)' }}>{badge}</span>}
      </div>
      <div style={{ padding: '0 18px', flex: 1 }}>{children}</div>
      {caption && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, margin: '14px 18px 16px', paddingTop: 12, borderTop: '1px solid var(--hairline)', font: 'var(--body-sm)', color: 'var(--charcoal)' }}>
          <Icon name="info" size={14} style={{ color: 'var(--stone)', marginTop: 1, flex: '0 0 auto' }} />
          <span>{caption}</span>
        </div>
      )}
    </div>
  );
}

/* ---- KPI tiles ---- */
function Kpi({ icon, label, value, sub, hue, fmt }) {
  return (
    <div style={{ flex: 1, minWidth: 0, background: 'var(--surface-card)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--elev-card)', padding: '16px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--surface-bone)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: hue || 'var(--charcoal)' }}><Icon name={icon} size={15} /></span>
        <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>{label}</span>
      </div>
      <div style={{ font: '600 30px/1 var(--font-display)', color: hue || 'var(--ink)', marginTop: 12, letterSpacing: '-0.5px' }}>
        <CountUp value={value} format={fmt || ((v) => v)} />
      </div>
      <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 5 }}>{sub}</div>
    </div>
  );
}

/* ---- segmented bar + legend ---- */
function InsightsBar({ segments, height = 16 }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <div>
      <div style={{ display: 'flex', height, borderRadius: 'var(--radius-full)', overflow: 'hidden', background: 'var(--hairline)' }}>
        {segments.filter((s) => s.value > 0).map((s, i) => (
          <div key={i} title={s.label + ': ' + s.value} style={{ width: (s.value / total) * 100 + '%', background: s.hue, transition: 'width 500ms ease' }} />
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', marginTop: 14 }}>
        {segments.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: s.hue, flex: '0 0 auto' }} />
            <span style={{ font: 'var(--caption-strong)', fontSize: 13, color: 'var(--ink)' }}>{s.value}</span>
            <span style={{ font: 'var(--body-sm)', color: 'var(--mute)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Risk map: existence (x) × fidelity (y) ---- */
function RiskMap({ m }) {
  const W = 640, H = 340, L = 56, R = 24, T = 22, B = 50;
  const pw = W - L - R, ph = H - T - B;
  const px = (x) => L + Math.max(0, Math.min(1, x)) * pw;
  const py = (y) => T + (1 - Math.max(0, Math.min(100, y)) / 100) * ph;
  const xMid = px(0.5), yMid = py(60);
  const STYLE = {
    Verified: { fill: 'var(--verified)' },
    Mischaracterised: { fill: 'var(--mischar)' },
    Fabricated: { fill: 'var(--fabricated)' },
  };
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }} preserveAspectRatio="xMidYMid meet">
        {/* quadrant zones */}
        <rect x={L} y={T} width={xMid - L} height={ph} fill="var(--fabricated)" opacity="0.06" />
        <rect x={xMid} y={T} width={px(1) - xMid} height={yMid - T} fill="var(--verified)" opacity="0.07" />
        <rect x={xMid} y={yMid} width={px(1) - xMid} height={py(0) - yMid} fill="var(--mischar)" opacity="0.07" />
        {/* zone captions */}
        <text x={(L + xMid) / 2} y={T + 18} textAnchor="middle" style={{ font: '600 11px var(--font-mono)', fill: 'var(--fabricated)', opacity: 0.7 }}>NOT FOUND</text>
        <text x={(xMid + px(1)) / 2} y={T + 18} textAnchor="middle" style={{ font: '600 11px var(--font-mono)', fill: 'var(--verified)', opacity: 0.8 }}>EXISTS · FAITHFUL</text>
        <text x={(xMid + px(1)) / 2} y={py(0) - 10} textAnchor="middle" style={{ font: '600 11px var(--font-mono)', fill: 'var(--mischar)', opacity: 0.85 }}>EXISTS · DRIFTED</text>
        {/* axes */}
        <line x1={L} y1={py(0)} x2={px(1)} y2={py(0)} stroke="var(--hairline-strong)" strokeWidth="1" />
        <line x1={L} y1={T} x2={L} y2={py(0)} stroke="var(--hairline-strong)" strokeWidth="1" />
        <line x1={xMid} y1={T} x2={xMid} y2={py(0)} stroke="var(--hairline)" strokeDasharray="3 4" />
        <line x1={L} y1={yMid} x2={px(1)} y2={yMid} stroke="var(--hairline)" strokeDasharray="3 4" />
        {/* y ticks */}
        {[0, 50, 100].map((t) => (
          <g key={t}>
            <text x={L - 10} y={py(t) + 4} textAnchor="end" style={{ font: '11px var(--font-mono)', fill: 'var(--ash)' }}>{t}</text>
          </g>
        ))}
        <text x={16} y={T + ph / 2} textAnchor="middle" transform={`rotate(-90 16 ${T + ph / 2})`} style={{ font: '600 11px var(--font-mono)', fill: 'var(--mute)', letterSpacing: '0.08em' }}>FIDELITY %</text>
        {/* x labels */}
        <text x={px(0.05)} y={py(0) + 22} textAnchor="start" style={{ font: '11px var(--font-mono)', fill: 'var(--ash)' }}>not found</text>
        <text x={px(0.58)} y={py(0) + 22} textAnchor="middle" style={{ font: '11px var(--font-mono)', fill: 'var(--ash)' }}>external</text>
        <text x={px(1)} y={py(0) + 22} textAnchor="end" style={{ font: '11px var(--font-mono)', fill: 'var(--ash)' }}>in corpus</text>
        <text x={L + pw / 2} y={H - 6} textAnchor="middle" style={{ font: '600 11px var(--font-mono)', fill: 'var(--mute)', letterSpacing: '0.08em' }}>EXISTENCE →</text>
        {/* points */}
        {m.points.map((p, i) => {
          const cx = px(p.x), cy = py(p.y);
          const fill = (STYLE[p.status] || {}).fill || 'var(--stone)';
          if (p.fidNull) {
            return <g key={p.id}><title>{p.label} · not found (fidelity N/A)</title>
              <circle cx={cx} cy={cy} r="7" fill="none" stroke={fill} strokeWidth="2" strokeDasharray="3 3" />
              <circle cx={cx} cy={cy} r="1.5" fill={fill} />
            </g>;
          }
          return <g key={p.id}><title>{p.label} · fidelity {Math.round(p.y)}%</title>
            {p.flagged && <circle cx={cx} cy={cy} r="11" fill="none" stroke={fill} strokeWidth="1.5" opacity="0.4" />}
            <circle cx={cx} cy={cy} r="7" fill={fill} stroke="var(--surface-card)" strokeWidth="2" />
          </g>;
        })}
      </svg>
    </div>
  );
}

/* ---- calibration gauge ---- */
function Gauge({ label, value, max = 100, suffix = '%', hue, note }) {
  const pctv = Math.round((value / max) * 100);
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>{label}</span>
        <span style={{ font: '600 22px/1 var(--font-display)', color: hue }}><CountUp value={value} />{suffix}</span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: 'var(--hairline)', marginTop: 8, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pctv + '%', background: hue, borderRadius: 4, transformOrigin: 'left', animation: 'ccGrowX 650ms ease' }} />
      </div>
      <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 7 }}>{note}</div>
    </div>
  );
}

/* ---- time / effort bars ---- */
function EffortBar({ label, minutes, peak, hue, tag }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ font: 'var(--caption-strong)', fontSize: 13, color: 'var(--ink)' }}>{label}</span>
        <span style={{ font: 'var(--code-sm)', color: 'var(--charcoal)' }}>{Math.round(minutes)} min · {tag}</span>
      </div>
      <div style={{ height: 22, borderRadius: 'var(--radius-sm)', background: 'var(--hairline)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: (minutes / peak) * 100 + '%', background: hue, borderRadius: 'var(--radius-sm)', transition: 'width 600ms ease' }} />
      </div>
    </div>
  );
}

function Insights({ app }) {
  const id = app.activeProject;
  const m = window.CCMetrics(id, app.guardrails);
  const project = window.CCData.projects.find((p) => p.id === id) || window.CCData.projects[0];
  if (!m) return null;
  const hrs = (mins) => (mins >= 60 ? (mins / 60).toFixed(1) + ' h' : Math.round(mins) + ' min');
  const peak = Math.max(m.manualMin, m.assistedMin);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <Overline>Insights · {m.live ? 'live analysis' : 'archived matter'}</Overline>
          <h2 style={{ margin: '6px 0 0', font: 'var(--display-md)', letterSpacing: '-0.5px', color: 'var(--ink)' }}>{project.matter}</h2>
          <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 4 }}>{project.type} · {m.total} authorities · figures derived from this matter's findings</div>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 30, padding: '0 13px', borderRadius: 'var(--radius-full)', background: 'var(--surface-bone)', border: '1px solid var(--hairline)', font: 'var(--caption-strong)', color: 'var(--charcoal)' }}>
          <Icon name="git-commit" size={14} /> {m.status}
        </span>
      </div>

      {/* KPI row */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <Kpi icon="activity" label="Citation health" value={m.health} sub={(m.verifiedPct) + '% of authorities verified'} hue={m.health >= 75 ? 'var(--verified)' : m.health >= 50 ? 'var(--mischar)' : 'var(--fabricated)'} />
        <Kpi icon="shield-check" label="Verified" value={m.verified} fmt={(v) => v + ' / ' + m.total} sub="exist & applied correctly" hue="var(--verified)" />
        <Kpi icon="flag" label="Flagged for review" value={m.flagged} sub={m.flaggedMin + ' min to clear at triage'} hue={m.flagged ? 'var(--fabricated)' : 'var(--verified)'} />
        <Kpi icon="timer" label="Reviewer time saved" value={m.savedMin} fmt={(v) => hrs(v)} sub={m.pctFaster + '% faster than unaided'} hue="var(--primary-deep)" />
      </div>

      {!m.live && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', background: 'var(--surface-bone)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', font: 'var(--body-sm)', color: 'var(--charcoal)' }}>
          <Icon name="archive" size={15} style={{ color: 'var(--stone)', flex: '0 0 auto' }} />
          <span>Archived matter — these figures are from this matter's completed review. The live citation-level workspace (Document, Citations, Audit) is loaded for the Crestholm matter.</span>
        </div>
      )}

      {/* hero risk map */}
      <Figure title="Risk map — existence × fidelity" badge="2-axis"
        hint="Each authority placed by whether it exists (x) and how faithfully the brief uses it (y). The two questions are answered separately — a real case can still sit low."
        caption="Decoupling the axes is the core method: existence is a near-deterministic lookup; fidelity is a model judgment. Points in the amber band exist but are misapplied — the failure a fast human reader is most likely to wave through."
        span>
        <RiskMap m={m} />
      </Figure>

      {/* 2-col grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        <Figure title="Where each authority was verified" badge="provenance"
          hint="Internal corpus vs open-web vs not found anywhere."
          caption="The system never claims more reach than it has. Anything confirmed only externally — or not found at all — is surfaced for a human, not silently passed.">
          <InsightsBar segments={[
            { value: m.prov.internal, label: 'Internal corpus', hue: 'var(--verified)' },
            { value: m.prov.external, label: 'Open-web / external', hue: 'var(--mischar)' },
            { value: m.prov.none, label: 'Not found in any source', hue: 'var(--fabricated)' },
          ]} />
        </Figure>

        <Figure title="Jurisdiction mix" badge="binding ≠ persuasive"
          hint="Binding (E&W) vs foreign persuasive vs unresolved."
          caption="A case can exist and be quoted correctly yet still be the wrong jurisdiction. Foreign authority is flagged as persuasive-only by default, separately from whether it is real.">
          <InsightsBar segments={[
            { value: m.jur.uk, label: 'England & Wales — binding', hue: 'var(--verified)' },
            { value: m.jur.foreign, label: 'Foreign — persuasive only', hue: 'var(--mischar)' },
            { value: m.jur.unresolved, label: 'Unresolved', hue: 'var(--fabricated)' },
          ]} />
        </Figure>

        <Figure title="Confidence, decomposed" badge="rigour"
          hint="Why a single % would mislead."
          caption="Existence is checked deterministically against sources; fidelity is a model judgment about whether the proposition matches the holding. Reporting one blended number would overstate the soft part and undersell the hard part.">
          <div style={{ display: 'flex', gap: 22, marginTop: 4 }}>
            <Gauge label="Existence" value={Math.round((m.existConfirmed / m.total) * 100)} hue="var(--verified)" note={m.existConfirmed + ' / ' + m.total + ' confirmed against a source — near-deterministic'} />
            <Gauge label="Fidelity" value={m.avgFid} hue={m.avgFid >= 80 ? 'var(--verified)' : m.avgFid >= 60 ? 'var(--mischar)' : 'var(--fabricated)'} note="mean proposition-match across authorities — model judgment" />
          </div>
        </Figure>

        <Figure title="Reviewer effort vs the clock" badge="throughput"
          hint="Unaided read-and-verify vs triage-first review."
          caption={'At ~18 min to locate and verify each authority unaided, this matter is ~' + Math.round(m.manualMin) + ' min of partner time. Triaging only the flagged authorities clears it in ~' + Math.round(m.assistedMin) + ' min — the difference is the product.'}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
            <span style={{ font: '600 30px/1 var(--font-display)', color: 'var(--primary-deep)', letterSpacing: '-0.5px' }}><CountUp value={m.pctFaster} />%</span>
            <span style={{ font: 'var(--body-sm)', color: 'var(--mute)' }}>faster — {hrs(m.savedMin)} of reviewer time returned{m.deadline && m.deadline !== '—' ? ' against a ' + m.deadline + ' filing' : ''}</span>
          </div>
          <EffortBar label="Unaided manual review" minutes={m.manualMin} peak={peak} hue="var(--stone)" tag="baseline" />
          <EffortBar label="Consistency Check triage" minutes={m.assistedMin} peak={peak} hue="var(--primary)" tag="assisted" />
        </Figure>
      </div>

      {/* disposition funnel */}
      <Figure title="Disposition — what reaches a human" badge="supervision" span
        hint="Every authority routed to Pass or Review under the firm's current guardrails."
        caption="Conservative by default: only clearly-verified, in-jurisdiction authorities pass automatically. The funnel narrows to exactly the authorities a partner must look at before filing.">
        <Funnel m={m} />
      </Figure>

      {/* verification flow — the two-stage decision tree */}
      <Figure title="Verification flow" badge="two-stage decision" span
        hint="How every extracted citation moves through the internal corpus check, the external check, and the firm guardrails."
        caption="Conservative by construction: a citation only passes automatically when it is found and its claim matches the holding. Anything not found internally is escalated to an external check, and anything still unverified is treated as suspected fabrication for partner review.">
        {window.CCFlowDiagram ? React.createElement(window.CCFlowDiagram, { app, bare: true }) : null}
      </Figure>

      {/* audit trail — comes after the disposition section */}
      <Figure title="Audit trail" badge="defensible record" span
        hint="Immutable, hash-chained log of who saw what, what the AI claimed, and the human action taken."
        caption="The audit trail is the basis for whether the document is defensible for filing — every verdict, its evidence, and the human decision are recorded with a timestamp.">
        <AuditLog />
      </Figure>

      {/* data sources & engines — comes after the audit trail */}
      <Figure title="Data sources &amp; engines" badge="verification sources" span
        hint="Every database and model the verifier relied on for this matter, with connection status."
        caption="Citation verification is deterministic against the connected sources; absence is bounded to the sources checked. BAILII / Find Case Law is held off-limits under its licence.">
        <SourcesPanel />
      </Figure>

      {/* corpus intelligence — promote externally-verified authorities into the internal corpus */}
      <Figure title="Build the internal corpus" badge="compounding intelligence" span
        hint="The internal database started as the firm's verified corpus. Every authority a lawyer approves from an external source is promoted into it — so the system gets smarter with every review."
        caption="Internal checks are deterministic and licence-clean. External sources fill the gaps; promoting a confirmed authority means the next matter verifies it internally, with no external round-trip.">
        <CorpusIntelligence app={app} />
      </Figure>
    </div>
  );
}

/* ---- Corpus intelligence: promote external authorities into the internal database ---- */
function CorpusIntelligence({ app }) {
  window.CCCorpus = window.CCCorpus || { added: {} };
  const store = window.CCCorpus;
  const [, force] = React.useState(0);
  const base = (window.CCData.corpusStats && window.CCData.corpusStats.base) || 58;
  const seedLabel = (window.CCData.corpusStats && window.CCData.corpusStats.seedLabel) || 'verified case corpus';
  const candidates = window.CCData.discovered || [];
  const addedCount = candidates.filter((c) => store.added[c.id]).length;
  const total = base + addedCount;
  const JUR = { ew: 'England & Wales', sc: 'Scotland', ni: 'Northern Ireland', pc: 'Privy Council', us: 'United States', eu: 'EU' };
  const add = (c) => {
    if (store.added[c.id]) return;
    store.added[c.id] = true;
    force((x) => x + 1);
    const now = base + candidates.filter((x) => store.added[x.id]).length;
    if (app && app.toast) app.toast('Added to internal corpus — ' + c.case + ' · ' + now + ' authorities', { icon: 'database', hue: 'var(--verified)' });
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 280px) 1fr', gap: 18, alignItems: 'start' }}>
      {/* counter */}
      <div style={{ background: 'var(--surface-dark)', borderRadius: 'var(--radius-lg)', padding: '22px 22px 20px', color: 'var(--on-dark, #fff)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)' }}>
          <Icon name="database" size={13} /> Internal corpus
        </div>
        <div key={total} style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 56, lineHeight: 1, marginTop: 12, animation: 'ccPop 360ms cubic-bezier(0.22,0.61,0.36,1)' }}>{total}</div>
        <div style={{ font: 'var(--body-sm)', color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>authorities verifiable internally</div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', margin: '16px 0 14px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--body-sm)', color: 'rgba(255,255,255,0.65)' }}>
          <span>{seedLabel}</span><span style={{ fontVariantNumeric: 'tabular-nums' }}>{base}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--body-sm)', color: addedCount ? 'var(--verified)' : 'rgba(255,255,255,0.5)', marginTop: 6 }}>
          <span>Promoted by your firm</span><span style={{ fontVariantNumeric: 'tabular-nums' }}>+{addedCount}</span>
        </div>
      </div>
      {/* candidates */}
      <div>
        <div style={{ font: 'var(--caption-strong)', fontSize: 12.5, color: 'var(--mute)', marginBottom: 10 }}>
          Externally verified — confirmed on the open web, not yet in the internal corpus
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {candidates.map((c) => {
            const added = !!store.added[c.id];
            return (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 15px', border: '1px solid ' + (added ? 'var(--verified)' : 'var(--hairline)'), borderRadius: 'var(--radius-md)', background: added ? 'var(--verified-bg)' : 'var(--surface-card)', transition: 'background 160ms ease, border-color 160ms ease' }}>
                <span style={{ width: 34, height: 34, borderRadius: 'var(--radius-full)', flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: added ? 'var(--verified)' : 'var(--surface-bone)', color: added ? '#fff' : 'var(--charcoal)' }}>
                  <Icon name={added ? 'check' : 'globe'} size={16} />
                </span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ font: 'var(--caption-strong)', fontSize: 13.5, color: 'var(--ink)' }}>{c.case} <span style={{ font: 'var(--code-sm)', color: 'var(--mute)', fontWeight: 400 }}>{c.citation}</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 2, flexWrap: 'wrap' }}>
                    <span>{JUR[c.jur] || c.jur}</span><span style={{ opacity: 0.4 }}>·</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="search" size={12} /> {c.foundVia}</span>
                  </div>
                </div>
                {added ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 14px', borderRadius: 'var(--radius-full)', font: 'var(--button-sm)', color: 'var(--verified)', flex: '0 0 auto' }}>
                    <Icon name="check-circle" size={15} /> In corpus
                  </span>
                ) : (
                  <button onClick={() => add(c)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 15px', borderRadius: 'var(--radius-full)', border: 'none', background: 'var(--ink)', color: '#fff', font: 'var(--button-sm)', cursor: 'pointer', flex: '0 0 auto' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary-deep)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ink)'; }}>
                    <Icon name="plus" size={15} /> Add to database
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---- Audit trail (workspace session log) ---- */
function AuditLog() {
  const events = window.CCData.audit || [];
  const ICON = { 'Document analysed': 'scan-line', 'Fabricated citation flagged': 'search-x', 'Mischaracterisation flagged': 'search', 'Finding escalated': 'user-round' };
  return (
    <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--surface-dark)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--on-dark-mute, rgba(255,255,255,0.6))' }}>Review session · 14 June 2026</span>
        <span style={{ font: 'var(--code-sm)', color: 'var(--on-dark-mute, rgba(255,255,255,0.55))' }}>session #CC-4471-A · {events.length} events</span>
      </div>
      <div style={{ padding: '4px 18px 14px' }}>
        {events.map((e, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 0', borderTop: i ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
            <span style={{ font: 'var(--code-sm)', color: 'var(--primary)', flex: '0 0 auto', width: 42, paddingTop: 1 }}>{e.time}</span>
            <span style={{ width: 30, height: 30, borderRadius: 8, flex: '0 0 auto', background: 'rgba(255,255,255,0.06)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.85)' }}><Icon name={ICON[e.event] || 'dot'} size={15} /></span>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ font: 'var(--caption-strong)', fontSize: 13.5, color: 'var(--on-dark, #fff)' }}>{e.event}</span>
                <span style={{ font: 'var(--code-sm)', color: 'var(--on-dark-mute, rgba(255,255,255,0.5))' }}>{e.actor}</span>
              </div>
              <div style={{ font: 'var(--body-sm)', color: 'var(--on-dark-mute, rgba(255,255,255,0.7))', marginTop: 3 }}>{e.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Data sources & engines ---- */
function SourcesPanel() {
  const sources = window.CCData.dataSources || [];
  const engines = window.CCData.engines || [];
  const connected = sources.filter((s) => s.status === 'Connected').length;
  const SICON = { 'Local Corpus': 'database', 'Open Legal API': 'plug', 'Open Statutory Source': 'landmark', 'EU Knowledge Graph': 'share-2', 'US Bulk Corpus': 'library', 'Primary Court Source': 'gavel', 'Fallback Web Search': 'globe', 'Restricted Source': 'lock' };
  const statusHue = (s) => s === 'Connected' ? 'var(--verified)' : 'var(--ash)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 24, padding: '0 11px', borderRadius: 'var(--radius-full)', background: 'var(--verified-bg)', color: 'var(--verified)', font: 'var(--caption-strong)', fontSize: 12.5 }}><Icon name="check-circle" size={13} /> {connected} of {sources.length} connected</span>
      </div>
      <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        {sources.map((s, i) => {
          const off = s.status === 'Off-limits';
          return (
            <div key={s.name} style={{ display: 'grid', gridTemplateColumns: '1.7fr 1.4fr auto', gap: 12, alignItems: 'center', padding: '12px 16px', borderTop: i ? '1px solid var(--hairline)' : 'none', background: off ? 'var(--surface-bone)' : 'var(--surface-card)', opacity: off ? 0.72 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, minWidth: 0 }}>
                <span style={{ width: 30, height: 30, borderRadius: 8, flex: '0 0 auto', background: 'var(--surface-bone)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)' }}><Icon name={SICON[s.type] || 'database'} size={15} /></span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ font: 'var(--caption-strong)', fontSize: 13.5, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</div>
                  <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.type} · {s.role}</div>
                </div>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ font: 'var(--code-sm)', color: 'var(--charcoal)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.endpoint}</div>
                <div style={{ font: 'var(--code-sm)', color: 'var(--ash)', marginTop: 1 }}>auth: {s.auth}</div>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: 'var(--caption-strong)', fontSize: 12.5, color: statusHue(s.status), justifySelf: 'end', whiteSpace: 'nowrap' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: statusHue(s.status) }} /> {s.status}</span>
            </div>
          );
        })}
      </div>
      {engines.length > 0 && (
        <div>
          <Overline>Model engines · inference &amp; reasoning</Overline>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 10 }}>
            {engines.map((e) => (
              <div key={e.name} style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: '12px 14px', background: 'var(--surface-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                    <Icon name="cpu" size={14} style={{ color: 'var(--charcoal)', flex: '0 0 auto' }} />
                    <span style={{ font: 'var(--caption-strong)', fontSize: 13, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</span>
                    <span style={{ font: 'var(--body-sm)', color: 'var(--mute)' }}>{e.vendor}</span>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: 'var(--caption-strong)', fontSize: 12, color: 'var(--verified)', flex: '0 0 auto' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--verified)' }} /> {e.status}</span>
                </div>
                <div style={{ font: 'var(--body-sm)', color: 'var(--body)', marginTop: 6 }}>{e.role}</div>
                <div style={{ font: 'var(--code-sm)', color: 'var(--ash)', marginTop: 6 }}>{e.endpoint}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Funnel({ m }) {
  const stages = [
    { label: 'Authorities extracted', value: m.total, hue: 'var(--ink)', sub: 'parsed from the document' },
    { label: 'Auto-passed', value: m.pass, hue: 'var(--verified)', sub: 'verified & in-jurisdiction' },
    { label: 'Routed to review', value: m.review, hue: m.review ? 'var(--mischar)' : 'var(--verified)', sub: 'needs human judgment' },
    { label: 'Ready to file', value: m.review === 0 ? 'Yes' : 'No', hue: m.review === 0 ? 'var(--verified)' : 'var(--fabricated)', sub: m.review === 0 ? 'no open flags' : m.flagged + ' open flag' + (m.flagged === 1 ? '' : 's') },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, alignItems: 'stretch' }}>
      {stages.map((s, i) => (
        <div key={s.label} style={{ position: 'relative', background: 'var(--surface-bone)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: '14px 16px' }}>
          <div style={{ font: '600 26px/1 var(--font-display)', color: s.hue, letterSpacing: '-0.5px' }}>{typeof s.value === 'number' ? <CountUp value={s.value} /> : s.value}</div>
          <div style={{ font: 'var(--caption-strong)', fontSize: 13, color: 'var(--ink)', marginTop: 8 }}>{s.label}</div>
          <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 2 }}>{s.sub}</div>
          {i < stages.length - 1 && <span style={{ position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)', zIndex: 1, color: 'var(--stone)' }}><Icon name="chevron-right" size={18} /></span>}
        </div>
      ))}
    </div>
  );
}

window.CCInsights = Insights;
