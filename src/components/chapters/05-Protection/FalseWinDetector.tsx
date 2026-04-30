import { useState } from 'react'
import Card from '../../../ui/Card'
import NumberInput from '../../../ui/NumberInput'
import RegulationBadge from '../../RegulationBadge'

export default function FalseWinDetector() {
  const [stake, setStake] = useState(1.00)
  const [returnAmt, setReturnAmt] = useState(0.40)

  const isLoss = returnAmt < stake
  const isFalseWin = returnAmt > 0 && returnAmt <= stake
  const isPush = returnAmt === stake
  const isWin = returnAmt > stake

  let cuesAllowed: boolean
  let label: string
  let tone: 'positive' | 'negative' | 'default'
  if (isWin)        { cuesAllowed = true;  label = 'GENUINE WIN, cues allowed'; tone = 'positive' }
  else if (isPush)  { cuesAllowed = false; label = 'PUSH, cues prohibited (return = stake)'; tone = 'default' }
  else if (isFalseWin) { cuesAllowed = false; label = 'FALSE WIN, cues PROHIBITED'; tone = 'negative' }
  else              { cuesAllowed = false; label = 'LOSS, cues prohibited'; tone = 'negative' }

  return (
    <Card
      title="False-win detector"
      description="Under UKGC RTS effective 17 Jan 2025, celebratory audio/visual cues for any return ≤ stake are prohibited."
      badge={<RegulationBadge id="ukgc.false-win-prohibition" compact />}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <NumberInput label="Stake" value={stake} onChange={setStake} prefix="£" min={0} step={0.05} />
        <NumberInput label="Return" value={returnAmt} onChange={setReturnAmt} prefix="£" min={0} step={0.05} />
      </div>

      <div className={`mt-4 rounded-xl border p-4 ${cuesAllowed ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-rose-500/40 bg-rose-500/5'}`}>
        <div className={`text-sm font-semibold ${tone === 'positive' ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'}`}>
          {label}
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 text-sm">
          <div>
            <span className="muted">Net result: </span>
            <span className={`font-mono tabular-nums ${returnAmt - stake >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              £{(returnAmt - stake).toFixed(2)}
            </span>
          </div>
          <div>
            <span className="muted">Allowed presentation: </span>
            <span className="font-medium">{cuesAllowed ? 'flashing lights · winning sounds · animations' : 'silent / muted UI · no celebration'}</span>
          </div>
        </div>
      </div>

      {isFalseWin && (
        <p className="mt-3 rounded-lg bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300">
          Classic LDW pattern: 20-line slot at 5p/line is £1 stake. A 40p return is a 60p net loss but,
          historically, would fire the full sensory apparatus of a winning event.
        </p>
      )}

      <div className="mt-4">
        <RegulationBadge id="ukgc.false-win-prohibition" />
      </div>
    </Card>
  )
}
