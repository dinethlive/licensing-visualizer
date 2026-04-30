import { useState } from 'react'
import Card from '../../../ui/Card'
import RegulationBadge from '../../RegulationBadge'

const PROPERTY_RADIUS = 90 // pixels
const BOUNDARY = { x: 150, y: 150 }
const BUFFER = 8

export default function GeolocationBoundarySim() {
  const [pos, setPos] = useState({ x: 150, y: 150 })

  const dx = pos.x - BOUNDARY.x
  const dy = pos.y - BOUNDARY.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  const inside = dist <= PROPERTY_RADIUS - BUFFER

  return (
    <Card
      title="N.J.A.C. 13:69O-1.2(e), property-level geolocation"
      description="Drag the player marker. Wagering is enabled only while inside the approved casino-hotel perimeter."
      badge={<RegulationBadge id="nj.geolocation-mandate" compact />}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <svg viewBox="0 0 300 300" className="w-full rounded-xl border border-ink-200 bg-ink-50 dark:border-ink-800 dark:bg-ink-950">
            <defs>
              <radialGradient id="boundary" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(94,133,255,0.20)" />
                <stop offset="100%" stopColor="rgba(94,133,255,0.05)" />
              </radialGradient>
            </defs>
            {/* Property boundary */}
            <circle cx={BOUNDARY.x} cy={BOUNDARY.y} r={PROPERTY_RADIUS} fill="url(#boundary)" stroke="#5e85ff" strokeWidth={1.5} strokeDasharray="4 4" />
            <circle cx={BOUNDARY.x} cy={BOUNDARY.y} r={3} fill="#5e85ff" />
            <text x={BOUNDARY.x + 8} y={BOUNDARY.y - 4} className="text-[10px]" fill="#5e85ff">approved property</text>

            {/* Player marker (drag) */}
            <g
              style={{ cursor: 'grab' }}
              onMouseDown={(e) => {
                const svg = (e.target as SVGElement).ownerSVGElement!
                const move = (ev: MouseEvent) => {
                  const rect = svg.getBoundingClientRect()
                  const x = ((ev.clientX - rect.left) / rect.width) * 300
                  const y = ((ev.clientY - rect.top) / rect.height) * 300
                  setPos({ x: Math.max(10, Math.min(290, x)), y: Math.max(10, Math.min(290, y)) })
                }
                const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
                window.addEventListener('mousemove', move)
                window.addEventListener('mouseup', up)
              }}
            >
              <circle cx={pos.x} cy={pos.y} r={10} fill={inside ? '#10b981' : '#ef4444'} stroke="#0a0c12" strokeWidth={1.5} />
              <text x={pos.x + 14} y={pos.y + 4} className="text-[11px] font-semibold" fill="currentColor">Player</text>
            </g>
          </svg>
          <p className="mt-2 text-xs muted">Drag the green/red dot. The system tracks position on login and at intervals, boundary breach triggers immediate cessation.</p>
        </div>

        <div className="space-y-3">
          <div className={`rounded-xl border p-4 ${inside ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-rose-500/40 bg-rose-500/5'}`}>
            <div className="text-xs font-semibold uppercase tracking-wider muted">Wagering status</div>
            <div className={`mt-1 text-2xl font-semibold ${inside ? 'text-emerald-500' : 'text-rose-500'}`}>
              {inside ? 'Enabled' : 'CEASED'}
            </div>
            <p className="mt-1 text-xs">
              {inside
                ? 'Player inside approved property perimeter, bets accepted.'
                : 'Player crossed perimeter. Mobile terminal disables wagering immediately. No manual review.'}
            </p>
          </div>
          <div className="text-xs muted">
            Distance to boundary centre: <span className="font-mono tabular-nums">{dist.toFixed(0)}px</span>
          </div>
          <RegulationBadge id="nj.geolocation-mandate" />
        </div>
      </div>
    </Card>
  )
}
