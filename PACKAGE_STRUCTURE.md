# NOIIR Package Structure

This document maps the recommended file and import structure for the NOIIR design system package.

## Source Folders

- `__frame-core__/` — Core logic, props, utilities, and context
- `__components__/` — All atomic, molecular, and organism components
- `__variants__/` — Variant definitions, theme, and design tokens
- `__stories__/` — Storybook stories (not published)

## Theme & Design Tokens
- `__variants__/theme/colors.ts` — Color palette and resolver
- `__variants__/theme/fonts.ts` — Font families and resolver
- `__variants__/theme/icons/` — Icon components (SVG/React)

## Example Import Aliases (from tsconfig.json)
```ts
import { Frame } from '@components/frame/Frame';
import { PositionProps } from '@noiir/frame-core/position/position.props';
import { textVariants } from '@variants/atoms/text/text.variants';
import { colors, resolveColor } from '@variants/theme/colors';
import { ArrowUp } from '@variants/theme/icons';
```

## Build Output
- `dist/` — Compiled output, mirrors the source structure

## Publishing
- Only `dist`, `__frame-core__`, `__components__`, `__variants__`, `README.md`, and `LICENSE` are published

## Not Published
- `__stories__`, `storybook-static`, `scripts`, and other build artifacts

---

**Always update imports to use the path aliases and new folder structure for a clean, maintainable codebase.**
