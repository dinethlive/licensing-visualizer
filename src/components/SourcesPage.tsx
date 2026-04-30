import { useMemo } from 'react'
import { SOURCES } from '../data/sources'
import { REGULATIONS } from '../data/regulations'

export default function SourcesPage() {
  // Map source -> regulations that cite it
  const usage = useMemo(() => {
    const m = new Map<string, string[]>()
    for (const r of REGULATIONS) {
      for (const sid of r.sourceIds) {
        if (!m.has(sid)) m.set(sid, [])
        m.get(sid)!.push(r.id)
      }
    }
    return m
  }, [])

  const sorted = useMemo(
    () => [...SOURCES].sort((a, b) => a.publisher.localeCompare(b.publisher)),
    [],
  )

  return (
    <div className="space-y-6">
      <header className="border-b border-ink-200 pb-5 dark:border-ink-800">
        <h1 className="text-2xl font-semibold tracking-tight">Sources</h1>
        <p className="mt-1 text-sm muted">
          Every regulatory figure in this visualizer is traceable to a source listed below. Updating a source URL or
          publication date in <code className="rounded bg-ink-200/60 px-1 py-0.5 font-mono text-[12px] dark:bg-ink-800/60">src/data/sources.ts</code>
          flows automatically into every regulation and visualizer that references it.
        </p>
      </header>

      <ul className="space-y-3">
        {sorted.map((s) => {
          const cited = usage.get(s.id) ?? []
          return (
            <li key={s.id} className="card-tight">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-xs muted">{s.id}</span>
                {s.publishedDate && (
                  <span className="chip bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-200" title="Source publication date">
                    published {s.publishedDate}
                  </span>
                )}
                {s.accessedDate && (
                  <span className="chip bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" title="When this URL was last verified live">
                    verified {s.accessedDate}
                  </span>
                )}
                <span className="ml-auto text-xs muted">{cited.length} citation{cited.length === 1 ? '' : 's'}</span>
              </div>
              <div className="mt-1 text-sm font-semibold">{s.title}</div>
              <div className="text-xs muted">{s.publisher}</div>
              {s.url && (
                <a className="mt-1 inline-flex items-center gap-1 break-all text-xs text-accent-600 hover:underline dark:text-accent-300" href={s.url} target="_blank" rel="noreferrer">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M14 4h6v6"/><path d="M10 14L21 3"/><path d="M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6"/>
                  </svg>
                  {s.url}
                </a>
              )}
              {s.notes && <p className="mt-2 text-xs leading-relaxed">{s.notes}</p>}
              {cited.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {cited.map((rid) => (
                    <span key={rid} className="chip bg-accent-500/10 text-accent-700 dark:text-accent-300">{rid}</span>
                  ))}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
