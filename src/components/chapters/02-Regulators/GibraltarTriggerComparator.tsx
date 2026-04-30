import { useState } from 'react'
import Card from '../../../ui/Card'
import RegulationBadge from '../../RegulationBadge'

interface Scenario {
  id: string
  label: string
  managementInGibraltar: boolean
  serversInGibraltar: boolean
  notes: string
}

const SCENARIOS: Scenario[] = [
  {
    id: 'a',
    label: 'Operations team in Gibraltar, servers in Frankfurt',
    managementInGibraltar: true,
    serversInGibraltar: false,
    notes: 'Classic post-2005 escape route, used to fall outside the Gambling Act 2005 trigger.',
  },
  {
    id: 'b',
    label: 'Servers in Gibraltar, operations in Manila',
    managementInGibraltar: false,
    serversInGibraltar: true,
    notes: 'Triggered the 2005 Act but would now fall outside the 2025 Bill\'s management test.',
  },
  {
    id: 'c',
    label: 'Both management and servers in Gibraltar',
    managementInGibraltar: true,
    serversInGibraltar: true,
    notes: 'Always triggered a Gibraltar license, both regimes agree.',
  },
  {
    id: 'd',
    label: 'Neither management nor servers in Gibraltar',
    managementInGibraltar: false,
    serversInGibraltar: false,
    notes: 'No Gibraltar nexus under either regime.',
  },
]

function verdict(scenario: Scenario, regime: '2005' | '2025') {
  if (regime === '2005') return scenario.serversInGibraltar
  return scenario.managementInGibraltar
}

export default function GibraltarTriggerComparator() {
  const [active, setActive] = useState<string>('a')
  const sc = SCENARIOS.find((s) => s.id === active)!
  const v2005 = verdict(sc, '2005')
  const v2025 = verdict(sc, '2025')
  const flipped = v2005 !== v2025

  return (
    <Card
      title="Gibraltar, what triggers a license?"
      description="The 2025 Bill swaps a hardware-location test for a management-location test. Pick a scenario to see who needs a license, when."
      badge={<RegulationBadge id="gra.licensing-trigger" compact />}
    >
      <div className="grid gap-2 sm:grid-cols-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={
              'rounded-xl border p-3 text-left text-sm transition-colors ' +
              (s.id === active
                ? 'border-accent-500 bg-accent-500/10'
                : 'border-ink-200 hover:border-accent-400 dark:border-ink-700')
            }
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className={`rounded-xl border p-4 ${v2005 ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-rose-500/40 bg-rose-500/5'}`}>
          <div className="text-xs font-semibold uppercase tracking-wider muted">Gambling Act 2005</div>
          <div className="mt-1 text-base font-semibold">Trigger: gaming equipment in Gibraltar</div>
          <div className={`mt-3 text-2xl font-semibold ${v2005 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {v2005 ? 'License required' : 'No license required'}
          </div>
        </div>
        <div className={`rounded-xl border p-4 ${v2025 ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-rose-500/40 bg-rose-500/5'}`}>
          <div className="text-xs font-semibold uppercase tracking-wider muted">Gambling Bill 2025</div>
          <div className="mt-1 text-base font-semibold">Trigger: organization/management in Gibraltar</div>
          <div className={`mt-3 text-2xl font-semibold ${v2025 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {v2025 ? 'License required' : 'No license required'}
          </div>
        </div>
      </div>

      {flipped && (
        <p className="mt-3 rounded-lg bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300">
          ⚠ This scenario&apos;s outcome flips between regimes. {sc.notes}
        </p>
      )}
      {!flipped && (
        <p className="mt-3 text-sm muted">{sc.notes}</p>
      )}

      <div className="mt-4">
        <RegulationBadge id="gra.licensing-trigger" />
      </div>
    </Card>
  )
}
