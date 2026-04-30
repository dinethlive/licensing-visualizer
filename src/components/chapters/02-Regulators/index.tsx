import ChapterShell from '../../ChapterShell'
import SourceQuote from '../../SourceQuote'
import MgaLicenseExplorer from './MgaLicenseExplorer'
import GibraltarTriggerComparator from './GibraltarTriggerComparator'
import CuracaoTimeline from './CuracaoTimeline'
import NjTsbDiagram from './NjTsbDiagram'

export default function Chapter2() {
  return (
    <ChapterShell
      number={2}
      title="Five Regulators, Five Philosophies"
      subtitle="MGA · UKGC · CGA · GRA · NJ-DGE · PA-PGCB"
      intro={
        <p>
          Each regulator pursues consumer protection and market stability through a distinct architecture.
          Walk through the MGA&apos;s capital filter, Curaçao&apos;s LOK timeline, Gibraltar&apos;s shifted
          licensing trigger, and the NJ DGE&apos;s four-unit Technical Services Bureau.
        </p>
      }
    >
      <SourceQuote chapter={2} section="2.1" />
      <MgaLicenseExplorer />

      <SourceQuote chapter={2} section="2.3" />
      <CuracaoTimeline />

      <SourceQuote chapter={2} section="2.4" />
      <GibraltarTriggerComparator />

      <SourceQuote chapter={2} section="2.5" />
      <NjTsbDiagram />
    </ChapterShell>
  )
}
