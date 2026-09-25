import { use, useEffect, useId } from 'react'
import { ScreenContext } from '../screen/screen.viewmodel.ts'
import type * as React from 'react'
import type { ModalProps, ModalViewModel } from './modal.interface.ts'

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
const WIDTH = { sm: 400, md: 560, lg: 800 } as const

/** Dialog behavior: focus moves in and is trapped, Escape closes, page scroll locks, focus returns on close. */
export function useModalViewModel({ open, onClose, title, actions, size = 'md', dismissable = true, ...props }: ModalProps): ModalViewModel {
  const base = useId()
  const screen = use(ScreenContext)
  const ids = { dialog: `${base}-dialog`, title: `${base}-title` }

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const dialog = document.getElementById(ids.dialog)
    const first = dialog?.querySelector<HTMLElement>(FOCUSABLE)
    ;(first ?? dialog)?.focus()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [open, ids.dialog])

  const trap = (e: React.KeyboardEvent<HTMLElement>) => {
    const nodes = [...(document.getElementById(ids.dialog)?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])]
    if (!nodes.length) return
    const first = nodes[0]!
    const last = nodes.at(-1)!
    const active = document.activeElement
    if (e.shiftKey && (active === first || active === document.getElementById(ids.dialog))) last.focus()
    else if (!e.shiftKey && active === last) first.focus()
    else {
      const at = nodes.indexOf(active as HTMLElement)
      nodes[(at + (e.shiftKey ? -1 : 1) + nodes.length) % nodes.length]!.focus()
    }
  }
  const close = () => dismissable && onClose()

  return {
    container: screen ?? (typeof document === 'undefined' ? null : document.body),
    dismissable,
    title,
    titleId: ids.title,
    actions,
    close,
    backdrop: {
      show: open,
      enter: 'fade',
      exit: 'fade',
      position: 'fixed',
      inset: true,
      z: 100,
      flow: 'grid',
      align: 'center',
      justify: 'center',
      padding: 16,
      fill: { color: 'bg', opacity: 0.82 },
      backdrop: 2,
      onPress: (e: React.PointerEvent<HTMLElement>) => e.target === e.currentTarget && close(),
    },
    dialog: {
      id: ids.dialog,
      role: 'dialog',
      'aria-modal': 'true',
      labelledBy: ids.title,
      tabIndex: -1,
      enter: 'boot',
      w: 'fill',
      maxW: WIDTH[size],
      maxH: '85dvh',
      flow: 'column',
      fill: 'raised',
      border: 'line',
      radius: 'xl',
      clip: true,
      glow: 'box',
      shadow: 'lg',
      outline: 'none',
      onKey: { Escape: close, Tab: trap, 'shift+Tab': trap },
      ...props,
    },
  }
}
