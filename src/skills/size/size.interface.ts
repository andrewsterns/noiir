/**
 * A size. Numbers are px.
 * 'fill' → 100% of the parent · 'hug' → fit the content · 'screen' → the viewport.
 * Any other string passes through ('50%', '20ch', 'min(100%, 640px)').
 */
export type Size = number | 'fill' | 'hug' | 'screen' | (string & {})

export interface SizeStyle {
  w?: Size
  h?: Size
  minW?: Size
  maxW?: Size
  minH?: Size
  maxH?: Size
  /** Aspect ratio: `16 / 9`, `1.5`, or `'4/3'`. */
  aspect?: number | (string & {})
}

export const SIZE_KEYS = ['w', 'h', 'minW', 'maxW', 'minH', 'maxH', 'aspect'] as const satisfies readonly (keyof SizeStyle)[]
