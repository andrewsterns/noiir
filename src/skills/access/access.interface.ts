import type * as React from 'react'

export type Tag = keyof React.JSX.IntrinsicElements

export interface AccessProps {
  /**
   * The element to render. Usually inferred: `onClick` → <button type="button">, `href` → <a>,
   * otherwise <div>. Set it for landmarks and semantics: 'main', 'nav', 'article', 'ul', 'li', 'h2' …
   */
  as?: Tag
  role?: React.AriaRole
  /** Accessible name (aria-label). Required on interactive frames without visible text. */
  label?: string
  /** id of the element that names this one (aria-labelledby). */
  labelledBy?: string
  /** id of the element that describes this one (aria-describedby). */
  describedBy?: string
  /** Announce changes to screen readers (aria-live). */
  live?: 'polite' | 'assertive' | 'off'
  /** true removes it for everyone; 'visually' hides it on screen but keeps it for screen readers. */
  hidden?: boolean | 'visually'
  /** Reachable with Tab even though it isn't a button or link (tabIndex 0). */
  focusable?: boolean
}

export const ACCESS_KEYS = [
  'as', 'role', 'label', 'labelledBy', 'describedBy', 'live', 'hidden', 'focusable',
] as const satisfies readonly (keyof AccessProps)[]
