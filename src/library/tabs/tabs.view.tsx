import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import type { TabsProps } from './tabs.interface.ts'
import { useTabsViewModel } from './tabs.viewmodel.ts'

/** [ OVERVIEW ] [ LOGS ] [ CONFIG ]: the selected tab is inverted. */
export function Tabs(props: TabsProps): React.ReactNode {
  const vm = useTabsViewModel(props)
  return (
    <Frame {...vm.frame}>
      <Frame {...vm.list}>
        {vm.tabs.map((t) => (
          <Frame key={t.id} {...t.frame}>
            {t.label}
          </Frame>
        ))}
      </Frame>
      <Frame {...vm.panel}>{vm.content}</Frame>
    </Frame>
  )
}
