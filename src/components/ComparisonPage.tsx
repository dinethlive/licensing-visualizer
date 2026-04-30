import { useMemo, useState } from 'react'
import {
  MATRIX_TOPICS,
  LOOPHOLES,
  PENALTY_COMPARISON,
  loopholesBySeverity,
  COVERAGE_RANK,
  type Coverage,
  type LoopholeSeverity,
  type MatrixCell,
} from '../data/comparison'
import {
  JURISDICTIONS,
  REGULATIONS,
  getRegulation,
  type Jurisdiction,
} from '../data/regulations'
import { getSource } from '../data/sources'

const NON_LK_JURISDICTIONS: Jurisdiction[] = ['MGA', 'UKGC', 'CGA', 'GRA', 'NJ-DGE', 'PA-PGCB']
const ALL_JUR: Jurisdiction[] = ['LK', ...NON_LK_JURISDICTIONS]

const COVERAGE_BADGE: Record<Coverage, string> = {
  full: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  partial: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  none: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
}

const COVERAGE_DOT: Record<Coverage, string> = {
  full: 'bg-emerald-500',
  partial: 'bg-amber-500',
  none: 'bg-rose-500',
}

const COVERAGE_LABEL: Record<Coverage, string> = {
  full: 'covered',
  partial: 'partial',
  none: 'gap',
}

const SEVERITY_BADGE: Record<LoopholeSeverity, string> = {
  critical: 'bg-rose-600/15 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500/30',
  high: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
  medium: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  low: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
}

const SEVERITY_ORDER: LoopholeSeverity[] = ['critical', 'high', 'medium', 'low']

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function ComparisonPage() {
  const [coverageFilter, setCoverageFilter] = useState<Coverage | 'all'>('all')
  const [topicFilter, setTopicFilter] = useState<string>('all')
  const [activeLoopId, setActiveLoopId] = useState<string | null>(null)

  const lkRegulations = useMemo(
    () => REGULATIONS.filter((r) => r.jurisdiction === 'LK'),
    [],
  )
  const lkRegulationCount = lkRegulations.length

  const allTopics = useMemo(() => {
    const set = new Set(MATRIX_TOPICS.map((t) => t.topic))
    return ['all', ...Array.from(set)]
  }, [])

  const filteredTopics = useMemo(() => {
    return MATRIX_TOPICS.filter((t) => {
      if (topicFilter !== 'all' && t.topic !== topicFilter) return false
      if (coverageFilter !== 'all' && t.cells.LK?.coverage !== coverageFilter) return false
      return true
    })
  }, [topicFilter, coverageFilter])

  const counts = useMemo(() => {
    const c: Record<Coverage, number> = { full: 0, partial: 0, none: 0 }
    for (const t of MATRIX_TOPICS) {
      const lk = t.cells.LK
      if (lk) c[lk.coverage] += 1
    }
    return c
  }, [])

  const loopholeCount = useMemo(() => loopholesBySeverity(), [])

  const lkInfo = JURISDICTIONS.find((j) => j.code === 'LK')

  return (
    <div className="space-y-10">
      {/* ----- HEADER ----- */}
      <header className="border-b border-ink-200 pb-6 dark:border-ink-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-2xl">{lkInfo?.flag ?? '🇱🇰'}</span>
          <span
            className="pill bg-accent-500/10 text-accent-700 dark:text-accent-300"
            title="New jurisdiction · Sri Lanka"
          >
            New · Sri Lanka
          </span>
          <span
            className="chip bg-amber-500/10 text-amber-700 dark:text-amber-300"
            title="Substantive provisions await Gazette appointed-date"
          >
            Awaiting Gazette
          </span>
        </div>
        <h1 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
          The Sri Lankan Gambling Act in Global Context
        </h1>
        <p className="mt-1 text-sm font-medium muted">
          Gambling Regulatory Authority Act, No. 17 of 2025, mapped against MGA, UKGC, CGA, GRA, NJ DGE, and PA PGCB.
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed muted">
          The <strong>Gambling Regulatory Authority Act, No. 17 of 2025</strong> (certified 03 Sep 2025)
          establishes Sri Lanka&apos;s first unified gambling regulator and repeals three predecessor statutes:
          the Betting on Horse-Racing Ordinance (Chapter 44), the Gaming Ordinance (Chapter 46), and the
          Casino Business (Regulation) Act, No. 17 of 2010. The Act delegates a substantial number of
          operational thresholds to Gazette Orders, leaving observable gaps when measured against the
          MGA, UKGC, CGA, GRA (Gibraltar), NJ&nbsp;DGE, and PA&nbsp;PGCB frameworks already mapped in this
          visualizer. This page surfaces those gaps and shows how each comparator jurisdiction closes them.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href="https://www.parliament.lk/uploads/acts/gbills/english/6393.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            Open Sri Lankan Act PDF
          </a>
          <button type="button" onClick={() => scrollToId('matrix')} className="btn">
            Topic-by-topic matrix
          </button>
          <button type="button" onClick={() => scrollToId('loopholes')} className="btn">
            Loopholes &amp; mitigations
          </button>
          <button type="button" onClick={() => scrollToId('penalties')} className="btn">
            Penalty comparator
          </button>
        </div>
      </header>

      {/* ----- KEY FIGURES ----- */}
      <section>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <KeyStat figure={String(lkRegulationCount)} label="LK regulations indexed" sub="loaded into regulations.ts" />
          <KeyStat figure={String(MATRIX_TOPICS.length)} label="Comparison topics" sub="across framework, infra, RG, AML, cyber, enforcement" />
          <KeyStat
            figure={String(loopholeCount.critical.length + loopholeCount.high.length)}
            label="High / critical loopholes"
            sub={`${loopholeCount.critical.length} critical · ${loopholeCount.high.length} high`}
            tone="warn"
          />
          <KeyStat figure={String(counts.full)} label="LK fully covered topics" sub={`${counts.partial} partial · ${counts.none} gap`} />
        </div>
      </section>

      {/* ----- COVERAGE HEATMAP ----- */}
      <section className="card">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold">Coverage heatmap, Sri Lanka vs. comparators</h2>
            <p className="text-sm muted">
              Each row is a regulatory question. Each cell is a jurisdiction&apos;s position. Sri Lanka
              sits in the leftmost data column for quick contrast.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs">
            <Legend dot="bg-emerald-500" label="full" />
            <Legend dot="bg-amber-500" label="partial" />
            <Legend dot="bg-rose-500" label="gap" />
          </div>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead>
              <tr className="muted">
                <th className="sticky left-0 z-10 bg-white py-2 pr-3 align-bottom dark:bg-ink-900">Topic</th>
                {ALL_JUR.map((j) => {
                  const info = JURISDICTIONS.find((x) => x.code === j)
                  return (
                    <th key={j} className="w-[10ch] py-2 pr-2 align-bottom font-medium" title={info?.tagline}>
                      <span className="block">{info?.flag}</span>
                      <span className="block whitespace-nowrap">{j}</span>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {MATRIX_TOPICS.map((t) => (
                <tr key={t.id} className="border-t border-ink-200 align-top dark:border-ink-800">
                  <td className="sticky left-0 z-10 bg-white py-2 pr-3 dark:bg-ink-900">
                    <div className="font-medium">{t.question}</div>
                    <div className="text-[11px] muted">{t.topic}</div>
                  </td>
                  {ALL_JUR.map((j) => {
                    const cell = t.cells[j]
                    if (!cell) return <td key={j} className="py-2 pr-2 text-center muted">·</td>
                    return (
                      <td key={j} className="py-2 pr-2">
                        <span
                          className={`inline-flex h-3 w-3 rounded-full ${COVERAGE_DOT[cell.coverage]}`}
                          title={`${COVERAGE_LABEL[cell.coverage]}: ${cell.position}`}
                        />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ----- DETAILED MATRIX ----- */}
      <section id="matrix">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Topic-by-topic comparison</h2>
            <p className="text-sm muted">
              Hover a chip to see the source. Use filters to narrow on coverage state or topic group.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="label !mb-0 !text-[10px]">Coverage</span>
            <div className="flex flex-wrap gap-1">
              {(['all', 'full', 'partial', 'none'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCoverageFilter(c)}
                  className={`chip ${coverageFilter === c ? 'bg-accent-500 text-white' : 'bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-200'}`}
                >
                  {c === 'all' ? 'all' : c === 'none' ? 'gap' : c}
                </button>
              ))}
            </div>
            <span className="label !mb-0 !text-[10px]">Topic</span>
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="input !w-full sm:!w-auto"
            >
              {allTopics.map((t) => (
                <option key={t} value={t}>{t === 'all' ? 'All topics' : t}</option>
              ))}
            </select>
          </div>
        </div>

        <ol className="space-y-3">
          {filteredTopics.length === 0 && (
            <li className="card-tight text-sm muted">No topics match the current filter.</li>
          )}
          {filteredTopics.map((t) => (
            <li key={t.id} className="card-tight">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="chip bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-200">{t.topic}</span>
                <span className="text-sm font-semibold">{t.question}</span>
                {t.cells.LK && (
                  <span className={`chip ${COVERAGE_BADGE[t.cells.LK.coverage]}`}>
                    LK {COVERAGE_LABEL[t.cells.LK.coverage]}
                  </span>
                )}
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {ALL_JUR.map((j) => {
                  const cell = t.cells[j]
                  if (!cell) return null
                  const isLk = j === 'LK'
                  return (
                    <CellBlock key={j} jurisdiction={j} cell={cell} highlight={isLk} />
                  )
                })}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ----- LOOPHOLES ----- */}
      <section id="loopholes">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold">Loopholes in the Sri Lankan Act and how others mitigate them</h2>
            <p className="text-sm muted">
              Eighteen observed gaps, ranked by severity. Each loophole shows what the Act says, why it
              matters operationally, an exploit vector, and a side-by-side of how each comparator closes
              the same gap.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {SEVERITY_ORDER.map((s) => (
              <span key={s} className={`chip ${SEVERITY_BADGE[s]}`}>
                {loopholeCount[s].length} {s}
              </span>
            ))}
          </div>
        </div>

        <ol className="space-y-3">
          {SEVERITY_ORDER.flatMap((sev) =>
            loopholeCount[sev].map((loop, idx) => {
              const isOpen = activeLoopId === loop.id
              const ordinalPrefix = LOOPHOLES.findIndex((l) => l.id === loop.id) + 1
              return (
                <li key={loop.id} className="card-tight">
                  <button
                    className="flex w-full items-start gap-2 text-left"
                    onClick={() => setActiveLoopId(isOpen ? null : loop.id)}
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-ink-100 text-[11px] font-bold text-ink-600 dark:bg-ink-800 dark:text-ink-300">
                      {ordinalPrefix}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="flex flex-wrap items-baseline gap-1.5">
                        <span className={`chip ${SEVERITY_BADGE[loop.severity]}`}>{loop.severity}</span>
                        <span className="chip bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-200">{loop.category}</span>
                        <span className="break-words font-semibold">{loop.title}</span>
                      </span>
                      <span className="mt-1 text-sm muted">{loop.whyItMatters}</span>
                    </span>
                    <span className="shrink-0 text-accent-500">{isOpen ? '−' : '+'}</span>
                    {/* idx unused but present so React keeps stable order */}
                    <span hidden>{idx}</span>
                  </button>

                  {isOpen && (
                    <div className="mt-3 border-t border-ink-200 pt-3 dark:border-ink-800">
                      <div className="grid gap-3 lg:grid-cols-2">
                        <div>
                          <SectionLabel>What the Act says</SectionLabel>
                          <p className="mt-1 text-sm leading-relaxed">{loop.whatTheActSays}</p>
                          <SectionLabel className="mt-3">Exploit vector</SectionLabel>
                          <p className="mt-1 text-sm leading-relaxed">{loop.exploitVector}</p>
                          {loop.relatedLkRegulationIds.length > 0 && (
                            <>
                              <SectionLabel className="mt-3">Touches LK regulations</SectionLabel>
                              <ul className="mt-1 flex flex-wrap gap-1.5">
                                {loop.relatedLkRegulationIds.map((rid) => {
                                  const r = getRegulation(rid)
                                  return (
                                    <li key={rid}>
                                      <span
                                        className="chip bg-accent-500/10 text-accent-700 dark:text-accent-300"
                                        title={r?.title}
                                      >
                                        {rid}
                                      </span>
                                    </li>
                                  )
                                })}
                              </ul>
                            </>
                          )}
                        </div>
                        <div>
                          <SectionLabel>How comparators close it</SectionLabel>
                          <ul className="mt-1 space-y-2">
                            {loop.mitigations.map((m, i) => {
                              const info = JURISDICTIONS.find((x) => x.code === m.jurisdiction)
                              return (
                                <li key={i} className="rounded-lg border border-ink-200 p-2 dark:border-ink-800">
                                  <div className="flex flex-wrap items-baseline gap-1.5">
                                    <span className="chip bg-accent-500/10 text-accent-700 dark:text-accent-300">
                                      {info?.flag} {m.jurisdiction}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-sm leading-relaxed">{m.approach}</p>
                                  {m.regulationIds && m.regulationIds.length > 0 && (
                                    <ul className="mt-1 flex flex-wrap gap-1">
                                      {m.regulationIds.map((rid) => (
                                        <li key={rid}>
                                          <span
                                            className="chip bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-200"
                                            title={getRegulation(rid)?.title}
                                          >
                                            {rid}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              )
            }),
          )}
        </ol>
      </section>

      {/* ----- PENALTY COMPARATOR ----- */}
      <section id="penalties">
        <div className="mb-3">
          <h2 className="text-lg font-semibold">Penalty severity, by offence and jurisdiction</h2>
          <p className="text-sm muted">
            Maximum statutory ceilings only. UKGC settlement amounts are illustrative of <em>what
            actually happens</em> in practice; UKGC has no statutory cap. USD-equivalents use a fixed
            FX assumption (LKR 300 / GBP 0.8 / EUR 0.92 per USD) for cross-comparison only.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-ink-200 dark:border-ink-800">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-ink-100 text-xs uppercase tracking-wider muted dark:bg-ink-900">
              <tr>
                <th className="px-3 py-2">Offence</th>
                <th className="px-3 py-2">Jurisdiction</th>
                <th className="px-3 py-2">Max fine</th>
                <th className="px-3 py-2 text-right">USD eq.</th>
                <th className="px-3 py-2 text-right">Prison</th>
                <th className="px-3 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {PENALTY_COMPARISON.map((row, idx) => {
                const info = JURISDICTIONS.find((x) => x.code === row.jurisdiction)
                const isLk = row.jurisdiction === 'LK'
                return (
                  <tr
                    key={idx}
                    className={`border-t border-ink-200 align-top dark:border-ink-800 ${
                      isLk ? 'bg-accent-500/5' : ''
                    }`}
                  >
                    <td className="px-3 py-2 font-medium">{row.offence}</td>
                    <td className="px-3 py-2">
                      <span className="chip bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-200">
                        {info?.flag} {row.jurisdiction}
                      </span>
                    </td>
                    <td className="px-3 py-2 tabular-nums">{row.maxFineDescription}</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {row.maxFineUsdEquivalent ? `≈ $${row.maxFineUsdEquivalent.toLocaleString()}` : 'n/a'}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {row.imprisonmentYears ? `${row.imprisonmentYears} yr` : 'n/a'}
                    </td>
                    <td className="px-3 py-2 text-xs muted">{row.notes ?? row.description}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="card-tight">
            <div className="text-xs label">Underage offence ratio</div>
            <p className="mt-1 text-sm leading-relaxed">
              Sri Lanka caps a licensee allowing under-18 gambling at <strong>LKR 100,000 (~USD 320)</strong>.
              Pennsylvania caps the same offence at <strong>USD 500,000</strong>. The PA ceiling is roughly
              <strong> 1,500× </strong> the Sri Lankan one.
            </p>
          </div>
          <div className="card-tight">
            <div className="text-xs label">UKGC AML reality</div>
            <p className="mt-1 text-sm leading-relaxed">
              UKGC AML / RG settlements have repeatedly cleared <strong>GBP 10–19 million</strong>. Sri Lanka&apos;s
              statutory ceiling for unlicensed operation is <strong>~USD 33,000</strong>. The gap is more than two
              orders of magnitude.
            </p>
          </div>
          <div className="card-tight">
            <div className="text-xs label">Admin penalty in lieu</div>
            <p className="mt-1 text-sm leading-relaxed">
              Director-General can settle most contraventions at <strong>one-third</strong> of the
              statutory maximum (s.63(2)). Effective ceiling for a general-offence settlement: ~LKR 3.33
              million (~USD 11k).
            </p>
          </div>
        </div>
      </section>

      {/* ----- LK REGULATIONS INDEX ----- */}
      <section>
        <div className="mb-3">
          <h2 className="text-lg font-semibold">All Sri Lankan regulations indexed in this build</h2>
          <p className="text-sm muted">
            Every regulation cross-referenced above is rendered here as a flat index, so the matrix
            and loophole sections remain auditable against the source.
          </p>
        </div>
        <div className="grid gap-2 lg:grid-cols-2">
          {lkRegulations.map((r) => (
            <details
              key={r.id}
              className="rounded-xl border border-ink-200 p-3 dark:border-ink-800 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer flex-wrap items-baseline gap-2 text-sm">
                <span className="chip bg-accent-500/10 text-accent-700 dark:text-accent-300">
                  {r.jurisdiction} v{r.version}
                </span>
                <span className="chip bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-200">{r.status}</span>
                <span className="font-medium">{r.title}</span>
                <span className="ml-auto font-mono text-[11px] muted">{r.id}</span>
              </summary>
              <div className="mt-2 space-y-1 text-xs leading-relaxed">
                <div>
                  <span className="label !mb-0 !text-[10px]">Topic</span> <span className="muted">{r.topic}</span>
                </div>
                <div>
                  <span className="label !mb-0 !text-[10px]">Value</span>{' '}
                  <code className="break-words font-mono">{JSON.stringify(r.value)}</code>
                  {r.unit && <span className="ml-1 muted">({r.unit})</span>}
                </div>
                {r.notes && (
                  <div>
                    <span className="label !mb-0 !text-[10px]">Notes</span>
                    <p className="mt-0.5">{r.notes}</p>
                  </div>
                )}
                {r.sourceIds.length > 0 && (
                  <div>
                    <span className="label !mb-0 !text-[10px]">Sources</span>
                    <ul className="mt-0.5 flex flex-wrap gap-1">
                      {r.sourceIds.map((sid) => {
                        const s = getSource(sid)
                        return (
                          <li key={sid}>
                            <a
                              href={s?.url}
                              target="_blank"
                              rel="noreferrer"
                              className="chip bg-ink-200 text-ink-700 hover:bg-accent-500 hover:text-white dark:bg-ink-800 dark:text-ink-200"
                              title={s?.publisher}
                            >
                              {s?.title ?? sid}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ----- METHOD ----- */}
      <section className="card">
        <h3 className="text-base font-semibold">Method &amp; caveats</h3>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm leading-relaxed">
          <li>
            All Sri Lankan facts trace back to the Act PDF (lk-gra-act-2025) verified against the
            documents.gov.lk publication. Section numbers in parentheses (e.g. s.16) refer to that text.
          </li>
          <li>
            "Loophole" here means a gap relative to the technical / consumer-protection baseline observed
            across the six comparator jurisdictions in this visualizer. It does not imply the Sri Lankan
            Parliament made a drafting error; most gaps are deliberate delegations to secondary
            instruments (Ministerial Orders, regulations, and rules under ss.76–77).
          </li>
          <li>
            Substantive provisions of the Act come into force on the &quot;appointed date&quot; set by the
            Minister in a Gazette Order under s.1(2). As of the &quot;last verified&quot; date carried by each
            regulation, that Order has not yet appeared. When it does, every &quot;pending&quot; row should
            re-enter the changelog with the appointed-date.
          </li>
          <li>
            FX equivalents are illustrative only (LKR 300 / GBP 0.8 / EUR 0.92 per USD); published rates
            move; do not use these for compliance budgeting.
          </li>
        </ul>
      </section>
    </div>
  )
}

function CellBlock({
  jurisdiction,
  cell,
  highlight = false,
}: {
  jurisdiction: Jurisdiction
  cell: MatrixCell
  highlight?: boolean
}) {
  const info = JURISDICTIONS.find((x) => x.code === jurisdiction)
  return (
    <div
      className={`rounded-lg border p-2 ${
        highlight
          ? 'border-accent-500/40 bg-accent-500/5'
          : 'border-ink-200 dark:border-ink-800'
      }`}
    >
      <div className="flex flex-wrap items-baseline gap-1.5">
        <span className="chip bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-200">
          {info?.flag} {jurisdiction}
        </span>
        <span className={`chip ${COVERAGE_BADGE[cell.coverage]}`}>{COVERAGE_LABEL[cell.coverage]}</span>
        <span className="ml-auto text-[10px] muted">
          rank {COVERAGE_RANK[cell.coverage]}
        </span>
      </div>
      <p className="mt-1 text-xs leading-relaxed">{cell.position}</p>
      {(cell.regulationIds || cell.sourceIds) && (
        <div className="mt-1 flex flex-wrap gap-1">
          {cell.regulationIds?.map((rid) => (
            <span
              key={rid}
              className="chip bg-accent-500/5 font-mono text-[10px] text-accent-700 dark:text-accent-300"
              title={getRegulation(rid)?.title}
            >
              {rid}
            </span>
          ))}
          {cell.sourceIds?.map((sid) => {
            const s = getSource(sid)
            if (!s) return null
            return (
              <a
                key={sid}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="chip bg-ink-200 font-mono text-[10px] text-ink-700 hover:bg-accent-500 hover:text-white dark:bg-ink-800 dark:text-ink-200"
                title={s.publisher}
              >
                {sid}
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}

function SectionLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-[10px] font-semibold uppercase tracking-wider muted ${className}`}>
      {children}
    </div>
  )
}

function KeyStat({
  figure,
  label,
  sub,
  tone = 'default',
}: {
  figure: string
  label: string
  sub: string
  tone?: 'default' | 'warn'
}) {
  return (
    <div className="card-tight">
      <div
        className={`text-xl font-semibold tabular-nums tracking-tight ${
          tone === 'warn' ? 'text-rose-500' : 'text-accent-500'
        }`}
      >
        {figure}
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider muted">{label}</div>
      <div className="mt-1 text-xs muted">{sub}</div>
    </div>
  )
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`inline-block h-2 w-2 rounded-full ${dot}`} />
      <span className="muted">{label}</span>
    </span>
  )
}
