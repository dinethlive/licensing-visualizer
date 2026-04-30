import { useState } from 'react'
import Card from '../../../ui/Card'
import { JURISDICTIONS, regulationsByJurisdiction, Jurisdiction } from '../../../data/regulations'
import RegulationBadge from '../../RegulationBadge'

const PHILOSOPHY: Record<Jurisdiction, { headline: string; emphasis: string }> = {
  MGA:     { headline: 'Lifecycle audit',           emphasis: 'continuous regulatory exposure via ad-hoc audits' },
  UKGC:    { headline: 'Game-design intervention',  emphasis: 'mandatory product-level constraints' },
  CGA:     { headline: 'Local substance + Tier-IV', emphasis: 'physicality as proof of accountability' },
  GRA:     { headline: 'Management-location trigger',emphasis: 'where decisions are made, not where servers sit' },
  'NJ-DGE':{ headline: 'Property-level enforcement',emphasis: 'granular geolocation + intelligence-led security' },
  'PA-PGCB':{ headline: 'Player-protection ecosystem',emphasis: 'reality checks, self-exclusion, behavioral analytics' },
  LK:      { headline: 'Unification + delegation',   emphasis: 'first unified regulator; many parameters deferred to Gazette Orders' },
  GLOBAL:  { headline: 'Cross-cutting',              emphasis: 'applies regardless of jurisdiction' },
}

export default function InvisibleArchitectureMap() {
  const [active, setActive] = useState<Jurisdiction>('MGA')
  const regs = regulationsByJurisdiction(active)
  const phil = PHILOSOPHY[active]

  return (
    <Card
      title="The matrix beneath every spin"
      description="Pick a regulator to see its philosophy and the live regulations this visualizer tracks for it."
    >
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {JURISDICTIONS.map((j) => {
          const isActive = j.code === active
          return (
            <button
              key={j.code}
              onClick={() => setActive(j.code)}
              className={
                'rounded-xl border p-3 text-left transition-colors ' +
                (isActive
                  ? 'border-accent-500 bg-accent-500/10'
                  : 'border-ink-200 hover:border-accent-400 dark:border-ink-700')
              }
            >
              <div className="text-xl">{j.flag}</div>
              <div className="mt-1 text-sm font-semibold">{j.code}</div>
              <div className="text-xs muted">{j.name.split(', ').pop()}</div>
            </button>
          )
        })}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="label">Philosophy</div>
          <div className="text-base font-semibold">{phil.headline}</div>
          <p className="mt-1 text-sm muted">{phil.emphasis}</p>
        </div>
        <div className="lg:col-span-2">
          <div className="label">Tracked regulations ({regs.length})</div>
          <ul className="space-y-2">
            {regs.map((r) => (
              <li key={r.id}>
                <RegulationBadge id={r.id} />
              </li>
            ))}
            {regs.length === 0 && <li className="text-sm muted">No regulations populated for this jurisdiction yet.</li>}
          </ul>
        </div>
      </div>
    </Card>
  )
}
