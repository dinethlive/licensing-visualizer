import Card from '../../../ui/Card'
import RegulationBadge from '../../RegulationBadge'

interface Cell {
  jurisdiction: string
  value: string
  badgeId?: string
}

interface Row {
  principle: string
  cells: Cell[]
}

const ROWS: Row[] = [
  {
    principle: 'Player-protection minimum game cycle',
    cells: [
      { jurisdiction: 'MGA',     value: '- (not codified)' },
      { jurisdiction: 'UKGC',    value: '5 seconds (mandatory)', badgeId: 'ukgc.min-cycle-seconds' },
      { jurisdiction: 'CGA',     value: '- (not codified)' },
      { jurisdiction: 'GRA',     value: '- (RTOS focus on integrity)' },
      { jurisdiction: 'NJ-DGE',  value: '- (geolocation-led)' },
      { jurisdiction: 'PA-PGCB', value: '- (reality-check led)' },
    ],
  },
  {
    principle: 'AML / identity-verification trigger',
    cells: [
      { jurisdiction: 'MGA',     value: 'risk-based' },
      { jurisdiction: 'UKGC',    value: 'risk-based + RTS' },
      { jurisdiction: 'CGA',     value: 'ANG 4,000 (~USD 2,200)', badgeId: 'cga.aml-trigger-ang' },
      { jurisdiction: 'GRA',     value: 'risk-based' },
      { jurisdiction: 'NJ-DGE',  value: 'at registration + transaction-tier' },
      { jurisdiction: 'PA-PGCB', value: 'multi-step at registration (front-loaded)' },
    ],
  },
  {
    principle: 'Cybersecurity audit standard',
    cells: [
      { jurisdiction: 'MGA',     value: 'system audit + GCA' },
      { jurisdiction: 'UKGC',    value: 'ISO/IEC 27001:2022', badgeId: 'ukgc.iso27001-version' },
      { jurisdiction: 'CGA',     value: 'aligns to ISO 27001' },
      { jurisdiction: 'GRA',     value: 'CAF (4 objectives)', badgeId: 'gra.caf-objectives' },
      { jurisdiction: 'NJ-DGE',  value: 'annual integrity assessment' },
      { jurisdiction: 'PA-PGCB', value: 'Subpart L technical standards' },
    ],
  },
  {
    principle: 'Geolocation enforcement granularity',
    cells: [
      { jurisdiction: 'MGA',     value: 'jurisdictional' },
      { jurisdiction: 'UKGC',    value: 'jurisdictional' },
      { jurisdiction: 'CGA',     value: 'jurisdictional' },
      { jurisdiction: 'GRA',     value: 'jurisdictional' },
      { jurisdiction: 'NJ-DGE',  value: 'PROPERTY-LEVEL', badgeId: 'nj.geolocation-mandate' },
      { jurisdiction: 'PA-PGCB', value: 'state boundary' },
    ],
  },
  {
    principle: 'Licensing trigger',
    cells: [
      { jurisdiction: 'MGA',     value: 'service offered to MT residents' },
      { jurisdiction: 'UKGC',    value: 'GB-facing remote service' },
      { jurisdiction: 'CGA',     value: 'CW-licensed entity' },
      { jurisdiction: 'GRA',     value: 'MANAGEMENT in Gibraltar', badgeId: 'gra.licensing-trigger' },
      { jurisdiction: 'NJ-DGE',  value: 'wagering on NJ soil' },
      { jurisdiction: 'PA-PGCB', value: 'wagering on PA soil' },
    ],
  },
]

export default function HarmonizationGap() {
  return (
    <Card
      title="The harmonization gap"
      description="Universal principles, divergent implementations. The gap is the operator's central operational challenge."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-ink-200 text-left dark:border-ink-800">
              <th className="py-2 pr-2 text-xs font-semibold uppercase tracking-wider muted">Principle</th>
              {ROWS[0].cells.map((c) => (
                <th key={c.jurisdiction} className="py-2 pr-2 text-xs font-semibold uppercase tracking-wider muted">
                  {c.jurisdiction}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.principle} className="border-b border-ink-100 align-top dark:border-ink-800/60">
                <td className="py-2 pr-2 font-semibold">{row.principle}</td>
                {row.cells.map((c) => (
                  <td key={c.jurisdiction} className="py-2 pr-2">
                    <div className={`text-xs ${c.badgeId ? 'font-semibold text-accent-700 dark:text-accent-300' : 'muted'}`}>{c.value}</div>
                    {c.badgeId && (
                      <div className="mt-1">
                        <RegulationBadge id={c.badgeId} compact />
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs muted">
        Where a cell shows a live regulation chip, the value comes straight from <code className="font-mono">regulations.ts</code> -
        change it there and it updates here.
      </p>
    </Card>
  )
}
