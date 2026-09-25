import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { DividerProps } from './divider.interface.ts'
import { useDividerViewModel } from './divider.viewmodel.ts'

/** A 1px rule. With a label: ──── SECTION ────. */
export function Divider(props: DividerProps): React.ReactNode {
  const vm = useDividerViewModel(props)
  if (vm.kind !== 'labelled') return <Frame {...vm.frame} />
  return (
    <Frame {...vm.frame}>
      <Frame h={1} grow fill={vm.tone} />
      <Frame as="span" font="label" color="dim" aria-hidden="true">
        {vm.label}
      </Frame>
      <Frame h={1} grow fill={vm.tone} />
    </Frame>
  )
}
