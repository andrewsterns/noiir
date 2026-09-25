# Tooltip

A small label that appears on hover (after a delay) or on keyboard focus (at once). Escape hides it. The trigger gets `aria-describedby`.

```tsx
<Tooltip content="Reboot the whole grid">
  <Button glyph="play" label="Reboot" />
</Tooltip>
```

| Prop | |
|---|---|
| `content` | short text |
| `children` | one focusable element |
| `side` | `top` (default) · `bottom` |
| `delay` | hover delay in ms; default 400 |

## UX rules
- Supplementary only: never the only place important information lives. Touch users may never see it.
- Never put interactive content in a tooltip.
