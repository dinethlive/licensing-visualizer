import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, ReferenceLine, ResponsiveContainer, Tooltip } from 'recharts'
import Card from '../../../ui/Card'
import Slider from '../../../ui/Slider'
import Stat from '../../../ui/Stat'
import RegulationBadge from '../../RegulationBadge'

const ALERT_THRESHOLD_PCT = 1.0  // ±1pp from declared RTP triggers investigation

export default function LiveRtpMonitor() {
  const [declaredRtp, setDeclaredRtp] = useState(0.96)
  const [running, setRunning] = useState(true)
  const [points, setPoints] = useState<{ x: number; rtp: number }[]>([])
  const [drift, setDrift] = useState(0) // injected operator-visible drift

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setPoints((prev) => {
        const next = [...prev]
        const x = next.length === 0 ? 0 : next[next.length - 1].x + 1
        // Simulate RTP estimate converging on declared, with noise + injected drift.
        const noise = (Math.random() - 0.5) * 0.04 * Math.exp(-x / 60)
        const rtp = declaredRtp + drift + noise
        next.push({ x, rtp })
        return next.length > 200 ? next.slice(-200) : next
      })
    }, 200)
    return () => clearInterval(id)
  }, [running, declaredRtp, drift])

  const latest = points[points.length - 1]?.rtp ?? declaredRtp
  const deviationPct = Math.abs(latest - declaredRtp) * 100
  const breach = deviationPct > ALERT_THRESHOLD_PCT

  const reset = () => setPoints([])

  return (
    <Card
      title="UKGC live RTP monitoring, standing condition"
      description="Continuous surveillance, not contingent on a flag being raised. Significant deviation triggers immediate investigation."
      badge={<RegulationBadge id="ukgc.live-rtp-monitoring" compact />}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Slider label="Declared RTP" value={declaredRtp} min={0.85} max={0.99} step={0.005} onChange={setDeclaredRtp} format={(v) => `${(v*100).toFixed(1)}%`} />
        <Slider label="Inject operator drift" value={drift} min={-0.04} max={0.04} step={0.005} onChange={setDrift} format={(v) => `${v >= 0 ? '+' : ''}${(v*100).toFixed(1)}pp`} hint="Push the actual return away from declared" />
        <div className="flex items-end gap-2">
          <button onClick={() => setRunning((r) => !r)} className="btn-primary">{running ? 'Pause' : 'Resume'}</button>
          <button onClick={reset} className="btn">Reset</button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Current RTP estimate" value={`${(latest * 100).toFixed(2)}%`} tone={breach ? 'negative' : 'positive'} />
        <Stat label="Deviation" value={`${deviationPct.toFixed(2)}pp`} tone={breach ? 'negative' : 'default'} hint={`Alert at ±${ALERT_THRESHOLD_PCT.toFixed(1)}pp`} />
        <Stat label="Status" value={breach ? 'INVESTIGATION TRIGGERED' : 'within tolerance'} tone={breach ? 'negative' : 'positive'} />
      </div>

      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer>
          <LineChart data={points}>
            <XAxis dataKey="x" hide />
            <YAxis domain={[declaredRtp - 0.06, declaredRtp + 0.06]} tickFormatter={(v) => `${(v*100).toFixed(1)}%`} stroke="currentColor" fontSize={11} />
            <Tooltip
              labelFormatter={() => 'sample'}
              formatter={(v: any) => `${(Number(v) * 100).toFixed(2)}%`}
              contentStyle={{ background: 'rgba(20,22,30,0.92)', border: '1px solid #333', borderRadius: 8, color: '#eee', fontSize: 12 }}
            />
            <ReferenceLine y={declaredRtp} stroke="#5e85ff" strokeDasharray="3 3" />
            <ReferenceLine y={declaredRtp + ALERT_THRESHOLD_PCT/100} stroke="#ef4444" strokeDasharray="2 2" />
            <ReferenceLine y={declaredRtp - ALERT_THRESHOLD_PCT/100} stroke="#ef4444" strokeDasharray="2 2" />
            <Line type="monotone" dataKey="rtp" stroke="#10b981" strokeWidth={1.5} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <RegulationBadge id="ukgc.live-rtp-monitoring" />
      </div>
    </Card>
  )
}
