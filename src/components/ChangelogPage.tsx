import { useMemo, useState } from 'react'
import { CHANGELOG, ChangeKind } from '../data/changelog'
import { getRegulation, JURISDICTIONS } from '../data/regulations'
import { getSource } from '../data/sources'
import { relativeFromNow } from '../lib/format'

const KIND_BADGE: Record<ChangeKind, string> = {
  added:      'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  updated:    'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  superseded: 'bg-violet-500/10 text-violet-700 dark:text-violet-300',
  clarified:  'bg-sky-500/10 text-sky-700 dark:text-sky-300',
  removed:    'bg-rose-500/10 text-rose-700 dark:text-rose-300',
}

const ALL_KINDS: ChangeKind[] = ['added', 'updated', 'superseded', 'clarified', 'removed']

export default function ChangelogPage() {
  const [kindFilter, setKindFilter] = useState<ChangeKind | 'all'>('all')
  const [jurFilter, setJurFilter] = useState<string>('all')

  const sorted = useMemo(
    () => [...CHANGELOG].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  )

  const filtered = useMemo(() => {
    return sorted.filter((c) => {
      if (kindFilter !== 'all' && c.kind !== kindFilter) return false
      if (jurFilter !== 'all') {
        const reg = getRegulation(c.regulationId)
        if (!reg || reg.jurisdiction !== jurFilter) return false
      }
      return true
    })
  }, [sorted, kindFilter, jurFilter])

  // Group by date
  const byDate = useMemo(() => {
    const map = new Map<string, typeof filtered>()
    for (const c of filtered) {
      if (!map.has(c.date)) map.set(c.date, [])
      map.get(c.date)!.push(c)
    }
    return [...map.entries()]
  }, [filtered])

  return (
    <div className="space-y-6">
      <header className="border-b border-ink-200 pb-5 dark:border-ink-800">
        <h1 className="text-2xl font-semibold tracking-tight">Changelog</h1>
        <p className="mt-1 text-sm muted">
          Append-only log of every regulatory edit applied to this visualizer. Each entry links back to the regulation
          it changed and the source that justified the change.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-ink-200 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
        <div>
          <span className="label">Kind</span>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setKindFilter('all')}
              className={`chip ${kindFilter === 'all' ? 'bg-accent-500 text-white' : 'bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-200'}`}
            >
              all
            </button>
            {ALL_KINDS.map((k) => (
              <button
                key={k}
                onClick={() => setKindFilter(k)}
                className={`chip ${kindFilter === k ? 'bg-accent-500 text-white' : KIND_BADGE[k]}`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="label">Jurisdiction</span>
          <select
            value={jurFilter}
            onChange={(e) => setJurFilter(e.target.value)}
            className="input"
          >
            <option value="all">All jurisdictions</option>
            {JURISDICTIONS.map((j) => (
              <option key={j.code} value={j.code}>{j.name}</option>
            ))}
            <option value="GLOBAL">Cross-cutting / global</option>
          </select>
        </div>
        <div className="ml-auto text-sm muted">
          {filtered.length} of {CHANGELOG.length} entries
        </div>
      </div>

      <ol className="space-y-6">
        {byDate.map(([date, entries]) => (
          <li key={date}>
            <div className="mb-2 flex items-baseline gap-2">
              <h2 className="text-lg font-semibold tabular-nums">{date}</h2>
              <span className="text-xs muted">{relativeFromNow(date)}</span>
            </div>
            <ul className="space-y-3">
              {entries.map((c, idx) => {
                const reg = getRegulation(c.regulationId)
                return (
                  <li key={`${c.regulationId}-${idx}`} className="card-tight">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`chip ${KIND_BADGE[c.kind]}`}>{c.kind}</span>
                      {reg && <span className="chip bg-accent-500/10 text-accent-700 dark:text-accent-300">{reg.jurisdiction}</span>}
                      <span className="font-mono text-xs muted">{c.regulationId}</span>
                      <span className="ml-auto text-xs muted">edited by {c.editor}</span>
                    </div>
                    <div className="mt-2 text-sm font-semibold">
                      {reg?.title ?? c.regulationId}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed">{c.reason}</p>
                    {(c.previousValue !== undefined || c.newValue !== undefined) && (
                      <div className="mt-2 grid gap-2 text-xs sm:grid-cols-2">
                        {c.previousValue !== undefined && (
                          <div className="rounded-md p-2 diff-removed">
                            <div className="label !mb-0.5 !text-[10px]">Was</div>
                            <code className="font-mono">{JSON.stringify(c.previousValue)}</code>
                          </div>
                        )}
                        {c.newValue !== undefined && (
                          <div className="rounded-md p-2 diff-added">
                            <div className="label !mb-0.5 !text-[10px]">Now</div>
                            <code className="font-mono">{JSON.stringify(c.newValue)}</code>
                          </div>
                        )}
                      </div>
                    )}
                    {c.sourceIds.length > 0 && (
                      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="muted">Sources:</span>
                        {c.sourceIds.map((sid) => {
                          const s = getSource(sid)
                          return (
                            <span key={sid} className="chip bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-200" title={s?.publisher ?? sid}>
                              {s?.title ?? sid}
                            </span>
                          )
                        })}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}
