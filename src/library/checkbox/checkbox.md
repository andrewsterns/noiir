# Checkbox

`[x] Label`: a `role="checkbox"` button.

```tsx
<Checkbox label="Enable scanlines" checked={vm.on} onCheckedChange={vm.setOn} />
<Checkbox label="Select all" indeterminate={vm.some} checked={vm.all} onCheckedChange={vm.toggleAll} />
<Checkbox label="Subscribe" name="subscribe" value="yes" defaultChecked />   // posts with a form
```

| Prop | |
|---|---|
| `label` | required |
| `checked` / `defaultChecked` / `onCheckedChange(checked)` | controlled or uncontrolled |
| `indeterminate` | `[-]`, aria-checked="mixed" |
| `name` / `value` | form submission (a hidden input while checked) |

## Keyboard
Space or Enter toggles.

## UX rules
- The label is a statement that is true when checked ("Email me updates").
- Use a Toggle for settings that take effect immediately, and a Checkbox for choices submitted later.
