# Toaster · toast()

Mount `<Toaster />` once, then call `toast()` from anywhere: viewmodels, effects, or a data action. It runs on the trigger bus (`emit('noiir:toast')`), so no provider or context is needed.

```tsx
<Screen>…<Toaster /></Screen>

toast('Saved', { kind: 'ok' })
toast('Carrier lost. Retrying…', { kind: 'error', duration: 10000 })
```

| Option | Default | |
|---|---|---|
| `kind` | `info` | `info` · `ok` · `error` (error uses role=alert and red) |
| `duration` | 4000 (errors 8000) | ms before it dismisses itself |

At most 5 show at once, bottom-right, each with a dismiss button.

## UX rules
- Toasts confirm what just happened ("Saved"). They are not for errors the user must act on: put those inline, next to the cause.
- Never put the only copy of important information in a toast. It disappears.
