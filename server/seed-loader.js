'use strict';
/*
 * seed-loader.js — single source of truth.
 *
 * The browser front-end and the back-end MUST agree on the demo dataset and on
 * the verification verdict logic, so rather than duplicate them we evaluate the
 * very same `data.js` and `flow.js` the UI ships, inside a tiny fake `window`.
 *
 *   - data.js  → window.CCData, window.CCDetectCitations
 *   - flow.js  → window.CCFlow (verdictOf / disposition / summary / triage …),
 *                window.CCDefaultGuardrails, window.CCPostures, …
 *
 * This guarantees the API returns exactly the structures the React components
 * already know how to render, and that server-side verdicts match the client.
 */
const fs = require('fs');
const path = require('path');

const UI_DIR = path.join(__dirname, '..', 'ui_kits', 'consistency-check');

function evalInWindow(files) {
  // A minimal browser-ish global the two scripts touch. They only ever read
  // `window`, use `Object.assign`, regexes and plain JS — no DOM, no timers.
  const sandbox = { window: {}, console };
  for (const file of files) {
    const code = fs.readFileSync(path.join(UI_DIR, file), 'utf8');
    // eslint-disable-next-line no-new-func
    const run = new Function('window', 'console', code);
    run(sandbox.window, console);
  }
  return sandbox.window;
}

function loadSeed() {
  const w = evalInWindow(['data.js', 'flow.js']);
  return {
    CCData: w.CCData,
    CCFlow: w.CCFlow,
    CCDefaultGuardrails: w.CCDefaultGuardrails,
    CCPostures: w.CCPostures,
    CCGuardrailsForPosture: w.CCGuardrailsForPosture,
    detectCitations: w.CCDetectCitations,
  };
}

module.exports = { loadSeed, UI_DIR };
