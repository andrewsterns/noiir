# RadioGroup

`(•) One choice` from a short list, following the WAI-ARIA radio group pattern.

```tsx
<RadioGroup label="Protocol" value={vm.protocol} onValueChange={vm.setProtocol}
  options={[{ value: 'xmodem', label: 'XMODEM' }, { value: 'kermit', label: 'Kermit' }]} />
<RadioGroup label="Size" direction="row" options={sizes} defaultValue="m" />
```

| Prop | |
|---|---|
| `label` | the question; names the radiogroup |
| `options` | `{ value, label, disabled? }[]` |
| `value` / `defaultValue` / `onValueChange` | |
| `direction` | `column` (default) · `row` |
| `name` | form submission |

## Keyboard
A single tab stop. ↑/← and ↓/→ move and select, skipping disabled options. Home/End jump to the ends.

## UX rules
- 2 to 5 options. Order them logically, not alphabetically.
- Preselect the safest or most common option when there's one.
