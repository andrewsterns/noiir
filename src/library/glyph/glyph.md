# Glyph

Terminal icons from Unicode. They inherit color, size and glow like text.

`up ▲ · down ▼ · left ◄ · right ► · close ✕ · menu ≡ · search ⌕ · check ✓ · plus + · minus − · dot • · star ★ · arrow → · back ← · external ↗ · info i · warn ! · play ▶ · pause ❚❚ · block █ · shade ░ · prompt > · ellipsis … · grip ⋮ · square ■`

```tsx
<Glyph name="search" />                  // decorative: hidden from screen readers
<Glyph name="warn" label="Warning" />    // meaningful: role="img" with a name
<Button glyph="close" label="Close" />   // buttons take glyph names directly
```

## UX rules
- A glyph on its own that means something needs `label`. A glyph next to text is decoration.
- Don't rely on ▲/▼ alone for state: pair them with text or ARIA.
