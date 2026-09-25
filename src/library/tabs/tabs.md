# Tabs

`[ OVERVIEW ] [ LOGS ]`: WAI-ARIA tabs with automatic activation. The selected tab is inverted.

```tsx
<Tabs label="Node views" items={[
  { id: 'overview', label: 'Overview', content: <Overview /> },
  { id: 'logs', label: 'Logs', content: <Logs /> },
  { id: 'config', label: 'Config', content: <Config />, disabled: !vm.canEdit },
]} />
```

| Prop | |
|---|---|
| `items` | `{ id, label, content, disabled? }[]` |
| `value` / `defaultValue` / `onValueChange(id)` | |
| `label` | names the tab list |

## Keyboard
The tab list is one tab stop. ← → move and select, Home/End jump, and Tab goes into the panel.

## UX rules
- Tabs switch views of the same thing. For steps in a sequence, use a stepper; for navigation, use links.
- Keep labels to one or two words.
