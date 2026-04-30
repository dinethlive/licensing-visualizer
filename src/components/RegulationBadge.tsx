import { useState } from 'react'
import { getRegulation } from '../data/regulations'
import { changesForRegulation } from '../data/changelog'
import { getSource, Source } from '../data/sources'
import { relativeFromNow } from '../lib/format'

/**
 * RegulationBadge surfaces a single regulation's:
 *   - title and current value
 *   - jurisdiction
 *   - effective date
 *   - last-verified date (with relative-time hint)
 *   - version number
 *   - all sources, each with publisher + deep URL + accessedDate
 *   - full change history (expandable)
 *
 * Use it inside any visualizer that pulls a number from regulations.ts.
 * Always renders a small "primary source" link (the first source's URL) so
 * readers can jump straight to the regulator-side document, not just the
 * documentary script.
 */
export default function RegulationBadge({ id, compact = false }: { id: string; compact?: boolean }) {
  const reg = getRegulation(id)
  const [open, setOpen] = useState(false)
  if (!reg) return <span className="chip bg-rose-500/10 text-rose-600">unknown reg: {id}</span>

  const history = changesForRegulation(id)
  // Pick the first source that has a URL as the "primary" deep link.
  const primary = reg.sourceIds
    .map((sid) => getSource(sid))
    .filter((s): s is Source => Boolean(s && s.url))[0]

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1">
        <button
          onClick={() => setOpen((v) => !v)}
          className="chip bg-accent-500/10 text-accent-700 dark:text-accent-300"
          title={`v${reg.version} · last verified ${reg.lastVerified}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          v{reg.version} · {reg.jurisdiction}
        </button>
        {primary?.url && (
          <a
            href={primary.url}
            target="_blank"
            rel="noreferrer"
            title={`Open primary source: ${primary.title} (${primary.publisher})`}
            className="chip bg-ink-200 text-ink-700 hover:bg-accent-500 hover:text-white dark:bg-ink-800 dark:text-ink-200"
          >
            <ExternalLinkIcon /> source
          </a>
        )}
      </span>
    )
  }

  return (
    <div className="rounded-xl border border-accent-500/20 bg-accent-500/5 p-3 text-xs">
      <div className="flex items-start justify-between gap-3">
        <button onClick={() => setOpen((v) => !v)} className="min-w-0 flex-1 text-left">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="chip bg-accent-500/15 text-accent-700 dark:text-accent-300">{reg.jurisdiction}</span>
            <span className="chip bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-200">v{reg.version}</span>
            <span className="chip bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">{reg.status}</span>
          </div>
          <div className="mt-1 font-semibold text-ink-800 dark:text-ink-100">{reg.title}</div>
          <div className="mt-0.5 muted">
            Effective {reg.effectiveDate} · last verified {reg.lastVerified} ({relativeFromNow(reg.lastVerified)})
          </div>
        </button>
        <div className="flex shrink-0 items-center gap-1.5">
          {primary?.url && (
            <a
              href={primary.url}
              target="_blank"
              rel="noreferrer"
              title={`Open primary source: ${primary.title} (${primary.publisher})`}
              className="chip bg-ink-200 text-ink-700 hover:bg-accent-500 hover:text-white dark:bg-ink-800 dark:text-ink-200"
            >
              <ExternalLinkIcon /> primary source
            </a>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Collapse' : 'Expand'}
            className="text-accent-500"
          >
            {open ? '−' : '+'}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-3 space-y-2 border-t border-accent-500/15 pt-3">
          {reg.notes && (
            <p className="leading-relaxed text-ink-700 dark:text-ink-200">{reg.notes}</p>
          )}
          <div>
            <div className="label !mb-1">Sources ({reg.sourceIds.length})</div>
            <ul className="space-y-1.5">
              {reg.sourceIds.map((sid) => {
                const s = getSource(sid)
                if (!s) return <li key={sid} className="muted">unknown source: {sid}</li>
                return (
                  <li key={sid} className="leading-relaxed">
                    <div>
                      <span className="font-medium">{s.title}</span>
                      <span className="muted"> · {s.publisher}</span>
                    </div>
                    {(s.url || s.publishedDate || s.accessedDate) && (
                      <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                        {s.url && (
                          <a
                            className="inline-flex items-center gap-1 text-accent-600 underline-offset-2 hover:underline dark:text-accent-300"
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <ExternalLinkIcon /> open
                          </a>
                        )}
                        {s.publishedDate && (
                          <span className="chip bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-200" title="Source publication date">
                            published {s.publishedDate}
                          </span>
                        )}
                        {s.accessedDate && (
                          <span className="chip bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" title="Date this URL was last verified live">
                            verified {s.accessedDate}
                          </span>
                        )}
                      </div>
                    )}
                    {s.notes && <div className="mt-0.5 muted">{s.notes}</div>}
                  </li>
                )
              })}
            </ul>
          </div>
          {history.length > 0 && (
            <div>
              <div className="label !mb-1">Change history</div>
              <ol className="space-y-1.5">
                {history.map((h, idx) => (
                  <li key={`${h.date}-${idx}`} className="rounded-md bg-white/60 p-2 dark:bg-ink-950/60">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-mono tabular-nums text-ink-600 dark:text-ink-300">{h.date}</span>
                      <span className="chip bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-200">{h.kind}</span>
                      <span className="muted">by {h.editor}</span>
                    </div>
                    <p className="mt-1 leading-relaxed">{h.reason}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {reg.scriptSection && (
            <div className="muted">Documentary script · §{reg.scriptSection}</div>
          )}
        </div>
      )}
    </div>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 4h6v6" />
      <path d="M10 14L21 3" />
      <path d="M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6" />
    </svg>
  )
}
