import type * as React from 'react'
import { Frame } from '../../frame/frame.view.tsx'
import { Lorem } from '../lorem/lorem.view.tsx'
import type { TableProps } from './table.interface.ts'
import { useTableViewModel } from './table.viewmodel.ts'

/** A data table with a loading skeleton and an empty state built in. */
export function Table<T>(props: TableProps<T>): React.ReactNode {
  const vm = useTableViewModel(props)
  return (
    <Frame {...vm.frame}>
      {vm.caption && (
        <Frame as="caption" font="caption" color="dim" textAlign="start" padding={{ bottom: 8 }}>
          {vm.caption}
        </Frame>
      )}
      <Frame as="thead">
        <Frame as="tr">
          {vm.headers.map((h) => (
            <Frame key={h.key} {...h.frame}>
              {h.header}
            </Frame>
          ))}
        </Frame>
      </Frame>
      <Frame as="tbody">
        {vm.state === 'rows' &&
          vm.rows.map((r) => (
            <Frame key={r.key} {...r.frame}>
              {r.cells.map((c, i) => (
                <Frame key={i} {...vm.cell(i)}>
                  {c}
                </Frame>
              ))}
            </Frame>
          ))}
        {vm.state === 'loading' &&
          [0, 1, 2].map((r) => (
            <Frame as="tr" key={r}>
              {vm.headers.map((h, i) => (
                <Frame key={h.key} {...vm.cell(i)}>
                  <Lorem lines={1} seed={r + i} />
                </Frame>
              ))}
            </Frame>
          ))}
        {vm.state === 'empty' && (
          <Frame as="tr">
            <Frame as="td" colSpan={vm.span} padding={24} textAlign="center" color="dim" font="label">
              {vm.empty}
            </Frame>
          </Frame>
        )}
      </Frame>
    </Frame>
  )
}
