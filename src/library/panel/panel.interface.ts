import type * as React from 'react'
import type { FrameProps } from '../../frame/frame.interface.ts'
import type { Color } from '../../skills/paint/paint.interface.ts'

export interface PanelProps extends Omit<FrameProps, 'title'> {
  /** Set into the top line: ┌─ TITLE ─────┐ */
  title: string
  /** Small controls set into the top line on the right. */
  actions?: React.ReactNode
  /** Background behind the title chip; match whatever is behind the panel. Default 'bg'. */
  titleFill?: Color
}

export interface PanelViewModel {
  titleId: string
  title: string
  actions: React.ReactNode
  chip: FrameProps
  frame: FrameProps
}
