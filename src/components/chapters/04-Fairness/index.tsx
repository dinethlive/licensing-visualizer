import ChapterShell from '../../ChapterShell'
import SourceQuote from '../../SourceQuote'
import MappingBiasDemo from './MappingBiasDemo'
import LiveRtpMonitor from './LiveRtpMonitor'

export default function Chapter4() {
  return (
    <ChapterShell
      number={4}
      title="The Fairness Engine"
      subtitle="RNGs, Mapping, RTP"
      intro={
        <p>
          The RNG is the most consequential piece of technology in any iGaming platform, but it&apos;s
          only half the fairness story. Gibraltar&apos;s RTOS makes the second half explicit: the
          mapping table that turns RNG output into game values must itself be fair. Then the UKGC layers
          continuous live RTP monitoring on top.
        </p>
      }
    >
      <SourceQuote chapter={4} section="4.2" />
      <MappingBiasDemo />

      <SourceQuote chapter={4} section="4.3" />
      <LiveRtpMonitor />
    </ChapterShell>
  )
}
