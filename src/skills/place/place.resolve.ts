import type { Decls } from '../../engine/engine.interface.ts'
import { px } from '../../engine/units.ts'
import type { PlaceStyle } from './place.interface.ts'

export function resolvePlace(s: PlaceStyle, d: Decls): void {
  if (s.position) d.position = s.position
  if (s.inset !== undefined) d.inset = s.inset === true ? '0' : px(s.inset)
  for (const k of ['top', 'right', 'bottom', 'left'] as const) {
    const v = s[k]
    if (v !== undefined) d[k] = px(v)
  }
  if (s.z !== undefined) d['z-index'] = String(s.z)
}
