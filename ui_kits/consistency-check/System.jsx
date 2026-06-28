/* System map — a live, linkable rendering of the architecture diagram
   ("Legal AI Citation Verification & Supervision System").

   Everything on this page is a hyperlink into the running product: each node
   navigates to the screen it powers AND exposes the live API endpoint behind
   it. The model is fetched from /api/architecture so the picture and the
   running system can never drift. A live pipeline trace (the most recent
   /api/documents/:id/analyze run) shows the NVIDIA + Perplexity stages firing. */
const { useState: useS, useEffect: useE } = React;
const Ic = window.CCIcon;

function NodeCard({ node, app, accent }) {
  const [hov, setHov] = useS(false);
  const goable = !!node.tab;
  return (
    <div
      onClick={() => goable && app.goTo(node.tab)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      role={goable ? 'button' : undefined}
      tabIndex={goable ? 0 : undefined}
      onKeyDown={(e) => { if (goable && e.key === 'Enter') app.goTo(node.tab); }}
      title={goable ? 'Open ' + node.tab : node.name}
      style={{
        background: 'var(--surface-card)', border: '1px solid ' + (hov && goable ? 'var(--hairline-strong)' : 'var(--hairline)'),
        borderRadius: 'var(--radius-md)', padding: '12px 13px', cursor: goable ? 'pointer' : 'default',
        boxShadow: hov && goable ? 'var(--elev-card)' : 'none', transition: 'box-shadow 120ms ease, border-color 120ms ease',
      }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <span style={{ flex: '0 0 auto', width: 30, height: 30, borderRadius: 'var(--radius-sm)', background: 'var(--surface-bone)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent || 'var(--charcoal)' }}>
          <Ic name={node.icon || 'box'} size={16} />
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ font: 'var(--caption-strong)', fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.25 }}>{node.name}</div>
          <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 3, lineHeight: 1.35 }}>{node.sub}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 9 }}>
            {node.tab && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: 'var(--code-sm)', color: 'var(--charcoal)', background: 'var(--surface-bone)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-full)', padding: '2px 8px' }}>
                <Ic name="arrow-up-right" size={11} /> {node.tab}
              </span>
            )}
            {node.api && (
              <a href={(window.CCApi ? window.CCApi.base.replace('/api', '') : '') + node.api} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: 'var(--code-sm)', color: 'var(--link, var(--primary-deep))', background: 'transparent', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-full)', padding: '2px 8px', textDecoration: 'none' }}>
                <Ic name="code" size={11} /> {node.api}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Column({ col, app }) {
  const accents = { inputs: 'var(--charcoal)', processing: 'var(--verified)', verification: 'var(--primary-deep)', outputs: 'var(--mischar)' };
  return (
    <div style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 14, display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 4 }}>
        <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--surface-dark)', color: 'var(--on-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: 'var(--code-sm)', fontSize: 11 }}>{col.n}</span>
        <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>{col.title}</span>
      </div>
      {col.header && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', borderRadius: 'var(--radius-md)', background: 'var(--surface-dark)', color: 'var(--on-dark)' }}>
          <Ic name={col.header.icon} size={16} /> <span style={{ font: 'var(--caption-strong)', fontSize: 13 }}>{col.header.name}</span>
        </div>
      )}
      {col.nodes.map((n) => <NodeCard key={n.id} node={n} app={app} accent={accents[col.id]} />)}
    </div>
  );
}

function PipelineTrace({ app }) {
  const [run, setRun] = useS(null);
  const [busy, setBusy] = useS(false);
  const online = app.backend && app.backend.connected;
  const load = () => {
    if (!window.CCApi || !online) return;
    window.CCApi.runs().then((r) => { if (r.runs && r.runs.length) setRun(r.runs[r.runs.length - 1]); }).catch(() => {});
  };
  useE(() => { load(); }, [app.syncRev]);
  const rerun = () => {
    if (!window.CCApi || !online) return;
    setBusy(true);
    const docId = (window.CCData.documents && window.CCData.documents[0] && window.CCData.documents[0].id) || 'doc-crestholm';
    window.CCApi.analyze(docId).then((r) => { setRun(r); setBusy(false); app.pushSync(); })
      .catch(() => { setBusy(false); });
  };
  if (!online) return null;
  const layerHue = { processing: 'var(--verified)', verification: 'var(--primary-deep)' };
  return (
    <div style={{ background: 'var(--surface-dark)', borderRadius: 'var(--radius-lg)', padding: '18px 20px', color: 'var(--on-dark)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--on-dark-mute)' }}>Live pipeline trace</div>
          <div style={{ font: 'var(--code-sm)', color: 'var(--on-dark-mute)', marginTop: 4 }}>{run ? run.document + ' · ' + run.totalMs + 'ms · ' + run.verdicts.length + ' citations' : 'No run yet'}</div>
        </div>
        <button onClick={rerun} disabled={busy} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 34, padding: '0 14px', borderRadius: 'var(--radius-full)', background: 'var(--primary)', color: 'var(--on-dark)', border: 'none', cursor: busy ? 'wait' : 'pointer', font: 'var(--button-sm)' }}>
          <Ic name={busy ? 'loader' : 'play'} size={14} /> {busy ? 'Running…' : 'Run verification pipeline'}
        </button>
      </div>
      {run && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 8, marginTop: 14 }}>
          {run.stages.map((s, i) => (
            <div key={s.id} className="cc-reveal" style={{ animationDelay: (i * 60) + 'ms', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--radius-md)', padding: '10px 11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: layerHue[s.layer] || 'var(--on-dark-mute)' }} />
                <span style={{ font: 'var(--code-sm)', color: 'var(--on-dark)' }}>{s.name}</span>
              </div>
              <div style={{ font: 'var(--code-sm)', color: 'var(--on-dark-mute)', marginTop: 5 }}>{s.engine}</div>
              <div style={{ font: 'var(--code-sm)', color: 'var(--on-dark-mute)', marginTop: 6, opacity: 0.85 }}>{s.summary}</div>
            </div>
          ))}
        </div>
      )}
      {run && (
        <div style={{ display: 'flex', gap: 16, marginTop: 14, flexWrap: 'wrap', font: 'var(--code-sm)', color: 'var(--on-dark-mute)' }}>
          <span><b style={{ color: 'var(--verified)' }}>{run.tally.verified}</b> verified</span>
          <span><b style={{ color: 'var(--mischar)' }}>{run.tally.mischaracterised}</b> mischaracterised</span>
          <span><b style={{ color: 'var(--fabricated)' }}>{run.tally.fabricated}</b> not found</span>
          <span><b style={{ color: 'var(--on-dark)' }}>{run.tally.review}</b> routed to review</span>
        </div>
      )}
    </div>
  );
}

// Live status of the actual NVIDIA Nemotron + Perplexity providers + corpus.
function AIModels({ app }) {
  const [status, setStatus] = useS(null);
  const online = app.backend && app.backend.connected;
  useE(() => { if (window.CCApi && online) window.CCApi.llmStatus().then(setStatus).catch(() => {}); }, [app.syncRev]);
  if (!online || !status) return null;
  const p = status.providers;
  const Pill = ({ live, name, sub }) => (
    <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface-card)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
      <span style={{ width: 9, height: 9, borderRadius: '50%', background: live ? 'var(--verified)' : 'var(--ash)', boxShadow: live ? '0 0 0 3px rgba(43,154,102,0.16)' : 'none' }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ font: 'var(--caption-strong)', fontSize: 13, color: 'var(--ink)' }}>{name}</div>
        <div style={{ font: 'var(--code-sm)', color: 'var(--mute)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</div>
      </div>
    </div>
  );
  return (
    <div style={{ margin: '16px 0' }}>
      <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)', marginBottom: 10 }}>AI models — live status ({status.mode})</div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Pill live={p.nvidia.configured} name="NVIDIA Nemotron" sub={p.nvidia.configured ? p.nvidia.models.super + ' · via OpenRouter' : 'no API key — deterministic only'} />
        <Pill live={p.perplexity.configured} name="Perplexity" sub={p.perplexity.configured ? p.perplexity.model + ' · live web retrieval' : 'no API key'} />
        <Pill live={status.corpus.count > 0} name="Case-law corpus" sub={status.corpus.count + ' authorities · ' + status.corpus.indexKeys + ' index keys'} />
      </div>
    </div>
  );
}

// Run a real document citation through corpus → Perplexity → Nemotron, live.
function LiveVerify({ app }) {
  const findings = (window.CCData.findings || []);
  const [sel, setSel] = useS(findings.length ? findings[0].id : '');
  const [busy, setBusy] = useS(false);
  const [result, setResult] = useS(null);
  const online = app.backend && app.backend.connected;
  if (!online) return null;
  const run = () => {
    const f = findings.find((x) => x.id === sel); if (!f || !window.CCApi) return;
    const corp = (window.CCData.corpus || {})[f.id] || {};
    setBusy(true); setResult(null);
    window.CCApi.llmVerify({ citation: f.citation, proposition: f.extractedProposition || f.legalIssue, holding: corp.holding })
      .then((r) => { setResult(r); setBusy(false); app.pushSync(); })
      .catch((e) => { setResult({ error: e.message }); setBusy(false); });
  };
  const hue = result && ({ Verified: 'var(--verified)', Mischaracterised: 'var(--mischar)', Fabricated: 'var(--fabricated)' }[result.status] || 'var(--charcoal)');
  return (
    <div style={{ background: 'var(--surface-card)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: '18px 20px', margin: '16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <div style={{ font: 'var(--caption-strong)', fontSize: 15, color: 'var(--ink)' }}>Live citation verification</div>
          <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 3 }}>Runs the selected citation through the real corpus, Perplexity and NVIDIA Nemotron.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <select value={sel} onChange={(e) => setSel(e.target.value)} style={{ height: 36, maxWidth: 280, padding: '0 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--hairline-strong)', background: 'var(--surface-card)', font: 'var(--code-sm)', color: 'var(--ink)' }}>
            {findings.map((f) => <option key={f.id} value={f.id}>{f.citation.slice(0, 46)}</option>)}
          </select>
          <button onClick={run} disabled={busy} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 36, padding: '0 15px', borderRadius: 'var(--radius-full)', background: 'var(--surface-dark)', color: 'var(--on-dark)', border: 'none', cursor: busy ? 'wait' : 'pointer', font: 'var(--button-sm)' }}>
            <Ic name={busy ? 'loader' : 'shield-check'} size={14} /> {busy ? 'Verifying…' : 'Verify live'}
          </button>
        </div>
      </div>
      {result && !result.error && (
        <div className="cc-reveal" style={{ marginTop: 14, borderTop: '1px solid var(--hairline)', paddingTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 11px', borderRadius: 'var(--radius-full)', background: 'var(--surface-bone)', border: '1px solid ' + hue, color: hue, font: 'var(--caption-strong)', fontSize: 13 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: hue }} /> {result.status}
            </span>
            <span style={{ font: 'var(--code-sm)', color: 'var(--charcoal)' }}>{result.confidence}% confidence{result.fidelity != null ? ' · fidelity ' + result.fidelity + '%' : ''} · {result.durationMs}ms</span>
            <span style={{ font: 'var(--code-sm)', color: 'var(--ash)' }}>{(result.models || []).join(' · ')}</span>
          </div>
          <div style={{ font: 'var(--body-sm)', color: 'var(--body)', marginTop: 10, lineHeight: 1.5 }}>{result.explanation}</div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {(result.trace || []).map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline', font: 'var(--code-sm)' }}>
                <span style={{ flex: '0 0 26px', color: 'var(--ash)' }}>{i + 1}.</span>
                <span style={{ flex: '0 0 210px', color: 'var(--charcoal)' }}>{t.stage}</span>
                <span style={{ color: 'var(--mute)' }}>{t.engine} — {t.result}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {result && result.error && <div style={{ marginTop: 12, font: 'var(--code-sm)', color: 'var(--fabricated)' }}>Error: {result.error}</div>}
    </div>
  );
}

function InfraRow({ infra, app, health }) {
  return (
    <div style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 16 }}>
      <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)', textAlign: 'center', marginBottom: 12 }}>Application Infrastructure</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
        {infra.map((n) => <NodeCard key={n.id} node={n} app={app} accent="var(--charcoal)" />)}
      </div>
      {health && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 12, font: 'var(--code-sm)', color: 'var(--ash)', flexWrap: 'wrap' }}>
          <span>db revision r{health.revision}</span>
          <span>{health.findings} citations</span>
          <span>{health.queueOpen} open in queue</span>
          <span>uptime {health.uptime}s</span>
        </div>
      )}
    </div>
  );
}

function System({ app }) {
  const [model, setModel] = useS(window.CCArch || null);
  const [health, setHealth] = useS((app.backend && app.backend.health) || null);
  const online = app.backend && app.backend.connected;

  useE(() => {
    if (!window.CCApi) return;
    window.CCApi.architecture().then((m) => { window.CCArch = m; setModel(m); }).catch(() => {});
    window.CCApi.getHealth().then(setHealth).catch(() => {});
  }, [app.syncRev]);

  const reset = () => {
    if (!window.CCApi) return;
    window.CCApi.reset().then(() => window.CCApi.refresh()).then(() => { app.pushSync(); app.toast('Database reset to seed', { icon: 'rotate-ccw', hue: 'var(--primary-deep)' }); }).catch(() => {});
  };

  const cols = (model && model.columns) || [];
  const infra = (model && model.infrastructure) || [];

  return (
    <div className="cc-reveal">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 6 }}>
        <div>
          <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)' }}>System architecture</div>
          <h1 style={{ font: 'var(--display-sm)', color: 'var(--ink)', margin: '6px 0 0', lineHeight: 1.05 }}>{(model && model.title) || 'Legal AI Citation Verification & Supervision System'}</h1>
          <div style={{ font: 'var(--body-md)', color: 'var(--body)', marginTop: 6 }}>{(model && model.subtitle) || 'Powered by NVIDIA Open Models and Perplexity'}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 34, padding: '0 13px', borderRadius: 'var(--radius-full)', background: online ? 'var(--verified-bg)' : 'var(--surface-bone)', border: '1px solid var(--hairline)', font: 'var(--code-sm)', color: online ? 'var(--verified)' : 'var(--ash)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: online ? 'var(--verified)' : 'var(--ash)' }} />
            {online ? 'Back-end live · ' + (window.CCApi && window.CCApi.base) : 'Offline — static seed'}
          </span>
          {online && (
            <button onClick={reset} title="Reset the database to seed data" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 13px', borderRadius: 'var(--radius-full)', background: 'var(--surface-card)', border: '1px solid var(--hairline-strong)', cursor: 'pointer', font: 'var(--button-sm)', color: 'var(--ink)' }}>
              <Ic name="rotate-ccw" size={14} /> Reset data
            </button>
          )}
        </div>
      </div>

      {!online && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--risk-high-bg, var(--surface-bone))', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: '12px 14px', margin: '14px 0', font: 'var(--body-sm)', color: 'var(--charcoal)' }}>
          <Ic name="plug-zap" size={16} />
          <span>The back-end is not reachable, so the dashboard is showing the static demo seed. Start it with <code style={{ font: 'var(--code-sm)' }}>node server/index.js</code> and reload to connect the live API, database, pipeline and reports.</span>
        </div>
      )}

      {/* The pipeline — 4 columns with left-to-right flow */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, alignItems: 'start', margin: '16px 0' }}>
        {cols.map((c) => <Column key={c.id} col={c} app={app} />)}
      </div>

      <AIModels app={app} />

      <LiveVerify app={app} />

      <PipelineTrace app={app} />

      <div style={{ marginTop: 16 }}>
        <InfraRow infra={infra} app={app} health={health} />
      </div>

      <div style={{ font: 'var(--code-sm)', color: 'var(--ash)', textAlign: 'center', marginTop: 16 }}>
        Every box links to the screen it powers and the live endpoint behind it. Inputs → Processing → Verification → Outputs flows left to right.
      </div>
    </div>
  );
}

window.CCSystem = System;
