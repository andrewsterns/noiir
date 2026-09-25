import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import { Button } from '../button/button.view.tsx'
import { Glyph } from '../glyph/glyph.view.tsx'
import type { ToasterProps } from './toast.interface.ts'
import { useToasterViewModel } from './toast.viewmodel.ts'

/** Mount once. Then call `toast('Saved', { kind: 'ok' })` from anywhere. */
export function Toaster(props: ToasterProps): React.ReactNode {
  const vm = useToasterViewModel(props)
  return (
    <Frame {...vm.frame}>
      {vm.toasts.map((t) => (
        <Frame key={t.item.id} {...t.frame}>
          <Glyph name={t.glyph} />
          <Frame as="p" grow font="body">
            {t.item.message}
          </Frame>
          <Button kind="ghost" size="sm" glyph="close" label="Dismiss" onClick={t.dismiss} />
        </Frame>
      ))}
    </Frame>
  )
}
