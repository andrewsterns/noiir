import { useFieldViewModel } from '../input/input.viewmodel.ts'
import type { SelectProps, SelectViewModel } from './select.interface.ts'

export function useSelectViewModel({ options, placeholder, ...props }: SelectProps): SelectViewModel {
  const vm = useFieldViewModel(props, { as: 'select', cursor: 'pointer', padding: { left: 12, right: 32 } })
  return {
    ...vm,
    options,
    placeholder,
    // The native select fills the box; the ▼ glyph sits over its right edge.
    box: { ...vm.box, flow: 'stack', align: 'center', padding: 0, cursor: 'pointer' },
  }
}
