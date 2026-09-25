import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../../actions/run.ts'
import { SPINNER_FRAMES } from './spinner.interface.ts'
import type { SpinnerProps, SpinnerViewModel } from './spinner.interface.ts'

export function useSpinnerViewModel({ label, ...props }: SpinnerProps): SpinnerViewModel {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const t = setInterval(() => setI((n) => (n + 1) % SPINNER_FRAMES.length), 100)
    return () => clearInterval(t)
  }, [])
  return {
    char: SPINNER_FRAMES[i]!,
    frame: {
      as: 'span',
      inline: true,
      flow: 'block',
      w: '1ch',
      textAlign: 'center',
      font: { family: 'mono' },
      ...(label ? { role: 'status', label } : { 'aria-hidden': 'true' }),
      ...props,
    },
  }
}
