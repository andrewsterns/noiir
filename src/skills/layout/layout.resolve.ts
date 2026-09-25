import type { Decls } from '../../engine/engine.interface.ts'
import { px } from '../../engine/units.ts'
import type { Justify, LayoutStyle } from './layout.interface.ts'

const JUSTIFY: Record<Justify, string> = {
  start: 'start',
  center: 'center',
  end: 'end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

const track = (v: number | string) => (typeof v === 'number' ? `repeat(${v}, minmax(0, 1fr))` : v)
const span = (v: number | 'all') => (v === 'all' ? '1 / -1' : `span ${v}`)
const flex = (v: boolean | number) => (v === true ? '1' : v === false ? '0' : String(v))

export function resolveLayout(s: LayoutStyle, d: Decls): void {
  switch (s.flow) {
    case 'row':
    case 'column':
      d.display = 'flex'
      d['flex-direction'] = s.flow
      break
    case 'grid':
      d.display = 'grid'
      break
    case 'stack':
      d.display = 'grid'
      d['>* grid-area'] = '1 / 1'
      break
    case 'block':
    case 'inline':
      d.display = s.flow
      break
  }
  if (s.inline) {
    const shown = d.display ?? 'block'
    d.display = shown === 'flex' ? 'inline-flex' : shown === 'grid' ? 'inline-grid' : shown === 'block' ? 'inline-block' : shown
  }
  if (s.hide) d.display = 'none'

  if (s.gap !== undefined) {
    if (typeof s.gap === 'object') {
      if (s.gap.y !== undefined) d['row-gap'] = px(s.gap.y)
      if (s.gap.x !== undefined) d['column-gap'] = px(s.gap.x)
    } else d.gap = px(s.gap)
  }
  if (s.align) d['align-items'] = s.align
  if (s.justify) {
    // In a stack every child shares one cell, so justify moves the children, not the track.
    if (s.flow === 'stack') d['justify-items'] = s.justify
    else d['justify-content'] = JUSTIFY[s.justify]
  }
  if (s.alignSelf) d['align-self'] = s.alignSelf
  if (s.justifySelf) d['justify-self'] = s.justifySelf
  if (s.wrap !== undefined) d['flex-wrap'] = s.wrap ? 'wrap' : 'nowrap'
  if (s.cols !== undefined) d['grid-template-columns'] = track(s.cols)
  if (s.rows !== undefined) d['grid-template-rows'] = track(s.rows)
  if (s.span !== undefined) {
    if (typeof s.span === 'object') {
      if (s.span.cols !== undefined) d['grid-column'] = span(s.span.cols)
      if (s.span.rows !== undefined) d['grid-row'] = span(s.span.rows)
    } else d['grid-column'] = span(s.span)
  }
  if (s.grow !== undefined) d['flex-grow'] = flex(s.grow)
  if (s.shrink !== undefined) d['flex-shrink'] = flex(s.shrink)
  if (s.basis !== undefined) d['flex-basis'] = px(s.basis)
  if (s.order !== undefined) d.order = String(s.order)
  if (s.clip) d.overflow = 'hidden'
  if (s.scroll) {
    if (s.scroll === 'both') d.overflow = 'auto'
    else d[`overflow-${s.scroll}`] = 'auto'
    // Scroll panels shouldn't drag the page along when they hit their end.
    d['overscroll-behavior'] = 'contain'
    d['min-height'] = '0'
  }
}
