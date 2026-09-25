import type { Decls } from '../../engine/engine.interface.ts'
import type { InteractStyle, ScrollInfo } from './interact.interface.ts'

export function resolveInteract(s: InteractStyle, d: Decls): void {
  if (s.cursor) d.cursor = s.cursor
  if (s.select) {
    d['user-select'] = s.select
    d['-webkit-user-select'] = s.select
  }
  if (s.pointerEvents) d['pointer-events'] = s.pointerEvents
  if (s.resize) d.resize = s.resize
}

const isMac = () => typeof navigator !== 'undefined' && /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent)

const ALIASES: Record<string, string> = { space: ' ', esc: 'escape', del: 'delete', up: 'arrowup', down: 'arrowdown', left: 'arrowleft', right: 'arrowright' }

export interface KeyLike {
  key: string
  ctrlKey: boolean
  metaKey: boolean
  altKey: boolean
  shiftKey: boolean
}

/** Does a keyboard event match a combo like 'mod+k', 'shift+Tab', 'Escape', 'Space'? */
export function matchKey(combo: string, e: KeyLike): boolean {
  const parts = combo.toLowerCase().split('+')
  let key = parts.pop() ?? ''
  if (key === '' && combo.endsWith('+')) key = '+'
  key = ALIASES[key] ?? key
  const mods = new Set(parts)
  const mac = isMac()
  const wantCtrl = mods.has('ctrl') || (mods.has('mod') && !mac)
  const wantMeta = mods.has('meta') || mods.has('cmd') || (mods.has('mod') && mac)
  if (e.ctrlKey !== wantCtrl || e.metaKey !== wantMeta || e.altKey !== mods.has('alt')) return false
  // Shift is part of printable symbols ('?' needs shift), so only enforce it for letters and named keys.
  const printableSymbol = key.length === 1 && !/[a-z0-9 ]/.test(key)
  if (!printableSymbol && e.shiftKey !== mods.has('shift')) return false
  return e.key.toLowerCase() === key
}

/** True when the keyboard is busy typing into a field. */
export function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null
  if (!el || !el.tagName) return false
  return el.isContentEditable || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT'
}

export function scrollInfo(el: HTMLElement): ScrollInfo {
  const maxX = el.scrollWidth - el.clientWidth
  const maxY = el.scrollHeight - el.clientHeight
  return {
    x: el.scrollLeft,
    y: el.scrollTop,
    progressX: maxX > 0 ? el.scrollLeft / maxX : 0,
    progressY: maxY > 0 ? el.scrollTop / maxY : 0,
  }
}
