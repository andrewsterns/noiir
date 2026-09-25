# space

Padding and margin on the 4px grid.

| Prop | Values |
|---|---|
| `padding` / `margin` | a length for all sides · `{ x, y }` · `{ top, right, bottom, left }` (a side beats its axis) |

```tsx
<Frame padding={16} />
<Frame padding={{ x: 16, y: 8 }} />
<Frame margin={{ top: 24 }} />
<Frame margin={{ x: 'auto' }} maxW={720} />   // centered column
```

## UX rules
- The grid is 4px: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64. Small values may use 2px half-steps (2 · 6 · 10), and 1 is allowed for hairlines. The `on-scale` lint rule enforces this.
- Group related things tightly and separate groups generously. The space between groups should be at least twice the space inside a group.
- Prefer the parent's `gap` to margins on children.
