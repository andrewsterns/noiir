# Placeholder

The wireframe box for content that isn't there yet: a crossed-out frame with a label chip, `IMAGE 4:3`.

```tsx
<Placeholder />                       // image, 4:3
<Placeholder kind="video" />          // 16:9
<Placeholder kind="avatar" />         // 48px circle
<Placeholder kind="chart" ratio="21/9" caption="THROUGHPUT" />
<Placeholder kind="block" h={200} />  // hatched area of any size
```

| Kind | Ratio | Pattern |
|---|---|---|
| image | 4/3 | cross |
| video | 16/9 | cross |
| avatar | 1 (48px, round) | cross |
| chart | 16/9 | grid |
| map | 4/3 | dots |
| icon | 1 (24px) | cross |
| block | none | hatch |

It is `role="img"`, labelled "image placeholder" (override with `label`).

## UX rules
- Use real aspect ratios, so the wireframe reserves the space the real content will take.
- Captions name the content ("TEAM PHOTO"), not just its type, whenever you know it.
