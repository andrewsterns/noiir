import type { Slots, Style } from '../frame/frame.interface.ts'

// Shared looks for the CRT wireframe library. Pure data: views spread them into Frames.

/** A faint phosphor wash, for hovering rows and ghost buttons. */
export const TINT: Style = { fill: { color: 'phosphor', opacity: 0.08 } }

/** Inverted video: phosphor block with dark text. Selected tabs, rows and menu items. */
export const INVERT: Style = { fill: 'phosphor', color: 'on-phosphor' }

/** The box around an input, select or textarea. The ring shows while the field inside has focus. */
export const FIELD_BOX: Slots = {
  flow: 'row',
  align: 'center',
  gap: 8,
  minH: 44,
  padding: { x: 12 },
  border: 1,
  radius: 'md',
  fill: 'bg',
  hover: { border: 'dim' },
  focusWithin: { border: 'phosphor', glow: 'box' },
  states: { error: { border: 'danger' } },
}

/** The bare field inside FIELD_BOX: the box draws the ring, so the field draws none. */
export const FIELD_INPUT: Style = {
  grow: true,
  w: 'fill',
  minH: 40,
  font: 'body',
  color: 'phosphor',
  caret: 'phosphor',
  outline: 'none',
}

export const FIELD_LABEL: Style = { font: 'label', color: 'dim' }
export const FIELD_HINT: Style = { font: 'caption', color: 'dim' }
export const FIELD_ERROR: Style = { font: 'caption', color: 'danger' }
