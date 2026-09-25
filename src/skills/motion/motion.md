# motion

Enter, reveal, exit, loop and state transitions. All of it respects `prefers-reduced-motion` automatically: CSS motion sits inside `@media (prefers-reduced-motion: no-preference)`, and action animations are skipped.

| Prop | Values |
|---|---|
| `enter` | plays on mount |
| `reveal` | plays the first time the frame scrolls into view |
| `exit` | plays in reverse before unmounting, once `show` turns false |
| `show` | mount or unmount with enter/exit |
| `loop` | `blink` · `flicker` · `pulse` · `spin` |
| `transition` | `true` · `'fast'` · `'base'` · `'slow'` · `false`. On by default whenever there are state styles. |
| `duration` / `delay` / `ease` | override the token's timing; `delay` staggers lists |

One-shot tokens: `fade` `fade-up` `fade-down` `scale` `boot` (CRT power-on) `type-on` `pulse` `shake` `flash`.

```tsx
<Frame show={vm.open} enter="boot" exit="fade">…</Frame>
{items.map((it, i) => <Frame key={it.id} reveal="fade-up" delay={i * 60}>…</Frame>)}
<Frame onClick={[{ animate: 'pulse' }, vm.save]}>Save</Frame>
<Frame onTrigger={{ 'cart:added': { animate: 'shake', target: 'cart' } }} />
```

## UX rules
- Motion explains a change: where something came from, or what just happened. Never decorate with it.
- Keep durations short: 120ms for state feedback, 200–300ms for enter, under 500ms for anything but `boot` and `type-on`.
- Exits are faster than enters.
- Nothing essential may depend on an animation finishing. Reduced motion shows the final state immediately.
