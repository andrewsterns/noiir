import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import { FIELD_LABEL } from '../recipes.ts'
import type { RadioGroupProps } from './radio.interface.ts'
import { useRadioGroupViewModel } from './radio.viewmodel.ts'

/** (•) One choice from a short list. Arrow keys move the selection. */
export function RadioGroup(props: RadioGroupProps): React.ReactNode {
  const vm = useRadioGroupViewModel(props)
  return (
    <Frame {...vm.frame}>
      <Frame id={vm.labelId} {...FIELD_LABEL}>
        {vm.label}
      </Frame>
      <Frame {...vm.list}>
        {vm.items.map((item) => (
          <Frame
            key={item.value}
            id={item.id}
            role="radio"
            aria-checked={item.checked}
            tabIndex={item.tabIndex}
            disabled={item.disabled}
            onClick={item.select}
            flow="row"
            inline
            align="center"
            gap={8}
            minH={32}
            color="phosphor"
            textAlign="start"
            hover={{ glow: 'text' }}
          >
            <Frame as="span" font="code" whitespace="pre" aria-hidden="true">
              {item.checked ? '(•)' : '( )'}
            </Frame>
            <Frame as="span">{item.label}</Frame>
          </Frame>
        ))}
      </Frame>
      {vm.hidden && <Frame as="input" type="hidden" name={vm.hidden.name} value={vm.hidden.value} />}
    </Frame>
  )
}
