import { ReactNode, useState } from 'react'

export interface TabSpec {
  id: string
  label: ReactNode
  content: ReactNode
}

interface Props {
  tabs: TabSpec[]
  initial?: string
  className?: string
}

export default function Tabs({ tabs, initial, className = '' }: Props) {
  const [active, setActive] = useState<string>(initial ?? tabs[0]?.id ?? '')
  const current = tabs.find((t) => t.id === active) ?? tabs[0]
  return (
    <div className={className}>
      <div className="mb-4 flex flex-wrap gap-1 rounded-xl bg-ink-100 p-1 dark:bg-ink-900">
        {tabs.map((t) => {
          const isActive = t.id === active
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ' +
                (isActive
                  ? 'bg-white text-ink-900 shadow-sm dark:bg-ink-700 dark:text-ink-50'
                  : 'text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-100')
              }
            >
              {t.label}
            </button>
          )
        })}
      </div>
      <div>{current?.content}</div>
    </div>
  )
}
