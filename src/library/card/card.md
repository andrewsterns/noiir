# Card

A boxed unit of content: an `<article>` named by its title. With `onClick` or `href`, the whole card lifts and glows on hover and works from the keyboard.

```tsx
<Card title="Node 7" subtitle="Uplink stable" media={<Placeholder ratio="16/9" />}
  actions={<Button size="sm">Open</Button>}>
  <Lorem lines={2} />
</Card>
<Card title={p.name} href={`/products/${p.id}`} />
```

| Prop | |
|---|---|
| `title` / `subtitle` | the title is an h3 and names the article |
| `media` | top slot (Placeholder, image frame) |
| `actions` | bottom-right slot |
| `onClick` / `href` | makes the whole card interactive |

## UX rules
- A clickable card has one destination. If it needs several buttons, don't make the card clickable.
- Keep cards in a set the same height and structure. Use `Grid min`.
