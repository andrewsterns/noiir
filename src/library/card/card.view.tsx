import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { CardProps } from './card.interface.ts'
import { useCardViewModel } from './card.viewmodel.ts'

/** A boxed unit of content. With onClick or href the whole card lifts and glows on hover. */
export function Card(props: CardProps): React.ReactNode {
  const vm = useCardViewModel(props)
  return (
    <Frame {...vm.frame}>
      {vm.media}
      {vm.title !== undefined && (
        <Frame flow="column" gap={4}>
          <Frame as="h3" id={vm.titleId} font="title" balance>
            {vm.title}
          </Frame>
          {vm.subtitle !== undefined && (
            <Frame as="p" font="caption" color="dim">
              {vm.subtitle}
            </Frame>
          )}
        </Frame>
      )}
      {props.children}
      {vm.actions !== undefined && (
        <Frame flow="row" gap={8} wrap justify="end" margin={{ top: 4 }}>
          {vm.actions}
        </Frame>
      )}
    </Frame>
  )
}
