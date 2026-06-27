/* Citation Checker tab — findings table + filter row + detail drawer. */
const { Card, StatusBadge, RiskBadge, FilterChip, Input, Button, IconButton } = window.ConsistencyCheckDesignSystem_77c3a7;
const { CCIcon: Icon, CCOverline: Overline } = window;
const { useState } = React;

const REVIEW_CHIP = {
  Approved: { fg: 'var(--verified)', bg: 'var(--verified-bg)', icon: 'check' },
  Amended: { fg: 'var(--mischar)', bg: 'var(--mischar-bg)', icon: 'pencil' },
  Rejected: { fg: 'var(--fabricated)', bg: 'var(--fabricated-bg)', icon: 'x' },
  Escalated: { fg: 'var(--primary-deep)', bg: 'var(--primary-soft)', icon: 'arrow-up-right' },
};

function ReviewChip({ action }) {
  const c = REVIEW_CHIP[action];
  if (!c) return null;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 22, padding: '0 9px', borderRadius: 'var(--radius-full)', font: 'var(--caption-strong)', background: c.bg, color: c.fg }}>
      <Icon name={c.icon} size={12} /> {action}
    </span>
  );
}

function DecisionPath({ finding, app }) {
  const flow = window.CCFlow.verdictOf(finding);
  const disp = window.CCFlow.disposition(finding, app.guardrails);
  const pass = disp.d === 'Pass';
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Icon name="git-branch" size={15} style={{ color: 'var(--charcoal)' }} />
        <Overline>Decision path</Overline>
      </div>
      <div style={{ position: 'relative', paddingLeft: 18 }}>
        <span style={{ position: 'absolute', left: 5, top: 6, bottom: 18, width: 2, background: 'var(--hairline)' }} />
        {flow.steps.map((st, i) => {
          const hue = st.result === 'yes' ? 'var(--verified)' : st.result === 'no' ? 'var(--fabricated)' : 'var(--charcoal)';
          return (
            <div key={i} style={{ position: 'relative', paddingBottom: 12 }}>
              <span style={{ position: 'absolute', left: -16, top: 3, width: 10, height: 10, borderRadius: '50%', background: hue, border: '2px solid var(--surface-card)' }} />
              {st.stage && <div style={{ font: 'var(--code-sm)', color: 'var(--ash)', marginBottom: 2 }}>{st.stage}</div>}
              <div style={{ font: 'var(--caption-strong)', fontSize: 13, color: 'var(--ink)' }}>{st.q}</div>
              <div style={{ font: 'var(--body-sm)', color: 'var(--mute)' }}>{st.a}</div>
            </div>
          );
        })}
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: -16, top: 3, width: 10, height: 10, borderRadius: '50%', background: flow.meta.tone, border: '2px solid var(--surface-card)' }} />
          <div style={{ font: 'var(--caption-strong)', fontSize: 13, color: flow.meta.tone }}>{flow.leaf}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 12, padding: '11px 13px', borderRadius: 'var(--radius-md)', background: pass ? 'var(--verified-bg)' : 'var(--risk-high-bg)' }}>
        <Icon name={pass ? 'check-circle' : 'flag'} size={16} style={{ color: pass ? 'var(--verified)' : 'var(--risk-high)', marginTop: 1, flex: '0 0 auto' }} />
        <span style={{ minWidth: 0 }}>
          <span style={{ display: 'block', font: 'var(--caption-strong)', fontSize: 14, color: pass ? 'var(--verified)' : 'var(--risk-high)' }}>Disposition · {disp.d}{pass ? ' — no action before filing' : ' needed'}</span>
          <span style={{ display: 'block', font: 'var(--body-sm)', color: 'var(--body)', marginTop: 2 }}>{disp.reason} <span style={{ color: 'var(--ash)' }}>· per firm guardrails</span></span>
        </span>
      </div>
    </div>
  );
}

function Section({ icon, title, children, tone }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Icon name={icon} size={15} style={{ color: 'var(--charcoal)' }} />
        <Overline>{title}</Overline>
      </div>
      <div style={{ font: 'var(--body-sm)', color: 'var(--body)', background: tone === 'bone' ? 'var(--surface-bone)' : 'transparent', borderRadius: tone === 'bone' ? 'var(--radius-sm)' : 0, padding: tone === 'bone' ? '10px 12px' : '0 0 0 12px', borderLeft: tone === 'bone' ? 0 : '2px solid var(--hairline)' }}>{children}</div>
    </div>
  );
}

function SignalSection({ finding }) {
  const a = (window.CCData.analysis || {})[finding.id] || {};
  const [open, setOpen] = useState(true);
  if (!a.signal && !a.defensibility && !a.note) return null;
  const hasSignal = !!a.signal;
  return (
    <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <button onClick={() => setOpen((o) => !o)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '12px 14px', background: 'var(--surface-bone)', border: 'none', cursor: 'pointer' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name={hasSignal ? 'eye-off' : 'info'} size={15} style={{ color: 'var(--primary-deep)' }} />
          <span style={{ font: 'var(--caption-strong)', fontSize: 14, color: 'var(--ink)' }}>{hasSignal ? 'Signal · why this would pass human review' : 'Reviewer note'}</span>
        </span>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} style={{ color: 'var(--mute)' }} />
      </button>
      {open && (
        <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(a.signal || []).map((sg, i) => (
            <div key={i} className="cc-reveal" style={{ animationDelay: i * 90 + 'ms', borderLeft: '2px solid var(--mischar)', paddingLeft: 12 }}>
              <div style={{ font: 'var(--caption-strong)', fontSize: 13, color: 'var(--ink)' }}>{i + 1}. {sg.type}</div>
              <div style={{ font: 'var(--body-sm)', color: 'var(--body)', marginTop: 3 }}>{sg.text}</div>
            </div>
          ))}
          {a.defensibility && (
            <div style={{ display: 'flex', gap: 8, padding: '10px 12px', background: 'var(--surface-bone)', borderRadius: 'var(--radius-sm)' }}>
              <Icon name="scale" size={15} style={{ color: 'var(--charcoal)', marginTop: 1, flex: '0 0 auto' }} />
              <span style={{ font: 'var(--body-sm)', color: 'var(--body)' }}>{a.defensibility}</span>
            </div>
          )}
          {a.note && !hasSignal && <div style={{ font: 'var(--body-sm)', color: 'var(--body)' }}>{a.note}</div>}
        </div>
      )}
    </div>
  );
}

function RatioBadge({ binding }) {
  const m = binding === true
    ? { label: 'Binding ratio', hue: 'var(--verified)', bg: 'var(--verified-bg)', icon: 'gavel' }
    : binding === false
      ? { label: 'No judgment', hue: 'var(--fabricated)', bg: 'var(--fabricated-bg)', icon: 'file-x' }
      : { label: 'Unsettled', hue: 'var(--mischar)', bg: 'var(--mischar-bg)', icon: 'help-circle' };
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 19, padding: '0 8px', borderRadius: 'var(--radius-full)', font: 'var(--caption-strong)', fontSize: 11, background: m.bg, color: m.hue }}><Icon name={m.icon} size={11} /> {m.label}</span>;
}

function TreatmentTag({ kind }) {
  const m = (window.CCTreatmentMeta.treatment || {})[kind] || { label: kind, hue: 'var(--charcoal)', bg: 'var(--surface-bone)', icon: 'dot' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 20, padding: '0 8px', borderRadius: 'var(--radius-full)', font: 'var(--caption-strong)', fontSize: 11, letterSpacing: '0.02em', background: m.bg, color: m.hue, flex: '0 0 auto' }}>
      <Icon name={m.icon} size={11} /> {m.label}
    </span>
  );
}

/* Treatment / triangulation — how the authority is treated across the corpus.
   The secondary signal a lawyer uses to judge whether something is good law. */
function TreatmentSection({ finding }) {
  const t = (window.CCData.treatment || {})[finding.id];
  const [open, setOpen] = useState(true);
  if (!t) return null;
  const m = window.CCTreatmentMeta.signal[t.signal] || {};
  const isConf = t.signal === 'confabulation';
  const isCorr = t.signal === 'corroborated';
  return (
    <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <button onClick={() => setOpen((o) => !o)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '12px 14px', background: 'var(--surface-bone)', border: 'none', cursor: 'pointer' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <Icon name="network" size={15} style={{ color: 'var(--primary-deep)', flex: '0 0 auto' }} />
          <span style={{ font: 'var(--caption-strong)', fontSize: 14, color: 'var(--ink)' }}>Treatment across the corpus</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 19, padding: '0 7px', borderRadius: 'var(--radius-full)', font: 'var(--caption-strong)', fontSize: 11, background: m.bg, color: m.hue, flex: '0 0 auto' }}><Icon name={m.icon} size={11} /> {m.label}</span>
        </span>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} style={{ color: 'var(--mute)', flex: '0 0 auto' }} />
      </button>
      {open && (
        <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: m.bg }}>
            <Icon name={m.icon} size={18} style={{ color: m.hue, flex: '0 0 auto' }} />
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', font: 'var(--caption-strong)', fontSize: 14, color: m.hue }}>{m.label} · {t.citingCount === 0 ? 'no corpus cross-cites' : t.citingCount + ' corpus authorit' + (t.citingCount === 1 ? 'y' : 'ies')}</span>
              <span style={{ display: 'block', font: 'var(--body-sm)', color: 'var(--body)', marginTop: 1 }}>{m.blurb}</span>
            </span>
          </div>
          <div style={{ font: 'var(--body-sm)', color: 'var(--body)' }}>{t.summary}</div>
          {t.citedBy.length > 0 && (
            <div>
              <Overline style={{ marginBottom: 6 }}>{isConf ? 'Where the proposition really lives' : 'How later courts have treated it'}</Overline>
              {t.citedBy.map((c, i) => (
                <div key={i} className="cc-reveal" style={{ animationDelay: i * 70 + 'ms', display: 'flex', gap: 10, padding: '10px 0', borderTop: i === 0 ? 'none' : '1px solid var(--hairline)' }}>
                  <span style={{ flex: '0 0 auto', width: 6, marginTop: 6 }}>
                    <span style={{ display: 'block', width: 6, height: 6, borderRadius: '50%', background: (window.CCTreatmentMeta.treatment[c.treatment] || {}).hue || 'var(--charcoal)' }} />
                  </span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ font: 'var(--code-sm)', color: 'var(--ink)' }}>{c.case}</span>
                      <TreatmentTag kind={c.treatment} />
                      {c.external && <span style={{ font: 'var(--code-sm)', color: 'var(--ash)' }}>· open web</span>}
                    </div>
                    <div style={{ font: 'var(--code-sm)', color: 'var(--mute)', marginTop: 2 }}>{c.citation} · {c.court}{c.para ? ' · ' + c.para : ''}</div>
                    <div style={{ font: 'var(--body-sm)', color: 'var(--body)', marginTop: 4 }}>{c.point}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {isCorr && (
            <div style={{ display: 'flex', gap: 8, padding: '10px 12px', background: 'var(--mischar-bg)', borderRadius: 'var(--radius-sm)' }}>
              <Icon name="target" size={15} style={{ color: 'var(--mischar)', marginTop: 1, flex: '0 0 auto' }} />
              <span style={{ font: 'var(--body-sm)', color: 'var(--body)' }}>Independent corroboration — the citator is computed from how the corpus treats this case, not from the brief. It agrees with the fidelity flag: <strong style={{ color: 'var(--ink)' }}>real case, wrong proposition.</strong></span>
            </div>
          )}
          {t.ratio && (
            <div style={{ border: '1px dashed var(--hairline-strong)', borderRadius: 'var(--radius-sm)', padding: '11px 13px', background: 'var(--surface-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Icon name="scale" size={14} style={{ color: 'var(--charcoal)' }} />
                  <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>Ratio vs dicta</span>
                </span>
                {t.ratio.roadmap
                  ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 19, padding: '0 8px', borderRadius: 'var(--radius-full)', font: 'var(--caption-strong)', fontSize: 11, background: 'var(--primary-soft)', color: 'var(--primary-deep)' }}><Icon name="milestone" size={11} /> Roadmap</span>
                  : <RatioBadge binding={t.ratio.binding} />}
              </div>
              <div style={{ font: 'var(--body-sm)', color: 'var(--body)', marginTop: 7 }}>{t.ratio.note}</div>
              {t.ratio.roadmap && <div style={{ font: 'var(--code-sm)', color: 'var(--ash)', marginTop: 6 }}>Distinguishing binding ratio from passing dicta is judgment-premium work — flagged here, resolved by a lawyer, not yet automated.</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ParallelCites({ id }) {
  const p = (window.CCData.parallelCites || {})[id];
  if (!p) return null;
  if (p.unresolved) {
    return (
      <div style={{ border: '1px dashed var(--fabricated)', borderRadius: 'var(--radius-sm)', padding: '11px 13px', background: 'var(--fabricated-bg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Icon name="layers" size={14} style={{ color: 'var(--fabricated)' }} />
          <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fabricated)' }}>Parallel citations</span>
        </div>
        <div style={{ font: 'var(--body-sm)', color: 'var(--body)', marginTop: 7 }}>The reference <strong style={{ color: 'var(--ink)' }}>{p.primary}</strong> resolves in <strong>no</strong> report series. A genuine authority appears across several — its absence from every series is itself the signal of suspected fabrication.</div>
      </div>
    );
  }
  if (!p.refs || p.refs.length < 2) return null;
  return (
    <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', padding: '11px 13px', background: 'var(--surface-card)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Icon name="layers" size={14} style={{ color: 'var(--primary-deep)' }} />
          <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>Also reported as</span>
        </span>
        <span style={{ font: 'var(--code-sm)', color: 'var(--ash)' }}>{p.refs.length} references · one case</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 9 }}>
        {p.refs.map((r, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 9px', borderRadius: 'var(--radius-full)', background: r === p.primary ? 'var(--surface-dark)' : 'var(--surface-bone)', color: r === p.primary ? 'var(--on-dark)' : 'var(--charcoal)', border: '1px solid var(--hairline)', font: 'var(--code-sm)' }}>{r}</span>
        ))}
      </div>
      <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 8 }}>The verifier normalises across every series — paste any one and it resolves to the same authority.</div>
    </div>
  );
}

function verifyUrl(citation, jurisdiction) {
  const q = encodeURIComponent(citation);
  if (jurisdiction && /United States|US/.test(jurisdiction)) return 'https://www.courtlistener.com/?q=' + q;
  return 'https://scholar.google.com/scholar?q=' + q;
}

function SuggestedAuthority({ finding, onUse }) {
  const c = window.CCData.corpus[finding.id] || {};
  const s = c.suggestion;
  if (c.match !== 'none' || !s) return null;
  const url = verifyUrl(s.citation);
  return (
    <div style={{ border: '1px dashed var(--hairline-strong)', borderRadius: 'var(--radius-md)', padding: '14px 16px', background: 'var(--surface-card)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="lightbulb" size={15} style={{ color: 'var(--mischar)' }} />
          <Overline>Suggested related authority</Overline>
        </span>
        <span style={{ font: 'var(--caption)', color: 'var(--ash)' }}>Suggestion · not a verdict</span>
      </div>
      <div style={{ font: 'var(--body-sm)', color: 'var(--charcoal)', marginTop: 8 }}>
        <strong style={{ color: 'var(--fabricated)' }}>Not found</strong> stands. A real, in-corpus authority that may be the intended case for <span style={{ color: 'var(--ink)' }}>{finding.legalIssue.toLowerCase()}</span>:
      </div>
      <div style={{ marginTop: 12, padding: '12px 14px', background: 'var(--surface-bone)', borderRadius: 'var(--radius-sm)' }}>
        <div style={{ font: 'var(--code-md)', color: 'var(--ink)' }}>{s.citation}</div>
        <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 4 }}>{s.court} · {s.neutral}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
          <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>Topical match</span>
          <span style={{ flex: 1, height: 6, background: 'var(--hairline)', borderRadius: 3, overflow: 'hidden' }}>
            <span style={{ display: 'block', height: '100%', width: s.match + '%', background: 'var(--mischar)', borderRadius: 3 }} />
          </span>
          <span style={{ font: 'var(--code-sm)', color: 'var(--charcoal)' }}>{s.match}%</span>
        </div>
        <div style={{ font: 'var(--body-sm)', color: 'var(--body)', marginTop: 10 }}>{s.why}</div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
        <a href={url} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 'var(--radius-full)', border: '1px solid var(--hairline-strong)', font: 'var(--button-sm)', color: 'var(--ink)', textDecoration: 'none' }}>
          <Icon name="external-link" size={14} /> Verify on Find Case Law
        </a>
        <button onClick={() => onUse('Replace the unverifiable citation with ' + s.citation + ' (' + s.court + '), which is genuine authority for ' + finding.legalIssue.toLowerCase() + '. ' + s.why + ' — confirm the proposition against the judgment before filing.')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 'var(--radius-full)', border: 'none', background: 'var(--surface-dark)', color: 'var(--on-dark)', font: 'var(--button-sm)', cursor: 'pointer' }}>
          <Icon name="replace" size={14} /> Use as replacement
        </button>
      </div>
    </div>
  );
}

function FindingDrawer({ finding, onClose, app }) {
  const [amending, setAmending] = useState(false);
  const [draft, setDraft] = useState('');
  if (!finding) return null;
  const f = finding;
  const c = window.CCData.corpus[f.id] || {};
  const reviewed = app.reviews[f.id];
  const ana = window.CCData.analysis[f.id] || {};
  const suggested = f.status === 'Fabricated'
    ? 'Remove this citation — no reliable authority was found in any available source.'
    : (/United States|European/.test(ana.jurisdiction || '')
        ? 'Cite ' + f.citation + ' as persuasive authority only — not binding in England & Wales.'
        : (f.actualAuthority ? 'Revise the proposition to rely on this authority only for what it supports: ' + f.actualAuthority : (f.recommendedAction || 'Revise the proposition.')));
  const saved = (app.amendments || {})[f.id];
  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(32,32,32,0.28)', zIndex: 20, animation: 'ccFade 140ms ease' }} />
      <aside style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 460, background: 'var(--surface-card)', borderLeft: '1px solid var(--hairline)', boxShadow: 'var(--elev-panel)', zIndex: 21, display: 'flex', flexDirection: 'column', animation: 'ccSlide 160ms ease' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '18px 20px', borderBottom: '1px solid var(--hairline)' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <StatusBadge status={f.status} label={window.CCVerdictLabel(f.status)} />
              {reviewed && <ReviewChip action={reviewed} />}
            </div>
            <div style={{ font: 'var(--code-md)', color: 'var(--ink)', marginTop: 10 }}>{f.citation}</div>
          </div>
          <IconButton variant="bare" ariaLabel="Close" onClick={onClose}><Icon name="x" size={18} /></IconButton>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <div><Overline>Risk</Overline><div style={{ marginTop: 6 }}><RiskBadge level={f.risk} variant="bar" /></div></div>
            <div><Overline>Jurisdiction</Overline><div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
              <Icon name={/unresolved/.test((window.CCData.analysis[f.id] || {}).jurisdiction || '') ? 'map-pin-off' : 'map-pin'} size={13} style={{ color: 'var(--charcoal)' }} />
              <span style={{ font: 'var(--caption-strong)', fontSize: 13, color: 'var(--ink)' }}>{(window.CCData.analysis[f.id] || {}).jurisdiction || '—'}</span>
            </div></div>
            <div style={{ flex: 1, minWidth: 120 }}><Overline>Issue</Overline><div style={{ font: 'var(--body-sm)', color: 'var(--body)', marginTop: 4 }}>{f.legalIssue}</div></div>
          </div>
          <ParallelCites id={f.id} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <Overline>Confidence — decomposed</Overline>
              <span style={{ font: 'var(--code-sm)', color: 'var(--ash)' }}>existence ≠ fidelity</span>
            </div>
            <window.CCTwoAxis id={f.id} />
          </div>
          <Section icon="quote" title="Extracted proposition" tone="bone">{f.extractedProposition || 'The skeleton relies on this authority as drafted; the cited proposition matches the holding.'}</Section>
          <Section icon="book-open" title="What the authority actually supports">{f.actualAuthority || (c.holding) || 'The authority exists and is applied consistently with its holding.'}</Section>
          <Section icon="search-check" title="Explanation">{f.explanation}</Section>
          <SignalSection finding={f} />
          <TreatmentSection finding={f} />

          <button onClick={() => app.openSource(f.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, width: '100%', textAlign: 'left', background: 'var(--surface-bone)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: '12px 14px', cursor: 'pointer' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <Icon name={c.match === 'none' ? 'file-x' : 'file-search'} size={16} style={{ color: c.match === 'none' ? 'var(--fabricated)' : 'var(--charcoal)', flex: '0 0 auto' }} />
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', font: 'var(--caption-strong)', color: 'var(--ink)' }}>{c.match === 'none' ? 'No source found' : c.match === 'external' ? 'Open-source match' : 'Corpus match'}</span>
                <span style={{ display: 'block', font: 'var(--code-sm)', color: 'var(--mute)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.match === 'none' ? 'Searched ' + (c.searched || []).length + ' sources' : (c.court + ' · ' + c.neutral)}</span>
              </span>
            </span>
            <Icon name="chevron-right" size={16} style={{ color: 'var(--stone)', flex: '0 0 auto' }} />
          </button>

          <DecisionPath finding={f} app={app} />

          <div style={{ background: 'var(--surface-bone)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="flag" size={15} style={{ color: 'var(--primary-deep)' }} />
              <Overline>Recommended action</Overline>
            </div>
            <div style={{ font: 'var(--body-sm)', color: 'var(--ink)', marginTop: 8 }}>{f.recommendedAction}</div>
          </div>

          <SuggestedAuthority finding={f} onUse={(text) => { setDraft(text); setAmending(true); }} />
        </div>
        {saved && !amending && (
          <div style={{ padding: '12px 20px', background: 'var(--verified-bg)', borderTop: '1px solid var(--hairline)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 7, font: 'var(--caption-strong)', color: 'var(--verified)' }}><Icon name="check-circle" size={14} /> Amended by reviewer</span>
              <button onClick={() => { setDraft(saved); setAmending(true); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'transparent', border: 'none', cursor: 'pointer', font: 'var(--button-sm)', color: 'var(--charcoal)' }}><Icon name="pencil" size={13} /> Edit</button>
            </div>
            <div style={{ font: 'var(--body-sm)', color: 'var(--ink)', marginTop: 6 }}>{saved}</div>
          </div>
        )}
        {amending && (
          <div style={{ padding: '14px 20px', borderTop: '1px solid var(--hairline)', background: 'var(--surface-bone)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, font: 'var(--caption-strong)', fontSize: 14, color: 'var(--ink)' }}><Icon name="wand-2" size={15} style={{ color: 'var(--primary-deep)' }} /> Amend — apply the auto-fix or edit by hand</span>
              <button onClick={() => setDraft(suggested)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'transparent', border: 'none', cursor: 'pointer', font: 'var(--button-sm)', color: 'var(--primary-deep)' }}><Icon name="sparkles" size={13} /> Auto-fix</button>
            </div>
            <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={4} placeholder="Type the corrected wording…"
              style={{ width: '100%', boxSizing: 'border-box', font: 'var(--body-sm)', lineHeight: 1.5, color: 'var(--ink)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline-strong)', background: 'var(--surface-card)', resize: 'vertical', outline: 'none' }}
              onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px var(--ring-focus)'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="primary" size="sm" iconLeft={<Icon name="check" size={15} />} onClick={() => { if (draft.trim()) { app.amend(f.id, draft.trim()); app.review(f.id, 'Amended'); } setAmending(false); }}>Save amendment</Button>
              <Button variant="ghost" size="sm" onClick={() => setAmending(false)}>Cancel</Button>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', gap: 8, padding: '14px 20px', borderTop: '1px solid var(--hairline)', flexWrap: 'wrap' }}>
          <Button variant="dark" size="sm" iconLeft={<Icon name="check" size={15} />} onClick={() => app.review(f.id, 'Approved')}>Approve</Button>
          <Button variant="outline" size="sm" iconLeft={<Icon name="pencil" size={15} />} onClick={() => { setDraft(saved || suggested); setAmending(true); }}>Amend</Button>
          <Button variant="outline" size="sm" iconLeft={<Icon name="x" size={15} />} onClick={() => app.review(f.id, 'Rejected')}>Reject</Button>
          <Button variant="primary" size="sm" iconLeft={<Icon name="arrow-up-right" size={15} />} onClick={() => app.review(f.id, 'Escalated')}>Escalate to Partner</Button>
        </div>
      </aside>
    </>
  );
}

function CitationChecker({ openId, onOpenFinding, filter, setFilter, app }) {
  const all = window.CCData.findings;
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: 'default', dir: 1 });
  const selected = all.find((f) => f.id === openId) || null;
  const RISK_ORDER = { Low: 1, Medium: 2, High: 3, Critical: 4 };
  const STATUS_ORDER = { Verified: 1, Mischaracterised: 2, Fabricated: 3 };
  const counts = {
    All: all.length,
    Verified: all.filter((f) => f.status === 'Verified').length,
    Mischaracterised: all.filter((f) => f.status === 'Mischaracterised').length,
    Fabricated: all.filter((f) => f.status === 'Fabricated').length,
  };
  const SOURCE_LABEL = {
    corpus: { t: 'Corpus', sub: 'internal', hue: 'var(--verified)', icon: 'database' },
    external: { t: 'Open web', sub: 'external', hue: 'var(--mischar)', icon: 'globe' },
    none: { t: 'Not found', sub: 'no source', hue: 'var(--fabricated)', icon: 'search-x' },
  };
  const triageRank = (f) => {
    const rev = window.CCFlow.disposition(f, app.guardrails).d === 'Review' ? 1 : 0;
    const fid = (window.CCData.analysis[f.id] || {}).fidelity;
    return rev * 1000 + RISK_ORDER[f.risk] * 100 + (100 - (fid == null ? 0 : fid));
  };
  let rows = all.filter((f) => (filter === 'All' || f.status === filter) && (f.citation.toLowerCase().includes(query.toLowerCase()) || f.legalIssue.toLowerCase().includes(query.toLowerCase())));
  if (sort.key === 'triage') {
    rows = [...rows].sort((a, b) => triageRank(b) - triageRank(a));
  } else if (sort.key !== 'default') {
    rows = [...rows].sort((a, b) => {
      let av, bv;
      if (sort.key === 'confidence') { av = a.confidence; bv = b.confidence; }
      else if (sort.key === 'risk') { av = RISK_ORDER[a.risk]; bv = RISK_ORDER[b.risk]; }
      else { av = STATUS_ORDER[a.status]; bv = STATUS_ORDER[b.status]; }
      return (av - bv) * sort.dir;
    });
  }
  const toggleSort = (key) => setSort((s) => s.key === key ? { key, dir: -s.dir } : { key, dir: 1 });
  // Analytics over the currently-filtered rows
  const avgConf = rows.length ? Math.round(rows.reduce((s, f) => s + f.confidence, 0) / rows.length) : 0;
  const matched = rows.filter((f) => (window.CCData.corpus[f.id] || {}).match !== 'none').length;
  const matchRate = rows.length ? Math.round((matched / rows.length) * 100) : 0;
  const highRisk = rows.filter((f) => f.risk === 'High' || f.risk === 'Critical').length;
  const tri = window.CCFlow.triage(all, app.guardrails);
  const SortHead = ({ label, k }) => (
    <button onClick={() => toggleSort(k)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: sort.key === k ? 'var(--ink)' : 'var(--mute)' }}>
      {label}<Icon name={sort.key === k ? (sort.dir === 1 ? 'arrow-up' : 'arrow-down') : 'chevrons-up-down'} size={12} />
    </button>
  );

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 600 }}>
      <window.CCCaseHeader app={app} />
      <Card pad={0}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '16px 20px', borderBottom: '1px solid var(--hairline)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <FilterChip active={filter === 'All'} count={counts.All} onClick={() => setFilter('All')}>All</FilterChip>
            <FilterChip active={filter === 'Verified'} dotColor="var(--verified)" count={counts.Verified} onClick={() => setFilter('Verified')}>Verified</FilterChip>
            <FilterChip active={filter === 'Mischaracterised'} dotColor="var(--mischar)" count={counts.Mischaracterised} onClick={() => setFilter('Mischaracterised')}>Mischaracterised</FilterChip>
            <FilterChip active={filter === 'Fabricated'} dotColor="var(--fabricated)" count={counts.Fabricated} onClick={() => setFilter('Fabricated')}>Not found</FilterChip>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => toggleSort('triage')} title="Order by what to fix first against the deadline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 12px', borderRadius: 'var(--radius-full)', cursor: 'pointer', font: 'var(--button-sm)', background: sort.key === 'triage' ? 'var(--ink)' : 'var(--surface-card)', color: sort.key === 'triage' ? 'var(--on-dark)' : 'var(--charcoal)', border: `1px solid ${sort.key === 'triage' ? 'var(--ink)' : 'var(--hairline)'}` }}>
              <Icon name="list-ordered" size={15} /> Triage
            </button>
            <div style={{ width: 210 }}><Input size="sm" placeholder="Search citations…" value={query} onChange={(e) => setQuery(e.target.value)} iconLeft={<Icon name="search" size={15} />} /></div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 0, padding: '0 20px', borderBottom: '1px solid var(--hairline)', background: 'var(--surface-bone)' }}>
          {[['Showing', rows.length + ' of ' + all.length], ['Avg confidence', avgConf + '%'], ['Flagged for review', String(tri.count)], ['Est. time to clear', tri.totalMin + ' min']].map(([k, v], i) => (
            <div key={k} style={{ flex: 1, padding: '11px 0', borderLeft: i === 0 ? 'none' : '1px solid var(--hairline)', paddingLeft: i === 0 ? 0 : 16 }}>
              <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>{k}</div>
              <div style={{ font: '600 19px/1.1 var(--font-display)', color: 'var(--ink)', marginTop: 3 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 116px 110px 150px', gap: 0, padding: '10px 20px', borderBottom: '1px solid var(--hairline)', background: 'var(--surface-bone)' }}>
          <SortHead label="Status" k="status" />
          <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>Citation &amp; legal issue</span>
          <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>Verified via</span>
          <SortHead label="Confidence" k="confidence" />
          <SortHead label="Risk" k="risk" />
        </div>
        <div>
          {rows.map((f, i) => {
            const reviewed = app.reviews[f.id];
            return (
              <button key={f.id} onClick={() => onOpenFinding(f.id)} className="cc-reveal"
                style={{ display: 'grid', gridTemplateColumns: '150px 1fr 116px 110px 150px', alignItems: 'center', gap: 0, width: '100%', textAlign: 'left', padding: '14px 20px', animationDelay: i * 35 + 'ms', background: selected && selected.id === f.id ? 'var(--surface-bone)' : 'transparent', border: 'none', borderTop: i === 0 ? 'none' : '1px solid var(--hairline)', cursor: 'pointer' }}
                onMouseEnter={(e) => { if (!(selected && selected.id === f.id)) e.currentTarget.style.background = 'var(--canvas)'; }}
                onMouseLeave={(e) => { if (!(selected && selected.id === f.id)) e.currentTarget.style.background = 'transparent'; }}>
                <span><StatusBadge status={f.status} label={window.CCVerdictLabel(f.status)} /></span>
                <span style={{ minWidth: 0, paddingRight: 16 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                    <span style={{ font: 'var(--code-sm)', color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.citation}</span>
                    {reviewed && <ReviewChip action={reviewed} />}
                  </span>
                  <span style={{ display: 'block', font: 'var(--body-sm)', color: 'var(--charcoal)', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.legalIssue}</span>
                  {(() => { const tv = window.CCTreatmentVerdict(f.id); return tv ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
                      <Icon name={tv.icon} size={11} style={{ color: tv.hue, flex: '0 0 auto' }} />
                      <span style={{ font: 'var(--caption-strong)', fontSize: 11, color: tv.hue }}>{tv.label}</span>
                      <span style={{ font: 'var(--code-sm)', color: 'var(--ash)' }}>· {tv.citedText}</span>
                    </span>
                  ) : null; })()}
                </span>
                {(() => { const sl = SOURCE_LABEL[(window.CCData.corpus[f.id] || {}).match] || SOURCE_LABEL.none; return (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, paddingRight: 12 }}>
                    <Icon name={sl.icon} size={13} style={{ color: sl.hue, flex: '0 0 auto' }} />
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: 'block', font: 'var(--caption-strong)', fontSize: 13, color: 'var(--ink)' }}>{sl.t}</span>
                      <span style={{ display: 'block', font: 'var(--code-sm)', color: 'var(--ash)' }}>{sl.sub}</span>
                    </span>
                  </span>
                ); })()}
                <span style={{ font: 'var(--caption-strong)', fontSize: 14, color: 'var(--ink)' }}>{f.confidence}%</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><RiskBadge level={f.risk} /><Icon name="chevron-right" size={16} style={{ color: 'var(--stone)' }} /></span>
              </button>
            );
          })}
          {rows.length === 0 && <div style={{ padding: '40px 20px', textAlign: 'center', font: 'var(--body-sm)', color: 'var(--mute)' }}>No citations match this filter.</div>}
        </div>
      </Card>
      <FindingDrawer key={selected && selected.id} finding={selected} onClose={() => onOpenFinding(null)} app={app} />
    </div>
  );
}
window.CCCitationChecker = CitationChecker;
