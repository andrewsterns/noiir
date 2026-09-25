# Stack · Row · Grid · Spacer

Layout shorthands over Frame. Every Frame prop still works.

| Component | Defaults |
|---|---|
| `Stack` | `flow="column" gap={12}` |
| `Row` | `flow="row" gap={8} align="center"` |
| `Grid` | `flow="grid" gap={16} cols={2}`; `min={240}` gives auto-fill columns at least 240px wide |
| `Spacer` | grows to push siblings apart; `space={16}` for a fixed gap |

```tsx
<Stack gap={24}>
  <Row justify="between"><Text font="title">Nodes</Text><Button>Add</Button></Row>
  <Grid min={240}>{cards}</Grid>
</Stack>
<Row><Glyph name="search" /><Spacer /><Badge>3</Badge></Row>
```

## UX rules
- Reach for `Grid min` before breakpoints: it reflows at any width.
- Keep one gap scale per page (8 inside components, 16–24 between them, 32–48 between sections).
