import Card from '../../../ui/Card'
import RegulationBadge from '../../RegulationBadge'
import { getRegulation } from '../../../data/regulations'

interface ConflictShape {
  gdprPrinciples: string[]
  amlObligations: string[]
  resolution: string
}

const PAIRS = [
  {
    gdpr: 'Transparency, disclose how data is processed',
    aml: '"Tipping off" prohibited, cannot disclose investigation',
    severity: 'direct contradiction',
  },
  {
    gdpr: 'Data minimization, collect only what is necessary',
    aml: 'Extensive collection, IDs, transaction history, behavior',
    severity: 'direct contradiction',
  },
  {
    gdpr: 'Storage limitation, delete when purpose fulfilled',
    aml: 'Long retention, multi-year for investigations',
    severity: 'direct contradiction',
  },
  {
    gdpr: 'Right to erasure',
    aml: 'Suspicious activity reports cannot be deleted',
    severity: 'direct contradiction',
  },
] as const

export default function GdprAmlMatrix() {
  const reg = getRegulation<ConflictShape>('global.gdpr-aml-conflict')!

  return (
    <Card
      title="GDPR vs. AML, the conflict matrix"
      description="Both regimes are binding; neither yields. Compliance-by-Design is the architectural response."
      badge={<RegulationBadge id="global.gdpr-aml-conflict" compact />}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-300">GDPR side</div>
          <ul className="mt-2 space-y-1 text-sm">
            {reg.value.gdprPrinciples.map((p) => (
              <li key={p}>· {p}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">AML side</div>
          <ul className="mt-2 space-y-1 text-sm">
            {reg.value.amlObligations.map((p) => (
              <li key={p}>· {p}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-ink-200 text-left dark:border-ink-800">
              <th className="py-2 pr-2 text-xs font-semibold uppercase tracking-wider muted">GDPR principle</th>
              <th className="py-2 pr-2 text-xs font-semibold uppercase tracking-wider muted">AML obligation</th>
              <th className="py-2 text-xs font-semibold uppercase tracking-wider muted">Conflict</th>
            </tr>
          </thead>
          <tbody>
            {PAIRS.map((p, idx) => (
              <tr key={idx} className="border-b border-ink-100 dark:border-ink-800/60">
                <td className="py-2 pr-2 align-top">{p.gdpr}</td>
                <td className="py-2 pr-2 align-top">{p.aml}</td>
                <td className="py-2 align-top">
                  <span className="chip bg-rose-500/10 text-rose-700 dark:text-rose-300">{p.severity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 rounded-lg bg-accent-500/10 p-3 text-sm text-accent-700 dark:text-accent-300">
        <strong>Resolution:</strong> {reg.value.resolution}
      </p>

      <div className="mt-4">
        <RegulationBadge id="global.gdpr-aml-conflict" />
      </div>
    </Card>
  )
}
