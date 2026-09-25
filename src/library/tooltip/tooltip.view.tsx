import { cloneElement } from 'react'
import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { TooltipProps } from './tooltip.interface.ts'
import { useTooltipViewModel } from './tooltip.viewmodel.ts'

/** A small label on hover or keyboard focus. Escape hides it. */
export function Tooltip(props: TooltipProps): React.ReactNode {
  const vm = useTooltipViewModel(props)
  return (
    <Frame {...vm.wrapper}>
      {cloneElement(props.children as React.ReactElement<{ 'aria-describedby'?: string }>, { 'aria-describedby': vm.id })}
      <Frame {...vm.tip}>{vm.content}</Frame>
    </Frame>
  )
}
