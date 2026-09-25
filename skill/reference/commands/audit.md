# audit <path>

A UX audit in two parts: the deterministic lint rules, then a short checklist of what lint can't see. Report findings ordered by severity, each with its file:line and the fix.

## 1. Lint (deterministic)
Run `npm run audit -- <path>` (noiir repo), or `npx eslint <path>` with the noiir plugin configured:

```js
// eslint.config.js
import tseslint from 'typescript-eslint'
import noiir from 'noiir/lint'
export default [{ files: ['**/*.tsx', '**/*.ts'], languageOptions: { parser: tseslint.parser }, ...noiir.configs.recommended }]
```

| Rule | Catches |
|---|---|
| `no-raw-elements` | `<div>`, `<span>` … instead of Frames |
| `no-style-escape` | `style` / `className` on noiir components |
| `no-unsafe` | uses of the `unsafe` escape hatch |
| `mvvm-roles` | logic in interface files, hooks in views, viewmodels importing views |
| `interactive-has-name` | clickable frames and buttons with no accessible name |
| `image-has-label` | image fills without `label` / `aria-hidden`; `as="img"` without `alt` |
| `no-positive-tabindex` | focus-order hijacking |
| `contrast` | fill + color token pairs below 4.5:1 in any tint |
| `interactive-feedback` | clickable frames with no hover/press style |
| `touch-target` | interactive frames under 24px tall |
| `on-scale` | spacing off the 4px grid |

## 2. Checklist (read the code, then use the UI if it can run)
- [ ] **States**: every data view has loading, empty and error states; every disabled control says why.
- [ ] **Keyboard**: Tab order follows the visual order; every action is reachable; Escape closes overlays; focus returns to the trigger.
- [ ] **Names and structure**: one `main`; labelled `nav`; headings form an outline; form fields have visible labels; errors are announced (the library does this).
- [ ] **Targets**: primary touch targets are ≥ 44px (Button md/lg, Input).
- [ ] **Motion**: short, token-based, explanatory; nothing essential waits on an animation.
- [ ] **Copy**: buttons are verbs; errors say how to fix; empty states say what to do next.
- [ ] **Layout**: works at 360px wide with no horizontal scroll; line length ≤ ~75ch for text.

Report the lint results first, then the checklist items that failed. Don't restate what passed.
