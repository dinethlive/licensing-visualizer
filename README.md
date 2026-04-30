# iGaming Licensing & Technical Standards — Interactive Visualizer

> A 9-chapter interactive companion to the documentary script
> **"Technical Standards and Jurisdictional Licensing Frameworks in Global iGaming."**
> Every claim, threshold, deadline, and named requirement is exposed through a live
> calculator, simulator, or comparator — and every figure is loaded from a single
> changelog-first source-of-truth, so regulatory updates land in one place.

<p align="left">
  <a href="https://dinethlive.github.io/licensing-visualizer/"><img alt="Live demo" src="https://img.shields.io/badge/live-dinethlive.github.io%2Flicensing--visualizer-2ea44f?style=for-the-badge"></a>
  <a href="https://github.com/dinethlive/licensing-visualizer/actions/workflows/deploy.yml"><img alt="Deploy" src="https://img.shields.io/github/actions/workflow/status/dinethlive/licensing-visualizer/deploy.yml?branch=main&label=deploy&style=for-the-badge"></a>
  <img alt="React" src="https://img.shields.io/badge/React-18-149eca?style=for-the-badge&logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178c6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white">
</p>

## Live demo

**https://dinethlive.github.io/licensing-visualizer/**

Deployed automatically from `main` via GitHub Actions → GitHub Pages.

## Table of contents

- [Why changelog-first](#why-changelog-first)
- [Jurisdictions covered](#jurisdictions-covered)
- [Chapters](#chapters)
- [How the changelog-first model works](#how-the-changelog-first-model-works)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project layout](#project-layout)
- [Deployment](#deployment)
- [License](#license)

## Why changelog-first

Compliance moves fast. This visualizer is built so a regulatory change requires
**three small edits** — one regulation row, one changelog row, optionally one source row —
and propagates everywhere automatically: the home dashboard, the chapter visualizers,
the live `/changelog` timeline, and the source citations.

See **[HOW_TO_UPDATE.md](./HOW_TO_UPDATE.md)** for the full procedure.

## Jurisdictions covered

| Code | Jurisdiction & Regulator | Headline elements modelled |
| --- | --- | --- |
| MGA | Malta, MGA | T1–T4 license types, 60-day onboarding window, ASP audits, GCA, session timeouts, data replication |
| UKGC | United Kingdom, UKGC | RTS Jan 2025 (5-second cycle, false-win ban, autoplay ban, banned features); ISO/IEC 27001:2022 from 31 Oct 2024; live RTP monitoring |
| CGA | Curaçao, CGA / LOK | Effective 24 Dec 2024; Tier-IV server mandate; sub-licensing abolished; AML at ANG 4,000; fee schedule; 30 Jan 2026 seal deadline |
| GRA | Gibraltar, GRA | Gambling Bill 2025 management-location trigger; GOSS license; CAF four objectives; RTOS mapping definition |
| NJ‑DGE | New Jersey, DGE | TSB four units; N.J.A.C. 13:69O property-level geolocation; "New Jersey First" 14-day pathway; CSAU |
| PA‑PGCB | Pennsylvania, PGCB | Subpart L; reality checks; statewide self-exclusion; daily / weekly / monthly loss limits |
| LK | Sri Lanka, GRA | Gambling Regulatory Authority Act No. 17 of 2025 (certified 3 Sep 2025); first unified regulator; repeals horse-racing / betting-levy / casino-business acts; minimum age 18 to gamble, 21 to be employed in gambling; 30-day windows for change-of-control notification and licence renewal; capital threshold, server-location, geolocation, ISO 27001, live RTP monitoring, responsible-game-design rules, and AML cash-trigger all deferred to Gazette Orders; Sinhala text prevails on inconsistency |

## Chapters

| # | Chapter | Visualizers |
| --- | --- | --- |
| 1 | Prologue — *The Invisible Architecture* | five-philosophy comparator |
| 2 | Five Regulators | MGA license-type capital filter · Curaçao timeline · Gibraltar trigger comparator · NJ TSB diagram |
| 3 | Infrastructure | Tier-IV downtime calculator · MGA session-timeout simulator · NJ geolocation boundary |
| 4 | Fairness Engine | RTOS mapping bias demonstrator · live RTP monitor with deviation alerts |
| 5 | Player Protection | UKGC 5-second cycle enforcer · false-win detector · banned-features panel |
| 6 | Cybersecurity | UKGC ISO 27001 7-day disclosure clock · GRA CAF wheel · ATO bot simulator |
| 7 | AML / KYC / Privacy | GDPR-vs-AML conflict matrix · Curaçao KYC trigger sim · color-coded seal visualizer |
| 8 | Licensing Economics | fee comparator · Curaçao LOK total-cost calculator · "New Jersey First" parallel-review timeline |
| 9 | Convergence | three macro-trends explorer · harmonization-gap heatmap · compliance maturity scorer |

Plus a `/changelog` timeline, a `/sources` page with citation cross-references,
a side-by-side `/comparison` table, and a 40+ term glossary.

## How the changelog-first model works

When the UKGC ships a hypothetical Q3 2026 RTS amendment lifting the minimum cycle from 5 s to 6 s:

```ts
// 1. src/data/regulations.ts
{ id: 'ukgc.min-cycle-seconds', value: 6, effectiveDate: '2026-07-01',
  version: 2, lastVerified: '2026-07-01', /* ... */ }

// 2. src/data/changelog.ts
{ date: '2026-07-01', regulationId: 'ukgc.min-cycle-seconds', kind: 'updated',
  previousValue: 5, newValue: 6, reason: '…',
  sourceIds: ['ukgc-rts'], editor: 'dineth' }
```

That is it. The Chapter 5 cycle-enforcer immediately requires 6-second gaps,
the home dashboard's "Recently changed" panel highlights the edit,
the `/changelog` page renders the diff, the top-right "Live · 2026-07-01" pill updates,
and every `<RegulationBadge id="ukgc.min-cycle-seconds" />` on the page bumps to v2.

## Tech stack

- **Vite 5** + **React 18** + **TypeScript** (strict)
- **Tailwind CSS** (dark mode via `class`)
- **Recharts** for charting
- **Framer Motion** for animations
- **No backend** — everything runs in the browser; deployable to any static host

## Getting started

**Prerequisites:** Node.js 20+ and npm.

```bash
git clone https://github.com/dinethlive/licensing-visualizer.git
cd licensing-visualizer
npm install
npm run dev          # → http://localhost:5174
```

### Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check the project (`tsc -b`) and produce a production bundle in `dist/` |
| `npm run preview` | Preview the production bundle locally |
| `npm run typecheck` | Run TypeScript in `--noEmit` mode |

## Project layout

```
src/
├── App.tsx                       # hash-based router (works on any static host)
├── main.tsx
├── data/
│   ├── regulations.ts            # SINGLE SOURCE OF TRUTH for all regulatory values
│   ├── changelog.ts              # APPEND-ONLY edit log
│   ├── sources.ts                # citations
│   ├── comparison.ts             # side-by-side comparison rows
│   ├── script.ts                 # quotable chunks of the documentary script
│   └── glossary.ts               # 40+ licensing/tech terms
├── lib/
│   └── format.ts                 # currency, date, %-formatters
├── ui/                           # Card, Slider, NumberInput, Tabs, Modal, Stat, ThemeToggle
└── components/
    ├── Layout.tsx, Sidebar.tsx, Home.tsx, ChapterShell.tsx
    ├── SourceQuote.tsx           # surfaces the matching script passage
    ├── RegulationBadge.tsx       # KEY component — pulls from regulations.ts; shows version,
    │                             #   last-verified date, and full change history
    ├── GlossaryDrawer.tsx
    ├── ChangelogPage.tsx         # /changelog
    ├── SourcesPage.tsx           # /sources
    ├── ComparisonPage.tsx        # /comparison
    └── chapters/01..09           # 9 chapters, 2–3 visualizers each
```

## Deployment

The site is hosted on **GitHub Pages** at
[dinethlive.github.io/licensing-visualizer](https://dinethlive.github.io/licensing-visualizer/).

Deployment is fully automated by [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):

1. Push to `main`.
2. Workflow installs dependencies, type-checks, and builds with `BASE_PATH=/licensing-visualizer/`.
3. `dist/index.html` is duplicated to `dist/404.html` so the hash router survives deep links.
4. The `dist/` folder is published as a Pages artifact and deployed.

To self-host elsewhere, build with the appropriate base path:

```bash
BASE_PATH=/your-path/ NODE_ENV=production npm run build
# upload dist/ to any static host
```

## License

Learning project. The source documentary script remains the property of its author.
The software is provided as-is for educational use.
