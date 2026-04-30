// Quotable extracts from the documentary script, by chapter and section.
// Used by SourceQuote to surface the original passage alongside each visualizer.

export interface ScriptChunk {
  chapter: number
  section: string
  title: string
  text: string
}

export const CHAPTERS = [
  { id: 1, slug: 'prologue',      title: 'Prologue',                 subtitle: 'The Invisible Architecture' },
  { id: 2, slug: 'regulators',    title: 'Five Regulators',          subtitle: 'Five Jurisdictions, Five Philosophies' },
  { id: 3, slug: 'infrastructure',title: 'Infrastructure',           subtitle: 'Data Sovereignty, Tier-IV, Geolocation' },
  { id: 4, slug: 'fairness',      title: 'Fairness Engine',          subtitle: 'RNGs, Mapping, RTP' },
  { id: 5, slug: 'protection',    title: 'Player Protection',        subtitle: 'Responsible Game Design' },
  { id: 6, slug: 'cybersecurity', title: 'Cybersecurity',            subtitle: 'ISMS, ISO 27001, ATO' },
  { id: 7, slug: 'aml-kyc',       title: 'AML / KYC / Privacy',      subtitle: 'The Compliance Paradox' },
  { id: 8, slug: 'economics',     title: 'Licensing Economics',      subtitle: 'The Price of Entry' },
  { id: 9, slug: 'convergence',   title: 'Convergence',              subtitle: 'The Future of Global iGaming' },
] as const

export const SCRIPT_CHUNKS: ScriptChunk[] = [
  // ---------- Chapter 1 ----------
  {
    chapter: 1, section: '1.1', title: 'Opening Narration',
    text: `The global iGaming sector generates hundreds of billions of dollars in annual revenue. Behind each spin, hand, or in-play wager sits a dense, largely invisible matrix of technical mandates, legal obligations, and jurisdictional standards. These rules do not appear on a casino's homepage. Yet they determine whether an operator earns a license or loses one, whether a platform survives a regulatory audit or faces suspension, and whether the player on the other side of the screen is protected or exposed.`,
  },

  // ---------- Chapter 2 ----------
  {
    chapter: 2, section: '2.1', title: 'Malta Gaming Authority (MGA)',
    text: `The MGA issues four distinct license types. Type 1: games of chance against the house (slots, roulette). Type 2: chance against the house based on external events (fixed-odds sports betting). Type 3: peer-to-peer games (poker). Type 4: controlled gaming services (B2B platform/software). Capital requirements are tiered: T1/T2 require €100,000; T3/T4 require €40,000. Once an applicant reaches the final stages, the MGA grants a 60-day window to implement the technical environment; an Approved Audit Service Provider then verifies live-environment fidelity. A Gaming Compliance Audit must occur within the first year, and the MGA reserves ad-hoc audit authority based on perceived risk.`,
  },
  {
    chapter: 2, section: '2.2', title: 'United Kingdom Gambling Commission (UKGC)',
    text: `The UKGC operates under a dual mandate: consumer protection and technical security. Its instrument is the Remote Technical Standards, mandatory conditions for all remote gambling and software license holders. The RTS is anchored to ISO/IEC 27001 rather than bespoke local checklists. The Commission also exercises ongoing authority over game design itself.`,
  },
  {
    chapter: 2, section: '2.3', title: 'Curaçao\'s Revolution: From Master Licenses to the LOK',
    text: `Curaçao's previous model, a small number of master license holders authorized to issue sub-licenses, was dismantled on December 24, 2024 when the LOK came into force. All licensing authority transfers to the CGA; sub-licensing is abolished entirely. Operators must incorporate locally, maintain a physical office, and engage local personnel: at least one additional key person within 4 years, three within 5 years.`,
  },
  {
    chapter: 2, section: '2.4', title: 'Gibraltar\'s Modernization',
    text: `Gibraltar replaces its Gambling Act 2005 with the Gambling Bill 2025. The licensing trigger shifts from gaming-equipment-in-Gibraltar to organization/management-in-Gibraltar, closing the offshore-server gap. A new GOSS license category brings advertising and marketing under formal oversight. Individual accountability is strengthened through the Approved Persons regime.`,
  },
  {
    chapter: 2, section: '2.5', title: 'New Jersey & Pennsylvania',
    text: `The NJ DGE manages technical oversight through a four-unit Technical Services Bureau: Engineering, CSAU, ITIU, and QA. The Pennsylvania PGCB operates as an independent state agency with jurisdiction over land-based, online, sports, and fantasy. Its technical standards are codified under Subpart L. Together NJ and PA represent the most prescriptive technical enforcement model in global iGaming.`,
  },

  // ---------- Chapter 3 ----------
  {
    chapter: 3, section: '3.1', title: 'MGA Data Replication Mandate',
    text: `Where primary servers are hosted outside Malta, the MGA requires real-time replication of all gameplay records, player data, and financial transactions to a replication server inside Maltese territory. Back-end systems auto log-off after 60 minutes; player terminals after 30 minutes. Player passwords must be one-way hashed; sensitive financial data encrypted; all changes to player, financial, and game-outcome data must be logged. Full-screen games must display a real-time clock and a clearly accessible exit option.`,
  },
  {
    chapter: 3, section: '3.2', title: 'Curaçao Tier-IV Server Requirement',
    text: `Operators must maintain a Tier-IV certified server in Curaçao, fault-tolerant architecture guaranteeing a theoretical maximum of 26.3 minutes of downtime per year. The Master Node and primary player databases must sit on physical hardware in Curaçao; cloud may be used for front-end delivery only.`,
  },
  {
    chapter: 3, section: '3.3', title: 'New Jersey Geolocation Enforcement',
    text: `Under N.J.A.C. 13:69O-1.2(e), all internet/mobile gaming systems must employ geolocation at login and at specified intervals. If the patron moves outside the authorized geographic boundary the system must immediately cease all wagering activity. For mobile gaming the boundary is property-level: the perimeter of a specific licensed casino hotel.`,
  },
  {
    chapter: 3, section: '3.4', title: 'Gibraltar Management-Location Trigger',
    text: `An operator whose management function is based in Gibraltar requires a Gibraltar license, irrespective of where servers are hosted or players are located. RTOS reinforces business continuity and mandates regression testing after any system fix or update.`,
  },

  // ---------- Chapter 4 ----------
  {
    chapter: 4, section: '4.1', title: 'Universal RNG Requirements',
    text: `RNGs are independently tested against three properties: statistical randomness (uniform distribution), period length (astronomically large before sequence repeat), and unpredictability. Curaçao requires testing by accredited laboratories such as GLI. RNGs must fail safely, recovering to a known secure state without losing the record of the game's progress at the point of failure.`,
  },
  {
    chapter: 4, section: '4.2', title: 'Mapping (Gibraltar RTOS)',
    text: `Gibraltar's RTOS formally defines "mapping" as the process by which a scaled number derived from an RNG output is assigned a usable value within a game, converting raw output into the Ace of Spades, or into a specific symbol position. A statistically valid RNG feeding into a biased mapping table produces a biased game; the mapping process itself must be demonstrably fair.`,
  },
  {
    chapter: 4, section: '4.3', title: 'RTP, Live Monitoring',
    text: `The UKGC mandates live RTP monitoring as a standing license condition, continuous surveillance for every game in production, regardless of whether a discrepancy has been flagged. Significant deviation from declared theoretical RTP triggers immediate investigation and system audit, but the monitoring obligation itself is not contingent on deviation occurring.`,
  },

  // ---------- Chapter 5 ----------
  {
    chapter: 5, section: '5.1', title: 'UKGC January 2025 Redesign Mandate',
    text: `On January 17, 2025 sweeping RTS changes came into force, extending restrictive design rules previously applied only to slots to all online casino products. Centrepiece: a 5-second minimum interval between consecutive game cycles. Autoplay is prohibited; celebratory cues for returns ≤ stake (false wins) are prohibited; simultaneous play is banned; a real-time net-position figure must be displayed every session. Turbo, quick spin, and slam stop are prohibited.`,
  },
  {
    chapter: 5, section: '5.2', title: 'Pennsylvania Player-Protection Ecosystem',
    text: `Reality checks (periodic on-screen notifications: total session time + total amount wagered) are mandatory. Mandatory breaks in play are required after extended sessions. Statewide self-exclusion database integration is mandated, and must withstand spoofing, the same standard applied to age verification. Loss limits available daily, weekly, and monthly. Operators must deploy data-analytics tools capable of identifying problematic gambling patterns.`,
  },

  // ---------- Chapter 6 ----------
  {
    chapter: 6, section: '6.1', title: 'UKGC ISO/IEC 27001:2022 Framework',
    text: `Effective October 31, 2024, all security audits under the UKGC must comply with ISO/IEC 27001:2022. The annual audit covers "critical gambling systems", any electronic system that generates random numbers, processes bets, stores results, or manages sensitive customer data. Accepted credentials: ISO 27001 Lead Auditor, CISA, CISSP. Major non-conformities must be reported to the Commission within 7 days.`,
  },
  {
    chapter: 6, section: '6.2', title: 'New Jersey CSAU',
    text: `The DGE's Cyber Security and Analytics Unit employs advanced analytics to detect fraudulent and malicious activity, and maintains active coordination with federal and international law enforcement. Every operator is subject to an annual system integrity and security assessment covering vulnerabilities, penetration testing, and general security controls.`,
  },
  {
    chapter: 6, section: '6.3', title: 'Gibraltar Cyber Assessment Framework',
    text: `Four objectives form a continuous cycle: (A) manage security risk; (B) protect against cyber-attacks; (C) detect security events; (D) minimize impact of incidents. Operators must demonstrate ongoing capability across all four simultaneously.`,
  },
  {
    chapter: 6, section: '6.4', title: 'ATO Threat',
    text: `Account Takeover attacks are the most operationally prevalent cyber threat. Approximately 40% of ATO incidents in iGaming are linked to automated bot activity (credential-stuffing). MFA and biometric verification are now the expected baseline.`,
  },

  // ---------- Chapter 7 ----------
  {
    chapter: 7, section: '7.1', title: 'GDPR vs AML Conflict',
    text: `GDPR principles: transparency and data minimization. AML obligations: extensive collection and long retention. AML "tipping off" prohibitions directly contradict GDPR's transparency requirement. Both obligations are binding; neither yields. Compliance-by-Design is the architectural response.`,
  },
  {
    chapter: 7, section: '7.2', title: 'Jurisdictional KYC',
    text: `Curaçao LOK sets an AML trigger at ANG 4,000 (~USD 2,200), at which point operators must initiate identity verification including ID, proof of address, and source-of-funds. Pennsylvania front-loads multi-step verification at registration, before account activation. The CGA also introduced a green/blue color-coded digital seal system displayed on operator domains, with the cross-domain update deadline set to January 30, 2026.`,
  },
  {
    chapter: 7, section: '7.3', title: 'Compliance-by-Design',
    text: `Privacy controls, data retention policies, AML triggers, and KYC workflows are not layered onto an existing system, they are structural components of the platform itself. The modular platform strategy lets operators localize specific functions (e.g. Ontario-based player data) while maintaining a central game engine in another jurisdiction.`,
  },

  // ---------- Chapter 8 ----------
  {
    chapter: 8, section: '8.1', title: 'Fee Structure Comparison',
    text: `Curaçao LOK: €4,592 application; €24,490 annual licence; €22,960 annual supervisory; €150–€260 per-person due diligence. New Jersey: initial application costs exceed $100,000; annual fees variable and uniformly described as high. Malta thresholds are at capitalization: T1/T2 €100,000 share capital; T3/T4 €40,000.`,
  },
  {
    chapter: 8, section: '8.2', title: 'End of the "Offshore Discount"',
    text: `Curaçao's two-decade positioning as a low-cost, operationally flexible licensing destination has been structurally dismantled by the LOK. License + supervisory fees alone reach €47,450 before operational expenditure. Increased fees fund increased supervisory capacity; supervisory capacity is the mechanism through which the CGA establishes credibility as a serious regulatory authority.`,
  },
  {
    chapter: 8, section: '8.3', title: 'NJ "New Jersey First" Pathway',
    text: `Manufacturers may submit gaming equipment and software simultaneously to the DGE and to independent labs. A 14-day evaluation window is initiated; if the DGE has not completed review within that window, it may grant field trial approval, authorizing live deployment while full technical review continues. All software from the operating system through to critical game logic remains subject to full technical vetting.`,
  },

  // ---------- Chapter 9 ----------
  {
    chapter: 9, section: '9.1', title: 'Three Converging Macro-Trends',
    text: `(1) Centralization, offshore minimal-oversight licensing yielding to government-regulated frameworks with substantive local presence. (2) Standardization, information security converging on internationally recognized benchmarks, most visibly ISO/IEC 27001. (3) Technologization, AI fraud detection, real-time monitoring, MFA and biometrics now the expected baseline rather than premium capabilities.`,
  },
  {
    chapter: 9, section: '9.2', title: 'The Harmonization Gap',
    text: `Convergence toward common principles is not harmonization of specific requirements. Universal principles (RNG certification, fund segregation, AML, identity verification) are now consistent across the MGA, UKGC, Curaçao, Gibraltar, NJ, and PA. The implementation details that sit beneath those principles diverge sharply and show no current trajectory toward alignment.`,
  },
  {
    chapter: 9, section: '9.3', title: 'Compliance as a Strategic Discipline',
    text: `Compliance is becoming a sophisticated, data-driven discipline at the operational core of the business. RegTech and Compliance-by-Design embed jurisdictional requirements into platform infrastructure, automate audit-trail generation, and use real-time monitoring data to maintain a continuous rather than periodic view of compliance status.`,
  },
]

export function getChunk(chapter: number, section: string): ScriptChunk | undefined {
  return SCRIPT_CHUNKS.find((c) => c.chapter === chapter && c.section === section)
}
