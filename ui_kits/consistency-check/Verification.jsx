/* Verification tab — pre-run firm guardrails + the live two-stage decision flow. */
const { Card } = window.ConsistencyCheckDesignSystem_77c3a7;
const { CCIcon: VIcon, CCOverline: VOverline } = window;

function Segmented({ value, options, onChange }) {
  return (
    <div style={{ display: 'inline-flex', padding: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.1)' }}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button key={o.value} onClick={() => onChange(o.value)}
            style={{ height: 28, padding: '0 12px', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', font: 'var(--button-sm)', fontSize: 13, whiteSpace: 'nowrap', background: active ? 'var(--primary)' : 'transparent', color: active ? 'var(--on-primary)' : 'var(--on-dark-mute)', transition: 'background 120ms ease, color 120ms ease' }}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Guardrails({ app }) {
  const g = app.guardrails;
  const sources = window.CCData.dataSources.filter((s) => s.status === 'Connected' && s.type !== 'Local Corpus');
  return (
    <Card tone="dark" pad={0} style={{ border: '1px dashed rgba(255,255,255,0.22)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 22px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <VIcon name="sliders-horizontal" size={16} style={{ color: 'var(--hero-glow)' }} />
        <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--on-dark)', whiteSpace: 'nowrap' }}>Pre-run · firm guardrails</span>
        <span style={{ font: 'var(--body-sm)', color: 'var(--on-dark-mute)' }}>— set once, applied to every citation in this matter</span>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, height: 24, padding: '0 11px', borderRadius: 'var(--radius-full)', background: 'rgba(234,40,4,0.16)', color: 'var(--hero-glow)', font: 'var(--caption-strong)', whiteSpace: 'nowrap' }}><VIcon name="shield" size={13} /> Base posture · conservative</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
        <div style={{ padding: '18px 22px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ font: 'var(--caption-strong)', fontSize: 14, color: 'var(--on-dark)' }}>Verdict routing</div>
          <div style={{ font: 'var(--body-sm)', color: 'var(--on-dark-mute)', margin: '4px 0 12px' }}>Externally-verified citations</div>
          <Segmented value={g.routeExtVerified} onChange={(v) => app.setGuardrail('routeExtVerified', v)}
            options={[{ value: 'pass', label: 'Pass' }, { value: 'review', label: 'Route to review' }]} />
        </div>
        <div style={{ padding: '18px 22px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ font: 'var(--caption-strong)', fontSize: 14, color: 'var(--on-dark)' }}>Severity threshold</div>
          <div style={{ font: 'var(--body-sm)', color: 'var(--on-dark-mute)', margin: '4px 0 12px' }}>Citation absent from all sources</div>
          <Segmented value={g.absent} onChange={(v) => app.setGuardrail('absent', v)}
            options={[{ value: 'flag', label: 'Flag' }, { value: 'ignore', label: 'Ignore' }]} />
        </div>
        <div style={{ padding: '18px 22px' }}>
          <div style={{ font: 'var(--caption-strong)', fontSize: 14, color: 'var(--on-dark)' }}>Jurisdiction policy</div>
          <div style={{ font: 'var(--body-sm)', color: 'var(--on-dark-mute)', margin: '4px 0 12px' }}>Out-of-jurisdiction authorities · matter is E&amp;W</div>
          <Segmented value={g.jurisdiction} onChange={(v) => app.setGuardrail('jurisdiction', v)}
            options={[{ value: 'flag', label: 'Flag' }, { value: 'persuasive', label: 'Persuasive' }, { value: 'allow', label: 'Allow' }]} />
        </div>
      </div>
      <div style={{ padding: '16px 22px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ font: 'var(--caption-strong)', fontSize: 14, color: 'var(--on-dark)' }}>Source trust list</div>
        <div style={{ font: 'var(--body-sm)', color: 'var(--on-dark-mute)', margin: '4px 0 12px' }}>Approved external sources — toggle which jurisdictions the engine may rely on</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {sources.map((s) => {
            const on = g.trusted[s.name];
            const short = s.name.replace(' / CELLAR SPARQL', '').replace(' Live Search', '');
            return (
              <button key={s.name} onClick={() => app.toggleTrusted(s.name)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 26, padding: '0 10px', borderRadius: 'var(--radius-full)', cursor: 'pointer', font: 'var(--caption-strong)', border: `1px solid ${on ? 'var(--verified)' : 'rgba(255,255,255,0.16)'}`, background: on ? 'rgba(43,154,102,0.18)' : 'transparent', color: on ? '#6ee7a8' : 'var(--on-dark-mute)' }}>
                <VIcon name={on ? 'check' : 'plus'} size={12} />{short}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

/* ---- Flow nodes ---- */
function Node({ title, sub, count, tone, onClick, dark }) {
  const clickable = !!onClick;
  return (
    <button onClick={onClick} disabled={!clickable}
      style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 14px', borderRadius: 'var(--radius-md)', cursor: clickable ? 'pointer' : 'default',
        background: dark ? 'var(--surface-dark)' : 'var(--surface-card)', border: `1px solid ${tone || 'var(--hairline)'}`, borderLeft: tone ? `3px solid ${tone}` : '1px solid var(--hairline)',
        boxShadow: 'var(--elev-card)', transition: 'box-shadow 120ms ease, transform 120ms ease' }}
      onMouseEnter={(e) => { if (clickable) { e.currentTarget.style.boxShadow = 'var(--elev-2)'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
      onMouseLeave={(e) => { if (clickable) { e.currentTarget.style.boxShadow = 'var(--elev-card)'; e.currentTarget.style.transform = 'translateY(0)'; } }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ font: 'var(--caption-strong)', fontSize: 14, lineHeight: 1.3, color: dark ? 'var(--on-dark)' : 'var(--ink)' }}>{title}</div>
          {sub && <div style={{ font: 'var(--body-sm)', lineHeight: 1.35, color: dark ? 'var(--on-dark-mute)' : 'var(--mute)', marginTop: 3 }}>{sub}</div>}
        </div>
        {count != null && <span style={{ font: '600 18px/1 var(--font-display)', color: tone || (dark ? 'var(--on-dark)' : 'var(--ink)'), flex: '0 0 auto' }}>{count}</span>}
      </div>
    </button>
  );
}

function Connector({ label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6px 0' }}>
      {label && <span style={{ font: 'var(--code-sm)', color: 'var(--ash)', marginBottom: 2 }}>{label}</span>}
      <VIcon name="arrow-down" size={16} style={{ color: 'var(--stone)' }} />
    </div>
  );
}

function TwoAxisMatrix({ app }) {
  const F = window.CCData.findings;
  const cols = [{ key: 'absent', label: 'Not found', x: 17 }, { key: 'confirmed-external', label: 'Confirmed · open web', x: 50 }, { key: 'confirmed-internal', label: 'Confirmed · corpus', x: 83 }];
  const H = 240, padB = 34, plotH = H - 14 - padB;
  const colX = (ex) => (cols.find((c) => c.key === ex) || cols[0]).x;
  const hueOf = (s) => s === 'Verified' ? 'var(--verified)' : s === 'Mischaracterised' ? 'var(--mischar)' : 'var(--fabricated)';
  return (
    <div style={{ paddingLeft: 30 }}>
      <div style={{ position: 'relative', height: H, marginTop: 8, borderLeft: '1px solid var(--hairline-strong)', borderBottom: '1px solid var(--hairline-strong)' }}>
        {[0, 25, 50, 75, 100].map((v) => (
          <div key={v} style={{ position: 'absolute', left: 0, right: 0, bottom: padB + plotH * (v / 100), height: 1, background: 'var(--hairline-soft)' }}>
            <span style={{ position: 'absolute', left: -26, top: -7, font: 'var(--code-sm)', color: 'var(--ash)' }}>{v}</span>
          </div>
        ))}
        {F.map((f) => {
          const a = window.CCData.analysis[f.id] || {};
          const fid = a.fidelity;
          const bottom = padB + plotH * ((fid == null ? 4 : fid) / 100);
          const jx = ((parseInt(f.id.slice(-2), 10) % 5) - 2) * 10;
          return (
            <button key={f.id} onClick={() => app.goToFilter(f.status)} title={f.citation + ' — ' + (fid == null ? 'absent (no fidelity axis)' : fid + '% fidelity')} className="cc-reveal"
              style={{ position: 'absolute', left: 'calc(' + colX(a.existence) + '% + ' + jx + 'px)', bottom, transform: 'translate(-50%, 50%)', width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--surface-card)', background: hueOf(f.status), cursor: 'pointer', boxShadow: 'var(--elev-card)', padding: 0 }} />
          );
        })}
        {cols.map((c) => <span key={c.key} style={{ position: 'absolute', left: c.x + '%', bottom: -26, transform: 'translateX(-50%)', font: 'var(--code-sm)', color: 'var(--charcoal)', whiteSpace: 'nowrap' }}>{c.label}</span>)}
        <span style={{ position: 'absolute', left: -34, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)', whiteSpace: 'nowrap' }}>Fidelity %</span>
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 30 }}>
        {['Verified', 'Mischaracterised', 'Fabricated'].map((s) => (
          <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: 'var(--body-sm)', color: 'var(--charcoal)' }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: hueOf(s) }} />{window.CCVerdictLabel(s)}
          </span>
        ))}
      </div>
    </div>
  );
}

function Verification({ app }) {
  const F = window.CCData.findings;
  const sum = window.CCFlow.summary(F, app.guardrails);
  const go = (status) => app.goToFilter(status);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <VOverline>Two-stage verification</VOverline>
          <h2 style={{ margin: '6px 0 0', font: 'var(--display-md)', letterSpacing: '-0.5px', color: 'var(--ink)', whiteSpace: 'nowrap' }}>Verification flow</h2>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: '0 0 auto' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 32, padding: '0 13px', borderRadius: 'var(--radius-full)', background: 'var(--verified-bg)', color: 'var(--verified)', font: 'var(--caption-strong)' }}><VIcon name="check" size={14} />{sum.pass} pass</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 32, padding: '0 13px', borderRadius: 'var(--radius-full)', background: 'var(--risk-high-bg)', color: 'var(--risk-high)', font: 'var(--caption-strong)' }}><VIcon name="flag" size={14} />{sum.review} review</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 32, padding: '0 13px', borderRadius: 'var(--radius-full)', background: sum.readyToFile === 'Yes' ? 'var(--verified-bg)' : 'var(--fabricated-bg)', color: sum.readyToFile === 'Yes' ? 'var(--verified)' : 'var(--fabricated)', font: 'var(--caption-strong)' }}><VIcon name={sum.readyToFile === 'Yes' ? 'unlock' : 'lock'} size={14} />Ready to file · {sum.readyToFile}</span>
        </div>
      </div>

      <Guardrails app={app} />

      {/* Decision flow */}
      <FlowDiagram app={app} sum={sum} />
      <Card pad={20}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 4 }}>
          <div>
            <VOverline>Decomposition</VOverline>
            <h3 style={{ margin: '4px 0 0', font: 'var(--heading-sm)', color: 'var(--ink)' }}>Existence × Fidelity</h3>
          </div>
          <span style={{ font: 'var(--body-sm)', color: 'var(--mute)', maxWidth: 380, textAlign: 'right' }}>Existence is near-deterministic; fidelity is a model judgment. Plotting both stops a single “%” from overstating the easy axis and understating the hard one.</span>
        </div>
        <TwoAxisMatrix app={app} />
      </Card>
    </div>
  );
}
window.CCVerification = Verification;

/* ---- Reusable two-stage flow diagram (used in Verification tab + Insights deepdive) ---- */
function FlowDiagram({ app, sum, bare }) {
  const F = window.CCData.findings;
  const s = sum || window.CCFlow.summary(F, app.guardrails);
  const go = (status) => app.goToFilter(status);
  const inner = (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <Node title="Lawyer submits skeleton argument" sub="Crestholm Dynamics plc v Veltros Industries Inc" dark />
        <Connector />
        <Node title="Extract citations from prose" sub="claim · citation · source pointer" count={s.total} dark />
        <Connector label="each citation" />

        {/* Stage 1 */}
        <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 16, background: 'var(--surface-bone)' }}>
          <VOverline style={{ marginBottom: 10 }}>Stage 1 · internal check</VOverline>
          <Node title="Found in trusted corpus?" sub="deterministic match against the 57-authority internal corpus" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12 }}>
            <div>
              <div style={{ font: 'var(--code-sm)', color: 'var(--verified)', textAlign: 'center', marginBottom: 6 }}>yes · {s.stage1Found} found internally</div>
              <Node title="Claim matches the holding?" sub="compare cited proposition with the real holding" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
                <Node title="Verified" sub="exists + correct" count={s.internalVerified} tone="var(--verified)" onClick={() => go('Verified')} />
                <Node title="Real, misused" sub="exists, described wrong" count={s.internalMisused} tone="var(--mischar)" onClick={() => go('Mischaracterised')} />
              </div>
            </div>
            <div>
              <div style={{ font: 'var(--code-sm)', color: 'var(--charcoal)', textAlign: 'center', marginBottom: 6 }}>no · {s.stage1Escalate} escalate</div>
              {/* Stage 2 */}
              <div style={{ border: '1px dashed var(--hairline-strong)', borderRadius: 'var(--radius-md)', padding: 12 }}>
                <VOverline style={{ marginBottom: 8 }}>Stage 2 · external check</VOverline>
                <Node title="Found externally?" sub="authoritative / approved open sources" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
                  <div>
                    <div style={{ font: 'var(--code-sm)', color: 'var(--verified)', textAlign: 'center', marginBottom: 6 }}>yes · {s.stage2Found}</div>
                    <Node title="Externally verified" sub="exists + correct" count={s.extVerified} tone="var(--verified)" onClick={() => go('Verified')} />
                    <div style={{ height: 8 }} />
                    <Node title="Externally real, misused" sub="exists, described wrong" count={s.extMisused} tone="var(--mischar)" onClick={() => go('Mischaracterised')} />
                  </div>
                  <div>
                    <div style={{ font: 'var(--code-sm)', color: 'var(--fabricated)', textAlign: 'center', marginBottom: 6 }}>no · {s.stage2Absent}</div>
                    <Node title="Not found" sub="suspected fabrication · partner review" count={s.fabricated} tone="var(--fabricated)" onClick={() => go('Fabricated')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Connector label="apply firm guardrails" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Node title="Passes" sub="no action required before filing" count={s.pass} tone="var(--verified)" onClick={() => app.goTo('Citation Checker')} />
          <Node title="Review needed" sub="flagged for partner attention" count={s.review} tone="var(--risk-high)" onClick={() => app.goTo('Citation Checker')} />
        </div>
        <Connector />
        <Node title="Structured report" sub="verdict · evidence · source pointer · reason for flag" dark onClick={() => app.openReport()} />
        <Connector />
        <Node title="Lawyer reviews & signs off" sub="final authority · can overrule any verdict" tone="var(--primary)" onClick={() => app.goTo('Document')} />
    </div>
  );
  return bare ? inner : <Card pad={24}>{inner}</Card>;
}
window.CCFlowDiagram = FlowDiagram;
