import { ReactNode } from 'react'

interface Props {
  label: ReactNode
  value: ReactNode
  hint?: ReactNode
  tone?: 'default' | 'positive' | 'negative' | 'accent' | 'gold'
  className?: string
}

const TONE = {
  default: '',
  positive: 'text-emerald-500',
  negative: 'text-rose-500',
  accent:   'text-accent-500',
  gold:     'text-gold-500',
}

export default function Stat({ label, value, hint, tone = 'default', className = '' }: Props) {
  return (
    <div className={`rounded-lg border border-ink-200 bg-ink-50 p-3 dark:border-ink-800 dark:bg-ink-950 ${className}`}>
      <div className="label !mb-1">{label}</div>
      <div className={`stat ${TONE[tone]}`}>{value}</div>
      {hint && <div className="mt-1 text-xs muted">{hint}</div>}
    </div>
  )
}
