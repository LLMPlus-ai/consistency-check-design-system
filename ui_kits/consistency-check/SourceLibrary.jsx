/* Source Library — workspace-level visibility over the verification corpus.
   Shows every source document the system checks against, plus real cases
   discovered from internet sources during verification that a lawyer can
   promote into the trusted corpus. Independent of the active matter. */
const { Card, Button, Input, FilterChip, IconButton } = window.ConsistencyCheckDesignSystem_77c3a7;
const { CCIcon: Icon, CCOverline: Overline, CCCountUp: CountUp } = window;
const { useState: useS, useMemo } = React;

const JM = window.CCJurMeta || {};
const JUR_DOT = Object.fromEntries(Object.entries(JM).map(([k, v]) => [k, v.dot]));
const JUR_FULL = Object.fromEntries(Object.entries(JM).map(([k, v]) => [k, v.label]));
const JUR_SHORT = Object.fromEntries(Object.entries(JM).map(([k, v]) => [k, v.short]));
const JUR_ORDER = ['ew', 'sc', 'ni', 'pc', 'us'];

/* parallel-citation chip — one case, many report references */
function ParallelRefs({ refs, compact }) {
  if (!refs || refs.length < 2) return null;
  const extra = refs.length - 1;
  return (
    <span title={'Also reported as:\n' + refs.join('\n')}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 18, padding: '0 7px', borderRadius: 'var(--radius-full)', background: 'var(--surface-bone)', border: '1px solid var(--hairline)', font: 'var(--caption-strong)', fontSize: 11, color: 'var(--charcoal)', whiteSpace: 'nowrap', cursor: 'help', flex: '0 0 auto' }}>
      <Icon name="layers" size={10} /> +{extra} {compact ? 'refs' : 'parallel ref' + (extra === 1 ? '' : 's')}
    </span>
  );
}

function Pill({ children, dot, tone }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 22, padding: '0 9px', borderRadius: 'var(--radius-full)', background: tone === 'plain' ? 'transparent' : 'var(--surface-bone)', border: '1px solid var(--hairline)', font: 'var(--caption-strong)', fontSize: 12, color: 'var(--charcoal)', whiteSpace: 'nowrap' }}>
      {dot && <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot, flex: '0 0 auto' }} />}
      {children}
    </span>
  );
}

function verifyHref(item) {
  const cl = encodeURIComponent(item.case + ' ' + item.citation);
  if (item.jur === 'us') return 'https://www.courtlistener.com/?q=' + cl;
  return 'https://scholar.google.com/scholar?q=' + encodeURIComponent('"' + item.case + '" ' + item.citation);
}

/* ---- KPI ---- */
function Stat({ icon, label, value, sub, hue, fmt }) {
  return (
    <div style={{ flex: 1, minWidth: 0, background: 'var(--surface-card)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--elev-card)', padding: '15px 17px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--surface-bone)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: hue || 'var(--charcoal)' }}><Icon name={icon} size={14} /></span>
        <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>{label}</span>
      </div>
      <div style={{ font: '600 27px/1 var(--font-display)', color: hue || 'var(--ink)', marginTop: 11, letterSpacing: '-0.5px' }}><CountUp value={value} format={fmt || ((v) => v)} /></div>
      <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 4 }}>{sub}</div>
    </div>
  );
}

/* ---- discovered card ---- */
function DiscoveredCard({ d, state, onAdd, onDismiss }) {
  const added = state === 'added';
  const dismissed = state === 'dismissed';
  return (
    <div style={{ border: '1px solid ' + (added ? 'var(--verified)' : 'var(--hairline-strong)'), borderRadius: 'var(--radius-md)', background: added ? 'var(--verified-bg)' : 'var(--surface-card)', padding: '16px 18px', opacity: dismissed ? 0.55 : 1, transition: 'background 200ms ease, border-color 200ms ease' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ font: 'var(--heading-sm)', fontSize: 15, color: 'var(--ink)' }}>{d.case}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3, flexWrap: 'wrap' }}>
              <span style={{ font: 'var(--code-sm)', color: 'var(--charcoal)' }}>{d.citation}</span>
              <ParallelRefs refs={(window.CCData.parallelLib || {})[d.id]} compact />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            <Pill dot={JUR_DOT[d.jur]}>{JUR_FULL[d.jur] || d.jur}</Pill>
            <Pill>{d.area}</Pill>
            <span style={{ font: 'var(--body-sm)', color: 'var(--mute)' }}>{d.court}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 10, font: 'var(--body-sm)', color: 'var(--charcoal)' }}>
            <Icon name="radar" size={14} style={{ color: 'var(--primary-deep)', flex: '0 0 auto' }} />
            <span>Found via <strong style={{ color: 'var(--ink)' }}>{d.foundVia}</strong> during <span style={{ color: 'var(--ink)' }}>{d.matter}</span> · {d.confidence}% confidence</span>
          </div>
          <div style={{ font: 'var(--body-sm)', color: 'var(--body)', marginTop: 8, maxWidth: 620 }}>{d.note}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'stretch', flex: '0 0 auto', width: 188 }}>
          {added ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, height: 36, padding: '0 12px', borderRadius: 'var(--radius-full)', background: 'var(--surface-card)', border: '1px solid var(--verified)', font: 'var(--button-sm)', color: 'var(--verified)', justifyContent: 'center' }}><Icon name="check-circle" size={15} /> Added to corpus</div>
          ) : (
            <button onClick={onAdd} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, height: 36, padding: '0 12px', borderRadius: 'var(--radius-full)', background: 'var(--surface-dark)', color: 'var(--on-dark)', border: 'none', cursor: 'pointer', font: 'var(--button-sm)' }}><Icon name="database-zap" size={15} /> Add to source database</button>
          )}
          <a href={verifyHref(d)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, height: 34, padding: '0 12px', borderRadius: 'var(--radius-full)', background: 'var(--surface-card)', border: '1px solid var(--hairline-strong)', font: 'var(--button-sm)', color: 'var(--ink)', textDecoration: 'none' }}><Icon name="external-link" size={14} /> Verify source</a>
          {!added && !dismissed && <button onClick={onDismiss} style={{ height: 30, background: 'transparent', border: 'none', cursor: 'pointer', font: 'var(--button-sm)', color: 'var(--mute)' }}>Dismiss</button>}
        </div>
      </div>
    </div>
  );
}

/* ---- add-from-internet modal ---- */
const ADDABLE = [
  { case: 'Cavendish Square Holding BV v Makdessi', citation: '[2015] UKSC 67', court: 'UK Supreme Court', jur: 'ew', area: 'Contract', key: 'cavendish|makdessi' },
  { case: 'AIB Group (UK) plc v Mark Redler & Co', citation: '[2014] UKSC 58', court: 'UK Supreme Court', jur: 'ew', area: 'Negligence & duty', key: 'aib|redler' },
  { case: 'Sempra Metals Ltd v IRC', citation: '[2007] UKHL 34', court: 'House of Lords', jur: 'ew', area: 'Restitution', key: 'sempra' },
];

function AddSourceModal({ open, onClose, onAdd }) {
  const [q, setQ] = useS('');
  const [phase, setPhase] = useS('idle'); // idle | searching | found | notfound
  const [hit, setHit] = useS(null);
  if (!open) return null;
  const run = (text) => {
    const query = (text != null ? text : q).trim();
    if (!query) return;
    setPhase('searching'); setHit(null);
    setTimeout(() => {
      const m = ADDABLE.find((a) => new RegExp(a.key, 'i').test(query) || query.toLowerCase().includes(a.case.toLowerCase().split(' v ')[0].toLowerCase()));
      if (m) { setHit(m); setPhase('found'); } else { setPhase('notfound'); }
    }, 850);
  };
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(32,32,32,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'ccFade 140ms ease' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(600px, 100%)', background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--elev-pop)', animation: 'ccPop 160ms ease' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '20px 24px', borderBottom: '1px solid var(--hairline)' }}>
          <div>
            <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)' }}>Add from internet source</div>
            <div style={{ font: 'var(--heading-md)', color: 'var(--ink)', marginTop: 4 }}>Find &amp; add an authority</div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'var(--surface-bone)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)' }}><Icon name="x" size={17} /></button>
        </div>
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1 }}><Input size="md" placeholder="Paste a citation or case name…" value={q} onChange={(e) => { setQ(e.target.value); setPhase('idle'); }} iconLeft={<Icon name="search" size={15} />} /></div>
            <Button variant="primary" onClick={() => run()} iconLeft={<Icon name="globe" size={15} />}>Search sources</Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ font: 'var(--body-sm)', color: 'var(--mute)' }}>Try:</span>
            {ADDABLE.map((a) => <button key={a.case} onClick={() => { setQ(a.case); run(a.case); }} style={{ height: 28, padding: '0 11px', borderRadius: 'var(--radius-full)', background: 'var(--surface-bone)', border: '1px solid var(--hairline)', font: 'var(--button-sm)', color: 'var(--charcoal)', cursor: 'pointer' }}>{a.case.split(' v ')[0]}</button>)}
          </div>

          {phase === 'searching' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 18px', background: 'var(--surface-bone)', borderRadius: 'var(--radius-md)', font: 'var(--body-sm)', color: 'var(--charcoal)' }}>
              <span style={{ width: 16, height: 16, border: '2px solid var(--hairline-strong)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'ccSpin 700ms linear infinite', flex: '0 0 auto' }} />
              Searching CourtListener, legislation.gov.uk &amp; open web…
            </div>
          )}
          {phase === 'found' && hit && (
            <div style={{ border: '1px solid var(--verified)', background: 'var(--verified-bg)', borderRadius: 'var(--radius-md)', padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="shield-check" size={15} style={{ color: 'var(--verified)' }} /><span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--verified)' }}>Verified · found in connected sources</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
                <span style={{ font: 'var(--heading-sm)', fontSize: 15, color: 'var(--ink)' }}>{hit.case}</span>
                <span style={{ font: 'var(--code-sm)', color: 'var(--charcoal)' }}>{hit.citation}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><Pill dot={JUR_DOT[hit.jur]}>{JUR_FULL[hit.jur]}</Pill><Pill>{hit.area}</Pill><span style={{ font: 'var(--body-sm)', color: 'var(--mute)' }}>{hit.court}</span></div>
              <div style={{ marginTop: 14 }}><Button variant="dark" size="sm" iconLeft={<Icon name="database-zap" size={15} />} onClick={() => { onAdd(hit); onClose(); }}>Add to source database</Button></div>
            </div>
          )}
          {phase === 'notfound' && (
            <div style={{ border: '1px solid var(--hairline)', background: 'var(--fabricated-bg)', borderRadius: 'var(--radius-md)', padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="search-x" size={15} style={{ color: 'var(--fabricated)' }} /><span style={{ font: 'var(--caption-strong)', fontSize: 14, color: 'var(--ink)' }}>Not found in any connected source</span></div>
              <div style={{ font: 'var(--body-sm)', color: 'var(--body)', marginTop: 6 }}>Consistency Check will not add an authority it cannot verify. Refine the citation, or check it against the public record before relying on it.</div>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, font: 'var(--body-sm)', color: 'var(--mute)' }}>
            <Icon name="shield" size={14} style={{ marginTop: 1, flex: '0 0 auto' }} />
            <span>Only authorities confirmed against a connected source can be promoted — the corpus never holds an unverified case.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SourceLibrary({ app }) {
  const base = window.CCData.sourceLibrary;
  const discovered = window.CCData.discovered;
  const connected = window.CCData.dataSources.filter((s) => s.status === 'Connected').length;
  const [discState, setDiscState] = useS({}); // id -> 'added' | 'dismissed'
  const [custom, setCustom] = useS([]);       // promoted authorities (from discovered or modal)
  const [addOpen, setAddOpen] = useS(false);
  const [query, setQuery] = useS('');
  const [area, setArea] = useS('All');
  const [jurF, setJurF] = useS('All');

  const promote = (item, label) => {
    setCustom((c) => (c.find((x) => x.citation === item.citation) ? c : [{ ...item, id: item.id || ('add-' + Date.now()), addedByUser: true }, ...c]));
    app.toast(item.case + ' added to the source database', { icon: 'database-zap', hue: 'var(--verified)' });
  };
  const addDiscovered = (d) => { setDiscState((s) => ({ ...s, [d.id]: 'added' })); promote(d); };
  const dismiss = (d) => setDiscState((s) => ({ ...s, [d.id]: 'dismissed' }));

  const corpus = useMemo(() => [...custom, ...base], [custom, base]);
  const areas = useMemo(() => ['All', ...Array.from(new Set(base.map((x) => x.area)))], [base]);
  const jurs = useMemo(() => JUR_ORDER.filter((j) => corpus.some((x) => x.jur === j)), [corpus]);
  const pendingCount = discovered.filter((d) => !discState[d.id]).length;

  const rows = corpus.filter((x) =>
    (area === 'All' || x.area === area) &&
    (jurF === 'All' || x.jur === jurF) &&
    (x.case.toLowerCase().includes(query.toLowerCase()) || x.citation.toLowerCase().includes(query.toLowerCase()) || x.area.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <Overline>Workspace · source documents</Overline>
          <h2 style={{ margin: '6px 0 0', font: 'var(--display-md)', letterSpacing: '-0.5px', color: 'var(--ink)' }}>Source library</h2>
          <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 4 }}>Every authority the verifier checks against — and new cases found on the open web, ready to promote into the trusted corpus.</div>
        </div>
        <Button variant="primary" iconLeft={<Icon name="plus" size={16} />} onClick={() => setAddOpen(true)}>Add from internet source</Button>
      </div>

      {/* stats */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <Stat icon="library" label="Indexed authorities" value={corpus.length} sub="in the trusted corpus" hue="var(--ink)" />
        <Stat icon="radar" label="Discovered · pending" value={pendingCount} sub="found on the open web" hue={pendingCount ? 'var(--mischar)' : 'var(--verified)'} />
        <Stat icon="scale" label="Jurisdictions" value={jurs.length} sub={jurs.map((j) => (JM[j] || {}).code || j).join(' · ') + ' (separate)'} hue="var(--charcoal)" />
        <Stat icon="plug" label="Connected sources" value={connected} sub="live verification sources" hue="var(--verified)" />
      </div>

      {/* discovered */}
      <Card pad={0}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--hairline)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="radar" size={17} style={{ color: 'var(--primary-deep)' }} />
            <span style={{ font: 'var(--heading-sm)', fontSize: 15, color: 'var(--ink)' }}>Discovered from internet sources</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 9px', borderRadius: 'var(--radius-full)', background: pendingCount ? 'var(--mischar-bg)' : 'var(--verified-bg)', font: 'var(--caption-strong)', fontSize: 12, color: pendingCount ? 'var(--mischar)' : 'var(--verified)' }}>{pendingCount} pending</span>
          </div>
          <span style={{ font: 'var(--body-sm)', color: 'var(--mute)' }}>Real cases surfaced during verification — outside the corpus</span>
        </div>
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {discovered.map((d) => <DiscoveredCard key={d.id} d={d} state={discState[d.id]} onAdd={() => addDiscovered(d)} onDismiss={() => dismiss(d)} />)}
        </div>
      </Card>

      {/* corpus */}
      <Card pad={0}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '14px 20px', borderBottom: '1px solid var(--hairline)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {areas.map((a) => <FilterChip key={a} active={area === a} onClick={() => setArea(a)}>{a}</FilterChip>)}
            </div>
            <div style={{ width: 230 }}><Input size="sm" placeholder="Search the corpus…" value={query} onChange={(e) => setQuery(e.target.value)} iconLeft={<Icon name="search" size={15} />} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)', marginRight: 2 }}><Icon name="scale" size={13} /> Jurisdiction</span>
            <FilterChip active={jurF === 'All'} onClick={() => setJurF('All')}>All</FilterChip>
            {jurs.map((j) => (
              <FilterChip key={j} active={jurF === j} onClick={() => setJurF(j)}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: JUR_DOT[j] }} />{JUR_FULL[j]}</span>
              </FilterChip>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px 150px 44px', gap: 0, padding: '10px 20px', borderBottom: '1px solid var(--hairline)', background: 'var(--surface-bone)' }}>
          {['Authority', 'Court', 'Jurisdiction · area', ''].map((h, i) => <span key={i} style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>{h}</span>)}
        </div>
        <div>
          {rows.map((x, i) => (
            <a key={x.id} href={verifyHref(x)} target="_blank" rel="noopener noreferrer" title="Open the public record in a new tab"
              style={{ display: 'grid', gridTemplateColumns: '1fr 150px 150px 44px', alignItems: 'center', gap: 0, padding: '13px 20px', textDecoration: 'none', borderTop: i === 0 ? 'none' : '1px solid var(--hairline)', background: x.addedByUser ? 'var(--verified-bg)' : 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = x.addedByUser ? 'var(--verified-bg)' : 'var(--canvas)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = x.addedByUser ? 'var(--verified-bg)' : 'transparent'; }}>
              <span style={{ minWidth: 0, paddingRight: 16 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
                  <span style={{ font: 'var(--caption-strong)', fontSize: 14, color: 'var(--ink)' }}>{x.case}</span>
                  {x.addedByUser && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: 'var(--caption)', color: 'var(--verified)' }}><Icon name="check" size={12} /> added by you</span>}
                </span>
                <span style={{ display: 'block', minWidth: 0, marginTop: 2 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ font: 'var(--code-sm)', color: 'var(--mute)' }}>{x.citation}</span>
                    <ParallelRefs refs={(window.CCData.parallelLib || {})[x.id]} compact />
                  </span>
                  {x.origin && <span style={{ display: 'block', font: 'var(--caption)', color: 'var(--ash)', marginTop: 2 }}>{x.origin}</span>}
                </span>
              </span>
              <span style={{ font: 'var(--body-sm)', color: 'var(--body)' }}>{x.court}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Pill dot={JUR_DOT[x.jur]} >{(JM[x.jur] || {}).code || x.jur}</Pill><span style={{ font: 'var(--body-sm)', color: 'var(--mute)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{x.area}</span></span>
              <span style={{ display: 'flex', justifyContent: 'flex-end' }}><Icon name="external-link" size={15} style={{ color: 'var(--stone)' }} /></span>
            </a>
          ))}
          {rows.length === 0 && <div style={{ padding: '40px 20px', textAlign: 'center', font: 'var(--body-sm)', color: 'var(--mute)' }}>No authorities match.</div>}
        </div>
        <div style={{ padding: '11px 20px', borderTop: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', gap: 8, font: 'var(--code-sm)', color: 'var(--ash)', flexWrap: 'wrap' }}>
          <Icon name="layers" size={13} />
          <span>Each authority resolves across all its report series — paste any one citation and the verifier matches the same case. Showing {rows.length} of {corpus.length} indexed authorities.</span>
        </div>
      </Card>

      <AddSourceModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={(hit) => promote(hit)} />
    </div>
  );
}
window.CCSourceLibrary = SourceLibrary;
