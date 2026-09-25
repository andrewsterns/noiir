import type { FrameProps } from '../../frame/frame.interface.ts'

export interface ProgressProps extends Omit<FrameProps, 'label' | 'value'> {
  /** 0–1. Leave undefined (or null) while the amount is unknown. */
  value?: number | null
  /** Accessible name, e.g. "Uploading". */
  label: string
  /** Bar length in characters. Default 20. */
  width?: number
  /** Show the percentage after the bar. Default true. */
  showValue?: boolean
}

export interface ProgressViewModel {
  bar: string
  percent: string | null
  frame: FrameProps
}
