import type { Color, Paint } from '../paint/paint.interface.ts'

import type { RadiusToken } from '../../tokens/tokens.interface.ts'

export type Radius = number | 'full' | RadiusToken

export type Side = 'top' | 'right' | 'bottom' | 'left'

export interface BorderSpec {
  /** Line width in px. Default 1. */
  width?: number
  style?: 'solid' | 'dashed' | 'dotted' | 'double'
  /** Border paint. A gradient or image draws a ring that follows `radius`. Default 'line'. */
  paint?: Paint
  /** Only draw these sides (solid paint only). */
  sides?: readonly Side[]
}

export interface OutlineSpec {
  width?: number
  style?: 'solid' | 'dashed' | 'dotted'
  color?: Color
  /** Gap between the frame and its outline in px. */
  offset?: number
}

export interface EdgeStyle {
  /**
   * The frame's line.
   *   1                                  1px in 'line'
   *   'phosphor'                         1px in phosphor (in hover/press, changes the color only)
   *   { width: 2, style: 'dashed' }
   *   { paint: { linear: '135deg, phosphor, transparent' } }   gradient ring
   *   { sides: ['bottom'] }              one side only
   */
  border?: number | Paint | BorderSpec
  /** Corner radius: a token (sm 4 · md 8 · lg 12 · xl 16), px, `'full'` for a pill, or per corner. */
  radius?: Radius | { tl?: Radius; tr?: Radius; br?: Radius; bl?: Radius }
  /** 'chamfer' cuts 8px 45° corners; `{ chamfer: n }` sets the cut size. */
  shape?: 'box' | 'chamfer' | { chamfer: number }
  /** A line outside the border that takes no space. Used for focus rings. */
  outline?: number | Color | OutlineSpec | 'none'
}

export const EDGE_KEYS = ['border', 'radius', 'shape', 'outline'] as const satisfies readonly (keyof EdgeStyle)[]
