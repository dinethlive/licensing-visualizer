import { useEffect, useState } from 'react'
import Card from '../../../ui/Card'
import Stat from '../../../ui/Stat'
import RegulationBadge from '../../RegulationBadge'
import { num } from '../../../data/regulations'

type Surface = 'backend' | 'player'

export default function SessionTimeoutSim() {
  const backendMin = num('mga.session-timeout-backend')
  const playerMin = num('mga.session-timeout-player')

  const [surface, setSurface] = useState<Surface>('player')
  const [running, setRunning] = useState(false)
  const [elapsedSec, setElapsedSec] = useState(0)
  const [speed, setSpeed] = useState(60) // seconds simulated per real second

  const limitSec = (surface === 'backend' ? backendMin : playerMin) * 60
  const remaining = Math.max(0, limitSec - elapsedSec)
  const expired = elapsedSec >= limitSec

  useEffect(() => {
    if (!running || expired) return
    const id = setInterval(() => setElapsedSec((s) => s + speed / 10), 100)
    return () => clearInterval(id)
  }, [running, expired, speed])

  const reset = () => { setElapsedSec(0); setRunning(false) }

  const fmt = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <Card
      title="MGA session timeouts, live simulator"
      description="Back-end systems and player terminals run on separate timers. Pick a surface, hit start, accelerate time."
      badge={<RegulationBadge id="mga.session-timeout-player" compact />}
    >
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSurface('player')}
          className={`btn ${surface === 'player' ? '!bg-accent-500 !text-white' : ''}`}
        >
          Player terminal ({playerMin} min)
        </button>
        <button
          onClick={() => setSurface('backend')}
          className={`btn ${surface === 'backend' ? '!bg-accent-500 !text-white' : ''}`}
        >
          Back-end ({backendMin} min)
        </button>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setRunning((r) => !r)} className="btn-primary">
            {running ? 'Pause' : 'Start'}
          </button>
          <button onClick={reset} className="btn">Reset</button>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between text-sm">
          <span className="muted">Inactive time</span>
          <span className="font-mono tabular-nums">{fmt(elapsedSec)} / {fmt(limitSec)}</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800">
          <div
            className={`h-full transition-[width] duration-200 ${expired ? 'bg-rose-500' : 'bg-accent-500'}`}
            style={{ width: `${Math.min(100, (elapsedSec / limitSec) * 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Remaining" value={fmt(remaining)} tone={expired ? 'negative' : 'accent'} />
        <Stat label="Status" value={expired ? 'AUTO LOG-OFF' : (running ? 'monitoring…' : 'idle')} tone={expired ? 'negative' : 'default'} />
        <Stat label="Time accel" value={`${speed}×`} hint="Drag to fast-forward simulation" />
      </div>
      <input
        type="range"
        className="mt-3"
        min={1} max={300} step={1}
        value={speed}
        onChange={(e) => setSpeed(parseInt(e.target.value))}
      />

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <RegulationBadge id="mga.session-timeout-player" />
        <RegulationBadge id="mga.session-timeout-backend" />
      </div>
    </Card>
  )
}
