// Pure data, no imports: the lint plugin reads this file directly under Node.

export const TINTS = ['green', 'amber', 'white'] as const
export type Tint = (typeof TINTS)[number]

/** Every color token. Tokens can be used anywhere a color is accepted, including inside gradient strings. */
export const COLOR_TOKENS = [
  'bg', // page background
  'surface', // boxes sitting on bg
  'raised', // boxes sitting on surface (menus, modals)
  'phosphor', // the tint: primary text, lines that matter, primary fills
  'dim', // secondary text
  'line', // default 1px box lines (≥3:1 on bg, WCAG non-text contrast)
  'faint', // decorative only: patterns, placeholder crosses, grid
  'accent', // the second phosphor, for emphasis
  'danger', // errors, destructive actions
  'on-phosphor', // text on a phosphor / accent / danger fill
] as const
export type ColorToken = (typeof COLOR_TOKENS)[number]

// Soft phosphor: muted sage green and warm amber on warm near-black, not neon on pure black.
export const PALETTES: Record<Tint, Record<ColorToken, string>> = {
  green: {
    bg: '#121612',
    surface: '#171c17',
    raised: '#1d231d',
    phosphor: '#9ec29a',
    dim: '#7f9a7b',
    line: '#5d735a',
    faint: '#2b3529',
    accent: '#ceb06c',
    danger: '#e08a7e',
    'on-phosphor': '#121612',
  },
  amber: {
    bg: '#161410',
    surface: '#1c1914',
    raised: '#23201a',
    phosphor: '#ceb06c',
    dim: '#a48d58',
    line: '#7a6a44',
    faint: '#36301f',
    accent: '#9ec29a',
    danger: '#e08a7e',
    'on-phosphor': '#161410',
  },
  white: {
    bg: '#131415',
    surface: '#18191b',
    raised: '#1e2022',
    phosphor: '#d6dbd2',
    dim: '#a2a8a0',
    line: '#6f756e',
    faint: '#2c2f2c',
    accent: '#ceb06c',
    danger: '#e08a7e',
    'on-phosphor': '#131415',
  },
}

/** Pairs that must stay readable, checked by tokens.test.ts and the `contrast` lint rule. */
export const TEXT_ON = ['bg', 'surface', 'raised'] as const
export const TEXT_TOKENS = ['phosphor', 'dim', 'accent', 'danger'] as const
export const FILL_TEXT_PAIRS = [
  ['phosphor', 'on-phosphor'],
  ['accent', 'on-phosphor'],
  ['danger', 'on-phosphor'],
] as const

/** WCAG relative luminance of a #rrggbb color. */
export function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16)
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * ch[0]! + 0.7152 * ch[1]! + 0.0722 * ch[2]!
}

/** WCAG contrast ratio between two #rrggbb colors (1–21). */
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}
