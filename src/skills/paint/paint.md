# paint

`fill`, plus the `Paint` type that `border` and `color` share.

| Prop | Values |
|---|---|
| `fill` | a `Paint` (below) |
| `opacity` | 0–1, the whole frame |
| `blend` | mix-blend-mode with what's behind |

## Paint
One layer, or an array of layers (the first is on top):

| Layer | Example |
|---|---|
| token or CSS color | `'surface'` · `'#0f0'` · `'transparent'` |
| see-through solid | `{ color: 'phosphor', opacity: 0.1 }` |
| gradient (stops accept tokens) | `{ linear: '90deg, phosphor, accent' }` · `{ radial: … }` · `{ conic: 'from 90deg, …' }` |
| image | `{ image: src, fit: 'cover' \| 'contain' \| 'tile' \| 'crop', position, size }` |
| video (fill only) | `{ video: src }`, muted, looping, behind the children |
| CRT pattern | `{ pattern: 'scanlines' \| 'grid' \| 'dots' \| 'hatch' \| 'cross', color?, opacity?, size? }` |

Tokens: `bg` `surface` `raised` `phosphor` `dim` `line` `faint` `accent` `danger` `on-phosphor`.

```tsx
<Frame fill="surface" />
<Frame fill={[{ pattern: 'grid', color: 'faint' }, 'surface']} />
<Frame fill={{ image: photo, fit: 'cover' }} label="Rack B, rear view" aspect="4/3" />
<Frame fill={[{ linear: 'to top, bg, transparent 60%' }, { image: hero }]} />   // legibility scrim over a photo
```

Image URLs are passed as inline CSS variables, so a thousand cards with different images share one class, and URLs never enter the stylesheet.

## UX rules
- Text on a fill needs 4.5:1 contrast. Use `on-phosphor` on `phosphor`, `accent` or `danger` fills. The `contrast` lint rule checks token pairs in every tint.
- An image with meaning needs `label`. A decorative one needs `aria-hidden="true"`. The `image-has-label` lint rule checks.
- Put a gradient scrim under text that sits on a photo.
