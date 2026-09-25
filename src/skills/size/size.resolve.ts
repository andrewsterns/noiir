import type { Decls } from '../../engine/engine.interface.ts'
import { px } from '../../engine/units.ts'
import type { Size, SizeStyle } from './size.interface.ts'

const dim = (v: Size, axis: 'w' | 'h'): string =>
  v === 'fill' ? '100%' : v === 'hug' ? 'fit-content' : v === 'screen' ? (axis === 'w' ? '100vw' : '100dvh') : px(v)

export function resolveSize(s: SizeStyle, d: Decls): void {
  if (s.w !== undefined) d.width = dim(s.w, 'w')
  if (s.h !== undefined) d.height = dim(s.h, 'h')
  if (s.minW !== undefined) d['min-width'] = dim(s.minW, 'w')
  if (s.maxW !== undefined) d['max-width'] = dim(s.maxW, 'w')
  if (s.minH !== undefined) d['min-height'] = dim(s.minH, 'h')
  if (s.maxH !== undefined) d['max-height'] = dim(s.maxH, 'h')
  if (s.aspect !== undefined) d['aspect-ratio'] = typeof s.aspect === 'number' ? String(s.aspect) : s.aspect.replace(/\s*\/\s*/, ' / ')
}
