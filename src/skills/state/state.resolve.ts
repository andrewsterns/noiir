import type { Layer } from '../../engine/engine.interface.ts'
import type { StateFlag, StateProps } from './state.interface.ts'

const NOT_DISABLED = ':not(:disabled,[aria-disabled="true"])'

/** The selector suffix and query each state layer compiles to. */
export const STATE_SELECTOR: Partial<Record<Layer, { sel: string; query?: string }>> = {
  selected: { sel: '[data-selected]' },
  open: { sel: '[data-open]' },
  empty: { sel: '[data-empty]' },
  loading: { sel: '[data-loading]' },
  error: { sel: '[data-error]' },
  hover: { sel: `:hover${NOT_DISABLED}`, query: '@media (hover: hover)' },
  within: { sel: ':focus-within' },
  focus: { sel: ':focus-visible' },
  press: { sel: `:active${NOT_DISABLED}` },
  disabled: { sel: ':is(:disabled,[aria-disabled="true"])' },
}

const NATIVE_DISABLE = new Set(['button', 'input', 'select', 'textarea', 'fieldset', 'option', 'optgroup'])
const SELECTABLE_ROLES = new Set(['tab', 'option', 'row', 'gridcell', 'treeitem', 'columnheader', 'rowheader'])
const EXPANDABLE_ROLES = new Set(['button', 'combobox', 'menuitem', 'tab', 'treeitem'])
const FIELDS = new Set(['input', 'textarea', 'select'])
const FIELD_ROLES = new Set(['textbox', 'combobox', 'searchbox', 'spinbutton', 'listbox', 'radiogroup', 'checkbox', 'switch', 'gridcell'])

type Flags = Pick<StateProps, StateFlag>

/**
 * DOM attributes for the semantic state flags. `data-*` drive the state styles;
 * the aria-* ones are only set where the element or role supports them.
 */
export function stateAttrs(f: Flags, tag: string, role: string | undefined): Record<string, unknown> {
  const a: Record<string, unknown> = {}
  for (const k of ['selected', 'open', 'empty', 'loading', 'error'] as const) if (f[k]) a[`data-${k}`] = ''
  if (f.disabled) {
    if (NATIVE_DISABLE.has(tag)) a.disabled = true
    else a['aria-disabled'] = 'true'
  }
  if (f.loading) a['aria-busy'] = 'true'
  if (f.selected !== undefined) {
    if (role && SELECTABLE_ROLES.has(role)) a['aria-selected'] = f.selected ? 'true' : 'false'
    else if (tag === 'button' && !role) a['aria-pressed'] = f.selected ? 'true' : 'false'
  }
  if (f.open !== undefined && (tag === 'button' || (role && EXPANDABLE_ROLES.has(role)))) a['aria-expanded'] = f.open ? 'true' : 'false'
  if (f.error && (FIELDS.has(tag) || (role && FIELD_ROLES.has(role)))) a['aria-invalid'] = 'true'
  return a
}

/** Click, press and key actions are ignored while disabled or loading. */
export const isBlocked = (f: Flags): boolean => !!(f.disabled || f.loading)
