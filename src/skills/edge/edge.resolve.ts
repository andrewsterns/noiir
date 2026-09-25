import type { Decls, ResolveContext } from '../../engine/engine.interface.ts'
import { color, px } from '../../engine/units.ts'
import type { Paint } from '../paint/paint.interface.ts'
import { applyBackground, solidOf, toBackground } from '../paint/paint.resolve.ts'
import type { BorderSpec, EdgeStyle, OutlineSpec, Radius } from './edge.interface.ts'

const SPEC_KEYS = new Set(['width', 'style', 'paint', 'sides'])
const isSpec = (b: unknown): b is BorderSpec =>
  typeof b === 'object' && b !== null && !Array.isArray(b) && Object.keys(b).every((k) => SPEC_KEYS.has(k))

// A ring drawn in ::before and masked to the border strip, so gradient and image borders keep the radius.
function ring(paint: Paint, width: number, d: Decls, ctx: ResolveContext): void {
  ctx.needsPosition = true
  d['::before content'] = '""'
  d['::before position'] = 'absolute'
  d['::before inset'] = '0'
  d['::before padding'] = px(width)
  d['::before border-radius'] = 'inherit'
  d['::before pointer-events'] = 'none'
  d['::before mask'] = 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)'
  applyBackground(toBackground(paint, ctx, 'edge'), d, { ...ctx, layer: 'base' }, '::before ')
}

function border(b: NonNullable<EdgeStyle['border']>, d: Decls, ctx: ResolveContext): void {
  const inState = ctx.layer !== 'base'
  if (typeof b === 'number') {
    d['border-width'] = px(b)
    if (!inState) d['border-color'] = color('line')
    return
  }
  const spec: BorderSpec = isSpec(b) ? b : { paint: b as Paint }
  const width = spec.width ?? 1
  const paint = spec.paint ?? 'line'
  const solid = solidOf(paint)
  if (solid === undefined) {
    ring(paint, width, d, ctx)
    return
  }
  // A bare paint in hover/press only recolors; it keeps the base width.
  const recolorOnly = inState && !isSpec(b)
  if (!recolorOnly) {
    if (spec.sides) {
      const on = new Set(spec.sides)
      d['border-width'] = (['top', 'right', 'bottom', 'left'] as const).map((s) => (on.has(s) ? px(width) : '0')).join(' ')
    } else d['border-width'] = px(width)
  }
  if (spec.style) d['border-style'] = spec.style
  d['border-color'] = solid
}

function outline(o: NonNullable<EdgeStyle['outline']>, d: Decls): void {
  if (o === 'none') {
    d.outline = 'none'
    return
  }
  const spec: OutlineSpec = typeof o === 'number' ? { width: o } : typeof o === 'string' ? { color: o } : o
  d['outline-width'] = px(spec.width ?? 1)
  d['outline-style'] = spec.style ?? 'solid'
  d['outline-color'] = color(spec.color ?? 'phosphor')
  if (spec.offset !== undefined) d['outline-offset'] = px(spec.offset)
}

const radius = (r: Radius): string => (r === 'full' ? '9999px' : typeof r === 'string' ? `var(--n-r-${r})` : px(r))

export function chamferPath(c: number): string {
  const v = px(c)
  return `polygon(${v} 0, calc(100% - ${v}) 0, 100% ${v}, 100% calc(100% - ${v}), calc(100% - ${v}) 100%, ${v} 100%, 0 calc(100% - ${v}), 0 ${v})`
}

export function resolveEdge(s: EdgeStyle, d: Decls, ctx: ResolveContext): void {
  if (s.border !== undefined) border(s.border, d, ctx)
  if (s.radius !== undefined) {
    if (typeof s.radius === 'object') {
      const r = s.radius
      if (r.tl !== undefined) d['border-top-left-radius'] = radius(r.tl)
      if (r.tr !== undefined) d['border-top-right-radius'] = radius(r.tr)
      if (r.br !== undefined) d['border-bottom-right-radius'] = radius(r.br)
      if (r.bl !== undefined) d['border-bottom-left-radius'] = radius(r.bl)
    } else d['border-radius'] = radius(s.radius)
  }
  if (s.shape !== undefined) {
    d['clip-path'] = s.shape === 'box' ? 'none' : chamferPath(s.shape === 'chamfer' ? 8 : s.shape.chamfer)
  }
  if (s.outline !== undefined) outline(s.outline, d)
}
