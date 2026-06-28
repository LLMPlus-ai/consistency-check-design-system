/*
 * api.js — front-end ↔ back-end bridge.
 *
 * Exposes window.CCApi (the REST client) and window.CCBoot() (called before the
 * React app renders). If the back-end is reachable it becomes the source of
 * truth: /api/bootstrap hydrates window.CCData and every supervision action is
 * persisted server-side. If it is NOT reachable (e.g. the file is opened from
 * disk with no server), the app degrades gracefully to the static seed already
 * loaded by data.js, flagged as "offline" in the UI.
 */
(function () {
  // Same-origin when served by server/index.js; falls back to :4000 if the
  // static files are hosted elsewhere.
  var ORIGIN = (location.protocol === 'http:' || location.protocol === 'https:')
    ? location.origin
    : 'http://localhost:4000';
  var BASE = ORIGIN + '/api';

  function http(method, path, body) {
    return fetch(BASE + path, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    }).then(function (r) {
      if (!r.ok) return r.json().then(function (j) { throw Object.assign(new Error(j.error || r.statusText), { status: r.status }); });
      return r.json();
    });
  }

  // Collections owned by the server that we copy back into window.CCData so the
  // already-rendered components (which read window.CCData) reflect live state.
  var SERVER_OWNED = [
    'matter', 'scores', 'findings', 'queue', 'queueMetrics', 'audit', 'dataSources',
    'engines', 'projects', 'docBlocks', 'sourceLibrary', 'discovered', 'corpusStats',
    'corpus', 'analysis', 'revisions', 'ratioAnalysis', 'parallelCites', 'parallelLib',
    'documents', 'runs', 'promotedSources',
  ];

  function merge(snapshot) {
    if (!snapshot || !window.CCData) return;
    SERVER_OWNED.forEach(function (k) {
      if (snapshot[k] !== undefined) window.CCData[k] = snapshot[k];
    });
  }

  var CCApi = {
    base: BASE,
    online: false,
    health: null,

    // reads
    getHealth: function () { return http('GET', '/health'); },
    bootstrap: function () { return http('GET', '/bootstrap'); },
    architecture: function () { return http('GET', '/architecture'); },
    pipelineStages: function () { return http('GET', '/pipeline/stages'); },

    // live AI models (NVIDIA Nemotron via OpenRouter + Perplexity + corpus)
    llmStatus: function () { return http('GET', '/llm/status'); },
    llmVerify: function (payload) { return http('POST', '/llm/verify', payload); },
    llmExtract: function (text) { return http('POST', '/llm/extract', { text: text }); },
    corpus: function () { return http('GET', '/corpus'); },
    finding: function (id) { return http('GET', '/findings/' + id); },
    report: function (projectId) { return http('GET', '/reports/' + projectId); },
    runs: function () { return http('GET', '/runs'); },

    // inputs + pipeline
    createDocument: function (name, projectId) { return http('POST', '/documents', { name: name, projectId: projectId }); },
    analyze: function (docId) { return http('POST', '/documents/' + docId + '/analyze'); },

    // supervision (stage 4)
    review: function (id, decision, note) { return http('POST', '/findings/' + id + '/review', { decision: decision, note: note }); },
    partnerApprove: function (id) { return http('POST', '/findings/' + id + '/partner-approve'); },
    partnerSendBack: function (id) { return http('POST', '/findings/' + id + '/partner-send-back'); },
    docEdit: function (id, payload) { return http('POST', '/document-edits/' + id, payload || {}); },
    promote: function (id) { return http('POST', '/sources/' + id + '/promote'); },
    reset: function () { return http('POST', '/reset'); },

    merge: merge,

    // Re-pull the full snapshot into window.CCData. Used after a mutation so
    // audit / queue / scores stay live without a page reload.
    refresh: function () {
      return CCApi.bootstrap().then(function (snap) { merge(snap); return snap; }).catch(function () { return null; });
    },
  };

  window.CCApi = CCApi;

  // Called by index.html before rendering React. Resolves once we know whether
  // the back-end is online and (if so) window.CCData is hydrated from it.
  window.CCBoot = function () {
    return CCApi.getHealth().then(function (health) {
      CCApi.online = true;
      CCApi.health = health;
      return CCApi.bootstrap().then(function (snap) {
        merge(snap);
        window.CC_BACKEND = { connected: true, health: health, base: BASE };
        return window.CC_BACKEND;
      });
    }).catch(function (err) {
      CCApi.online = false;
      window.CC_BACKEND = { connected: false, error: String(err && err.message || err), base: BASE };
      return window.CC_BACKEND;
    });
  };
})();
