# Table

A real `<table>` with header scopes, a caption, clickable rows, and built-in loading and empty states.

```tsx
<Table
  caption="Grid nodes"
  columns={[
    { key: 'host', header: 'Host' },
    { key: 'status', header: 'Status', render: (n) => <Badge>{n.status}</Badge> },
    { key: 'load', header: 'Load', align: 'end', render: (n) => `${n.load}%` },
  ]}
  rows={vm.nodes}
  rowKey={(n) => n.id}
  loading={vm.loading}
  onRowClick={vm.open}
  isSelected={(n) => n.id === vm.selectedId}
/>
```

| Prop | |
|---|---|
| `columns` | `{ key, header, align?, w?, render? }[]` |
| `rows` / `rowKey` | |
| `caption` | names the table |
| `loading` | three skeleton rows plus aria-busy |
| `empty` | shown when there are no rows; default `-- NO DATA --` |
| `onRowClick` / `isSelected` | clickable rows (Enter/Space too); the selected row inverts |

## UX rules
- Right-align numbers, so digits line up.
- Every table needs a designed empty state that says why it is empty and what to do next.
- Keep the header visible on long tables (wrap them in a scroll frame with a sticky header).
