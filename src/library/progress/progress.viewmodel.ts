import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../../actions/run.ts'
import type { ProgressProps, ProgressViewModel } from './progress.interface.ts'

export function useProgressViewModel({ value, label, width = 20, showValue = true, ...props }: ProgressProps): ProgressViewModel {
  const known = typeof value === 'number'
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (known || prefersReducedMotion()) return
    const t = setInterval(() => setTick((n) => n + 1), 120)
    return () => clearInterval(t)
  }, [known])

  let bar: string
  if (known) {
    const filled = Math.round(Math.min(1, Math.max(0, value)) * width)
    bar = '█'.repeat(filled) + '░'.repeat(width - filled)
  } else {
    // A 3-cell block that sweeps back and forth.
    const span = Math.max(1, width - 3)
    const pos = span - Math.abs((tick % (span * 2)) - span)
    bar = '░'.repeat(pos) + '███' + '░'.repeat(Math.max(0, width - 3 - pos))
  }
  const pct = known ? Math.round(Math.min(1, Math.max(0, value)) * 100) : null
  return {
    bar: `[${bar}]`,
    percent: showValue && pct !== null ? `${pct}%` : null,
    frame: {
      role: 'progressbar',
      label,
      'aria-valuemin': 0,
      'aria-valuemax': 100,
      ...(pct !== null && { 'aria-valuenow': pct }),
      flow: 'row',
      inline: true,
      gap: 8,
      font: 'code',
      whitespace: 'pre',
      color: 'phosphor',
      ...props,
    },
  }
}
