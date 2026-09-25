import type { Decls, Layer } from '../../engine/engine.interface.ts'
import { BREAKPOINTS } from '../../tokens/tokens.interface.ts'
import type { AtKey } from './respond.interface.ts'

/** Which cascade layer and query each `at` key compiles into. Larger breakpoints sit in later layers, so they win. */
export const AT: Record<AtKey, { layer: Layer; query: string }> = {
  sm: { layer: 'sm', query: `@media (min-width: ${BREAKPOINTS.sm}px)` },
  md: { layer: 'md', query: `@media (min-width: ${BREAKPOINTS.md}px)` },
  lg: { layer: 'lg', query: `@media (min-width: ${BREAKPOINTS.lg}px)` },
  xl: { layer: 'xl', query: `@media (min-width: ${BREAKPOINTS.xl}px)` },
  '@sm': { layer: 'csm', query: `@container (min-width: ${BREAKPOINTS.sm}px)` },
  '@md': { layer: 'cmd', query: `@container (min-width: ${BREAKPOINTS.md}px)` },
  '@lg': { layer: 'clg', query: `@container (min-width: ${BREAKPOINTS.lg}px)` },
  '@xl': { layer: 'cxl', query: `@container (min-width: ${BREAKPOINTS.xl}px)` },
}

export function resolveContainer(c: boolean | string, d: Decls): void {
  if (!c) return
  d['container-type'] = 'inline-size'
  if (typeof c === 'string') d['container-name'] = c
}
