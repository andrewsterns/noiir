import { MOTIONS } from '../skills/motion/motion.interface.ts'
import type { Action, Actions, DataAction } from './actions.interface.ts'
import { emit } from './bus.ts'

let navigate = (href: string): void => {
  if (typeof window === 'undefined') return
  if (href.startsWith('#')) window.location.hash = href
  else window.location.assign(href)
}

/** Route `{ go }` actions through your router: `setNavigate((href) => router.push(href))`. */
export function setNavigate(fn: (href: string) => void): void {
  navigate = fn
}

/** True when the user asked the OS for less motion. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const byId = (id: string): HTMLElement | null => (typeof document === 'undefined' ? null : document.getElementById(id))

function runData(a: DataAction, el: HTMLElement | null): void {
  if ('animate' in a) {
    const target = a.target ? byId(a.target) : el
    if (!target || typeof target.animate !== 'function' || prefersReducedMotion()) return
    const def = typeof a.animate === 'string' ? MOTIONS[a.animate] : undefined
    target.animate(def ? def.frames : (a.animate as Keyframe[]), {
      duration: a.duration ?? def?.duration ?? 240,
      easing: a.easing ?? def?.easing ?? 'ease-out',
    })
  } else if ('emit' in a) emit(a.emit, a.payload)
  else if ('focus' in a) byId(a.focus)?.focus()
  else if ('scrollTo' in a) byId(a.scrollTo)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  else if ('go' in a) navigate(a.go)
  else if ('copy' in a) void navigator.clipboard?.writeText(a.copy)
}

/** Run one action or a list, in order. Functions get the payload; data actions get the frame's element. */
export function run<P>(actions: Actions<P> | undefined, payload: P, el: HTMLElement | null): void {
  if (!actions) return
  const list: readonly Action<P>[] = Array.isArray(actions) ? actions : [actions as Action<P>]
  for (const a of list) {
    if (typeof a === 'function') a(payload)
    else runData(a, el)
  }
}
