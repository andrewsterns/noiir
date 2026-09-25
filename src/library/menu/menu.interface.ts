import type * as React from 'react'
import type { FrameProps } from '../../frame/frame.interface.ts'
import type { Actions } from '../../actions/actions.interface.ts'
import type { GlyphName } from '../glyph/glyph.interface.ts'
import type { ButtonKind } from '../button/button.interface.ts'

export interface MenuItem {
  label: React.ReactNode
  /** What choosing the item does. A viewmodel function or data actions. */
  onSelect?: Actions<undefined>
  glyph?: GlyphName
  disabled?: boolean
  danger?: boolean
}

export interface MenuProps extends Omit<FrameProps, 'children' | 'label'> {
  /** The trigger button's text. */
  label: React.ReactNode
  items: readonly MenuItem[]
  /** Which edge of the trigger the menu lines up with. Default 'start'. */
  align?: 'start' | 'end'
  triggerKind?: ButtonKind
}

export interface MenuItemView {
  key: number
  label: React.ReactNode
  glyph: GlyphName | undefined
  frame: FrameProps
}

export interface MenuViewModel {
  open: boolean
  label: React.ReactNode
  triggerKind: ButtonKind
  trigger: FrameProps
  menu: FrameProps
  items: MenuItemView[]
  frame: FrameProps
}
