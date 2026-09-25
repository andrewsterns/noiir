# Modal

A dialog that powers on like a CRT (`boot`). It is portalled to `<body>`.

```tsx
<Modal open={vm.open} onClose={vm.close} title="Reboot node"
  actions={<><Button kind="ghost" onClick={vm.close}>Cancel</Button><Button kind="primary" onClick={vm.reboot}>Reboot</Button></>}>
  <Text>alpha.grid will drop its sessions for about 40 seconds.</Text>
</Modal>
```

| Prop | |
|---|---|
| `open` / `onClose` | |
| `title` | names the dialog |
| `actions` | footer buttons, right-aligned |
| `size` | `sm` 400 · `md` 560 · `lg` 800 |
| `dismissable` | Escape, ✕ and the backdrop close it; default true |

## Behavior
- Focus moves to the first control inside and is trapped there.
- Escape closes it.
- Page scroll is locked while it is open.
- On close, focus returns to whatever opened it.
- It uses `role="dialog"` with aria-modal.

## UX rules
- Modals are for decisions that block the flow. Everything else goes inline or in a toast.
- The primary button repeats the title's verb ("Reboot"), and Cancel is always there.
- Set `dismissable={false}` only when leaving without an answer would lose data.
