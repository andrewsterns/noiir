import { LAYOUT_KEYS } from '../skills/layout/layout.interface.ts'
import { SIZE_KEYS } from '../skills/size/size.interface.ts'
import { SPACE_KEYS } from '../skills/space/space.interface.ts'
import { PLACE_KEYS } from '../skills/place/place.interface.ts'
import { PAINT_KEYS } from '../skills/paint/paint.interface.ts'
import { EDGE_KEYS } from '../skills/edge/edge.interface.ts'
import { TYPE_KEYS } from '../skills/type/type.interface.ts'
import { EFFECT_KEYS } from '../skills/effect/effect.interface.ts'
import { INTERACT_STYLE_KEYS } from '../skills/interact/interact.interface.ts'

/** Props that compile to CSS. Everything else on a Frame is behavior, semantics or a pass-through attribute. */
export const STYLE_KEYS: ReadonlySet<string> = new Set([
  ...LAYOUT_KEYS,
  ...SIZE_KEYS,
  ...SPACE_KEYS,
  ...PLACE_KEYS,
  ...PAINT_KEYS,
  ...EDGE_KEYS,
  ...TYPE_KEYS,
  ...EFFECT_KEYS,
  ...INTERACT_STYLE_KEYS,
])

/** Style slots a variant can carry besides plain style. */
export const SLOT_KEYS: ReadonlySet<string> = new Set(['hover', 'press', 'focus', 'focusWithin', 'states', 'at'])
