import type * as React from 'react'
import { createPortal } from 'react-dom'
import { Frame } from '../../frame/frame.view.tsx'
import { Button } from '../button/button.view.tsx'
import type { ModalProps } from './modal.interface.ts'
import { useModalViewModel } from './modal.viewmodel.ts'

/** A dialog that powers on like a CRT. Focus is trapped inside until it closes. */
export function Modal(props: ModalProps): React.ReactNode {
  const vm = useModalViewModel(props)
  if (!vm.container) return null
  return createPortal(
    <Frame {...vm.backdrop}>
      <Frame {...vm.dialog}>
        <Frame flow="row" align="center" gap={12} padding={{ x: 16, y: 12 }} border={{ sides: ['bottom'] }}>
          <Frame as="h2" id={vm.titleId} font="heading" grow>
            {vm.title}
          </Frame>
          {vm.dismissable && <Button kind="ghost" size="sm" glyph="close" label="Close" onClick={vm.close} />}
        </Frame>
        <Frame flow="column" gap={12} padding={16} scroll="y">
          {props.children}
        </Frame>
        {vm.actions !== undefined && (
          <Frame flow="row" gap={8} wrap justify="end" padding={{ x: 16, y: 12 }} border={{ sides: ['top'] }}>
            {vm.actions}
          </Frame>
        )}
      </Frame>
    </Frame>,
    vm.container,
  )
}
