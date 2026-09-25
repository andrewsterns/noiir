import type { MotionToken } from '../skills/motion/motion.interface.ts'

/** A function that receives the event (or trigger payload). Usually comes from a viewmodel. */
export type Handler<P> = (payload: P) => void

/**
 * Presentational actions written as data, so a view can wire them without logic.
 *   { animate: 'pulse' }                  play a motion on this frame (or `target`: an element id)
 *   { emit: 'cart:added', payload }       fire a named trigger; any frame with onTrigger['cart:added'] reacts
 *   { focus: 'search' }                   focus the element with that id
 *   { scrollTo: 'pricing' }               scroll the element with that id into view
 *   { go: '/checkout' }                   navigate (see setNavigate for routers)
 *   { copy: 'text' }                      copy text to the clipboard
 * State changes (toggle, set, fetch) are not data actions: they belong in the viewmodel as functions.
 */
export type DataAction =
  | { animate: MotionToken | Keyframe[]; target?: string; duration?: number; easing?: string }
  | { emit: string; payload?: unknown }
  | { focus: string }
  | { scrollTo: string }
  | { go: string }
  | { copy: string }

export type Action<P = unknown> = Handler<P> | DataAction

/** One action or a list, run in order. Every event prop on Frame takes this. */
export type Actions<P = unknown> = Action<P> | readonly Action<P>[]
