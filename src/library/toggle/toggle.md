# Toggle

`Label [ON|OFF]`: a `role="switch"` for settings that apply immediately.

```tsx
<Toggle label="Carrier" checked={vm.carrier} onCheckedChange={vm.setCarrier} />
<Toggle label="Sound" defaultChecked onText="YES" offText="NO" />
```

| Prop | |
|---|---|
| `label` | required |
| `checked` / `defaultChecked` / `onCheckedChange` | |
| `onText` / `offText` | segment labels; default ON / OFF |

## Keyboard
Space or Enter flips it.

## UX rules
- A toggle acts at once. If the change needs a Save, use a Checkbox.
