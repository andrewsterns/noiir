import type { FrameProps } from '../../frame/frame.interface.ts'

export type FieldType = 'text' | 'email' | 'password' | 'search' | 'number' | 'tel' | 'url'

/** Props shared by Input, Textarea and Select. Layout props (w, margin, grow …) apply to the whole field. */
export interface FieldProps extends Omit<FrameProps, 'children' | 'onChange' | 'label' | 'error' | 'size' | 'value' | 'defaultValue'> {
  /** The visible label. Always required: use `hideLabel` to keep it for screen readers only. */
  label: string
  hideLabel?: boolean
  /** Help text under the field. */
  hint?: string
  /** true marks the field invalid; a string also shows the message. */
  error?: string | boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  placeholder?: string
  autoComplete?: string
}

export interface InputProps extends FieldProps {
  type?: FieldType
  /** Show the `>` prompt. Default true. */
  prompt?: boolean
}

export interface FieldViewModel {
  ids: { field: string; hint: string; error: string }
  label: string
  hideLabel: boolean
  required: boolean
  hint: string | undefined
  errorText: string | null
  prompt: boolean
  wrapper: FrameProps
  box: FrameProps
  field: FrameProps
}
