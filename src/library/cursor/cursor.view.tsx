import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { CursorProps } from './cursor.interface.ts'
import { useCursorViewModel } from './cursor.viewmodel.ts'

/** A blinking block cursor █. Decorative; stops blinking under reduced motion. */
export function Cursor(props: CursorProps): React.ReactNode {
  return <Frame {...useCursorViewModel(props).frame} />
}
