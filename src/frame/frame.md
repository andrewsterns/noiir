# Frame

The one primitive. It replaces `<div>`, `className`, `style` and CSS files. Every visual and behavioral concern is a typed prop, grouped into skills:

| Skill | Props |
|---|---|
| layout | flow gap align justify alignSelf justifySelf inline wrap cols rows span grow shrink basis order clip scroll hide |
| size | w h minW maxW minH maxH aspect |
| space | padding margin |
| place | position top right bottom left inset z |
| paint | fill opacity blend |
| edge | border radius shape outline |
| type | font color textAlign clamp truncate balance whitespace decoration caret |
| effect | shadow glow blur backdrop scanlines noise mask x y scale rotate |
| state | hover press focus focusWithin states · selected open empty loading error disabled |
| motion | enter reveal exit show loop transition duration delay ease |
| interact | onClick onPress onRelease onHover onLeave onFocus onBlur onKey onHotkey onScroll onInView onOutView onDrag onLongPress onAfter onTrigger · cursor select pointerEvents resize |
| respond | at container |
| access | as role label labelledBy describedBy live hidden focusable |
| variant | variants variant · `defineFrame()` |
| escape hatch | `unsafe` (raw CSS; the lint rule warns) · `theme` |

```tsx
<Frame as="article" flow="column" gap={12} padding={16} fill="surface"
  border={{ paint: { linear: '135deg, phosphor, transparent 70%' } }}
  hover={{ y: -4, glow: 'box' }} press={{ scale: 0.98 }} reveal="fade-up" at={{ md: { w: 280 } }}>
  <Frame aspect="4/3" fill={{ image: p.img }} label={p.alt} />
  <Text font="title" color={{ linear: '90deg, phosphor, accent' }} clamp={2}>{p.name}</Text>
  <Frame onClick={[{ animate: 'pulse' }, vm.buy]} minH={44} fill="phosphor" color="on-phosphor">Add to cart</Frame>
</Frame>
```

## How it works
- The props are merged (base → variants → call site) and compiled to **atomic classes**. Each distinct declaration becomes one CSS rule, inserted once and shared by every frame. States and breakpoints compile to real `:hover` / `@media` rules in ordered cascade layers, so they never re-render.
- Per-element values (image URLs, x/y) go through inline CSS variables, so they don't create new classes.
- Frame is memoized: a re-render with deep-equal style props is skipped.
- `defineFrame({ as, base, variants, defaults })` builds reusable components (Button, Badge …) with variant props.

## Four-file convention
Components built on Frame live in four files: `x.interface.ts` (types and data), `x.viewmodel.ts` (logic, as a `useXViewModel` hook), `x.view.tsx` (Frames only) and `x.md`. The `mvvm-roles` lint rule keeps each file to its role.
