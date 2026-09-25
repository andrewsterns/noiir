# Spinner

`| / - \`, the terminal spinner. It holds still under reduced motion.

```tsx
<Spinner />                      // decorative (inside a busy Button, next to text)
<Spinner label="Loading nodes" /> // announced: role="status"
```

## UX rules
- Use it for waits under a few seconds. For longer waits, use Progress, or skeletons (`<Lorem />`) shaped like the content that is coming.
