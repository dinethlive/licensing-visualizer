import Card from '../../../ui/Card'
import RegulationBadge from '../../RegulationBadge'

const TIMELINE = [
  { date: 'Pre-2024-12-24', title: 'Master-license era',
    body: 'A small number of master license holders authorized to issue sub-licenses. Layered structure offered flexibility but attracted criticism for lack of transparency.' },
  { date: '2024-12-24',     title: 'LOK in force',
    body: 'National Ordinance on Games of Chance commences. All licensing transfers directly to the CGA; sub-licensing abolished.' },
  { date: 'Year 4 milestone', title: '+1 key person locally',
    body: 'At least one key person beyond the managing director must be engaged locally.' },
  { date: 'Year 5 milestone', title: '+3 key persons locally',
    body: 'Threshold rises to three key persons engaged locally, substantive economic presence.' },
  { date: '2026-01-30',     title: 'Digital seal deadline',
    body: 'Operators required to display green (B2C) / blue (B2B) seal across domains.' },
] as const

export default function CuracaoTimeline() {
  return (
    <Card
      title="Curaçao, from master-license to LOK"
      description="A two-decade structural transformation compressed into a five-step timeline."
      badge={<RegulationBadge id="cga.lok-effective-date" compact />}
    >
      <ol className="relative space-y-4 border-l border-accent-500/30 pl-5">
        {TIMELINE.map((step, idx) => (
          <li key={idx} className="relative">
            <div className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-accent-500 ring-4 ring-accent-500/20" />
            <div className="text-xs font-mono tabular-nums muted">{step.date}</div>
            <div className="text-sm font-semibold">{step.title}</div>
            <p className="mt-0.5 text-sm leading-relaxed">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <RegulationBadge id="cga.lok-effective-date" />
        <RegulationBadge id="cga.local-presence-key-persons" />
      </div>
    </Card>
  )
}
