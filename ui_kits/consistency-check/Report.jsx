/* Print-ready Citation Verification Report — partner-facing, A4, save-as-PDF. */
const { CCIcon: RIcon } = window;
const { useState: useRState } = React;

// verdict bucket for the interactive clean copy (colour + underline + label)
function verdictOf(f) {
  const cc = (window.CCData.corpus || {})[f.id] || {};
  if (f.status === 'Fabricated') return { k: 'n', hue: 'var(--fabricated)', soft: 'var(--fabricated-bg)', label: 'Not found in any source' };
  if (f.status === 'Mischaracterised') return { k: 'm', hue: 'var(--mischar)', soft: 'var(--mischar-bg)', label: 'Real · used for the wrong proposition' };
  if (cc.match === 'external' || /US|United States|Texas/.test((window.CCData.analysis[f.id] || {}).jurisdiction || '')) return { k: 'x', hue: 'var(--primary-deep)', soft: 'var(--primary-soft)', label: 'Real · found outside the corpus' };
  return { k: 'v', hue: 'var(--verified)', soft: 'var(--verified-bg)', label: 'Verified · safe to rely on' };
}

function CleanCite({ f, active, onClick }) {
  const v = verdictOf(f);
  const removed = f.status === 'Fabricated';
  return (
    <span onClick={onClick} title="Click to see how this authority was verified"
      style={{ cursor: 'pointer', borderRadius: 3, padding: '0 2px', whiteSpace: 'normal',
        background: active ? v.soft : 'transparent',
        boxShadow: active ? '0 0 0 2px ' + v.hue : 'none',
        color: removed ? 'var(--ash)' : 'inherit',
        textDecoration: 'underline', textDecorationStyle: v.k === 'v' ? 'solid' : 'wavy',
        textDecorationColor: v.hue, textUnderlineOffset: 3, textDecorationThickness: 2 }}>
      {f.citation}
    </span>
  );
}

function CleanDetail({ f, onClose }) {
  const D = window.CCData;
  const v = verdictOf(f);
  const cc = D.corpus[f.id] || {};
  const ana = D.analysis[f.id] || {};
  const rev = D.revisions[f.id];
  const orig = (D.docBlocks.find((b) => b.cite === f.id) || {}).text;
  const vl = window.CCVerify ? window.CCVerify(f) : null;
  const par = (D.parallelCites || {})[f.id];
  return (
    <aside style={{ position: 'sticky', top: 0, alignSelf: 'flex-start', width: 380, flex: '0 0 380px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto', background: 'var(--surface-card)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--elev-panel)', padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 24, padding: '0 11px', borderRadius: 'var(--radius-full)', background: v.soft, color: v.hue, font: 'var(--caption-strong)', fontSize: 13 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: v.hue }} />{v.label}</span>
        <button onClick={onClose} aria-label="Close" style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: 'var(--surface-bone)', cursor: 'pointer', color: 'var(--charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RIcon name="x" size={16} /></button>
      </div>
      <div style={{ font: 'var(--code-md)', color: 'var(--ink)', marginTop: 12 }}>{f.citation}</div>
      <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 3 }}>{f.legalIssue}</div>
      <div style={{ display: 'flex', gap: 18, marginTop: 14 }}>
        <div><div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ash)' }}>Confidence</div><div style={{ font: 'var(--caption-strong)', fontSize: 14, color: 'var(--ink)', marginTop: 2 }}>{f.confidence ? f.confidence + '%' : '—'}</div></div>
        <div><div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ash)' }}>Risk</div><div style={{ font: 'var(--caption-strong)', fontSize: 14, color: 'var(--ink)', marginTop: 2 }}>{f.risk}</div></div>
        <div><div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ash)' }}>Jurisdiction</div><div style={{ font: 'var(--caption-strong)', fontSize: 14, color: 'var(--ink)', marginTop: 2 }}>{ana.jurisdiction || '—'}</div></div>
      </div>
      <div style={{ font: 'var(--body-sm)', lineHeight: 1.55, color: 'var(--body)', marginTop: 14, paddingLeft: 12, borderLeft: '2px solid ' + v.hue }}>{f.explanation}</div>
      {rev && (
        <div style={{ marginTop: 16 }}>
          <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)', marginBottom: 6 }}>Correction applied in the clean copy</div>
          {orig && <p style={{ margin: '0 0 6px', font: 'var(--body-sm)', lineHeight: 1.55, color: 'var(--ash)', textDecoration: 'line-through', textDecorationColor: 'var(--fabricated)' }}>{orig}</p>}
          <p style={{ margin: 0, font: 'var(--body-sm)', lineHeight: 1.55, color: 'var(--ink)', fontWeight: 600, background: 'var(--verified-bg)', borderRadius: 6, padding: '8px 10px' }}>{rev}</p>
        </div>
      )}
      {par && par.refs && par.refs.length > 1 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)', marginBottom: 6 }}>Also reported as · one case</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{par.refs.map((r, i) => <span key={i} style={{ font: 'var(--code-sm)', color: 'var(--charcoal)', background: 'var(--surface-bone)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-full)', padding: '2px 8px' }}>{r}</span>)}</div>
        </div>
      )}
      {vl && vl[0] && (
        <a href={vl[0].url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, font: 'var(--button-sm)', color: 'var(--ink)', textDecoration: 'none', height: 34, padding: '0 13px', borderRadius: 'var(--radius-full)', border: '1px solid var(--hairline-strong)' }}><RIcon name="external-link" size={14} /> Verify on {vl[0].label}</a>
      )}
    </aside>
  );
}

function CleanCopy({ app }) {
  const D = window.CCData;
  const [selId, setSelId] = useRState(null);
  const byId = (id) => D.findings.find((f) => f.id === id);
  const sel = selId ? byId(selId) : null;
  const counts = { v: 0, m: 0, n: 0, x: 0 };
  D.findings.forEach((f) => { counts[verdictOf(f).k]++; });
  const stamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  return (
    <div style={{ maxWidth: sel ? 1180 : 820, margin: '24px auto', display: 'flex', gap: 20, alignItems: 'flex-start', transition: 'max-width 200ms ease' }}>
      <div className="cc-report-page" style={{ flex: 1, minWidth: 0, background: 'var(--surface-card)', boxShadow: 'var(--elev-2)', padding: '46px 54px 56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingBottom: 14, borderBottom: '1px solid var(--hairline)', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, font: 'var(--caption-strong)', color: 'var(--verified)' }}><RIcon name="file-check-2" size={16} /> Clean copy · corrections applied</span>
          <span style={{ display: 'flex', gap: 12, font: 'var(--code-sm)', color: 'var(--charcoal)', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--verified)' }}>● {counts.v} verified</span>
            <span style={{ color: 'var(--mischar)' }}>● {counts.m} corrected</span>
            <span style={{ color: 'var(--fabricated)' }}>● {counts.n} removed</span>
            <span style={{ color: 'var(--primary-deep)' }}>● {counts.x} external</span>
          </span>
        </div>
        <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', margin: '12px 0 22px', display: 'flex', alignItems: 'center', gap: 7 }}><RIcon name="mouse-pointer-click" size={14} style={{ color: 'var(--primary-deep)' }} /> Every authority is underlined by verdict — click any one to see how it was verified and what changed.</div>
        <div style={{ textAlign: 'center', font: 'var(--code-sm)', color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.9 }}>{D.docBlocks[0] && D.docBlocks[0].text}</div>
        <h1 style={{ textAlign: 'center', font: 'var(--heading-md)', color: 'var(--ink)', margin: '18px 0 4px' }}>{(D.docBlocks.find((b) => b.kind === 'title') || {}).text}</h1>
        <div style={{ textAlign: 'center', font: 'var(--body-sm)', color: 'var(--mute)', marginBottom: 26 }}>{D.matter.firm} · Generated {stamp}</div>
        {D.docBlocks.map((b, i) => {
          if (b.kind === 'court' || b.kind === 'title') return null;
          if (b.kind === 'h') return <div key={i} style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--faint, var(--ash))', fontSize: 12, fontWeight: 600, margin: '26px 0 12px', fontFamily: 'var(--font-sans)' }}>{b.text}</div>;
          const f = b.cite ? byId(b.cite) : null;
          if (!f) return <p key={i} style={{ margin: '0 0 16px', fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 16.5, lineHeight: 1.85, color: '#26241f' }}>{b.text}</p>;
          const text = D.revisions[f.id] || b.text;
          const idx = text.indexOf(f.citation);
          const before = idx >= 0 ? text.slice(0, idx) : text + ' ';
          const after = idx >= 0 ? text.slice(idx + f.citation.length) : '';
          return (
            <p key={i} style={{ margin: '0 0 16px', fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 16.5, lineHeight: 1.85, color: '#26241f' }}>
              {before}{idx >= 0 && <CleanCite f={f} active={selId === f.id} onClick={() => setSelId(selId === f.id ? null : f.id)} />}{after}
            </p>
          );
        })}
      </div>
      {sel && <CleanDetail f={sel} onClose={() => setSelId(null)} />}
    </div>
  );
}

const RSTATUS = {
  Verified: { fg: 'var(--verified)', bg: 'var(--verified-bg)' },
  Mischaracterised: { fg: 'var(--mischar)', bg: 'var(--mischar-bg)' },
  Fabricated: { fg: 'var(--fabricated)', bg: 'var(--fabricated-bg)' },
};
const RRISK = {
  Low: 'var(--risk-low)', Medium: 'var(--risk-medium)', High: 'var(--risk-high)', Critical: 'var(--risk-critical)',
};

function RBadge({ status }) {
  const s = RSTATUS[status] || RSTATUS.Verified;
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 20, padding: '0 9px', borderRadius: 'var(--radius-full)', font: 'var(--caption-strong)', fontSize: 12, background: s.bg, color: s.fg, whiteSpace: 'nowrap' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: s.fg }} />{status}</span>;
}

function RSection({ n, title, children }) {
  return (
    <section style={{ marginTop: 26, breakInside: 'avoid' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 8, borderBottom: '2px solid var(--ink)', marginBottom: 14 }}>
        <span style={{ font: '600 13px/1 var(--font-mono)', color: 'var(--primary)' }}>{n}</span>
        <h2 style={{ margin: 0, font: 'var(--heading-sm)', color: 'var(--ink)' }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function ReportView({ app }) {
  const D = window.CCData;
  const s = D.scores;
  const now = new Date();
  const stamp = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const flagged = D.findings.filter((f) => f.status !== 'Verified');
  const g = app.guardrails;
  const sum = window.CCFlow.summary(D.findings, g);
  const trustedCount = Object.values(g.trusted).filter(Boolean).length;
  const [mode, setMode] = useRState(app.reportMode || 'report');

  return (
    <div id="cc-report" style={{ position: 'fixed', inset: 0, zIndex: 70, background: 'var(--surface-bone)', overflowY: 'auto' }}>
      <div className="cc-report-toolbar" style={{ position: 'sticky', top: 0, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 20px', background: 'var(--surface-dark)', color: 'var(--on-dark)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, font: 'var(--caption-strong)' }}><RIcon name="file-text" size={16} /> Citation Verification Report</span>
        <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-full)', padding: 3 }}>
          {[['report', 'Structured report'], ['clean', 'Clean copy']].map(([k, lbl]) => (
            <button key={k} onClick={() => setMode(k)} style={{ height: 28, padding: '0 14px', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', font: 'var(--button-sm)', background: mode === k ? 'var(--surface-card)' : 'transparent', color: mode === k ? 'var(--ink)' : 'var(--on-dark)' }}>{lbl}</button>
          ))}
        </div>
        <span style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => window.print()} style={{ height: 36, padding: '0 16px', borderRadius: 'var(--radius-full)', background: 'var(--primary)', color: 'var(--on-primary)', border: 'none', cursor: 'pointer', font: 'var(--button-sm)', display: 'inline-flex', alignItems: 'center', gap: 7 }}><RIcon name="download" size={15} /> Save as PDF</button>
          <button onClick={() => app.closeReport()} style={{ height: 36, padding: '0 14px', borderRadius: 'var(--radius-full)', background: 'transparent', color: 'var(--on-dark)', border: '1px solid var(--divider-dark)', cursor: 'pointer', font: 'var(--button-sm)' }}>Close</button>
        </span>
      </div>

      {mode === 'clean' ? <CleanCopy app={app} /> : (
      <div className="cc-report-page" style={{ maxWidth: 820, margin: '24px auto', background: 'var(--surface-card)', boxShadow: 'var(--elev-2)', padding: '48px 56px 56px' }}>
        {/* Letterhead */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 18, borderBottom: '1px solid var(--hairline)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, lineHeight: 1 }}>
              <span style={{ display: 'inline-flex', gap: 3 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--verified)' }} />
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--mischar)' }} />
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--fabricated)' }} />
              </span>
              <span style={{ font: '600 18px/1 var(--font-display)', letterSpacing: '-0.4px', color: 'var(--ink)' }}>Consistency Check</span>
            </div>
            <div style={{ font: 'var(--caption)', color: 'var(--mute)', marginTop: 10 }}>Legal document verification &amp; AI supervision</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fabricated)', whiteSpace: 'nowrap' }}>Confidential · Privileged</div>
            <div style={{ font: 'var(--code-sm)', color: 'var(--charcoal)', marginTop: 6 }}>Generated {stamp}</div>
            <div style={{ font: 'var(--code-sm)', color: 'var(--ash)' }}>Ref CC-4471-A</div>
          </div>
        </div>

        <h1 style={{ font: 'var(--display-md)', fontSize: 34, letterSpacing: '-0.6px', color: 'var(--ink)', margin: '24px 0 4px' }}>Citation Verification Report</h1>
        <div style={{ font: 'var(--code-md)', color: 'var(--body)' }}>{D.matter.name}</div>

        {/* Matter meta */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px 24px', marginTop: 22, padding: '18px 0', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
          {[['Firm', D.matter.firm], ['Document type', D.matter.docType], ['Claim value', D.matter.claimValue], ['Review status', D.matter.reviewStatus], ['Overall risk', D.matter.overallRisk], ['Recommended action', s.action]].map(([k, v]) => (
            <div key={k}>
              <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ash)' }}>{k}</div>
              <div style={{ font: 'var(--caption-strong)', fontSize: 14, color: k === 'Overall risk' ? 'var(--risk-high)' : 'var(--ink)', marginTop: 3 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Firm guardrails */}
        <div style={{ marginTop: 18, padding: '14px 16px', background: 'var(--surface-bone)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)', marginBottom: 8 }}>Firm guardrails applied (pre-run)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', font: 'var(--body-sm)', color: 'var(--body)' }}>
            <span><strong style={{ color: 'var(--ink)' }}>Verdict routing:</strong> externally-verified → {g.routeExtVerified === 'review' ? 'review' : 'pass'}</span>
            <span><strong style={{ color: 'var(--ink)' }}>Severity:</strong> absent citation → {g.absent === 'flag' ? 'flag' : 'ignore'}</span>
            <span><strong style={{ color: 'var(--ink)' }}>Trusted sources:</strong> {trustedCount} approved · BAILII excluded</span>
            <span><strong style={{ color: 'var(--ink)' }}>Outcome:</strong> {sum.pass} pass / {sum.review} review</span>
          </div>
        </div>

        {/* Executive summary */}
        <RSection n="01" title="Executive summary">
          <p style={{ margin: 0, font: 'var(--body-md)', color: 'var(--body)' }}>{D.matter.summary}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            {[['Citation health', s.health + ' / 100', s.health < 50 ? 'var(--fabricated)' : s.health < 75 ? 'var(--mischar)' : 'var(--verified)'], ['Confidence', s.confidence + '%', 'var(--ink)'], ['Risk level', s.risk, 'var(--risk-high)'], ['Ready to file', sum.readyToFile, sum.readyToFile === 'Yes' ? 'var(--verified)' : 'var(--fabricated)']].map(([k, v, c]) => (
              <div key={k} style={{ flex: 1, border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
                <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>{k}</div>
                <div style={{ font: '600 24px/1.1 var(--font-display)', letterSpacing: '-0.5px', color: c, marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
        </RSection>

        {/* Citation breakdown */}
        <RSection n="02" title="Citation health">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[['Total', s.total, 'var(--ink)'], ['Verified', s.verified, 'var(--verified)'], ['Mischaracterised', s.mischaracterised, 'var(--mischar)'], ['Fabricated', s.fabricated, 'var(--fabricated)']].map(([k, v, c]) => (
              <div key={k} style={{ borderLeft: `3px solid ${c}`, paddingLeft: 12 }}>
                <div style={{ font: '600 30px/1 var(--font-display)', letterSpacing: '-0.5px', color: c }}>{v}</div>
                <div style={{ font: 'var(--body-sm)', color: 'var(--charcoal)', marginTop: 4 }}>{k}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', height: 10, borderRadius: 'var(--radius-full)', overflow: 'hidden', marginTop: 18 }}>
            <span style={{ flex: s.verified, background: 'var(--verified)' }} />
            <span style={{ flex: s.mischaracterised, background: 'var(--mischar)' }} />
            <span style={{ flex: s.fabricated, background: 'var(--fabricated)' }} />
          </div>
        </RSection>

        {/* Findings table */}
        <RSection n="03" title="Citation findings">
          <table style={{ width: '100%', borderCollapse: 'collapse', font: 'var(--body-sm)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--hairline-strong)' }}>
                {['#', 'Status', 'Authority & issue', 'Conf.', 'Risk', 'Recommended action'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 8px 8px 0', font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--mute)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {D.findings.map((f, i) => (
                <tr key={f.id} style={{ borderBottom: '1px solid var(--hairline)', breakInside: 'avoid' }}>
                  <td style={{ padding: '10px 8px 10px 0', font: 'var(--code-sm)', color: 'var(--ash)', verticalAlign: 'top' }}>{String(i + 1).padStart(2, '0')}</td>
                  <td style={{ padding: '10px 8px 10px 0', verticalAlign: 'top' }}><RBadge status={f.status} /></td>
                  <td style={{ padding: '10px 8px 10px 0', verticalAlign: 'top' }}>
                    <div style={{ font: 'var(--code-sm)', color: 'var(--ink)' }}>{f.citation}</div>
                    <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 2 }}>{f.legalIssue}</div>
                    {(() => {
                      const cc = D.corpus[f.id] || {};
                      const vl = window.CCVerify(f);
                      if (cc.match === 'none') return (
                        <a href={vl[0].url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: 'var(--caption)', color: 'var(--fabricated)', marginTop: 4, textDecoration: 'underline', textUnderlineOffset: 2 }}>
                          Not found — confirm on {vl[0].label} <Icon name="arrow-up-right" size={11} />
                        </a>
                      );
                      return (
                        <a href={vl[0].url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: 'var(--caption)', color: 'var(--charcoal)', marginTop: 4, textDecoration: 'underline', textUnderlineOffset: 2 }}>
                          Verify on {vl[0].label} <Icon name="arrow-up-right" size={11} />
                        </a>
                      );
                    })()}
                  </td>
                  <td style={{ padding: '10px 8px 10px 0', font: 'var(--caption-strong)', color: 'var(--ink)', verticalAlign: 'top' }}>{f.confidence}%</td>
                  <td style={{ padding: '10px 8px 10px 0', font: 'var(--caption-strong)', color: RRISK[f.risk], verticalAlign: 'top' }}>{f.risk}</td>
                  <td style={{ padding: '10px 0', font: 'var(--body-sm)', color: 'var(--body)', verticalAlign: 'top' }}>{f.recommendedAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </RSection>

        {/* Flagged detail */}
        <RSection n="04" title="Flagged authorities — detail">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {flagged.map((f) => {
              const c = D.corpus[f.id] || {};
              return (
                <div key={f.id} style={{ border: '1px solid var(--hairline)', borderLeft: `3px solid ${RSTATUS[f.status].fg}`, borderRadius: 'var(--radius-md)', padding: '14px 16px', breakInside: 'avoid' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <span style={{ font: 'var(--code-sm)', color: 'var(--ink)' }}>{f.citation}</span>
                    <RBadge status={f.status} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10 }}>
                    <div>
                      <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>As cited</div>
                      <div style={{ font: 'var(--body-sm)', color: 'var(--body)', marginTop: 3 }}>{f.extractedProposition}</div>
                    </div>
                    <div>
                      <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>Authority actually supports</div>
                      <div style={{ font: 'var(--body-sm)', color: 'var(--body)', marginTop: 3 }}>{f.actualAuthority || c.holding}</div>
                    </div>
                  </div>
                  <div style={{ font: 'var(--body-sm)', color: 'var(--charcoal)', marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--hairline)' }}>
                    <strong style={{ color: 'var(--ink)' }}>Action — </strong>{f.recommendedAction}.
                    <span style={{ font: 'var(--code-sm)', color: 'var(--ash)', marginLeft: 6 }}>{c.match === 'none' ? 'No source found · ' + (c.searched || []).length + ' searched' : (c.match === 'external' ? 'Open-source match · ' : 'Corpus · ') + (c.source || '')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </RSection>

        {/* Audit trail */}
        <RSection n="05" title="Audit trail">
          {D.audit.map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '7px 0', borderTop: i === 0 ? 'none' : '1px solid var(--hairline)' }}>
              <span style={{ font: 'var(--code-sm)', color: 'var(--primary-deep)', width: 44, flex: '0 0 auto' }}>{e.time}</span>
              <span style={{ flex: 1 }}><strong style={{ font: 'var(--caption-strong)', color: 'var(--ink)' }}>{e.event}</strong> <span style={{ font: 'var(--code-sm)', color: 'var(--ash)' }}>{e.actor}</span><span style={{ display: 'block', font: 'var(--body-sm)', color: 'var(--charcoal)' }}>{e.detail}</span></span>
            </div>
          ))}
        </RSection>

        {/* Sources */}
        <RSection n="06" title="Verification sources & engines">
          <div style={{ font: 'var(--body-sm)', color: 'var(--body)' }}>
            <strong style={{ color: 'var(--ink)' }}>Sources — </strong>{D.dataSources.filter((x) => x.status === 'Connected').map((x) => x.name).join('; ')}. BAILII / Find Case Law excluded (licence restrictions).
          </div>
          <div style={{ font: 'var(--body-sm)', color: 'var(--body)', marginTop: 8 }}>
            <strong style={{ color: 'var(--ink)' }}>Engines — </strong>{D.engines.map((e) => e.vendor + ' ' + e.name).join('; ')}.
          </div>
        </RSection>

        {/* Sign-off */}
        <div style={{ marginTop: 30, paddingTop: 18, borderTop: '2px solid var(--ink)', display: 'flex', justifyContent: 'space-between', gap: 24, breakInside: 'avoid' }}>
          {['Reviewed by (Partner)', 'Date'].map((k) => (
            <div key={k} style={{ flex: 1 }}>
              <div style={{ height: 36, borderBottom: '1px solid var(--hairline-strong)' }} />
              <div style={{ font: 'var(--caption)', color: 'var(--mute)', marginTop: 6 }}>{k}</div>
            </div>
          ))}
        </div>
        <div style={{ font: 'var(--caption)', color: 'var(--ash)', marginTop: 22, textAlign: 'center' }}>
          Generated by Consistency Check · AI-assisted verification supervised by a qualified reviewer · This report is privileged and prepared for the named matter only.
        </div>
      </div>
      )}
    </div>
  );
}
window.CCReport = ReportView;
