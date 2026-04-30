export function eur(n: number, fractionDigits = 0): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: fractionDigits,
  }).format(n)
}

export function usd(n: number, fractionDigits = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: fractionDigits,
  }).format(n)
}

export function num(n: number, digits = 0): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(n)
}

export function pct(n: number, digits = 1): string {
  return `${(n * 100).toFixed(digits)}%`
}

export function dur(seconds: number): string {
  if (seconds < 60) return `${seconds.toFixed(1)} s`
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return `${m}m ${s.toString().padStart(2, '0')}s`
}

export function isoDate(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d
  return date.toISOString().slice(0, 10)
}

export function relativeFromNow(iso: string, now = new Date()): string {
  const then = new Date(iso)
  const days = Math.floor((+now - +then) / 86_400_000)
  if (days < 0)  return `in ${-days} day${days === -1 ? '' : 's'}`
  if (days === 0) return 'today'
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`
  if (days < 365) {
    const months = Math.round(days / 30)
    return `${months} month${months === 1 ? '' : 's'} ago`
  }
  const years = (days / 365).toFixed(1)
  return `${years} year${years === '1.0' ? '' : 's'} ago`
}
