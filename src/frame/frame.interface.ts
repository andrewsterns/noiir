import type * as React from 'react'
import type { LayoutStyle } from '../skills/layout/layout.interface.ts'
import type { SizeStyle } from '../skills/size/size.interface.ts'
import type { SpaceStyle } from '../skills/space/space.interface.ts'
import type { PlaceStyle } from '../skills/place/place.interface.ts'
import type { PaintStyle } from '../skills/paint/paint.interface.ts'
import type { EdgeStyle } from '../skills/edge/edge.interface.ts'
import type { TypeStyle } from '../skills/type/type.interface.ts'
import type { EffectStyle } from '../skills/effect/effect.interface.ts'
import type { InteractProps, InteractStyle } from '../skills/interact/interact.interface.ts'
import type { StateFlag, StateProps } from '../skills/state/state.interface.ts'
import type { MotionProps } from '../skills/motion/motion.interface.ts'
import type { AtKey, RespondProps } from '../skills/respond/respond.interface.ts'
import type { AccessProps } from '../skills/access/access.interface.ts'
import type { Theme, Tint } from '../tokens/tokens.interface.ts'

/** Every prop that paints or places a frame. Hover, press, focus, states, `at` and variants all take a Style. */
export interface Style
  extends LayoutStyle,
    SizeStyle,
    SpaceStyle,
    PlaceStyle,
    PaintStyle,
    EdgeStyle,
    TypeStyle,
    EffectStyle,
    InteractStyle {}

/** A Style plus the state and responsive slots. What a variant (or defineFrame's `base`) holds. */
export interface Slots extends Style {
  hover?: Style
  press?: Style
  focus?: Style
  focusWithin?: Style
  states?: Partial<Record<StateFlag, Style>>
  at?: Partial<Record<AtKey, Style>>
}

/** `{ kind: { primary: Slots, ghost: Slots }, size: { sm: Slots, md: Slots } }` */
export type VariantMap = Record<string, Record<string, Slots>>

/** HTML attributes Frame passes straight through, minus the names Frame gives a meaning to. */
type PassThrough = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  | keyof Style
  | 'as' | 'role' | 'label' | 'hidden' | 'color' | 'translate' | 'rows' | 'cols' | 'wrap' | 'span' | 'shape'
  | 'open' | 'selected' | 'disabled' | 'loop' | 'kind' | 'size'
  | 'style' | 'className' | 'dangerouslySetInnerHTML'
  | 'onClick' | 'onFocus' | 'onBlur' | 'onScroll' | 'onDrag'
>

export interface FrameProps
  extends Style,
    StateProps,
    MotionProps,
    InteractProps,
    RespondProps,
    AccessProps,
    PassThrough {
  /** Named style variants. Pick one per group with `variant`. */
  variants?: VariantMap
  variant?: Record<string, string | undefined>
  /** Scope a theme (or just a tint) to this frame and everything inside it. */
  theme?: Theme | Tint
  /** Raw CSS escape hatch, applied inline last. The `no-style-escape` lint rule warns on it. */
  unsafe?: React.CSSProperties
  children?: React.ReactNode
  ref?: React.Ref<HTMLElement>
}
