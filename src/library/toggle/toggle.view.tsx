import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import { INVERT } from '../recipes.ts'
import type { ToggleProps } from './toggle.interface.ts'
import { useToggleViewModel } from './toggle.viewmodel.ts'

const SEGMENT = { as: 'span', padding: { x: 8 }, font: 'label', color: 'dim' } as const

/** A switch: Label [ON|OFF], the active side inverted. */
export function Toggle(props: ToggleProps): React.ReactNode {
  const vm = useToggleViewModel(props)
  return (
    <Frame {...vm.frame}>
      <Frame as="span">{vm.label}</Frame>
      <Frame as="span" flow="row" border={1} radius="full" clip aria-hidden="true">
        <Frame {...SEGMENT} {...(vm.on && INVERT)}>
          {vm.onText}
        </Frame>
        <Frame {...SEGMENT} {...(!vm.on && { fill: 'faint', color: 'phosphor' })}>
          {vm.offText}
        </Frame>
      </Frame>
    </Frame>
  )
}
