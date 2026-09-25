import type { Decls } from '../../engine/engine.interface.ts'
import { px } from '../../engine/units.ts'
import type { Space, SpaceStyle } from './space.interface.ts'

function side(prop: 'padding' | 'margin', v: Space, d: Decls): void {
  if (typeof v !== 'object') {
    d[prop] = px(v)
    return
  }
  const sides = { top: v.top ?? v.y, right: v.right ?? v.x, bottom: v.bottom ?? v.y, left: v.left ?? v.x }
  for (const [s, val] of Object.entries(sides)) if (val !== undefined) d[`${prop}-${s}`] = px(val)
}

export function resolveSpace(s: SpaceStyle, d: Decls): void {
  if (s.padding !== undefined) side('padding', s.padding, d)
  if (s.margin !== undefined) side('margin', s.margin, d)
}
