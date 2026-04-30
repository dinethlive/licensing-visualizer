import ChapterShell from '../../ChapterShell'
import SourceQuote from '../../SourceQuote'
import InvisibleArchitectureMap from './InvisibleArchitectureMap'

export default function Chapter1() {
  return (
    <ChapterShell
      number={1}
      title="Prologue"
      subtitle="The Invisible Architecture"
      intro={
        <p>
          Behind every spin sits a dense matrix of mandates, audits, and standards most players will
          never see. This chapter introduces the five philosophies the visualizer covers and lets you click
          straight into the live regulations each one enforces.
        </p>
      }
    >
      <SourceQuote chapter={1} section="1.1" />
      <InvisibleArchitectureMap />
    </ChapterShell>
  )
}
