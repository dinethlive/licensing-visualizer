import { useMemo, useState } from 'react'
import Card from '../../../ui/Card'
import Slider from '../../../ui/Slider'
import Stat from '../../../ui/Stat'
import RegulationBadge from '../../RegulationBadge'
import { num } from '../../../data/regulations'

// Credential-stuffing math: probability that at least one of N attempts succeeds
// against an account whose password reuse rate matches the attacker's wordlist.

export default function AtoBotSimulator() {
  const botShare = num('global.ato-bot-share') // 0.40

  const [accounts, setAccounts] = useState(100_000)
  const [attemptsPerAccount, setAttemptsPerAccount] = useState(50)
  const [reuseRate, setReuseRate] = useState(0.05)  // fraction of accounts with leaked-password reuse
  const [mfa, setMfa] = useState(false)

  const stats = useMemo(() => {
    // Without MFA: account compromised if its password is in the wordlist (reuseRate)
    // and the bot tries the right one within attemptsPerAccount attempts.
    // With MFA: an additional ~99% block factor.
    const compromisedRate = reuseRate * (1 - Math.exp(-attemptsPerAccount / 1000)) * (mfa ? 0.01 : 1)
    const compromised = Math.round(accounts * compromisedRate)
    const totalAttempts = accounts * attemptsPerAccount
    const botAttempts = Math.round(totalAttempts * botShare)
    return { compromised, totalAttempts, botAttempts, compromisedRate }
  }, [accounts, attemptsPerAccount, reuseRate, mfa, botShare])

  return (
    <Card
      title="ATO threat, bot-driven credential stuffing"
      description={`~${(botShare * 100).toFixed(0)}% of iGaming ATO incidents are linked to automated bot activity. Try toggling MFA.`}
      badge={<RegulationBadge id="global.ato-bot-share" compact />}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Slider label="Operator account base" value={accounts} min={10_000} max={2_000_000} step={10_000} onChange={setAccounts} format={(v) => v.toLocaleString()} />
        <Slider label="Attempts per account" value={attemptsPerAccount} min={1} max={500} step={1} onChange={setAttemptsPerAccount} format={(v) => v.toString()} />
        <Slider label="Password-reuse rate" value={reuseRate} min={0.01} max={0.20} step={0.005} onChange={setReuseRate} format={(v) => `${(v*100).toFixed(1)}%`} />
      </div>

      <div className="mt-3">
        <button
          onClick={() => setMfa((m) => !m)}
          className={`btn ${mfa ? '!bg-emerald-500 !text-white' : ''}`}
        >
          {mfa ? '✓ MFA enabled' : 'MFA disabled'}
        </button>
        <span className="ml-3 text-xs muted">MFA assumed to block ~99% of credential-stuffing successes.</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Total login attempts" value={stats.totalAttempts.toLocaleString()} />
        <Stat label="Bot-driven attempts" value={stats.botAttempts.toLocaleString()} hint={`${(botShare*100).toFixed(0)}% share`} tone="accent" />
        <Stat label="Compromised accounts" value={stats.compromised.toLocaleString()} hint={`${(stats.compromisedRate*100).toFixed(2)}% of base`} tone={mfa ? 'positive' : 'negative'} />
      </div>

      <div className="mt-4">
        <RegulationBadge id="global.ato-bot-share" />
      </div>
    </Card>
  )
}
