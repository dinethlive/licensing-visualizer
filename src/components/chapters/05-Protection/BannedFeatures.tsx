import Card from '../../../ui/Card'
import RegulationBadge from '../../RegulationBadge'
import { getRegulation } from '../../../data/regulations'

const REASONS: Record<string, string> = {
  'turbo mode':  'Compresses animation duration, raising effective game cycles per minute.',
  'quick spin':  'Same compression as turbo, presented as a settings toggle.',
  'slam stop':   'Allows manual interruption of reel animation, eliminating the natural decision pause.',
}

export default function BannedFeatures() {
  const banned = getRegulation<string[]>('ukgc.banned-features')!.value
  const autoplay = getRegulation('ukgc.autoplay-prohibition')!
  const sim = getRegulation('ukgc.simultaneous-play-ban')!
  const net = getRegulation('ukgc.net-position-display')!

  return (
    <Card
      title="UKGC RTS, banned acceleration features"
      description="Each feature compressed time between financial decisions. The January 2025 changes eliminate them at the game-engine level."
      badge={<RegulationBadge id="ukgc.banned-features" compact />}
    >
      <div className="grid gap-2 sm:grid-cols-3">
        {banned.map((b) => (
          <div key={b} className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3">
            <div className="text-sm font-semibold capitalize">{b}</div>
            <div className="text-xs muted">PROHIBITED</div>
            <p className="mt-2 text-xs">{REASONS[b] ?? ''}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <RegulationBadge id="ukgc.autoplay-prohibition" />
        <RegulationBadge id="ukgc.simultaneous-play-ban" />
        <RegulationBadge id="ukgc.net-position-display" />
      </div>

      <p className="mt-4 text-xs muted">
        Three more standing rules pulled live: autoplay = {String(autoplay.value)}, simultaneous play = {String(sim.value)},
        net-position display = {String(net.value)}.
      </p>
    </Card>
  )
}
