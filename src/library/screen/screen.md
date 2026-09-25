# Screen

The soft CRT tube. Put it at the root once. It scopes the theme, loads the fonts, paints the background with a light vignette, sets phosphor text with a soft glow, and lays faint scanlines over everything in a single overlay.

```tsx
<Screen tint="green">…app…</Screen>
<Screen theme={createTheme({ tint: 'amber', color: { accent: '#7df' } })} flicker>…</Screen>
```

| Prop | Default | |
|---|---|---|
| `tint` | `green` | `green` · `amber` · `white` |
| `theme` | from tint | a full theme from `createTheme()` |
| `scanlines` | `true` | |
| `vignette` | `true` | darkened corners |
| `flicker` | `false` | a faint brightness flicker; off under reduced motion |
| `fonts` | `true` | loads Charis SIL and Space Mono from Google Fonts; `false` to self-host |
| `fullscreen` | `true` | min-height: 100dvh |

## UX rules
- One Screen per app. Nesting a second one re-scopes the theme, which is fine for a preview, but it doubles the scanlines.
- Keep `flicker` off for reading-heavy screens.
