import { useEffect, useState } from 'react'
import Card from '../../../ui/Card'
import Stat from '../../../ui/Stat'
import RegulationBadge from '../../RegulationBadge'
import { num } from '../../../data/regulations'

export default function NjFirstTimeline() {
  const window = num('nj.first-pathway-window-days')
  const [day, setDay] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setDay((d) => {
        if (d >= window + 7) { setRunning(false); return d }
        return d + 0.5
      })
    }, 200)
    return () => clearInterval(id)
  }, [running, window])

  const pctFull = Math.min(100, (day / window) * 100)
  const fieldTrialEligible = day > window
  const labsParallel = day >= 0 // labs run from day 0

  return (
    <Card
      title='"New Jersey First" pathway, parallel review timeline'
      description={`Manufacturers submit to the DGE and to independent labs simultaneously. After ${window} days, the DGE may grant field-trial approval if its review is incomplete.`}
      badge={<RegulationBadge id="nj.first-pathway-window-days" compact />}
    >
      <div className="flex items-center gap-2">
        <button onClick={() => setRunning((r) => !r)} className="btn-primary">{running ? 'Pause' : (day === 0 ? 'Start' : 'Resume')}</button>
        <button onClick={() => { setDay(0); setRunning(false) }} className="btn">Reset</button>
        <span className="ml-3 text-sm muted">Day {day.toFixed(1)} of submission</span>
      </div>

      <div className="mt-4 space-y-3">
        <Lane
          label="DGE review"
          progress={pctFull}
          color="bg-accent-500"
          status={day >= window ? 'window expired, field-trial approval available' : 'in review'}
        />
        <Lane
          label="Independent lab evaluation (parallel)"
          progress={Math.min(100, (day / (window + 5)) * 100)}
          color="bg-emerald-500"
          status={labsParallel ? 'running in parallel' : 'pending'}
        />
        <Lane
          label="Field-trial deployment"
          progress={fieldTrialEligible ? 100 : 0}
          color="bg-amber-500"
          status={fieldTrialEligible ? 'live in casino, full vetting continues' : 'awaiting day-14 trigger'}
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Window" value={`${window} days`} tone="accent" />
        <Stat label="Day" value={day.toFixed(1)} tone={fieldTrialEligible ? 'positive' : 'default'} />
        <Stat label="Field trial" value={fieldTrialEligible ? 'AUTHORIZED' : 'pending'} tone={fieldTrialEligible ? 'positive' : 'default'} />
      </div>

      <p className="mt-3 text-xs muted">
        The pathway is a <em>sequencing</em> adjustment, not a reduction in standards: all software from operating
        system through to critical game logic remains subject to full DGE technical vetting.
      </p>

      <div className="mt-4">
        <RegulationBadge id="nj.first-pathway-window-days" />
      </div>
    </Card>
  )
}

function Lane({ label, progress, color, status }: { label: string; progress: number; color: string; status: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-semibold">{label}</span>
        <span className="muted">{status}</span>
      </div>
      <div className="mt-1 h-3 overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800">
        <div className={`h-full ${color} transition-[width] duration-200`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
