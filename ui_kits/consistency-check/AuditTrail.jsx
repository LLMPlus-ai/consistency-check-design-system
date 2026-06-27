/* Audit Trail tab — immutable-looking event log on a dark well. */
const { Card, Button } = window.ConsistencyCheckDesignSystem_77c3a7;
const { CCIcon: Icon, CCOverline: Overline } = window;

const ACTOR_ICON = {
  'Consistency Check Engine': 'cpu',
  'Citation Verifier': 'search-check',
  'Partner Reviewer': 'user-check',
};

function AuditTrail({ app }) {
  const events = window.CCData.audit;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <Overline>Audit · defensible record</Overline>
          <h2 style={{ margin: '6px 0 0', font: 'var(--display-md)', letterSpacing: '-0.5px', color: 'var(--ink)' }}>Audit trail</h2>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: 'var(--caption)', color: 'var(--mute)' }}><Icon name="shield-check" size={14} /> Immutable log · hash-chained</span>
          <Button variant="outline" size="sm" iconLeft={<Icon name="download" size={15} />} onClick={() => app.openReport()}>Export record</Button>
        </div>
      </div>
      <Card tone="dark" pad={0}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Overline dark>Review session · 14 June 2026</Overline>
          <span style={{ font: 'var(--code-sm)', color: 'var(--on-dark-mute)' }}>session #CC-4471-A · {events.length} events</span>
        </div>
        <div style={{ padding: '8px 22px 22px' }}>
          {events.map((e, i) => (
            <div key={i} className="cc-reveal" style={{ animationDelay: i * 110 + 'ms', display: 'grid', gridTemplateColumns: '64px 28px 1fr', gap: 14, padding: '16px 0', borderBottom: i === events.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>
              <span style={{ font: 'var(--code-md)', color: 'var(--hero-glow)' }}>{e.time}</span>
              <span style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--on-dark)' }}>
                  <Icon name={ACTOR_ICON[e.actor] || 'circle'} size={14} />
                </span>
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ font: 'var(--caption-strong)', fontSize: 14, color: 'var(--on-dark)' }}>{e.event}</span>
                  <span style={{ font: 'var(--code-sm)', color: 'var(--on-dark-mute)' }}>{e.actor}</span>
                </span>
                <span style={{ display: 'block', font: 'var(--body-sm)', color: 'var(--on-dark-mute)', marginTop: 5 }}>{e.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </Card>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', font: 'var(--body-sm)', color: 'var(--charcoal)', padding: '0 4px' }}>
        <Icon name="info" size={15} style={{ marginTop: 1, flex: '0 0 auto', color: 'var(--mute)' }} />
        <span>The audit trail records who saw what, what the AI claimed, the evidence used, and the human action taken — the basis for whether the document is defensible for filing.</span>
      </div>
    </div>
  );
}
window.CCAuditTrail = AuditTrail;
