import type * as React from 'react'
import type { FrameProps } from '../../frame/frame.interface.ts'
import type { GlyphName } from '../glyph/glyph.interface.ts'
import type { ColorToken } from '../../tokens/tokens.interface.ts'

export type ToastKind = 'info' | 'ok' | 'error'

export interface ToastOptions {
  kind?: ToastKind
  /** ms before it dismisses itself. Default 4000 (errors 8000). */
  duration?: number
}

export interface ToastItem {
  id: number
  message: React.ReactNode
  kind: ToastKind
  duration: number
  closing: boolean
}

export type ToasterProps = FrameProps

export interface ToasterViewModel {
  toasts: { item: ToastItem; glyph: GlyphName; frame: FrameProps; dismiss: () => void }[]
  frame: FrameProps
}

/** The trigger every Toaster listens for. */
export const TOAST_TRIGGER = 'noiir:toast'

export const TOAST_LOOK: Record<ToastKind, { glyph: GlyphName; color: ColorToken }> = {
  info: { glyph: 'info', color: 'phosphor' },
  ok: { glyph: 'check', color: 'phosphor' },
  error: { glyph: 'warn', color: 'danger' },
}
