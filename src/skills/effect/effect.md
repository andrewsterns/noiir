# effect

Shadows, phosphor glow, blur, CRT overlays and transforms.

| Prop | Values |
|---|---|
| `shadow` | `sm` `md` `lg` `none`, or `{ x, y, blur, spread, color, inset }` (or an array of them) |
| `glow` | `true` (box and text) · `'strong'` · `'text'` · `'box'` |
| `blur` | px, blurs the frame itself |
| `backdrop` | px, or `{ blur, saturate }`: frosted glass over what's behind |
| `scanlines` | `true` or `{ opacity, size }`, drawn in `::after` |
| `noise` | `true`, or an opacity |
| `mask` | a CSS mask image |
| `x` `y` | translate; composes with `scale` and `rotate` |
| `scale` / `rotate` | number / degrees |

```tsx
<Frame border={1} hover={{ glow: 'box', y: -2 }} press={{ scale: 0.98 }} />
<Frame position="fixed" inset fill={{ color: 'bg', opacity: 0.8 }} backdrop={2} />
<Frame x={drag.x} y={drag.y} onDrag={vm.onDrag} />
```

`shadow` and `glow` share box-shadow: a hover that sets only one of them keeps the other from the base. Base-layer `x` and `y` go through inline variables, so dragging never creates a class per pixel.

## UX rules
- Glow is emphasis. Put it on the one thing in focus (hover, the selected item, a dialog), not on everything.
- `<Screen>` applies scanlines once. Don't stack them on every box.
- Movement on hover stays small: 2–4px lift, 0.97–0.99 press. Big jumps feel broken.
