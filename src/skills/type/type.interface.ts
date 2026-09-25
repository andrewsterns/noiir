import type { Color, Paint } from '../paint/paint.interface.ts'
import type { FontToken } from '../../tokens/tokens.interface.ts'

export type { FontToken }

export interface FontSpec {
  /** 'heading' (Charis SIL) · 'body' (Space Mono) · 'mono' are theme families; any other string is a CSS font-family. */
  family?: 'heading' | 'body' | 'mono' | (string & {})
  /** px, or a CSS length. */
  size?: number | (string & {})
  weight?: number | 'normal' | 'bold'
  /** Unitless line height (1.4) or a CSS length. */
  leading?: number | (string & {})
  /** Letter spacing: numbers are em (0.08), strings pass through. */
  tracking?: number | (string & {})
  case?: 'upper' | 'lower' | 'title' | 'none'
  italic?: boolean
}

export interface TypeStyle {
  /** A theme text style (display · title · heading · body · label · caption · code) or a custom spec. */
  font?: FontToken | FontSpec
  /** Text color. Gradients and images paint the letters themselves. */
  color?: Paint
  textAlign?: 'start' | 'center' | 'end' | 'justify'
  /** Show at most n lines, then an ellipsis. */
  clamp?: number
  /** One line with an ellipsis. */
  truncate?: boolean
  /** Even out line lengths in headings (text-wrap: balance). */
  balance?: boolean
  /** How whitespace and wrapping behave. 'pre' keeps ASCII art intact. */
  whitespace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap'
  decoration?: 'underline' | 'line-through' | 'none'
  /** Text cursor color in inputs (caret-color). */
  caret?: Color
}

export const TYPE_KEYS = [
  'font', 'color', 'textAlign', 'clamp', 'truncate', 'balance', 'whitespace', 'decoration', 'caret',
] as const satisfies readonly (keyof TypeStyle)[]
