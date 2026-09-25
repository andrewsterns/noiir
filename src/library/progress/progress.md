# Progress

A character bar: `[████████░░░░░░░░░░░░] 40%`. Indeterminate (a sweeping block) when the value is unknown.

```tsx
<Progress label="Uploading" value={vm.sent / vm.total} />
<Progress label="Connecting" />
<Progress label="Disk" value={0.8} width={10} showValue={false} />
```

| Prop | |
|---|---|
| `label` | required; names the progressbar |
| `value` | 0–1; undefined or null means indeterminate |
| `width` | bar length in characters; default 20 |
| `showValue` | the percentage after the bar; default true |

## UX rules
- Show determinate progress whenever you can measure it.
- Over about 10 seconds, also show what is happening or the time remaining.
