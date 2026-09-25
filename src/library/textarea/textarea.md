# Textarea

A multi-line field. Same props as Input (label, hint, error, value …) plus `minH` (default 96). It resizes vertically.

```tsx
<Textarea label="Message" placeholder="Type a transmission…" hint="Markdown supported" />
```

## UX rules
- Size it for the expected answer: a tall box invites a long one.
- Show a count when there's a limit, and warn before the limit is reached.
