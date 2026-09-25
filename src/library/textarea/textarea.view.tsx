import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import { Field } from '../input/input.view.tsx'
import type { TextareaProps } from './textarea.interface.ts'
import { useTextareaViewModel } from './textarea.viewmodel.ts'

/** A multi-line field. Resizes vertically. */
export function Textarea(props: TextareaProps): React.ReactNode {
  const vm = useTextareaViewModel(props)
  return (
    <Field vm={vm}>
      <Frame {...vm.field} />
    </Field>
  )
}
