import { ReactNode } from 'react'

interface Props {
  title?: ReactNode
  description?: ReactNode
  badge?: ReactNode
  className?: string
  children: ReactNode
  footer?: ReactNode
  tight?: boolean
}

export default function Card({ title, description, badge, className = '', children, footer, tight }: Props) {
  return (
    <section className={`${tight ? 'card-tight' : 'card'} ${className}`}>
      {(title || badge) && (
        <header className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            {title && <h3 className="text-base font-semibold">{title}</h3>}
            {description && <p className="mt-0.5 text-sm muted">{description}</p>}
          </div>
          {badge}
        </header>
      )}
      <div>{children}</div>
      {footer && <footer className="mt-4 border-t border-ink-200 pt-3 text-xs muted dark:border-ink-800">{footer}</footer>}
    </section>
  )
}
