# convert <file>

Rewrite div/className/CSS code into Frames, then delete the CSS once everything is mapped.

1. Read the component and **every** stylesheet it uses. List each selector and the element that gets it.
2. Split the file into the four-file convention if it has state or logic (hooks and handlers go to the viewmodel).
3. Replace each element with `<Frame as="tag">` (or a library component) and move its declarations into props using the table below. Pseudo-classes and media queries become state and `at` props.
4. Anything with no mapping goes in `unsafe={{ … }}` with a `// TODO(noiir): …` comment. Don't drop it silently.
5. Delete the CSS file and its import only when nothing references it any more. Run `npx tsc --noEmit` and `npx eslint <file>`.

## CSS → Frame

| CSS | Frame |
|---|---|
| `display:flex; flex-direction:column` | `flow="column"` (row, grid, `stack` for overlapping children) |
| `gap` · `row-gap` / `column-gap` | `gap` · `gap={{ y, x }}` |
| `align-items` · `justify-content: space-between` | `align` · `justify="between"` |
| `align-self` · `justify-self` | `alignSelf` · `justifySelf` |
| `display:inline-flex` | `flow="row" inline` |
| `grid-template-columns: repeat(3,1fr)` · `repeat(auto-fill,minmax(240px,1fr))` | `cols={3}` · `<Grid min={240}>` |
| `grid-column: span 2` · `1 / -1` | `span={2}` · `span="all"` |
| `flex: 1` · `flex-shrink:0` | `grow` · `shrink={false}` |
| `overflow:hidden` · `overflow-y:auto` | `clip` · `scroll="y"` |
| `display:none` | `hide` (inside `at` for responsive) |
| `width:100%` · `fit-content` · `100vh` | `w="fill"` · `w="hug"` · `h="screen"` |
| `max-width` · `aspect-ratio` | `maxW` · `aspect` |
| `padding: 8px 16px` · `margin: 0 auto` | `padding={{ y: 8, x: 16 }}` · `margin={{ x: 'auto' }}` |
| `position:absolute; inset:0` · `z-index` | `position="absolute" inset` · `z` |
| `background: var(--x)` / a color | `fill="token"` (map colors to the nearest token) |
| `background-image: url()` | `fill={{ image: src, fit: 'cover' }}` plus `label` |
| `linear-gradient(…)` | `fill={{ linear: '…' }}` (tokens allowed in the stops) |
| layered backgrounds | `fill={[top, …, bottom]}` |
| `opacity` · `mix-blend-mode` | `opacity` · `blend` |
| `border: 1px solid` · `border-bottom` | `border={1}` · `border={{ sides: ['bottom'] }}` |
| gradient border (mask / border-image hacks) | `border={{ paint: { linear: '…' } }}` |
| `border-radius` · `9999px` | `radius` · `radius="full"` |
| cut corners (clip-path polygon) | `shape="chamfer"` |
| `outline` | `outline` |
| font-size/weight/line-height/letter-spacing/transform | `font="token"` or `font={{ size, weight, leading, tracking, case }}` |
| `color` · gradient text (background-clip) | `color="token"` · `color={{ linear: '…' }}` |
| `text-align` · `text-wrap: balance` | `textAlign` · `balance` |
| `-webkit-line-clamp` · ellipsis + nowrap | `clamp={n}` · `truncate` |
| `white-space` · `text-decoration` · `caret-color` | `whitespace` · `decoration` · `caret` |
| `box-shadow` · glow | `shadow` · `glow` |
| `filter: blur()` · `backdrop-filter` | `blur` · `backdrop` |
| `transform: translate / scale / rotate` | `x` `y` · `scale` · `rotate` |
| `mask-image` | `mask` |
| `cursor` · `user-select` · `pointer-events` · `resize` | `cursor` · `select` · `pointerEvents` · `resize` |
| `:hover` · `:active` · `:focus-visible` · `:focus-within` | `hover` · `press` · `focus` · `focusWithin` |
| `.is-selected` / `[aria-selected]` | `selected` + `states={{ selected: … }}` |
| `:disabled` / `.is-disabled` | `disabled` + `states={{ disabled: … }}` |
| `@media (min-width: 768px)` | `at={{ md: … }}` (sm 480 · md 768 · lg 1024 · xl 1280) |
| `@container` | `container` on the parent + `at={{ '@md': … }}` |
| `transition` | automatic when state styles exist; `transition="slow"` or `false` |
| `@keyframes` enter / IntersectionObserver fade-in | `enter="fade-up"` / `reveal="fade-up"` |
| `@media (prefers-reduced-motion)` blocks | delete them: noiir handles reduced motion |
| `<div onClick>` | `<Frame onClick>` (renders a button) or `<Button>` |
| `<img alt>` | `<Frame fill={{ image }} label={alt} aspect>` or `<Frame as="img" src alt>` |
| `element.animate()` in a handler | `onClick={[{ animate: 'pulse' }, handler]}` |
