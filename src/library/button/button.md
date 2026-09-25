# Button

A button, or a link styled as one when given `href`. Built with `defineFrame` variants.

```tsx
<Button kind="primary" onClick={vm.save}>Save</Button>
<Button onClick={[{ animate: 'pulse' }, vm.addToCart]} glyph="plus">Add</Button>
<Button kind="danger" loading={vm.deleting}>Delete</Button>
<Button kind="ghost" size="sm" glyph="close" label="Close" onClick={vm.close} />
<Button href="/next" trailing="arrow">Continue</Button>
```

| Prop | Default | |
|---|---|---|
| `kind` | `secondary` | `primary` (inverted phosphor) · `secondary` (line box) · `ghost` · `danger` |
| `size` | `md` | `sm` 32px · `md` 44px · `lg` 52px |
| `glyph` / `trailing` | | glyph names; `glyph` becomes a spinner while `loading` |
| `loading` / `disabled` | | both block onClick; loading sets aria-busy |

## States
Hover glows and tints · press scales to 0.97 · keyboard focus gets the phosphor ring · disabled dims to 45%.

## Keyboard
Enter and Space activate it (a native button).

## UX rules
- One `primary` per view: the main action.
- Labels are verbs that say what happens ("Save changes", not "OK").
- Icon-only buttons need `label`.
- Use `loading` instead of disabling during async work, so the button keeps its place and says it is busy.
