---
name: noiir
description: Build, sketch, convert and audit UI with noiir, the Frame-only React library with a CRT phosphor wireframe look. Use when the project depends on noiir (imports from 'noiir', has <Frame>, <Screen>, *.view.tsx / *.viewmodel.ts files), or when the user asks to wireframe a screen, build a component with Frame, replace div/className/CSS with Frame, or audit UX (states, keyboard, contrast, touch targets, motion). Not for projects that don't use noiir.
user-invocable: true
argument-hint: "[sketch <screen> · build <feature> · convert <file> · audit <path> · explain <skill|prop>]"
---

# noiir

noiir replaces `<div>`, `className`, `style` and CSS files with one primitive, `<Frame>`. Every visual and behavioral concern is a typed prop grouped into **skills**, and UX rules are **enforced** by types, lint rules and a deterministic audit rather than left to taste. Everything renders as a soft CRT phosphor wireframe: sage green #9EC29A or warm amber #CEB06C (or off-white) on warm near-black, Charis SIL headings, Space Mono body, rounded corners.

## Commands

| Command | Does | Read first |
|---|---|---|
| `sketch <screen>` | Wireframe a screen fast from Placeholder, Lorem and library parts | [reference/commands/sketch.md](reference/commands/sketch.md) |
| `build <feature>` | Build a real component or screen with the four-file convention | [reference/commands/build.md](reference/commands/build.md) |
| `convert <file>` | Rewrite div/className/CSS code into Frames and delete the CSS | [reference/commands/convert.md](reference/commands/convert.md) |
| `audit <path>` | Run the UX lint rules, then the checklist lint can't see | [reference/commands/audit.md](reference/commands/audit.md) |
| `explain <skill\|prop>` | Answer from the skill reference | [reference/index.md](reference/index.md) |

With no command, infer one from the request. If none fits, treat it as `build`.

## Hard rules (lint enforces most)
1. **No raw elements, `className` or `style`.** Use `<Frame as="…">` or a library component. `unsafe={…}` is the visible escape hatch; justify it in a comment.
2. **The four-file convention**, one folder per component:
   - `x.interface.ts`: types and `as const` data only
   - `x.viewmodel.ts`: `useXViewModel(props)`, holding all state, effects and logic
   - `x.view.tsx`: Frames and library components only; the only hook it calls is its own viewmodel's
   - `x.md`: purpose, props, states, keyboard, UX rules
3. **Tokens, not values:** colors are tokens (`bg surface raised phosphor dim line faint accent danger on-phosphor`); radii are tokens (`sm md lg xl`); spacing sits on the 4px grid; text uses font tokens.
4. **Every interactive thing** has a name (text or `label`), hover, press and focus feedback, a disabled look, and a target at least 44px tall. Prefer `<Button>` over a clickable Frame.
5. **Every data view** designs loading, empty and error states.
6. **Logic stays in viewmodels.** Views wire events to viewmodel functions, or to presentational data actions (`animate`, `emit`, `focus`, `scrollTo`, `go`, `copy`).

## Frame API card

```tsx
import { Frame, Text, Button, Screen } from 'noiir'

<Frame
  as="article"                                   // access: element (inferred: onClick → button, href → a)
  flow="column" gap={12} align="start"           // layout: row | column | grid | stack | block | inline
  w="fill" maxW={640} aspect="16/9"              // size: px | 'fill' | 'hug' | 'screen'
  padding={{ x: 16, y: 12 }} margin={{ top: 8 }} // space
  position="relative" top={0} z={10}             // place
  fill="surface"                                 // paint: token | color | {linear} | {image} | {video} | {pattern} | [layers]
  border={1} radius="md" shape="chamfer"        // edge: radius sm 4 · md 8 · lg 12 · xl 16 · px · 'full'
  font="body" color="phosphor" clamp={2}         // type: display title heading (Charis SIL) · body label caption code (Space Mono)
  glow="box" shadow="md" x={0} scale={1}         // effect
  hover={{ glow: true, y: -2 }} press={{ scale: 0.98 }} focus={{ border: 'phosphor' }}   // state styles (pure CSS)
  selected={vm.on} states={{ selected: { fill: 'phosphor', color: 'on-phosphor' } }}   // semantic states + ARIA
  enter="fade-up" reveal="boot" exit="fade" show={vm.open} loop="blink"                // motion (reduced-motion safe)
  onClick={[{ animate: 'pulse' }, vm.save]} onKey={{ Escape: vm.close }} onTrigger={{ 'saved': { animate: 'flash' } }}
  at={{ md: { flow: 'row' } }}                   // respond: sm md lg xl, '@md' for container queries
  label="…" live="polite" hidden="visually"      // access
/>
```

Library: `Screen Stack Row Grid Spacer Divider Text Link Placeholder Lorem Glyph Button Input Textarea Select Checkbox RadioGroup Toggle Card Panel List ListItem Table Tabs Menu Modal Tooltip Toaster toast() Progress Spinner Badge Cursor`, plus `defineFrame({ base, variants, defaults })` for your own components.

Full reference: one file per skill in [reference/skills/](reference/index.md), one per component in [reference/library/](reference/index.md). Load only the ones the task touches.

## Verify, in one bounded pass
After writing code, run these once, fix everything they report in one batch, and run them once more:
- `npx tsc --noEmit`
- `npx eslint <changed files>` (the noiir rules)
- `npm run audit -- <path>` if the project has the script

Don't loop on polish beyond that.
