import type { FrameProps } from '../../frame/frame.interface.ts'

/** Terminal-style icons drawn from Unicode, so they inherit color, size and glow like text. */
export const GLYPHS = {
  up: '▲',
  down: '▼',
  left: '◄',
  right: '►',
  close: '✕',
  menu: '≡',
  search: '⌕',
  check: '✓',
  plus: '+',
  minus: '−',
  dot: '•',
  star: '★',
  arrow: '→',
  back: '←',
  external: '↗',
  info: 'i',
  warn: '!',
  play: '▶',
  pause: '❚❚',
  block: '█',
  shade: '░',
  prompt: '>',
  ellipsis: '…',
  grip: '⋮',
  square: '■',
} as const

export type GlyphName = keyof typeof GLYPHS

export interface GlyphProps extends FrameProps {
  name: GlyphName
  /** Give the glyph an accessible name when it carries meaning on its own. Otherwise it is hidden from screen readers. */
  label?: string
}

export interface GlyphViewModel {
  frame: FrameProps
}
