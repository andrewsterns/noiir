# access

Semantics and ARIA. Frame infers most of it.

| Prop | Does |
|---|---|
| `as` | element: `main` `nav` `section` `article` `header` `footer` `ul` `li` `h1`–`h6` `p` `label` `input` … |
| `role` | ARIA role, when no element fits |
| `label` | aria-label: the name for interactive frames without text, and for images |
| `labelledBy` / `describedBy` | ids of the naming / describing elements |
| `live` | `polite` / `assertive`: announce changes |
| `hidden` | `true` removes it for everyone · `'visually'` keeps it for screen readers only |
| `focusable` | tabIndex 0 for non-interactive frames that need focus (scroll areas, key-capture panels) |

Inference:
- `onClick` renders `<button type="button">`.
- `href` renders `<a>`.
- An image fill plus `label` with no children gets `role="img"`.
- A clickable `as="li"` / `as="tr"` gets tabIndex 0 and Enter/Space activation.
- State flags map to ARIA (see the state skill).

`aria-*` and `data-*` attributes pass through untouched.

```tsx
<Frame as="nav" label="Primary">…</Frame>
<Frame onClick={vm.close} label="Close"><Glyph name="close" /></Frame>
<Frame hidden="visually">Opens in a new tab</Frame>
<Frame live="polite">{vm.status}</Frame>
```

## UX rules
- Use landmarks: one `main`, a labelled `nav`, and `header`/`footer`.
- Interactive frames need a name: visible text or `label`. The `interactive-has-name` lint rule checks.
- Don't use a positive tabIndex. Fix the order in the markup (the `no-positive-tabindex` rule).
- Every image needs `label`, or `aria-hidden` when it is decoration.
