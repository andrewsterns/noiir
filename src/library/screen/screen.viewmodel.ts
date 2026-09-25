import { createContext, useEffect, useState } from 'react'
import { loadFonts } from '../../tokens/fonts.ts'
import type { ScreenProps, ScreenViewModel } from './screen.interface.ts'

/** The nearest Screen's element, or null outside one. Overlays portal into it. */
export const ScreenContext = createContext<HTMLElement | null>(null)

export function useScreenViewModel({
  tint = 'green',
  theme,
  scanlines = true,
  vignette = true,
  flicker = false,
  fullscreen = true,
  fonts = true,
  ...props
}: ScreenProps): ScreenViewModel {
  const [element, setElement] = useState<HTMLElement | null>(null)
  useEffect(() => {
    if (fonts) loadFonts()
  }, [fonts])
  return {
    element,
    frame: {
      ref: setElement,
      'data-screen': '',
      theme: theme ?? tint,
      fill: vignette ? [{ radial: 'ellipse at center, transparent 60%, rgb(0 0 0 / .28) 100%' }, 'bg'] : 'bg',
      color: 'phosphor',
      font: 'body',
      glow: 'text',
      scanlines,
      ...(flicker && { loop: 'flicker' }),
      ...(fullscreen && { minH: 'screen' }),
      ...props,
    } as ScreenViewModel['frame'],
  }
}
