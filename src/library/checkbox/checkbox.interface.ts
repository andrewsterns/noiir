import type * as React from 'react'
import type { FrameProps } from '../../frame/frame.interface.ts'

export interface CheckboxProps extends Omit<FrameProps, 'children' | 'onChange' | 'label' | 'value' | 'defaultChecked' | 'checked'> {
  label: React.ReactNode
  checked?: boolean
  defaultChecked?: boolean
  /** Shows [-] and aria-checked="mixed" (a parent of partly-checked children). */
  indeterminate?: boolean
  onCheckedChange?: (checked: boolean) => void
  /** Submit with a form: sends `name=value` while checked. */
  name?: string
  value?: string
}

export interface CheckboxViewModel {
  mark: '[x]' | '[ ]' | '[-]'
  label: React.ReactNode
  hidden: { name: string; value: string } | null
  frame: FrameProps
}
