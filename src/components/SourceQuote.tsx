import { useState } from 'react'
import { getChunk } from '../data/script'

interface Props {
  chapter: number
  section: string
  className?: string
}

export default function SourceQuote({ chapter, section, className = '' }: Props) {
  const chunk = getChunk(chapter, section)
  const [open, setOpen] = useState(false)
  if (!chunk) return null

  return (
    <div className={`rounded-xl border border-ink-200 bg-ink-50 p-3 dark:border-ink-800 dark:bg-ink-950/60 ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-300"
      >
        <span>
          From the script · §{chunk.chapter}.{chunk.section.split('.').slice(-1)[0]} -{' '}
          <span className="opacity-80">{chunk.title}</span>
        </span>
        <span aria-hidden>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink-700 dark:text-ink-200">{chunk.text}</p>
      )}
    </div>
  )
}
