import type { ColorToken } from '../../tokens/palettes.ts'

export type { ColorToken }

/** A theme color token (`'phosphor'`, `'line'` …) or any CSS color. */
export type Color = ColorToken | 'transparent' | 'currentColor' | (string & {})

export type Blend =
  | 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten'
  | 'color-dodge' | 'color-burn' | 'difference' | 'exclusion' | 'luminosity'

/** CRT wireframe patterns, drawn with gradients (no images). */
export type Pattern = 'scanlines' | 'grid' | 'dots' | 'hatch' | 'cross'

export const PATTERNS = ['scanlines', 'grid', 'dots', 'hatch', 'cross'] as const satisfies readonly Pattern[]

/**
 * One layer of paint.
 *   'phosphor' · '#0f0'                         a solid color
 *   { color: 'phosphor', opacity: 0.2 }         a see-through solid
 *   { linear: '90deg, phosphor, accent' }       gradients: linear / radial / conic (stops accept tokens)
 *   { image: url, fit: 'cover' }                an image: cover · contain · tile · crop
 *   { video: url }                              a muted looping video (fill only)
 *   { pattern: 'cross' }                        scanlines · grid · dots · hatch · cross
 */
export type PaintLayer =
  | Color
  | { color: Color; opacity?: number; blend?: Blend }
  | { linear: string; blend?: Blend }
  | { radial: string; blend?: Blend }
  | { conic: string; blend?: Blend }
  | { image: string; fit?: 'cover' | 'contain' | 'tile' | 'crop'; position?: string; size?: string; blend?: Blend }
  | { video: string; opacity?: number }
  | { pattern: Pattern; color?: Color; opacity?: number; size?: number; blend?: Blend }

/** Paint for fill, border and text color. An array stacks layers; the first is on top. */
export type Paint = PaintLayer | readonly PaintLayer[]

export interface PaintStyle {
  /** The frame's background. Solid, gradient, image, video, pattern, or a stack of layers. */
  fill?: Paint
  /** Opacity of the whole frame, 0–1. */
  opacity?: number
  /** How the frame blends with what is behind it (mix-blend-mode). */
  blend?: Blend
}

export const PAINT_KEYS = ['fill', 'opacity', 'blend'] as const satisfies readonly (keyof PaintStyle)[]
