import { useState } from 'react'
import Card from '../../../ui/Card'
import RegulationBadge from '../../RegulationBadge'
import { getRegulation, CafObjective } from '../../../data/regulations'

const COLORS = ['#5e85ff', '#10b981', '#f59e0b', '#8b5cf6']

export default function CafObjectivesWheel() {
  const reg = getRegulation<CafObjective[]>('gra.caf-objectives')!
  const objectives = reg.value
  const [active, setActive] = useState<CafObjective['code']>('A')
  const current = objectives.find((o) => o.code === active)!

  return (
    <Card
      title="Gibraltar Cyber Assessment Framework, four objectives"
      description="A continuous cycle, not a checklist. The CAF requires demonstrated capability across all four objectives simultaneously."
      badge={<RegulationBadge id="gra.caf-objectives" compact />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <svg viewBox="0 0 240 240" className="mx-auto w-full max-w-xs">
          <circle cx={120} cy={120} r={70} fill="none" stroke="currentColor" strokeOpacity={0.15} strokeWidth={1} />
          {objectives.map((o, idx) => {
            const angle = (idx / 4) * 2 * Math.PI - Math.PI / 2
            const x = 120 + Math.cos(angle) * 80
            const y = 120 + Math.sin(angle) * 80
            const isActive = o.code === active
            return (
              <g key={o.code} style={{ cursor: 'pointer' }} onClick={() => setActive(o.code)}>
                <circle cx={x} cy={y} r={isActive ? 38 : 30} fill={COLORS[idx]} fillOpacity={isActive ? 0.9 : 0.5} />
                <text x={x} y={y - 4} textAnchor="middle" className="text-base font-bold" fill="#fff">{o.code}</text>
                <text x={x} y={y + 12} textAnchor="middle" className="text-[9px] font-semibold" fill="#fff">{o.title.split(' ').slice(0, 2).join(' ')}</text>
              </g>
            )
          })}
          {/* Continuous-cycle arrows */}
          {objectives.map((_, idx) => {
            const a1 = (idx / 4) * 2 * Math.PI - Math.PI / 2
            const a2 = ((idx + 1) / 4) * 2 * Math.PI - Math.PI / 2
            const x1 = 120 + Math.cos(a1) * 80
            const y1 = 120 + Math.sin(a1) * 80
            const x2 = 120 + Math.cos(a2) * 80
            const y2 = 120 + Math.sin(a2) * 80
            return (
              <path
                key={idx}
                d={`M ${x1} ${y1} A 80 80 0 0 1 ${x2} ${y2}`}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.3}
                strokeWidth={1.5}
              />
            )
          })}
        </svg>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-accent-500 text-base font-bold text-white">{current.code}</span>
            <h4 className="text-lg font-semibold">{current.title}</h4>
          </div>
          <p className="mt-2 text-sm leading-relaxed">{current.description}</p>

          <div className="mt-4 grid grid-cols-4 gap-1">
            {objectives.map((o) => (
              <button
                key={o.code}
                onClick={() => setActive(o.code)}
                className={
                  'rounded-md px-2 py-1 text-xs font-semibold transition-colors ' +
                  (o.code === active ? 'bg-accent-500 text-white' : 'bg-ink-200 text-ink-700 dark:bg-ink-800 dark:text-ink-200')
                }
              >
                {o.code}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <RegulationBadge id="gra.caf-objectives" />
      </div>
    </Card>
  )
}
