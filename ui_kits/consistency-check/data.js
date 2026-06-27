/* Consistency Check — review of the Crestholm v Veltros skeleton argument.
   Citation evidence is grounded in the provided UK/Commonwealth case corpus
   (hard_coding/main_data) — court, neutral citation, bench and holding are
   drawn from the actual source files. */
window.CCData = {
  matter: {
    name: 'Crestholm Dynamics plc v Veltros Industries Inc',
    firm: 'Alderton & Marsh LLP',
    docType: 'Skeleton Argument',
    claimValue: '£47m',
    reviewStatus: 'Partner Review Required',
    overallRisk: 'High',
    summary:
      'The document contains 12 legal authorities. 3 appear fabricated, 2 appear mischaracterised, and 7 are verified. High-risk citations should be reviewed before filing or circulation.',
  },
  scores: { total: 12, verified: 7, mischaracterised: 2, fabricated: 3, health: 58, confidence: 87, risk: 'High', action: 'Partner review before filing' },
  findings: [
    { id: 'cit-001', status: 'Verified', citation: 'Lumley v Gye (1853) 2 E & B 216', legalIssue: 'Tortious interference with contractual relations', confidence: 96, risk: 'Low', recommendedAction: 'No action required', explanation: 'The authority exists and is appropriately used for the proposition that intentional interference with contractual relations can give rise to liability.' },
    { id: 'cit-002', status: 'Verified', citation: 'OBG Ltd v Allan [2007] UKHL 21', legalIssue: 'Economic torts and unlawful means', confidence: 94, risk: 'Low', recommendedAction: 'No action required', explanation: 'The citation exists and is relevant to the modern structure of economic tort liability.' },
    { id: 'cit-003', status: 'Verified', citation: 'DC Thomson & Co Ltd v Deakin [1952] Ch 646', legalIssue: 'Inducing breach of contract', confidence: 91, risk: 'Low', recommendedAction: 'No action required', explanation: 'The authority exists and supports the discussion of inducement and knowledge in contractual interference.' },
    { id: 'cit-004', status: 'Verified', citation: 'Hadley v Baxendale (1854) 9 Ex 341', legalIssue: 'Remoteness of contractual damages', confidence: 97, risk: 'Low', recommendedAction: 'No action required', explanation: 'The authority exists and is correctly used in relation to foreseeability and remoteness of loss.' },
    { id: 'cit-005', status: 'Verified', citation: 'The Achilleas [2008] UKHL 48', legalIssue: 'Assumption of responsibility and remoteness', confidence: 92, risk: 'Low', recommendedAction: 'Review wording only', explanation: 'The authority exists. The application is broadly correct, although the drafting should avoid overstating the assumption-of-responsibility principle.' },
    { id: 'cit-006', status: 'Verified', citation: 'American Cyanamid Co v Ethicon Ltd [1975] AC 396', legalIssue: 'Interim injunction test', confidence: 95, risk: 'Low', recommendedAction: 'No action required', explanation: 'The authority exists and is correctly used for the standard approach to interim injunctive relief.' },
    { id: 'cit-007', status: 'Verified', citation: 'Series 5 Software Ltd v Clarke [1996] 1 All ER 853', legalIssue: 'Without-notice injunctions and urgency', confidence: 84, risk: 'Medium', recommendedAction: 'Check quotation and procedural context', explanation: 'The authority appears real and relevant, but it is outside the local case corpus and should be manually checked before filing.' },
    { id: 'cit-008', status: 'Mischaracterised', citation: 'Anglia Television Ltd v Reed [1972] 1 QB 60', legalIssue: 'Reliance damages versus expectation damages', confidence: 88, risk: 'High', recommendedAction: 'Revise legal proposition', explanation: 'The case supports reliance loss, not a broad claim for expectation damages or lost profits. The skeleton appears to use the authority for a stronger proposition than it supports.', extractedProposition: 'The skeleton cites Anglia Television as authority for recovering expectation damages for lost profits.', actualAuthority: 'The case is primarily authority for reliance loss where expectation loss is difficult to prove.' },
    { id: 'cit-009', status: 'Mischaracterised', citation: 'Wrotham Park Estate Co Ltd v Parkside Homes Ltd [1974] 1 WLR 798', legalIssue: 'Negotiating damages', confidence: 86, risk: 'High', recommendedAction: 'Clarify damages theory', explanation: 'The authority concerns negotiating damages, not ordinary lost-profit expectation damages. The current drafting risks misleading the court.', extractedProposition: 'Cited as supporting ordinary lost-profit expectation damages.', actualAuthority: 'Concerns negotiating (Wrotham Park) damages — a distinct measure.' },
    { id: 'cit-010', status: 'Fabricated', citation: 'Fairfax International Logistics v Brennan Holdings [2019] EWHC 1847 (Comm)', legalIssue: 'Commercial logistics interference', confidence: 93, risk: 'Critical', recommendedAction: 'Remove or replace citation', explanation: 'No reliable match was found in the available corpus or open legal sources. The case name appears tailored to the factual scenario and should not be relied upon.', extractedProposition: 'Cited as direct authority for interference in commercial logistics arrangements.', actualAuthority: 'Not found in any source checked. Cannot assert it exists nowhere — only that it is absent from every source available here.' },
    { id: 'cit-011', status: 'Fabricated', citation: 'Stonegate Capital Partners v Redwood Procurement [2021] EWHC 3312 (Ch)', legalIssue: 'Procurement and investment loss', confidence: 91, risk: 'Critical', recommendedAction: 'Remove or replace citation', explanation: 'The citation could not be verified. The party names and subject matter appear synthetic and closely mirror the dispute.', extractedProposition: 'Cited for recovery of procurement and investment losses.', actualAuthority: 'Not found in any source checked; the party names appear synthetic.' },
    { id: 'cit-012', status: 'Fabricated', citation: 'Pemberton Aerospace Systems v Delta Global Ventures [2023] EWHC 892 (TCC)', legalIssue: 'Aerospace supply chain dispute', confidence: 94, risk: 'Critical', recommendedAction: 'Remove or replace citation', explanation: 'No reliable authority was found. Absence is bounded to the four sources this system can reach (corpus, CourtListener, legislation.gov.uk, EUR-Lex, Perplexity); non-existence cannot be asserted beyond them. Treat as suspected fabrication — partner verification required.', extractedProposition: 'Cited as authority on aerospace supply-chain interference.', actualAuthority: 'Not found in any source checked — suspected fabrication.' },
  ],
  queue: [
    { id: 'rev-001', priority: 'Critical', item: 'Fabricated authority detected', citation: 'Fairfax International Logistics v Brennan Holdings [2019] EWHC 1847 (Comm)', assignedTo: 'Partner', status: 'Pending Review', reason: 'No reliable legal source confirms existence of the case.' },
    { id: 'rev-002', priority: 'Critical', item: 'Fabricated authority detected', citation: 'Pemberton Aerospace Systems v Delta Global Ventures [2023] EWHC 892 (TCC)', assignedTo: 'Partner', status: 'Pending Review', reason: 'Not found in any available source — suspected fabrication, partner review required.' },
    { id: 'rev-003', priority: 'High', item: 'Mischaracterised damages authority', citation: 'Anglia Television Ltd v Reed [1972] 1 QB 60', assignedTo: 'Senior Associate', status: 'Needs Amendment', reason: 'Used for expectation damages despite supporting reliance loss.' },
    { id: 'rev-004', priority: 'High', item: 'Mischaracterised negotiating damages authority', citation: 'Wrotham Park Estate Co Ltd v Parkside Homes Ltd [1974] 1 WLR 798', assignedTo: 'Senior Associate', status: 'Needs Amendment', reason: 'Used as if it supports ordinary lost-profit damages.' },
  ],
  queueMetrics: { open: 4, critical: 2, high: 2, approved: 0, readyForFiling: 'No' },
  audit: [
    { time: '09:42', actor: 'Consistency Check Engine', event: 'Document analysed', detail: '12 citations extracted from skeleton argument.' },
    { time: '09:43', actor: 'Citation Verifier', event: 'Fabricated citation flagged', detail: 'Fairfax International Logistics v Brennan Holdings could not be verified.' },
    { time: '09:44', actor: 'Citation Verifier', event: 'Mischaracterisation flagged', detail: 'Anglia Television v Reed appears to be used for the wrong damages proposition.' },
    { time: '09:46', actor: 'Partner Reviewer', event: 'Finding escalated', detail: 'Fabricated citation sent for partner review before filing.' },
  ],
  dataSources: [
    { name: 'Provided UK / Commonwealth Case Corpus', type: 'Local Corpus', status: 'Connected', coverage: '57 authorities', role: 'Primary verification source', endpoint: 'local · main_data/*.md', auth: 'none' },
    { name: 'CourtListener', type: 'Open Legal API', status: 'Connected', coverage: 'US citation network', role: 'Out-of-corpus citation support', endpoint: 'https://www.courtlistener.com/api/rest/v4', auth: 'Token (optional)' },
    { name: 'legislation.gov.uk', type: 'Open Statutory Source', status: 'Connected', coverage: 'UK legislation', role: 'Statutory verification', endpoint: 'https://www.legislation.gov.uk · /data.xml', auth: 'OGL · none' },
    { name: 'EUR-Lex / CELLAR SPARQL', type: 'EU Knowledge Graph', status: 'Connected', coverage: 'EU amends / repeals graph', role: 'EU law grounding', endpoint: 'http://publications.europa.eu/webapi/rdf/sparql', auth: 'none' },
    { name: 'Caselaw Access Project', type: 'US Bulk Corpus', status: 'Connected', coverage: '6.9m US decisions', role: 'US reporter verification', endpoint: 'https://static.case.law', auth: 'none' },
    { name: 'UK Supreme Court', type: 'Primary Court Source', status: 'Connected', coverage: 'UKSC judgments + summaries', role: 'Apex-court verification', endpoint: 'https://www.supremecourt.uk/cases', auth: 'none' },
    { name: 'Perplexity Live Search', type: 'Fallback Web Search', status: 'Connected', coverage: 'Open web verification', role: 'Secondary verification', endpoint: 'https://api.perplexity.ai', auth: 'API key · pplx-•••• (configured)' },
    { name: 'BAILII / Find Case Law', type: 'Restricted Source', status: 'Off-limits', coverage: 'Not used', role: 'Licence restrictions prohibit scraping or computational analysis', endpoint: '—', auth: 'blocked' },
  ],
  engines: [
    { name: 'Nemotron Parse', vendor: 'NVIDIA', role: 'Document parsing — PDF / DOCX → text, tables, citations', endpoint: 'integrate.api.nvidia.com · nvidia/nemotron-parse', status: 'Configured' },
    { name: 'Nemotron Retrieval', vendor: 'NVIDIA', role: 'Embeddings — deterministic corpus matching & semantic search', endpoint: 'integrate.api.nvidia.com · llama-3.2-nv-embedqa', status: 'Configured' },
    { name: 'Nemotron Super / Ultra', vendor: 'NVIDIA', role: 'Reasoning — mischaracterisation & proposition analysis', endpoint: 'integrate.api.nvidia.com · nemotron-3', status: 'Configured' },
    { name: 'Perplexity Sonar', vendor: 'Perplexity', role: 'Live web verification for out-of-corpus citations', endpoint: 'api.perplexity.ai · sonar', status: 'Configured' },
  ],
  architecture: [
    { n: 1, name: 'Input Layer', items: ['Upload skeleton argument', 'Paste legal text', 'Parse PDF / DOCX'] },
    { n: 2, name: 'Extraction Layer', items: ['Citation extraction', 'Legal proposition extraction', 'Risk phrase detection'] },
    { n: 3, name: 'Verification Layer', items: ['Deterministic corpus matching', 'Open legal source lookup', 'Mischaracterisation analysis'] },
    { n: 4, name: 'Review Layer', items: ['Human approve / amend / reject', 'Tracked-change working copy', 'Audit trail'] },
    { n: 5, name: 'Output Layer', items: ['Citation health report', 'Partner-ready summary', 'Exportable review record'] },
  ],
  // Real corpus grounding per citation — court / neutral citation / bench / holding
  // taken from the provided case files. `match` = how the authority was located.
  corpus: {
    'cit-001': { match: 'corpus', source: 'Lumley v Gye (1853) 2 E&B 216.md', court: "Queen's Bench", neutral: '(1853) 2 E & B 216', bench: 'Wightman, Erle & Crompton JJ', holding: 'An action lies for maliciously procuring a breach of a contract for exclusive personal services, provided the procurement is during the subsistence of the contract and produces damage. The parties need not stand in the strict relation of master and servant.' },
    'cit-002': { match: 'corpus', source: 'obg-ltd-and-another-v-allan-and-others-uk-nondevolved-case-l.md', court: 'House of Lords', neutral: '[2007] UKHL 21', bench: 'Lord Hoffmann, Lord Nicholls, Lord Walker, Baroness Hale, Lord Brown', holding: 'Restated the economic torts: accessory liability for inducing breach of contract (the Lumley v Gye tort) is distinct from the tort of causing loss by unlawful means; the two must not be conflated.' },
    'cit-003': { match: 'corpus', source: 'd-c-thomson--company-ltd-v-arthur-deakin-and-others-england-.md', court: 'Court of Appeal', neutral: '[1952] Ch 646', bench: 'Lord Evershed MR, Jenkins & Morris LJJ', holding: 'Indirect procurement of a breach of contract is actionable only where the defendant had knowledge of the contract and employed unlawful means to bring the breach about.' },
    'cit-004': { match: 'corpus', source: 'Hadley v Baxendale (1854) 9 Ex 341.md', court: 'Court of Exchequer', neutral: '(1854) 9 Ex 341; 156 ER 145', bench: 'Alderson B', holding: 'Damages for breach of contract are recoverable where they arise naturally from the breach, or were within the reasonable contemplation of both parties at the time of contracting. The two-limb test of remoteness.' },
    'cit-005': { match: 'corpus', source: 'transfield-shipping-inc-v-mercator-shipping-inc-the-achillea.md', court: 'House of Lords', neutral: '[2008] UKHL 48', bench: 'Lord Hoffmann, Lord Hope, Lord Rodger, Lord Walker, Baroness Hale', holding: 'Remoteness depends on whether the defendant assumed responsibility for the type of loss; a loss of the kind in question may be too remote even if foreseeable, where market understanding would not place that risk on the defendant.' },
    'cit-006': { match: 'corpus', source: 'American Cyanamid Co (No 1) v Ethicon Ltd [1975] UKHL 1 (05 February 1975).md', court: 'House of Lords', neutral: '[1975] AC 396 · [1975] UKHL 1', bench: 'Lord Diplock', holding: 'On an application for an interim injunction the court asks whether there is a serious question to be tried and where the balance of convenience lies; it does not require a prima facie case to be shown.' },
    'cit-007': { match: 'external', source: 'Perplexity / open-web (E&W)', court: 'Chancery Division', neutral: '[1996] 1 All ER 853', bench: 'Laddie J', holding: 'On without-notice and interim relief, the court may weigh the relative strength of each party\u2019s case where that can be assessed on credible evidence. Outside the provided corpus — confirmed against open sources only.' },
    'cit-008': { match: 'corpus', source: 'anglia-television-ltd-v-reed-england--wales-case-law.md', court: 'Court of Appeal', neutral: '[1972] 1 QB 60', bench: 'Lord Denning MR, Phillimore & Megaw LJJ', holding: 'A claimant may recover wasted expenditure incurred in reliance on the contract, both before and after it was made, where expectation loss (lost profit) is too speculative to prove. The case is authority for RELIANCE loss, not a broad expectation-damages claim.' },
    'cit-009': { match: 'external', source: 'Perplexity / open-web (E&W)', court: 'Chancery Division', neutral: '[1974] 1 WLR 798', bench: 'Brightman J', holding: 'Where a covenant is breached but no financial loss is shown, damages may be assessed as the sum that might reasonably have been demanded to release the covenant \u2014 \u201cnegotiating\u201d or release-fee damages. A distinct measure from ordinary lost-profit expectation damages.' },
    'cit-010': { match: 'none', source: null, searched: ['UK / Commonwealth corpus (57 authorities)', 'CourtListener', 'legislation.gov.uk', 'Open web verification'], holding: 'No reliable match found in the provided corpus or open legal sources. The neutral citation [2019] EWHC 1847 (Comm) does not resolve to this matter. Party names appear tailored to the dispute.', suggestion: { citation: 'OBG Ltd v Allan [2007] UKHL 21', court: 'House of Lords', neutral: '[2007] UKHL 21', source: 'obg-ltd-and-another-v-allan-and-others-uk-nondevolved-case-l.md', match: 68, why: 'Real authority that governs the proposition the passage needs — intentional interference with commercial and contractual relations — under the modern restatement of the economic torts.' } },
    'cit-011': { match: 'none', source: null, searched: ['UK / Commonwealth corpus (57 authorities)', 'CourtListener', 'legislation.gov.uk', 'Open web verification'], holding: 'No reliable match found. The citation [2021] EWHC 3312 (Ch) does not resolve and the party names appear synthetic and closely mirror the present dispute.', suggestion: { citation: 'Hedley Byrne & Co Ltd v Heller & Partners Ltd [1964] AC 465', court: 'House of Lords', neutral: '[1964] AC 465', source: 'hedley-byrne--company-ltd-v-heller--partners-ltd-uk-nondevol.md', match: 61, why: 'The established route to recovering pure financial and investment loss — liability for negligent misstatement made on an assumption of responsibility.' } },
    'cit-012': { match: 'none', source: null, searched: ['UK / Commonwealth corpus (57 authorities)', 'CourtListener', 'legislation.gov.uk', 'Open web verification'], holding: 'Not found in any source available to this system. The citation [2023] EWHC 892 (TCC) does not resolve in the curated corpus or on open-web search, and the party names mirror the dispute. Absence is bounded to the sources checked — non-existence cannot be asserted beyond them; partner verification required.', suggestion: { citation: 'Czarnikow Ltd v Koufos (The Heron II) [1969] 1 AC 350', court: 'House of Lords', neutral: '[1969] 1 AC 350', source: 'czarnikow-ltd-v-koufos-heron-ii-uk-nondevolved-case-law.md', match: 64, why: 'Controls recoverability of consequential loss on a commercial supply contract — remoteness measured by what was “not unlikely” to result from the breach.' } },
  },
  analysis: {"cit-001":{"existence":"confirmed-internal","fidelity":96,"fidelityLabel":"Faithful","jurisdiction":"England & Wales","triageMin":0},"cit-002":{"existence":"confirmed-internal","fidelity":94,"fidelityLabel":"Faithful","jurisdiction":"England & Wales (HL)","triageMin":0},"cit-003":{"existence":"confirmed-internal","fidelity":92,"fidelityLabel":"Faithful","jurisdiction":"England & Wales","triageMin":0},"cit-004":{"existence":"confirmed-internal","fidelity":97,"fidelityLabel":"Faithful","jurisdiction":"England & Wales","triageMin":0},"cit-005":{"existence":"confirmed-internal","fidelity":84,"fidelityLabel":"Minor drift","jurisdiction":"England & Wales (HL)","triageMin":5,"note":"Holding confirmed; drafting slightly overstates the assumption-of-responsibility principle — tighten wording."},"cit-006":{"existence":"confirmed-internal","fidelity":95,"fidelityLabel":"Faithful","jurisdiction":"England & Wales (HL)","triageMin":0},"cit-007":{"existence":"confirmed-external","fidelity":88,"fidelityLabel":"Faithful","jurisdiction":"England & Wales","triageMin":8,"note":"In-jurisdiction but outside the curated corpus — confirmed on open-web search only. Verify the quotation and procedural context manually before filing."},"cit-008":{"existence":"confirmed-internal","fidelity":34,"fidelityLabel":"Scope drift","jurisdiction":"England & Wales","triageMin":12,"signal":[{"type":"Scope drift · short-range","text":"The overreach is short-range and on-topic: Anglia v Reed is genuinely a damages authority, and the brief shifts it only from reliance to expectation loss — neighbouring measures for the same breach. A reviewer who recognises it as \"the damages case\" nods it through without re-checking which measure it actually supports."},{"type":"Uniform fluency","text":"The misuse is invisible on the page: impeccable citation format, a real and famous case, written as confidently as the genuine authorities around it. Nothing in the prose flags it — only checking the holding reveals it."}],"defensibility":"Reviewer call — scope drift, not fabrication. The authority is real and on-topic; whether the stretch is defensible aggressive advocacy or a misstatement is a partner judgment. Flagged because the cited proposition (expectation / lost-profit) exceeds the holding’s ratio (reliance loss)."},"cit-009":{"existence":"confirmed-external","fidelity":31,"fidelityLabel":"Scope drift","jurisdiction":"England & Wales","triageMin":12,"signal":[{"type":"Scope drift · short-range","text":"Negotiating (Wrotham Park) damages and ordinary expectation damages are adjacent remedies for the same wrong. The brief slides from the release-fee measure to lost-profit recovery — one step along the damages spectrum, not an obvious leap."},{"type":"Uniform fluency","text":"A real, well-known property case cited in correct form. Reading at speed, a reviewer sees a damages authority used for damages and moves on; the distinction between measures only surfaces on a holding-level check."}],"defensibility":"Reviewer call — scope drift, not fabrication. The authority exists and is on-topic; the partner must judge whether treating negotiating damages as ordinary lost-profit damages is arguable advocacy or a misstatement that risks misleading the court."},"cit-010":{"existence":"absent","fidelity":null,"fidelityLabel":"—","jurisdiction":"Claimed E&W · unresolved","triageMin":4},"cit-011":{"existence":"absent","fidelity":null,"fidelityLabel":"—","jurisdiction":"Claimed E&W · unresolved","triageMin":4},"cit-012":{"existence":"absent","fidelity":null,"fidelityLabel":"—","jurisdiction":"Claimed E&W · unresolved","triageMin":4}},
  filing: {"deadline":"16:00","label":"Without-notice injunction · same-day filing","submitted":"09:42","baselineRemaining":9540},
};


Object.assign(window.CCData, {
  projects: [
    { id: 'crestholm', matter: 'Crestholm Dynamics plc v Veltros Industries Inc', client: 'Veltros Industries Inc', type: 'Skeleton Argument', updated: 'Today 09:46', health: 58, status: 'Partner review', citations: 12, flags: 5, active: true },
    { id: 'penrose', matter: 'Penrose Capital LLP v Doraville Holdings', client: 'Penrose Capital', type: 'Skeleton Argument', updated: '5 days ago', health: 92, status: 'Filed', citations: 9, flags: 0 },
    { id: 'harwell', matter: 'Harwell Bio NV v Sentris Pharma Ltd', client: 'Harwell Bio NV', type: 'Particulars of Claim', updated: 'Yesterday', health: 81, status: 'Cleared', citations: 14, flags: 1 },
    { id: 'lockton', matter: 'Lockton Maritime v Argo Freight SA', client: 'Lockton Maritime', type: 'Witness Statement', updated: '2 days ago', health: 64, status: 'In review', citations: 7, flags: 3 },
  ],
  // Skeleton-argument prose. Each block may embed a citation (cite=finding id);
  // the citation string is highlighted by verdict in the back-to-back view.
  docBlocks: [
    { kind: 'court', text: 'IN THE HIGH COURT OF JUSTICE · BUSINESS AND PROPERTY COURTS OF ENGLAND AND WALES · COMMERCIAL COURT (KBD)' },
    { kind: 'title', text: 'Skeleton argument on behalf of the Claimant' },
    { kind: 'h', text: 'A. Introduction' },
    { kind: 'p', text: 'This skeleton is filed in support of the Claimant’s application for a without-notice injunction and for damages arising from the Defendant’s interference with the Claimant’s contractual relations. The claim is valued at approximately £47m.' },
    { kind: 'h', text: 'B. Tortious interference' },
    { kind: 'p', cite: 'cit-001', text: 'It is well established that intentionally procuring a breach of contract is actionable: Lumley v Gye (1853) 2 E & B 216. The Defendant knowingly induced the counterparty to abandon its exclusive obligations to the Claimant.' },
    { kind: 'p', cite: 'cit-002', text: 'The modern structure of the economic torts was restated in OBG Ltd v Allan [2007] UKHL 21, which the Claimant relies upon to distinguish inducing breach from causing loss by unlawful means.' },
    { kind: 'p', cite: 'cit-003', text: 'Where the inducement is indirect, knowledge and unlawful means are required: DC Thomson & Co Ltd v Deakin [1952] Ch 646.' },
    { kind: 'h', text: 'C. Damages' },
    { kind: 'p', cite: 'cit-004', text: 'Losses flowing naturally from the breach, or within the parties’ reasonable contemplation, are recoverable: Hadley v Baxendale (1854) 9 Ex 341.' },
    { kind: 'p', cite: 'cit-005', text: 'The Claimant acknowledges the assumption-of-responsibility gloss in The Achilleas [2008] UKHL 48, but submits the losses here were plainly of the kind contemplated.' },
    { kind: 'p', cite: 'cit-008', text: 'The Claimant is entitled to recover its expectation loss, including lost profits, as authority for which it relies on Anglia Television Ltd v Reed [1972] 1 QB 60.' },
    { kind: 'p', cite: 'cit-009', text: 'Further, ordinary lost-profit damages are supported by Wrotham Park Estate Co Ltd v Parkside Homes Ltd [1974] 1 WLR 798.' },
    { kind: 'h', text: 'D. Injunctive relief' },
    { kind: 'p', cite: 'cit-006', text: 'The test for interim relief is the familiar one in American Cyanamid Co v Ethicon Ltd [1975] AC 396: a serious question to be tried and the balance of convenience.' },
    { kind: 'p', cite: 'cit-007', text: 'On the without-notice application and the relative strength of the parties’ cases, the Claimant relies on Series 5 Software Ltd v Clarke [1996] 1 All ER 853.' },
    { kind: 'h', text: 'E. Recent commercial authority' },
    { kind: 'p', cite: 'cit-010', text: 'The principle has been applied to commercial logistics interference in Fairfax International Logistics v Brennan Holdings [2019] EWHC 1847 (Comm).' },
    { kind: 'p', cite: 'cit-011', text: 'It was followed in the procurement context in Stonegate Capital Partners v Redwood Procurement [2021] EWHC 3312 (Ch),' },
    { kind: 'p', cite: 'cit-012', text: 'and most recently in the aerospace supply chain in Pemberton Aerospace Systems v Delta Global Ventures [2023] EWHC 892 (TCC).' },
  ],
});

/* Source Library — the verification corpus. Every authority below is a real
   case drawn from the provided UK/Commonwealth corpus (hard_coding/main_data);
   citations are genuine — none are synthesized. `discovered` holds real cases
   surfaced from internet sources during verification runs that a lawyer can
   promote into the trusted corpus. */
Object.assign(window.CCData, {
  sourceLibrary: [
    // Economic torts & interference
    { id: 'src-lumley', case: 'Lumley v Gye', citation: '(1853) 2 E & B 216', court: "Queen's Bench", jur: 'ew', area: 'Economic torts', year: 1853 },
    { id: 'src-allen', case: 'Allen v Flood', citation: '[1898] AC 1', court: 'House of Lords', jur: 'ew', area: 'Economic torts', year: 1898 },
    { id: 'src-quinn', case: 'Quinn v Leathem', citation: '[1901] AC 495', court: 'House of Lords', jur: 'ni', origin: 'Irish appeal · 1901 (facts in present-day Northern Ireland)', area: 'Economic torts', year: 1901 },
    { id: 'src-thomson', case: 'DC Thomson & Co Ltd v Deakin', citation: '[1952] Ch 646', court: 'Court of Appeal', jur: 'ew', area: 'Economic torts', year: 1952 },
    { id: 'src-rookes', case: 'Rookes v Barnard', citation: '[1964] AC 1129', court: 'House of Lords', jur: 'ew', area: 'Economic torts', year: 1964 },
    { id: 'src-obg', case: 'OBG Ltd v Allan', citation: '[2007] UKHL 21', court: 'House of Lords', jur: 'ew', area: 'Economic torts', year: 2007 },
    { id: 'src-total', case: 'HM Revenue & Customs v Total Network SL', citation: '[2008] UKHL 19', court: 'House of Lords', jur: 'ew', area: 'Economic torts', year: 2008 },
    { id: 'src-meretz', case: 'Meretz Investments NV v ACP Ltd', citation: '[2007] EWCA Civ 1303', court: 'Court of Appeal', jur: 'ew', area: 'Economic torts', year: 2007 },
    { id: 'src-debenture', case: 'Law Debenture Trust Corp v Ural Caspian Oil Corp', citation: '[1995] Ch 152', court: 'Court of Appeal', jur: 'ew', area: 'Economic torts', year: 1995 },
    { id: 'src-marathon-c', case: 'Crawford Adjusters v Sagicor General Insurance (Cayman)', citation: '[2013] UKPC 17', court: 'Privy Council', jur: 'pc', origin: 'Cayman Islands appeal', area: 'Economic torts', year: 2013 },
    { id: 'src-willers', case: 'Willers v Joyce (No 1)', citation: '[2016] UKSC 43', court: 'UK Supreme Court', jur: 'ew', area: 'Economic torts', year: 2016 },
    // Damages & remoteness
    { id: 'src-hadley', case: 'Hadley v Baxendale', citation: '(1854) 9 Ex 341', court: 'Court of Exchequer', jur: 'ew', area: 'Damages & remoteness', year: 1854 },
    { id: 'src-heron', case: 'Czarnikow Ltd v Koufos (The Heron II)', citation: '[1969] 1 AC 350', court: 'House of Lords', jur: 'ew', area: 'Damages & remoteness', year: 1969 },
    { id: 'src-parsons', case: 'H Parsons (Livestock) Ltd v Uttley Ingham & Co', citation: '[1978] QB 791', court: 'Court of Appeal', jur: 'ew', area: 'Damages & remoteness', year: 1978 },
    { id: 'src-achilleas', case: 'Transfield Shipping v Mercator (The Achilleas)', citation: '[2008] UKHL 48', court: 'House of Lords', jur: 'ew', area: 'Damages & remoteness', year: 2008 },
    { id: 'src-anglia', case: 'Anglia Television Ltd v Reed', citation: '[1972] 1 QB 60', court: 'Court of Appeal', jur: 'ew', area: 'Damages & remoteness', year: 1971 },
    { id: 'src-cphaulage', case: 'C & P Haulage v Middleton', citation: '[1983] 1 WLR 1461', court: 'Court of Appeal', jur: 'ew', area: 'Damages & remoteness', year: 1983 },
    { id: 'src-doyle', case: 'Doyle v Olby (Ironmongers) Ltd', citation: '[1969] 2 QB 158', court: 'Court of Appeal', jur: 'ew', area: 'Damages & remoteness', year: 1969 },
    { id: 'src-east', case: 'East v Maurer', citation: '[1991] 1 WLR 461', court: 'Court of Appeal', jur: 'ew', area: 'Damages & remoteness', year: 1991 },
    { id: 'src-broome', case: 'Broome v Cassell & Co Ltd', citation: '[1972] AC 1027', court: 'House of Lords', jur: 'ew', area: 'Damages & remoteness', year: 1972 },
    { id: 'src-devenish', case: 'Devenish Nutrition Ltd v Sanofi-Aventis SA', citation: '[2008] EWCA Civ 1086', court: 'Court of Appeal', jur: 'ew', area: 'Restitution', year: 2008 },
    { id: 'src-simmons', case: 'Simmons v Castle', citation: '[2012] EWCA Civ 1039', court: 'Court of Appeal', jur: 'ew', area: 'Damages & remoteness', year: 2012 },
    // Negligence & duty of care
    { id: 'src-donoghue', case: 'Donoghue v Stevenson', citation: '[1932] AC 562', court: 'House of Lords', jur: 'sc', origin: 'Scottish appeal · 1932 SC (HL) 31', area: 'Negligence & duty', year: 1932 },
    { id: 'src-hedley', case: 'Hedley Byrne & Co Ltd v Heller & Partners Ltd', citation: '[1964] AC 465', court: 'House of Lords', jur: 'ew', area: 'Negligence & duty', year: 1964 },
    { id: 'src-caparo', case: 'Caparo Industries plc v Dickman', citation: '[1990] 2 AC 605', court: 'House of Lords', jur: 'ew', area: 'Negligence & duty', year: 1990 },
    { id: 'src-anns', case: 'Anns v Merton London Borough Council', citation: '[1978] AC 728', court: 'House of Lords', jur: 'ew', area: 'Negligence & duty', year: 1977 },
    { id: 'src-murphy', case: 'Murphy v Brentwood District Council', citation: '[1991] 1 AC 398', court: 'House of Lords', jur: 'ew', area: 'Negligence & duty', year: 1990 },
    { id: 'src-junior', case: 'Junior Books Ltd v Veitchi Co Ltd', citation: '[1983] 1 AC 520', court: 'House of Lords', jur: 'sc', origin: 'Scottish appeal', area: 'Negligence & duty', year: 1982 },
    { id: 'src-white', case: 'White v Jones', citation: '[1995] 2 AC 207', court: 'House of Lords', jur: 'ew', area: 'Negligence & duty', year: 1995 },
    { id: 'src-3rivers', case: 'Three Rivers DC v Bank of England (No 3)', citation: '[2003] 2 AC 1', court: 'House of Lords', jur: 'ew', area: 'Negligence & duty', year: 2001 },
    { id: 'src-bpe', case: 'Hughes-Holland v BPE Solicitors', citation: '[2017] UKSC 21', court: 'UK Supreme Court', jur: 'ew', area: 'Negligence & duty', year: 2017 },
    { id: 'src-sienkiewicz', case: 'Sienkiewicz v Greif (UK) Ltd', citation: '[2011] UKSC 10', court: 'UK Supreme Court', jur: 'ew', area: 'Negligence & duty', year: 2011 },
    { id: 'src-herrington', case: 'British Railways Board v Herrington', citation: '[1972] AC 877', court: 'House of Lords', jur: 'ew', area: 'Negligence & duty', year: 1972 },
    // Injunctions
    { id: 'src-cyanamid', case: 'American Cyanamid Co v Ethicon Ltd', citation: '[1975] AC 396', court: 'House of Lords', jur: 'ew', area: 'Injunctions', year: 1975 },
    { id: 'src-wolverhampton', case: 'Wolverhampton CC v London Gypsies & Travellers', citation: '[2023] UKSC 47', court: 'UK Supreme Court', jur: 'ew', area: 'Injunctions', year: 2023 },
    // Jurisdiction & conflict of laws
    { id: 'src-4seasons', case: 'Four Seasons Holdings Inc v Brownlie', citation: '[2017] UKSC 80', court: 'UK Supreme Court', jur: 'ew', area: 'Jurisdiction', year: 2017 },
    { id: 'src-cairo', case: 'FS Cairo (Nile Plaza) LLC v Brownlie', citation: '[2021] UKSC 45', court: 'UK Supreme Court', jur: 'ew', area: 'Jurisdiction', year: 2021 },
    { id: 'src-vtb', case: 'VTB Capital plc v Nutritek International Corp', citation: '[2013] UKSC 5', court: 'UK Supreme Court', jur: 'ew', area: 'Jurisdiction', year: 2013 },
    { id: 'src-ak', case: 'AK Investment CJSC v Kyrgyz Mobil Tel Ltd', citation: '[2011] UKPC 7', court: 'Privy Council', jur: 'pc', origin: 'Isle of Man appeal', area: 'Jurisdiction', year: 2011 },
    // Contract & commercial
    { id: 'src-triple', case: 'Triple Point Technology Inc v PTT Public Co Ltd', citation: '[2021] UKSC 29', court: 'UK Supreme Court', jur: 'ew', area: 'Contract', year: 2021 },
    { id: 'src-oceanbulk', case: 'Oceanbulk Shipping & Trading SA v TMT Asia Ltd', citation: '[2010] UKSC 44', court: 'UK Supreme Court', jur: 'ew', area: 'Contract', year: 2010 },
    { id: 'src-uber', case: 'Uber BV v Aslam', citation: '[2021] UKSC 5', court: 'UK Supreme Court', jur: 'ew', area: 'Employment', year: 2021 },
    { id: 'src-starbucks', case: 'Starbucks (HK) Ltd v British Sky Broadcasting', citation: '[2015] UKSC 31', court: 'UK Supreme Court', jur: 'ew', area: 'IP & passing off', year: 2015 },
  ],
  discovered: [
    { id: 'disc-series5', case: 'Series 5 Software Ltd v Clarke', citation: '[1996] 1 All ER 853', court: 'Chancery Division', jur: 'ew', area: 'Injunctions', foundVia: 'Perplexity Live Search', matter: 'Crestholm Dynamics plc v Veltros', confidence: 84,
      note: 'Cited in the Crestholm skeleton for without-notice relief. Confirmed on open-web search but outside the curated corpus — adding it lets future matters verify this authority deterministically.' },
    { id: 'disc-onestep', case: 'One Step (Support) Ltd v Morris-Garner', citation: '[2018] UKSC 20', court: 'UK Supreme Court', jur: 'ew', area: 'Damages & remoteness', foundVia: 'CourtListener', matter: 'Crestholm Dynamics plc v Veltros', confidence: 93,
      note: 'The Supreme Court’s modern restatement of negotiating (Wrotham Park) damages. Surfaced while checking cit-009 — this is the authority the skeleton should rely on instead of mis-stating Wrotham Park.' },
    { id: 'disc-pell', case: 'Pell Frischmann Engineering Ltd v Bow Valley Iran Ltd', citation: '[2009] UKPC 45', court: 'Privy Council', jur: 'pc', area: 'Damages & remoteness', foundVia: 'Perplexity Live Search', matter: 'Lockton Maritime v Argo Freight', confidence: 88,
      note: 'Leading Privy Council authority on the assessment of negotiating damages. Persuasive in E&W — flag jurisdiction on use.' },
    { id: 'disc-marathon', case: 'Marathon Asset Management LLP v Seddon', citation: '[2017] EWHC 300 (Comm)', court: 'Commercial Court', jur: 'ew', area: 'Economic torts', foundVia: 'CourtListener', matter: 'Harwell Bio NV v Sentris Pharma', confidence: 86,
      note: 'Confidential-information and unlawful-means analysis. Found on the open web during the Harwell review; not yet in the corpus.' },
  ],
  corpusStats: { base: 58, seedLabel: 'White & Case verified case corpus' },
});

/* Partner-approved revisions for the working document — each rewrites the
   paragraph to reflect the verified legal position, grounded in the real
   corpus. Applied as tracked changes on the left-hand working copy. */
window.CCData.revisions = {
  'cit-008': 'The Claimant is entitled to recover wasted expenditure incurred in reliance on the contract: Anglia Television Ltd v Reed [1972] 1 QB 60. Lost profits, claimed as expectation loss, are pursued separately under Hadley v Baxendale (1854) 9 Ex 341 — Anglia is not relied upon for expectation damages.',
  'cit-009': 'To the extent negotiating damages are sought, the Claimant relies on Wrotham Park Estate Co Ltd v Parkside Homes Ltd [1974] 1 WLR 798 as restated in One Step (Support) Ltd v Morris-Garner [2018] UKSC 20. Ordinary lost-profit expectation damages are pleaded separately under Hadley v Baxendale.',
  'cit-010': '[Citation removed in review — "Fairfax International Logistics v Brennan Holdings [2019] EWHC 1847 (Comm)" could not be verified in any available source. Interference with commercial relations is supported by OBG Ltd v Allan [2007] UKHL 21.]',
  'cit-011': '[Citation removed in review — "Stonegate Capital Partners v Redwood Procurement [2021] EWHC 3312 (Ch)" could not be verified. Recovery of procurement and investment loss is addressed under Hedley Byrne & Co Ltd v Heller & Partners Ltd [1964] AC 465.]',
  'cit-012': '[Citation removed in review — "Pemberton Aerospace Systems v Delta Global Ventures [2023] EWHC 892 (TCC)" could not be verified. Consequential supply-chain loss is governed by Czarnikow Ltd v Koufos (The Heron II) [1969] 1 AC 350.]',
};

/* Lightweight client-side citation detection for uploaded documents (demo). */
window.CCDetectCitations = function (text) {
  const out = []; const seen = new Set();
  const reCase = /\b([A-Z][A-Za-z'’.&-]+(?:\s+[A-Z][A-Za-z'’.&-]+){0,4})\s+v\.?\s+([A-Z][A-Za-z'’.&-]+(?:\s+[A-Z][A-Za-z'’.&-]+){0,4})/g;
  let m;
  while ((m = reCase.exec(text)) && out.length < 60) { const s = m[0].replace(/\s+/g, ' ').trim(); if (!seen.has(s)) { seen.add(s); out.push(s); } }
  return out;
};


/* Parallel citations — one judgment, multiple law-report references.
   A single case is reported across several series (neutral citation, Appeal
   Cases, Weekly Law Reports, All England, specialist reporters); each is a
   distinct address for the same authority. The verifier normalises across all
   of them, so a lawyer can paste ANY one and the tool resolves the same case.
   Every reference below is a genuine parallel citation for the case.
   A fabricated citation resolves in NO series — its absence everywhere is the tell. */
window.CCData.parallelCites = {
  'cit-001': { primary: '(1853) 2 E & B 216', refs: ['(1853) 2 E & B 216', '118 ER 749', '[1843-60] All ER Rep 208'] },
  'cit-002': { primary: '[2007] UKHL 21', refs: ['[2007] UKHL 21', '[2008] 1 AC 1', '[2007] 2 WLR 920', '[2007] 4 All ER 545', '[2007] Bus LR 1600'] },
  'cit-003': { primary: '[1952] Ch 646', refs: ['[1952] Ch 646', '[1952] 2 All ER 361', '[1952] 2 TLR 105'] },
  'cit-004': { primary: '(1854) 9 Ex 341', refs: ['(1854) 9 Ex 341', '156 ER 145', '[1843-60] All ER Rep 461'] },
  'cit-005': { primary: '[2008] UKHL 48', refs: ['[2008] UKHL 48', '[2009] 1 AC 61', '[2008] 3 WLR 345', '[2008] 4 All ER 159', "[2008] 2 Lloyd's Rep 275"] },
  'cit-006': { primary: '[1975] UKHL 1', refs: ['[1975] AC 396', '[1975] UKHL 1', '[1975] 2 WLR 316', '[1975] 1 All ER 504', '[1975] RPC 513', '[1975] FSR 101'] },
  'cit-007': { primary: '[1996] 1 All ER 853', refs: ['[1996] 1 All ER 853', '[1996] FSR 273', '[1996] CLC 631'] },
  'cit-008': { primary: '[1972] 1 QB 60', refs: ['[1972] 1 QB 60', '[1971] 3 WLR 528', '[1971] 3 All ER 690'] },
  'cit-009': { primary: '[1974] 1 WLR 798', refs: ['[1974] 1 WLR 798', '[1974] 2 All ER 321', '(1974) 27 P & CR 296'] },
  'cit-010': { primary: '[2019] EWHC 1847 (Comm)', refs: [], unresolved: true },
  'cit-011': { primary: '[2021] EWHC 3312 (Ch)', refs: [], unresolved: true },
  'cit-012': { primary: '[2023] EWHC 892 (TCC)', refs: [], unresolved: true },
};

/* Parallel citations for Source Library entries (keyed by entry id). */
window.CCData.parallelLib = {
  'src-lumley': ['(1853) 2 E & B 216', '118 ER 749', '[1843-60] All ER Rep 208'],
  'src-quinn': ['[1901] AC 495', '[1900-3] All ER Rep 1'],
  'src-thomson': ['[1952] Ch 646', '[1952] 2 All ER 361', '[1952] 2 TLR 105'],
  'src-obg': ['[2007] UKHL 21', '[2008] 1 AC 1', '[2007] 2 WLR 920', '[2007] 4 All ER 545'],
  'src-hadley': ['(1854) 9 Ex 341', '156 ER 145', '[1843-60] All ER Rep 461'],
  'src-heron': ['[1969] 1 AC 350', '[1967] 3 WLR 1491', '[1967] 3 All ER 686', "[1967] 2 Lloyd's Rep 457"],
  'src-achilleas': ['[2008] UKHL 48', '[2009] 1 AC 61', '[2008] 3 WLR 345', '[2008] 4 All ER 159'],
  'src-anglia': ['[1972] 1 QB 60', '[1971] 3 WLR 528', '[1971] 3 All ER 690'],
  'src-donoghue': ['[1932] AC 562', '1932 SC (HL) 31', '[1932] All ER Rep 1', '1932 SLT 317', '48 TLR 494'],
  'src-hedley': ['[1964] AC 465', '[1963] 3 WLR 101', '[1963] 2 All ER 575', "[1963] 1 Lloyd's Rep 485"],
  'src-caparo': ['[1990] 2 AC 605', '[1990] 2 WLR 358', '[1990] 1 All ER 568'],
  'src-cyanamid': ['[1975] AC 396', '[1975] UKHL 1', '[1975] 2 WLR 316', '[1975] 1 All ER 504', '[1975] RPC 513'],
};

/* Ratio vs obiter — does the cited proposition rest on the case's BINDING ratio,
   or on a weaker obiter / plurality passage?  A citation can "exist" and even be
   described accurately yet still be mischaracterised in WEIGHT: relying on an aside
   as if it were the holding overstates the authority. Three failure modes:
     ratio-mismatch — the skeleton's proposition differs from the actual ratio
     obiter-weak    — the proposition is real but is obiter / not the ratio (weaker)
     partial        — broadly the ratio, but stated more widely than the case holds
   Grounded in the real holdings of the corpus cases. */
window.CCData.ratioAnalysis = {
  'cit-001': { type: 'aligned', label: 'Ratio aligned', strength: 'Binding ratio', citedAs: 'Intentional procurement of a breach of contract is itself a tort.', actualRatio: 'That is the ratio of Lumley v Gye — knowingly inducing breach of an existing contract is actionable.', note: 'The cited proposition is the binding ratio of the case and is used correctly.' },
  'cit-002': { type: 'aligned', label: 'Ratio aligned', strength: 'Binding ratio (HL)', citedAs: 'The economic torts share a unified structure distinguishing inducing breach from unlawful-means liability.', actualRatio: 'That distinction is the central holding of the House in OBG v Allan.', note: 'Used for the case\u2019s core holding — appropriate weight.' },
  'cit-003': { type: 'partial', label: 'Mostly ratio · some obiter', strength: 'Ratio on direct inducement; indirect procurement is obiter', citedAs: 'Knowledge and intention are required for inducing breach of contract.', actualRatio: 'The knowledge/intention requirement is ratio; the wider remarks on indirect procurement by unlawful means are obiter and were later refined in OBG.', note: 'Sound for the direct-inducement proposition. If relied on for indirect procurement, that part is obiter — flag the weaker weight.' },
  'cit-004': { type: 'aligned', label: 'Ratio aligned', strength: 'Binding ratio', citedAs: 'Recoverable loss is limited to what was within the parties\u2019 reasonable contemplation (two limbs).', actualRatio: 'The two-limb remoteness rule is the ratio of Hadley v Baxendale.', note: 'The foundational ratio, correctly applied.' },
  'cit-005': { type: 'obiter-weak', label: 'Cited point is obiter', strength: 'Plurality rationale — not the binding ratio', citedAs: 'Treated as binding authority that recoverability turns on a defendant\u2019s assumption of responsibility for the type of loss.', actualRatio: 'The result in The Achilleas is consistent with orthodox Hadley remoteness; Lord Hoffmann\u2019s assumption-of-responsibility rationale did not command the whole House and is best read as a plurality / obiter view rather than the ratio.', note: 'The proposition is real, but it rests on reasoning that was not the ratio of the decision — the authority is weaker than the skeleton presents it. Present it as persuasive, not settled.' },
  'cit-006': { type: 'aligned', label: 'Ratio aligned', strength: 'Binding ratio (HL)', citedAs: 'The guidelines governing the grant of interim injunctions (serious issue, adequacy of damages, balance of convenience).', actualRatio: 'Those guidelines are the ratio of American Cyanamid v Ethicon.', note: 'Cited for its binding guidelines — correct weight.' },
  'cit-007': { type: 'partial', label: 'Mostly ratio · first-instance gloss', strength: 'Persuasive (first instance)', citedAs: 'A court may weigh the relative merits when granting without-notice / interim relief.', actualRatio: 'Laddie J\u2019s merits-based reading is influential but is a first-instance gloss on Cyanamid, not a higher-court ratio.', note: 'Accurate, but note its weight: a first-instance decision read alongside the binding Cyanamid guidelines.' },
  'cit-008': { type: 'ratio-mismatch', label: 'Ratio mismatch', strength: 'Wrong limb of the holding', citedAs: 'Authority for recovering expectation damages for lost profits.', actualRatio: 'The ratio of Anglia Television v Reed is that a claimant may instead recover wasted (reliance) expenditure where expectation loss is hard to prove — it is a reliance-loss authority, not a lost-profits one.', note: 'The case is correct law but the skeleton has the ratio wrong: it is cited for a proposition (expectation / lost profits) that is the opposite of what the case actually decides (reliance loss).' },
  'cit-009': { type: 'ratio-mismatch', label: 'Ratio mismatch', strength: 'Different measure of damages', citedAs: 'Authority for ordinary lost-profit expectation damages.', actualRatio: 'The ratio of Wrotham Park is that, where an injunction is refused, damages may be assessed as the hypothetical fee for releasing the obligation (negotiating damages) — a distinct measure from ordinary expectation loss.', note: 'Right case, wrong ratio: negotiating damages are conceptually different from the lost-profit measure the skeleton relies on.' },
  'cit-010': { type: 'na', label: 'No ratio — unverified', strength: 'n/a', note: 'The authority could not be verified, so there is no holding to test ratio against.' },
  'cit-011': { type: 'na', label: 'No ratio — unverified', strength: 'n/a', note: 'Not found in any source checked; no ratio to assess.' },
  'cit-012': { type: 'na', label: 'No ratio — unverified', strength: 'n/a', note: 'Suspected fabrication; no holding exists to compare.' },
};
window.CCRatioMeta = {
  aligned:         { hue: 'var(--verified)',   bg: 'var(--verified-bg)',   icon: 'check-circle', short: 'Ratio aligned' },
  partial:         { hue: 'var(--mischar)',    bg: 'var(--mischar-bg, var(--risk-high-bg))', icon: 'circle-slash', short: 'Partly ratio' },
  'obiter-weak':   { hue: 'var(--mischar)',    bg: 'var(--mischar-bg, var(--risk-high-bg))', icon: 'message-square-warning', short: 'Obiter — weaker' },
  'ratio-mismatch':{ hue: 'var(--fabricated)', bg: 'var(--fabricated-bg)', icon: 'git-compare-arrows', short: 'Ratio mismatch' },
  na:              { hue: 'var(--ash)',        bg: 'var(--surface-bone)',  icon: 'minus-circle', short: 'No ratio' },
};

/* Jurisdiction taxonomy — the UK is NOT one jurisdiction. */
window.CCJurMeta = {
  ew: { code: 'E&W',  label: 'England & Wales',   dot: 'var(--charcoal)',  short: 'E&W' },
  sc: { code: 'Scot', label: 'Scotland',          dot: 'var(--primary-deep)', short: 'Scotland' },
  ni: { code: 'NI',   label: 'Northern Ireland',  dot: 'var(--mischar)',   short: 'N. Ireland' },
  pc: { code: 'PC',   label: 'Privy Council · Commonwealth', dot: 'var(--ash)', short: 'Privy Council' },
  us: { code: 'US',   label: 'United States',     dot: 'var(--fabricated)', short: 'US (persuasive)' },
};
