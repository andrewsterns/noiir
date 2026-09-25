import type { Style } from '../frame/frame.interface.ts'
import type { Decls, ResolveContext } from './engine.interface.ts'
import { resolveLayout } from '../skills/layout/layout.resolve.ts'
import { resolveSize } from '../skills/size/size.resolve.ts'
import { resolveSpace } from '../skills/space/space.resolve.ts'
import { resolvePlace } from '../skills/place/place.resolve.ts'
import { resolvePaint } from '../skills/paint/paint.resolve.ts'
import { resolveEdge } from '../skills/edge/edge.resolve.ts'
import { resolveType } from '../skills/type/type.resolve.ts'
import { resolveEffect } from '../skills/effect/effect.resolve.ts'
import { resolveInteract } from '../skills/interact/interact.resolve.ts'

/**
 * Run every style skill over one Style, in a fixed order. Later skills win on shared CSS
 * properties: `clamp` (type) overrides `flow`'s display; gradient text overrides `fill`.
 */
export function resolveStyle(s: Style, ctx: ResolveContext): Decls {
  const d: Decls = {}
  resolveLayout(s, d)
  resolveSize(s, d)
  resolveSpace(s, d)
  resolvePlace(s, d)
  resolvePaint(s, d, ctx)
  resolveEdge(s, d, ctx)
  resolveType(s, d, ctx)
  resolveEffect(s, d, ctx)
  resolveInteract(s, d)
  return d
}
