import type * as React from 'react'
import type { FrameProps } from '../../frame/frame.interface.ts'

export interface ToggleProps extends Omit<FrameProps, 'children' | 'onChange' | 'label' | 'checked' | 'defaultChecked'> {
  label: React.ReactNode
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  onText?: string
  offText?: string
}

export interface ToggleViewModel {
  on: boolean
  label: React.ReactNode
  onText: string
  offText: string
  frame: FrameProps
}
