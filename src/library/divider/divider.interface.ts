import type { FrameProps } from '../../frame/frame.interface.ts'
import type { Color } from '../../skills/paint/paint.interface.ts'

export interface DividerProps extends Omit<FrameProps, 'label'> {
  /** Text set into the line: ──── SECTION ────. */
  label?: string
  vertical?: boolean
  /** Line color. Default 'line'. */
  tone?: Color
}

export interface DividerViewModel {
  kind: 'plain' | 'labelled' | 'vertical'
  label: string | undefined
  tone: Color
  frame: FrameProps
}
