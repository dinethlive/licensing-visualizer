// All citations live here. Regulations reference these by ID.
// When a citation goes stale or is updated, change one entry.
//
// Each source carries:
//   - url           : deep link to the authoritative document where possible
//                    (regulator page, statute PDF, official-journal text)
//   - publishedDate : when the source itself was issued / amended
//   - accessedDate  : when this visualizer last verified the URL was live
//                    and the figure was correct. Bump on each re-verification.

export interface Source {
  id: string
  title: string
  publisher: string
  url?: string
  publishedDate?: string
  accessedDate?: string
  notes?: string
}

export const SOURCES: Source[] = [
  // =========================================================================
  //  Documentary script (the v1 source)
  // =========================================================================
  {
    id: 'script-2026',
    title: 'Technical Standards and Jurisdictional Licensing Frameworks in Global iGaming: A Comparative Regulatory Analysis',
    publisher: 'Internal research note (compiled documentary script)',
    publishedDate: '2026-04-30',
    accessedDate: '2026-04-30',
    notes: 'Primary narrative source for v1.0.0. From v1.1.0, every regulation also carries a regulator-side deep link verified via web search.',
  },

  // =========================================================================
  //  Malta, MGA
  // =========================================================================
  {
    id: 'mga-licence-fees-regs',
    title: 'Gaming Licence Fees Regulations (S.L. 583.03)',
    publisher: 'Government of Malta / Malta Gaming Authority',
    url: 'https://legislation.mt/eli/sl/583.3/eng',
    publishedDate: '2018-08-01',
    accessedDate: '2026-04-30',
  },
  {
    id: 'mga-fees-guidance',
    title: 'Guidance Note: Licence Fees and Taxation',
    publisher: 'Malta Gaming Authority',
    url: 'https://www.mga.org.mt/app/uploads/Guidance-Note-Licence-Fees-and-Taxation-1.pdf',
    accessedDate: '2026-04-30',
  },
  {
    id: 'mga-capital-policy',
    title: 'Capital Requirements Policy',
    publisher: 'Malta Gaming Authority',
    url: 'https://www.mga.org.mt/app/uploads/Capital-Requirements-Policy.pdf',
    accessedDate: '2026-04-30',
    notes: 'Authoritative MGA document for share-capital tiers across T1/T2 (€100k) and T3/T4 (€40k).',
  },
  {
    id: 'mga-fees-amendments',
    title: 'Amendments to the Gaming Licence Fees Regulations of 2018',
    publisher: 'Malta Gaming Authority',
    url: 'https://www.mga.org.mt/mga-amendments-to-the-gaming-licence-fees-regulations-of-2018/',
    accessedDate: '2026-04-30',
  },
  {
    id: 'mga-system-audit',
    title: 'System Audit Checklist & Gaming Compliance Audit Directive',
    publisher: 'Malta Gaming Authority',
    url: 'https://www.mga.org.mt/licensee-hub/',
    accessedDate: '2026-04-30',
    notes: 'Audit checklist itself is distributed via the licensee hub rather than a public PDF.',
  },

  // =========================================================================
  //  United Kingdom, UKGC
  // =========================================================================
  {
    id: 'ukgc-rts',
    title: 'Remote Gambling and Software Technical Standards (RTS)',
    publisher: 'UK Gambling Commission',
    url: 'https://www.gamblingcommission.gov.uk/licensees-and-businesses/guide/remote-gambling-and-software-technical-standards',
    accessedDate: '2026-04-30',
  },
  {
    id: 'ukgc-rts-jan2025-updates',
    title: 'Updates to RTS effective 17 January 2025',
    publisher: 'UK Gambling Commission',
    url: 'https://www.gamblingcommission.gov.uk/licensees-and-businesses/guide/page/updates-to-rts-effective-17-january-2025',
    publishedDate: '2025-01-17',
    accessedDate: '2026-04-30',
    notes: 'Codifies RTS 14E (no spin-stop / slam-stop), RTS 14F (no celebratory cues for returns ≤ stake), RTS 14G (5-second minimum cycle), and the autoplay prohibition extended from slots to all online casino games.',
  },
  {
    id: 'ukgc-rts-14',
    title: 'RTS 14, Responsible Product Design',
    publisher: 'UK Gambling Commission',
    url: 'https://www.gamblingcommission.gov.uk/standards/remote-gambling-and-software-technical-standards/rts-14-responsible-product-design',
    accessedDate: '2026-04-30',
  },
  {
    id: 'ukgc-rts-4-security',
    title: 'RTS Section 4, Security Requirements',
    publisher: 'UK Gambling Commission',
    url: 'https://www.gamblingcommission.gov.uk/standards/remote-gambling-and-software-technical-standards/4-remote-gambling-and-software-technical-standards-rts-security-requirements',
    accessedDate: '2026-04-30',
  },
  {
    id: 'ukgc-iso27001-2022',
    title: 'Testing Strategy Section 7, Third-Party Annual Security Audit (ISO/IEC 27001:2022)',
    publisher: 'UK Gambling Commission',
    url: 'https://www.gamblingcommission.gov.uk/strategy/testing-strategy-for-compliance-with-remote-gambling-and-software-technical/7-third-party-annual-security-audit',
    publishedDate: '2024-10-31',
    accessedDate: '2026-04-30',
    notes: 'All security audits from 1 Nov 2024 must be conducted against ISO/IEC 27001:2022 controls. Last date for audits against the 2013 edition was 31 Oct 2024.',
  },
  {
    id: 'ukgc-tech-standards-security',
    title: 'Technical Standards: Security Requirements',
    publisher: 'UK Gambling Commission',
    url: 'https://www.gamblingcommission.gov.uk/licensees-and-businesses/page/technical-standards-security-requirements',
    accessedDate: '2026-04-30',
  },

  // =========================================================================
  //  Curaçao, CGA
  // =========================================================================
  {
    id: 'curacao-lok',
    title: 'Landsverordening op de Kansspelen (LOK) - National Ordinance on Games of Chance',
    publisher: 'Government of Curaçao / Curaçao Gaming Authority',
    url: 'https://www.cga.cw/regulation/online-gaming',
    publishedDate: '2024-12-24',
    accessedDate: '2026-04-30',
    notes: 'Parliament approved 17 Dec 2024 (13 in favor, 6 against); commenced 24 Dec 2024. Replaces the National Ordinance on Offshore Games of Hazard (NOOGH). NOOGH licenses remain valid until 24 June 2025 with one 6-month extension option.',
  },
  {
    id: 'curacao-cga-portal',
    title: 'CGA License Management Portal',
    publisher: 'Curaçao Gaming Authority',
    url: 'https://portal.cga.cw/',
    accessedDate: '2026-04-30',
  },
  {
    id: 'curacao-fee-schedule',
    title: 'CGA Fee Schedule (LOK implementation)',
    publisher: 'Curaçao Gaming Authority',
    url: 'https://portal.cga.cw/page/certification_policy',
    publishedDate: '2024-12-24',
    accessedDate: '2026-04-30',
    notes: 'Application €4,592. B2C annual €47,450 (€24,490 license + €22,960 supervisory). B2B €4,592 application + €24,490 supervisory. Per-person UBO due diligence €150-€260. Invoices due within 14 days; failure to settle within 71 days triggers license revocation.',
  },
  {
    id: 'curacao-seal-directive',
    title: 'CGA Certification Policy / digital seal directive',
    publisher: 'Curaçao Gaming Authority',
    url: 'https://portal.cga.cw/page/certification_policy',
    publishedDate: '2026-01-20',
    accessedDate: '2026-04-30',
    notes: 'Color codes: green = active B2C, blue = active B2B, grey = withdrawn or suspended, black = revoked. Orange seals being phased out. Cross-domain update deadline: 30 January 2026.',
  },

  // =========================================================================
  //  Gibraltar, GRA
  // =========================================================================
  {
    id: 'gib-act-2005',
    title: 'Gambling Act 2005',
    publisher: 'Government of Gibraltar',
    url: 'https://www.gibraltarlaws.gov.gi/legislations/gambling-act-2005-454',
    publishedDate: '2005-09-15',
    accessedDate: '2026-04-30',
    notes: 'Replaced by the Gambling Act 2025 from 1 April 2026 (except Part 5, the Approved Persons regime, deferred to a separate commencement notice).',
  },
  {
    id: 'gib-bill-2025',
    title: 'Gambling Bill 2025 [B. 13/25]',
    publisher: 'Parliament of Gibraltar',
    url: 'https://www.parliament.gi/uploads/contents/bills/2025/2025B13.pdf',
    publishedDate: '2025-12-15',
    accessedDate: '2026-04-30',
    notes: 'Assented 23 March 2026; most provisions in force 1 April 2026. Introduces the management-location licensing trigger and the GOSS license category. Part 5 (Approved Persons / Regulated Individuals) commencement deferred.',
  },
  {
    id: 'gib-rtos',
    title: 'Remote Technical and Operating Standards (RTOS)',
    publisher: 'Gibraltar Regulatory Authority',
    url: 'https://www.gra.gi/',
    accessedDate: '2026-04-30',
  },
  {
    id: 'gib-caf',
    title: 'Cyber Assessment Framework (CAF)',
    publisher: 'Gibraltar Regulatory Authority',
    url: 'https://www.gra.gi/cyber-security-compliance/caf',
    accessedDate: '2026-04-30',
    notes: 'Four objectives (A: manage risk · B: protect · C: detect · D: minimize impact) and 14 principles. Based on the UK NCSC CAF, tailored per OES sector.',
  },
  {
    id: 'gib-risk-assessment-2025',
    title: 'Risk Assessment of the Gambling Industry in Gibraltar - 2025 Update',
    publisher: 'Government of Gibraltar',
    url: 'https://www.gibraltar.gov.gi/uploads/Gambling/Documents/Risk%20Assessment%20of%20the%20Gambling%20Industry%20in%20Gibraltar%20-%202025%20Update.pdf',
    publishedDate: '2025-01-01',
    accessedDate: '2026-04-30',
  },

  // =========================================================================
  //  New Jersey, DGE
  // =========================================================================
  {
    id: 'nj-njac-13-69o',
    title: 'N.J.A.C. 13:69O, Internet and Mobile Gaming (chapter PDF)',
    publisher: 'New Jersey Office of the Attorney General (DGE)',
    url: 'https://www.nj.gov/oag/ge/docs/Regulations/CHAPTER69O.pdf',
    publishedDate: '2013-10-21',
    accessedDate: '2026-04-30',
  },
  {
    id: 'nj-njac-13-69o-1-2',
    title: 'N.J.A.C. 13:69O-1.2, General Requirements (geolocation in subsection (e))',
    publisher: 'Cornell Law / NJ DGE',
    url: 'https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-13-69O-1-2',
    accessedDate: '2026-04-30',
  },
  {
    id: 'nj-tsb',
    title: 'DGE Slot Laboratory / Technical Services Bureau',
    publisher: 'New Jersey Office of the Attorney General',
    url: 'https://www.njoag.gov/about/divisions-and-offices/division-of-gaming-enforcement-home/slot-laboratory-tsb/',
    accessedDate: '2026-04-30',
    notes: 'Four-unit TSB: Engineering, CSAU, ITIU, QA.',
  },
  {
    id: 'nj-dge-home',
    title: 'New Jersey Division of Gaming Enforcement',
    publisher: 'New Jersey Office of the Attorney General',
    url: 'https://www.njoag.gov/about/divisions-and-offices/division-of-gaming-enforcement-home/',
    accessedDate: '2026-04-30',
  },
  {
    id: 'nj-first-pathway',
    title: 'N.J.A.C. 13:69E-1.28S, "New Jersey First" Submissions and Approvals',
    publisher: 'Cornell Law / NJ DGE',
    url: 'https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-13-69E-1-28S',
    accessedDate: '2026-04-30',
    notes: 'DGE gives priority to NJ-First submissions and may issue field-trial approval if review is incomplete by day 14.',
  },

  // =========================================================================
  //  Pennsylvania, PGCB
  // =========================================================================
  {
    id: 'pa-subpart-l',
    title: '58 Pa. Code Subpart L, Interactive Gaming',
    publisher: 'Pennsylvania Code & Bulletin',
    url: 'https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/058/subpartVIILtoc.html',
    accessedDate: '2026-04-30',
    notes: 'Chapters 801a-815a covering certificates, operators, suppliers, employees, testing/controls, accounting, player accounts, advertising, problem gambling, and self-exclusion.',
  },
  {
    id: 'pa-pgcb-home',
    title: 'Pennsylvania Gaming Control Board',
    publisher: 'Commonwealth of Pennsylvania',
    url: 'https://gamingcontrolboard.pa.gov/',
    accessedDate: '2026-04-30',
  },

  // =========================================================================
  //  Sri Lanka, GRA (Gambling Regulatory Authority Act, No. 17 of 2025)
  // =========================================================================
  {
    id: 'lk-gra-act-2025',
    title: 'Gambling Regulatory Authority Act, No. 17 of 2025',
    publisher: 'Parliament of the Democratic Socialist Republic of Sri Lanka',
    url: 'https://www.parliament.lk/uploads/acts/gbills/english/6393.pdf',
    publishedDate: '2025-09-04',
    accessedDate: '2026-04-30',
    notes: 'Certified 03 Sep 2025; published as a Supplement to Part II of the Gazette on 04 Sep 2025. Establishes the Gambling Regulatory Authority (GRA) of Sri Lanka and repeals (i) the Betting on Horse-Racing Ordinance (Chapter 44), (ii) the Gaming Ordinance (Chapter 46), and (iii) the Casino Business (Regulation) Act, No. 17 of 2010. Most provisions come into force on a date the Minister appoints by Gazette Order ("the appointed date").',
  },
  {
    id: 'lk-pmla-2006',
    title: 'Prevention of Money Laundering Act, No. 5 of 2006',
    publisher: 'Parliament of Sri Lanka',
    url: 'https://www.documents.gov.lk/files/act/2006/3/05-2006_E.pdf',
    accessedDate: '2026-04-30',
    notes: 'Cross-referenced by the GRA Act for AML obligations imposed on licensees.',
  },
  {
    id: 'lk-ftra-2006',
    title: 'Financial Transactions Reporting Act, No. 6 of 2006',
    publisher: 'Parliament of Sri Lanka',
    url: 'https://fiusrilanka.gov.lk/docs/Acts/FTRA_E.pdf',
    accessedDate: '2026-04-30',
    notes: 'Establishes the Financial Intelligence Unit (FIU). Suspicious-transaction reporting and AML supervisory powers under the GRA Act run through the FIU.',
  },
  {
    id: 'lk-pdpa-2022',
    title: 'Personal Data Protection Act, No. 9 of 2022',
    publisher: 'Parliament of Sri Lanka',
    url: 'https://www.documents.gov.lk/files/act/2022/3/09-2022_E.pdf',
    publishedDate: '2022-03-19',
    accessedDate: '2026-04-30',
    notes: 'Sri Lanka\'s general data-protection statute. Section 33 of the GRA Act requires gambling-software developers and distributors to comply with the PDPA.',
  },
  {
    id: 'lk-bgla-1988',
    title: 'Betting and Gaming Levy Act, No. 40 of 1988',
    publisher: 'Parliament of Sri Lanka',
    url: 'https://www.ird.gov.lk/en/publications/Betting%20and%20Gaming%20Levy%20Acts/Betting%20and%20Gaming%20Levy%20Act%20No%2040%20of%201988(English).pdf',
    accessedDate: '2026-04-30',
    notes: 'Tax statute (15% gross gaming revenue levy plus annual licence levy) preserved alongside the GRA Act. Continues to apply to licensees in parallel.',
  },

  // =========================================================================
  //  International standards
  // =========================================================================
  {
    id: 'iso27001-2022',
    title: 'ISO/IEC 27001:2022, Information Security Management Systems',
    publisher: 'International Organization for Standardization',
    url: 'https://www.iso.org/standard/27001',
    publishedDate: '2022-10-25',
    accessedDate: '2026-04-30',
  },
  {
    id: 'gli-19',
    title: 'GLI-19 v3.0, Standards for Interactive Gaming Systems',
    publisher: 'Gaming Laboratories International',
    url: 'https://gaminglabs.com/wp-content/uploads/2024/06/GLI-19-Interactive-Gaming-Systems-v3.0.pdf',
    publishedDate: '2020-07-01',
    accessedDate: '2026-04-30',
    notes: 'V3.0 released July 2020. Free download from gaminglabs.com.',
  },
  {
    id: 'gdpr',
    title: 'Regulation (EU) 2016/679 (GDPR), consolidated text',
    publisher: 'European Union (EUR-Lex)',
    url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj',
    publishedDate: '2018-05-25',
    accessedDate: '2026-04-30',
  },
] as const

export function getSource(id: string): Source | undefined {
  return SOURCES.find((s) => s.id === id)
}
