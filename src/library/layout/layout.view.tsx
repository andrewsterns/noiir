import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { GridProps, RowProps, SpacerProps, StackProps } from './layout.interface.ts'
import { useGridViewModel, useRowViewModel, useSpacerViewModel, useStackViewModel } from './layout.viewmodel.ts'

export function Stack(props: StackProps): React.ReactNode {
  return <Frame {...useStackViewModel(props).frame} />
}

export function Row(props: RowProps): React.ReactNode {
  return <Frame {...useRowViewModel(props).frame} />
}

export function Grid(props: GridProps): React.ReactNode {
  return <Frame {...useGridViewModel(props).frame} />
}

export function Spacer(props: SpacerProps): React.ReactNode {
  return <Frame {...useSpacerViewModel(props).frame} />
}
