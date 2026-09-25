import type { Decls, ResolveContext } from '../../engine/engine.interface.ts'
import { alpha, color, colorsIn } from '../../engine/units.ts'
import type { Blend, Color, Paint, PaintLayer, PaintStyle, Pattern } from './paint.interface.ts'

/** Background layers in CSS order (first = top), plus an optional bottom color. */
export interface Background {
  images: string[]
  sizes: string[]
  positions: string[]
  repeats: string[]
  blends: string[]
  color?: string
}

type SolidLayer = Extract<PaintLayer, { color: Color; opacity?: number; blend?: Blend }>
const isSolid = (l: PaintLayer): l is SolidLayer => typeof l === 'object' && 'color' in l && !('pattern' in l)

const layersOf = (p: Paint): readonly PaintLayer[] => (Array.isArray(p) ? p : [p as PaintLayer])

/** A single solid color, or undefined when the paint needs background layers. */
export function solidOf(p: Paint): string | undefined {
  const layers = layersOf(p)
  if (layers.length !== 1) return undefined
  const l = layers[0]!
  if (typeof l === 'string') return color(l)
  if (isSolid(l) && Object.keys(l).every((k) => k === 'color' || k === 'opacity')) return alpha(l.color, l.opacity)
  return undefined
}

function pattern(name: Pattern, c: string, size: number | undefined): Pick<Background, 'images' | 'sizes' | 'repeats'> {
  switch (name) {
    case 'scanlines':
      return { images: [`repeating-linear-gradient(to bottom, ${c} 0 1px, transparent 1px ${size ?? 3}px)`], sizes: ['auto'], repeats: ['repeat'] }
    case 'grid': {
      const s = `${size ?? 16}px ${size ?? 16}px`
      return {
        images: [`linear-gradient(to right, ${c} 1px, transparent 1px)`, `linear-gradient(to bottom, ${c} 1px, transparent 1px)`],
        sizes: [s, s],
        repeats: ['repeat', 'repeat'],
      }
    }
    case 'dots':
      return { images: [`radial-gradient(${c} 1px, transparent 1.5px)`], sizes: [`${size ?? 8}px ${size ?? 8}px`], repeats: ['repeat'] }
    case 'hatch':
      return { images: [`repeating-linear-gradient(45deg, ${c} 0 1px, transparent 1px ${size ?? 8}px)`], sizes: ['auto'], repeats: ['repeat'] }
    case 'cross': {
      // Corner-to-corner diagonals on any aspect ratio: the wireframe "image goes here" box.
      const line = `transparent calc(50% - .5px), ${c} calc(50% - .5px), ${c} calc(50% + .5px), transparent calc(50% + .5px)`
      return {
        images: [`linear-gradient(to top right, ${line})`, `linear-gradient(to bottom right, ${line})`],
        sizes: ['100% 100%', '100% 100%'],
        repeats: ['no-repeat', 'no-repeat'],
      }
    }
  }
}

/** Resolve a Paint into background layers. `role` keeps image vars for fill, text and border apart. */
export function toBackground(paint: Paint, ctx: ResolveContext, role: 'fill' | 'text' | 'edge'): Background {
  const bg: Background = { images: [], sizes: [], positions: [], repeats: [], blends: [] }
  const layers = layersOf(paint)
  const push = (image: string, size = 'auto', position = '0 0', repeat = 'repeat', blend = 'normal') => {
    bg.images.push(image)
    bg.sizes.push(size)
    bg.positions.push(position)
    bg.repeats.push(repeat)
    bg.blends.push(blend)
  }
  layers.forEach((l, i) => {
    const last = i === layers.length - 1
    if (typeof l === 'string' || isSolid(l)) {
      const c = typeof l === 'string' ? color(l) : alpha(l.color, l.opacity)
      if (last) bg.color = c
      else push(`linear-gradient(${c}, ${c})`, 'auto', '0 0', 'repeat', typeof l === 'string' ? 'normal' : (l.blend ?? 'normal'))
    } else if ('linear' in l) push(`linear-gradient(${colorsIn(l.linear)})`, 'auto', '0 0', 'repeat', l.blend)
    else if ('radial' in l) push(`radial-gradient(${colorsIn(l.radial)})`, 'auto', '0 0', 'repeat', l.blend)
    else if ('conic' in l) push(`conic-gradient(${colorsIn(l.conic)})`, 'auto', '0 0', 'repeat', l.blend)
    else if ('image' in l) {
      // Per-element URLs go through an inline variable so every card with a different
      // image still shares one class (and URLs never enter the stylesheet).
      const name = `${ctx.varPrefix}${role}-img${i}`
      ctx.vars[name] = `url(${JSON.stringify(l.image)})`
      const fit = l.fit ?? 'cover'
      push(
        `var(${name})`,
        l.size ?? (fit === 'tile' ? 'auto' : fit === 'crop' ? 'cover' : fit),
        l.position ?? 'center',
        fit === 'tile' ? 'repeat' : 'no-repeat',
        l.blend,
      )
    } else if ('video' in l) {
      if (role === 'fill') ctx.video = { src: l.video, ...(l.opacity !== undefined && { opacity: l.opacity }) }
    } else if ('pattern' in l) {
      const p = pattern(l.pattern, alpha(l.color ?? 'faint', l.opacity), l.size)
      p.images.forEach((img, j) => push(img, p.sizes[j], '0 0', p.repeats[j], l.blend))
    }
  })
  return bg
}

/** Write background declarations. In state layers an unset image is cleared so a new solid fill shows. */
export function applyBackground(bg: Background, d: Decls, ctx: ResolveContext, prefix = ''): void {
  if (bg.images.length) {
    d[`${prefix}background-image`] = bg.images.join(', ')
    if (bg.sizes.some((s) => s !== 'auto')) d[`${prefix}background-size`] = bg.sizes.join(', ')
    if (bg.positions.some((p) => p !== '0 0')) d[`${prefix}background-position`] = bg.positions.join(', ')
    if (bg.repeats.some((r) => r !== 'repeat')) d[`${prefix}background-repeat`] = bg.repeats.join(', ')
    if (bg.blends.some((b) => b !== 'normal')) d[`${prefix}background-blend-mode`] = bg.blends.join(', ')
  } else if (ctx.layer !== 'base') d[`${prefix}background-image`] = 'none'
  if (bg.color) d[`${prefix}background-color`] = bg.color
  else if (ctx.layer !== 'base' && bg.images.length) d[`${prefix}background-color`] = 'transparent'
}

export function resolvePaint(s: PaintStyle, d: Decls, ctx: ResolveContext): void {
  if (s.fill !== undefined) applyBackground(toBackground(s.fill, ctx, 'fill'), d, ctx)
  if (s.opacity !== undefined) d.opacity = String(s.opacity)
  if (s.blend) d['mix-blend-mode'] = s.blend
}
