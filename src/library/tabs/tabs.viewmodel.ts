import { useId } from 'react'
import { INVERT } from '../recipes.ts'
import { useControllable } from '../checkbox/checkbox.viewmodel.ts'
import type { TabsProps, TabsViewModel } from './tabs.interface.ts'

/** WAI-ARIA tabs with automatic activation: arrows move and select, Home/End jump. */
export function useTabsViewModel({ items, value, defaultValue, onValueChange, label, ...props }: TabsProps): TabsViewModel {
  const base = useId()
  const [current, set] = useControllable(value, defaultValue ?? items.find((t) => !t.disabled)?.id ?? '', onValueChange)
  const enabled = items.filter((t) => !t.disabled)
  const tabId = (id: string) => `${base}-tab-${id}`
  const panelId = `${base}-panel`
  const active = items.find((t) => t.id === current) ?? enabled[0]

  const move = (delta: number | 'first' | 'last') => {
    if (!enabled.length) return
    const at = enabled.findIndex((t) => t.id === active?.id)
    const next = delta === 'first' ? enabled[0]! : delta === 'last' ? enabled.at(-1)! : enabled[(at + delta + enabled.length) % enabled.length]!
    set(next.id)
    document.getElementById(tabId(next.id))?.focus()
  }

  return {
    tabs: items.map((t) => ({
      id: t.id,
      label: t.label,
      frame: {
        id: tabId(t.id),
        role: 'tab',
        'aria-controls': panelId,
        selected: t.id === active?.id,
        disabled: t.disabled,
        tabIndex: t.id === active?.id ? 0 : -1,
        onClick: () => set(t.id),
        padding: { x: 12, y: 6 },
        font: 'label',
        color: 'dim',
        border: 1,
        radius: { tl: 'md', tr: 'md' },
        margin: { bottom: -1 },
        hover: { color: 'phosphor', glow: 'text' },
        states: { selected: { ...INVERT, border: 'phosphor' } },
      },
    })),
    list: {
      role: 'tablist',
      label,
      flow: 'row',
      gap: 4,
      border: { sides: ['bottom'] },
      scroll: 'x',
      onKey: { ArrowRight: () => move(1), ArrowLeft: () => move(-1), Home: () => move('first'), End: () => move('last') },
    },
    panel: {
      id: panelId,
      role: 'tabpanel',
      ...(active && { labelledBy: tabId(active.id) }),
      tabIndex: 0,
      padding: { y: 16 },
    },
    content: active?.content,
    frame: { flow: 'column', ...props },
  }
}
