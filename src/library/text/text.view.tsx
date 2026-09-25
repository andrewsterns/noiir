import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { LinkProps, TextProps } from './text.interface.ts'
import { useLinkViewModel, useTextViewModel } from './text.viewmodel.ts'

/** Text in a theme style. The element follows the style: title → h2, label → span, code → code. */
export function Text(props: TextProps): React.ReactNode {
  const vm = useTextViewModel(props)
  return <Frame {...vm.frame} />
}

/** An underlined phosphor link that glows on hover. */
export function Link(props: LinkProps): React.ReactNode {
  const vm = useLinkViewModel(props)
  return (
    <Frame {...vm.frame}>
      {props.children}
      {props.external && <Frame as="span" hidden="visually"> (opens in a new tab)</Frame>}
    </Frame>
  )
}
