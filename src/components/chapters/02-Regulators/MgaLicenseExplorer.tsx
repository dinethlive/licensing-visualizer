import { useState } from 'react'
import Card from '../../../ui/Card'
import Stat from '../../../ui/Stat'
import RegulationBadge from '../../RegulationBadge'
import { getRegulation, MgaLicenseType } from '../../../data/regulations'
import { eur } from '../../../lib/format'

export default function MgaLicenseExplorer() {
  const reg = getRegulation<MgaLicenseType[]>('mga.license-types')!
  const [active, setActive] = useState<MgaLicenseType['code']>('T1')
  const types = reg.value
  const current = types.find((t) => t.code === active)!

  return (
    <Card
      title="MGA license types, capital filter"
      description="The MGA's first filter on entry: tiered share-capital thresholds tied to the mechanical nature of the service."
      badge={<RegulationBadge id="mga.license-types" compact />}
    >
      <div className="grid gap-2 sm:grid-cols-4">
        {types.map((t) => {
          const isActive = t.code === active
          return (
            <button
              key={t.code}
              onClick={() => setActive(t.code)}
              className={
                'rounded-xl border p-3 text-left transition-colors ' +
                (isActive
                  ? 'border-accent-500 bg-accent-500/10'
                  : 'border-ink-200 hover:border-accent-400 dark:border-ink-700')
              }
            >
              <div className="text-xs font-mono muted">{t.code}</div>
              <div className="text-base font-semibold tabular-nums">{eur(t.capitalEur)}</div>
              <div className="text-xs muted">share capital</div>
            </button>
          )
        })}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Stat label={current.code} value={current.label} hint={current.description} tone="accent" />
        <Stat label="Minimum capital" value={eur(current.capitalEur)} hint="MGA Gaming Licence Fees Regulations" tone="gold" />
      </div>

      <div className="mt-4">
        <RegulationBadge id="mga.license-types" />
      </div>
    </Card>
  )
}
