import type * as React from 'react'
import type { FrameProps } from '../../frame/frame.interface.ts'
import type { GlyphName } from '../glyph/glyph.interface.ts'

export const BUTTON_KINDS = ['primary', 'secondary', 'ghost', 'danger'] as const
export type ButtonKind = (typeof BUTTON_KINDS)[number]

export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const
export type ButtonSize = (typeof BUTTON_SIZES)[number]

export interface ButtonProps extends Omit<FrameProps, 'size'> {
  /** primary: inverted phosphor block · secondary: line box (default) · ghost: no box · danger: destructive. */
  kind?: ButtonKind
  /** sm 32px · md 44px (default, a comfortable touch target) · lg 52px. */
  size?: ButtonSize
  /** Glyph before the label. Replaced by a spinner while `loading`. */
  glyph?: GlyphName
  /** Glyph after the label. */
  trailing?: GlyphName
  children?: React.ReactNode
}

export interface ButtonViewModel {
  frame: Omit<FrameProps, 'size'> & { kind: ButtonKind; size: ButtonSize }
  leading: GlyphName | 'spinner' | null
  trailing: GlyphName | null
}
