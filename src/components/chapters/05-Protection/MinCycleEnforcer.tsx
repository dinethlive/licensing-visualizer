import { useEffect, useRef, useState } from 'react'
import Card from '../../../ui/Card'
import Stat from '../../../ui/Stat'
import RegulationBadge from '../../RegulationBadge'
import { num } from '../../../data/regulations'

export default function MinCycleEnforcer() {
  const minCycle = num('ukgc.min-cycle-seconds')
  const [lastSpinAt, setLastSpinAt] = useState<number | null>(null)
  const [spins, setSpins] = useState(0)
  const [blockedAttempts, setBlockedAttempts] = useState(0)
  const [now, setNow] = useState<number>(Date.now())
  const tickRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    tickRef.current = window.setInterval(() => setNow(Date.now()), 100)
    return () => clearInterval(tickRef.current)
  }, [])

  const elapsedMs = lastSpinAt === null ? Infinity : now - lastSpinAt
  const remainingMs = Math.max(0, minCycle * 1000 - elapsedMs)
  const ready = remainingMs === 0

  const onSpin = () => {
    if (!ready) {
      setBlockedAttempts((b) => b + 1)
      return
    }
    setLastSpinAt(Date.now())
    setSpins((s) => s + 1)
  }

  const reset = () => { setLastSpinAt(null); setSpins(0); setBlockedAttempts(0) }

  return (
    <Card
      title="UKGC 5-second minimum cycle, try to break it"
      description="Hard-coded into game logic. Spam the spin button, the platform refuses bets that arrive inside the cycle window."
      badge={<RegulationBadge id="ukgc.min-cycle-seconds" compact />}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <div className="flex items-baseline justify-between text-sm">
            <span className="muted">Cycle gate</span>
            <span className="font-mono tabular-nums">
              {ready ? 'OPEN' : `${(remainingMs / 1000).toFixed(1)}s remaining`}
            </span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800">
            <div
              className={`h-full transition-[width] duration-100 ${ready ? 'bg-emerald-500' : 'bg-amber-500'}`}
              style={{ width: ready ? '100%' : `${100 - (remainingMs / (minCycle * 1000)) * 100}%` }}
            />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={onSpin}
              className={`btn-primary ${ready ? '' : '!bg-ink-400 !text-ink-200'}`}
            >
              Spin
            </button>
            <button onClick={reset} className="btn">Reset</button>
            <span className="ml-3 text-xs muted">
              Click as fast as you can, the system will only count one bet every {minCycle}s.
            </span>
          </div>
        </div>

        <div className="grid gap-3">
          <Stat label="Accepted spins" value={spins} tone="positive" />
          <Stat label="Blocked attempts" value={blockedAttempts} tone={blockedAttempts > 0 ? 'negative' : 'default'} />
        </div>
      </div>

      <div className="mt-4">
        <RegulationBadge id="ukgc.min-cycle-seconds" />
      </div>
    </Card>
  )
}
