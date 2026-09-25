import { useEffect, useRef, useState } from 'react'
import type * as React from 'react'
import { emit } from '../../actions/bus.ts'
import { TOAST_LOOK, TOAST_TRIGGER } from './toast.interface.ts'
import type { ToasterProps, ToasterViewModel, ToastItem, ToastOptions } from './toast.interface.ts'

let nextId = 1

/** Show a toast from anywhere (a viewmodel, an effect). Needs one <Toaster /> mounted. */
export function toast(message: React.ReactNode, { kind = 'info', duration }: ToastOptions = {}): void {
  emit(TOAST_TRIGGER, { id: nextId++, message, kind, duration: duration ?? (kind === 'error' ? 8000 : 4000), closing: false } satisfies ToastItem)
}

export function useToasterViewModel(props: ToasterProps): ToasterViewModel {
  const [items, setItems] = useState<ToastItem[]>([])
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>())
  useEffect(() => {
    const set = timers.current
    return () => set.forEach(clearTimeout)
  }, [])

  const dismiss = (id: number) => {
    setItems((list) => list.map((t) => (t.id === id ? { ...t, closing: true } : t)))
    // Drop it once the exit motion has had time to run.
    const t = setTimeout(() => {
      timers.current.delete(t)
      setItems((list) => list.filter((x) => x.id !== id))
    }, 400)
    timers.current.add(t)
  }

  return {
    frame: {
      role: 'region',
      label: 'Notifications',
      onTrigger: { [TOAST_TRIGGER]: (t) => setItems((list) => [...list, t as ToastItem].slice(-5)) },
      position: 'fixed',
      bottom: 16,
      right: 16,
      z: 200,
      flow: 'column',
      gap: 8,
      w: 340,
      maxW: 'calc(100vw - 32px)',
      pointerEvents: 'none',
      ...props,
    },
    toasts: items.map((item) => ({
      item,
      glyph: TOAST_LOOK[item.kind].glyph,
      dismiss: () => dismiss(item.id),
      frame: {
        role: item.kind === 'error' ? 'alert' : 'status',
        show: !item.closing,
        enter: 'fade-up',
        exit: 'fade-up',
        onAfter: { ms: item.duration, do: () => dismiss(item.id) },
        flow: 'row',
        align: 'center',
        gap: 10,
        padding: { left: 12, right: 4, y: 4 },
        minH: 48,
        fill: 'raised',
        radius: 'md',
        border: TOAST_LOOK[item.kind].color,
        color: TOAST_LOOK[item.kind].color,
        glow: 'box',
        pointerEvents: 'auto',
      },
    })),
  }
}
