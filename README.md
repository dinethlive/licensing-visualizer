# iGaming Licensing & Technical Standards, Interactive Visualizer

A 9-chapter interactive visualizer for the documentary script
**"Technical Standards and Jurisdictional Licensing Frameworks in Global iGaming"**.
Every claim, threshold, deadline, and named requirement is exposed through a live
calculator, simulator, or comparator, and every figure is loaded from a
single source-of-truth so regulatory updates land in one place.

## Why changelog-first

Compliance moves fast. This visualizer is built so a regulatory change requires
**three small edits** (one regulation row, one changelog row, optionally one source row)
and propagates everywhere automatically: the home dashboard, the chapter visualizers,
the live `/changelog` timeline, and the source citations.

See **[HOW_TO_UPDATE.md](./HOW_TO_UPDATE.md)** for the full procedure.

## Jurisdictions covered

- **Malta, MGA** (T1–T4 license types, 60-day onboarding window, ASP audits, GCA, session timeouts, data replication)
- **United Kingdom, UKGC** (RTS Jan 2025: 5-second cycle, false-win ban, autoplay ban, banned features; ISO/IEC 27001:2022 from 31 Oct 2024; live RTP monitoring)
- **Curaçao, CGA / LOK** (effective 24 Dec 2024; Tier-IV server mandate; sub-licensing abolished; AML at ANG 4,000; fee schedule; 30 Jan 2026 seal deadline)
- **Gibraltar, GRA** (Gambling Bill 2025 management-location trigger; GOSS license; CAF four objectives; RTOS mapping definition)
- **New Jersey, DGE** (TSB four units; N.J.A.C. 13:69O property-level geolocation; "New Jersey First" 14-day pathway; CSAU)
- **Pennsylvania, PGCB** (Subpart L; reality checks; statewide self-exclusion; loss limits daily/weekly/monthly)

## Chapters

1. **Prologue, The Invisible Architecture**, five-philosophy comparator
2. **Five Regulators**, MGA license-type capital filter · Curaçao timeline · Gibraltar trigger comparator · NJ TSB diagram
3. **Infrastructure**, Tier-IV downtime calculator · MGA session-timeout simulator · NJ geolocation boundary
4. **Fairness Engine**, RTOS mapping bias demonstrator · live RTP monitor with deviation alerts
5. **Player Protection**, UKGC 5-second cycle enforcer · false-win detector · banned-features panel
6. **Cybersecurity**, UKGC ISO 27001 7-day disclosure clock · GRA CAF wheel · ATO bot simulator
7. **AML / KYC / Privacy**, GDPR-vs-AML conflict matrix · Curaçao KYC trigger sim · color-coded seal visualizer
8. **Licensing Economics**, fee comparator · Curaçao LOK total-cost calculator · "New Jersey First" parallel-review timeline
9. **Convergence**, three macro-trends explorer · harmonization-gap heatmap · compliance maturity scorer

Plus a `/changelog` timeline, a `/sources` page with citation cross-references, and a 40+ term glossary.

## Tech stack

- Vite 5 + React 18 + TypeScript (strict)
- Tailwind CSS (dark mode via `class`)
- Recharts for charting
- Framer Motion for animations
- No backend, everything runs in the browser

## Running

```bash
cd licensing-visualizer
npm install
npm run dev          # http://localhost:5174
npm run build
npm run preview
npm run typecheck
```

## Project layout

```
src/
├── App.tsx                          # hash-based router
├── main.tsx
├── data/
│   ├── regulations.ts               # SINGLE SOURCE OF TRUTH for all reg values
│   ├── changelog.ts                 # APPEND-ONLY edit log
│   ├── sources.ts                   # citations
│   ├── script.ts                    # quotable chunks of the documentary script
│   └── glossary.ts                  # 40+ licensing/tech terms
├── lib/
│   └── format.ts                    # currency, date, %-formatters
├── ui/                              # Card, Slider, NumberInput, Tabs, Modal, Stat, ThemeToggle
└── components/
    ├── Layout.tsx, Sidebar.tsx, Home.tsx, ChapterShell.tsx
    ├── SourceQuote.tsx              # surfaces the matching script passage
    ├── RegulationBadge.tsx          # KEY COMPONENT, pulls from regulations.ts, shows version + last-verified + change history
    ├── GlossaryDrawer.tsx
    ├── ChangelogPage.tsx            # /changelog
    ├── SourcesPage.tsx              # /sources
    └── chapters/01..09              # 9 chapters, 2-3 visualizers each
```

## How the changelog-first model works in practice

When the UKGC ships a hypothetical Q3 2026 RTS amendment lifting the minimum cycle from 5 s to 6 s:

```ts
// 1. src/data/regulations.ts
{ id: 'ukgc.min-cycle-seconds', value: 6,  effectiveDate: '2026-07-01', version: 2, lastVerified: '2026-07-01', /* ... */ }

// 2. src/data/changelog.ts
{ date: '2026-07-01', regulationId: 'ukgc.min-cycle-seconds', kind: 'updated',
  previousValue: 5, newValue: 6, reason: '…', sourceIds: ['ukgc-rts'], editor: 'dineth' }
```

That's it. The Chapter 5 cycle-enforcer immediately requires 6-second gaps, the home dashboard's
"Recently changed" panel highlights the edit, the `/changelog` page renders the diff, the
top-right "Live · 2026-07-01" pill updates, and every `<RegulationBadge id="ukgc.min-cycle-seconds" />`
on the page bumps to v2.

## License

Learning project. The source documentary script remains the property of its author.
The software is provided as-is for educational use.
