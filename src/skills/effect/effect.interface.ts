import type { Length } from '../layout/layout.interface.ts'
import type { Color } from '../paint/paint.interface.ts'
import type { ShadowToken } from '../../tokens/tokens.interface.ts'

export interface ShadowSpec {
  x?: number
  y?: number
  blur?: number
  spread?: number
  color?: Color
  inset?: boolean
}

export interface EffectStyle {
  /** Drop shadow: a theme token, a spec, or several specs. */
  shadow?: ShadowToken | 'none' | ShadowSpec | readonly ShadowSpec[]
  /**
   * Phosphor glow.
   * true → soft glow on box and text · 'strong' → brighter · 'text' → letters only · 'box' → box only.
   */
  glow?: boolean | 'strong' | 'text' | 'box'
  /** Blur the frame itself, px. */
  blur?: number
  /** Blur what is behind the frame, px (frosted glass). */
  backdrop?: number | { blur?: number; saturate?: number }
  /** Soft CRT scanlines drawn over the frame (default opacity 0.1). Put it on <Screen> once rather than on every box. */
  scanlines?: boolean | { opacity?: number; size?: number }
  /** Film-grain noise over the frame. A number is the opacity. */
  noise?: boolean | number
  /** A CSS mask image, e.g. 'linear-gradient(black 70%, transparent)'. */
  mask?: string
  /** Move by x/y (translate). Composes with scale and rotate. In hover/press it animates smoothly. */
  x?: Length
  y?: Length
  scale?: number
  /** Degrees, or a CSS angle string. */
  rotate?: number | (string & {})
}

export const EFFECT_KEYS = [
  'shadow', 'glow', 'blur', 'backdrop', 'scanlines', 'noise', 'mask', 'x', 'y', 'scale', 'rotate',
] as const satisfies readonly (keyof EffectStyle)[]
