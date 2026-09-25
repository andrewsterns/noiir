# Lorem

Placeholder copy: greeked bars (the wireframe look), or real lorem ipsum.

```tsx
<Lorem />                 // 3 bars
<Lorem lines={5} seed={2} />
<Lorem mode="text" lines={2} />
```

| Prop | Default | |
|---|---|---|
| `lines` | 3 | |
| `mode` | `bars` | `bars` · `text` |
| `seed` | 1 | changes the line-length pattern |

Bars are hidden from screen readers.

## UX rules
- Replace lorem with real copy as soon as it exists. Real text length changes layouts.
