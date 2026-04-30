import { CHAPTERS } from '../data/script'
import { recentChanges, lastUpdatedDate } from '../data/changelog'
import { JURISDICTIONS } from '../data/regulations'
import { relativeFromNow } from '../lib/format'

interface Props {
  onSelect: (slug: string) => void
}

const HIGHLIGHTS = [
  { figure: '7',         label: 'Major jurisdictions mapped', sub: 'MGA · UKGC · CGA · GRA · NJ-DGE · PA-PGCB · LK' },
  { figure: '5 sec',     label: 'UKGC minimum game cycle',    sub: 'In force from 17 Jan 2025, all online casino games' },
  { figure: '26.3 min',  label: 'Tier-IV downtime budget',    sub: 'Curaçao LOK Master-Node hosting requirement / yr' },
  { figure: '7 days',    label: 'UKGC ISO 27001 disclosure',  sub: 'Major non-conformity disclosure window' },
]

export default function Home({ onSelect }: Props) {
  const recent = recentChanges(5)
  const lastUpdated = lastUpdatedDate()

  return (
    <div className="space-y-10">
      <section>
        <span className="pill bg-accent-500/10 text-accent-700 dark:text-accent-300">Interactive learning visualizer</span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Technical Standards &amp; Jurisdictional Licensing in Global iGaming
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed muted">
          A 9-chapter live workbook covering Malta, the UKGC, Curaçao&apos;s LOK, Gibraltar&apos;s 2025 overhaul,
          New Jersey, and Pennsylvania. Every regulatory figure is loaded from a single
          <code className="mx-1 rounded bg-ink-200/60 px-1 py-0.5 text-[12px] font-mono dark:bg-ink-800/60">regulations.ts</code>
          source of truth, with an append-only changelog so updates land in one place and propagate everywhere.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={() => onSelect('regulators')} className="btn-primary">Start with the regulators</button>
          <button onClick={() => onSelect('comparison')} className="btn">🇱🇰 Sri Lanka comparison &amp; loopholes</button>
          <button onClick={() => onSelect('changelog')} className="btn">View changelog</button>
          <button onClick={() => onSelect('convergence')} className="btn">Where is this heading?</button>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <div key={h.label} className="card-tight">
              <div className="text-xl font-semibold tracking-tight tabular-nums text-accent-500">{h.figure}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider muted">{h.label}</div>
              <div className="mt-1 text-xs muted">{h.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <h2 className="mb-3 text-lg font-semibold">Chapters</h2>
          <ol className="grid gap-3 sm:grid-cols-2">
            {CHAPTERS.map((c) => (
              <li key={c.slug}>
                <button onClick={() => onSelect(c.slug)} className="card-tight flex w-full items-start gap-3 text-left transition-shadow hover:shadow-glow">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-500 text-sm font-bold text-white">{String(c.id).padStart(2, '0')}</span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold">{c.title}</span>
                    <span className="text-xs muted">{c.subtitle}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="card">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">Recently changed</h2>
            <button onClick={() => onSelect('changelog')} className="text-xs text-accent-600 hover:underline dark:text-accent-300">view all →</button>
          </div>
          <p className="mt-1 text-xs muted">Build last updated <span className="font-mono tabular-nums">{lastUpdated}</span> ({relativeFromNow(lastUpdated)}).</p>
          <ul className="mt-3 space-y-2">
            {recent.map((c, idx) => (
              <li key={`${c.regulationId}-${idx}`} className="rounded-lg border border-ink-200 p-2 text-xs dark:border-ink-800">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono tabular-nums muted">{c.date}</span>
                  <span className="chip bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-200">{c.kind}</span>
                </div>
                <div className="mt-1 font-medium">{c.regulationId}</div>
                <p className="mt-0.5 muted">{c.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Jurisdictions covered</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {JURISDICTIONS.map((j) => (
            <div key={j.code} className="card-tight">
              <div className="flex items-center gap-2">
                <span className="text-xl">{j.flag}</span>
                <div>
                  <div className="text-sm font-semibold">{j.name}</div>
                  <div className="text-xs muted">{j.tagline}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h3 className="text-base font-semibold">Why changelog-first?</h3>
        <p className="mt-2 text-sm leading-relaxed">
          Compliance moves faster than most documentation can keep up with. This visualizer is built so a single
          edit to <code className="rounded bg-ink-200/60 px-1 py-0.5 font-mono text-[12px] dark:bg-ink-800/60">src/data/regulations.ts</code>
          plus one row appended to <code className="rounded bg-ink-200/60 px-1 py-0.5 font-mono text-[12px] dark:bg-ink-800/60">src/data/changelog.ts</code> updates every visualizer that
          touches that figure, surfaces the change on the home dashboard, and creates a permanent diff that
          future readers can audit. See <code className="rounded bg-ink-200/60 px-1 py-0.5 font-mono text-[12px] dark:bg-ink-800/60">HOW_TO_UPDATE.md</code> in the project root for the procedure.
        </p>
      </section>
    </div>
  )
}
