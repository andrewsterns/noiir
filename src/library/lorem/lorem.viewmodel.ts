import { LOREM } from './lorem.interface.ts'
import type { LoremProps, LoremViewModel } from './lorem.interface.ts'

// Deterministic widths so a wireframe looks the same on every render.
const widthsFor = (lines: number, seed: number): number[] =>
  Array.from({ length: lines }, (_, i) => {
    if (i === lines - 1 && lines > 1) return 45 + ((seed * 7 + i * 13) % 20)
    return 82 + ((seed * 31 + i * 17) % 19)
  })

export function useLoremViewModel({ lines = 3, mode = 'bars', seed = 1, ...props }: LoremProps): LoremViewModel {
  const words = LOREM.split(' ')
  const text = words.slice(0, Math.min(words.length, lines * 11)).join(' ')
  return {
    mode,
    widths: widthsFor(lines, seed),
    text,
    frame:
      mode === 'bars'
        ? { flow: 'column', gap: 8, padding: { y: 4 }, w: 'fill', 'aria-hidden': 'true', ...props }
        : { as: 'p', font: 'body', color: 'dim', ...props },
  }
}
