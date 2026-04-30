import ChapterShell from '../../ChapterShell'
import SourceQuote from '../../SourceQuote'
import TierIVDowntimeCalc from './TierIVDowntimeCalc'
import SessionTimeoutSim from './SessionTimeoutSim'
import GeolocationBoundarySim from './GeolocationBoundarySim'

export default function Chapter3() {
  return (
    <ChapterShell
      number={3}
      title="The Digital Foundation"
      subtitle="Infrastructure & Data Sovereignty"
      intro={
        <p>
          Each regulator answers the infrastructure question differently, Malta replicates,
          Curaçao demands physical hardware, Gibraltar focuses on management location, and New Jersey
          tracks the player to within a property boundary. Three live tools below.
        </p>
      }
    >
      <SourceQuote chapter={3} section="3.2" />
      <TierIVDowntimeCalc />

      <SourceQuote chapter={3} section="3.1" />
      <SessionTimeoutSim />

      <SourceQuote chapter={3} section="3.3" />
      <GeolocationBoundarySim />
    </ChapterShell>
  )
}
