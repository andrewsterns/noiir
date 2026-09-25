# build <feature>

Build a real component or screen.

1. **Read the parts you'll use**: the library references (`reference/library/*.md`) for any component that fits, and the skill references for any Frame props you're unsure of. Compose library components before writing new Frames.
2. **Create the folder** `feature/` with four files, written in this order:
   - `feature.interface.ts`: the props interface, the viewmodel's return type, and literal data (`as const`). Types only.
   - `feature.viewmodel.ts`: `export function useFeatureViewModel(props): FeatureViewModel`. All state, derived values, effects, fetching and handlers. Return ready-to-spread Frame props where that keeps the view simple.
   - `feature.view.tsx`: `export function Feature(props) { const vm = useFeatureViewModel(props); return <Frame …/> }`. Frames and library components only; no other hooks, no logic beyond simple conditionals and maps.
   - `feature.md`: purpose, props, states, keyboard map, UX rules (copy the shape of any `reference/library/*.md`).
3. **Design every state:** hover, press and focus for interactive parts; loading, empty and error for data; disabled with a reason.
4. **Reuse a look with `defineFrame`**, not copy-pasted props:
   ```tsx
   const Chip = defineFrame({ base: { flow: 'row', inline: true, padding: { x: 8, y: 2 }, border: 1, font: 'label' },
     variants: { tone: { plain: {}, hot: { fill: 'phosphor', color: 'on-phosphor' } } }, defaults: { tone: 'plain' } })
   ```
5. **Verify** (one bounded pass): `npx tsc --noEmit`, then `npx eslint feature/`, then fix, then run both once more.

## Checklist before you finish
- [ ] No raw elements, `className` or `style`; any `unsafe` has a comment saying why
- [ ] Every interactive element has a name, feedback, a disabled look, and is ≥ 44px tall
- [ ] Keyboard: Tab reaches everything in order, and Escape closes whatever opened
- [ ] Headings form an outline; landmarks are present
- [ ] Spacing on the 4px grid; colors are tokens; text meets contrast (lint checks token pairs)
- [ ] Motion uses tokens, is short, and explains something
