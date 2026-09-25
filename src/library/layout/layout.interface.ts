import type { FrameProps } from '../../frame/frame.interface.ts'

/** A vertical column. Default gap 12. */
export type StackProps = FrameProps

/** A horizontal row, vertically centered. Default gap 8. */
export type RowProps = FrameProps

export interface GridProps extends FrameProps {
  /** Responsive columns without breakpoints: as many columns as fit, each at least `min` px wide. */
  min?: number
}

export interface SpacerProps extends FrameProps {
  /** A fixed gap in px. Without it, the spacer grows to push siblings apart. */
  space?: number
}

export interface LayoutViewModel {
  frame: FrameProps
}
