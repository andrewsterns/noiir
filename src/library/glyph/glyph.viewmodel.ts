import { GLYPHS } from './glyph.interface.ts'
import type { GlyphProps, GlyphViewModel } from './glyph.interface.ts'

export function useGlyphViewModel({ name, label, ...props }: GlyphProps): GlyphViewModel {
  return {
    frame: {
      as: 'span',
      inline: true,
      flow: 'block',
      textAlign: 'center',
      minW: '1ch',
      select: 'none',
      ...(label ? { role: 'img', label } : { 'aria-hidden': 'true' }),
      ...props,
      children: GLYPHS[name],
    },
  }
}
