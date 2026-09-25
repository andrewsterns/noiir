# place

Positioning outside normal flow.

| Prop | Values |
|---|---|
| `position` | `relative` · `absolute` · `fixed` · `sticky` |
| `top` `right` `bottom` `left` | lengths |
| `inset` | a length, or `true` for 0 (cover the positioned parent) |
| `z` | stacking order |

```tsx
<Frame position="relative">
  <Frame position="absolute" top={8} right={8}><Badge>NEW</Badge></Frame>
</Frame>
<Frame position="sticky" top={0} z={10} fill="bg">header</Frame>
<Frame position="fixed" inset fill={{ color: 'bg', opacity: 0.8 }} />
```

To move a frame without taking it out of flow, use the effect skill's `x` / `y` (translate) instead.

## UX rules
- A fixed or sticky bar must not hide focused content. Give sticky headers a solid `fill`.
- Keep z-index to a few levels: content 0 · sticky 10 · menus 50 · modals 100 · toasts 200 (what the library uses).
