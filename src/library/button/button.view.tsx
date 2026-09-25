import type * as React from 'react'
import { defineFrame } from '../../frame/define.tsx'
import { TINT } from '../recipes.ts'
import { Glyph } from '../glyph/glyph.view.tsx'
import { Spinner } from '../spinner/spinner.view.tsx'
import type { ButtonProps } from './button.interface.ts'
import { useButtonViewModel } from './button.viewmodel.ts'

const ButtonFrame = defineFrame({
  base: {
    flow: 'row',
    inline: true,
    align: 'center',
    justify: 'center',
    gap: 8,
    font: 'label',
    border: 1,
    radius: 'md',
    whitespace: 'nowrap',
    select: 'none',
    press: { scale: 0.97 },
  },
  variants: {
    kind: {
      primary: { fill: 'phosphor', color: 'on-phosphor', border: 'phosphor', hover: { glow: 'box' } },
      secondary: { color: 'phosphor', border: 'line', hover: { ...TINT, border: 'phosphor', glow: 'box' } },
      ghost: { color: 'phosphor', border: 'transparent', hover: { ...TINT } },
      danger: { color: 'danger', border: 'danger', hover: { fill: 'danger', color: 'on-phosphor' } },
    },
    size: {
      sm: { minH: 32, padding: { x: 12 } },
      md: { minH: 44, padding: { x: 16 } },
      lg: { minH: 52, padding: { x: 20 } },
    },
  },
  defaults: { kind: 'secondary', size: 'md' },
  name: 'ButtonFrame',
})

/** A button (or a link styled as one, with `href`). Actions go on onClick: `onClick={[{ animate: 'pulse' }, vm.save]}`. */
export function Button(props: ButtonProps): React.ReactNode {
  const vm = useButtonViewModel(props)
  return (
    <ButtonFrame {...vm.frame}>
      {vm.leading === 'spinner' ? <Spinner /> : vm.leading && <Glyph name={vm.leading} />}
      {props.children}
      {vm.trailing && <Glyph name={vm.trailing} />}
    </ButtonFrame>
  )
}
