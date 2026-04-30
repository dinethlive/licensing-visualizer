import { useMemo, useState } from 'react'
import Card from '../../../ui/Card'
import NumberInput from '../../../ui/NumberInput'
import Stat from '../../../ui/Stat'
import RegulationBadge from '../../RegulationBadge'
import { getRegulation, FeeRow } from '../../../data/regulations'
import { eur } from '../../../lib/format'

export default function FeeCalculator() {
  const reg = getRegulation<FeeRow[]>('cga.fee-schedule')!
  const fees = reg.value

  const [keyPersons, setKeyPersons] = useState(4)
  const [years, setYears] = useState(3)
  const [ddTier, setDdTier] = useState<'low' | 'high'>('high')

  const calc = useMemo(() => {
    const application   = fees.find((f) => f.label === 'Application fee')!.amountEur
    const licenseAnnual = fees.find((f) => f.label === 'Annual license fee')!.amountEur
    const supervisory   = fees.find((f) => f.label === 'Annual supervisory fee')!.amountEur
    const ddRate = ddTier === 'low'
      ? fees.find((f) => f.label === 'Per-person due diligence (low)')!.amountEur
      : fees.find((f) => f.label === 'Per-person due diligence (high)')!.amountEur

    const ddTotal = keyPersons * ddRate
    const recurringPerYear = licenseAnnual + supervisory
    const total = application + ddTotal + recurringPerYear * years
    return { application, licenseAnnual, supervisory, ddRate, ddTotal, recurringPerYear, total }
  }, [fees, keyPersons, years, ddTier])

  return (
    <Card
      title="Curaçao LOK, total cost-of-licensing calculator"
      description="Direct regulatory fees only. Excludes Tier-IV server CapEx and local-substance OpEx."
      badge={<RegulationBadge id="cga.fee-schedule" compact />}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <NumberInput label="Key persons (UBOs + leadership)" value={keyPersons} onChange={(v) => setKeyPersons(Math.max(0, Math.round(v)))} min={0} max={50} />
        <NumberInput label="Operating horizon (years)" value={years} onChange={(v) => setYears(Math.max(1, Math.round(v)))} min={1} max={10} />
        <div>
          <span className="label">Due-diligence tier</span>
          <div className="flex gap-1">
            <button onClick={() => setDdTier('low')} className={`btn ${ddTier === 'low' ? '!bg-accent-500 !text-white' : ''}`}>{eur(150)}</button>
            <button onClick={() => setDdTier('high')} className={`btn ${ddTier === 'high' ? '!bg-accent-500 !text-white' : ''}`}>{eur(260)}</button>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-ink-200 text-left dark:border-ink-800">
              <th className="py-2 text-xs font-semibold uppercase tracking-wider muted">Line item</th>
              <th className="py-2 text-right text-xs font-semibold uppercase tracking-wider muted">Amount</th>
              <th className="py-2 text-right text-xs font-semibold uppercase tracking-wider muted">Multiplier</th>
              <th className="py-2 text-right text-xs font-semibold uppercase tracking-wider muted">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-ink-100 dark:border-ink-800/60">
              <td className="py-2">Application fee (one-time)</td>
              <td className="py-2 text-right font-mono tabular-nums">{eur(calc.application)}</td>
              <td className="py-2 text-right">×1</td>
              <td className="py-2 text-right font-mono tabular-nums">{eur(calc.application)}</td>
            </tr>
            <tr className="border-b border-ink-100 dark:border-ink-800/60">
              <td className="py-2">Annual license fee</td>
              <td className="py-2 text-right font-mono tabular-nums">{eur(calc.licenseAnnual)}</td>
              <td className="py-2 text-right">×{years}</td>
              <td className="py-2 text-right font-mono tabular-nums">{eur(calc.licenseAnnual * years)}</td>
            </tr>
            <tr className="border-b border-ink-100 dark:border-ink-800/60">
              <td className="py-2">Annual supervisory fee</td>
              <td className="py-2 text-right font-mono tabular-nums">{eur(calc.supervisory)}</td>
              <td className="py-2 text-right">×{years}</td>
              <td className="py-2 text-right font-mono tabular-nums">{eur(calc.supervisory * years)}</td>
            </tr>
            <tr className="border-b border-ink-100 dark:border-ink-800/60">
              <td className="py-2">Per-person due diligence ({ddTier})</td>
              <td className="py-2 text-right font-mono tabular-nums">{eur(calc.ddRate)}</td>
              <td className="py-2 text-right">×{keyPersons}</td>
              <td className="py-2 text-right font-mono tabular-nums">{eur(calc.ddTotal)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-accent-500/40 font-semibold">
              <td className="py-2">{years}-year total (regulatory fees only)</td>
              <td colSpan={2}></td>
              <td className="py-2 text-right font-mono tabular-nums text-accent-500">{eur(calc.total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Year-1 outlay" value={eur(calc.application + calc.recurringPerYear + calc.ddTotal)} tone="accent" />
        <Stat label="Recurring per year" value={eur(calc.recurringPerYear)} hint="License + supervisory" />
        <Stat label="License + supervisory alone" value={eur(47_450)} hint="Quoted in script as the floor before any OpEx" tone="gold" />
      </div>

      <div className="mt-4">
        <RegulationBadge id="cga.fee-schedule" />
      </div>
    </Card>
  )
}
