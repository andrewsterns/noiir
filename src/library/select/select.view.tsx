import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import { Field } from '../input/input.view.tsx'
import { Glyph } from '../glyph/glyph.view.tsx'
import type { SelectProps } from './select.interface.ts'
import { useSelectViewModel } from './select.viewmodel.ts'

/** A native select in a CRT box: full keyboard and screen-reader support for free. */
export function Select(props: SelectProps): React.ReactNode {
  const vm = useSelectViewModel(props)
  return (
    <Field vm={vm}>
      <Frame {...vm.field}>
        {vm.placeholder !== undefined && (
          <Frame as="option" value="">
            {vm.placeholder}
          </Frame>
        )}
        {vm.options.map((o) => (
          <Frame as="option" key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </Frame>
        ))}
      </Frame>
      <Glyph name="down" justifySelf="end" margin={{ right: 12 }} color="dim" pointerEvents="none" />
    </Field>
  )
}
