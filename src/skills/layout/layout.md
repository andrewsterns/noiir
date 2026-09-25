# layout

Places children: flexbox rows and columns, grids, and stacks. The props use Figma's auto-layout words.

| Prop | Values | CSS |
|---|---|---|
| `flow` | `row` · `column` · `grid` · `stack` · `block` · `inline` | display / flex-direction; `stack` overlaps children in one grid cell |
| `gap` | px, or `{ x, y }` | gap / column-gap / row-gap |
| `align` | `start` `center` `end` `stretch` `baseline` | align-items |
| `justify` | `start` `center` `end` `between` `around` `evenly` | justify-content (justify-items for `stack`) |
| `alignSelf` / `justifySelf` | as above | this frame inside its parent |
| `inline` | boolean | flex → inline-flex, grid → inline-grid |
| `wrap` | boolean | flex-wrap |
| `cols` / `rows` | `3` → three equal tracks · `'240px 1fr'` | grid-template-* |
| `span` | `2` · `'all'` · `{ cols, rows }` | grid-column / grid-row |
| `grow` / `shrink` / `basis` / `order` | | flex item |
| `clip` | boolean | overflow: hidden |
| `scroll` | `x` · `y` · `both` | overflow auto, plus overscroll-behavior: contain |
| `hide` | boolean | display: none (use it inside `at` for responsive hiding) |

```tsx
<Frame flow="row" gap={8} align="center" justify="between">…</Frame>
<Frame flow="grid" cols={3} gap={{ x: 16, y: 24 }}>…</Frame>
<Frame flow="stack" align="center" justify="center">{image}{caption}</Frame>
<Frame flow="column" scroll="y" maxH={320}>{longList}</Frame>
```

## UX rules
- Space comes from the parent's `gap`, not from margins on children. Margins are for exceptions.
- Use `<Grid min={240}>` (library) for card grids: the columns reflow with no breakpoints.
- A scroll area needs a bounded size (`maxH`, or `h` inside a sized parent). `scroll` stops scroll chaining for you.
- Put `grow` on the one child that should take the leftover space. Don't give every child `w="fill"`.
