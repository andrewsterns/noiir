import type * as React from 'react'
import type { FrameProps } from '../../frame/frame.interface.ts'

export interface ModalProps extends Omit<FrameProps, 'title' | 'children' | 'open'> {
  open: boolean
  onClose: () => void
  title: React.ReactNode
  children?: React.ReactNode
  /** Buttons in the footer, right-aligned. */
  actions?: React.ReactNode
  /** Max width: sm 400 · md 560 (default) · lg 800. */
  size?: 'sm' | 'md' | 'lg'
  /** Escape, the ✕ button and a backdrop click close it. Default true; set false for flows that need an answer. */
  dismissable?: boolean
}

export interface ModalViewModel {
  /** Where the dialog portals: the nearest <Screen> (so it keeps the tint), else document.body. */
  container: HTMLElement | null
  dismissable: boolean
  title: React.ReactNode
  titleId: string
  actions: React.ReactNode
  close: () => void
  backdrop: FrameProps
  dialog: FrameProps
}
