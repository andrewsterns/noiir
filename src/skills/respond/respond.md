# respond

Mobile-first overrides by viewport or container width.

| Prop | Values |
|---|---|
| `at` | `{ sm, md, lg, xl, '@sm', '@md', '@lg', '@xl': Style }` |
| `container` | `true`, or a name: makes this frame a size container for `@` keys |

Breakpoints (min-width): sm 480 · md 768 · lg 1024 · xl 1280. Larger ones win.

```tsx
<Frame flow="column" gap={16} at={{ md: { flow: 'row' } }}>…</Frame>
<Frame w="fill" at={{ md: { w: 280 } }} />
<Frame at={{ lg: { hide: true } }}>mobile-only hint</Frame>

<Frame container>
  <Frame flow="column" at={{ '@md': { flow: 'row' } }}>…</Frame>   // reacts to the card's width, not the window's
</Frame>
```

## UX rules
- Design the narrow layout first, then add at the widths where the content needs it.
- Prefer intrinsic layouts (`<Grid min={240}>`, `wrap`) to breakpoints. Use `at` for real structural changes.
- Use container queries (`@md`) for components that live in both sidebars and main columns.
- Never hide essential actions on small screens. Collapse them into a `<Menu>` instead.
