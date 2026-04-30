import ChapterShell from '../../ChapterShell'
import SourceQuote from '../../SourceQuote'
import GdprAmlMatrix from './GdprAmlMatrix'
import KycThresholdSim from './KycThresholdSim'
import SealVisualizer from './SealVisualizer'

export default function Chapter7() {
  return (
    <ChapterShell
      number={7}
      title="The Compliance Paradox"
      subtitle="AML / KYC / Privacy"
      intro={
        <p>
          The cybersecurity rules of Chapter 6 require operators to collect substantial player data, and that
          requirement places every multi-jurisdictional operator inside one of the industry&apos;s hardest
          structural conflicts: GDPR transparency vs. AML &quot;tipping off&quot; obligations.
          Compliance-by-Design is the architectural way out.
        </p>
      }
    >
      <SourceQuote chapter={7} section="7.1" />
      <GdprAmlMatrix />

      <SourceQuote chapter={7} section="7.2" />
      <KycThresholdSim />
      <SealVisualizer />
    </ChapterShell>
  )
}
