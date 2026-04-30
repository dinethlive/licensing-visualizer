import { useMemo, useState } from 'react'
import Card from '../../../ui/Card'
import Slider from '../../../ui/Slider'
import RegulationBadge from '../../RegulationBadge'

// Demonstrates the GRA RTOS "mapping" concept: a fair RNG can still produce
// a biased game if the mapping table is biased.

const SYMBOLS = ['🍒','🍋','🔔','⭐','7️⃣','💎']

function fairMap(rngOutput: number) {
  return SYMBOLS[Math.floor(rngOutput * SYMBOLS.length)]
}

function biasedMap(rngOutput: number, jackpotBias: number) {
  // Squeeze probability away from the jackpot symbol.
  // jackpotBias 0 = fair (1/6); 1 = jackpot impossible.
  const baseSlice = 1 / SYMBOLS.length
  const jackpotSlice = baseSlice * (1 - jackpotBias)
  const otherSlice = (1 - jackpotSlice) / (SYMBOLS.length - 1)
  // Cumulative table, jackpot last
  const cumulative: number[] = []
  let acc = 0
  for (let i = 0; i < SYMBOLS.length - 1; i++) { acc += otherSlice; cumulative.push(acc) }
  cumulative.push(1)
  for (let i = 0; i < cumulative.length; i++) {
    if (rngOutput < cumulative[i]) return SYMBOLS[i]
  }
  return SYMBOLS[SYMBOLS.length - 1]
}

export default function MappingBiasDemo() {
  const [bias, setBias] = useState(0)
  const [trials, setTrials] = useState(5000)

  const tally = useMemo(() => {
    const fair: Record<string, number> = {}
    const biased: Record<string, number> = {}
    for (const s of SYMBOLS) { fair[s] = 0; biased[s] = 0 }
    for (let i = 0; i < trials; i++) {
      const r = Math.random()
      fair[fairMap(r)]++
      biased[biasedMap(r, bias)]++
    }
    return { fair, biased }
  }, [bias, trials])

  const maxCount = Math.max(...Object.values(tally.fair), ...Object.values(tally.biased))

  return (
    <Card
      title="Mapping bias, same RNG, different game"
      description='Per the GRA RTOS, "mapping" is the step where an RNG output becomes a usable game value (a card, a reel symbol). A fair RNG paired with a biased mapping table produces a biased game.'
      badge={<RegulationBadge id="gra.rtos-mapping-definition" compact />}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Slider label="Jackpot symbol bias" value={bias} min={0} max={0.95} step={0.05} onChange={setBias} format={(v) => `${(v*100).toFixed(0)}%`} hint="0% = fair table; 95% = jackpot near-impossible" />
        <Slider label="Trials" value={trials} min={500} max={50_000} step={500} onChange={setTrials} format={(v) => v.toLocaleString()} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <div className="label">Fair mapping table</div>
          {SYMBOLS.map((s) => (
            <Bar key={s} symbol={s} count={tally.fair[s]} max={maxCount} color="bg-emerald-500" />
          ))}
        </div>
        <div>
          <div className="label">Biased mapping table (jackpot suppressed)</div>
          {SYMBOLS.map((s, idx) => (
            <Bar key={s} symbol={s} count={tally.biased[s]} max={maxCount} color={idx === SYMBOLS.length - 1 ? 'bg-rose-500' : 'bg-accent-500'} />
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed">
        The 💎 jackpot symbol is mathematically rarer in the right column even though both columns share the same RNG.
        Gibraltar&apos;s definition closes this loophole, the mapping process itself must be demonstrably fair.
      </p>

      <div className="mt-4">
        <RegulationBadge id="gra.rtos-mapping-definition" />
      </div>
    </Card>
  )
}

function Bar({ symbol, count, max, color }: { symbol: string; count: number; max: number; color: string }) {
  const pct = max === 0 ? 0 : (count / max) * 100
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="w-6 text-base">{symbol}</span>
      <div className="flex-1 overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800">
        <div className={`h-3 ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-14 text-right font-mono text-xs tabular-nums">{count}</span>
    </div>
  )
}
