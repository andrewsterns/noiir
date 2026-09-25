import { useControllable } from '../checkbox/checkbox.viewmodel.ts'
import type { ToggleProps, ToggleViewModel } from './toggle.interface.ts'

export function useToggleViewModel({
  label, checked, defaultChecked = false, onCheckedChange, onText = 'ON', offText = 'OFF', ...props
}: ToggleProps): ToggleViewModel {
  const [on, set] = useControllable(checked, defaultChecked, onCheckedChange)
  return {
    on,
    label,
    onText,
    offText,
    frame: {
      as: 'button',
      role: 'switch',
      'aria-checked': on,
      onClick: () => set(!on),
      flow: 'row',
      inline: true,
      align: 'center',
      gap: 12,
      minH: 32,
      color: 'phosphor',
      textAlign: 'start',
      ...props,
    },
  }
}
