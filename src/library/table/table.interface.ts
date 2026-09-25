import type * as React from 'react'
import type { FrameProps } from '../../frame/frame.interface.ts'
import type { Size } from '../../skills/size/size.interface.ts'

export interface Column<T> {
  key: string
  header: React.ReactNode
  align?: 'start' | 'center' | 'end'
  w?: Size
  /** Custom cell. Without it the cell shows `String(row[key])`. */
  render?: (row: T, index: number) => React.ReactNode
}

export interface TableProps<T> extends Omit<FrameProps, 'children' | 'rows' | 'onClick' | 'empty'> {
  columns: readonly Column<T>[]
  rows: readonly T[]
  rowKey?: (row: T, index: number) => string
  /** Describes the table for screen readers (shown above it). */
  caption?: string
  /** Shown when there are no rows. Default "-- NO DATA --". */
  empty?: React.ReactNode
  /** Clickable rows (keyboard too). */
  onRowClick?: (row: T) => void
  isSelected?: (row: T) => boolean
}

export interface TableRow {
  key: string
  cells: React.ReactNode[]
  frame: FrameProps
}

export interface TableViewModel {
  caption: string | undefined
  headers: { key: string; header: React.ReactNode; frame: FrameProps }[]
  cell: (i: number) => FrameProps
  rows: TableRow[]
  state: 'loading' | 'empty' | 'rows'
  empty: React.ReactNode
  span: number
  frame: FrameProps
}
