# Badge

A small inline tag: `[NEW]` · `[BETA]` · `[3]`.

```tsx
<Badge>ONLINE</Badge>
<Badge tone="solid">NEW</Badge>
<Badge tone="accent">DEGRADED</Badge>
<Badge tone="danger">OFFLINE</Badge>
```

| Tone | Look |
|---|---|
| `default` | line box in the current text color, so it stays visible inside inverted rows |
| `solid` | inverted phosphor |
| `accent` | amber (or green in the amber tint) |
| `danger` | red |

## UX rules
- One or two words. Status needs text: never convey it with color alone.
