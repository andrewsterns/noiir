# interact

Events as actions. Every event prop takes `Action | Action[]`, run in order. An action is either a function (usually from the viewmodel) or a data action:

| Data action | Does |
|---|---|
| `{ animate: 'pulse', target?: id }` | plays a motion (Web Animations API; skipped under reduced motion) |
| `{ emit: 'name', payload? }` | fires a named trigger for `onTrigger` listeners anywhere |
| `{ focus: id }` · `{ scrollTo: id }` | moves focus / scrolls |
| `{ go: href }` | navigates (`setNavigate()` plugs in a router) |
| `{ copy: text }` | copies to the clipboard |

| Prop | Fires |
|---|---|
| `onClick` | activation. A frame with onClick renders as `<button type="button">`; with `as` set, it gets tabIndex plus Enter/Space activation |
| `onPress` / `onRelease` | pointer down / up |
| `onHover` / `onLeave` | pointer enter / leave. For hover *styles*, use the `hover` prop |
| `onFocus` / `onBlur` | focus in / out (bubbles) |
| `onKey={{ 'Enter': …, 'mod+k': … }}` | keys while focus is inside. Matches call preventDefault |
| `onHotkey={{ … }}` | keys anywhere. Ignored while typing unless the combo has a modifier |
| `onScroll` | `{ x, y, progressX, progressY }`, once per animation frame |
| `onInView` / `onOutView` | IntersectionObserver entry |
| `onDrag` | `{ phase, dx, dy, x, y }` with pointer capture |
| `onLongPress` | held 500ms without moving |
| `onAfter={{ ms, do }}` | once, ms after mount |
| `onTrigger={{ name: … }}` | a named trigger was emitted |

Style-side props: `cursor`, `select` (user-select), `pointerEvents`, `resize`.

```tsx
<Frame onClick={[{ animate: 'pulse' }, vm.addToCart, { emit: 'cart:added' }]}>Add</Frame>
<Frame id="cart" onTrigger={{ 'cart:added': { animate: 'shake' } }}><Glyph name="square" /></Frame>
<Frame onHotkey={{ 'mod+k': { focus: 'search' } }} />
```

## UX rules
- State changes (toggle, set, fetch) are viewmodel functions. Data actions are for presentation only.
- Anything clickable must be keyboard-operable. Prefer `<Button>`, or let Frame infer `<button>`.
- Give every key shortcut a visible hint, and never take over single letters while the user is typing.
