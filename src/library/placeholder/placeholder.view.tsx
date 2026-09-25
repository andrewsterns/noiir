import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { PlaceholderProps } from './placeholder.interface.ts'
import { usePlaceholderViewModel } from './placeholder.viewmodel.ts'

/** The wireframe box for content that isn't there yet: a crossed-out frame labelled IMAGE 4:3. */
export function Placeholder(props: PlaceholderProps): React.ReactNode {
  const vm = usePlaceholderViewModel(props)
  return (
    <Frame {...vm.frame}>
      {vm.caption && (
        <Frame as="span" aria-hidden="true" padding={{ x: 6, y: 2 }} fill="bg" border={1} radius="sm" font="label" color="dim" whitespace="nowrap">
          {vm.caption}
        </Frame>
      )}
    </Frame>
  )
}
