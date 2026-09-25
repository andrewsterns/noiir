# Divider

A 1px rule. With a label: `──── SECTION ────`.

```tsx
<Divider />
<Divider label="or continue with" />
<Row><Text>a</Text><Divider vertical /><Text>b</Text></Row>
```

| Prop | |
|---|---|
| `label` | text set into the line (it also names the separator) |
| `vertical` | a vertical rule inside a row |
| `tone` | line color token; default `line` |

## UX rules
- Prefer space to lines. Add a divider only when space alone can't show where one group ends.
