# Select

A native `<select>` in a CRT box with a ▼ glyph. Keyboard support, mobile pickers and screen readers all come for free.

```tsx
<Select label="Baud rate" placeholder="Choose…" value={vm.baud} onValueChange={vm.setBaud}
  options={[{ value: '1200', label: '1200' }, { value: '2400', label: '2400' }]} />
```

| Prop | |
|---|---|
| `options` | `{ value, label, disabled? }[]` |
| `placeholder` | an empty first choice |
| Field props | label, hideLabel, hint, error, value, defaultValue, onValueChange, name, required, disabled |

## UX rules
- Use it for 5 to about 15 options. Fewer than 5 read better as a RadioGroup; many more need search.
- The placeholder is a prompt ("Choose…"), never a real value.
