# edge

Lines, corners, shape and outline.

| Prop | Values |
|---|---|
| `border` | `1` (1px in `line`) · a Paint (`'phosphor'`, or a gradient/image for a ring) · `{ width, style, paint, sides }` |
| `radius` | token `sm` 4 · `md` 8 · `lg` 12 · `xl` 16 · px · `'full'` · `{ tl, tr, br, bl }` (corners take tokens too) |
| `shape` | `'box'` · `'chamfer'` (8px cut corners) · `{ chamfer: n }` |
| `outline` | px · color · `{ width, style, color, offset }` · `'none'` |

```tsx
<Frame border={1} />
<Frame border={{ sides: ['bottom'] }} />
<Frame border={{ width: 2, paint: { conic: 'from 90deg, phosphor, accent, phosphor' } }} radius={12} />
<Frame border={1} hover={{ border: 'phosphor' }} />    // in a state, a bare color only recolors
<Frame shape="chamfer" fill="surface" />
```

Gradient and image borders are drawn as a masked `::before` ring, so they follow `radius`. That replaces the usual border-image hack, which ignores radius.

## UX rules
- Use the radius tokens so corners stay consistent: `sm` for badges and tooltips, `md` for buttons, fields and menus, `lg` for cards and panels, `xl` for dialogs. Nested corners get a smaller radius than their container.
- Borders that separate or outline controls need 3:1 contrast against the background. `line` meets it in every tint; `faint` is decoration only.
- Never remove a focus indicator without replacing it (`outline: 'none'` plus a `focus` or `focusWithin` style).
