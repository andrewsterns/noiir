# noiir

One primitive, `<Frame>`, instead of `<div>` + `className` + `style` + CSS files. On top of it sit a soft CRT wireframe standard library (sage green `#9EC29A` or warm amber `#CEB06C`, Charis SIL headings, Space Mono body, rounded corners), ESLint rules that enforce UX, and a `/noiir` Claude Code skill.

```tsx
import { Frame, Screen, Text } from 'noiir'

<Screen tint="green">
  <Frame as="article" flow="column" gap={12} padding={16} fill="surface"
    border={{ paint: { linear: '135deg, phosphor, transparent 70%' } }}
    hover={{ y: -4, glow: 'box' }} press={{ scale: 0.98 }} reveal="fade-up" at={{ md: { w: 280 } }}>
    <Frame aspect="4/3" fill={{ image: p.img }} label={p.alt} />
    <Text font="title" color={{ linear: '90deg, phosphor, accent' }} clamp={2}>{p.name}</Text>
    <Frame onClick={[{ animate: 'pulse' }, vm.buy]} minH={44} fill="phosphor" color="on-phosphor">Add to cart</Frame>
  </Frame>
</Screen>
```

## Skills (prop groups)

| Skill | Props |
|---|---|
| layout | flow gap align justify alignSelf justifySelf inline wrap cols rows span grow shrink basis order clip scroll hide |
| size | w h minW maxW minH maxH aspect |
| space | padding margin |
| place | position top right bottom left inset z |
| paint | fill opacity blend: one `Paint` type (token, color, gradient, image, video, pattern, layers) shared with `border` and `color` |
| edge | border radius shape outline |
| type | font color textAlign clamp truncate balance whitespace decoration caret |
| effect | shadow glow blur backdrop scanlines noise mask x y scale rotate |
| state | hover press focus focusWithin states · selected open empty loading error disabled |
| motion | enter reveal exit show loop transition duration delay ease (reduced motion is automatic) |
| interact | onClick onPress onRelease onHover onLeave onFocus onBlur onKey onHotkey onScroll onInView onOutView onDrag onLongPress onAfter onTrigger; each takes `Action \| Action[]` |
| respond | at (sm md lg xl, @sm… for container queries) container |
| access | as role label labelledBy describedBy live hidden focusable (and the element is inferred) |

Each skill lives in `src/skills/<skill>/` as `.interface.ts` (types), `.resolve.ts` (props → CSS) and `.md` (the reference).

## Library
`Screen Stack Row Grid Spacer Divider Text Link Placeholder Lorem Glyph Button Input Textarea Select Checkbox RadioGroup Toggle Card Panel List ListItem Table Tabs Menu Modal Tooltip Toaster/toast() Progress Spinner Badge Cursor`, plus `defineFrame()` for your own. Every component is built only from Frames, in four files: `x.interface.ts`, `x.viewmodel.ts`, `x.view.tsx` and `x.md`.

## Lint (`noiir/lint`)
```js
// eslint.config.js
import tseslint from 'typescript-eslint'
import noiir from 'noiir/lint'
export default [{ files: ['**/*.{ts,tsx}'], languageOptions: { parser: tseslint.parser }, ...noiir.configs.recommended }]
```
The rules: `no-raw-elements` · `no-style-escape` · `no-unsafe` · `mvvm-roles` · `interactive-has-name` · `image-has-label` · `no-positive-tabindex` · `contrast` (every tint) · `interactive-feedback` · `touch-target` · `on-scale`.

## Claude Code skill
`npm run skill:install` puts `/noiir` in `.claude/skills/noiir/`. Commands: `sketch`, `build`, `convert`, `audit`, `explain`. Its reference is generated from the `.md` files next to the code, so the docs have one source of truth.

## Measured, not claimed
`npm run compare`: what the author writes for the same product card.

| | Frame | TSX + CSS |
|---|---|---|
| files | 1 | 2 |
| lines | 17 | 81 |
| ≈ tokens to write | 249 | 1185 |
| class names invented | 0 | 6 |
| CSS techniques to recall | 0 | 9 |

`npm run bench`: 1,000 of those cards, production build, headless Chrome. Two runs, with a fresh browser per ordering.

| | Frame vs hand CSS |
|---|---|
| cold mount | +9% to +26% |
| warm mount | +42% to +46% |
| update all | +76% to +80% |
| browser style + layout | −6% to +19% |
| JavaScript | about 2–3× |

The browser-side cost of the atomic CSS is close to hand-written CSS. The extra cost is JavaScript: every box is a React component that compiles its props (cached and memoized). In absolute terms, updating 1,000 cards takes about 22–27 ms against 12–16 ms. A build-time extractor that turns static Frames into plain elements would close the gap; it isn't built yet.

## Scripts
| | |
|---|---|
| `npm run dev` | the playground: gallery, Frame-vs-CSS comparison, benchmark |
| `npm test` | Vitest: engine, every skill resolver, Frame behavior, every library component, lint rules, theme contrast |
| `npm run typecheck` / `npm run lint` | strict TS / the repo's own noiir rules |
| `npm run audit -- <path>` | noiir lint on any path, plus the checklist lint can't see |
| `npm run compare` / `npm run bench` | the numbers above |
| `npm run build` | library + types + lint plugin + skill reference |

Node ≥ 22.18 runs the TypeScript scripts and the lint plugin directly (no build step).
