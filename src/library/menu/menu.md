# Menu

A menu button: a Button that opens a list of actions.

```tsx
<Menu label="Actions" items={[
  { label: 'Rename', glyph: 'grip', onSelect: vm.rename },
  { label: 'Copy host', onSelect: { copy: node.host } },
  { label: 'Delete', glyph: 'close', danger: true, onSelect: vm.confirmDelete },
]} />
```

| Prop | |
|---|---|
| `label` | trigger text |
| `items` | `{ label, onSelect?, glyph?, disabled?, danger? }[]`; `onSelect` takes actions |
| `align` | `start` (default) · `end` |
| `triggerKind` | Button kind of the trigger |

## Keyboard
Enter, Space or ↓ opens it on the first item, and ↑ opens it on the last. Inside, ↑/↓ move and Home/End jump. Enter selects. Escape closes and returns focus to the trigger; Tab closes. A click outside closes it too.

## UX rules
- Menus hold actions, not navigation or settings.
- Put destructive items last and mark them `danger`. Confirm anything irreversible.
