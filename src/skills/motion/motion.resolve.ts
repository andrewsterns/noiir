import type { Decls } from '../../engine/engine.interface.ts'
import { LOOPS, MOTIONS } from './motion.interface.ts'
import type { MotionProps } from './motion.interface.ts'

/** Properties that transition smoothly when hover / press / focus / states change. */
export const TRANSITION_PROPS =
  'color, background-color, border-color, outline-color, box-shadow, text-shadow, opacity, translate, scale, rotate, filter'

export interface MotionInput extends Pick<MotionProps, 'enter' | 'reveal' | 'loop' | 'transition' | 'duration' | 'delay' | 'ease'> {
  /** The frame has hover / press / focus / state styles, so it gets a transition by default. */
  hasStates?: boolean
}

/**
 * Motion compiles to CSS inside @media (prefers-reduced-motion: no-preference), so people who ask
 * for less motion get the final state instantly.
 *
 * enter  → plays on mount (fill: backwards, so it never pins the end state over hover styles).
 * reveal → same animation, paused until the viewmodel sets [data-inview].
 */
export function resolveMotion(m: MotionInput, d: Decls): void {
  const anims: string[] = []
  const play: string[] = []
  const once = (token: NonNullable<MotionInput['enter']>, paused: boolean) => {
    const def = MOTIONS[token]
    anims.push(`n-${token} ${m.duration ?? def.duration}ms ${m.ease ?? def.easing} ${m.delay ?? 0}ms backwards`)
    play.push(paused ? 'paused' : 'running')
  }
  if (m.enter) once(m.enter, false)
  if (m.reveal) once(m.reveal, true)
  if (m.loop) {
    const def = LOOPS[m.loop]
    anims.push(`n-loop-${m.loop} ${def.duration}ms ${def.easing} infinite`)
    play.push('running')
  }
  if (anims.length) d['@motion animation'] = anims.join(', ')
  if (m.reveal) {
    d['@motion animation-play-state'] = play.join(', ')
    d['@motion [data-inview] animation-play-state'] = play.map(() => 'running').join(', ')
  }

  const t = m.transition ?? (m.hasStates ? true : undefined)
  if (t) {
    d['@motion transition-property'] = TRANSITION_PROPS
    d['@motion transition-duration'] = `var(--n-m-${t === true ? 'fast' : t})`
    d['@motion transition-timing-function'] = 'var(--n-ease)'
  }
}
