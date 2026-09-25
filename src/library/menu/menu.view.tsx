import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import { Button } from '../button/button.view.tsx'
import { Glyph } from '../glyph/glyph.view.tsx'
import type { MenuProps } from './menu.interface.ts'
import { useMenuViewModel } from './menu.viewmodel.ts'

/** A button that opens a list of actions. */
export function Menu(props: MenuProps): React.ReactNode {
  const vm = useMenuViewModel(props)
  return (
    <Frame {...vm.frame}>
      <Button kind={vm.triggerKind} trailing={vm.open ? 'up' : 'down'} {...vm.trigger}>
        {vm.label}
      </Button>
      <Frame {...vm.menu}>
        {vm.items.map((it) => (
          <Frame key={it.key} {...it.frame}>
            {it.glyph ? <Glyph name={it.glyph} /> : <Frame as="span" w="1ch" />}
            {it.label}
          </Frame>
        ))}
      </Frame>
    </Frame>
  )
}
