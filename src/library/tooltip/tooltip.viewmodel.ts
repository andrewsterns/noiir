import { useEffect, useId, useRef, useState } from 'react'
import type { TooltipProps, TooltipViewModel } from './tooltip.interface.ts'

export function useTooltipViewModel({ content, side = 'top', delay = 400, children: _children, ...props }: TooltipProps): TooltipViewModel {
  const id = useId()
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const clear = () => clearTimeout(timer.current)
  useEffect(() => clear, [])

  const show = (wait: number) => {
    clear()
    timer.current = setTimeout(() => setOpen(true), wait)
  }
  const hide = () => {
    clear()
    setOpen(false)
  }

  return {
    id,
    content,
    wrapper: {
      as: 'span',
      position: 'relative',
      inline: true,
      flow: 'block',
      onHover: () => show(delay),
      onLeave: hide,
      onFocus: () => show(0),
      onBlur: hide,
      onKey: { Escape: hide },
      ...props,
    },
    tip: {
      id,
      role: 'tooltip',
      show: open,
      enter: 'fade',
      exit: 'fade',
      duration: 120,
      position: 'absolute',
      left: '50%',
      x: '-50%',
      ...(side === 'top' ? { bottom: 'calc(100% + 6px)' } : { top: 'calc(100% + 6px)' }),
      z: 60,
      pointerEvents: 'none',
      padding: { x: 8, y: 4 },
      fill: 'raised',
      border: 1,
      radius: 'sm',
      font: 'caption',
      color: 'phosphor',
      whitespace: 'nowrap',
    },
  }
}
