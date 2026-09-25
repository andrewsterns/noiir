import type { FrameProps } from '../../frame/frame.interface.ts'

export const BADGE_TONES = ['default', 'solid', 'accent', 'danger'] as const
export type BadgeTone = (typeof BADGE_TONES)[number]

export interface BadgeProps extends FrameProps {
  tone?: BadgeTone
}

export interface BadgeViewModel {
  frame: FrameProps & { tone: BadgeTone }
}
