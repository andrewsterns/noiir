import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import { FIELD_ERROR, FIELD_HINT, FIELD_LABEL } from '../recipes.ts'
import { Glyph } from '../glyph/glyph.view.tsx'
import type { FieldViewModel, InputProps } from './input.interface.ts'
import { useInputViewModel } from './input.viewmodel.ts'

/** Label, box, hint and error around any field. Input, Textarea and Select all render through it. */
export function Field({ vm, children }: { vm: FieldViewModel; children: React.ReactNode }): React.ReactNode {
  return (
    <Frame {...vm.wrapper}>
      <Frame as="label" htmlFor={vm.ids.field} {...FIELD_LABEL} hidden={vm.hideLabel ? 'visually' : undefined}>
        {vm.label}
        {vm.required && (
          <Frame as="span" color="danger" aria-hidden="true">
            {' *'}
          </Frame>
        )}
      </Frame>
      <Frame {...vm.box}>
        {vm.prompt && <Glyph name="prompt" color="dim" />}
        {children}
      </Frame>
      {vm.hint && (
        <Frame id={vm.ids.hint} {...FIELD_HINT}>
          {vm.hint}
        </Frame>
      )}
      {vm.errorText && (
        <Frame id={vm.ids.error} role="alert" {...FIELD_ERROR}>
          {`! ${vm.errorText}`}
        </Frame>
      )}
    </Frame>
  )
}

/** A text field with a `>` prompt. The label is required; errors are announced. */
export function Input(props: InputProps): React.ReactNode {
  const vm = useInputViewModel(props)
  return (
    <Field vm={vm}>
      <Frame {...vm.field} />
    </Field>
  )
}
