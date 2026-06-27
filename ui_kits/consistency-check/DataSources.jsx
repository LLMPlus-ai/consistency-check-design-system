/* Data Sources tab — external databases + model engines + architecture. */
const { Card, Input } = window.ConsistencyCheckDesignSystem_77c3a7;
const { CCIcon: Icon, CCOverline: Overline } = window;

const SRC_ICON = {
  'Local Corpus': 'database',
  'Open Legal API': 'plug',
  'Open Statutory Source': 'landmark',
  'EU Knowledge Graph': 'share-2',
  'US Bulk Corpus': 'library',
  'Primary Court Source': 'gavel',
  'Fallback Web Search': 'globe',
  'Restricted Source': 'lock',
};
const ENGINE_ICON = { NVIDIA: 'cpu', Perplexity: 'globe' };

function StatusDot({ off }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 24, padding: '0 10px', borderRadius: 'var(--radius-full)', font: 'var(--caption-strong)', background: off ? 'var(--surface-bone)' : 'var(--verified-bg)', color: off ? 'var(--mute)' : 'var(--verified)' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: off ? 'var(--stone)' : 'var(--verified)' }} />
      {off ? 'Off-limits' : 'Connected'}
    </span>
  );
}

const SRC_META = {
  'Provided UK / Commonwealth Case Corpus': { jur: 'UK / Commonwealth', checked: 12, matched: 7, sample: 'match("Anglia Television Ltd v Reed [1972] 1 QB 60")' },
  'CourtListener': { jur: 'United States', checked: 5, matched: 0, sample: 'GET /api/rest/v4/search/?q=&type=o&order_by=citeCount' },
  'legislation.gov.uk': { jur: 'UK statute', checked: 5, matched: 0, sample: 'GET /ukpga/2013/26/section/1/data.xml' },
  'EUR-Lex / CELLAR SPARQL': { jur: 'European Union', checked: 5, matched: 0, sample: 'SPARQL SELECT ?act WHERE { ?act cdm:amends ?other }' },
  'Caselaw Access Project': { jur: 'United States', checked: 5, matched: 0, sample: 'GET https://static.case.law/us/347/cases/.json' },
  'UK Supreme Court': { jur: 'UK apex court', checked: 5, matched: 0, sample: 'GET /cases/uksc-2020-0166' },
  'Perplexity Live Search': { jur: 'Open web', checked: 5, matched: 2, sample: 'POST /chat/completions { model: "sonar" }' },
  'BAILII / Find Case Law': { jur: 'Restricted', checked: 0, matched: 0, sample: 'licence prohibits scraping / computational access' },
};

function SourceDetailModal({ source, onClose }) {
  if (!source) return null;
  const s = source;
  const off = s.status === 'Off-limits';
  const m = SRC_META[s.name] || { jur: '-', checked: 0, matched: 0, sample: '-' };
  const pct = m.checked ? Math.round((m.matched / m.checked) * 100) : 0;
  const usJur = /United States|European/.test(m.jur);
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(32,32,32,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'ccFade 140ms ease' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(560px, 100%)', background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--elev-pop)', animation: 'ccPop 160ms ease', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '20px 22px', borderBottom: '1px solid var(--hairline)' }}>
          <div style={{ display: 'flex', gap: 12, minWidth: 0 }}>
            <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--surface-bone)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)', flex: '0 0 auto' }}><Icon name={SRC_ICON[s.type] || 'database'} size={19} /></span>
            <div style={{ minWidth: 0 }}>
              <div style={{ font: 'var(--heading-sm)', color: 'var(--ink)' }}>{s.name}</div>
              <div style={{ font: 'var(--body-sm)', color: 'var(--mute)' }}>{s.role}</div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'var(--surface-bone)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)', flex: '0 0 auto' }}><Icon name="x" size={17} /></button>
        </div>
        <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 11px', borderRadius: 'var(--radius-full)', background: usJur ? 'var(--mischar-bg)' : 'var(--surface-bone)', color: usJur ? 'var(--mischar)' : 'var(--charcoal)', font: 'var(--caption-strong)' }}><Icon name="map-pin" size={13} />{m.jur}</span>
            <StatusDot off={off} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <Overline>Citations grounded in this matter</Overline>
              <span style={{ font: 'var(--code-sm)', color: 'var(--charcoal)' }}>{m.matched} matched / {m.checked} checked</span>
            </div>
            <div style={{ height: 10, borderRadius: 'var(--radius-full)', background: 'var(--surface-bone)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: pct + '%', minWidth: m.matched ? 8 : 0, background: m.matched ? 'var(--verified)' : 'var(--stone)', borderRadius: 'var(--radius-full)', transformOrigin: 'left', animation: 'ccGrowX 600ms ease' }} />
            </div>
            {m.checked > 0 && m.matched === 0 && (
              <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 8 }}>Checked {m.checked} escalated citations, <strong style={{ color: 'var(--ink)' }}>0 in-jurisdiction matches</strong> for an England &amp; Wales matter. {usJur ? 'A hit here would be flagged persuasive-only, not binding.' : 'Used for grounding only.'}</div>
            )}
          </div>
          <div>
            <Overline>Endpoint</Overline>
            <div style={{ font: 'var(--code-sm)', color: 'var(--ink)', marginTop: 4, wordBreak: 'break-all' }}>{s.endpoint}</div>
            <div style={{ font: 'var(--code-sm)', color: 'var(--ash)', marginTop: 2 }}>auth: {s.auth} / coverage: {s.coverage}</div>
          </div>
          <div>
            <Overline>Sample query</Overline>
            <div style={{ font: 'var(--code-sm)', color: 'var(--on-dark)', background: 'var(--surface-dark)', borderRadius: 'var(--radius-sm)', padding: '10px 12px', marginTop: 6, wordBreak: 'break-all' }}>{m.sample}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DataSources({ app }) {
  const sources = window.CCData.dataSources;
  const engines = window.CCData.engines;
  const arch = window.CCData.architecture;
  const live = sources.filter((s) => s.status === 'Connected').length;
  const [openSrc, setOpenSrc] = React.useState(null);
  const [q, setQ] = React.useState('');
  const ql = q.trim().toLowerCase();
  const fsources = sources.filter((s) => (s.name + ' ' + s.type + ' ' + s.role + ' ' + s.endpoint + ' ' + ((SRC_META[s.name] || {}).jur || '')).toLowerCase().includes(ql));
  const fengines = engines.filter((e) => (e.name + ' ' + e.vendor + ' ' + e.role + ' ' + e.endpoint).toLowerCase().includes(ql));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <Overline>Verification sources</Overline>
          <h2 style={{ margin: '6px 0 0', font: 'var(--display-md)', letterSpacing: '-0.5px', color: 'var(--ink)' }}>Data sources &amp; engines</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 248 }}><Input size="sm" placeholder="Search databases, jurisdiction, endpoint" value={q} onChange={(e) => setQ(e.target.value)} iconLeft={<Icon name="search" size={15} />} /></div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 'var(--radius-full)', background: 'var(--verified-bg)', color: 'var(--verified)', font: 'var(--caption-strong)', whiteSpace: 'nowrap' }}><Icon name="check-circle" size={15} /> {live} of {sources.length} connected</span>
        </div>
      </div>

      <Card pad={0}>
        <div style={{ display: 'grid', gridTemplateColumns: '34px 1fr 230px 120px', gap: 14, padding: '10px 20px', borderBottom: '1px solid var(--hairline)', background: 'var(--surface-bone)' }}>
          {['', 'Source & role', 'Endpoint', 'Status'].map((h, i) => (
            <span key={i} style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>{h}</span>
          ))}
        </div>
        {fsources.length === 0 && (<div style={{ padding: "24px 20px", textAlign: "center", font: "var(--body-sm)", color: "var(--mute)" }}>No source matches "{q}".</div>)}
        {fsources.map((s, i) => {
          const off = s.status === 'Off-limits';
          return (
            <div key={s.name} onClick={() => setOpenSrc(s)}
              style={{ display: 'grid', gridTemplateColumns: '34px 1fr 230px 120px', alignItems: 'center', gap: 14, padding: '14px 20px', borderTop: i === 0 ? 'none' : '1px solid var(--hairline)', opacity: off ? 0.72 : 1, cursor: 'pointer', transition: 'background 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-bone)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
              <span style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', background: 'var(--surface-bone)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: off ? 'var(--ash)' : 'var(--charcoal)' }}>
                <Icon name={SRC_ICON[s.type] || 'database'} size={16} />
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', font: 'var(--caption-strong)', fontSize: 14, color: 'var(--ink)' }}>{s.name}</span>
                <span style={{ display: 'block', font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 2 }}><span style={{ color: 'var(--charcoal)' }}>{s.type}</span> · {s.role}</span>
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', font: 'var(--code-sm)', color: off ? 'var(--ash)' : 'var(--charcoal)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.endpoint}</span>
                <span style={{ display: 'block', font: 'var(--code-sm)', color: 'var(--ash)', marginTop: 2 }}>auth: {s.auth}</span>
              </span>
              <span style={{ display: 'flex', justifyContent: 'flex-start' }}><StatusDot off={off} /></span>
            </div>
          );
        })}
      </Card>

      <div style={{ marginTop: 6 }}>
        <Overline>Model engines</Overline>
        <h2 style={{ margin: '6px 0 0', font: 'var(--display-md)', letterSpacing: '-0.5px', color: 'var(--ink)' }}>Inference &amp; reasoning</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {fengines.map((e) => (
          <Card key={e.name} interactive pad={16} onClick={() => app.toast(e.vendor + ' ' + e.name + ' \u00b7 ' + e.endpoint, { icon: 'cpu', hue: 'var(--hero-glow)' })} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'var(--surface-bone)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)' }}><Icon name={ENGINE_ICON[e.vendor] || 'cpu'} size={17} /></span>
                <span>
                  <span style={{ display: 'block', font: 'var(--caption-strong)', fontSize: 14, color: 'var(--ink)' }}>{e.name}</span>
                  <span style={{ display: 'block', font: 'var(--caption)', color: 'var(--ash)' }}>{e.vendor}</span>
                </span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: 'var(--caption-strong)', color: 'var(--verified)' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--verified)' }} />{e.status}</span>
            </div>
            <div style={{ font: 'var(--body-sm)', color: 'var(--body)', marginTop: 10 }}>{e.role}</div>
            <div style={{ font: 'var(--code-sm)', color: 'var(--ash)', marginTop: 8 }}>{e.endpoint}</div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: 6 }}>
        <Overline>Pipeline</Overline>
        <h2 style={{ margin: '6px 0 0', font: 'var(--display-md)', letterSpacing: '-0.5px', color: 'var(--ink)' }}>Architecture snapshot</h2>
      </div>
      <Card tone="dark" pad={24}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, overflowX: 'auto' }}>
          {arch.map((layer, i) => (
            <React.Fragment key={layer.n}>
              <div style={{ flex: '1 1 0', minWidth: 150, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--primary)', color: 'var(--on-primary)', font: '600 12px/1 var(--font-mono)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{layer.n}</span>
                  <span style={{ font: 'var(--caption-strong)', fontSize: 14, color: 'var(--on-dark)' }}>{layer.name}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {layer.items.map((it) => (
                    <div key={it} onClick={() => app.toast(layer.name + ' \u00b7 ' + it, { icon: 'workflow', hue: 'var(--hero-glow)' })} style={{ font: 'var(--code-sm)', color: 'var(--on-dark-mute)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-xs)', padding: '7px 9px', cursor: 'pointer', transition: 'background 120ms ease' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}>{it}</div>
                  ))}
                </div>
              </div>
              {i < arch.length - 1 && (
                <div style={{ flex: '0 0 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--on-dark-mute)' }}>
                  <Icon name="chevron-right" size={18} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="gem" size={16} style={{ color: 'var(--hero-glow)' }} />
          <span style={{ font: 'var(--body-sm)', color: 'var(--on-dark-mute)' }}><strong style={{ color: 'var(--on-dark)' }}>Core value — </strong>Detects inconsistent reasoning, terminology errors, and fabricated legal citations before legal documents are relied upon.</span>
        </div>
      </Card>
      <SourceDetailModal source={openSrc} onClose={() => setOpenSrc(null)} />
    </div>
  );
}
window.CCDataSources = DataSources;
