import ChapterShell from '../../ChapterShell'
import SourceQuote from '../../SourceQuote'
import IsoDisclosureClock from './IsoDisclosureClock'
import CafObjectivesWheel from './CafObjectivesWheel'
import AtoBotSimulator from './AtoBotSimulator'

export default function Chapter6() {
  return (
    <ChapterShell
      number={6}
      title="The Perimeter"
      subtitle="Cybersecurity, ISMS, Fraud Prevention"
      intro={
        <p>
          Cybersecurity in iGaming is no longer a supplementary IT concern, it is a core regulatory pillar.
          The UKGC anchors to ISO/IEC 27001:2022; Gibraltar runs the four-objective CAF; New Jersey&apos;s CSAU
          coordinates with federal law enforcement. ATO is the most prevalent operational threat.
        </p>
      }
    >
      <SourceQuote chapter={6} section="6.1" />
      <IsoDisclosureClock />

      <SourceQuote chapter={6} section="6.3" />
      <CafObjectivesWheel />

      <SourceQuote chapter={6} section="6.4" />
      <AtoBotSimulator />
    </ChapterShell>
  )
}
