import type * as React from 'react'
import type { FrameProps } from '../../frame/frame.interface.ts'

export interface TooltipProps extends Omit<FrameProps, 'content' | 'children'> {
  /** Short supplementary text. Never put the only copy of important information here. */
  content: React.ReactNode
  /** One focusable element (usually a Button). It gets aria-describedby pointing at the tip. */
  children: React.ReactElement
  side?: 'top' | 'bottom'
  /** Hover delay before showing, ms. Keyboard focus shows it at once. Default 400. */
  delay?: number
}

export interface TooltipViewModel {
  id: string
  content: React.ReactNode
  wrapper: FrameProps
  tip: FrameProps
}
