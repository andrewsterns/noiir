import type { FieldProps, FieldViewModel } from '../input/input.interface.ts'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<FieldProps, 'placeholder' | 'autoComplete' | 'readOnly'> {
  options: readonly SelectOption[]
  /** A first, empty choice ("Choose…"). */
  placeholder?: string
}

export interface SelectViewModel extends FieldViewModel {
  options: readonly SelectOption[]
  placeholder: string | undefined
}
