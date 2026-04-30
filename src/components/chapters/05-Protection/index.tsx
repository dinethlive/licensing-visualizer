import ChapterShell from '../../ChapterShell'
import SourceQuote from '../../SourceQuote'
import MinCycleEnforcer from './MinCycleEnforcer'
import FalseWinDetector from './FalseWinDetector'
import BannedFeatures from './BannedFeatures'

export default function Chapter5() {
  return (
    <ChapterShell
      number={5}
      title="The Human Shield"
      subtitle="Responsible Game Design"
      intro={
        <p>
          Game fairness is mathematical. Player protection is experiential. The UKGC&apos;s January 2025 RTS overhaul
          imposes hard, technical constraints on the games themselves, minimum cycle time, banned features,
          mandatory net-position display, and a hard ban on celebratory cues for net-loss outcomes.
        </p>
      }
    >
      <SourceQuote chapter={5} section="5.1" />
      <MinCycleEnforcer />
      <FalseWinDetector />
      <BannedFeatures />
    </ChapterShell>
  )
}
