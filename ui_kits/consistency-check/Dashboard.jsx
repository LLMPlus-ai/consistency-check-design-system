/* Dashboard tab — overview: health, tallies, queue snapshot. */
const { StatCard, HealthMeter, Card, Button } = window.ConsistencyCheckDesignSystem_77c3a7;
const { CCIcon: Icon, CCOverline: Overline } = window;

function ScorePanel({ app }) {
  const s = window.CCData.scores;
  const sum = window.CCFlow.summary(window.CCData.findings, app.guardrails);
  return (
    <Card tone="dark" pad={24} interactive style={{ display: 'flex', gap: 28, alignItems: 'center', cursor: 'pointer' }} onClick={() => app.goTo('Verification')}>
      <HealthMeter score={s.health} label="" size={128} valueColor="var(--on-dark)" subColor="var(--on-dark-mute)" trackColor="rgba(255,255,255,0.14)" style={{ filter: 'none' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <Overline dark>Citation health score</Overline>
        <div style={{ font: 'var(--heading-md)', color: 'var(--on-dark)', marginTop: 4 }}>Partner review before filing</div>
        <div style={{ display: 'flex', gap: 28, marginTop: 16 }}>
          <div>
            <div style={{ font: 'var(--code-sm)', color: 'var(--on-dark-mute)' }}>CONFIDENCE</div>
            <div style={{ font: '600 22px/1 var(--font-display)', color: 'var(--on-dark)', marginTop: 4 }}>{s.confidence}%</div>
          </div>
          <div>
            <div style={{ font: 'var(--code-sm)', color: 'var(--on-dark-mute)' }}>RISK LEVEL</div>
            <div style={{ font: '600 22px/1 var(--font-display)', color: 'var(--hero-glow)', marginTop: 4 }}>{s.risk}</div>
          </div>
          <div>
            <div style={{ font: 'var(--code-sm)', color: 'var(--on-dark-mute)' }}>READY TO FILE</div>
            <div style={{ font: '600 22px/1 var(--font-display)', color: sum.readyToFile === 'Yes' ? '#6ee7a8' : 'var(--hero-glow)', marginTop: 4 }}>{sum.readyToFile}</div>
          </div>
          <div>
            <div style={{ font: 'var(--code-sm)', color: 'var(--on-dark-mute)' }}>PASS / REVIEW</div>
            <div style={{ font: '600 22px/1 var(--font-display)', color: 'var(--on-dark)', marginTop: 4 }}>{sum.pass} / {sum.review}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Dashboard({ app }) {
  const s = window.CCData.scores;
  const fabricated = window.CCData.findings.filter((f) => f.status === 'Fabricated');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <window.CCCaseHeader app={app} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { v: s.total, l: 'Total citations', c: 'Extracted from skeleton argument', a: null, f: 'All' },
          { v: s.verified, l: 'Verified', c: 'Exists and applied correctly', a: 'var(--verified)', f: 'Verified' },
          { v: s.mischaracterised, l: 'Mischaracterised', c: 'Legal proposition questionable', a: 'var(--mischar)', f: 'Mischaracterised' },
          { v: s.fabricated, l: 'Not found', c: 'Absent from every source checked', a: 'var(--fabricated)', f: 'Fabricated' },
        ].map((card) => (
          <button key={card.l} onClick={() => app.goToFilter(card.f)} title={'View ' + card.f + ' citations'}
            style={{ display: 'block', textAlign: 'left', padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 'var(--radius-md)' }}
            onMouseEnter={(e) => { e.currentTarget.firstChild.style.boxShadow = 'var(--elev-2)'; }}
            onMouseLeave={(e) => { e.currentTarget.firstChild.style.boxShadow = 'var(--elev-card)'; }}>
            <StatCard value={<window.CCCountUp value={card.v} />} label={card.l} caption={card.c} accent={card.a} />
          </button>
        ))}
      </div>
      <ScorePanel app={app} />
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <Card pad={0}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--hairline)' }}>
            <div style={{ font: 'var(--heading-sm)', color: 'var(--ink)' }}>Highest-risk citations</div>
            <Button variant="ghost" size="sm" onClick={() => app.goTo('Citation Checker')} iconRight={<Icon name="arrow-right" size={15} />}>View all 12</Button>
          </div>
          <div>
            {fabricated.map((f, i) => (
              <button key={f.id} onClick={() => app.openInChecker(f.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', padding: '14px 20px', background: 'transparent', border: 'none', borderTop: i === 0 ? 'none' : '1px solid var(--hairline)', cursor: 'pointer' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--fabricated)', flex: '0 0 auto' }} />
                <span style={{ flex: 1, minWidth: 0, font: 'var(--code-sm)', color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.citation}</span>
                <span style={{ font: 'var(--caption-strong)', color: 'var(--risk-critical)' }}>Critical</span>
                <Icon name="chevron-right" size={16} style={{ color: 'var(--stone)' }} />
              </button>
            ))}
          </div>
        </Card>
        <Card pad={20} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ font: 'var(--heading-sm)', color: 'var(--ink)' }}>Filing readiness</div>
            <span style={{ font: 'var(--caption)', color: 'var(--mute)' }}>{window.CCData.matter.docType}</span>
          </div>
          {(() => { const s = window.CCFlow.summary(window.CCData.findings, app.guardrails); return [['Authorities', s.total], ['Verified', s.internalVerified + s.extVerified, 'var(--verified)'], ['Flagged for review', s.review, 'var(--risk-high)'], ['Not found in any source', s.fabricated, 'var(--fabricated)'], ['Ready to file', s.readyToFile, s.readyToFile === 'Yes' ? 'var(--verified)' : 'var(--fabricated)']].map(([k, v, c], i) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderTop: i === 0 ? 'none' : '1px solid var(--hairline)' }}>
              <span style={{ font: 'var(--body-sm)', color: 'var(--charcoal)' }}>{k}</span>
              <span style={{ font: 'var(--caption-strong)', fontSize: 15, color: c || 'var(--ink)' }}>{v}</span>
            </div>
          )); })()}
          <Button variant="primary" size="sm" fullWidth style={{ marginTop: 14 }} onClick={() => app.goTo('Document')}>Open working document</Button>
        </Card>
      </div>
    </div>
  );
}
window.CCDashboard = Dashboard;
