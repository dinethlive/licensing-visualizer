import ChapterShell from '../../ChapterShell'
import SourceQuote from '../../SourceQuote'
import FeeComparator from './FeeComparator'
import FeeCalculator from './FeeCalculator'
import NjFirstTimeline from './NjFirstTimeline'

export default function Chapter8() {
  return (
    <ChapterShell
      number={8}
      title="The Price of Entry"
      subtitle="Licensing Economics"
      intro={
        <p>
          Curaçao&apos;s offshore-discount era ended on 24 December 2024. The LOK&apos;s combined annual fees
          alone reach €47,450 before any operational expenditure, calibrated to fund supervisory capacity that
          gives the CGA credibility as a serious regulatory authority. New Jersey applies a different escape
          valve to the same problem: parallel review under the &quot;New Jersey First&quot; pathway.
        </p>
      }
    >
      <SourceQuote chapter={8} section="8.1" />
      <FeeComparator />
      <FeeCalculator />

      <SourceQuote chapter={8} section="8.3" />
      <NjFirstTimeline />
    </ChapterShell>
  )
}
