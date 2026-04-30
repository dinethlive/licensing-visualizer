// =============================================================================
//  CHANGELOG, APPEND-ONLY
//
//  Every regulatory edit gets one entry here. The /changelog route renders the
//  list in reverse chronological order, grouped by date. Diffing the visualizer
//  over time is then just reading this file top-to-bottom.
//
//  Entry shape:
//   - date              : when the change was applied to THIS visualizer
//   - regulationId      : foreign key into regulations.ts
//   - kind              : added | updated | superseded | clarified | removed
//   - previousValue     : the old value (omit for `added`)
//   - newValue          : the new value (omit for `removed`)
//   - reason            : 1–2 sentences on WHY (cite the regulator update / source)
//   - sourceIds         : citations supporting the change
//   - editor            : human / handle who landed the edit
//
//  TO ADD AN ENTRY:
//   1. Add the row at the BOTTOM of the array (reverse-chronological happens
//      automatically in the UI via sort).
//   2. Update the matching regulation in regulations.ts, bump its `version`
//      and `lastVerified` date.
//   3. Commit with message: "regs: <regulation-id> <one-line summary>".
// =============================================================================

export type ChangeKind =
  | 'added'         // new regulation introduced
  | 'updated'       // value changed
  | 'superseded'    // replaced by a newer regulation entry
  | 'clarified'    // text/notes refined; numeric value unchanged
  | 'removed'       // regulation withdrawn

export interface ChangeEntry {
  date: string             // ISO 8601, when this visualizer was updated
  regulationId: string
  kind: ChangeKind
  previousValue?: unknown
  newValue?: unknown
  reason: string
  sourceIds: string[]
  editor: string
}

export const CHANGELOG: ChangeEntry[] = [
  // ----- v1.0.0, INITIAL POPULATION (snapshot from documentary script) -----
  {
    date: '2026-04-30',
    regulationId: 'mga.license-types',
    kind: 'added',
    newValue: 'T1, T2, T3, T4 with respective €100k/€100k/€40k/€40k capital',
    reason: 'Initial population of regulations from the v1 documentary script source.',
    sourceIds: ['mga-licence-fees-regs', 'script-2026'],
    editor: 'system',
  },
  {
    date: '2026-04-30',
    regulationId: 'ukgc.min-cycle-seconds',
    kind: 'added',
    newValue: 5,
    reason: 'UKGC sweeping RTS changes effective 17 Jan 2025, 5-second minimum cycle now applies to all online casino games, not slots only.',
    sourceIds: ['ukgc-rts', 'script-2026'],
    editor: 'system',
  },
  {
    date: '2026-04-30',
    regulationId: 'ukgc.iso27001-version',
    kind: 'added',
    newValue: '2022',
    reason: 'From 31 Oct 2024 the UKGC mandates the 2022 revision of ISO/IEC 27001 for security audits.',
    sourceIds: ['ukgc-iso27001-2022', 'iso27001-2022', 'script-2026'],
    editor: 'system',
  },
  {
    date: '2026-04-30',
    regulationId: 'cga.lok-effective-date',
    kind: 'added',
    newValue: '2024-12-24',
    reason: 'Curaçao LOK in force from 24 Dec 2024, sub-licensing abolished, all licensing direct from CGA.',
    sourceIds: ['curacao-lok', 'script-2026'],
    editor: 'system',
  },
  {
    date: '2026-04-30',
    regulationId: 'cga.tier-iv-downtime-minutes',
    kind: 'added',
    newValue: 26.3,
    reason: 'Tier-IV server requirement under LOK; theoretical maximum downtime is the standard Uptime Institute figure.',
    sourceIds: ['curacao-lok', 'script-2026'],
    editor: 'system',
  },
  {
    date: '2026-04-30',
    regulationId: 'cga.fee-schedule',
    kind: 'added',
    newValue: 'Application €4,592 · Annual €24,490 · Supervisory €22,960 · DD €150–€260/person',
    reason: 'CGA fee schedule under LOK published with the 24 Dec 2024 commencement.',
    sourceIds: ['curacao-fee-schedule', 'script-2026'],
    editor: 'system',
  },
  {
    date: '2026-04-30',
    regulationId: 'cga.seal-deadline',
    kind: 'added',
    newValue: '2026-01-30',
    reason: 'CGA color-coded digital seal directive, operators required to display green (B2C) / blue (B2B) seal across domains by 30 Jan 2026.',
    sourceIds: ['curacao-seal-directive', 'script-2026'],
    editor: 'system',
  },
  {
    date: '2026-04-30',
    regulationId: 'gra.licensing-trigger',
    kind: 'updated',
    previousValue: 'equipment-location (Gambling Act 2005)',
    newValue: 'management-location (Gambling Bill 2025)',
    reason: 'Gibraltar Gambling Bill 2025 closes the structural gap whereby offshore servers placed an operator outside the licensing requirement despite substantive Gibraltar presence.',
    sourceIds: ['gib-bill-2025', 'gib-act-2005', 'script-2026'],
    editor: 'system',
  },
  {
    date: '2026-04-30',
    regulationId: 'gra.goss-license',
    kind: 'added',
    newValue: 'GOSS license, covers advertising, marketing, support services',
    reason: 'New license category introduced under the 2025 Bill, bringing previously unregulated activities under formal oversight.',
    sourceIds: ['gib-bill-2025', 'script-2026'],
    editor: 'system',
  },
  {
    date: '2026-04-30',
    regulationId: 'nj.geolocation-mandate',
    kind: 'added',
    newValue: 'Login + interval checks; immediate cessation on boundary breach',
    reason: 'N.J.A.C. 13:69O-1.2(e) mandate carried forward in the v1 documentary snapshot.',
    sourceIds: ['nj-njac-13-69o', 'script-2026'],
    editor: 'system',
  },
  {
    date: '2026-04-30',
    regulationId: 'global.ato-bot-share',
    kind: 'added',
    newValue: 0.40,
    reason: 'Cross-cutting figure: ~40% of ATO incidents in iGaming linked to credential-stuffing bots, per the documentary script\'s research note.',
    sourceIds: ['script-2026'],
    editor: 'system',
  },
  // ----- v1.1.0 (2026-04-30), web-verified deep links + factual corrections -----
  {
    date: '2026-04-30',
    regulationId: 'gra.licensing-trigger',
    kind: 'updated',
    previousValue: { effectiveDate: '2025-01-01', version: 2 },
    newValue: { effectiveDate: '2026-04-01', version: 3 },
    reason: 'Web-verified against the parliament.gi Gambling Bill 2025 [B. 13/25] PDF: the Bill was assented 23 March 2026 and most provisions came into force 1 April 2026. The script\'s 2025-01-01 was a placeholder.',
    sourceIds: ['gib-bill-2025'],
    editor: 'web-research',
  },
  {
    date: '2026-04-30',
    regulationId: 'gra.goss-license',
    kind: 'updated',
    previousValue: { effectiveDate: '2025-01-01', version: 1 },
    newValue: { effectiveDate: '2026-04-01', version: 2 },
    reason: 'GOSS license category commences with the broader Gambling Act 2025 on 1 April 2026 (parliament.gi Bill PDF). Approved Persons regime in Part 5 deferred to a separate commencement notice.',
    sourceIds: ['gib-bill-2025'],
    editor: 'web-research',
  },
  {
    date: '2026-04-30',
    regulationId: 'cga.seal-deadline',
    kind: 'clarified',
    previousValue: { palette: 'green/blue', effectiveDate: '2025-12-01' },
    newValue: { palette: 'green/blue/grey/black; orange phased out', effectiveDate: '2026-01-20' },
    reason: 'Verified against the CGA Certification Policy on the licensee portal: full color palette is green=B2C, blue=B2B, grey=withdrawn/suspended, black=revoked; orange is being phased out. Directive published 20 Jan 2026; cross-domain compliance deadline remains 30 Jan 2026.',
    sourceIds: ['curacao-seal-directive', 'curacao-cga-portal'],
    editor: 'web-research',
  },
  {
    date: '2026-04-30',
    regulationId: 'mga.license-types',
    kind: 'clarified',
    reason: 'Added MGA Capital Requirements Policy and Licence Fees Guidance Note as authoritative primary sources alongside S.L. 583.03.',
    sourceIds: ['mga-capital-policy', 'mga-fees-guidance'],
    editor: 'web-research',
  },
  {
    date: '2026-04-30',
    regulationId: 'ukgc.min-cycle-seconds',
    kind: 'clarified',
    reason: 'Added UKGC "Updates to RTS effective 17 January 2025" page (codifies RTS 14G) and the standalone RTS 14 page as primary sources.',
    sourceIds: ['ukgc-rts-jan2025-updates', 'ukgc-rts-14'],
    editor: 'web-research',
  },
  {
    date: '2026-04-30',
    regulationId: 'nj.geolocation-mandate',
    kind: 'clarified',
    reason: 'Added direct deep link to N.J.A.C. 13:69O-1.2 on Cornell Law (subsection (e) is the geolocation mandate).',
    sourceIds: ['nj-njac-13-69o-1-2'],
    editor: 'web-research',
  },
  // ----- v1.2.0 (2026-04-30), Sri Lanka added + Comparison page -----------
  {
    date: '2026-04-30',
    regulationId: 'lk.act-certification-date',
    kind: 'added',
    newValue: '2025-09-03',
    reason: 'Loaded the Gambling Regulatory Authority Act, No. 17 of 2025 (certified 03 Sep 2025). Establishes Sri Lanka\'s first unified gambling regulator and repeals the Betting on Horse-Racing Ordinance (Ch. 44), Gaming Ordinance (Ch. 46), and Casino Business (Regulation) Act, No. 17 of 2010.',
    sourceIds: ['lk-gra-act-2025'],
    editor: 'system',
  },
  {
    date: '2026-04-30',
    regulationId: 'lk.minimum-capital-policy',
    kind: 'added',
    newValue: 'undefined in statute, set by Ministerial Order in the Gazette',
    reason: 'Section 16(1) delegates the minimum capital threshold to a Gazette Order. Logged as `pending` and surfaced as a high-severity loophole on the Comparison page.',
    sourceIds: ['lk-gra-act-2025'],
    editor: 'system',
  },
  {
    date: '2026-04-30',
    regulationId: 'lk.penalties-table',
    kind: 'added',
    newValue: 'Schedule of statutory penalties (ss.42–56)',
    reason: 'Loaded all 15 statutory offence ceilings from Part VI of the Act so the penalty comparator on the Comparison page can render USD-equivalents alongside UKGC / GRA / NJ / PA ceilings.',
    sourceIds: ['lk-gra-act-2025'],
    editor: 'system',
  },
  {
    date: '2026-04-30',
    regulationId: 'lk.digital-gambling-mandate',
    kind: 'added',
    newValue: 'not specified in the Act',
    reason: 'Sri Lanka\'s s.18 leaves digital-gambling implementation to a Gazette Order. Logged as `pending` and surfaced as a critical loophole (no data residency or replication mandate) on the Comparison page.',
    sourceIds: ['lk-gra-act-2025'],
    editor: 'system',
  },
  {
    date: '2026-04-30',
    regulationId: 'lk.geolocation-mandate',
    kind: 'added',
    newValue: 'not specified in the Act',
    reason: 'No statutory geolocation / boundary-enforcement mandate. Surfaced as critical on the Comparison page; mitigated in NJ-DGE / PA-PGCB by N.J.A.C. 13:69O-1.2(e) and Subpart L respectively.',
    sourceIds: ['lk-gra-act-2025'],
    editor: 'system',
  },
  {
    date: '2026-04-30',
    regulationId: 'lk.iso27001-mandate',
    kind: 'added',
    newValue: 'not specified in the Act',
    reason: 'No analogue to UKGC ISO/IEC 27001:2022 audit mandate or 7-day major non-conformity disclosure window. Surfaced as critical on the Comparison page.',
    sourceIds: ['lk-gra-act-2025'],
    editor: 'system',
  },
  // EXAMPLE, what a future row looks like:
  // {
  //   date: '2026-07-01',
  //   regulationId: 'ukgc.min-cycle-seconds',
  //   kind: 'updated',
  //   previousValue: 5,
  //   newValue: 6,
  //   reason: 'UKGC consultation outcome lifted minimum cycle to 6s effective 1 Jul 2026.',
  //   sourceIds: ['ukgc-rts'],
  //   editor: 'dineth',
  // },
]

// ----- helpers -------------------------------------------------------------

export function changesForRegulation(id: string): ChangeEntry[] {
  return CHANGELOG.filter((c) => c.regulationId === id).sort((a, b) => b.date.localeCompare(a.date))
}

export function recentChanges(limit = 10): ChangeEntry[] {
  return [...CHANGELOG].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit)
}

export function lastUpdatedDate(): string {
  return [...CHANGELOG].sort((a, b) => b.date.localeCompare(a.date))[0]?.date ?? '-'
}
