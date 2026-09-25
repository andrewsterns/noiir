import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { LoremProps } from './lorem.interface.ts'
import { useLoremViewModel } from './lorem.viewmodel.ts'

/** Placeholder copy: greeked bars (default) or lorem ipsum text. */
export function Lorem(props: LoremProps): React.ReactNode {
  const vm = useLoremViewModel(props)
  if (vm.mode === 'text') return <Frame {...vm.frame}>{vm.text}</Frame>
  return (
    <Frame {...vm.frame}>
      {vm.widths.map((w, i) => (
        <Frame key={i} h={6} w={`${w}%`} fill="faint" radius="full" />
      ))}
    </Frame>
  )
}
