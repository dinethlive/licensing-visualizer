import { useMemo, useState } from 'react'
import Card from '../../../ui/Card'
import Slider from '../../../ui/Slider'
import Stat from '../../../ui/Stat'
import RegulationBadge from '../../RegulationBadge'
import { num } from '../../../data/regulations'

const TIERS = [
  { name: 'Tier I',  uptime: 0.99671, downtimeMin: 1729 },
  { name: 'Tier II', uptime: 0.99749, downtimeMin: 1320 },
  { name: 'Tier III',uptime: 0.99982, downtimeMin: 95 },
  { name: 'Tier IV', uptime: 0.99995, downtimeMin: 26.3 },  // pulled from regulations.ts below
]

export default function TierIVDowntimeCalc() {
  const tier4Mandated = num('cga.tier-iv-downtime-minutes')
  const [bets, setBets] = useState(500)         // bets per second peak
  const [stake, setStake] = useState(2)         // average stake in EUR
  const [edgePct, setEdgePct] = useState(0.04)  // operator margin

  const ggrPerMinute = bets * 60 * stake * edgePct
  const tiers = useMemo(
    () => TIERS.map((t) => ({
      ...t,
      forgoneEUR: ggrPerMinute * (t.name === 'Tier IV' ? tier4Mandated : t.downtimeMin),
    })),
    [ggrPerMinute, tier4Mandated],
  )

  return (
    <Card
      title="Tier-IV downtime budget"
      description="LOK-mandated maximum downtime, visualized against operator-revenue impact across data-center tiers."
      badge={<RegulationBadge id="cga.tier-iv-downtime-minutes" compact />}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Slider label="Peak bets / second" value={bets} min={50} max={2000} step={10} onChange={setBets} format={(v) => v.toString()} />
        <Slider label="Avg stake (EUR)" value={stake} min={0.1} max={20} step={0.1} onChange={setStake} format={(v) => `€${v.toFixed(1)}`} />
        <Slider label="Operator edge" value={edgePct} min={0.01} max={0.10} step={0.005} onChange={setEdgePct} format={(v) => `${(v*100).toFixed(1)}%`} />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((t) => {
          const isMandated = t.name === 'Tier IV'
          return (
            <div key={t.name} className={`rounded-xl border p-3 ${isMandated ? 'border-accent-500 bg-accent-500/10' : 'border-ink-200 dark:border-ink-700'}`}>
              <div className="flex items-baseline justify-between">
                <div className="text-sm font-semibold">{t.name}</div>
                {isMandated && <span className="chip bg-accent-500 text-white">LOK mandate</span>}
              </div>
              <div className="mt-1 text-2xl font-semibold tabular-nums">{t.downtimeMin.toFixed(1)} min</div>
              <div className="text-xs muted">theoretical downtime / yr</div>
              <div className="mt-2 text-xs muted">If outage hits peak hours:</div>
              <div className="text-base font-semibold tabular-nums text-rose-500">
                €{Math.round(t.forgoneEUR).toLocaleString('en-IE')}
              </div>
              <div className="text-[11px] muted">forgone GGR</div>
            </div>
          )
        })}
      </div>

      <Stat
        className="mt-4"
        label="Master Node residency"
        value="Physical hardware in Curaçao"
        hint="LOK draws a deliberate line: cloud is permissible for front-end delivery, but the transactional/data-of-record layer must sit on territory."
        tone="accent"
      />

      <div className="mt-4">
        <RegulationBadge id="cga.tier-iv-downtime-minutes" />
      </div>
    </Card>
  )
}
