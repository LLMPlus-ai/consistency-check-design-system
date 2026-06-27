/* App shell — top nav + tab routing + shared interaction layer. */
const { CCIcon: Icon } = window;
const { useState, useEffect } = React;

const TABS = ['Document', 'Source Library', 'Dashboard', 'Insights', 'Citation Checker', 'Verification', 'Audit Trail', 'Data Sources'];
const TAB_LABELS = { 'Source Library': 'Library', 'Citation Checker': 'Citations', 'Audit Trail': 'Audit', 'Data Sources': 'Sources' };
// Visible nav — trimmed to the core workflow. All tabs remain routable via app.goTo().
const NAV_TABS = ['Document', 'Citation Checker', 'Verification'];
// The rest of the original full view — reachable from the "More" menu.
const MORE_TABS = ['Source Library', 'Dashboard', 'Audit Trail', 'Data Sources'];
const MORE_ICONS = { 'Source Library': 'library', 'Dashboard': 'layout-dashboard', 'Insights': 'bar-chart-3', 'Audit Trail': 'history', 'Data Sources': 'database' };

function fsElement() { return document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement; }
function FullscreenButton({ app }) {
  const [fs, setFs] = useState(false);
  useEffect(() => {
    const on = () => setFs(!!fsElement() || app.immersive);
    document.addEventListener('fullscreenchange', on);
    document.addEventListener('webkitfullscreenchange', on);
    return () => { document.removeEventListener('fullscreenchange', on); document.removeEventListener('webkitfullscreenchange', on); };
  }, [app.immersive]);
  const active = !!fsElement() || app.immersive;
  const enterNative = () => {
    const el = document.documentElement;
    const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (!req) return Promise.reject();
    try { const r = req.call(el); return (r && r.then) ? r : Promise.resolve(); } catch (e) { return Promise.reject(e); }
  };
  const exitNative = () => {
    const ex = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    if (ex) try { ex.call(document); } catch (e) {}
  };
  const toggle = () => {
    if (fsElement()) { exitNative(); app.setImmersive(false); return; }
    if (app.immersive) { app.setImmersive(false); return; }
    // try real browser full-screen; if blocked (e.g. sandboxed iframe), fall back to immersive layout
    enterNative().then(() => setFs(true)).catch(() => { app.setImmersive(true); setFs(true); });
  };
  return (
    <button onClick={toggle} title={active ? 'Exit full screen' : 'Enter full screen'} aria-label={active ? 'Exit full screen' : 'Enter full screen'}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 'var(--radius-full)', background: active ? 'var(--surface-dark)' : 'var(--surface-card)', color: active ? 'var(--on-dark)' : 'var(--ink)', border: '1px solid ' + (active ? 'transparent' : 'var(--hairline-strong)'), cursor: 'pointer', transition: 'background 120ms ease' }}>
      <Icon name={active ? 'minimize' : 'maximize'} size={15} />
    </button>
  );
}

function TopNav({ app, tab }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--surface-card)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ minHeight: 64, display: 'flex', alignItems: 'center', gap: 22, padding: '10px 24px' }}>
        <button onClick={() => app.goTo('Document')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, flex: '0 0 auto' }}>
          <img src="../../assets/logo-consistency-check.png" alt="Consistency Check" style={{ height: 32, width: 'auto', display: 'block' }} />
        </button>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'center' }}>
          {window.CCStageStepper ? <window.CCStageStepper app={app} bare /> : null}
        </div>
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <FullscreenButton app={app} />
        </div>
      </div>
    </header>
  );
}

function TabBar({ tab, app }) {
  return (
    <div style={{ position: 'sticky', top: 60, zIndex: 9, background: 'var(--canvas)', borderBottom: '1px solid var(--hairline)', padding: '0 24px' }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        {NAV_TABS.map((t) => {
          const active = t === tab;
          return (
            <button key={t} onClick={() => app.goTo(t)} style={{ position: 'relative', height: 46, padding: '0 13px', background: 'transparent', border: 'none', cursor: 'pointer', font: 'var(--button-sm)', color: active ? 'var(--ink)' : 'var(--mute)', transition: 'color 120ms ease', whiteSpace: 'nowrap' }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--ink)'; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--mute)'; }}>
              {TAB_LABELS[t] || t}
              <span style={{ position: 'absolute', left: 10, right: 10, bottom: -1, height: 2, borderRadius: 2, background: active ? 'var(--primary)' : 'transparent' }} />
            </button>
          );
        })}
        <button onClick={() => app.goTo('Insights')}
          style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 14px', borderRadius: 'var(--radius-full)', background: tab === 'Insights' ? 'var(--surface-dark)' : 'transparent', color: tab === 'Insights' ? 'var(--on-dark)' : 'var(--ink)', border: `1px solid ${tab === 'Insights' ? 'var(--surface-dark)' : 'var(--hairline-strong)'}`, cursor: 'pointer', font: 'var(--button-sm)', whiteSpace: 'nowrap' }}
          onMouseEnter={(e) => { if (tab !== 'Insights') e.currentTarget.style.background = 'rgba(32,32,32,0.04)'; }}
          onMouseLeave={(e) => { if (tab !== 'Insights') e.currentTarget.style.background = 'transparent'; }}>
          <Icon name="bar-chart-3" size={14} /> View deep analysis
          <Icon name="arrow-right" size={14} />
        </button>
      </nav>
    </div>
  );
}

function MoreMenu({ tab, app }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  const activeHere = MORE_TABS.includes(tab);
  return (
    <div ref={ref} style={{ position: 'relative', marginLeft: 2 }}>
      <button onClick={() => setOpen((o) => !o)} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 5, height: 46, padding: '0 13px', background: 'transparent', border: 'none', cursor: 'pointer', font: 'var(--button-sm)', color: activeHere || open ? 'var(--ink)' : 'var(--mute)', transition: 'color 120ms ease', whiteSpace: 'nowrap' }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ink)'; }}
        onMouseLeave={(e) => { if (!activeHere && !open) e.currentTarget.style.color = 'var(--mute)'; }}>
        More <Icon name="chevron-down" size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 140ms ease' }} />
        <span style={{ position: 'absolute', left: 10, right: 22, bottom: -1, height: 2, borderRadius: 2, background: activeHere ? 'var(--primary)' : 'transparent' }} />
      </button>
      {open ? (
        <div style={{ position: 'absolute', top: 44, left: 0, minWidth: 188, background: 'var(--surface-card)', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-pop, 0 12px 32px rgba(32,32,32,0.16))', padding: 6, zIndex: 40, animation: 'ccPop 140ms ease both' }}>
          {MORE_TABS.map((t) => {
            const active = t === tab;
            return (
              <button key={t} onClick={() => { app.goTo(t); setOpen(false); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 'var(--radius-sm)', background: active ? 'rgba(32,32,32,0.05)' : 'transparent', border: 'none', cursor: 'pointer', font: 'var(--button-sm)', color: 'var(--ink)', textAlign: 'left' }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(32,32,32,0.04)'; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
                <Icon name={MORE_ICONS[t]} size={15} style={{ color: 'var(--mute)' }} />
                {TAB_LABELS[t] || t}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function ProjectsRail({ activeProject, setActiveProject, app, width }) {
  const projects = window.CCData.projects;
  const flagged = window.CCReviewQueue ? window.CCReviewQueue() : window.CCData.findings;
  const total = flagged.length;
  const resolved = flagged.filter((f) => app.docEdits[f.id] || app.reviews[f.id]).length;
  const partApproved = flagged.filter((f) => app.partnerApproved[f.id]).length;
  const ids = flagged.map((f) => f.id);
  const stage = app.wfStage;
  const assocReady = total > 0 && resolved === total;
  const partReady = total > 0 && partApproved === total;
  return (
    <aside style={{ width: width || 248, flex: '0 0 ' + (width || 248) + 'px', borderRight: '1px solid var(--hairline)', background: 'var(--surface-bone)', display: 'flex', flexDirection: 'column', position: 'sticky', top: 64, height: 'calc(100vh - 64px)' }}>
      <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--hairline)', flex: '0 0 auto' }}>
        <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)' }}>Matters</span>
        <button onClick={() => app.openUpload()} title="New review" style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid var(--hairline)', background: 'var(--surface-card)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)' }}><Icon name="plus" size={15} /></button>
      </div>
      <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 6, overflowY: 'auto', flex: 1 }}>
        {projects.map((p, pi) => {
          const active = p.id === activeProject;
          const isPrimary = pi === 0; // the live-workflow matter
          const hue = p.health >= 75 ? 'var(--verified)' : p.health >= 50 ? 'var(--mischar)' : 'var(--fabricated)';
          return (
            <div key={p.id} role="button" tabIndex={0} onClick={() => { setActiveProject(p.id); }}
              onKeyDown={(e) => { if (e.key === 'Enter') setActiveProject(p.id); }}
              style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 6, padding: '11px 12px', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: active ? 'var(--surface-card)' : 'transparent', border: `1px solid ${active ? 'var(--hairline)' : 'transparent'}`, boxShadow: active ? 'var(--elev-card)' : 'none' }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(32,32,32,0.03)'; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ font: 'var(--caption)', color: 'var(--mute)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.client}</span>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: hue, flex: '0 0 auto' }} />
              </div>
              <div style={{ font: 'var(--caption-strong)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.3 }}>{p.matter}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, font: 'var(--code-sm)', color: 'var(--ash)' }}>
                <span style={{ color: hue }}>{p.health}</span><span>·</span><span>{p.flags ? p.flags + ' flags' : 'cleared'}</span>
                <span style={{ marginLeft: 'auto' }}>{p.updated}</span>
              </div>
              {active && isPrimary && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 5, paddingTop: 9, borderTop: '1px solid var(--hairline)', font: 'var(--code-sm)', color: 'var(--fabricated)', fontWeight: 600 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--fabricated)', animation: 'ccPulse 1.6s infinite' }} /> 02:38:47 to filing
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6, font: 'var(--body-sm)', color: 'var(--mute)' }}>
                      <span>{stage === 'partner' ? 'Stage 2 — citations approved' : 'Stage 1 — citations reviewed'}</span>
                      <b style={{ font: 'var(--code-sm)', fontWeight: 600, color: 'var(--ink)' }}>{stage === 'partner' ? partApproved : resolved}/{total}</b>
                    </div>
                    <span style={{ display: 'block', height: 6, background: 'var(--hairline)', borderRadius: 3, overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: (total ? ((stage === 'partner' ? partApproved : resolved) / total) * 100 : 0) + '%', background: stage === 'partner' ? 'var(--primary-deep)' : 'var(--ink)', borderRadius: 3, transition: 'width 300ms ease' }} /></span>
                  </div>
                  {stage === 'partner' && !partReady && (
                    <div style={{ marginTop: 10, border: '1px solid var(--primary)', background: 'var(--primary-soft)', borderRadius: 'var(--radius-md)', padding: 12 }}>
                      <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, color: 'var(--primary-deep)', marginBottom: 5 }}>Optional at this stage</div>
                      <div style={{ font: 'var(--body-sm)', color: 'var(--body)', lineHeight: 1.45, marginBottom: 10 }}>Stage 1 is complete — the associate reviewed all {total}. Spot-check each citation, or accept their review as it stands.</div>
                      <button onClick={(e) => { e.stopPropagation(); app.trustAll(ids); setTimeout(() => app.completeClean(), 480); }} style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '10px', borderRadius: 'var(--radius-md)', background: 'var(--primary-deep)', color: 'var(--on-dark)', border: 'none', cursor: 'pointer', font: 'var(--button-sm)' }}><Icon name="shield-check" size={14} /> Trust associate — approve all &amp; complete</button>
                      <div style={{ textAlign: 'center', font: 'var(--body-sm)', color: 'var(--primary-deep)', opacity: 0.8, marginTop: 8 }}>or approve each citation individually</div>
                    </div>
                  )}
                </>
              )}
              <button onClick={(e) => { e.stopPropagation(); setActiveProject(p.id); app.goTo('Insights'); }}
                style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', background: active ? 'var(--surface-dark)' : 'transparent', color: active ? 'var(--on-dark)' : 'var(--charcoal)', border: `1px solid ${active ? 'var(--surface-dark)' : 'var(--hairline-strong)'}`, cursor: 'pointer', font: 'var(--button-sm)', fontSize: 12.5 }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(32,32,32,0.05)'; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="bar-chart-3" size={14} /> See Deepdive &amp; Analytics</span> <Icon name="arrow-right" size={13} />
              </button>
            </div>
          );
        })}
      </div>
      <div style={{ padding: 14, borderTop: '1px solid var(--hairline)', flex: '0 0 auto', background: 'var(--surface-bone)' }}>
        {stage === 'associate'
          ? <button onClick={() => assocReady && app.sendToPartner()} disabled={!assocReady} style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 'var(--radius-md)', border: 'none', font: 'var(--button-md)', cursor: assocReady ? 'pointer' : 'not-allowed', background: assocReady ? 'var(--surface-dark)' : 'var(--hairline)', color: assocReady ? 'var(--on-dark)' : 'var(--ash)' }}>Send to partner {assocReady ? <Icon name="arrow-right" size={15} /> : null}</button>
          : <button onClick={() => partReady && app.completeClean()} disabled={!partReady} style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 'var(--radius-md)', border: 'none', font: 'var(--button-md)', cursor: partReady ? 'pointer' : 'not-allowed', background: partReady ? 'var(--primary-deep)' : 'var(--hairline)', color: partReady ? 'var(--on-dark)' : 'var(--ash)' }}>Complete — generate clean copy</button>}
        <div style={{ textAlign: 'center', font: 'var(--body-sm)', color: 'var(--faint, var(--ash))', marginTop: 8, lineHeight: 1.4 }}>
          {stage === 'associate'
            ? (assocReady ? 'All ' + total + ' reviewed — ready for sign-off' : (total - resolved) + ' citation' + (total - resolved === 1 ? '' : 's') + ' left to review')
            : (partReady ? 'All approved — produce the filing copy' : (total - partApproved) + ' citation' + (total - partApproved === 1 ? '' : 's') + ' left to approve')}
        </div>
        <div onClick={() => app.goTo('Audit Trail')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, font: 'var(--body-sm)', color: 'var(--mute)', cursor: 'pointer' }}><Icon name="history" size={13} /> View audit trail</div>
      </div>
    </aside>
  );
}

function ProjectSummary({ project, app }) {
  const p = project;
  const { HealthMeter } = window.ConsistencyCheckDesignSystem_77c3a7;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)' }}>Archived matter · read-only</div>
        <h2 style={{ margin: '6px 0 0', font: 'var(--display-md)', letterSpacing: '-0.5px', color: 'var(--ink)' }}>{p.matter}</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, background: 'var(--surface-card)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: 24, boxShadow: 'var(--elev-card)', alignSelf: 'flex-start' }}>
        <HealthMeter score={p.health} label="Citation health" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[['Client', p.client], ['Document', p.type], ['Citations', String(p.citations)], ['Open flags', p.flags ? String(p.flags) : 'None'], ['Status', p.status], ['Updated', p.updated]].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
              <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ash)', width: 88 }}>{k}</span>
              <span style={{ font: 'var(--caption-strong)', fontSize: 14, color: k === 'Open flags' && p.flags ? 'var(--fabricated)' : 'var(--ink)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => app.openReport()} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 40, padding: '0 18px', borderRadius: 'var(--radius-full)', background: 'var(--surface-dark)', color: 'var(--on-dark)', border: 'none', cursor: 'pointer', font: 'var(--button-sm)' }}><Icon name="file-text" size={15} /> View report</button>
        <span style={{ font: 'var(--body-sm)', color: 'var(--mute)' }}>Read-only — the live verification dataset is loaded for the Crestholm matter.</span>
      </div>
    </div>
  );
}

const ROLES = [
  { key: 'Partner Review Mode', short: 'Partner', detail: 'Full review authority — can overrule any verdict', initials: 'P' },
  { key: 'Senior Associate Mode', short: 'Senior Associate', detail: 'Can amend and escalate; cannot sign off for filing', initials: 'SA' },
  { key: 'Reviewer (read-only)', short: 'Reviewer', detail: 'Read-only access to findings and the audit trail', initials: 'R' },
];

function RoleBadge({ app }) {
  const [open, setOpen] = useState(false);
  const current = ROLES.find((r) => r.key === app.role) || ROLES[0];
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen((v) => !v)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 36, padding: '0 8px 0 14px', borderRadius: 'var(--radius-full)', background: 'var(--surface-card)', border: `1px solid ${open ? 'var(--hairline-strong)' : 'var(--hairline)'}`, font: 'var(--caption-strong)', color: 'var(--ink)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
        {current.short}
        <Icon name="chevron-down" size={14} style={{ color: 'var(--mute)' }} />
        <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--surface-dark)', color: 'var(--on-dark)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="user" size={13} /></span>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
          <div style={{ position: 'absolute', top: 44, right: 0, width: 280, background: 'var(--surface-card)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--elev-pop)', zIndex: 41, overflow: 'hidden', animation: 'ccPop 140ms ease' }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--hairline)', font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>Switch review mode</div>
            {ROLES.map((r) => {
              const active = r.key === current.key;
              return (
                <button key={r.key} onClick={() => { app.setRole(r.key); setOpen(false); app.toast('Switched to ' + r.short + ' · ' + r.detail, { icon: 'user-check', hue: 'var(--verified)' }); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', padding: '11px 14px', background: active ? 'var(--surface-bone)' : 'transparent', border: 'none', borderTop: '1px solid var(--hairline)', cursor: 'pointer' }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'var(--canvas)'; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: active ? 'var(--surface-dark)' : 'var(--surface-bone)', color: active ? 'var(--on-dark)' : 'var(--charcoal)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '600 11px/1 var(--font-sans)', flex: '0 0 auto' }}>{r.initials}</span>
                  <span style={{ minWidth: 0, flex: 1 }}>
                    <span style={{ display: 'block', font: 'var(--caption-strong)', fontSize: 14, color: 'var(--ink)' }}>{r.short}</span>
                    <span style={{ display: 'block', font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 1 }}>{r.detail}</span>
                  </span>
                  {active && <Icon name="check" size={15} style={{ color: 'var(--verified)', flex: '0 0 auto' }} />}
                </button>
              );
            })}
            <button onClick={() => { setOpen(false); app.toast('Signed out (prototype)', { icon: 'log-out', hue: 'var(--mute)' }); }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', padding: '11px 14px', background: 'transparent', border: 'none', borderTop: '1px solid var(--hairline)', cursor: 'pointer', font: 'var(--caption-strong)', color: 'var(--charcoal)' }}>
              <Icon name="log-out" size={15} /> Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface-dark)', color: 'var(--on-dark)', padding: '12px 18px', borderRadius: 'var(--radius-full)', boxShadow: 'var(--elev-pop)', font: 'var(--body-sm)', maxWidth: 560, animation: 'ccToast 180ms ease' }}>
      <Icon name={toast.icon || 'check-circle'} size={16} style={{ color: toast.hue || 'var(--hero-glow)', flex: '0 0 auto' }} />
      <span>{toast.msg}</span>
    </div>
  );
}

function verifySources(finding) {
  const a = (window.CCData.analysis && window.CCData.analysis[finding.id]) || {};
  const jur = (a.jurisdiction || '').toLowerCase();
  const cit = finding.citation || '';
  const q = encodeURIComponent(cit);
  const isUS = /united states|\bus\b|u\.s\.|tex|american|delaware|new york/.test(jur) || /\bS\.?W\.?2d\b|Tex App|F\.?\d?d|U\.?S\.?\s/.test(cit);
  const isEU = /\beu\b|european union|cjeu|euro/.test(jur);
  if (isUS) return [
    { label: 'CourtListener', url: 'https://www.courtlistener.com/?q=' + q, host: 'courtlistener.com' },
    { label: 'Caselaw Access Project', url: 'https://case.law/search/#/cases?search=' + q, host: 'case.law' },
  ];
  if (isEU) return [
    { label: 'EUR-Lex', url: 'https://eur-lex.europa.eu/search.html?type=quick&text=' + q, host: 'eur-lex.europa.eu' },
  ];
  return [
    { label: 'Google Scholar', url: 'https://scholar.google.com/scholar?q=' + q, host: 'scholar.google.com' },
    { label: 'CourtListener', url: 'https://www.courtlistener.com/?q=' + q, host: 'courtlistener.com' },
  ];
}

function searchUrlFor(name, q) {
  const n = (name || '').toLowerCase();
  if (n.includes('courtlistener')) return 'https://www.courtlistener.com/?q=' + q;
  if (n.includes('legislation')) return 'https://www.legislation.gov.uk/all?title=' + q;
  if (n.includes('find case') || n.includes('national archives') || n.includes('scholar') || n.includes('supreme court')) return 'https://scholar.google.com/scholar?q=' + q;
  if (n.includes('eur-lex') || n.includes('cellar')) return 'https://eur-lex.europa.eu/search.html?type=quick&text=' + q;
  if (n.includes('open web') || n.includes('perplexity') || n.includes('web')) return 'https://duckduckgo.com/?q=' + q;
  return null; // internal corpus — not publicly addressable
}

function VLink({ href, children, title, tone }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={title || 'Opens in a new tab'}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 34, padding: '0 14px', borderRadius: 'var(--radius-full)', background: tone === 'dark' ? 'var(--surface-dark)' : 'var(--surface-card)', border: '1px solid ' + (tone === 'dark' ? 'var(--surface-dark)' : 'var(--hairline-strong)'), font: 'var(--button-sm)', color: tone === 'dark' ? 'var(--on-dark)' : 'var(--ink)', textDecoration: 'none', cursor: 'pointer', transition: 'background 120ms ease' }}
      onMouseEnter={(e) => { if (tone !== 'dark') e.currentTarget.style.background = 'var(--surface-bone)'; }}
      onMouseLeave={(e) => { if (tone !== 'dark') e.currentTarget.style.background = 'var(--surface-card)'; }}>
      <Icon name="external-link" size={14} /> {children}
    </a>
  );
}

function SourceModal({ finding, onClose }) {
  if (!finding) return null;
  const c = window.CCData.corpus[finding.id] || {};
  const none = c.match === 'none';
  const links = verifySources(finding);
  const q = encodeURIComponent(finding.citation || '');
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(32,32,32,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'ccFade 140ms ease' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(620px, 100%)', maxHeight: '82vh', overflowY: 'auto', background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--elev-pop)', animation: 'ccPop 160ms ease' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '20px 24px', borderBottom: '1px solid var(--hairline)' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)' }}>
              {none ? 'No authority found' : c.match === 'external' ? 'Matched · open sources' : 'Matched · provided corpus'}
            </div>
            <div style={{ font: 'var(--code-md)', color: 'var(--ink)', marginTop: 8 }}>{finding.citation}</div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'var(--surface-bone)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)', flex: '0 0 auto' }}><Icon name="x" size={17} /></button>
        </div>
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {!none ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="Court">{c.court}</Field>
                <Field label="Neutral citation" mono>{c.neutral}</Field>
                <Field label="Bench" span>{c.bench}</Field>
              </div>
              <div>
                <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)', marginBottom: 8 }}>Holding relied on</div>
                <div style={{ font: 'var(--body-md)', color: 'var(--body)', background: 'var(--surface-bone)', borderRadius: 'var(--radius-md)', padding: '14px 16px', borderLeft: '3px solid var(--verified)' }}>{c.holding}</div>
              </div>
              <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="shield-check" size={15} style={{ color: 'var(--verified)' }} />
                  <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>Verify independently</span>
                </div>
                <div style={{ font: 'var(--body-sm)', color: 'var(--charcoal)' }}>Open the authoritative public record to confirm this authority exists and says what is quoted. Links open the source database in a new tab — anyone reviewing this document can re-check it.</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {links.map((l) => <VLink key={l.url} href={l.url} title={'Search ' + l.host + ' for this citation'}>{l.label}</VLink>)}
                </div>
                <a href={links[0].url} target="_blank" rel="noopener noreferrer" title="Open the public record for independent verification" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, font: 'var(--code-sm)', color: 'var(--charcoal)', textDecoration: 'none', marginTop: 2 }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--link)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}>
                  <Icon name="file-text" size={14} />
                  <span style={{ textDecoration: 'underline', textUnderlineOffset: 2 }}>{c.match === 'external' ? 'Matched via ' + c.source : 'corpus/' + c.source}</span>
                  <Icon name="arrow-up-right" size={12} />
                </a>
              </div>
            </>
          ) : (
            <>
              <div style={{ font: 'var(--body-md)', color: 'var(--body)', background: 'var(--fabricated-bg)', borderRadius: 'var(--radius-md)', padding: '14px 16px', borderLeft: '3px solid var(--fabricated)' }}>{c.holding}</div>
              <div>
                <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)', marginBottom: 8 }}>Sources searched · confirm the absence yourself</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {(c.searched || []).map((s) => {
                    const url = searchUrlFor(s, q);
                    return (
                      <a key={s} href={url || undefined} target={url ? '_blank' : undefined} rel="noopener noreferrer" title={url ? 'Re-run this search and see the empty result' : 'Internal corpus — not publicly addressable'}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'nowrap', padding: '7px 10px', borderRadius: 'var(--radius-sm)', font: 'var(--body-sm)', color: 'var(--charcoal)', textDecoration: 'none', cursor: url ? 'pointer' : 'default', background: 'transparent' }}
                        onMouseEnter={(e) => { if (url) e.currentTarget.style.background = 'var(--surface-bone)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                          <Icon name="x-circle" size={14} style={{ color: 'var(--fabricated)', flex: '0 0 auto' }} />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s} — no match</span>
                        </span>
                        {url
                          ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, flex: '0 0 auto', font: 'var(--caption-strong)', color: 'var(--link)' }}>search yourself <Icon name="arrow-up-right" size={12} /></span>
                          : <span style={{ flex: '0 0 auto', font: 'var(--caption)', color: 'var(--ash)' }}>internal</span>}
                      </a>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                  {links.map((l) => <VLink key={l.url} href={l.url} title={'Search ' + l.host + ' for this citation'}>{l.label}</VLink>)}
                </div>
                <div style={{ font: 'var(--caption)', color: 'var(--ash)', marginTop: 10 }}>Absence is bounded to the sources checked — non-existence cannot be asserted beyond them. Click any source to re-run the search and see the result for yourself.</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, mono, span }) {
  return (
    <div style={{ gridColumn: span ? '1 / -1' : 'auto' }}>
      <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)', marginBottom: 4 }}>{label}</div>
      <div style={{ font: mono ? 'var(--code-sm)' : 'var(--body-sm)', color: 'var(--ink)' }}>{children}</div>
    </div>
  );
}

/* Minimal in-browser .docx reader: unzip (store/deflate) word/document.xml and pull paragraph text. */
async function ccUnzipDocx(buf) {
  const bytes = new Uint8Array(buf);
  const dv = new DataView(buf);
  let eocd = -1;
  for (let i = bytes.length - 22; i >= 0; i--) { if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; } }
  if (eocd < 0) throw new Error('not a zip');
  const cdCount = dv.getUint16(eocd + 10, true);
  let p = dv.getUint32(eocd + 16, true);
  let localOff = -1, method = 0, compSize = 0;
  for (let i = 0; i < cdCount; i++) {
    if (dv.getUint32(p, true) !== 0x02014b50) break;
    const m = dv.getUint16(p + 10, true);
    const cs = dv.getUint32(p + 20, true);
    const nameLen = dv.getUint16(p + 28, true);
    const extraLen = dv.getUint16(p + 30, true);
    const commentLen = dv.getUint16(p + 32, true);
    const lo = dv.getUint32(p + 42, true);
    const name = new TextDecoder().decode(bytes.subarray(p + 46, p + 46 + nameLen));
    if (name === 'word/document.xml') { localOff = lo; method = m; compSize = cs; }
    p += 46 + nameLen + extraLen + commentLen;
  }
  if (localOff < 0) throw new Error('no document.xml');
  const lNameLen = dv.getUint16(localOff + 26, true);
  const lExtraLen = dv.getUint16(localOff + 28, true);
  const start = localOff + 30 + lNameLen + lExtraLen;
  const comp = bytes.subarray(start, start + compSize);
  let xmlBytes;
  if (method === 0) { xmlBytes = comp; }
  else {
    if (typeof DecompressionStream === 'undefined') throw new Error('no inflate');
    const stream = new Response(comp).body.pipeThrough(new DecompressionStream('deflate-raw'));
    xmlBytes = new Uint8Array(await new Response(stream).arrayBuffer());
  }
  const xml = new TextDecoder().decode(xmlBytes);
  const paras = [];
  xml.split(/<\/w:p>/).forEach((seg) => {
    const t = [...seg.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map((m) => m[1]).join('')
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").trim();
    if (t) paras.push(t);
  });
  return paras;
}

function UploadModal({ open, onClose, app }) {
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [phase, setPhase] = useState('idle');
  const [posture, setPosture] = useState(() => (app.guardrails && app.guardrails.posture) || 'conservative');
  const [scope, setScope] = useState('matter'); // matter | default
  const inputRef = React.useRef(null);
  const rawRef = React.useRef(null);
  if (!open) return null;
  const applyPosture = () => {
    const base = scope === 'default' ? window.CCDefaultGuardrails : app.guardrails;
    const next = window.CCGuardrailsForPosture(posture, base);
    app.setGuardrails(next);
    if (scope === 'default') window.CCDefaultGuardrails = window.CCGuardrailsForPosture(posture, window.CCDefaultGuardrails);
  };
  const pick = (f) => { if (f) { rawRef.current = f; setFile({ name: f.name, size: (f.size / 1024).toFixed(0) + ' KB' }); setPhase('idle'); } };
  const splitPages = (txt) => { const paras = txt.replace(/\r/g, '').split(/\n{2,}/).map((s) => s.trim()).filter(Boolean); const pages = []; for (let i = 0; i < paras.length; i += 6) pages.push(paras.slice(i, i + 6).join('\n\n')); return pages.length ? pages : [txt]; };
  const analyse = async () => {
    const raw = rawRef.current;
    applyPosture();
    if (!raw) { onClose(); app.toast('Review posture set: ' + (window.CCPostures[posture] || {}).label + (scope === 'default' ? ' — practice default' : ' — this matter'), { icon: 'sliders-horizontal', hue: 'var(--primary-deep)' }); return; }
    setPhase('parsing');
    try {
      const name = raw.name.toLowerCase();
      let pages = [];
      if (name.endsWith('.pdf') && window.pdfjsLib) {
        const buf = await raw.arrayBuffer();
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const pdf = await window.pdfjsLib.getDocument({ data: buf }).promise;
        const n = Math.min(pdf.numPages, 12);
        for (let p = 1; p <= n; p++) { const page = await pdf.getPage(p); const tc = await page.getTextContent(); pages.push(tc.items.map((it) => it.str).join(' ').replace(/\s+/g, ' ').trim()); }
      } else if (name.endsWith('.docx')) {
        const buf = await raw.arrayBuffer();
        const paras = await ccUnzipDocx(buf);
        if (!paras.length) throw new Error('empty docx');
        for (let i = 0; i < paras.length; i += 6) pages.push(paras.slice(i, i + 6).join('\n\n'));
      } else if (name.endsWith('.txt') || name.endsWith('.md')) {
        pages = splitPages(await raw.text());
      } else {
        pages = splitPages(await raw.text().catch(() => ''));
        if (!pages.join('').trim()) throw new Error('unsupported');
      }
      const cites = window.CCDetectCitations(pages.join('\n'));
      app.loadUploaded({ name: raw.name, pages, citations: cites });
      app.toast(raw.name + ' parsed — ' + cites.length + ' citation' + (cites.length === 1 ? '' : 's') + ' detected', { icon: 'file-check-2', hue: 'var(--verified)' });
      setPhase('idle'); setFile(null); rawRef.current = null; onClose();
    } catch (e) {
      setPhase('idle');
      app.toast('Could not parse this file in-browser — try a PDF or text file', { icon: 'alert-triangle', hue: 'var(--fabricated)' });
    }
  };
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(32,32,32,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'ccFade 140ms ease' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(560px, 100%)', background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--elev-pop)', animation: 'ccPop 160ms ease' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '20px 24px', borderBottom: '1px solid var(--hairline)' }}>
          <div>
            <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)' }}>New review</div>
            <div style={{ font: 'var(--heading-md)', color: 'var(--ink)', marginTop: 4 }}>Upload document</div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'var(--surface-bone)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)' }}><Icon name="x" size={17} /></button>
        </div>
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input ref={inputRef} type="file" accept=".pdf,.docx,.txt,.md" style={{ display: 'none' }} onChange={(e) => pick(e.target.files[0])} />
          {!file ? (
            <div
              onClick={() => inputRef.current && inputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]); }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '36px 24px', borderRadius: 'var(--radius-md)', border: `1.5px dashed ${drag ? 'var(--primary)' : 'var(--hairline-strong)'}`, background: drag ? 'var(--primary-soft)' : 'var(--surface-bone)', cursor: 'pointer', textAlign: 'center', transition: 'background 120ms ease, border-color 120ms ease' }}>
              <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--surface-card)', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)' }}><Icon name="upload-cloud" size={20} /></span>
              <span style={{ font: 'var(--caption-strong)', fontSize: 15, color: 'var(--ink)' }}>Drop a skeleton argument here, or click to browse</span>
              <span style={{ font: 'var(--body-sm)', color: 'var(--mute)' }}>PDF, DOCX, TXT or Markdown · parsed by Nemotron Parse</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--hairline)', background: 'var(--surface-bone)' }}>
              <span style={{ width: 38, height: 38, borderRadius: 'var(--radius-sm)', background: 'var(--surface-card)', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-deep)' }}><Icon name="file-text" size={18} /></span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', font: 'var(--caption-strong)', fontSize: 14, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                <span style={{ display: 'block', font: 'var(--code-sm)', color: 'var(--mute)', marginTop: 2 }}>{file.size} · ready to analyse</span>
              </span>
              <button onClick={() => setFile(null)} aria-label="Remove" style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--mute)' }}><Icon name="x" size={16} /></button>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, font: 'var(--body-sm)', color: 'var(--charcoal)' }}>
            <Icon name="folder-check" size={15} style={{ marginTop: 1, flex: '0 0 auto', color: 'var(--mute)' }} />
            <span>Currently under review: <strong style={{ color: 'var(--ink)' }}>Crestholm Dynamics plc v Veltros Industries Inc</strong> — Skeleton Argument, 12 citations.</span>
          </div>

          {/* ---- Review posture / guardrails ---- */}
          <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
              <Icon name="sliders-horizontal" size={15} style={{ color: 'var(--charcoal)' }} />
              <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>Review posture · guardrails</span>
            </div>
            <p style={{ margin: '0 0 12px', font: 'var(--body-sm)', color: 'var(--mute)' }}>How strict should the verifier be when deciding what to put in front of a human?</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {['conservative', 'flexible'].map((k) => {
                const p = window.CCPostures[k];
                const on = posture === k;
                return (
                  <button key={k} onClick={() => setPosture(k)} style={{ textAlign: 'left', cursor: 'pointer', padding: '13px 14px', borderRadius: 'var(--radius-md)', border: '1.5px solid ' + (on ? 'var(--primary)' : 'var(--hairline-strong)'), background: on ? 'var(--primary-soft)' : 'var(--surface-card)', transition: 'border-color 120ms, background 120ms' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                      <span style={{ width: 16, height: 16, borderRadius: '50%', flex: '0 0 auto', border: '2px solid ' + (on ? 'var(--primary)' : 'var(--hairline-strong)'), display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{on && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} />}</span>
                      <span style={{ font: 'var(--caption-strong)', fontSize: 14, color: 'var(--ink)' }}>{p.label}</span>
                      <span style={{ marginLeft: 'auto', font: 'var(--caption)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.06em', color: on ? 'var(--primary-deep)' : 'var(--ash)', background: on ? 'var(--surface-card)' : 'var(--surface-bone)', padding: '2px 7px', borderRadius: 'var(--radius-full)' }}>{p.tag}</span>
                    </div>
                    <div style={{ font: 'var(--body-sm)', lineHeight: 1.45, color: 'var(--charcoal)' }}>{p.blurb}</div>
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              <span style={{ font: 'var(--body-sm)', color: 'var(--mute)' }}>Apply to</span>
              <div style={{ display: 'inline-flex', background: 'var(--surface-bone)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-full)', padding: 3, gap: 2 }}>
                {[['matter', 'This matter only'], ['default', 'Set as practice default']].map(([k, lbl]) => (
                  <button key={k} onClick={() => setScope(k)} style={{ cursor: 'pointer', border: 'none', height: 28, padding: '0 12px', borderRadius: 'var(--radius-full)', font: 'var(--caption-strong)', fontSize: 12.5, background: scope === k ? 'var(--surface-card)' : 'transparent', color: scope === k ? 'var(--ink)' : 'var(--mute)', boxShadow: scope === k ? 'var(--elev-card)' : 'none' }}>{lbl}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '14px 24px', borderTop: '1px solid var(--hairline)' }}>
          <button onClick={onClose} style={{ height: 40, padding: '0 18px', borderRadius: 'var(--radius-full)', background: 'var(--surface-card)', border: '1px solid var(--hairline-strong)', font: 'var(--button-sm)', color: 'var(--ink)', cursor: 'pointer' }}>Cancel</button>
          <button onClick={analyse} disabled={phase === 'parsing'} style={{ height: 40, padding: '0 20px', borderRadius: 'var(--radius-full)', background: 'var(--primary)', border: 'none', font: 'var(--button-sm)', color: 'var(--on-primary)', cursor: phase === 'parsing' ? 'default' : 'pointer', opacity: phase === 'parsing' ? 0.8 : 1, display: 'inline-flex', alignItems: 'center', gap: 7 }}>{phase === 'parsing' ? <><span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.5)', borderTopColor: '#fff', borderRadius: '50%', animation: 'ccSpin 700ms linear infinite' }} /> Parsing…</> : <><Icon name="scan-line" size={15} /> Parse &amp; open</>}</button>
        </div>
      </div>
    </div>
  );
}

/* ── Demo intake gate: clean landing → upload → scanning → live app ─────── */
function IntakeTopBar() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--surface-card)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 28px' }}>
        <img src="../../assets/logo-consistency-check.png" alt="Consistency Check" style={{ height: 32, width: 'auto', display: 'block' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ textAlign: 'right', lineHeight: 1.25 }}>
            <div style={{ font: 'var(--button-sm)', color: 'var(--ink)' }}>Emma Stride</div>
            <div style={{ font: 'var(--label)', color: 'var(--mute)' }}>Associate · Alderton &amp; Marsh LLP</div>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: 'var(--radius-full)', background: 'var(--surface-dark)', color: 'var(--on-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: 'var(--button-sm)', letterSpacing: '0.02em' }}>ES</div>
        </div>
      </div>
    </header>
  );
}

function LandingPage({ onStart }) {
  const m = window.CCData.matter;
  const fileRef = React.useRef(null);
  const [drag, setDrag] = useState(false);
  const pick = (f) => { if (f) onStart(f.name); };
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--canvas)' }}>
      <IntakeTopBar />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 620, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 'var(--radius-full)', background: 'var(--primary-soft)', color: 'var(--primary-deep)', font: 'var(--label)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 22 }}>
            <Icon name="folder-open" size={13} /> New review
          </div>
          <h1 style={{ font: 'var(--display-md)', color: 'var(--ink)', margin: '0 0 12px', lineHeight: 1.18, textWrap: 'balance' }}>{m.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, font: 'var(--body)', color: 'var(--mute)', marginBottom: 36, flexWrap: 'wrap' }}>
            <span>{m.firm}</span><span style={{ opacity: 0.4 }}>·</span>
            <span>{m.docType}</span><span style={{ opacity: 0.4 }}>·</span>
            <span>{m.claimValue} claim</span>
          </div>
          <div
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files && e.dataTransfer.files[0]); }}
            style={{ border: '1.5px dashed ' + (drag ? 'var(--primary)' : 'var(--hairline-strong)'), background: drag ? 'var(--primary-soft)' : 'var(--surface-card)', borderRadius: 'var(--radius-lg)', padding: '44px 32px', transition: 'border-color 140ms ease, background 140ms ease' }}>
            <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-full)', background: 'var(--primary-soft)', color: 'var(--primary-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
              <Icon name="upload-cloud" size={26} />
            </div>
            <button onClick={() => fileRef.current && fileRef.current.click()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, height: 48, padding: '0 26px', borderRadius: 'var(--radius-full)', background: 'var(--primary)', color: 'var(--on-primary, #fff)', border: 'none', cursor: 'pointer', font: 'var(--button)', boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary-deep)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--primary)'; }}>
              <Icon name="upload" size={17} /> Upload document
            </button>
            <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 16 }}>
              Drag &amp; drop or browse · PDF or Word · we scan every citation
            </div>
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
              onChange={(e) => pick(e.target.files && e.target.files[0])} />
          </div>
          <div style={{ font: 'var(--label)', color: 'var(--stone)', marginTop: 20 }}>
            Documents are checked against the firm's verified case-law corpus and open legal sources.
          </div>
        </div>
      </main>
    </div>
  );
}

function LoadingScreen({ fileName, onDone }) {
  const m = window.CCData.matter;
  const steps = [
    { icon: 'file-search', label: 'Extracting citations from the document' },
    { icon: 'library', label: 'Matching against the verified case-law corpus' },
    { icon: 'globe', label: 'Cross-referencing CourtListener & legislation.gov.uk' },
    { icon: 'scale', label: 'Checking ratio vs obiter, fidelity and jurisdiction' },
    { icon: 'list-checks', label: 'Compiling guidance and disposition' },
  ];
  const TOTAL = 9000;
  const [pct, setPct] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  useEffect(() => {
    const t0 = Date.now();
    const iv = setInterval(() => {
      const p = Math.min(100, ((Date.now() - t0) / TOTAL) * 100);
      setPct(p);
      setStepIdx(Math.min(steps.length - 1, Math.floor((p / 100) * steps.length)));
      if (p >= 100) { clearInterval(iv); setTimeout(onDone, 450); }
    }, 60);
    return () => clearInterval(iv);
  }, []);
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--canvas)' }}>
      <IntakeTopBar />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 560 }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 'var(--radius-full)', background: 'var(--surface-card)', border: '1px solid var(--hairline)', font: 'var(--label)', color: 'var(--mute)', marginBottom: 18 }}>
              <Icon name="file-text" size={13} /> {fileName || (m.docType + '.pdf')}
            </div>
            <h1 style={{ font: 'var(--display-sm, var(--display-md))', color: 'var(--ink)', margin: '0 0 8px', lineHeight: 1.2, fontSize: 24 }}>Scanning citations…</h1>
            <div style={{ font: 'var(--body)', color: 'var(--mute)' }}>{m.name}</div>
          </div>
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: '26px 26px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <span style={{ font: 'var(--button-sm)', color: 'var(--ink)' }}>Analysing document</span>
              <span style={{ font: 'var(--mono-sm, var(--label))', color: 'var(--mute)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(pct)}%</span>
            </div>
            <div style={{ height: 7, borderRadius: 'var(--radius-full)', background: 'var(--hairline)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: pct + '%', background: 'linear-gradient(90deg, var(--primary), var(--primary-deep))', borderRadius: 'var(--radius-full)', transition: 'width 120ms linear' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 22 }}>
              {steps.map((s, i) => {
                const done = i < stepIdx;
                const active = i === stepIdx;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 4px', opacity: done || active ? 1 : 0.4, transition: 'opacity 200ms ease' }}>
                    <span style={{ width: 26, height: 26, borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto', background: done ? 'var(--verified)' : active ? 'var(--primary-soft)' : 'var(--hairline)', color: done ? '#fff' : active ? 'var(--primary-deep)' : 'var(--stone)' }}>
                      <Icon name={done ? 'check' : s.icon} size={14} />
                    </span>
                    <span style={{ font: 'var(--body-sm)', color: done || active ? 'var(--ink)' : 'var(--mute)', flex: 1 }}>{s.label}</span>
                    {active && <span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--primary-soft)', borderTopColor: 'var(--primary)', animation: 'ccSpin 0.7s linear infinite', flex: '0 0 auto' }} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  const [phase, setPhase] = useState('landing'); // landing | loading | app
  const [uploadName, setUploadName] = useState(null);
  const [tab, setTab] = useState('Document');
  const [openId, setOpenId] = useState('cit-008');
  const [filter, setFilter] = useState('All');
  const [reviews, setReviews] = useState({});
  const [toast, setToast] = useState(null);
  const [sourceId, setSourceId] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [role, setRole] = useState('Partner Review Mode');
  const [guardrails, setGuardrails] = useState(() => JSON.parse(JSON.stringify(window.CCDefaultGuardrails)));
  const [docEdits, setDocEdits] = useState({});
  const [docMode, setDocMode] = useState('tracked');
  const [uploadedDoc, setUploadedDoc] = useState(null);

  const showToast = (msg, opts = {}) => setToast({ msg, ...opts });
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }, [toast]);

  const [activeProject, setActiveProject] = useState('crestholm');
  const [amendments, setAmendments] = useState({});
  const [immersive, setImmersive] = useState(false);
  const [wfStage, setWfStage] = useState('associate'); // associate | partner
  const [partnerApproved, setPartnerApproved] = useState({});
  const [reportMode, setReportMode] = useState('report'); // report | clean
  const findingById = (id) => window.CCData.findings.find((f) => f.id === id);
  const app = {
    reviews,
    role,
    immersive,
    setImmersive,
    wfStage,
    partnerApproved,
    reportMode,
    activeProject,
    amendments,
    amend: (id, text) => setAmendments((a) => ({ ...a, [id]: text })),
    docEdits, docMode, setDocMode,
    applyFix: (id) => { const r = window.CCData.revisions[id]; if (!r) return; setDocEdits((d) => ({ ...d, [id]: { revised: r, mode: 'applied' } })); const f = findingById(id); showToast('Fix applied to document — ' + (f ? f.citation : id), { icon: 'file-pen-line', hue: 'var(--verified)' }); },
    editBlock: (id, text) => { setDocEdits((d) => ({ ...d, [id]: { revised: text, mode: 'manual' } })); showToast('Paragraph updated', { icon: 'pencil', hue: 'var(--mischar)' }); },
    revertBlock: (id) => { setDocEdits((d) => { const n = { ...d }; delete n[id]; return n; }); },
    downloadClean: () => {
      const blocks = window.CCData.docBlocks;
      const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      let body = '';
      blocks.forEach((b) => {
        if (b.kind === 'court') body += '<p class="court">' + esc(b.text) + '</p>';
        else if (b.kind === 'title') body += '<h1>' + esc(b.text) + '</h1>';
        else if (b.kind === 'h') body += '<h2>' + esc(b.text) + '</h2>';
        else { const t = (b.cite && docEdits[b.cite]) ? docEdits[b.cite].revised : b.text; body += '<p>' + esc(t) + '</p>'; }
      });
      const n = Object.keys(docEdits).length;
      const html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + esc(window.CCData.matter.name) + ' \u2014 Skeleton Argument</title><style>body{font-family:Georgia,"Times New Roman",serif;max-width:760px;margin:48px auto;padding:0 24px;color:#202020;line-height:1.75}.court{text-align:center;font-family:ui-monospace,monospace;color:#646464;font-size:13px;margin-bottom:18px}h1{text-align:center;font-size:21px;border-bottom:1px solid #ddd;padding-bottom:16px}h2{font-size:15px;margin-top:24px}p{margin:0 0 12px}.meta{color:#8a8a8a;font-size:12px;text-align:center;border-top:1px solid #ddd;margin-top:44px;padding-top:14px}</style></head><body>' + body + '<div class="meta">Clean copy \u00b7 ' + n + ' tracked change' + (n === 1 ? '' : 's') + ' applied \u00b7 generated by Consistency Check</div></body></html>';
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'Skeleton-argument-clean.html'; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast('Clean copy downloaded \u2014 ' + n + ' change' + (n === 1 ? '' : 's') + ' applied', { icon: 'file-down', hue: 'var(--verified)' });
    },
    uploadedDoc,
    loadUploaded: (doc) => { setUploadedDoc(doc); setTab('Document'); window.scrollTo({ top: 0 }); },
    clearUploaded: () => setUploadedDoc(null),
    setRole,
    openUpload: () => setUploadOpen(true),
    openReport: () => { setReportMode('report'); setReportOpen(true); },
    completeClean: () => { setReportMode('clean'); setReportOpen(true); window.scrollTo({ top: 0 }); showToast('Clean filing copy generated — corrections applied', { icon: 'file-check-2', hue: 'var(--verified)' }); },
    sendToPartner: () => { setWfStage('partner'); window.scrollTo({ top: 0 }); showToast('Handed to partner — approve each citation, or trust the associate review', { icon: 'arrow-up-right', hue: 'var(--hero-glow)' }); },
    backToAssociate: () => { setWfStage('associate'); },
    approveCitation: (id) => { setPartnerApproved((p) => ({ ...p, [id]: true })); },
    sendBackCitation: (id) => { setPartnerApproved((p) => { const n = { ...p }; delete n[id]; return n; }); showToast('Sent back to the associate', { icon: 'corner-up-left', hue: 'var(--mischar)' }); },
    trustAll: (ids) => { setPartnerApproved((p) => { const n = { ...p }; ids.forEach((i) => { n[i] = true; }); return n; }); showToast('Associate review accepted in full — all citations approved', { icon: 'shield-check', hue: 'var(--primary-deep)' }); },
    closeReport: () => setReportOpen(false),
    guardrails,
    setGuardrail: (k, v) => setGuardrails((g) => ({ ...g, [k]: v })),
    setGuardrails: (g) => setGuardrails(JSON.parse(JSON.stringify(g))),
    toggleTrusted: (name) => setGuardrails((g) => ({ ...g, trusted: { ...g.trusted, [name]: !g.trusted[name] } })),
    goTo: (t) => { setTab(t); window.scrollTo({ top: 0 }); },
    goToFilter: (fl) => { setFilter(fl); setTab('Citation Checker'); window.scrollTo({ top: 0 }); },
    toast: showToast,
    openInChecker: (id) => { setOpenId(id); setFilter('All'); setTab('Citation Checker'); window.scrollTo({ top: 0 }); },
    openSource: (id) => setSourceId(id),
    review: (id, action) => {
      setReviews((r) => ({ ...r, [id]: action }));
      const f = findingById(id);
      const map = {
        Approved: { msg: 'Approved — ' + f.citation, icon: 'check-circle', hue: 'var(--verified)' },
        Amended: { msg: 'Marked for amendment — ' + f.citation, icon: 'pencil', hue: 'var(--mischar)' },
        Rejected: { msg: 'Citation rejected — ' + f.citation, icon: 'x-circle', hue: 'var(--fabricated)' },
        Escalated: { msg: 'Escalated to Partner — ' + f.citation, icon: 'arrow-up-right', hue: 'var(--hero-glow)' },
      };
      showToast(map[action].msg, { icon: map[action].icon, hue: map[action].hue });
    },
  };

  const sourceFinding = sourceId ? findingById(sourceId) : null;
  const project = window.CCData.projects.find((p) => p.id === activeProject) || window.CCData.projects[0];
  const [railW, setRailW] = useState(248);
  const [railDrag, setRailDrag] = useState(false);
  const railDragging = React.useRef(false);
  const onRailDragStart = (e) => {
    e.preventDefault();
    railDragging.current = true; setRailDrag(true);
    const move = (ev) => {
      if (!railDragging.current) return;
      const x = ev.touches ? ev.touches[0].clientX : ev.clientX;
      setRailW(Math.max(200, Math.min(440, x)));
    };
    const up = () => {
      railDragging.current = false; setRailDrag(false);
      document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up);
      document.removeEventListener('touchmove', move); document.removeEventListener('touchend', up);
      document.body.style.cursor = ''; document.body.style.userSelect = '';
    };
    document.addEventListener('mousemove', move); document.addEventListener('mouseup', up);
    document.addEventListener('touchmove', move, { passive: false }); document.addEventListener('touchend', up);
    document.body.style.cursor = 'col-resize'; document.body.style.userSelect = 'none';
  };

  if (phase === 'landing') return <LandingPage onStart={(name) => { setUploadName(name); setPhase('loading'); }} />;
  if (phase === 'loading') return <LoadingScreen fileName={uploadName} onDone={() => setPhase('app')} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--canvas)' }}>
      <TopNav app={app} tab={tab} />
      <div style={{ display: 'flex', flex: 1, minWidth: 0 }}>
        {!immersive && <ProjectsRail activeProject={activeProject} setActiveProject={setActiveProject} app={app} width={railW} />}
        {!immersive && (
        <div onMouseDown={onRailDragStart} onTouchStart={onRailDragStart} onDoubleClick={() => setRailW(248)} role="separator" aria-orientation="vertical" title="Drag to resize · double-click to reset"
          style={{ position: 'sticky', top: 64, height: 'calc(100vh - 64px)', flex: '0 0 7px', marginLeft: -7, zIndex: 12, cursor: 'col-resize', display: 'flex', alignItems: 'center', justifyContent: 'center', background: railDrag ? 'var(--primary-soft)' : 'transparent', transition: 'background 120ms ease' }}
          onMouseEnter={(e) => { if (!railDrag) e.currentTarget.style.background = 'var(--hairline)'; }}
          onMouseLeave={(e) => { if (!railDrag) e.currentTarget.style.background = 'transparent'; }}>
          <span style={{ width: 3, height: 40, borderRadius: 3, background: railDrag ? 'var(--primary)' : 'var(--stone)', transition: 'background 120ms ease' }} />
        </div>
        )}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <main style={{ flex: 1, padding: '24px 28px 64px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            {(
              <>
                {tab === 'Source Library' && <window.CCSourceLibrary app={app} />}
                {tab === 'Dashboard' && <window.CCDashboard app={app} />}
                {tab === 'Insights' && <window.CCInsights app={app} />}
                {tab === 'Document' && <window.CCDocumentWorkspace app={app} />}
                {tab === 'Citation Checker' && <window.CCCitationChecker openId={openId} onOpenFinding={setOpenId} filter={filter} setFilter={setFilter} app={app} />}
                {tab === 'Verification' && <window.CCVerification app={app} />}
                {tab === 'Audit Trail' && <window.CCAuditTrail app={app} />}
                {tab === 'Data Sources' && <window.CCDataSources app={app} />}
              </>
            )}
          </div>
        </main>
        </div>
      </div>
      <Toast toast={toast} />
      <SourceModal finding={sourceFinding} onClose={() => setSourceId(null)} />
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} app={app} />
      {reportOpen && <window.CCReport app={app} />}
    </div>
  );
}
window.CCApp = App;
