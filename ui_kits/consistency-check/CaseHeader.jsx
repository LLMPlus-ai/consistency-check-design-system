/* Case header band — the document under review. Persistent context. */
const { Card } = window.ConsistencyCheckDesignSystem_77c3a7;
const { CCMeta: Meta, CCIcon: Icon } = window;

function DeadlinePill() {
  const f = window.CCData.filing;
  const s = window.CCUseCountdown(f.baselineRemaining);
  const hh = Math.floor(s / 3600), mm = Math.floor((s % 3600) / 60), ss = s % 60;
  const urgent = s < 3600;
  const hue = urgent ? 'var(--fabricated)' : 'var(--primary-deep)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
      <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ash)' }}>Filing deadline {f.deadline}</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, font: '600 17px/1 var(--font-mono)', color: hue }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: hue, animation: 'ccPulse 1.4s ease-in-out infinite' }} />
        {String(hh).padStart(2, '0')}:{String(mm).padStart(2, '0')}:{String(ss).padStart(2, '0')}
        <span style={{ font: 'var(--caption)', color: 'var(--mute)' }}>left</span>
      </span>
    </div>
  );
}

function CaseHeader({ app }) {
  const m = window.CCData.matter;
  return (
    <Card pad={0} style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: 24, padding: '20px 24px' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Icon name="scale" size={15} style={{ color: 'var(--mute)' }} />
            <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)' }}>Document under review</span>
          </div>
          <h1 style={{ margin: 0, font: 'var(--display-md)', letterSpacing: '-0.5px', color: 'var(--ink)' }}>{m.name}</h1>
          <div style={{ display: 'flex', gap: 32, marginTop: 18, flexWrap: 'wrap' }}>
            <Meta label="Firm">{m.firm}</Meta>
            <Meta label="Document">{m.docType}</Meta>
            <Meta label="Claim value">{m.claimValue}</Meta>
            <Meta label="Review status" accent="var(--primary-deep)">{m.reviewStatus}</Meta>
          </div>
        </div>
        <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
          <DeadlinePill />
          <button onClick={() => app && app.goTo('Citation Checker')} title="View flagged citations" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 'var(--radius-full)', background: 'var(--risk-high-bg)', color: 'var(--risk-high)', font: 'var(--caption-strong)', border: 'none', cursor: 'pointer' }}>
            <Icon name="alert-triangle" size={15} />
            Overall risk · {m.overallRisk}
          </button>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--hairline)', background: 'var(--surface-bone)', padding: '12px 24px', font: 'var(--body-sm)', color: 'var(--body)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <Icon name="info" size={15} style={{ color: 'var(--charcoal)', marginTop: 1, flex: '0 0 auto' }} />
        <span>{m.summary}</span>
      </div>
    </Card>
  );
}
window.CCCaseHeader = CaseHeader;
