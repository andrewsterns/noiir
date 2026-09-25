import { useEffect, useEffectEvent, useRef, useState } from 'react'
import type * as React from 'react'
import type { FrameProps, Slots, Style } from './frame.interface.ts'
import { SLOT_KEYS, STYLE_KEYS } from './keys.ts'
import { compile } from '../engine/compile.ts'
import type { CompileInput, Compiled } from '../engine/compile.ts'
import { run, prefersReducedMotion } from '../actions/run.ts'
import { on } from '../actions/bus.ts'
import { MOTIONS } from '../skills/motion/motion.interface.ts'
import { matchKey, isTyping, scrollInfo } from '../skills/interact/interact.resolve.ts'
import { stateAttrs, isBlocked } from '../skills/state/state.resolve.ts'
import { accessAttrs, inferTag, VOID_TAGS } from '../skills/access/access.resolve.ts'
import type { Tag } from '../skills/access/access.interface.ts'
import { createTheme, themeVars } from '../tokens/createTheme.ts'
import type { Theme, Tint } from '../tokens/tokens.interface.ts'

export interface FrameViewModel {
  present: boolean
  Tag: Tag
  /** Void elements (input, img …) and textarea render without children. */
  isVoid: boolean
  attrs: Record<string, unknown>
  video: { src: string; opacity?: number } | null
  children: React.ReactNode
}

type AnyHandler = (e: never) => void

interface Instance {
  el: HTMLElement | null
  setRef?: (node: HTMLElement | null) => void
  refFor?: React.Ref<HTMLElement>
  gesture?: { id: number; x0: number; y0: number; dragging: boolean; timer?: ReturnType<typeof setTimeout> }
  raf?: number
  input?: CompileInput
  compiled?: Compiled
}

/** Deep equality for plain style data (objects, arrays, primitives). */
function same(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false
  if ('$typeof' in a || '$typeof' in b) return false // React elements: compare by identity only
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) if (!same(a[i], b[i])) return false
    return true
  }
  const ka = Object.keys(a)
  if (ka.length !== Object.keys(b).length) return false
  for (const k of ka) if (!same((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k])) return false
  return true
}

const tintVars = new Map<Tint, Record<string, string>>()
const objVars = new WeakMap<Theme, Record<string, string>>()
function varsFor(theme: Theme | Tint): Record<string, string> {
  if (typeof theme === 'string') {
    let v = tintVars.get(theme)
    if (!v) tintVars.set(theme, (v = themeVars(createTheme({ tint: theme }))))
    return v
  }
  let v = objVars.get(theme)
  if (!v) objVars.set(theme, (v = themeVars(theme)))
  return v
}

/** Merge style slots: later wins per key; hover/press/focus/states/at merge one level deeper. */
function mergeSlots(a: Slots, b: Slots): Slots {
  const out: Record<string, unknown> = { ...a }
  for (const k in b) {
    const v = (b as Record<string, unknown>)[k]
    if (v === undefined) continue
    const prev = out[k]
    if (k === 'states' || k === 'at') {
      const merged: Record<string, unknown> = { ...(prev as object) }
      for (const [kk, vv] of Object.entries(v as object)) merged[kk] = { ...(merged[kk] as object), ...(vv as object) }
      out[k] = merged
    } else if (SLOT_KEYS.has(k)) out[k] = { ...(prev as object), ...(v as object) }
    else out[k] = v
  }
  return out as Slots
}

const chain =
  (a: unknown, b: AnyHandler | undefined) =>
  (e: never): void => {
    if (typeof a === 'function') (a as AnyHandler)(e)
    b?.(e)
  }

/**
 * Frame's memo comparator: style data compares deeply (inline object literals are new every render),
 * while children, refs and functions compare by identity. Unchanged boxes skip re-rendering.
 */
export function framePropsEqual(a: FrameProps, b: FrameProps): boolean {
  const ka = Object.keys(a)
  if (ka.length !== Object.keys(b).length) return false
  for (const k of ka) {
    const x = (a as Record<string, unknown>)[k]
    const y = (b as Record<string, unknown>)[k]
    if (x === y) continue
    if (k === 'children' || k === 'ref' || typeof x === 'function' || typeof y === 'function' || !same(x, y)) return false
  }
  return true
}

const ACTIVATES_NATIVELY = new Set(['button', 'a', 'input', 'select', 'textarea', 'summary', 'label', 'option'])
const MOD_COMBO = /(^|\+)(mod|ctrl|meta|cmd|alt)\+/i

/**
 * Frame's viewmodel: splits props into style, behavior and attributes; compiles style to atomic
 * classes; infers the element and its ARIA; and wires every event prop to the action runner.
 */
export function useFrameViewModel(props: FrameProps): FrameViewModel {
  const {
    as, children, ref: userRef, variants, variant, theme, unsafe,
    hover, press, focus, focusWithin, states, at, container,
    enter, reveal, exit, show, loop, transition, duration, delay, ease,
    selected, open, empty, loading, error, disabled,
    role, label, labelledBy, describedBy, live, hidden, focusable,
    onClick, onPress, onRelease, onHover, onLeave, onFocus, onBlur, onKey, onHotkey,
    onScroll, onInView, onOutView, onDrag, onLongPress, onAfter, onTrigger,
    ...rest
  } = props

  // ── Style: own props over variants ────────────────────────────────────────
  const own: Record<string, unknown> = { hover, press, focus, focusWithin, states, at }
  const pass: Record<string, unknown> = {}
  for (const k in rest) {
    const v = (rest as Record<string, unknown>)[k]
    if (v === undefined) continue
    if (STYLE_KEYS.has(k)) own[k] = v
    else pass[k] = v
  }
  let slots = own as Slots
  if (variants) {
    let merged: Slots = {}
    for (const group in variants) {
      const pick = variant?.[group]
      const s = pick !== undefined ? variants[group]?.[pick] : undefined
      if (s) merged = mergeSlots(merged, s)
    }
    slots = mergeSlots(merged, slots)
  }
  const { hover: h, press: p, focus: f, focusWithin: fw, states: st, at: atMap, ...base } = slots
  const hasStates = !!(h || p || f || fw || st)
  const motion =
    enter || reveal || loop || transition !== undefined || hasStates
      ? { enter, reveal, loop, transition, duration, delay, ease, hasStates }
      : undefined
  const inst = useRef<Instance>({ el: null })
  const input: CompileInput = {
    base: base as Style,
    at: atMap,
    hover: h,
    press: p,
    focus: f,
    focusWithin: fw,
    states: st,
    motion,
    container,
    srOnly: hidden === 'visually',
  }
  // Most re-renders change children or handlers, not style. A deep-equal check against this
  // frame's previous input is much cheaper than serialising it for the shared cache.
  const memo = inst.current
  const compiled = memo.input && memo.compiled && same(memo.input, input) ? memo.compiled : compile(input)
  memo.input = input
  memo.compiled = compiled

  // ── Element and semantics ─────────────────────────────────────────────────
  const tag = inferTag({ as, href: pass.href as string | undefined, onClick })
  const flags = { selected, open, empty, loading, error, disabled }
  const blocked = isBlocked(flags)

  // ── Refs, presence ────────────────────────────────────────────────────────
  // A new callback only when the caller's ref changes, so React re-attaches exactly then.
  if (!memo.setRef || memo.refFor !== userRef) {
    memo.refFor = userRef
    memo.setRef = (node) => {
      memo.el = node
      if (typeof userRef === 'function') userRef(node)
      else if (userRef) (userRef as React.RefObject<HTMLElement | null>).current = node
    }
  }
  const setRef = memo.setRef
  const [present, setPresent] = useState(show !== false)
  if (show === true && !present) setPresent(true)

  // ── Events ────────────────────────────────────────────────────────────────
  const el = () => memo.el
  const handlers: Record<string, AnyHandler> = {}
  if (onClick) handlers.onClick = (e: React.MouseEvent<HTMLElement>) => !blocked && run(onClick, e, el())
  if (onFocus) handlers.onFocus = (e: React.FocusEvent<HTMLElement>) => run(onFocus, e, el())
  if (onBlur) handlers.onBlur = (e: React.FocusEvent<HTMLElement>) => run(onBlur, e, el())
  if (onHover) handlers.onPointerEnter = (e: React.PointerEvent<HTMLElement>) => run(onHover, e, el())
  if (onLeave) handlers.onPointerLeave = (e: React.PointerEvent<HTMLElement>) => run(onLeave, e, el())

  // Clickable elements that aren't buttons/links still activate from the keyboard.
  const keyActivates = onClick && !ACTIVATES_NATIVELY.has(tag)
  if (onKey || keyActivates) {
    handlers.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (blocked) return
      if (onKey) {
        for (const combo in onKey) {
          if (!matchKey(combo, e)) continue
          e.preventDefault()
          run(onKey[combo], e, el())
          return
        }
      }
      if (keyActivates && e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        e.currentTarget.click()
      }
    }
  }

  if (onPress || onDrag || onLongPress) {
    handlers.onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
      if (blocked) return
      run(onPress, e, el())
      if (!onDrag && !onLongPress) return
      const g: NonNullable<Instance['gesture']> = { id: e.pointerId, x0: e.clientX, y0: e.clientY, dragging: false }
      if (onDrag) e.currentTarget.setPointerCapture?.(e.pointerId)
      if (onLongPress) {
        g.timer = setTimeout(() => {
          g.timer = undefined
          run(onLongPress, e, el())
        }, 500)
      }
      inst.current.gesture = g
    }
    handlers.onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
      const g = inst.current.gesture
      if (!g || g.id !== e.pointerId) return
      const dx = e.clientX - g.x0
      const dy = e.clientY - g.y0
      const far = Math.hypot(dx, dy)
      if (g.timer && far > 8) {
        clearTimeout(g.timer)
        g.timer = undefined
      }
      if (!onDrag) return
      if (!g.dragging && far > 3) {
        g.dragging = true
        run(onDrag, { phase: 'start', dx, dy, x: e.clientX, y: e.clientY }, el())
      } else if (g.dragging) run(onDrag, { phase: 'move', dx, dy, x: e.clientX, y: e.clientY }, el())
    }
    const end = (e: React.PointerEvent<HTMLElement>) => {
      const g = inst.current.gesture
      if (!g || g.id !== e.pointerId) return
      if (g.timer) clearTimeout(g.timer)
      if (g.dragging) run(onDrag, { phase: 'end', dx: e.clientX - g.x0, dy: e.clientY - g.y0, x: e.clientX, y: e.clientY }, el())
      inst.current.gesture = undefined
    }
    handlers.onPointerUp = (e: React.PointerEvent<HTMLElement>) => {
      end(e)
      if (!blocked) run(onRelease, e, el())
    }
    handlers.onPointerCancel = end
  } else if (onRelease) {
    handlers.onPointerUp = (e: React.PointerEvent<HTMLElement>) => !blocked && run(onRelease, e, el())
  }

  if (onScroll) {
    handlers.onScroll = () => {
      if (inst.current.raf) return
      inst.current.raf = requestAnimationFrame(() => {
        inst.current.raf = 0
        const node = el()
        if (node) run(onScroll, scrollInfo(node), node)
      })
    }
  }
  // A pass-through native handler with the same name still runs.
  for (const k in handlers) if (typeof pass[k] === 'function') handlers[k] = chain(pass[k], handlers[k])

  // ── Observers, triggers, hotkeys, timers ──────────────────────────────────
  const fire = useEffectEvent((kind: 'in' | 'out' | 'trigger' | 'hotkey' | 'after', name: string, payload: unknown) => {
    const node = memo.el
    if (kind === 'in') run(onInView, payload as IntersectionObserverEntry, node)
    else if (kind === 'out') run(onOutView, payload as IntersectionObserverEntry, node)
    else if (kind === 'trigger') run(onTrigger?.[name], payload, node)
    else if (kind === 'after') run(onAfter?.do, undefined, node)
    else if (kind === 'hotkey' && onHotkey) {
      const e = payload as KeyboardEvent
      for (const combo in onHotkey) {
        if (!matchKey(combo, e)) continue
        if (isTyping(e.target) && !MOD_COMBO.test(combo)) continue
        e.preventDefault()
        run(onHotkey[combo], e, node)
        return
      }
    }
  })
  const watchIn = !!onInView
  const watchOut = !!onOutView
  const triggers = onTrigger ? Object.keys(onTrigger).join('\n') : ''
  const hotkeys = onHotkey ? Object.keys(onHotkey).join('\n') : ''
  const afterMs = onAfter?.ms

  useEffect(() => {
    const node = memo.el
    const off: (() => void)[] = []
    // Exit: play the motion in reverse, then unmount.
    if (show === false && present) {
      if (!exit || !node || typeof node.animate !== 'function' || prefersReducedMotion()) setPresent(false)
      else {
        const def = MOTIONS[exit]
        const anim = node.animate(def.frames, { duration: duration ?? def.duration, easing: ease ?? def.easing, direction: 'reverse', fill: 'forwards' })
        let done = false
        anim.onfinish = () => {
          done = true
          setPresent(false)
        }
        off.push(() => {
          if (!done) anim.cancel()
        })
      }
    }
    if (node && (reveal || watchIn || watchOut)) {
      if (typeof IntersectionObserver === 'undefined') {
        if (reveal) node.setAttribute('data-inview', '')
      } else {
        const io = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                if (reveal) node.setAttribute('data-inview', '')
                fire('in', '', entry)
                if (reveal && !watchIn && !watchOut) io.disconnect()
              } else fire('out', '', entry)
            }
          },
          { threshold: 0.15 },
        )
        io.observe(node)
        off.push(() => io.disconnect())
      }
    }
    if (triggers) for (const name of triggers.split('\n')) off.push(on(name, (payload) => fire('trigger', name, payload)))
    if (hotkeys) {
      const onKeyDown = (e: KeyboardEvent) => fire('hotkey', '', e)
      window.addEventListener('keydown', onKeyDown)
      off.push(() => window.removeEventListener('keydown', onKeyDown))
    }
    if (afterMs !== undefined && present && show !== false) {
      const t = setTimeout(() => fire('after', '', undefined), afterMs)
      off.push(() => clearTimeout(t))
    }
    return () => off.forEach((fn) => fn())
  }, [show, present, exit, duration, ease, reveal, watchIn, watchOut, triggers, hotkeys, afterMs, memo])

  // ── Attributes ────────────────────────────────────────────────────────────
  const hasChildren = children !== undefined && children !== null && children !== false
  const style =
    compiled.vars || theme || unsafe ? { ...(theme ? varsFor(theme) : undefined), ...compiled.vars, ...unsafe } : undefined

  return {
    present,
    Tag: tag,
    isVoid: VOID_TAGS.has(tag) || tag === 'textarea',
    video: compiled.video,
    children,
    attrs: {
      ...pass,
      ...accessAttrs({
        tag, role, label, labelledBy, describedBy, live, hidden, focusable,
        fill: base.fill, hasChildren,
        tabIndex: pass.tabIndex as number | undefined,
        type: pass.type as string | undefined,
      }),
      ...(keyActivates && pass.tabIndex === undefined && { tabIndex: 0 }),
      ...stateAttrs(flags, tag, role),
      ...handlers,
      ref: setRef,
      className: compiled.className,
      style,
    },
  }
}
