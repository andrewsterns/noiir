import type * as React from 'react'
import type { FrameProps } from '../../frame/frame.interface.ts'

export const LIST_MARKERS = { prompt: '>', bullet: '■', dash: '-', none: '' } as const
export type ListMarker = keyof typeof LIST_MARKERS

export interface ListProps extends FrameProps {
  /** Character before each item. Default 'prompt' (>). */
  marker?: ListMarker
  /** A faint line under each item. */
  divided?: boolean
}

export interface ListItemProps extends FrameProps {
  /** Replaces the list marker for this item (a glyph, a Badge, an avatar Placeholder). */
  leading?: React.ReactNode
  trailing?: React.ReactNode
  /** Second line in dim caption text. */
  description?: React.ReactNode
}

export interface ListContextValue {
  marker: ListMarker
  divided: boolean
}

export interface ListViewModel {
  context: ListContextValue
  frame: FrameProps
}

export interface ListItemViewModel {
  interactive: boolean
  marker: string
  leading: React.ReactNode
  trailing: React.ReactNode
  description: React.ReactNode
  /** The <li>. */
  item: FrameProps
  /** The row inside it: a button or link when the item is interactive. */
  row: FrameProps
}
