import { COLOR_TOKENS } from '../tokens/palettes.ts'

const TOKENS: ReadonlySet<string> = new Set(COLOR_TOKENS)

/** Numbers become px (0 stays unitless); strings pass through. */
export const px = (v: number | string): string => (typeof v === 'number' ? (v === 0 ? '0' : `${v}px`) : v)

export const isColorToken = (s: string): boolean => TOKENS.has(s)

/** A color token becomes its CSS variable; anything else is a CSS color already. */
export const color = (c: string): string => (TOKENS.has(c) ? `var(--n-c-${c})` : c)

/** Replace bare color tokens inside a gradient string: '90deg, phosphor, accent 80%' → var(...) stops. */
export const colorsIn = (s: string): string =>
  s.replace(/(^|[\s,(])([a-z][a-z-]*)(?=$|[\s,)])/g, (m, pre: string, word: string) =>
    TOKENS.has(word) ? pre + color(word) : m,
  )

/** A see-through version of a color, 0–1. */
export const alpha = (c: string, opacity: number | undefined): string =>
  opacity === undefined || opacity >= 1 ? color(c) : `color-mix(in srgb, ${color(c)} ${Math.round(opacity * 1000) / 10}%, transparent)`

/** camelCase → kebab-case (for keyframe properties). */
export const kebab = (s: string): string => s.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())
