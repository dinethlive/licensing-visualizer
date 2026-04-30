import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GLOSSARY } from '../data/glossary'

interface Props {
  open: boolean
  onClose: () => void
}

export default function GlossaryDrawer({ open, onClose }: Props) {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return GLOSSARY
    return GLOSSARY.filter(
      (g) => g.term.toLowerCase().includes(needle) || g.definition.toLowerCase().includes(needle),
    )
  }, [q])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.aside
            onClick={(e) => e.stopPropagation()}
            initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }}
            className="flex h-full w-full max-w-md flex-col border-l border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900"
          >
            <header className="flex items-center justify-between border-b border-ink-200 p-4 dark:border-ink-800">
              <div>
                <h3 className="text-base font-semibold">Glossary</h3>
                <p className="text-xs muted">{GLOSSARY.length} licensing & technical terms</p>
              </div>
              <button onClick={onClose} className="btn-ghost" aria-label="Close">×</button>
            </header>
            <div className="border-b border-ink-200 p-4 dark:border-ink-800">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search…"
                className="input"
                autoFocus
              />
            </div>
            <ul className="flex-1 space-y-3 overflow-y-auto p-4">
              {filtered.map((g) => (
                <li key={g.term}>
                  <div className="text-sm font-semibold">{g.term}</div>
                  <p className="mt-0.5 text-sm leading-relaxed muted">{g.definition}</p>
                </li>
              ))}
              {filtered.length === 0 && <li className="text-sm muted">No matches.</li>}
            </ul>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
