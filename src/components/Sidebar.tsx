import { CHAPTERS } from '../data/script'
import { lastUpdatedDate } from '../data/changelog'

interface Props {
  active: string
  onSelect: (slug: string) => void
  onOpenGlossary: () => void
}

export default function Sidebar({ active, onSelect, onOpenGlossary }: Props) {
  const lastUpdated = lastUpdatedDate()
  return (
    <nav className="flex h-full flex-col">
      <button onClick={() => onSelect('home')} className="mb-6 flex items-center gap-2 text-left">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent-500 text-white shadow-glow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2 L4 6 L4 12 C4 17 8 21 12 22 C16 21 20 17 20 12 L20 6 Z" />
            <path d="M9 12 l2 2 l4 -4" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight">Licensing Visualizer</div>
          <div className="text-xs leading-tight muted">iGaming · Interactive</div>
        </div>
      </button>

      <button onClick={() => onSelect('home')} className={
        'mb-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ' +
        (active === 'home' ? 'bg-accent-500/10 text-accent-700 dark:text-accent-300' : 'hover:bg-ink-100 dark:hover:bg-ink-900')
      }>Overview</button>

      <button onClick={() => onSelect('changelog')} className={
        'mb-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ' +
        (active === 'changelog' ? 'bg-accent-500/10 text-accent-700 dark:text-accent-300' : 'hover:bg-ink-100 dark:hover:bg-ink-900')
      }>
        <div className="flex items-center justify-between">
          <span>Changelog</span>
          <span className="chip bg-ink-200 text-ink-600 dark:bg-ink-800 dark:text-ink-300">{lastUpdated}</span>
        </div>
      </button>

      <button onClick={() => onSelect('sources')} className={
        'mb-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ' +
        (active === 'sources' ? 'bg-accent-500/10 text-accent-700 dark:text-accent-300' : 'hover:bg-ink-100 dark:hover:bg-ink-900')
      }>Sources</button>

      <button onClick={() => onSelect('comparison')} className={
        'mb-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ' +
        (active === 'comparison' ? 'bg-accent-500/10 text-accent-700 dark:text-accent-300' : 'hover:bg-ink-100 dark:hover:bg-ink-900')
      }>
        <div className="flex items-center justify-between gap-2">
          <span>Sri Lanka comparison</span>
          <span className="chip bg-rose-500/10 text-rose-700 dark:text-rose-300" title="New section: Sri Lanka GRA Act No. 17 of 2025 vs other jurisdictions, with loopholes & mitigations">🇱🇰 new</span>
        </div>
      </button>

      <div className="my-3 border-t border-ink-200 dark:border-ink-800" />

      <div className="px-1 pb-1 text-xs font-semibold uppercase tracking-wider muted">Chapters</div>
      <ol className="space-y-1">
        {CHAPTERS.map((c) => {
          const isActive = c.slug === active
          return (
            <li key={c.slug}>
              <button
                onClick={() => onSelect(c.slug)}
                className={
                  'flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ' +
                  (isActive
                    ? 'bg-accent-500/10 text-accent-700 dark:text-accent-300'
                    : 'hover:bg-ink-100 dark:hover:bg-ink-900')
                }
              >
                <span
                  className={
                    'mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md text-[11px] font-bold ' +
                    (isActive
                      ? 'bg-accent-500 text-white'
                      : 'bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-400')
                  }
                >
                  {c.id}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-medium">{c.title}</span>
                  <span className="mt-0.5 text-xs muted">{c.subtitle}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="mt-auto pt-4">
        <button onClick={onOpenGlossary} className="btn w-full justify-start">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4V4z"/><path d="M4 16a4 4 0 014-4h12"/></svg>
          Glossary
        </button>
      </div>
    </nav>
  )
}
