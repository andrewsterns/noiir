import type * as React from 'react'
import type { FrameProps } from '../../frame/frame.interface.ts'

export interface TabItem {
  id: string
  label: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

export interface TabsProps extends Omit<FrameProps, 'children' | 'label' | 'value' | 'defaultValue'> {
  items: readonly TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (id: string) => void
  /** Names the tab list for screen readers. */
  label?: string
}

export interface TabView {
  id: string
  label: React.ReactNode
  frame: FrameProps
}

export interface TabsViewModel {
  tabs: TabView[]
  list: FrameProps
  panel: FrameProps
  content: React.ReactNode
  frame: FrameProps
}
