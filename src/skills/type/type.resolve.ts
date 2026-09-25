import type { Decls, ResolveContext } from '../../engine/engine.interface.ts'
import { color, px } from '../../engine/units.ts'
import { applyBackground, solidOf, toBackground } from '../paint/paint.resolve.ts'
import type { FontSpec, TypeStyle } from './type.interface.ts'

const FAMILIES: ReadonlySet<string> = new Set(['heading', 'body', 'mono'])
const CASE = { upper: 'uppercase', lower: 'lowercase', title: 'capitalize', none: 'none' } as const

function font(f: NonNullable<TypeStyle['font']>, d: Decls): void {
  if (typeof f === 'string') {
    d['font-family'] = `var(--n-t-${f}-family)`
    d['font-size'] = `var(--n-t-${f}-size)`
    d['line-height'] = `var(--n-t-${f}-leading)`
    d['font-weight'] = `var(--n-t-${f}-weight)`
    d['letter-spacing'] = `var(--n-t-${f}-tracking)`
    d['text-transform'] = `var(--n-t-${f}-case)`
    return
  }
  const s: FontSpec = f
  if (s.family) d['font-family'] = FAMILIES.has(s.family) ? `var(--n-font-${s.family})` : s.family
  if (s.size !== undefined) d['font-size'] = px(s.size)
  if (s.weight !== undefined) d['font-weight'] = String(s.weight)
  if (s.leading !== undefined) d['line-height'] = String(s.leading)
  if (s.tracking !== undefined) d['letter-spacing'] = typeof s.tracking === 'number' ? `${s.tracking}em` : s.tracking
  if (s.case) d['text-transform'] = CASE[s.case]
  if (s.italic !== undefined) d['font-style'] = s.italic ? 'italic' : 'normal'
}

export function resolveType(s: TypeStyle, d: Decls, ctx: ResolveContext): void {
  if (s.font !== undefined) font(s.font, d)
  if (s.color !== undefined) {
    const solid = solidOf(s.color)
    if (solid !== undefined) d.color = solid
    else {
      // Gradient / image text: paint the background and clip it to the letters.
      // This replaces the frame's own fill; nest a <Text> inside a filled frame instead.
      applyBackground(toBackground(s.color, ctx, 'text'), d, ctx)
      d['-webkit-background-clip'] = 'text'
      d['background-clip'] = 'text'
      d.color = 'transparent'
    }
  }
  if (s.textAlign) d['text-align'] = s.textAlign
  if (s.truncate) {
    d.overflow = 'hidden'
    d['text-overflow'] = 'ellipsis'
    d['white-space'] = 'nowrap'
  }
  if (s.clamp !== undefined) {
    d.display = '-webkit-box'
    d['-webkit-box-orient'] = 'vertical'
    d['-webkit-line-clamp'] = String(s.clamp)
    d.overflow = 'hidden'
  }
  if (s.balance) d['text-wrap'] = 'balance'
  if (s.whitespace) d['white-space'] = s.whitespace
  if (s.caret) d['caret-color'] = color(s.caret)
  if (s.decoration) {
    d['text-decoration-line'] = s.decoration
    if (s.decoration === 'underline') d['text-underline-offset'] = '0.2em'
  }
}
