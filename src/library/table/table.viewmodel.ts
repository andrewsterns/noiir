import { INVERT, TINT } from '../recipes.ts'
import type { FrameProps } from '../../frame/frame.interface.ts'
import type { TableProps, TableViewModel } from './table.interface.ts'

export function useTableViewModel<T>({
  columns, rows, rowKey, caption, empty, onRowClick, isSelected, loading, ...props
}: TableProps<T>): TableViewModel {
  const cell = (i: number): FrameProps => {
    const c = columns[i]
    return { as: 'td', padding: { x: 12, y: 8 }, textAlign: c?.align ?? 'start', border: { sides: ['bottom'], paint: 'faint' } }
  }
  return {
    caption,
    span: columns.length,
    empty: empty ?? '-- NO DATA --',
    state: loading ? 'loading' : rows.length === 0 ? 'empty' : 'rows',
    cell,
    headers: columns.map((c) => ({
      key: c.key,
      header: c.header,
      frame: {
        as: 'th',
        scope: 'col',
        padding: { x: 12, y: 8 },
        textAlign: c.align ?? 'start',
        font: 'label',
        color: 'dim',
        border: { sides: ['bottom'] },
        ...(c.w !== undefined && { w: c.w }),
      },
    })),
    rows: rows.map((row, i) => ({
      key: rowKey ? rowKey(row, i) : String(i),
      cells: columns.map((c) => (c.render ? c.render(row, i) : String((row as Record<string, unknown>)[c.key] ?? ''))),
      frame: {
        as: 'tr',
        ...(onRowClick && { onClick: () => onRowClick(row), cursor: 'pointer', hover: TINT }),
        ...(isSelected && { selected: isSelected(row), states: { selected: INVERT } }),
      },
    })),
    frame: { as: 'table', w: 'fill', font: 'body', loading, ...props },
  }
}
