import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { ProgressProps } from './progress.interface.ts'
import { useProgressViewModel } from './progress.viewmodel.ts'

/** A character progress bar: [████████░░░░░░░░░░░░] 40%. Indeterminate when `value` is unknown. */
export function Progress(props: ProgressProps): React.ReactNode {
  const vm = useProgressViewModel(props)
  return (
    <Frame {...vm.frame}>
      <Frame as="span" aria-hidden="true">
        {vm.bar}
      </Frame>
      {vm.percent && (
        <Frame as="span" color="dim" aria-hidden="true">
          {vm.percent}
        </Frame>
      )}
    </Frame>
  )
}
