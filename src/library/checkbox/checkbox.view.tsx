import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { CheckboxProps } from './checkbox.interface.ts'
import { useCheckboxViewModel } from './checkbox.viewmodel.ts'

/** [x] Label. Space or Enter toggles. */
export function Checkbox(props: CheckboxProps): React.ReactNode {
  const vm = useCheckboxViewModel(props)
  return (
    <Frame {...vm.frame}>
      <Frame as="span" font="code" whitespace="pre" aria-hidden="true">
        {vm.mark}
      </Frame>
      <Frame as="span" font="body">
        {vm.label}
      </Frame>
      {vm.hidden && <Frame as="input" type="hidden" name={vm.hidden.name} value={vm.hidden.value} />}
    </Frame>
  )
}
