import type { FrameProps } from '../../frame/frame.interface.ts'
import type { Tag } from '../../skills/access/access.interface.ts'
import type { FontToken } from '../../tokens/tokens.interface.ts'

export type TextProps = FrameProps

export interface LinkProps extends FrameProps {
  href: string
  /** Opens in a new tab with rel="noopener noreferrer" and a ↗ hint for screen readers. */
  external?: boolean
}

export interface TextViewModel {
  frame: FrameProps
}

/** The element each text style renders as, unless `as` says otherwise. */
export const FONT_TAG: Record<FontToken, Tag> = {
  display: 'h1',
  title: 'h2',
  heading: 'h3',
  body: 'p',
  label: 'span',
  caption: 'small',
  code: 'code',
}
