import { useEffect, useState } from 'react'
import Card from '../../../ui/Card'
import Stat from '../../../ui/Stat'
import RegulationBadge from '../../RegulationBadge'
import { num, getRegulation } from '../../../data/regulations'

export default function IsoDisclosureClock() {
  const days = num('ukgc.major-noncon-disclosure-days')
  const [findingTime, setFindingTime] = useState<number | null>(null)
  const [now, setNow] = useState<number>(Date.now())
  const [accel, setAccel] = useState(86_400) // 1 simulated day per real second

  useEffect(() => {
    const id = setInterval(() => setNow((n) => (findingTime ? n + accel * 100 : Date.now())), 100)
    return () => clearInterval(id)
  }, [findingTime, accel])

  const elapsedSec = findingTime ? (now - findingTime) / 1000 : 0
  const elapsedDays = elapsedSec / 86_400
  const remainingDays = Math.max(0, days - elapsedDays)
  const expired = elapsedDays > days

  const credentials = getRegulation<string[]>('ukgc.auditor-credentials')!.value

  return (
    <Card
      title="UKGC ISO/IEC 27001:2022, 7-day disclosure clock"
      description="Major non-conformities found in the annual audit must be reported to the Commission within 7 days. The clock is unforgiving."
      badge={<RegulationBadge id="ukgc.major-noncon-disclosure-days" compact />}
    >
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFindingTime(Date.now())}
          className="btn-primary"
          disabled={findingTime !== null && !expired}
        >
          {findingTime ? 'Auditor flagged a finding' : 'Simulate auditor finding'}
        </button>
        <button onClick={() => setFindingTime(null)} className="btn">Reset</button>
        <div className="ml-auto flex items-center gap-2 text-xs muted">
          <span>Sim accel:</span>
          <input type="range" min={3600} max={604_800} step={3600} value={accel} onChange={(e) => setAccel(+e.target.value)} />
          <span className="font-mono">{(accel / 86_400).toFixed(1)} days/sec</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between text-sm">
          <span className="muted">Disclosure window</span>
          <span className="font-mono tabular-nums">
            {findingTime
              ? expired
                ? 'OVERDUE'
                : `${remainingDays.toFixed(2)} days remaining`
              : 'idle'}
          </span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800">
          <div
            className={`h-full transition-[width] duration-100 ${expired ? 'bg-rose-500' : 'bg-amber-500'}`}
            style={{ width: findingTime ? `${Math.min(100, (elapsedDays / days) * 100)}%` : '0%' }}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Window" value={`${days} days`} hint="Major non-conformity disclosure" tone="accent" />
        <Stat label="Auditor must hold" value="ISO 27001 LA · CISA · CISSP" hint={`Accepted credentials: ${credentials.length}`} />
        <Stat label="Status" value={!findingTime ? 'no finding' : (expired ? 'BREACH' : 'within window')} tone={expired ? 'negative' : (findingTime ? 'positive' : 'default')} />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <RegulationBadge id="ukgc.iso27001-version" />
        <RegulationBadge id="ukgc.major-noncon-disclosure-days" />
      </div>
    </Card>
  )
}
