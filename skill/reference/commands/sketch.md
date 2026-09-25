# sketch <screen>

Wireframe a screen quickly. The goal is structure and flow, not final content.

1. **Name the job.** One sentence: who is on this screen, and what they must be able to do.
2. **Lay out regions** with landmarks: `<Frame as="header">`, `<Frame as="nav" label="…">`, `<Frame as="main">`, `<Frame as="aside">`. Use `Stack`, `Row` and `Grid min={…}`, going mobile-first and adding `at={{ md: … }}` only where the structure changes.
3. **Fill with stand-ins:**
   - media → `<Placeholder kind="image|video|chart|map|avatar" caption="WHAT IT IS" />`
   - copy → `<Lorem lines={n} />` (bars), or real headings with `<Text font="title">`
   - controls → real library components (`Button`, `Input`, `Select`, `Tabs` …). Wireframes should be clickable.
4. **Sketch every state the screen can be in**, side by side or behind `Tabs`: default, loading (`<Lorem />` skeletons, `Table loading`), empty (what to do next), and error (what went wrong and how to retry).
5. **Mark the primary action** with `kind="primary"`. There is one per screen.
6. Wrap the whole screen in `<Screen>` if it isn't inside one already.

The output is a single `x.view.tsx` with its `x.viewmodel.ts` (even when the viewmodel only holds demo state), so turning the sketch into `build` later means replacing content, not restructuring.

```tsx
<Stack gap={24}>
  <Row justify="between"><Text font="title">Nodes</Text><Button kind="primary" glyph="plus">Add node</Button></Row>
  <Grid min={260}>{[1, 2, 3].map((i) => <Card key={i} title={`Node ${i}`} media={<Placeholder kind="chart" />}><Lorem lines={2} seed={i} /></Card>)}</Grid>
</Stack>
```
