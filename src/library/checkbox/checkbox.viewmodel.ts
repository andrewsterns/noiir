import { useState } from 'react'
import type { CheckboxProps, CheckboxViewModel } from './checkbox.interface.ts'

/** Controlled when `checked` is passed, otherwise keeps its own state. */
export function useControllable<T>(value: T | undefined, initial: T, onChange?: (v: T) => void): [T, (v: T) => void] {
  const [own, setOwn] = useState(initial)
  const current = value !== undefined ? value : own
  return [
    current,
    (v: T) => {
      if (value === undefined) setOwn(v)
      onChange?.(v)
    },
  ]
}

export function useCheckboxViewModel({
  label, checked, defaultChecked = false, indeterminate = false, onCheckedChange, name, value = 'on', ...props
}: CheckboxProps): CheckboxViewModel {
  const [on, set] = useControllable(checked, defaultChecked, onCheckedChange)
  return {
    mark: indeterminate ? '[-]' : on ? '[x]' : '[ ]',
    label,
    hidden: name && on ? { name, value } : null,
    frame: {
      as: 'button',
      role: 'checkbox',
      'aria-checked': indeterminate ? 'mixed' : on,
      onClick: () => set(indeterminate ? true : !on),
      flow: 'row',
      inline: true,
      align: 'center',
      gap: 8,
      minH: 32,
      color: 'phosphor',
      textAlign: 'start',
      hover: { glow: 'text' },
      ...props,
    },
  }
}
