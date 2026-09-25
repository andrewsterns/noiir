import { useId } from 'react'
import { useControllable } from '../checkbox/checkbox.viewmodel.ts'
import type { RadioGroupProps, RadioGroupViewModel } from './radio.interface.ts'

/** WAI-ARIA radio group: one tab stop, arrow keys move and select, Home/End jump. */
export function useRadioGroupViewModel({
  label, options, value, defaultValue, onValueChange, name, direction = 'column', ...props
}: RadioGroupProps): RadioGroupViewModel {
  const base = useId()
  const [current, set] = useControllable(value, defaultValue ?? '', onValueChange)
  const enabled = options.filter((o) => !o.disabled)
  const focusValue = current && enabled.some((o) => o.value === current) ? current : enabled[0]?.value
  const idOf = (v: string) => `${base}-${options.findIndex((o) => o.value === v)}`

  const move = (delta: number | 'first' | 'last') => {
    if (!enabled.length) return
    const at = enabled.findIndex((o) => o.value === focusValue)
    const next =
      delta === 'first' ? enabled[0]! : delta === 'last' ? enabled.at(-1)! : enabled[(at + delta + enabled.length) % enabled.length]!
    set(next.value)
    document.getElementById(idOf(next.value))?.focus()
  }

  return {
    labelId: `${base}-label`,
    label,
    hidden: name && current ? { name, value: current } : null,
    items: options.map((o, i) => ({
      id: `${base}-${i}`,
      value: o.value,
      label: o.label,
      checked: o.value === current,
      disabled: !!o.disabled,
      tabIndex: o.value === focusValue ? 0 : -1,
      select: () => set(o.value),
    })),
    frame: { flow: 'column', gap: 8, ...props },
    list: {
      role: 'radiogroup',
      labelledBy: `${base}-label`,
      flow: direction,
      gap: direction === 'row' ? 16 : 4,
      wrap: direction === 'row',
      onKey: {
        ArrowDown: () => move(1),
        ArrowRight: () => move(1),
        ArrowUp: () => move(-1),
        ArrowLeft: () => move(-1),
        Home: () => move('first'),
        End: () => move('last'),
      },
    },
  }
}
