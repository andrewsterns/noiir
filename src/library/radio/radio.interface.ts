import type * as React from 'react'
import type { FrameProps } from '../../frame/frame.interface.ts'

export interface RadioOption {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

export interface RadioGroupProps extends Omit<FrameProps, 'children' | 'onChange' | 'label' | 'value' | 'defaultValue'> {
  /** The question the group answers. Visible, and names the radiogroup. */
  label: string
  options: readonly RadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Submit with a form. */
  name?: string
  direction?: 'column' | 'row'
}

export interface RadioItem {
  id: string
  value: string
  label: React.ReactNode
  checked: boolean
  disabled: boolean
  tabIndex: number
  select: () => void
}

export interface RadioGroupViewModel {
  labelId: string
  label: string
  items: RadioItem[]
  hidden: { name: string; value: string } | null
  frame: FrameProps
  list: FrameProps
}
