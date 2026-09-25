import type * as React from 'react'
import { Frame } from './frame.view.tsx'
import type { FrameProps, Slots, VariantMap } from './frame.interface.ts'
import { SLOT_KEYS, STYLE_KEYS } from './keys.ts'
import type { Tag } from '../skills/access/access.interface.ts'

type VariantProps<V extends VariantMap> = { [K in keyof V]?: keyof V[K] & string }

export type DefinedProps<V extends VariantMap> = Omit<FrameProps, keyof V | 'variants' | 'variant'> & VariantProps<V>

export interface DefineInput<V extends VariantMap> {
  /** Element to render (still overridable with `as` at the call site). */
  as?: Tag
  /** Default props. Style and state slots merge with the call site's; other props are plain defaults. */
  base?: Partial<FrameProps>
  /** Variant groups. Each group becomes a prop: `variants: { kind: { primary, ghost } }` → `<X kind="ghost">`. */
  variants?: V
  defaults?: VariantProps<V>
  /** Component name for React DevTools. */
  name?: string
}

/**
 * Make a reusable component from Frame, like a Figma component with variants:
 *
 *   const Chip = defineFrame({
 *     base: { flow: 'row', padding: { x: 8, y: 4 }, border: 1, font: 'label' },
 *     variants: { tone: { plain: {}, hot: { fill: 'phosphor', color: 'on-phosphor' } } },
 *     defaults: { tone: 'plain' },
 *   })
 *   <Chip tone="hot">LIVE</Chip>
 */
export function defineFrame<V extends VariantMap = Record<never, never>>(def: DefineInput<V>): (props: DefinedProps<V>) => React.ReactNode {
  const groups = new Set(Object.keys(def.variants ?? {}))
  const baseSlots: Record<string, unknown> = {}
  const baseAttrs: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(def.base ?? {})) {
    if (STYLE_KEYS.has(k) || SLOT_KEYS.has(k)) baseSlots[k] = v
    else baseAttrs[k] = v
  }
  // Base style goes first so every variant (and then the call site) layers on top of it.
  const variants: VariantMap = { __base: { on: baseSlots as Slots }, ...def.variants }

  function Defined(props: DefinedProps<V>): React.ReactNode {
    const variant: Record<string, string | undefined> = { __base: 'on' }
    const rest: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(props)) {
      if (groups.has(k)) variant[k] = v as string | undefined
      else rest[k] = v
    }
    for (const g of groups) variant[g] ??= (def.defaults as Record<string, string> | undefined)?.[g]
    return <Frame {...(def.as && { as: def.as })} {...baseAttrs} {...rest} variants={variants} variant={variant} />
  }
  if (def.name) Object.defineProperty(Defined, 'name', { value: def.name })
  return Defined
}
