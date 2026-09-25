# Panel

A titled box, terminal-window style: `┌─ TITLE ──────┐`. It is a `<section>` named by its title.

```tsx
<Panel title="Status">…</Panel>
<Panel title="Logs" actions={<Button size="sm" kind="ghost">Clear</Button>}>…</Panel>
<Panel title="Inside a card" titleFill="surface">…</Panel>
```

| Prop | |
|---|---|
| `title` | set into the top line; an h2 |
| `actions` | small controls set into the top-right line |
| `titleFill` | background behind the title chip. Match what's behind the panel; default `bg` |

## UX rules
- Panels group related controls. One idea per panel, and titles are nouns ("Network", not "Configure the network").
