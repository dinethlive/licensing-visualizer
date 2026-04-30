import { useState } from 'react'
import Card from '../../../ui/Card'
import Slider from '../../../ui/Slider'
import RegulationBadge from '../../RegulationBadge'
import { num } from '../../../data/regulations'

const ANG_USD = 0.55  // approximate FX
const ANG_EUR = 0.51

export default function KycThresholdSim() {
  const trigger = num('cga.aml-trigger-ang')
  const [deposit, setDeposit] = useState(2000)
  const triggered = deposit >= trigger
  const usd = deposit * ANG_USD
  const eur = deposit * ANG_EUR

  return (
    <Card
      title="Curaçao LOK KYC trigger"
      description="Operators must initiate identity verification once the player crosses the AML threshold."
      badge={<RegulationBadge id="cga.aml-trigger-ang" compact />}
    >
      <Slider
        label="Cumulative deposit (ANG)"
        value={deposit}
        min={500}
        max={10000}
        step={50}
        onChange={setDeposit}
        format={(v) => `ƒ ${v.toLocaleString('en-US')}`}
      />

      <div className="mt-3 grid gap-2 sm:grid-cols-3 text-sm">
        <div className="rounded-lg bg-ink-50 p-2 dark:bg-ink-950"><span className="muted">USD eq:</span> <span className="font-mono">${usd.toFixed(0)}</span></div>
        <div className="rounded-lg bg-ink-50 p-2 dark:bg-ink-950"><span className="muted">EUR eq:</span> <span className="font-mono">€{eur.toFixed(0)}</span></div>
        <div className="rounded-lg bg-ink-50 p-2 dark:bg-ink-950"><span className="muted">Trigger:</span> <span className="font-mono">ƒ {trigger.toLocaleString()}</span></div>
      </div>

      <div className={`mt-4 rounded-xl border p-4 ${triggered ? 'border-rose-500/40 bg-rose-500/5' : 'border-emerald-500/40 bg-emerald-500/5'}`}>
        <div className={`text-sm font-semibold ${triggered ? 'text-rose-600 dark:text-rose-300' : 'text-emerald-600 dark:text-emerald-300'}`}>
          {triggered ? 'KYC TRIGGERED, initiate immediate verification' : 'Under threshold, standard onboarding'}
        </div>
        {triggered && (
          <ol className="mt-2 list-decimal space-y-0.5 pl-5 text-sm">
            <li>Government-issued identity document</li>
            <li>Proof of address</li>
            <li>Source-of-funds documentation</li>
          </ol>
        )}
      </div>

      <div className="mt-4">
        <RegulationBadge id="cga.aml-trigger-ang" />
      </div>
    </Card>
  )
}
