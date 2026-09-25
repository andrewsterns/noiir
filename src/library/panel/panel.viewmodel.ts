import { useId } from 'react'
import type { PanelProps, PanelViewModel } from './panel.interface.ts'

export function usePanelViewModel({ title, actions, titleFill = 'bg', ...props }: PanelProps): PanelViewModel {
  const titleId = useId()
  return {
    titleId,
    title,
    actions,
    chip: { position: 'absolute', top: -12, flow: 'row', align: 'center', gap: 8, padding: { x: 8 }, fill: titleFill, h: 24 },
    frame: {
      as: 'section',
      labelledBy: titleId,
      position: 'relative',
      flow: 'column',
      gap: 12,
      border: 1,
      radius: 'lg',
      padding: { x: 16, top: 28, bottom: 16 },
      margin: { top: 12 },
      ...props,
    },
  }
}
