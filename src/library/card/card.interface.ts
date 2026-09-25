import type * as React from 'react'
import type { FrameProps } from '../../frame/frame.interface.ts'

export interface CardProps extends Omit<FrameProps, 'title' | 'media'> {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  /** Usually a <Placeholder kind="image" /> or an image frame. */
  media?: React.ReactNode
  /** Buttons along the bottom. */
  actions?: React.ReactNode
}

export interface CardViewModel {
  titleId: string
  title: React.ReactNode
  subtitle: React.ReactNode
  media: React.ReactNode
  actions: React.ReactNode
  frame: FrameProps
}
