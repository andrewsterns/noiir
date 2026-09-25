import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { PanelProps } from './panel.interface.ts'
import { usePanelViewModel } from './panel.viewmodel.ts'

/** A titled box, terminal-window style: ┌─ TITLE ─────────┐ */
export function Panel(props: PanelProps): React.ReactNode {
  const vm = usePanelViewModel(props)
  return (
    <Frame {...vm.frame}>
      <Frame {...vm.chip} left={16}>
        <Frame as="h2" id={vm.titleId} font="heading">
          {vm.title}
        </Frame>
      </Frame>
      {vm.actions !== undefined && (
        <Frame {...vm.chip} right={16}>
          {vm.actions}
        </Frame>
      )}
      {props.children}
    </Frame>
  )
}
