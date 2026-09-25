import { createContext, use } from 'react'
import { INVERT, TINT } from '../recipes.ts'
import { LIST_MARKERS } from './list.interface.ts'
import type { ListContextValue, ListItemProps, ListItemViewModel, ListProps, ListViewModel } from './list.interface.ts'

export const ListContext = createContext<ListContextValue>({ marker: 'prompt', divided: false })

export function useListViewModel({ marker = 'prompt', divided = false, ...props }: ListProps): ListViewModel {
  return {
    context: { marker, divided },
    frame: { as: 'ul', flow: 'column', gap: divided ? 0 : 2, ...props },
  }
}

export function useListItemViewModel({
  leading, trailing, description, onClick, href, selected, disabled, children: _children, ...props
}: ListItemProps): ListItemViewModel {
  const { marker, divided } = use(ListContext)
  const interactive = onClick !== undefined || href !== undefined
  const row = {
    flow: 'row',
    align: 'center',
    gap: 8,
    padding: { x: 8, y: 8 },
    w: 'fill',
    textAlign: 'start',
  } as const
  return {
    interactive,
    marker: LIST_MARKERS[marker],
    leading,
    trailing,
    description,
    item: {
      as: 'li',
      ...(divided && { border: { sides: ['bottom'], paint: 'faint' } }),
      ...(!interactive && { ...row, selected, disabled, states: { selected: INVERT } }),
      ...props,
    },
    row: interactive
      ? { ...row, onClick, href, selected, disabled, hover: TINT, states: { selected: INVERT } }
      : {},
  }
}
