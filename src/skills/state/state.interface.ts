import type { Style } from '../../frame/frame.interface.ts'

/** Semantic states, in cascade order: a later state wins when two set the same property. */
export const STATE_FLAGS = ['selected', 'open', 'empty', 'loading', 'error', 'disabled'] as const
export type StateFlag = (typeof STATE_FLAGS)[number]

export interface StateProps {
  /** Style while hovered (mouse/pen only; compiled to :hover inside @media (hover: hover)). */
  hover?: Style
  /** Style while pressed (:active). */
  press?: Style
  /** Style while focused from the keyboard (:focus-visible). A default phosphor ring applies without it. */
  focus?: Style
  /** Style while anything inside has focus (:focus-within). Use it on a field's box so the ring wraps the input. */
  focusWithin?: Style
  /** Style for each semantic state, applied while its flag is true. */
  states?: Partial<Record<StateFlag, Style>>

  /** Chosen (tab, option, toggle button). Sets aria-selected or aria-pressed where the role allows. */
  selected?: boolean
  /** Expanded (menu, disclosure). Sets aria-expanded on buttons. */
  open?: boolean
  /** Has no content yet. Style an empty state with `states.empty`. */
  empty?: boolean
  /** Busy. Sets aria-busy and blocks click / press / key actions. */
  loading?: boolean
  /** Invalid. Sets aria-invalid on form fields. */
  error?: boolean
  /** Unavailable. Native `disabled` on form elements, otherwise aria-disabled; blocks all actions. */
  disabled?: boolean
}

export const STATE_KEYS = [
  'hover', 'press', 'focus', 'focusWithin', 'states', 'selected', 'open', 'empty', 'loading', 'error', 'disabled',
] as const satisfies readonly (keyof StateProps)[]
