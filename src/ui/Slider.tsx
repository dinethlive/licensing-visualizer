interface Props {
  min: number
  max: number
  step?: number
  value: number
  onChange: (v: number) => void
  format?: (n: number) => string
  label?: string
  hint?: string
  className?: string
}

export default function Slider({ min, max, step, value, onChange, format, label, hint, className = '' }: Props) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <div className="mb-1 flex items-baseline justify-between">
          <span className="label !mb-0">{label}</span>
          <span className="text-sm font-semibold tabular-nums">
            {format ? format(value) : value}
          </span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      {hint && <p className="mt-1 text-xs muted">{hint}</p>}
    </label>
  )
}
