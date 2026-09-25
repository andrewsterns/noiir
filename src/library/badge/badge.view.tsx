import type * as React from 'react'
import { defineFrame } from '../../frame/define.tsx'
import type { BadgeProps } from './badge.interface.ts'
import { useBadgeViewModel } from './badge.viewmodel.ts'

const BadgeFrame = defineFrame({
  base: { flow: 'row', inline: true, align: 'center', gap: 4, padding: { x: 6, y: 1 }, border: 1, radius: 'sm', font: 'label', whitespace: 'nowrap' },
  variants: {
    tone: {
      // Follows the surrounding text color, so it stays visible inside inverted rows.
      default: { border: 'currentColor' },
      solid: { fill: 'phosphor', color: 'on-phosphor', border: 'phosphor' },
      accent: { color: 'accent', border: 'accent' },
      danger: { color: 'danger', border: 'danger' },
    },
  },
  defaults: { tone: 'default' },
  name: 'BadgeFrame',
})

/** A small tag: [NEW] · [BETA] · [3]. */
export function Badge(props: BadgeProps): React.ReactNode {
  return <BadgeFrame {...useBadgeViewModel(props).frame} />
}
