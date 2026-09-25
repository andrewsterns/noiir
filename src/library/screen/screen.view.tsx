import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { ScreenProps } from './screen.interface.ts'
import { ScreenContext, useScreenViewModel } from './screen.viewmodel.ts'

/**
 * The CRT tube. Put it at the root once: it scopes the theme (tint), paints the background,
 * sets phosphor text with a soft glow, and lays scanlines over everything in a single overlay.
 */
export function Screen(props: ScreenProps): React.ReactNode {
  const vm = useScreenViewModel(props)
  return (
    <ScreenContext value={vm.element}>
      <Frame {...vm.frame} />
    </ScreenContext>
  )
}
