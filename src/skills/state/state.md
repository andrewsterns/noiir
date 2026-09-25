# state

How a frame looks while hovered, pressed or focused, or while it is selected, open, empty, loading, invalid or disabled. Every state compiles to real CSS (`:hover`, `[data-selected]` …), so none of it re-renders.

| Prop | Takes | Selector |
|---|---|---|
| `hover` | Style | `:hover` inside `@media (hover: hover)`, skipped while disabled |
| `press` | Style | `:active`, skipped while disabled |
| `focus` | Style | `:focus-visible` (a phosphor ring applies by default) |
| `focusWithin` | Style | `:focus-within`, for a box around an input |
| `states` | `{ selected, open, empty, loading, error, disabled }: Style` | `[data-selected]` … |
| `selected` `open` `empty` `loading` `error` `disabled` | boolean | set the data-* flag and the right ARIA |

Semantic flags also set ARIA where the element supports it:
- `selected` sets `aria-selected` on tab, option or row roles, and `aria-pressed` on a plain button.
- `open` sets `aria-expanded`.
- `loading` sets `aria-busy`.
- `error` sets `aria-invalid` on fields.
- `disabled` uses native `disabled` on form elements, otherwise `aria-disabled`.

`disabled` and `loading` also block click, press and key actions.

```tsx
<Frame
  onClick={vm.pick}
  selected={vm.isPicked}
  hover={{ fill: { color: 'phosphor', opacity: 0.08 } }}
  press={{ scale: 0.98 }}
  states={{ selected: { fill: 'phosphor', color: 'on-phosphor' } }}
>
```

When two states set the same property, the later one wins. Cascade order: selected → open → empty → loading → error → hover → focusWithin → focus → press → disabled.

## UX rules
- Every interactive thing needs visible hover, press and focus feedback, plus a disabled look. The `interactive-feedback` lint rule flags clickable frames without it.
- Every screen that loads data needs its loading, empty and error states designed.
- Disabled controls should say why nearby, in text or a tooltip.
