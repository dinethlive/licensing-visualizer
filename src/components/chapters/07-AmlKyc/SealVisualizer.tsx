import { useState } from 'react'
import Card from '../../../ui/Card'
import RegulationBadge from '../../RegulationBadge'
import { getRegulation } from '../../../data/regulations'

export default function SealVisualizer() {
  const reg = getRegulation<string>('cga.seal-deadline')!
  const deadline = reg.value
  const [seal, setSeal] = useState<'none' | 'green' | 'blue' | 'expired'>('green')

  const SealVisual = ({ kind }: { kind: typeof seal }) => {
    if (kind === 'none')
      return (
        <div className="grid h-32 w-32 place-items-center rounded-2xl border-2 border-dashed border-rose-500 text-xs font-semibold text-rose-500">
          NO SEAL
        </div>
      )
    if (kind === 'expired')
      return (
        <div className="relative grid h-32 w-32 place-items-center rounded-2xl bg-ink-300 text-xs font-bold text-ink-700">
          <span className="line-through opacity-60">EXPIRED</span>
        </div>
      )
    const color = kind === 'green' ? '#10b981' : '#3b82f6'
    const label = kind === 'green' ? 'B2C' : 'B2B'
    return (
      <div
        className="grid h-32 w-32 place-items-center rounded-2xl text-white shadow-lg"
        style={{ backgroundColor: color }}
      >
        <div className="text-center">
          <div className="text-xs font-medium uppercase tracking-wider opacity-80">CGA verified</div>
          <div className="mt-1 text-xl font-bold">{label}</div>
        </div>
      </div>
    )
  }

  return (
    <Card
      title="Curaçao color-coded seal, public-facing transparency"
      description={`Operators required to display the seal across domains by ${deadline}. Click to swap.`}
      badge={<RegulationBadge id="cga.seal-deadline" compact />}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center rounded-xl bg-ink-50 p-6 dark:bg-ink-950">
          <SealVisual kind={seal} />
          <div className="mt-3 flex flex-wrap justify-center gap-1">
            <button onClick={() => setSeal('green')} className={`btn ${seal === 'green' ? '!bg-emerald-500 !text-white' : ''}`}>Green (B2C)</button>
            <button onClick={() => setSeal('blue')} className={`btn ${seal === 'blue' ? '!bg-sky-500 !text-white' : ''}`}>Blue (B2B)</button>
            <button onClick={() => setSeal('none')} className={`btn ${seal === 'none' ? '!bg-rose-500 !text-white' : ''}`}>None</button>
            <button onClick={() => setSeal('expired')} className={`btn ${seal === 'expired' ? '!bg-ink-500 !text-white' : ''}`}>Expired</button>
          </div>
        </div>
        <div>
          <div className="label">Player perspective</div>
          {seal === 'green' && (
            <p className="text-sm">A green seal confirms an active <strong>B2C</strong> license, the player can verify the operator&apos;s standing without contacting the CGA directly.</p>
          )}
          {seal === 'blue' && (
            <p className="text-sm">A blue seal indicates a <strong>B2B</strong> license, typical of a platform/software supplier rather than a consumer-facing site.</p>
          )}
          {seal === 'none' && (
            <p className="text-sm text-rose-600 dark:text-rose-300">No seal displayed. Players, affiliates, and counterparties have no public proof of licensing, a real-time accountability red flag.</p>
          )}
          {seal === 'expired' && (
            <p className="text-sm text-amber-600 dark:text-amber-300">Expired seal. Treat the operator as unlicensed until the seal is refreshed across all domains.</p>
          )}
          <p className="mt-3 text-xs muted">
            The seal is a transparency instrument built directly into the operator&apos;s consumer-facing
            environment, a deliberate choice reflecting the LOK&apos;s orientation toward accountability and visibility.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <RegulationBadge id="cga.seal-deadline" />
      </div>
    </Card>
  )
}
