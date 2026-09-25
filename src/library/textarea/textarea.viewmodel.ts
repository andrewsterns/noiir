import { useFieldViewModel } from '../input/input.viewmodel.ts'
import type { TextareaProps, TextareaViewModel } from './textarea.interface.ts'

export function useTextareaViewModel({ minH = 96, ...props }: TextareaProps): TextareaViewModel {
  const vm = useFieldViewModel(props, { as: 'textarea', minH, padding: { y: 10 }, resize: 'vertical' })
  return { ...vm, box: { ...vm.box, align: 'stretch' } }
}
