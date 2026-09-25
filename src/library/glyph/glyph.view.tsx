import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { GlyphProps } from './glyph.interface.ts'
import { useGlyphViewModel } from './glyph.viewmodel.ts'

/** A terminal icon: `<Glyph name="search" />`. Hidden from screen readers unless it has a label. */
export function Glyph(props: GlyphProps): React.ReactNode {
  return <Frame {...useGlyphViewModel(props).frame} />
}
