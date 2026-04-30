import { ReactNode, useState } from 'react'
import Sidebar from './Sidebar'
import GlossaryDrawer from './GlossaryDrawer'
import ThemeToggle from '../ui/ThemeToggle'
import { lastUpdatedDate } from '../data/changelog'
import { relativeFromNow } from '../lib/format'

interface Props {
  active: string
  onSelect: (slug: string) => void
  children: ReactNode
}

export default function Layout({ active, onSelect, children }: Props) {
  const [glossaryOpen, setGlossaryOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const lastUpdated = lastUpdatedDate()

  const handleSelect = (slug: string) => {
    onSelect(slug)
    setNavOpen(false)
  }
  const handleOpenGlossary = () => {
    setGlossaryOpen(true)
    setNavOpen(false)
  }

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-950 dark:text-ink-100">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ink-200 bg-white/80 px-4 py-2 backdrop-blur lg:hidden dark:border-ink-800 dark:bg-ink-950/80">
        <button onClick={() => setNavOpen((v) => !v)} className="btn-ghost" aria-label="Toggle nav">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
        <span className="text-sm font-semibold">Licensing Visualizer</span>
        <ThemeToggle />
      </header>

      <div className="mx-auto flex max-w-[1500px]">
        <aside
          className={
            'fixed z-40 h-screen w-72 shrink-0 overflow-y-auto border-r border-ink-200 bg-white p-5 transition-transform lg:sticky lg:top-0 lg:translate-x-0 dark:border-ink-800 dark:bg-ink-950 ' +
            (navOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')
          }
        >
          <Sidebar active={active} onSelect={handleSelect} onOpenGlossary={handleOpenGlossary} />
        </aside>

        <main className="min-w-0 flex-1">
          <div className="hidden items-center justify-between border-b border-ink-200 px-6 py-3 lg:flex dark:border-ink-800">
            <div className="text-sm muted">
              iGaming Licensing &amp; Technical Standards · Interactive Visualizer
            </div>
            <div className="flex items-center gap-3">
              <span className="chip bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" title={`Last regulatory update applied to this build: ${lastUpdated}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 pulse-dot" />
                Live · {lastUpdated} ({relativeFromNow(lastUpdated)})
              </span>
              <ThemeToggle />
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8 lg:py-8">{children}</div>
        </main>
      </div>

      <GlossaryDrawer open={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
    </div>
  )
}
