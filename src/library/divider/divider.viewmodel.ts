import type { DividerProps, DividerViewModel } from './divider.interface.ts'

export function useDividerViewModel({ label, vertical, tone = 'line', ...props }: DividerProps): DividerViewModel {
  if (vertical) {
    return { kind: 'vertical', label, tone, frame: { role: 'separator', 'aria-orientation': 'vertical', w: 1, alignSelf: 'stretch', fill: tone, ...props } }
  }
  if (label) {
    return { kind: 'labelled', label, tone, frame: { role: 'separator', label, flow: 'row', align: 'center', gap: 8, w: 'fill', ...props } }
  }
  return { kind: 'plain', label, tone, frame: { as: 'hr', w: 'fill', h: 0, border: { sides: ['top'], paint: tone }, ...props } }
}
