import type { Length } from '../layout/layout.interface.ts'

/**
 * Padding or margin. A single value applies to all sides.
 * An object sets axes (`x`, `y`) or sides (`top` … `left`); a side beats its axis.
 * Numbers are px and should sit on the 4px grid (the `on-scale` lint rule checks).
 */
export type Space =
  | Length
  | { x?: Length; y?: Length; top?: Length; right?: Length; bottom?: Length; left?: Length }

export interface SpaceStyle {
  padding?: Space
  margin?: Space
}

export const SPACE_KEYS = ['padding', 'margin'] as const satisfies readonly (keyof SpaceStyle)[]
