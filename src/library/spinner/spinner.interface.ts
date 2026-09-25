import type { FrameProps } from '../../frame/frame.interface.ts'

export const SPINNER_FRAMES = ['|', '/', '-', '\\'] as const

export interface SpinnerProps extends FrameProps {
  /** Announce the spinner (role="status"). Without a label it is decorative. */
  label?: string
}

export interface SpinnerViewModel {
  char: string
  frame: FrameProps
}
