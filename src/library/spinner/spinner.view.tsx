import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { SpinnerProps } from './spinner.interface.ts'
import { useSpinnerViewModel } from './spinner.viewmodel.ts'

/** A terminal spinner: | / - \ . Holds still under reduced motion. */
export function Spinner(props: SpinnerProps): React.ReactNode {
  const vm = useSpinnerViewModel(props)
  return <Frame {...vm.frame}>{vm.char}</Frame>
}
