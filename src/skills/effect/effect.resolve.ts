import type { Decls, ResolveContext } from '../../engine/engine.interface.ts'
import { color, px } from '../../engine/units.ts'
import type { EffectStyle, ShadowSpec } from './effect.interface.ts'

const spec = (s: ShadowSpec) =>
  `${s.inset ? 'inset ' : ''}${s.x ?? 0}px ${s.y ?? 0}px ${s.blur ?? 0}px ${s.spread ?? 0}px ${color(s.color ?? 'rgb(0 0 0 / .5)')}`

function shadowPart(v: EffectStyle['shadow']): string | undefined {
  if (v === undefined || v === 'none') return undefined
  if (typeof v === 'string') return `var(--n-shadow-${v})`
  return (Array.isArray(v) ? v : [v as ShadowSpec]).map(spec).join(', ')
}

const glowBox = (g: EffectStyle['glow']) => (g === true || g === 'box' ? 'var(--n-glow-box)' : g === 'strong' ? 'var(--n-glow-box-strong)' : undefined)
const glowText = (g: EffectStyle['glow']) => (g === true || g === 'text' ? 'var(--n-glow-text)' : g === 'strong' ? 'var(--n-glow-text-strong)' : undefined)

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 OPACITY 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export function resolveEffect(s: EffectStyle, d: Decls, ctx: ResolveContext): void {
  // box-shadow and text-shadow are shared by `shadow` and `glow`. A state layer that sets only one
  // of them keeps the other from the base style.
  const base = ctx.layer === 'base' ? undefined : (ctx.base as EffectStyle | undefined)
  if (s.shadow !== undefined || s.glow !== undefined) {
    const shadow = s.shadow !== undefined ? s.shadow : base?.shadow
    const glow = s.glow !== undefined ? s.glow : base?.glow
    d['box-shadow'] = [shadowPart(shadow), glowBox(glow)].filter(Boolean).join(', ') || 'none'
  }
  // 'box' glows the box only: it leaves text-shadow (often inherited from <Screen>) alone.
  if (s.glow !== undefined && s.glow !== 'box') d['text-shadow'] = glowText(s.glow) ?? 'none'

  if (s.blur !== undefined) d.filter = `blur(${px(s.blur)})`
  if (s.backdrop !== undefined) {
    const b = typeof s.backdrop === 'number' ? { blur: s.backdrop } : s.backdrop
    d['backdrop-filter'] = [b.blur !== undefined && `blur(${px(b.blur)})`, b.saturate !== undefined && `saturate(${b.saturate}%)`]
      .filter(Boolean)
      .join(' ')
  }
  if (s.scanlines || s.noise) {
    ctx.needsPosition = true
    const images: string[] = []
    if (s.scanlines) {
      const o = typeof s.scanlines === 'object' ? s.scanlines : {}
      images.push(`repeating-linear-gradient(to bottom, rgb(0 0 0 / ${o.opacity ?? 0.1}) 0 1px, transparent 1px ${o.size ?? 3}px)`)
    }
    if (s.noise) images.push(NOISE.replace('OPACITY', String(typeof s.noise === 'number' ? s.noise : 0.06)))
    d['::after content'] = '""'
    d['::after position'] = 'absolute'
    d['::after inset'] = '0'
    d['::after pointer-events'] = 'none'
    d['::after border-radius'] = 'inherit'
    d['::after background-image'] = images.join(', ')
  }
  if (s.mask !== undefined) d['mask-image'] = s.mask

  // x / y: in the base layer they go through inline vars (so a dragged or animated frame doesn't mint
  // a class per pixel); state layers read the base var for whichever axis they don't set.
  if (s.x !== undefined || s.y !== undefined) {
    if (ctx.layer === 'base') {
      if (s.x !== undefined) ctx.vars['--n-x'] = px(s.x)
      if (s.y !== undefined) ctx.vars['--n-y'] = px(s.y)
      d.translate = 'var(--n-x, 0px) var(--n-y, 0px)'
    } else {
      d.translate = `${s.x !== undefined ? px(s.x) : 'var(--n-x, 0px)'} ${s.y !== undefined ? px(s.y) : 'var(--n-y, 0px)'}`
    }
  }
  if (s.scale !== undefined) d.scale = String(s.scale)
  if (s.rotate !== undefined) d.rotate = typeof s.rotate === 'number' ? `${s.rotate}deg` : s.rotate
}
