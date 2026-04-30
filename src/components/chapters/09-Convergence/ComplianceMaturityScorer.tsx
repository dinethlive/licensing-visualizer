import { useMemo, useState } from 'react'
import Card from '../../../ui/Card'
import Stat from '../../../ui/Stat'

interface Capability {
  id: string
  label: string
  group: 'Centralization' | 'Standardization' | 'Technologization'
  weight: number
  hint: string
}

const CAPABILITIES: Capability[] = [
  { id: 'cba',  label: 'Compliance-by-Design platform architecture', group: 'Centralization',    weight: 3, hint: 'Privacy, AML, KYC embedded structurally, not retrofitted.' },
  { id: 'mod',  label: 'Modular per-jurisdiction localization',       group: 'Centralization',    weight: 2, hint: 'E.g. Ontario player data on local servers, central game engine elsewhere.' },
  { id: 'iso',  label: 'ISO/IEC 27001:2022 certified',                group: 'Standardization',  weight: 3, hint: 'UKGC mandatory from 31 Oct 2024.' },
  { id: 'gli',  label: 'GLI-certified RNG + math model',              group: 'Standardization',  weight: 2, hint: 'Independent accredited certification.' },
  { id: 'audit',label: 'Real-time tamper-evident audit logs',         group: 'Standardization',  weight: 2, hint: 'MGA mandates change-logging across player, financial, and game outcome data.' },
  { id: 'mfa',  label: 'MFA / biometric access controls',             group: 'Technologization', weight: 2, hint: 'Baseline defence against credential-stuffing ATO.' },
  { id: 'rtp',  label: 'Continuous live RTP monitoring',              group: 'Technologization', weight: 2, hint: 'UKGC standing license condition.' },
  { id: 'beh',  label: 'Behavioral analytics for problem-gambling',   group: 'Technologization', weight: 2, hint: 'PGCB-mandated proactive surveillance.' },
  { id: 'geo',  label: 'Property-level geolocation',                  group: 'Technologization', weight: 1, hint: 'NJ DGE mandate; raises the bar for mobile architecture.' },
  { id: 'reg',  label: 'RegTech automation for cross-jurisdiction',   group: 'Centralization',    weight: 2, hint: 'Operational necessity at multi-jurisdictional scale.' },
]

const MAX = CAPABILITIES.reduce((s, c) => s + c.weight, 0)

export default function ComplianceMaturityScorer() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['iso', 'gli', 'audit']))

  const score = useMemo(
    () => CAPABILITIES.reduce((s, c) => s + (selected.has(c.id) ? c.weight : 0), 0),
    [selected],
  )
  const pct = Math.round((score / MAX) * 100)

  let band: { label: string; tone: 'negative' | 'default' | 'accent' | 'positive'; copy: string }
  if (pct < 30)      band = { label: 'Lagging',     tone: 'negative', copy: 'High exposure across multiple regimes. A single audit cycle could surface major non-conformities.' }
  else if (pct < 60) band = { label: 'Building',    tone: 'default',  copy: 'Single-jurisdiction adequacy possible, but multi-jurisdiction operations carry rising marginal cost per market.' }
  else if (pct < 85) band = { label: 'Competitive', tone: 'accent',   copy: 'Compliance-by-Design foundations in place. Marginal cost of entering a new jurisdiction is dropping.' }
  else               band = { label: 'Frontier',    tone: 'positive', copy: 'Engineering-led compliance discipline; converged with the directional travel of all five regulators in the visualizer.' }

  const groups = ['Centralization', 'Standardization', 'Technologization'] as const

  return (
    <Card
      title="Compliance maturity scorer"
      description="Tick the capabilities your platform genuinely delivers (not aspires to). Weights reflect the documentary script's emphasis on each."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {groups.map((g) => (
          <div key={g}>
            <div className="label">{g}</div>
            <ul className="space-y-1">
              {CAPABILITIES.filter((c) => c.group === g).map((c) => {
                const checked = selected.has(c.id)
                return (
                  <li key={c.id}>
                    <label className="flex cursor-pointer items-start gap-2 rounded-md p-2 hover:bg-ink-100 dark:hover:bg-ink-900">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          const next = new Set(selected)
                          if (e.target.checked) next.add(c.id); else next.delete(c.id)
                          setSelected(next)
                        }}
                        className="mt-0.5"
                      />
                      <div className="text-xs">
                        <div className="font-semibold">{c.label}</div>
                        <div className="muted">w={c.weight} · {c.hint}</div>
                      </div>
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Score" value={`${score} / ${MAX}`} tone="accent" />
        <Stat label="Maturity" value={`${pct}%`} tone={band.tone} hint={band.label} />
        <Stat label="Where you stand" value={band.label} tone={band.tone} hint={band.copy} />
      </div>
    </Card>
  )
}
