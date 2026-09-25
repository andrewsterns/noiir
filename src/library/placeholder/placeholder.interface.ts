import type { FrameProps } from '../../frame/frame.interface.ts'
import type { Pattern } from '../../skills/paint/paint.interface.ts'

export const PLACEHOLDER_KINDS = ['image', 'video', 'avatar', 'chart', 'map', 'icon', 'block'] as const
export type PlaceholderKind = (typeof PLACEHOLDER_KINDS)[number]

export interface PlaceholderProps extends FrameProps {
  /** What will go here. Sets the default ratio, pattern and caption. */
  kind?: PlaceholderKind
  /** Aspect ratio, e.g. '16/9' or 1. Defaults per kind (image 4/3, video 16/9, avatar 1). */
  ratio?: number | string
  /** Text in the center chip. Defaults to "IMAGE 4:3" etc. Pass '' for none. */
  caption?: string
}

export interface PlaceholderViewModel {
  caption: string
  frame: FrameProps
}

export const PLACEHOLDER_DEFAULTS: Record<PlaceholderKind, { ratio?: string; pattern: Pattern; chip: boolean }> = {
  image: { ratio: '4/3', pattern: 'cross', chip: true },
  video: { ratio: '16/9', pattern: 'cross', chip: true },
  avatar: { ratio: '1', pattern: 'cross', chip: false },
  chart: { ratio: '16/9', pattern: 'grid', chip: true },
  map: { ratio: '4/3', pattern: 'dots', chip: true },
  icon: { ratio: '1', pattern: 'cross', chip: false },
  block: { pattern: 'hatch', chip: true },
}
