import ChapterShell from '../../ChapterShell'
import SourceQuote from '../../SourceQuote'
import ConvergenceTrends from './ConvergenceTrends'
import HarmonizationGap from './HarmonizationGap'
import ComplianceMaturityScorer from './ComplianceMaturityScorer'

export default function Chapter9() {
  return (
    <ChapterShell
      number={9}
      title="Convergence"
      subtitle="The Future of Global iGaming Regulation"
      intro={
        <p>
          Three trends, centralization, standardization, technologization, point in a single direction.
          Convergence on principles, however, is not harmonization on detail. The harmonization gap is what
          forces operators toward modular, Compliance-by-Design platforms.
        </p>
      }
    >
      <SourceQuote chapter={9} section="9.1" />
      <ConvergenceTrends />

      <SourceQuote chapter={9} section="9.2" />
      <HarmonizationGap />

      <SourceQuote chapter={9} section="9.3" />
      <ComplianceMaturityScorer />
    </ChapterShell>
  )
}
