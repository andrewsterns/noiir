import type { Style } from '../../frame/frame.interface.ts'
import type { Breakpoint } from '../../tokens/tokens.interface.ts'

/** 'md' → viewport ≥ 768px · '@md' → nearest `container` ancestor ≥ 768px wide. */
export type AtKey = Breakpoint | `@${Breakpoint}`

export interface RespondProps {
  /**
   * Style overrides from a width upward (mobile-first).
   * sm ≥ 480 · md ≥ 768 · lg ≥ 1024 · xl ≥ 1280. Larger breakpoints win.
   */
  at?: Partial<Record<AtKey, Style>>
  /** Make this frame a size container so children can use '@sm' … '@xl'. A string names it. */
  container?: boolean | string
}

export const AT_KEYS = ['sm', 'md', 'lg', 'xl', '@sm', '@md', '@lg', '@xl'] as const satisfies readonly AtKey[]

export const RESPOND_KEYS = ['at', 'container'] as const satisfies readonly (keyof RespondProps)[]
