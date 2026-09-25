# Cursor

A blinking block cursor █. Decorative: hidden from screen readers, and it stops blinking under reduced motion.

```tsx
<Frame as="h1" font="display">NOIIR<Cursor /></Frame>
<Row><Text color="dim">awaiting input</Text><Cursor /></Row>
```

## UX rules
- One per screen, at the place the user should look.
