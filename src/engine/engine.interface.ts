/**
 * Types shared by the engine and every skill resolver.
 *
 * A resolver turns props into `Decls`: a map from a declaration key to a CSS value.
 * Keys are a CSS property, optionally prefixed:
 *   'gap'                          → .n123 { gap: … }
 *   '::before background-image'    → .n123::before { … }
 *   '>* grid-area'                 → .n123>* { … }
 *   '[data-inview] animation-play-state'
 *   '@motion animation'            → wrapped in @media (prefers-reduced-motion: no-preference)
 */
export type Decls = Record<string, string>

/** Cascade layers, lowest first. Declared once in the global stylesheet. */
export const LAYERS = [
  'reset',
  'base',
  'sm', 'md', 'lg', 'xl',
  'csm', 'cmd', 'clg', 'cxl',
  'selected', 'open', 'empty', 'loading', 'error',
  'hover', 'within', 'focus', 'press', 'disabled',
] as const
export type Layer = (typeof LAYERS)[number]

export interface ResolveContext {
  layer: Layer
  /** The element's base style, so a state layer can keep the parts of a composite value it doesn't set. */
  base: Record<string, unknown> | undefined
  /** Inline custom properties, for values that vary per element (image URLs, x/y). */
  vars: Record<string, string>
  /** Prefix for var names so state layers don't collide with base (`--n-` or `--n-hover-`). */
  varPrefix: string
  /** Set by resolvers that draw into ::before/::after or overlay a <video>. */
  needsPosition: boolean
  /** A video fill, rendered by the view as an overlay element. */
  video: { src: string; opacity?: number } | null
}
