import type * as React from 'react'
import type { Actions } from '../../actions/actions.interface.ts'

export interface ScrollInfo {
  x: number
  y: number
  /** 0–1 through the scrollable range. */
  progressX: number
  progressY: number
}

export interface DragInfo {
  phase: 'start' | 'move' | 'end'
  /** Movement since the drag started, px. */
  dx: number
  dy: number
  /** Pointer position in the viewport, px. */
  x: number
  y: number
}

/**
 * Key combos → actions. Combos are case-insensitive: 'Enter', 'Escape', 'ArrowDown', 'Space',
 * 'mod+k' (⌘ on Mac, Ctrl elsewhere), 'shift+Tab', 'alt+ArrowUp'.
 */
export type KeyMap<E> = Record<string, Actions<E>>

export interface InteractProps {
  onClick?: Actions<React.MouseEvent<HTMLElement>>
  /** Pointer goes down (mouse, touch or pen). */
  onPress?: Actions<React.PointerEvent<HTMLElement>>
  /** Pointer comes back up. */
  onRelease?: Actions<React.PointerEvent<HTMLElement>>
  /** Pointer enters. For hover *styles*, use the `hover` prop instead: it needs no JavaScript. */
  onHover?: Actions<React.PointerEvent<HTMLElement>>
  /** Pointer leaves. */
  onLeave?: Actions<React.PointerEvent<HTMLElement>>
  onFocus?: Actions<React.FocusEvent<HTMLElement>>
  onBlur?: Actions<React.FocusEvent<HTMLElement>>
  /** Keys pressed while this frame (or something inside it) has focus. Matched keys call preventDefault. */
  onKey?: KeyMap<React.KeyboardEvent<HTMLElement>>
  /** Keys pressed anywhere while this frame is mounted. Ignored while typing in a field unless the combo has a modifier. */
  onHotkey?: KeyMap<KeyboardEvent>
  /** This frame scrolled (pair with `scroll`). Throttled to one call per animation frame. */
  onScroll?: Actions<ScrollInfo>
  /** The frame scrolled into view. */
  onInView?: Actions<IntersectionObserverEntry>
  /** The frame scrolled out of view. */
  onOutView?: Actions<IntersectionObserverEntry>
  /** Pointer drag with capture: start, move, end. */
  onDrag?: Actions<DragInfo>
  /** Held for 500ms without moving. */
  onLongPress?: Actions<React.PointerEvent<HTMLElement>>
  /** Run once, `ms` after mount. */
  onAfter?: { ms: number; do: Actions<undefined> }
  /** React to named triggers fired with `emit()` or `{ emit: 'name' }`. */
  onTrigger?: Record<string, Actions<unknown>>
}

export interface InteractStyle {
  cursor?: 'auto' | 'default' | 'pointer' | 'text' | 'move' | 'grab' | 'grabbing' | 'not-allowed' | 'progress' | 'crosshair' | (string & {})
  /** Whether text can be selected. */
  select?: 'none' | 'text' | 'all' | 'auto'
  /** 'none' lets clicks pass through to what is underneath. */
  pointerEvents?: 'none' | 'auto'
  /** Let the user resize the frame (textareas, panels). */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

export const INTERACT_STYLE_KEYS = ['cursor', 'select', 'pointerEvents', 'resize'] as const satisfies readonly (keyof InteractStyle)[]

export const INTERACT_KEYS = [
  'onClick', 'onPress', 'onRelease', 'onHover', 'onLeave', 'onFocus', 'onBlur', 'onKey', 'onHotkey',
  'onScroll', 'onInView', 'onOutView', 'onDrag', 'onLongPress', 'onAfter', 'onTrigger',
] as const satisfies readonly (keyof InteractProps)[]
