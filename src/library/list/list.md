# List · ListItem

A `<ul>` with terminal markers (`> item`). Interactive items become full-width buttons or links.

```tsx
<List>
  <ListItem>Plain row</ListItem>
  <ListItem description="alpha.grid · 42%" trailing={<Badge>ONLINE</Badge>}
    onClick={() => vm.select(n)} selected={vm.selected === n.id}>Node 1</ListItem>
</List>
<List marker="bullet" divided>…</List>
```

| List prop | |
|---|---|
| `marker` | `prompt` > (default) · `bullet` ■ · `dash` - · `none` |
| `divided` | a faint line under each item |

| ListItem prop | |
|---|---|
| `leading` / `trailing` | slots; `leading` replaces the marker |
| `description` | a second, dim line |
| `onClick` / `href` | interactive: hover tint, keyboard, `selected` inverts the row |

## UX rules
- Put the most identifying text first. Trailing slots hold status or counts, never the primary action.
