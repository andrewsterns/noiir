import type { FieldProps } from '../input/input.interface.ts'

export interface TextareaProps extends FieldProps {
  /** Minimum height in px. Default 96. */
  minH?: number
}

export type { FieldViewModel as TextareaViewModel } from '../input/input.interface.ts'
