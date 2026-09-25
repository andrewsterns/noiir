import type { Length } from '../layout/layout.interface.ts'

export interface PlaceStyle {
  /** relative anchors absolute children; sticky sticks while scrolling; fixed pins to the viewport. */
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky'
  top?: Length
  right?: Length
  bottom?: Length
  left?: Length
  /** All four offsets. `true` → 0 (cover the positioned parent). */
  inset?: Length | true
  /** Stacking order (z-index). */
  z?: number
}

export const PLACE_KEYS = ['position', 'top', 'right', 'bottom', 'left', 'inset', 'z'] as const satisfies readonly (keyof PlaceStyle)[]
