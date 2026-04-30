import Card from '../../../ui/Card'
import RegulationBadge from '../../RegulationBadge'
import { num, getRegulation, MgaLicenseType, FeeRow } from '../../../data/regulations'
import { eur, usd } from '../../../lib/format'

export default function FeeComparator() {
  const cgaFees = getRegulation<FeeRow[]>('cga.fee-schedule')!.value
  const cgaApp = cgaFees.find((f) => f.label === 'Application fee')!.amountEur
  const cgaAnnual = cgaFees.find((f) => f.label === 'Annual license fee')!.amountEur
    + cgaFees.find((f) => f.label === 'Annual supervisory fee')!.amountEur
  const njApp = num('nj.application-fee-usd')
  const mgaTypes = getRegulation<MgaLicenseType[]>('mga.license-types')!.value

  const ROWS = [
    { code: 'CGA', label: 'Curaçao (LOK)',    application: eur(cgaApp), recurring: eur(cgaAnnual) + ' / yr', capital: '-' },
    { code: 'NJ',  label: 'New Jersey (DGE)', application: usd(njApp) + '+', recurring: 'variable, high', capital: '-' },
    { code: 'MGA', label: 'Malta, T1/T2',    application: 'see MGA fee regs', recurring: 'tiered', capital: eur(mgaTypes.find((t) => t.code === 'T1')!.capitalEur) },
    { code: 'MGA', label: 'Malta, T3/T4',    application: 'see MGA fee regs', recurring: 'tiered', capital: eur(mgaTypes.find((t) => t.code === 'T3')!.capitalEur) },
  ]

  return (
    <Card
      title="Fee landscape, at a glance"
      description="Numbers below are pulled live from regulations.ts. Only the directly comparable headline figures are shown; CapEx and OpEx vary by jurisdiction."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-ink-200 text-left dark:border-ink-800">
              <th className="py-2 text-xs font-semibold uppercase tracking-wider muted">Jurisdiction</th>
              <th className="py-2 text-xs font-semibold uppercase tracking-wider muted">Application</th>
              <th className="py-2 text-xs font-semibold uppercase tracking-wider muted">Annual recurring</th>
              <th className="py-2 text-xs font-semibold uppercase tracking-wider muted">Capital floor</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, idx) => (
              <tr key={idx} className="border-b border-ink-100 dark:border-ink-800/60">
                <td className="py-2">
                  <span className="chip bg-accent-500/10 text-accent-700 dark:text-accent-300">{r.code}</span>
                  <span className="ml-2">{r.label}</span>
                </td>
                <td className="py-2 font-mono tabular-nums">{r.application}</td>
                <td className="py-2 font-mono tabular-nums">{r.recurring}</td>
                <td className="py-2 font-mono tabular-nums">{r.capital}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <RegulationBadge id="cga.fee-schedule" compact />
        <RegulationBadge id="nj.application-fee-usd" compact />
        <RegulationBadge id="mga.license-types" compact />
      </div>
    </Card>
  )
}
