# size

Width, height and aspect ratio. Numbers are px.

| Prop | Values |
|---|---|
| `w` `h` `minW` `maxW` `minH` `maxH` | number (px) · `'fill'` (100%) · `'hug'` (fit-content) · `'screen'` (100vw / 100dvh) · any CSS length |
| `aspect` | `16 / 9` · `1.5` · `'4/3'` |

```tsx
<Frame w="fill" maxW={640} margin={{ x: 'auto' }}>…</Frame>
<Frame aspect="16/9" fill={{ image: src }} label="Launch photo" />
<Frame minH="screen" flow="column">…</Frame>
```

## UX rules
- Prefer `maxW` to a fixed `w` for text containers. About 65–75 characters per line reads best.
- Interactive targets should be at least 44px tall on touch (24px is the WCAG minimum; the `touch-target` lint rule checks).
- Give media an `aspect` so the layout doesn't jump while it loads.
- `'screen'` height uses dvh, so mobile browser bars don't cut off content.
