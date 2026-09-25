# Text · Link

Text in a theme style. The element follows the style unless `as` overrides it: display → h1, title → h2, heading → h3, body → p, label → span, caption → small, code → code.

```tsx
<Text font="title">Uplink restored</Text>
<Text color="dim">Last packet 3s ago</Text>
<Text font="heading" as="h2">Nodes</Text>            // keep the heading outline right
<Text font="title" color={{ linear: '90deg, phosphor, accent' }} clamp={2}>{name}</Text>
<Link href="/docs">Read the docs</Link>
<Link href="https://example.com" external>Status page</Link>
```

| Link prop | |
|---|---|
| `external` | opens in a new tab with `rel="noopener noreferrer"`, and tells screen readers so |

## UX rules
- Pick the heading element for the outline and the font for the look.
- Link text says where it goes ("Read the docs"), never "click here".
- Use `dim` for secondary text only. Primary content stays `phosphor`.
