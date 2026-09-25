import type { Style } from '../frame/frame.interface.ts'
import { resolveStyle } from './style.ts'
import { hash } from './hash.ts'
import { insert } from './sheet.ts'
import type { Decls, Layer, ResolveContext } from './engine.interface.ts'
import { STATE_FLAGS } from '../skills/state/state.interface.ts'
import type { StateFlag } from '../skills/state/state.interface.ts'
import { STATE_SELECTOR } from '../skills/state/state.resolve.ts'
import { AT_KEYS } from '../skills/respond/respond.interface.ts'
import type { AtKey } from '../skills/respond/respond.interface.ts'
import { AT, resolveContainer } from '../skills/respond/respond.resolve.ts'
import { resolveMotion } from '../skills/motion/motion.resolve.ts'
import type { MotionInput } from '../skills/motion/motion.resolve.ts'

export interface CompileInput {
  base: Style
  at?: Partial<Record<AtKey, Style>> | undefined
  hover?: Style | undefined
  press?: Style | undefined
  focus?: Style | undefined
  focusWithin?: Style | undefined
  states?: Partial<Record<StateFlag, Style>> | undefined
  motion?: MotionInput | undefined
  container?: boolean | string | undefined
  /** hidden: 'visually' */
  srOnly?: boolean | undefined
}

export interface Compiled {
  className: string
  /** Inline custom properties (image URLs, x/y). null when there are none. */
  vars: Record<string, string> | null
  video: { src: string; opacity?: number } | null
}

const MOTION_QUERY = '(prefers-reduced-motion: no-preference)'

/** Split a declaration key into its parts: '@motion ::before background' → motion, suffix '::before', prop. */
function parseKey(key: string): { motion: boolean; suffix: string; prop: string } {
  const parts = key.split(' ')
  const prop = parts.pop()!
  const motion = parts[0] === '@motion'
  if (motion) parts.shift()
  return { motion, suffix: parts.join(''), prop }
}

function ruleFor(layer: Layer, cls: string, key: string, value: string, atQuery?: string): string {
  const { motion, suffix, prop } = parseKey(key)
  const state = STATE_SELECTOR[layer]
  let rule = `.${cls}${state?.sel ?? ''}${suffix}{${prop}:${value}}`
  const query = atQuery ?? state?.query
  if (motion) {
    if (query?.startsWith('@media')) rule = `${query} and ${MOTION_QUERY}{${rule}}`
    else {
      rule = `@media ${MOTION_QUERY}{${rule}}`
      if (query) rule = `${query}{${rule}}`
    }
  } else if (query) rule = `${query}{${rule}}`
  return `@layer noiir.${layer}{${rule}}`
}

function emit(classes: string[], layer: Layer, d: Decls, atQuery?: string): void {
  for (const key in d) {
    const value = d[key]!
    if (/[{}]/.test(value)) continue // would break out of the rule
    const cls = 'n' + hash(`${layer}|${key}|${value}`)
    insert(cls, ruleFor(layer, cls, key, value, atQuery))
    classes.push(cls)
  }
}

const cache = new Map<string, Compiled>()
const MAX_CACHE = 5000

/**
 * Compile a frame's styles into atomic class names. Each distinct declaration becomes one rule,
 * inserted once and shared by every frame that uses it. Results are cached by input.
 */
export function compile(input: CompileInput): Compiled {
  const key = JSON.stringify(input)
  const hit = cache.get(key)
  if (hit) return hit

  const classes = ['n']
  const vars: Record<string, string> = {}
  const ctx = (layer: Layer): ResolveContext => ({
    layer,
    base: layer === 'base' ? undefined : (input.base as Record<string, unknown>),
    vars,
    varPrefix: layer === 'base' ? '--n-' : `--n-${layer}-`,
    needsPosition: false,
    video: null,
  })

  const baseCtx = ctx('base')
  const base = resolveStyle(input.base, baseCtx)
  if (input.motion) resolveMotion(input.motion, base)
  if (input.container) resolveContainer(input.container, base)
  if (input.srOnly) classes.push('n-sr')
  if (baseCtx.video) {
    baseCtx.needsPosition = true
    base.isolation = 'isolate'
  }
  if (baseCtx.needsPosition && !('position' in base)) base.position = 'relative'
  emit(classes, 'base', base)

  if (input.at) {
    for (const k of AT_KEYS) {
      const s = input.at[k]
      if (s) emit(classes, AT[k].layer, resolveStyle(s, ctx(AT[k].layer)), AT[k].query)
    }
  }
  for (const f of STATE_FLAGS) {
    const s = input.states?.[f]
    if (s) emit(classes, f, resolveStyle(s, ctx(f)))
  }
  for (const [l, s] of [['hover', input.hover], ['within', input.focusWithin], ['focus', input.focus], ['press', input.press]] as const) {
    if (s) emit(classes, l, resolveStyle(s, ctx(l)))
  }

  const out: Compiled = {
    className: classes.join(' '),
    vars: Object.keys(vars).length ? vars : null,
    video: baseCtx.video,
  }
  if (cache.size >= MAX_CACHE) cache.clear()
  cache.set(key, out)
  return out
}

export const clearCompileCache = (): void => cache.clear()
