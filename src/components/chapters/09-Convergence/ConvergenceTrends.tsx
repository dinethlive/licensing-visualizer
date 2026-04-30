import { useState } from 'react'
import Card from '../../../ui/Card'

interface Trend {
  id: string
  title: string
  blurb: string
  examples: string[]
  color: string
}

const TRENDS: Trend[] = [
  {
    id: 'centralization',
    title: 'Centralization',
    blurb: 'Offshore minimal-oversight licensing models giving way to government-regulated frameworks with substantive local presence requirements.',
    examples: [
      'Curaçao master-license model → LOK direct CGA licensing (24 Dec 2024)',
      'Gibraltar Gambling Act 2005 → Gambling Bill 2025 (management-location trigger)',
      'CGA local-substance phased key-person requirements (4-year, 5-year)',
    ],
    color: 'border-accent-500/40 bg-accent-500/5 text-accent-700 dark:text-accent-300',
  },
  {
    id: 'standardization',
    title: 'Standardization',
    blurb: 'Information security and game-integrity requirements converging on internationally recognized benchmarks rather than bespoke local checklists.',
    examples: [
      'UKGC mandatory ISO/IEC 27001:2022 from 31 Oct 2024',
      'GLI as cross-jurisdictional accredited testing laboratory',
      'Universal player-fund segregation requirement',
    ],
    color: 'border-emerald-500/40 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300',
  },
  {
    id: 'technologization',
    title: 'Technologization',
    blurb: 'AI fraud detection, real-time monitoring, MFA and biometric verification, no longer premium capabilities, now the expected operational baseline.',
    examples: [
      '~40% of ATO incidents now bot-driven; MFA expected as baseline',
      'UKGC live RTP monitoring as continuous standing condition',
      'PGCB-mandated behavioral analytics for problematic-pattern detection',
    ],
    color: 'border-violet-500/40 bg-violet-500/5 text-violet-700 dark:text-violet-300',
  },
]

export default function ConvergenceTrends() {
  const [active, setActive] = useState<string>('centralization')
  const trend = TRENDS.find((t) => t.id === active)!

  return (
    <Card
      title="Three converging macro-trends"
      description="The visualizer, examined across all five jurisdictions, points in a single direction."
    >
      <div className="grid gap-2 sm:grid-cols-3">
        {TRENDS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={
              'rounded-xl border p-3 text-left transition-colors ' +
              (t.id === active ? t.color : 'border-ink-200 hover:border-ink-300 dark:border-ink-700')
            }
          >
            <div className="text-sm font-semibold">{t.title}</div>
            <p className="mt-1 text-xs">{t.blurb}</p>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-ink-200 bg-ink-50 p-4 dark:border-ink-800 dark:bg-ink-950">
        <h4 className="text-base font-semibold">Live examples, {trend.title}</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {trend.examples.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
