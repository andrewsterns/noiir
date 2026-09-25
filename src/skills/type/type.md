# type

Text style, text color (any Paint), and line handling.

| Prop | Values |
|---|---|
| `font` | `display` · `title` · `heading` (Charis SIL) · `body` · `label` · `caption` · `code` (Space Mono), or `{ family: 'heading' \| 'body' \| 'mono' \| css, size, weight, leading, tracking, case, italic }` |
| `color` | a Paint. Gradients and images paint the letters themselves. |
| `textAlign` | `start` `center` `end` `justify` |
| `clamp` | show at most n lines, then … |
| `truncate` | a single line with … |
| `balance` | even out line lengths (headings) |
| `whitespace` | `normal` `nowrap` `pre` `pre-wrap` (`pre` keeps ASCII art intact) |
| `decoration` | `underline` `line-through` `none` |
| `caret` | caret color in inputs |

```tsx
<Frame as="h2" font="title" balance>Uplink restored</Frame>
<Frame font="title" color={{ linear: '90deg, phosphor, accent' }} clamp={2}>{name}</Frame>
<Frame font="caption" color="dim" truncate>{path}</Frame>
```

Use the library `<Text>`: it picks the element from the font (title → h2, heading → h3, body → p, label → span).

## UX rules
- Heading levels follow the document outline, not the size you want. Set `as` when the two differ.
- `label` is uppercase with wide tracking. Use it for short labels only, never for sentences.
- Headings and body text use −7% tracking; labels, captions and code stay near zero so small text stays readable.
- Body text stays at `body` (14px Space Mono). Don't shrink paragraphs to fit.
- Gradient text replaces the frame's own `fill`, so nest a `<Text>` inside a filled frame.
- Clamped or truncated text must be available in full somewhere (a detail view or a tooltip).
