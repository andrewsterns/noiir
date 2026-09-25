/** One-shot motions: `enter`, `reveal`, `exit` and `{ animate }` actions. */
export const MOTION_ONCE = ['fade', 'fade-up', 'fade-down', 'scale', 'boot', 'type-on', 'pulse', 'shake', 'flash'] as const
export type MotionToken = (typeof MOTION_ONCE)[number]

/** Looping motions for `loop`. */
export const MOTION_LOOP = ['blink', 'flicker', 'pulse', 'spin'] as const
export type LoopToken = (typeof MOTION_LOOP)[number]

export interface MotionDef {
  /** Keyframes in Web Animations format; also compiled to CSS @keyframes. First frame is 0%, last is 100%. */
  frames: Keyframe[]
  duration: number
  easing: string
}

export interface MotionProps {
  /** Plays once when the frame mounts. */
  enter?: MotionToken
  /** Plays once, the first time the frame scrolls into view. */
  reveal?: MotionToken
  /** Plays in reverse before the frame unmounts, when `show` turns false. */
  exit?: MotionToken
  /** Mount (`true`) or unmount (`false`) the frame, running `enter` / `exit`. */
  show?: boolean
  /** Loops forever. Stops under reduced motion. */
  loop?: LoopToken
  /**
   * Smoothly animate hover / press / focus / state changes. On by default whenever those props are set.
   * 'fast' | 'base' | 'slow' pick a theme duration; false turns it off.
   */
  transition?: boolean | 'fast' | 'base' | 'slow'
  /** Override the enter / reveal / exit duration, ms. */
  duration?: number
  /** Delay before enter / reveal, ms. Use it to stagger lists. */
  delay?: number
  /** Override the enter / reveal / exit easing (any CSS easing). */
  ease?: string
}

export const MOTION_KEYS = [
  'enter', 'reveal', 'exit', 'show', 'loop', 'transition', 'duration', 'delay', 'ease',
] as const satisfies readonly (keyof MotionProps)[]

// Transforms use `transform`, so they compose with the x / y / scale / rotate props (which use the
// individual translate / scale / rotate properties) instead of overwriting them.
export const MOTIONS: Record<MotionToken, MotionDef> = {
  fade: { frames: [{ opacity: 0 }, { opacity: 1 }], duration: 200, easing: 'ease-out' },
  'fade-up': {
    frames: [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
    duration: 240,
    easing: 'cubic-bezier(.2,.8,.2,1)',
  },
  'fade-down': {
    frames: [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'none' }],
    duration: 240,
    easing: 'cubic-bezier(.2,.8,.2,1)',
  },
  scale: {
    frames: [{ opacity: 0, transform: 'scale(.96)' }, { opacity: 1, transform: 'none' }],
    duration: 200,
    easing: 'cubic-bezier(.2,.8,.2,1)',
  },
  // CRT power-on: a bright horizontal line that opens into the picture.
  boot: {
    frames: [
      { opacity: 0, transform: 'scale(.6, .004)', filter: 'brightness(4)' },
      { offset: 0.45, opacity: 1, transform: 'scale(1, .004)', filter: 'brightness(4)' },
      { offset: 0.75, transform: 'scale(1, 1)', filter: 'brightness(1.6)' },
      { opacity: 1, transform: 'none', filter: 'none' },
    ],
    duration: 480,
    easing: 'ease-out',
  },
  'type-on': {
    frames: [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }],
    duration: 700,
    easing: 'steps(24, end)',
  },
  pulse: {
    frames: [
      { transform: 'scale(1)' },
      { offset: 0.4, transform: 'scale(1.04)', filter: 'brightness(1.5)' },
      { transform: 'scale(1)', filter: 'none' },
    ],
    duration: 300,
    easing: 'ease-in-out',
  },
  shake: {
    frames: [
      { transform: 'translateX(0)' },
      { offset: 0.2, transform: 'translateX(-4px)' },
      { offset: 0.4, transform: 'translateX(4px)' },
      { offset: 0.6, transform: 'translateX(-3px)' },
      { offset: 0.8, transform: 'translateX(3px)' },
      { transform: 'translateX(0)' },
    ],
    duration: 360,
    easing: 'ease-in-out',
  },
  flash: { frames: [{ filter: 'brightness(2.2)' }, { filter: 'none' }], duration: 240, easing: 'ease-out' },
}

export const LOOPS: Record<LoopToken, MotionDef> = {
  blink: { frames: [{ opacity: 1 }, { offset: 0.5, opacity: 0 }, { opacity: 0 }], duration: 1000, easing: 'steps(1, end)' },
  flicker: {
    frames: [
      { opacity: 1 },
      { offset: 0.92, opacity: 1 },
      { offset: 0.93, opacity: 0.82 },
      { offset: 0.95, opacity: 1 },
      { offset: 0.97, opacity: 0.9 },
      { opacity: 1 },
    ],
    duration: 4000,
    easing: 'linear',
  },
  pulse: { frames: [{ opacity: 1 }, { offset: 0.5, opacity: 0.55 }, { opacity: 1 }], duration: 1600, easing: 'ease-in-out' },
  spin: { frames: [{ transform: 'rotate(0turn)' }, { transform: 'rotate(1turn)' }], duration: 1000, easing: 'linear' },
}
