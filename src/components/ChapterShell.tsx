import { ReactNode } from 'react'

interface Props {
  number: number
  title: string
  subtitle?: string
  intro?: ReactNode
  children: ReactNode
}

export default function ChapterShell({ number, title, subtitle, intro, children }: Props) {
  return (
    <div className="space-y-6">
      <header className="border-b border-ink-200 pb-5 dark:border-ink-800">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 basis-10 place-items-center rounded-xl bg-accent-500 text-base font-bold text-white">
            {String(number).padStart(2, '0')}
          </div>
          <div className="min-w-0">
            <h1 className="break-words text-2xl font-semibold tracking-tight">{title}</h1>
            {subtitle && <p className="muted break-words">{subtitle}</p>}
          </div>
        </div>
        {intro && <div className="mt-4 max-w-3xl text-sm leading-relaxed">{intro}</div>}
      </header>
      <div className="space-y-6">{children}</div>
    </div>
  )
}
