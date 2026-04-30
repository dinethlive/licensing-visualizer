interface Props {
  label?: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  prefix?: string
  suffix?: string
  className?: string
  hint?: string
}

export default function NumberInput({
  label, value, onChange, min, max, step, prefix, suffix, className = '', hint,
}: Props) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="label">{label}</span>}
      <div className="flex items-stretch overflow-hidden rounded-lg border border-ink-200 bg-white focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500/20 dark:border-ink-700 dark:bg-ink-900">
        {prefix && (
          <span className="flex select-none items-center bg-ink-100 px-2.5 text-xs muted dark:bg-ink-800">{prefix}</span>
        )}
        <input
          type="number"
          className="w-full bg-transparent px-2.5 py-1.5 text-sm tabular-nums focus:outline-none"
          value={Number.isFinite(value) ? value : 0}
          min={min} max={max} step={step ?? 'any'}
          onChange={(e) => {
            const v = parseFloat(e.target.value)
            if (Number.isFinite(v)) onChange(v)
          }}
        />
        {suffix && (
          <span className="flex select-none items-center bg-ink-100 px-2.5 text-xs muted dark:bg-ink-800">{suffix}</span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs muted">{hint}</p>}
    </label>
  )
}
