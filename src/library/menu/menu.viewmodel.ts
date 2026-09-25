import { useEffect, useId, useState } from 'react'
import { run } from '../../actions/run.ts'
import { INVERT } from '../recipes.ts'
import type { MenuProps, MenuViewModel } from './menu.interface.ts'

/** WAI-ARIA menu button: arrows move, Home/End jump, Escape closes and returns focus, outside clicks close. */
export function useMenuViewModel({ label, items, align = 'start', triggerKind = 'secondary', ...props }: MenuProps): MenuViewModel {
  const base = useId()
  const ids = { wrap: `${base}-wrap`, trigger: `${base}-trigger`, menu: `${base}-menu`, item: (i: number) => `${base}-item-${i}` }
  const [open, setOpen] = useState(false)
  const [focusFirst, setFocusFirst] = useState<'first' | 'last' | null>(null)
  const enabled = items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i >= 0)

  const focusItem = (i: number | undefined) => i !== undefined && document.getElementById(ids.item(i))?.focus()
  const close = (refocus = true) => {
    setOpen(false)
    if (refocus) document.getElementById(ids.trigger)?.focus()
  }
  const openAt = (where: 'first' | 'last') => {
    setOpen(true)
    setFocusFirst(where)
  }
  const step = (delta: number) => {
    const at = enabled.indexOf(Number(document.activeElement?.id.split('-item-')[1] ?? -1))
    focusItem(enabled[(at + delta + enabled.length) % enabled.length])
  }

  // Focus the first/last item once the menu is on screen.
  useEffect(() => {
    if (!open || !focusFirst) return
    focusItem(focusFirst === 'first' ? enabled[0] : enabled.at(-1))
    setFocusFirst(null)
  })

  // Close on a pointer down anywhere outside.
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!document.getElementById(ids.wrap)?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open, ids.wrap])

  return {
    open,
    label,
    triggerKind,
    frame: { id: ids.wrap, position: 'relative', inline: true, flow: 'block', ...props },
    trigger: {
      id: ids.trigger,
      'aria-haspopup': 'menu',
      'aria-controls': ids.menu,
      open,
      onClick: () => (open ? close(false) : openAt('first')),
      onKey: { ArrowDown: () => openAt('first'), ArrowUp: () => openAt('last') },
    },
    menu: {
      id: ids.menu,
      role: 'menu',
      labelledBy: ids.trigger,
      show: open,
      enter: 'fade-down',
      exit: 'fade-down',
      duration: 140,
      position: 'absolute',
      top: 'calc(100% + 4px)',
      ...(align === 'end' ? { right: 0 } : { left: 0 }),
      z: 50,
      minW: 200,
      flow: 'column',
      padding: 4,
      fill: 'raised',
      border: 'line',
      radius: 'md',
      shadow: 'md',
      onKey: {
        ArrowDown: () => step(1),
        ArrowUp: () => step(-1),
        Home: () => focusItem(enabled[0]),
        End: () => focusItem(enabled.at(-1)),
        Escape: () => close(),
        Tab: () => close(false),
      },
    },
    items: items.map((it, i) => ({
      key: i,
      label: it.label,
      glyph: it.glyph,
      frame: {
        id: ids.item(i),
        role: 'menuitem',
        tabIndex: -1,
        disabled: it.disabled,
        onClick: () => {
          close()
          run(it.onSelect, undefined, null)
        },
        flow: 'row',
        align: 'center',
        gap: 8,
        minH: 36,
        padding: { x: 10 },
        radius: 'sm',
        textAlign: 'start',
        color: it.danger ? 'danger' : 'phosphor',
        hover: it.danger ? { fill: 'danger', color: 'on-phosphor' } : INVERT,
        focus: it.danger ? { fill: 'danger', color: 'on-phosphor', outline: 'none' } : { ...INVERT, outline: 'none' },
      },
    })),
  }
}
