import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { ListItemProps, ListItemViewModel, ListProps } from './list.interface.ts'
import { ListContext, useListItemViewModel, useListViewModel } from './list.viewmodel.ts'

/** A list with terminal markers: > item. */
export function List(props: ListProps): React.ReactNode {
  const vm = useListViewModel(props)
  return (
    <ListContext value={vm.context}>
      <Frame {...vm.frame} />
    </ListContext>
  )
}

function Content({ vm, children }: { vm: ListItemViewModel; children: React.ReactNode }): React.ReactNode {
  return (
    <>
      {vm.leading ??
        (vm.marker && (
          <Frame as="span" color="dim" aria-hidden="true" shrink={false}>
            {vm.marker}
          </Frame>
        ))}
      <Frame flow="column" gap={2} grow>
        <Frame as="span">{children}</Frame>
        {vm.description !== undefined && (
          <Frame as="span" font="caption" color="dim">
            {vm.description}
          </Frame>
        )}
      </Frame>
      {vm.trailing}
    </>
  )
}

/** One list row. With onClick or href it becomes a full-width button or link. */
export function ListItem(props: ListItemProps): React.ReactNode {
  const vm = useListItemViewModel(props)
  return (
    <Frame {...vm.item}>
      {vm.interactive ? (
        <Frame {...vm.row}>
          <Content vm={vm}>{props.children}</Content>
        </Frame>
      ) : (
        <Content vm={vm}>{props.children}</Content>
      )}
    </Frame>
  )
}
