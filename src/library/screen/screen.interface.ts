import type { FrameProps } from '../../frame/frame.interface.ts'
import type { Theme, Tint } from '../../tokens/tokens.interface.ts'

export interface ScreenProps extends Omit<FrameProps, 'theme'> {
  /** Phosphor color. Default green. */
  tint?: Tint
  /** A full theme from createTheme(); wins over `tint`. */
  theme?: Theme
  /** CRT scanlines over everything. Default true. */
  scanlines?: boolean
  /** Darkened corners like a curved tube. Default true. */
  vignette?: boolean
  /** A faint brightness flicker. Default false; off under reduced motion. */
  flicker?: boolean
  /** Load the theme's web fonts (Charis SIL, Space Mono) from Google Fonts. Default true; false to self-host. */
  fonts?: boolean
  /** Fill the viewport height. Default true. */
  fullscreen?: boolean
}

export interface ScreenViewModel {
  /** The Screen's element, shared with overlays (Modal) so they portal inside the tube and keep its theme. */
  element: HTMLElement | null
  frame: FrameProps
}
