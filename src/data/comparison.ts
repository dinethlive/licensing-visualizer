// =============================================================================
//  COMPARISON DATA, SRI LANKA vs OTHER JURISDICTIONS
//
//  Two structured datasets:
//   1. MATRIX_TOPICS  : a topic-by-jurisdiction matrix the comparison page
//                       renders as a sortable cell grid. Each cell carries:
//                         - the position the jurisdiction takes
//                         - a coverage rating (none | partial | full)
//                         - source IDs that justify the cell
//
//   2. LOOPHOLES      : gaps observed in the Sri Lankan Act, paired with the
//                       way each other jurisdiction closes them. Each loophole
//                       is graded by severity and tagged with the regulations
//                       it points to so the UI can deep-link.
//
//  Both datasets reference REGULATIONS (regulations.ts) and SOURCES
//  (sources.ts) by ID; no figure is hard-coded here.
// =============================================================================

import type { Jurisdiction } from './regulations'

export type Coverage = 'none' | 'partial' | 'full'

export interface MatrixCell {
  position: string                  // short, human-readable description
  coverage: Coverage
  regulationIds?: string[]          // optional FK into regulations.ts
  sourceIds?: string[]              // optional FK into sources.ts
}

export interface MatrixTopic {
  id: string
  topic: string
  question: string                  // the question this row answers
  cells: Partial<Record<Jurisdiction, MatrixCell>>
}

export type LoopholeSeverity = 'low' | 'medium' | 'high' | 'critical'

export interface LoopholeMitigation {
  jurisdiction: Jurisdiction
  approach: string                  // how this jurisdiction handles it
  regulationIds?: string[]
}

export interface Loophole {
  id: string
  title: string                     // short descriptive title
  severity: LoopholeSeverity
  category: string                  // grouping (e.g. "Player Protection")
  whatTheActSays: string            // direct paraphrase of the Sri Lankan Act
  whyItMatters: string              // operational / consumer-protection risk
  exploitVector: string             // how a bad actor could exploit the gap
  mitigations: LoopholeMitigation[]
  relatedLkRegulationIds: string[]  // which LK regulations the gap touches
}

export interface PenaltyComparison {
  offence: string
  jurisdiction: Jurisdiction
  description: string
  maxFineDescription: string
  maxFineUsdEquivalent?: number
  imprisonmentYears?: number
  notes?: string
}

// =============================================================================
//  PART 1: MATRIX
// =============================================================================

export const MATRIX_TOPICS: MatrixTopic[] = [
  {
    id: 'topic.legal-instrument',
    topic: 'Framework',
    question: 'Primary legal instrument',
    cells: {
      LK: {
        position: 'Gambling Regulatory Authority Act, No. 17 of 2025',
        coverage: 'full',
        regulationIds: ['lk.act-certification-date', 'lk.repealed-statutes'],
        sourceIds: ['lk-gra-act-2025'],
      },
      MGA: {
        position: 'Gaming Act (Cap. 583) + Gaming Licence Fees Regulations (S.L. 583.03)',
        coverage: 'full',
        regulationIds: ['mga.license-types'],
        sourceIds: ['mga-licence-fees-regs'],
      },
      UKGC: {
        position: 'Gambling Act 2005 + Remote Gambling and Software Technical Standards (RTS)',
        coverage: 'full',
        sourceIds: ['ukgc-rts'],
      },
      CGA: {
        position: 'Landsverordening op de Kansspelen (LOK), in force 24 Dec 2024',
        coverage: 'full',
        regulationIds: ['cga.lok-effective-date'],
        sourceIds: ['curacao-lok'],
      },
      GRA: {
        position: 'Gambling Act 2025 (assented 23 Mar 2026; in force 1 Apr 2026)',
        coverage: 'full',
        regulationIds: ['gra.licensing-trigger'],
        sourceIds: ['gib-bill-2025'],
      },
      'NJ-DGE': {
        position: 'N.J.A.C. Title 13, Chapters 69O / 69E',
        coverage: 'full',
        regulationIds: ['nj.geolocation-mandate'],
        sourceIds: ['nj-njac-13-69o'],
      },
      'PA-PGCB': {
        position: '58 Pa. Code Subpart L, Interactive Gaming',
        coverage: 'full',
        regulationIds: ['pa.loss-limit-cadences'],
        sourceIds: ['pa-subpart-l'],
      },
    },
  },
  {
    id: 'topic.licensing-trigger',
    topic: 'Framework',
    question: 'What triggers the licensing requirement?',
    cells: {
      LK: {
        position: 'Carrying on gambling without a licence (s.42); applicants must be Sri Lankan-incorporated companies (s.16)',
        coverage: 'partial',
        regulationIds: ['lk.licence-categories', 'lk.minimum-capital-policy'],
      },
      MGA: { position: 'Activity-based by license type (T1–T4); local incorporation expected', coverage: 'full', regulationIds: ['mga.license-types'] },
      UKGC: { position: 'Provision of remote gambling services to UK consumers (point-of-consumption)', coverage: 'full', sourceIds: ['ukgc-rts'] },
      CGA: { position: 'Local incorporation, physical office, key-person engagement under LOK', coverage: 'full', regulationIds: ['cga.local-presence-key-persons'] },
      GRA: { position: 'Management-location test (where the operator is organized/managed)', coverage: 'full', regulationIds: ['gra.licensing-trigger'] },
      'NJ-DGE': { position: 'Affiliation with a New Jersey casino licensee', coverage: 'full', regulationIds: ['nj.geolocation-mandate'] },
      'PA-PGCB': { position: 'Interactive Gaming Certificate + Operator/Supplier license', coverage: 'full', sourceIds: ['pa-subpart-l'] },
    },
  },
  {
    id: 'topic.minimum-capital',
    topic: 'Licensing economics',
    question: 'Minimum share capital fixed in statute?',
    cells: {
      LK: {
        position: 'No, "as may be specified by the Minister by Order published in the Gazette" (s.16(1))',
        coverage: 'none',
        regulationIds: ['lk.minimum-capital-policy'],
      },
      MGA: {
        position: 'Yes, T1/T2 €100,000; T3/T4 €40,000',
        coverage: 'full',
        regulationIds: ['mga.license-types'],
      },
      UKGC: {
        position: 'No fixed share capital; financial-stability assessment + ring-fenced player funds',
        coverage: 'partial',
      },
      CGA: {
        position: 'Application €4,592; annual licence €24,490; supervisory €22,960',
        coverage: 'full',
        regulationIds: ['cga.fee-schedule'],
      },
      GRA: { position: 'Variable; published policy and fees set by the Authority', coverage: 'partial' },
      'NJ-DGE': { position: 'Initial application costs exceed USD 100,000', coverage: 'full', regulationIds: ['nj.application-fee-usd'] },
      'PA-PGCB': { position: 'Interactive Gaming Certificate USD 4,000,000 fee + USD 250,000 renewal (every 5 yrs)', coverage: 'full' },
    },
  },
  {
    id: 'topic.fee-schedule',
    topic: 'Licensing economics',
    question: 'Are licence fees published in the primary instrument?',
    cells: {
      LK: { position: 'No, s.16(3) and s.76(2)(b) leave the fee schedule to regulations', coverage: 'none' },
      MGA: { position: 'Yes, in S.L. 583.03 + the Licence Fees Guidance Note', coverage: 'full', regulationIds: ['mga.license-types'] },
      UKGC: { position: 'Yes, by Statutory Instrument under the Gambling Act 2005', coverage: 'full' },
      CGA: { position: 'Yes, on the CGA portal Certification Policy', coverage: 'full', regulationIds: ['cga.fee-schedule'] },
      GRA: { position: 'Yes, statutory regulations', coverage: 'full' },
      'NJ-DGE': { position: 'Partial; annual fees variable, floor figures published', coverage: 'partial', regulationIds: ['nj.application-fee-usd'] },
      'PA-PGCB': { position: 'Yes, Pa. Code Subpart L', coverage: 'full' },
    },
  },
  {
    id: 'topic.data-residency',
    topic: 'Infrastructure',
    question: 'Data-sovereignty / data-residency requirement',
    cells: {
      LK: {
        position: 'Not in the Act; no replication or data-residency mandate',
        coverage: 'none',
        regulationIds: ['lk.digital-gambling-mandate'],
      },
      MGA: {
        position: 'Real-time replication of gameplay/player/financial data to a server inside Maltese territory',
        coverage: 'full',
        sourceIds: ['mga-system-audit'],
      },
      UKGC: { position: 'No fixed jurisdictional residency, but RTS requires controls on data integrity and ISO 27001:2022 audits', coverage: 'partial', regulationIds: ['ukgc.iso27001-version'] },
      CGA: {
        position: 'Tier-IV certified server + Master Node on physical hardware in Curaçao; cloud only for front-end delivery',
        coverage: 'full',
        regulationIds: ['cga.tier-iv-downtime-minutes'],
      },
      GRA: { position: 'Management presence + RTOS controls, no offshore-server gap (post-2026)', coverage: 'full', regulationIds: ['gra.licensing-trigger'] },
      'NJ-DGE': { position: 'Servers must be located on the licensed casino property (or DGE-approved alternate site)', coverage: 'full' },
      'PA-PGCB': { position: 'Servers in PGCB-approved facility, typically the licensed casino', coverage: 'full' },
    },
  },
  {
    id: 'topic.geolocation',
    topic: 'Infrastructure',
    question: 'Geolocation / boundary enforcement',
    cells: {
      LK: { position: 'Not specified; only underage gambling is prohibited at software level', coverage: 'none', regulationIds: ['lk.geolocation-mandate'] },
      MGA: { position: 'Required where licence conditions limit market scope; not statutory across the board', coverage: 'partial' },
      UKGC: { position: 'Geo-IP / device fingerprinting under RTS; UK-only enforcement built into licences', coverage: 'partial', sourceIds: ['ukgc-rts'] },
      CGA: { position: 'Operators must enforce country-block lists (jurisdictions where they cannot serve)', coverage: 'partial' },
      GRA: { position: 'Required where licence conditions specify; RTOS regression testing post-update', coverage: 'partial' },
      'NJ-DGE': {
        position: 'On login + at intervals during session; immediate cessation on boundary breach (N.J.A.C. 13:69O-1.2(e))',
        coverage: 'full',
        regulationIds: ['nj.geolocation-mandate'],
      },
      'PA-PGCB': { position: 'Statewide perimeter; mirror of NJ controls under Subpart L', coverage: 'full', sourceIds: ['pa-subpart-l'] },
    },
  },
  {
    id: 'topic.session-controls',
    topic: 'Player protection',
    question: 'Mandatory session timeouts',
    cells: {
      LK: { position: 'Not specified', coverage: 'none' },
      MGA: { position: 'Back-end auto log-off 60 min; player terminal 30 min', coverage: 'full', regulationIds: ['mga.session-timeout-backend', 'mga.session-timeout-player'] },
      UKGC: { position: 'Real-time net-position display every session; mandatory disclosures', coverage: 'partial', regulationIds: ['ukgc.net-position-display'] },
      CGA: { position: 'Operator-defined under LOK responsible-gambling rules', coverage: 'partial' },
      GRA: { position: 'Operator-defined under RTOS', coverage: 'partial' },
      'NJ-DGE': { position: 'Inactive-session disconnection required by N.J.A.C. 13:69O', coverage: 'full' },
      'PA-PGCB': { position: 'Reality-check + mandatory breaks-in-play after extended sessions', coverage: 'full', regulationIds: ['pa.reality-check-mandate'] },
    },
  },
  {
    id: 'topic.responsible-game-design',
    topic: 'Player protection',
    question: 'Operator-side product constraints (game speed, autoplay, false wins, etc.)',
    cells: {
      LK: {
        position: 'None mandated. Software must offer self-imposed limits, but no minimum cycle, no autoplay ban, no false-win rules.',
        coverage: 'none',
        regulationIds: ['lk.responsible-game-design', 'lk.gambling-software-controls'],
      },
      MGA: { position: 'Limited; some controls inherited via EU consumer-protection law', coverage: 'partial' },
      UKGC: {
        position: '5-second min cycle, autoplay banned, false-win cues banned, simultaneous play banned, turbo/quick-spin/slam-stop banned',
        coverage: 'full',
        regulationIds: ['ukgc.min-cycle-seconds', 'ukgc.autoplay-prohibition', 'ukgc.false-win-prohibition', 'ukgc.simultaneous-play-ban', 'ukgc.banned-features'],
      },
      CGA: { position: 'Responsible-gambling controls under LOK; less prescriptive than UKGC', coverage: 'partial' },
      GRA: { position: 'RTOS responsible-product-design provisions; aligned to UK direction', coverage: 'partial' },
      'NJ-DGE': { position: 'Partial; mostly via mandatory disclosures', coverage: 'partial' },
      'PA-PGCB': { position: 'Reality checks, mandatory breaks, on-screen session info', coverage: 'partial', regulationIds: ['pa.reality-check-mandate'] },
    },
  },
  {
    id: 'topic.self-exclusion',
    topic: 'Player protection',
    question: 'Central / national self-exclusion register',
    cells: {
      LK: {
        position: 'Software must respect self-exclusion programs (s.33(4)(c)(iii)) but no central register established',
        coverage: 'partial',
        regulationIds: ['lk.self-exclusion-database'],
      },
      MGA: { position: 'Operator-level self-exclusion required; no single MGA-wide register', coverage: 'partial' },
      UKGC: { position: 'GAMSTOP, a single national multi-operator self-exclusion scheme', coverage: 'full', sourceIds: ['ukgc-rts'] },
      CGA: { position: 'Operator-level self-exclusion under LOK; no national register', coverage: 'partial' },
      GRA: { position: 'Operator-level self-exclusion; sector working with GamCare / GAMSTOP equivalents', coverage: 'partial' },
      'NJ-DGE': { position: 'Statewide self-exclusion list maintained by DGE', coverage: 'full' },
      'PA-PGCB': {
        position: 'Statewide self-exclusion DB integration mandatory; must withstand spoofing',
        coverage: 'full',
        regulationIds: ['pa.self-exclusion-integration'],
      },
    },
  },
  {
    id: 'topic.loss-limits',
    topic: 'Player protection',
    question: 'Mandatory player-set loss / deposit limits',
    cells: {
      LK: {
        position: 'Software must offer player-side limits; no statutory cadences',
        coverage: 'partial',
        regulationIds: ['lk.gambling-software-controls'],
      },
      MGA: { position: 'Deposit limits required at registration', coverage: 'full' },
      UKGC: { position: 'Deposit limits, time-out tools, reality checks', coverage: 'full' },
      CGA: { position: 'Required under LOK responsible-gambling rules', coverage: 'partial' },
      GRA: { position: 'Operator must offer limits per RTOS', coverage: 'partial' },
      'NJ-DGE': { position: 'Required; cadence operator-defined within DGE rules', coverage: 'partial' },
      'PA-PGCB': {
        position: 'Daily, weekly, monthly cadences explicitly mandated',
        coverage: 'full',
        regulationIds: ['pa.loss-limit-cadences'],
      },
    },
  },
  {
    id: 'topic.iso27001',
    topic: 'Cybersecurity',
    question: 'ISO/IEC 27001 (or equivalent ISMS) audit requirement',
    cells: {
      LK: {
        position: 'Not required; s.33(2)(b) only refers to generic "compliance certifications from accredited third-party auditors"',
        coverage: 'none',
        regulationIds: ['lk.iso27001-mandate'],
      },
      MGA: { position: 'Strongly expected via System Audit; ISO certification widely held', coverage: 'partial' },
      UKGC: {
        position: 'ISO/IEC 27001:2022 mandatory; major non-conformity disclosure within 7 days',
        coverage: 'full',
        regulationIds: ['ukgc.iso27001-version', 'ukgc.major-noncon-disclosure-days'],
      },
      CGA: { position: 'Information-security framework required under LOK; specific standard at the Authority\'s discretion', coverage: 'partial' },
      GRA: {
        position: 'Cyber Assessment Framework (CAF), 4 objectives (manage / protect / detect / minimize impact)',
        coverage: 'full',
        regulationIds: ['gra.caf-objectives'],
      },
      'NJ-DGE': { position: 'Annual system integrity and security assessment via CSAU', coverage: 'full' },
      'PA-PGCB': { position: 'Annual independent security audit under Subpart L', coverage: 'full', sourceIds: ['pa-subpart-l'] },
    },
  },
  {
    id: 'topic.rng-mapping',
    topic: 'Game integrity',
    question: 'RNG + mapping (independent testing & definition)',
    cells: {
      LK: {
        position: 'Software must use "transparent algorithms audited and certified by the prescribed authority" (s.33(3)(d))',
        coverage: 'partial',
        regulationIds: ['lk.gambling-software-controls'],
      },
      MGA: { position: 'Independent testing required; specific labs accepted', coverage: 'full' },
      UKGC: { position: 'RTS requires RNG controls + live RTP monitoring as a standing condition', coverage: 'full', regulationIds: ['ukgc.live-rtp-monitoring'] },
      CGA: { position: 'GLI / similar accredited labs required', coverage: 'full', sourceIds: ['gli-19'] },
      GRA: {
        position: 'RTOS formally defines mapping, closing the biased-mapping-table loophole',
        coverage: 'full',
        regulationIds: ['gra.rtos-mapping-definition'],
      },
      'NJ-DGE': { position: 'DGE Slot Lab + GLI testing pathway', coverage: 'full' },
      'PA-PGCB': { position: 'Independent labs + PGCB approval for every game release', coverage: 'full' },
    },
  },
  {
    id: 'topic.live-rtp',
    topic: 'Game integrity',
    question: 'Continuous live RTP monitoring',
    cells: {
      LK: { position: 'Not specified; only proposed rules / stake limits reviewed at licensing (s.20)', coverage: 'none', regulationIds: ['lk.live-rtp-monitoring'] },
      MGA: { position: 'Periodic compliance audit; not continuous in statute', coverage: 'partial' },
      UKGC: { position: 'Continuous monitoring as standing licence condition', coverage: 'full', regulationIds: ['ukgc.live-rtp-monitoring'] },
      CGA: { position: 'Operator-side surveillance expected; specifics in technical standards', coverage: 'partial' },
      GRA: { position: 'RTOS regression-testing after any system fix or update', coverage: 'partial' },
      'NJ-DGE': { position: 'Continuous integrity monitoring via DGE platform integration', coverage: 'full' },
      'PA-PGCB': { position: 'Continuous monitoring under Subpart L', coverage: 'full' },
    },
  },
  {
    id: 'topic.aml-trigger',
    topic: 'AML / KYC',
    question: 'Identity-verification / large-cash trigger threshold',
    cells: {
      LK: {
        position: 'Not specified; recordkeeping required (s.59) but threshold deferred to PMLA / FTRA regulations',
        coverage: 'none',
        regulationIds: ['lk.aml-trigger-threshold', 'lk.record-keeping'],
      },
      MGA: { position: 'EU 5AML/6AML obligations + MGA player-due-diligence rules', coverage: 'full' },
      UKGC: { position: 'Risk-based; UK Money Laundering Regulations 2017 thresholds apply', coverage: 'full' },
      CGA: { position: 'ANG 4,000 (~USD 2,200)', coverage: 'full', regulationIds: ['cga.aml-trigger-ang'] },
      GRA: { position: 'GFIU-aligned thresholds + risk-based monitoring', coverage: 'full' },
      'NJ-DGE': { position: 'BSA/FinCEN thresholds + DGE casino-specific reporting', coverage: 'full' },
      'PA-PGCB': { position: 'Multi-step verification at registration before account activation', coverage: 'full', sourceIds: ['pa-subpart-l'] },
    },
  },
  {
    id: 'topic.advertising',
    topic: 'Advertising',
    question: 'Marketing / advertising oversight',
    cells: {
      LK: {
        position: 'Misleading-advertisement offence (s.54); no advertising licensing or pre-clearance regime',
        coverage: 'partial',
      },
      MGA: { position: 'Commercial Communications Regulations + ad standards', coverage: 'full' },
      UKGC: { position: 'CAP/BCAP advertising codes + UKGC sanctions for breaches', coverage: 'full' },
      CGA: { position: 'Operators must disclose licence + display CGA seal on domains', coverage: 'partial', regulationIds: ['cga.seal-deadline'] },
      GRA: {
        position: 'GOSS licence brings advertising / marketing / support services under formal oversight',
        coverage: 'full',
        regulationIds: ['gra.goss-license'],
      },
      'NJ-DGE': { position: 'DGE pre-clearance for promotional materials', coverage: 'full' },
      'PA-PGCB': { position: 'PGCB advertising rules under Subpart L', coverage: 'full' },
    },
  },
  {
    id: 'topic.individual-accountability',
    topic: 'Governance',
    question: 'Continuous individual / approved-person accountability',
    cells: {
      LK: {
        position: 'Fitness-and-propriety check at licensing (s.16(5)); no ongoing approved-person register',
        coverage: 'partial',
        regulationIds: ['lk.fitness-and-propriety'],
      },
      MGA: { position: 'Key-function notifications + ongoing supervisory contacts', coverage: 'full' },
      UKGC: { position: 'Personal Management Licences (PMLs) for senior roles', coverage: 'full' },
      CGA: { position: 'Local key-person engagement (1 by year 4, 3 by year 5)', coverage: 'full', regulationIds: ['cga.local-presence-key-persons'] },
      GRA: {
        position: 'Approved Persons / Regulated Individuals regime in Part 5 of the 2025 Act (commencement deferred)',
        coverage: 'full',
        regulationIds: ['gra.goss-license'],
      },
      'NJ-DGE': { position: 'Casino Key Employee + Casino Service Industry Enterprise licensure', coverage: 'full' },
      'PA-PGCB': { position: 'Principal / Key Employee / Gaming Employee licences under Subpart L', coverage: 'full' },
    },
  },
  {
    id: 'topic.penalties',
    topic: 'Enforcement',
    question: 'Statutory ceiling for serious operator offences',
    cells: {
      LK: {
        position: 'LKR 10,000,000 (~USD 33k) + 2 years; admin penalty in lieu capped at 1/3 of max fine',
        coverage: 'partial',
        regulationIds: ['lk.penalties-table', 'lk.administrative-penalty-cap'],
      },
      MGA: { position: 'Up to €233,000 per breach + cumulative cap', coverage: 'full' },
      UKGC: {
        position: 'No statutory cap; fines have repeatedly exceeded GBP 10 million for AML / RG breaches',
        coverage: 'full',
        sourceIds: ['ukgc-rts'],
      },
      CGA: { position: 'Penalties + suspension/revocation; framework in build-out under LOK', coverage: 'partial' },
      GRA: { position: 'Up to GBP 5 million or 10% of turnover under the 2025 Act', coverage: 'full', regulationIds: ['gra.licensing-trigger'] },
      'NJ-DGE': { position: 'USD 100,000+ per violation; revenue forfeiture available', coverage: 'full' },
      'PA-PGCB': { position: 'Up to USD 500,000 per violation under Subpart L', coverage: 'full' },
    },
  },
  {
    id: 'topic.appeals',
    topic: 'Enforcement',
    question: 'Appeals route',
    cells: {
      LK: {
        position: 'Secretary, Ministry of Finance (60 days) → Court of Appeal on questions of law (30 days)',
        coverage: 'full',
        regulationIds: ['lk.appeal-windows'],
      },
      MGA: { position: 'Administrative Review Tribunal → Court of Appeal', coverage: 'full' },
      UKGC: { position: 'First-tier Tribunal (Gambling) → Upper Tribunal', coverage: 'full' },
      CGA: { position: 'CGA appeal procedure → Court of First Instance, Curaçao', coverage: 'full' },
      GRA: { position: 'Gambling Regulation Authority Tribunal → Supreme Court of Gibraltar', coverage: 'full' },
      'NJ-DGE': { position: 'Office of Administrative Law → Appellate Division', coverage: 'full' },
      'PA-PGCB': { position: 'PGCB Hearing Officer → Commonwealth Court', coverage: 'full' },
    },
  },
  {
    id: 'topic.transparency',
    topic: 'Transparency',
    question: 'Public-facing licensee transparency tooling',
    cells: {
      LK: {
        position: 'Authority website + power to publish ratings (s.5(d)); methodology not specified',
        coverage: 'partial',
        regulationIds: ['lk.rating-system'],
      },
      MGA: { position: 'Public licensee register on mga.org.mt', coverage: 'full' },
      UKGC: { position: 'Public licensee register + enforcement decisions', coverage: 'full' },
      CGA: {
        position: 'Color-coded digital seal (green B2C / blue B2B / grey suspended / black revoked)',
        coverage: 'full',
        regulationIds: ['cga.seal-deadline'],
      },
      GRA: { position: 'Public licensee list; risk assessment reports', coverage: 'full', sourceIds: ['gib-risk-assessment-2025'] },
      'NJ-DGE': { position: 'Public licensee + game-approval registers', coverage: 'full' },
      'PA-PGCB': { position: 'Public licensee + supplier registers; quarterly enforcement reports', coverage: 'full' },
    },
  },
] as const

// =============================================================================
//  PART 2: LOOPHOLES
// =============================================================================

export const LOOPHOLES: Loophole[] = [
  {
    id: 'loop.no-fixed-capital',
    title: 'Minimum capital is not fixed in statute',
    severity: 'high',
    category: 'Licensing economics',
    whatTheActSays:
      'Section 16(1): an applicant must be a Sri Lankan-incorporated company "with a minimum capital as may be specified by the Minister by Order published in the Gazette."',
    whyItMatters:
      'Without a statutory floor, the entry threshold can be set arbitrarily low, lobbied down before each Order, or varied between applicants. Operators with thin capital cannot absorb player-fund shortfalls in a wind-down, and the Authority loses the screening function that capital requirements otherwise provide.',
    exploitVector:
      'Shell-company applicants with token capital secure a licence, accumulate player liabilities, and exit insolvent, leaving Sri Lankan players with no recovery against the entity.',
    mitigations: [
      {
        jurisdiction: 'MGA',
        approach: 'Hard-coded share-capital tiers: T1/T2 €100,000 and T3/T4 €40,000 in S.L. 583.03. The operator cannot incorporate below the threshold.',
        regulationIds: ['mga.license-types'],
      },
      {
        jurisdiction: 'CGA',
        approach: 'Application + annual + supervisory + per-UBO due diligence fees published on the CGA portal; combined first-year cost ~€47,450 before opex.',
        regulationIds: ['cga.fee-schedule'],
      },
      {
        jurisdiction: 'NJ-DGE',
        approach: 'Initial application cost exceeds USD 100,000 and is published; financial-source review covers UBOs.',
        regulationIds: ['nj.application-fee-usd'],
      },
      {
        jurisdiction: 'PA-PGCB',
        approach: 'Interactive Gaming Certificate fee USD 4,000,000 (one-time) + USD 250,000 every 5 years; statutorily fixed.',
      },
    ],
    relatedLkRegulationIds: ['lk.minimum-capital-policy'],
  },
  {
    id: 'loop.no-data-residency',
    title: 'No server-location, replication, or Tier-IV mandate',
    severity: 'critical',
    category: 'Infrastructure',
    whatTheActSays:
      'Section 18 permits digital gambling "in such manner as may be specified by Order published in the Gazette." The Act contains no analogue to MGA real-time replication, CGA Tier-IV Master Node hosting, or NJ property-level server location.',
    whyItMatters:
      'Without a data-residency rule, gameplay records, player accounts, and financial logs can be hosted anywhere, including jurisdictions whose courts will not honour Sri Lankan production orders. The Authority\'s search powers (s.60) become unenforceable for cloud-hosted evidence, and its rating system (s.5(d)) cannot reliably distinguish operators by infrastructure quality.',
    exploitVector:
      'Operator hosts production database in a jurisdiction with no MLAT relationship, suffers a "loss" of records during an investigation, and forces the Authority into months of letters rogatory before evidence reaches court.',
    mitigations: [
      {
        jurisdiction: 'MGA',
        approach: 'Where primary servers sit outside Malta, real-time replication of all gameplay, player, and financial data to a server in Maltese territory is mandatory.',
      },
      {
        jurisdiction: 'CGA',
        approach: 'Tier-IV certified server with Master Node and primary player databases on physical hardware in Curaçao; cloud allowed for front-end delivery only. 26.3 minutes/year theoretical downtime ceiling.',
        regulationIds: ['cga.tier-iv-downtime-minutes'],
      },
      {
        jurisdiction: 'NJ-DGE',
        approach: 'Servers must be located on the licensed casino property, or an alternate site approved by DGE.',
      },
      {
        jurisdiction: 'GRA',
        approach: 'Management-location licensing trigger + RTOS business-continuity rules close the offshore-server gap that the 2005 Act left open.',
        regulationIds: ['gra.licensing-trigger'],
      },
    ],
    relatedLkRegulationIds: ['lk.digital-gambling-mandate'],
  },
  {
    id: 'loop.no-geolocation',
    title: 'No geolocation / boundary enforcement for digital gambling',
    severity: 'critical',
    category: 'Infrastructure',
    whatTheActSays:
      'The Act prohibits underage participation (ss.51, 52) and unauthorized gambling (s.42), but does not require any technical geolocation control. Section 33(3)(b) only requires gambling software not to "enable participation by individuals below the legal gambling age."',
    whyItMatters:
      'The classic gap that NJ closed with N.J.A.C. 13:69O-1.2(e) in 2013: without a continuous geolocation check, a Sri Lankan-licensed operator can be used by players physically located in jurisdictions where online gambling is illegal, exposing the operator to extraterritorial enforcement and the Authority to international criticism.',
    exploitVector:
      'A Colombo-licensed digital operator markets internationally without any IP-block or device-fingerprint check; players from prohibition jurisdictions sign up and play freely.',
    mitigations: [
      {
        jurisdiction: 'NJ-DGE',
        approach: 'Geolocation at login and at intervals during the session; immediate cessation of wagering on any boundary breach. For mobile gaming, boundary is property-level (the perimeter of a specific casino hotel).',
        regulationIds: ['nj.geolocation-mandate'],
      },
      {
        jurisdiction: 'PA-PGCB',
        approach: 'Statewide perimeter enforcement under Subpart L; the same standards as NJ.',
      },
      {
        jurisdiction: 'UKGC',
        approach: 'Geo-IP and device-fingerprint checks; UK-only enforcement built into licence conditions.',
      },
    ],
    relatedLkRegulationIds: ['lk.geolocation-mandate'],
  },
  {
    id: 'loop.no-iso27001',
    title: 'No ISO/IEC 27001 (or equivalent) cybersecurity audit requirement',
    severity: 'critical',
    category: 'Cybersecurity',
    whatTheActSays:
      'Section 33(2)(b) requires a software-licence application to include "compliance certifications from accredited third-party auditors confirming the software\'s adherence to applicable standards." No standard is named, no audit cadence is fixed, no disclosure window is set.',
    whyItMatters:
      '~40% of account-takeover incidents in iGaming are linked to credential-stuffing bots (cross-cutting figure). Without a defined ISMS standard, audit cadence, and disclosure window, the Authority cannot tell whether an operator runs a current security programme or a paper one, and players have no signal that their PII / payment data is protected to a known baseline.',
    exploitVector:
      'Operator obtains a vendor certification with weak scope, suffers a breach exposing player KYC data, and discloses on its own timeline rather than a regulator-set 7-day window, eroding both player trust and the Authority\'s ability to coordinate response.',
    mitigations: [
      {
        jurisdiction: 'UKGC',
        approach: 'ISO/IEC 27001:2022 mandatory from 31 Oct 2024; major non-conformities reportable to the Commission within 7 days; accepted auditor credentials enumerated (ISO 27001 Lead Auditor, CISA, CISSP).',
        regulationIds: ['ukgc.iso27001-version', 'ukgc.major-noncon-disclosure-days', 'ukgc.auditor-credentials'],
      },
      {
        jurisdiction: 'GRA',
        approach: 'Cyber Assessment Framework (CAF). Four objectives form a continuous cycle: (A) manage security risk, (B) protect, (C) detect, (D) minimize impact. Operators must demonstrate ongoing capability across all four simultaneously.',
        regulationIds: ['gra.caf-objectives'],
      },
      {
        jurisdiction: 'NJ-DGE',
        approach: 'Annual system integrity and security assessment via the Cyber Security and Analytics Unit (CSAU), one of four Technical Services Bureau units.',
        regulationIds: ['nj.tsb-units'],
      },
      {
        jurisdiction: 'PA-PGCB',
        approach: 'Annual independent security audit under Subpart L.',
      },
    ],
    relatedLkRegulationIds: ['lk.iso27001-mandate'],
  },
  {
    id: 'loop.no-rng-mapping-defn',
    title: 'No definition of "mapping": biased mapping table loophole',
    severity: 'high',
    category: 'Game integrity',
    whatTheActSays:
      'Section 33(3)(d) requires "transparent algorithms audited and certified by the prescribed authority." The term "mapping" (the process by which an RNG output is converted to a usable game value, such as a card or a reel symbol) is undefined.',
    whyItMatters:
      'A statistically valid RNG feeding into a biased mapping table produces a biased game with a fair-looking RNG certificate. Gibraltar formalized this in RTOS specifically because it is the most common way to ship an unfair game past a naive certification.',
    exploitVector:
      'Operator certifies an RNG library off-the-shelf, then ships a custom reel-symbol mapping that under-weights high-pay symbols. The RNG audit passes; player RTP is materially below the declared theoretical RTP.',
    mitigations: [
      {
        jurisdiction: 'GRA',
        approach: 'RTOS formally defines mapping: "the process by which a scaled number derived from an RNG output is assigned a usable value within a game (e.g. raw output → Ace of Spades, or → reel-symbol position)." Mapping fairness is itself part of the test.',
        regulationIds: ['gra.rtos-mapping-definition'],
      },
      {
        jurisdiction: 'UKGC',
        approach: 'Continuous live RTP monitoring as a standing licence condition surfaces mapping bias even if it survives the static certification.',
        regulationIds: ['ukgc.live-rtp-monitoring'],
      },
      {
        jurisdiction: 'CGA',
        approach: 'GLI / similar accredited labs test both the RNG and its scaling/mapping pipeline.',
      },
      {
        jurisdiction: 'NJ-DGE',
        approach: 'DGE Slot Lab + GLI testing covers the full game pipeline before approval.',
      },
    ],
    relatedLkRegulationIds: ['lk.gambling-software-controls'],
  },
  {
    id: 'loop.no-live-rtp',
    title: 'No continuous live RTP monitoring requirement',
    severity: 'high',
    category: 'Game integrity',
    whatTheActSays:
      'Section 20 reviews proposed rules and stake limits at licensing only. The Act has no requirement for runtime RTP surveillance.',
    whyItMatters:
      'A game can pass certification and then drift, through deliberate parameter changes or undetected bugs, for months before an audit catches it. Continuous monitoring is the only way to detect this in real time.',
    exploitVector:
      'A patch is pushed to a certified game that subtly raises the house edge; without runtime monitoring the deviation is only caught at the next periodic audit, after months of player loss.',
    mitigations: [
      {
        jurisdiction: 'UKGC',
        approach: 'Live RTP monitoring as a standing licence condition: continuous surveillance for every game in production regardless of whether a discrepancy has been flagged.',
        regulationIds: ['ukgc.live-rtp-monitoring'],
      },
      {
        jurisdiction: 'GRA',
        approach: 'RTOS regression testing required after any system fix or update.',
      },
      {
        jurisdiction: 'NJ-DGE',
        approach: 'Continuous integrity monitoring via the DGE platform integration.',
      },
    ],
    relatedLkRegulationIds: ['lk.live-rtp-monitoring'],
  },
  {
    id: 'loop.no-game-design-rules',
    title: 'No operator-side responsible game-design rules',
    severity: 'high',
    category: 'Player protection',
    whatTheActSays:
      'Section 33(4)(c)(i) requires gambling software to expose user-accessible self-imposed limits on spending, time, or losses. There are no operator-side product constraints: no minimum game cycle, no autoplay ban, no false-win prohibition, no banned acceleration features, no real-time net-position display.',
    whyItMatters:
      'Player-side opt-in tools are reliably under-used. The UKGC Jan-2025 RTS package was driven by evidence that opt-in tools alone do not move problem-gambling rates; structural product changes do.',
    exploitVector:
      'Operator ships a slot with 1-second cycles, autoplay, and "celebratory" sound/light cues for returns ≤ stake. Player engagement and loss-rate both rise; player-side limits remain technically available but practically ineffective.',
    mitigations: [
      {
        jurisdiction: 'UKGC',
        approach: '5-second minimum cycle; autoplay banned; false-win cues banned; simultaneous play banned; turbo / quick spin / slam stop banned; real-time net-position must be displayed every session.',
        regulationIds: [
          'ukgc.min-cycle-seconds',
          'ukgc.autoplay-prohibition',
          'ukgc.false-win-prohibition',
          'ukgc.simultaneous-play-ban',
          'ukgc.banned-features',
          'ukgc.net-position-display',
        ],
      },
      {
        jurisdiction: 'PA-PGCB',
        approach: 'Reality checks (periodic on-screen notifications: total session time + total amount wagered) mandatory; mandatory breaks in play after extended sessions.',
        regulationIds: ['pa.reality-check-mandate'],
      },
      {
        jurisdiction: 'MGA',
        approach: 'Back-end auto log-off after 60 minutes; player terminal after 30 minutes; full-screen games must show a real-time clock and clearly accessible exit option.',
        regulationIds: ['mga.session-timeout-backend', 'mga.session-timeout-player'],
      },
    ],
    relatedLkRegulationIds: ['lk.responsible-game-design'],
  },
  {
    id: 'loop.no-self-exclusion-register',
    title: 'No central self-exclusion register',
    severity: 'high',
    category: 'Player protection',
    whatTheActSays:
      'Section 33(4)(c)(iii) requires gambling software to "identify and restrict access by individuals registered in self-exclusion programs." The Act does not establish a central register, does not assign hosting responsibility, and does not require integration across operators.',
    whyItMatters:
      'A self-exclusion that lives only on a single operator does not protect a person from a different operator. PA explicitly mandates that the integration must withstand spoofing, the same standard applied to age verification.',
    exploitVector:
      'A self-excluded player at one Sri Lankan operator opens a fresh account with a different operator; without a shared register the second operator has no way to know.',
    mitigations: [
      {
        jurisdiction: 'PA-PGCB',
        approach: 'Statewide self-exclusion database integration mandatory; must withstand spoofing, the same standard applied to age verification.',
        regulationIds: ['pa.self-exclusion-integration'],
      },
      {
        jurisdiction: 'UKGC',
        approach: 'GAMSTOP, a single national multi-operator self-exclusion scheme; operators must integrate.',
      },
      {
        jurisdiction: 'NJ-DGE',
        approach: 'Statewide self-exclusion list maintained by DGE; operators must filter against it.',
      },
    ],
    relatedLkRegulationIds: ['lk.self-exclusion-database'],
  },
  {
    id: 'loop.no-aml-threshold',
    title: 'No statutory AML / large-cash trigger threshold',
    severity: 'high',
    category: 'AML / KYC',
    whatTheActSays:
      'Section 59 requires record-keeping of "large cash transactions" and "suspicious transactions" but no threshold is fixed; the underlying PMLA / FTRA regulations supply the actual trigger.',
    whyItMatters:
      'A trigger that lives in secondary regulations can be moved without amending the Act. Operators planning compliance can\'t see the threshold from the statute, and the Authority cannot uniformly enforce it across casino, online, and junket operations.',
    exploitVector:
      'Junket operations split deposits across multiple sessions and patrons to stay under whatever threshold is in force, with no statutory backstop forcing aggregation.',
    mitigations: [
      {
        jurisdiction: 'CGA',
        approach: 'AML identity-verification trigger fixed at ANG 4,000 (~USD 2,200) directly in the LOK.',
        regulationIds: ['cga.aml-trigger-ang'],
      },
      {
        jurisdiction: 'PA-PGCB',
        approach: 'Front-loads multi-step verification at registration before account activation, removing the per-transaction threshold question.',
      },
      {
        jurisdiction: 'UKGC',
        approach: 'Risk-based but anchored to the UK Money Laundering Regulations 2017 thresholds.',
      },
    ],
    relatedLkRegulationIds: ['lk.aml-trigger-threshold', 'lk.record-keeping'],
  },
  {
    id: 'loop.weak-penalty-ceiling',
    title: 'Penalty ceilings are weak relative to digital-gambling revenues',
    severity: 'high',
    category: 'Enforcement',
    whatTheActSays:
      'Most offences cap at LKR 100,000 (~USD 320) plus 2 years\' imprisonment. The two ceilings of LKR 10 million (~USD 33,000) in ss.42 and 55 cover the worst conduct. The Director-General\'s administrative penalty is capped at one-third of the maximum fine.',
    whyItMatters:
      'A LKR 100,000 penalty for allowing underage gambling at a casino with millions of dollars in monthly revenue is not a deterrent; it is a cost of doing business. UKGC fines have repeatedly exceeded GBP 10 million for AML / responsible-gambling breaches; the gap is not in the same order of magnitude.',
    exploitVector:
      'A licensee budgets the maximum statutory fine into operating expense, treats compliance failure as a tax, and continues the conduct.',
    mitigations: [
      {
        jurisdiction: 'UKGC',
        approach: 'No statutory cap; settlements / fines have repeatedly exceeded GBP 10 million for AML / RG breaches.',
      },
      {
        jurisdiction: 'GRA',
        approach: 'Up to GBP 5 million or 10% of turnover under the 2025 Act, calibrated to operator revenue.',
      },
      {
        jurisdiction: 'NJ-DGE',
        approach: 'USD 100,000+ per violation with revenue forfeiture as an additional remedy.',
      },
      {
        jurisdiction: 'PA-PGCB',
        approach: 'Up to USD 500,000 per violation under Subpart L.',
      },
    ],
    relatedLkRegulationIds: ['lk.penalties-table', 'lk.administrative-penalty-cap'],
  },
  {
    id: 'loop.no-approved-persons',
    title: 'Fitness assessed once, not continuously (no Approved-Persons regime)',
    severity: 'medium',
    category: 'Governance',
    whatTheActSays:
      'Section 16(5) screens directors, senior managers, shareholders, key management, and beneficial owners at the licensing stage. There is no continuing register of approved individuals, no statutory duty to re-test on role change, and no individual-level enforcement track.',
    whyItMatters:
      'The risk profile of the people running a licensee changes over time. A one-shot test at licensing leaves the Authority dependent on s.28\'s "notify within one month" rule, after the change has already happened, with no ongoing veto.',
    exploitVector:
      'A licensee replaces clean directors with new ones who would not have passed the original test; the Authority finds out a month later, after damage.',
    mitigations: [
      {
        jurisdiction: 'GRA',
        approach: 'Approved Persons / Regulated Individuals regime in Part 5 of the Gambling Act 2025 strengthens individual accountability with continuous registration (commencement deferred to a separate notice).',
        regulationIds: ['gra.goss-license'],
      },
      {
        jurisdiction: 'UKGC',
        approach: 'Personal Management Licences (PMLs) for senior roles, held by the individual rather than the operator and revocable independently of the operating licence.',
      },
      {
        jurisdiction: 'CGA',
        approach: 'Local key-person engagement requirement (1 by year 4, 3 by year 5) creates ongoing supervisory contact.',
        regulationIds: ['cga.local-presence-key-persons'],
      },
    ],
    relatedLkRegulationIds: ['lk.fitness-and-propriety', 'lk.corporate-control-notify-days'],
  },
  {
    id: 'loop.advertising-no-license',
    title: 'No licensing of advertising / marketing intermediaries',
    severity: 'medium',
    category: 'Advertising',
    whatTheActSays:
      'Section 54 makes misleading advertisement an offence (max LKR 100,000 + 2 years). There is no licensing of advertising / affiliate / marketing entities, no pre-clearance regime, no register of approved promoters.',
    whyItMatters:
      'Most player acquisition runs through affiliates and marketing intermediaries. If only the operator is licensed, an entire supply chain of promoters operates unsupervised, and the operator can plausibly disclaim what its affiliates do.',
    exploitVector:
      'Affiliate networks run misleading campaigns ("guaranteed winnings", "resolves financial difficulties") with no individual accountability; the Authority can only act after the harm, and the affiliate is judgment-proof.',
    mitigations: [
      {
        jurisdiction: 'GRA',
        approach: 'GOSS (Gambling Operator Support Services) licence is mandatory for advertising, marketing, and similar support services, bringing the supply chain under formal oversight.',
        regulationIds: ['gra.goss-license'],
      },
      {
        jurisdiction: 'NJ-DGE',
        approach: 'DGE pre-clearance for promotional materials.',
      },
      {
        jurisdiction: 'UKGC',
        approach: 'CAP/BCAP advertising codes + UKGC sanctions for licensee breaches; affiliate accountability flows through the licensee.',
      },
    ],
    relatedLkRegulationIds: [],
  },
  {
    id: 'loop.no-rating-methodology',
    title: 'Rating-system methodology is undefined',
    severity: 'medium',
    category: 'Transparency',
    whatTheActSays:
      'Section 5(d) authorizes the Authority to "establish and maintain a rating system to assess the performance and compliance of the licensee and publish such ratings on the official website." Methodology, frequency, scoring, and appeal of an adverse rating are not specified.',
    whyItMatters:
      'A discretionary rating without methodology is either toothless (operators ignore it) or arbitrary (an operator with a bad rating has no clear way to remediate). Curaçao\'s color-coded seal directive shows what a workable transparency tool looks like.',
    exploitVector:
      'Rating becomes a political/commercial instrument; operators with stronger relationships score better than operators with stronger compliance.',
    mitigations: [
      {
        jurisdiction: 'CGA',
        approach: 'Color-coded digital seal directive with a defined palette (green = active B2C, blue = active B2B, grey = withdrawn/suspended, black = revoked) and a cross-domain compliance deadline (30 Jan 2026).',
        regulationIds: ['cga.seal-deadline'],
      },
      {
        jurisdiction: 'UKGC',
        approach: 'Public licensee register + published enforcement decisions: operators see how peers are treated.',
      },
      {
        jurisdiction: 'PA-PGCB',
        approach: 'Quarterly enforcement reports; supplier and operator registers public.',
      },
    ],
    relatedLkRegulationIds: ['lk.rating-system'],
  },
  {
    id: 'loop.lifecycle-audit',
    title: 'No statutory technical lifecycle audit',
    severity: 'medium',
    category: 'Cybersecurity',
    whatTheActSays:
      'The Act has no analogue to MGA\'s 60-day technical environment implementation window or its mandatory Gaming Compliance Audit within the first year. Section 33 takes a snapshot at software licensing only.',
    whyItMatters:
      'Without a defined post-launch audit point, an operator passes a static certification and then operates indefinitely until something goes wrong. Lifecycle audits catch drift early.',
    exploitVector:
      'Operator launches with audited infrastructure, scales by introducing new components / vendors, and accumulates configuration drift the Authority never inspects until a complaint surfaces.',
    mitigations: [
      {
        jurisdiction: 'MGA',
        approach: '60-day technical environment implementation window where an Approved Audit Service Provider verifies the live environment matches submitted technical documentation; Gaming Compliance Audit within the first year.',
        regulationIds: ['mga.onboarding-window-days', 'mga.gca-deadline-months'],
      },
      {
        jurisdiction: 'UKGC',
        approach: 'Annual ISO 27001:2022 audit + continuous live RTP monitoring as a standing licence condition.',
        regulationIds: ['ukgc.iso27001-version', 'ukgc.live-rtp-monitoring'],
      },
      {
        jurisdiction: 'NJ-DGE',
        approach: '"New Jersey First" 14-day evaluation window + ongoing system integrity assessments via CSAU.',
        regulationIds: ['nj.first-pathway-window-days', 'nj.tsb-units'],
      },
    ],
    relatedLkRegulationIds: [],
  },
  {
    id: 'loop.payment-channels',
    title: 'Permitted payment channels do not contemplate cryptoassets / e-money',
    severity: 'medium',
    category: 'AML / KYC',
    whatTheActSays:
      'Section 22 limits gambling-related transactions to "currency or by a debit card or credit card at a main cash desk set up by the gambling operator", subject to the FTRA and Foreign Exchange Act.',
    whyItMatters:
      'Digital gambling globally is moving toward e-money wallets, prepaid stored-value, and (controversially) cryptoassets. A literal reading of s.22 forces all cash flow through card/cash channels: workable for casino floors, awkward for online operations, and silent on cryptoassets.',
    exploitVector:
      'Operators implement cryptoasset on-ramps off-statute (treating them as "not a payment channel") and the Authority has no clear rule under which to inspect them.',
    mitigations: [
      {
        jurisdiction: 'UKGC',
        approach: 'Operators must support card-based payments + bank transfer; cryptoassets discouraged via licence conditions.',
      },
      {
        jurisdiction: 'CGA',
        approach: 'LOK enumerates payment-channel obligations; cryptoasset gateways subject to approval.',
      },
      {
        jurisdiction: 'NJ-DGE',
        approach: 'DGE approves each payment processor; cryptoasset on-ramps are separately reviewed.',
      },
    ],
    relatedLkRegulationIds: ['lk.payment-channels'],
  },
  {
    id: 'loop.sinhala-prevails',
    title: 'Sinhala text prevails: material risk for foreign operators',
    severity: 'low',
    category: 'Framework',
    whatTheActSays: 'Section 80: in the event of any inconsistency between the Sinhala and Tamil texts, the Sinhala text shall prevail. The English text has no statutory precedence.',
    whyItMatters:
      'Foreign operators and their counsel work from the English translation. Contentious interpretive questions, particularly around offences and licence conditions, turn on a Sinhala text the foreign reader cannot easily verify.',
    exploitVector:
      'A licensee is told one thing in English-language correspondence and held to a different reading of the Sinhala text in proceedings.',
    mitigations: [
      {
        jurisdiction: 'MGA',
        approach: 'Maltese law published in Maltese and English; both texts authoritative.',
      },
      {
        jurisdiction: 'CGA',
        approach: 'LOK published in Dutch; CGA portal supplies authoritative English translations of operational policies.',
      },
      {
        jurisdiction: 'GRA',
        approach: 'Gibraltar law published in English (the working language of the Authority).',
      },
    ],
    relatedLkRegulationIds: ['lk.text-precedence'],
  },
  {
    id: 'loop.junket-aml',
    title: 'Junket-operator AML detail is light',
    severity: 'medium',
    category: 'AML / KYC',
    whatTheActSays:
      'Section 35 requires a separate junket licence, financial-stability assessment, transaction recordkeeping, casino-side patron verification, and reporting of suspicious activity. There is no specific source-of-funds verification tier and no requirement that junket agreements be filed with the Authority.',
    whyItMatters:
      'Junkets are a recognised cross-border AML risk channel. Sri Lanka has positioned itself for casino tourism (junket flows will be material), yet the statutory detail is thinner than the casino-side AML obligations.',
    exploitVector:
      'A junket organiser routes high-value patrons through Colombo without source-of-funds verification calibrated to their wager size; suspicious-transaction reporting fires only after a transaction has already cleared.',
    mitigations: [
      {
        jurisdiction: 'CGA',
        approach: 'AML trigger fixed at ANG 4,000 (~USD 2,200) applies uniformly across casino and junket flows.',
        regulationIds: ['cga.aml-trigger-ang'],
      },
      {
        jurisdiction: 'NJ-DGE',
        approach: 'Junket representatives separately licensed; agreement filings required.',
      },
      {
        jurisdiction: 'UKGC',
        approach: 'Risk-based UKGC AML guidance + UK MLR 2017 obligations apply to all customer types.',
      },
    ],
    relatedLkRegulationIds: ['lk.junket-aml-controls', 'lk.aml-trigger-threshold'],
  },
  {
    id: 'loop.tipping-off',
    title: 'No reconciliation of GDPR-style transparency vs AML "tipping-off"',
    severity: 'low',
    category: 'AML / KYC',
    whatTheActSays:
      'Section 33(4)(d) requires gambling-software operators to comply with the Personal Data Protection Act, No. 9 of 2022. The Act does not address the structural conflict between PDPA / data-minimization principles and AML "tipping-off" / extensive-retention obligations.',
    whyItMatters:
      'This is a known industry-wide design problem. UK / EU operators handle it by Compliance-by-Design, embedding AML triggers, retention windows, and disclosure rules into the platform architecture itself. Sri Lanka leaves the operator to figure it out.',
    exploitVector:
      'Operator either over-discloses (breaching PDPA) or under-retains (breaching AML obligations) and has no statutory safe harbour either way.',
    mitigations: [
      {
        jurisdiction: 'GLOBAL',
        approach: 'Compliance-by-Design: privacy controls, retention policies, AML triggers, and KYC workflows are structural components of the platform, not bolt-ons. Both obligations bind; neither yields.',
        regulationIds: ['global.gdpr-aml-conflict'],
      },
      {
        jurisdiction: 'UKGC',
        approach: 'Operators must satisfy both GDPR and the UK MLR 2017; UKGC enforcement treats PDPA-style breaches as licence-relevant.',
      },
    ],
    relatedLkRegulationIds: ['lk.gambling-software-controls'],
  },
] as const

// =============================================================================
//  PART 3: PENALTY COMPARISON
// =============================================================================
//  Currency conversions are illustrative only; they use the fixed rates below
//  to keep the comparison readable. Do not treat them as up-to-the-minute FX.

export const PENALTY_FX: Record<string, number> = {
  LKR_per_USD: 300,
  GBP_per_USD: 0.8,
  EUR_per_USD: 0.92,
}

export const PENALTY_COMPARISON: PenaltyComparison[] = [
  {
    offence: 'Operating without a licence',
    jurisdiction: 'LK',
    description: 'Carrying on any gambling without a valid licence (s.42)',
    maxFineDescription: 'LKR 10,000,000',
    maxFineUsdEquivalent: Math.round(10_000_000 / 300),
    imprisonmentYears: 2,
    notes: 'Same statutory ceiling as the general catch-all offence (s.55).',
  },
  {
    offence: 'Operating without a licence',
    jurisdiction: 'UKGC',
    description: 'Provision of facilities for gambling without a licence (Gambling Act 2005, s.33)',
    maxFineDescription: 'Unlimited fine on indictment',
    imprisonmentYears: 0.5,
    notes: 'Summary: 51 weeks. Indictment: unlimited fine. UKGC enforcement settlements have repeatedly exceeded GBP 10 million.',
  },
  {
    offence: 'Operating without a licence',
    jurisdiction: 'NJ-DGE',
    description: 'Unlicensed gambling operation',
    maxFineDescription: 'USD 100,000+ per violation; revenue forfeiture',
    maxFineUsdEquivalent: 100_000,
    imprisonmentYears: 5,
    notes: 'Crime of the third / second degree depending on aggravation.',
  },
  {
    offence: 'Operating without a licence',
    jurisdiction: 'CGA',
    description: 'Carrying on unlicensed games of chance (LOK)',
    maxFineDescription: 'Penalty + suspension/revocation',
    notes: 'Schedule under build-out post-LOK commencement.',
  },
  {
    offence: 'Underage gambling, licensee allowing',
    jurisdiction: 'LK',
    description: 'Licensee allows person under 18 to gamble (s.52)',
    maxFineDescription: 'LKR 100,000',
    maxFineUsdEquivalent: Math.round(100_000 / 300),
    imprisonmentYears: 2,
    notes: 'Same cap regardless of casino revenue.',
  },
  {
    offence: 'Underage gambling, licensee allowing',
    jurisdiction: 'UKGC',
    description: 'Allowing a child or young person to gamble (Gambling Act 2005, s.46)',
    maxFineDescription: 'Up to GBP 5,000 + licence review',
    maxFineUsdEquivalent: Math.round(5_000 / 0.8),
    notes: 'UKGC has imposed multi-million-pound regulatory settlements against operators for repeated under-18 access.',
  },
  {
    offence: 'Underage gambling, licensee allowing',
    jurisdiction: 'PA-PGCB',
    description: 'Allowing minor to gamble (58 Pa. Code Subpart L)',
    maxFineDescription: 'Up to USD 500,000 per violation',
    maxFineUsdEquivalent: 500_000,
  },
  {
    offence: 'Misleading advertisement',
    jurisdiction: 'LK',
    description: 'Misleading gambling advertisement (s.54)',
    maxFineDescription: 'LKR 100,000',
    maxFineUsdEquivalent: Math.round(100_000 / 300),
    imprisonmentYears: 2,
  },
  {
    offence: 'Misleading advertisement',
    jurisdiction: 'UKGC',
    description: 'Breach of CAP/BCAP code; UKGC enforcement',
    maxFineDescription: 'No fixed cap; settlements have exceeded GBP 10 million',
  },
  {
    offence: 'Misleading advertisement',
    jurisdiction: 'GRA',
    description: 'Breach of GOSS licence terms / Gambling Act 2025',
    maxFineDescription: 'Up to GBP 5 million or 10% of turnover',
  },
  {
    offence: 'AML / financial-crime breach',
    jurisdiction: 'LK',
    description: 'PMLA / FTRA / CSTF breach feeding licence cancellation (s.30(1)(b))',
    maxFineDescription: 'PMLA penalties + GRA Act licence cancellation',
    notes: 'Director-General must consult the Financial Intelligence Unit before suspension/cancellation (s.29(2), 30(2)).',
  },
  {
    offence: 'AML / financial-crime breach',
    jurisdiction: 'UKGC',
    description: 'AML failures (UKGC enforcement)',
    maxFineDescription: 'No statutory cap; recent settlements GBP 19m, GBP 17m, GBP 14m',
  },
  {
    offence: 'AML / financial-crime breach',
    jurisdiction: 'NJ-DGE',
    description: 'AML / SAR failures',
    maxFineDescription: 'USD 100,000+ per violation; revenue forfeiture',
  },
]

export function loopholesBySeverity(): Record<LoopholeSeverity, Loophole[]> {
  const out: Record<LoopholeSeverity, Loophole[]> = { critical: [], high: [], medium: [], low: [] }
  for (const l of LOOPHOLES) out[l.severity].push(l)
  return out
}

export const COVERAGE_RANK: Record<Coverage, number> = { full: 2, partial: 1, none: 0 }
