import Card from '../../../ui/Card'
import RegulationBadge from '../../RegulationBadge'
import { getRegulation } from '../../../data/regulations'

const UNIT_DETAIL: Record<string, string> = {
  'Engineering Unit': 'Hardware certification, slot/EGM evaluation, technical conformance to NJ standards.',
  'Cyber Security and Analytics Unit (CSAU)': 'Advanced analytics for fraud and malicious activity; coordination with federal and international law enforcement.',
  'Information Technology Investigations Unit (ITIU)': 'Technology-driven investigations into licensee misconduct or system abuse.',
  'Quality Assurance Unit': 'Audit of test procedures and ongoing verification of operator and supplier compliance.',
}

export default function NjTsbDiagram() {
  const reg = getRegulation<string[]>('nj.tsb-units')!
  const units = reg.value

  return (
    <Card
      title="New Jersey DGE, Technical Services Bureau"
      description="Four specialized units, each addressing a discrete segment of the compliance environment."
      badge={<RegulationBadge id="nj.tsb-units" compact />}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {units.map((u, idx) => (
          <div key={u} className="rounded-xl border border-ink-200 bg-ink-50 p-3 dark:border-ink-800 dark:bg-ink-950">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-accent-500/15 text-xs font-bold text-accent-600 dark:text-accent-300">
                {idx + 1}
              </span>
              <div className="text-sm font-semibold">{u}</div>
            </div>
            <p className="mt-2 text-sm muted">{UNIT_DETAIL[u]}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <RegulationBadge id="nj.tsb-units" />
      </div>
    </Card>
  )
}
