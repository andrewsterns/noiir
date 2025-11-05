# Reorganization Migration Guide

## Overview
This document describes the new folder structure and how to update your imports.

## New Structure

```
noiir/
├── __stories__/              # All Storybook stories (previously scattered)
│   ├── atoms/
│   ├── molecules/
│   ├── organism/
│   ├── template/
│   ├── theme/
│   └── frame/
│
├── __variants__/             # All component variants (previously scattered)
│   ├── atoms/
│   ├── molecules/
│   └── organism/
│
├── packages/
│   └── frame-core/          # Standalone frame properties package
│       ├── src/
│       │   ├── appearance/
│       │   ├── effects/
│       │   ├── events/
│       │   ├── layout/
│       │   ├── position/
│       │   ├── typography/
│       │   ├── utils/
│       │   ├── variants/
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
└── src/
    └── components/          # Only component implementations (no stories/variants)
```

## Import Path Updates

### For Variants
**Before:**
```tsx
import { BUTTON_VARIANTS } from './button.variants';
```

**After:**
```tsx
import { BUTTON_VARIANTS } from '@variants/atoms/button/button.variants';
// or
import { BUTTON_VARIANTS } from '../../../__variants__/atoms/button/button.variants';
```

### For Stories
Stories now live in `__stories__/` and maintain the same component structure.

**Before:**
```tsx
// Located at: src/components/atoms/button/button.stories.tsx
import { Button } from './button';
```

**After:**
```tsx
// Located at: __stories__/atoms/button/button.stories.tsx
import { Button } from '../../../src/components/atoms/button/button';
```

### For Frame Core Properties
**Before:**
```tsx
import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';
import { LayoutProps } from '../../frame/frame-properties/layout/layout.props';
```

**After:**
```tsx
import { ExtendVariant } from '@noiir/frame-core';
import { LayoutProps } from '@noiir/frame-core';
// or
import { ExtendVariant, LayoutProps } from '@noiir/frame-core';
```

## TypeScript Path Aliases

Added to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@noiir/frame-core": ["./packages/frame-core/src"],
      "@noiir/frame-core/*": ["./packages/frame-core/src/*"],
      "@variants/*": ["./__variants__/*"],
      "@stories/*": ["./__stories__/*"]
    }
  }
}
```

## Benefits

1. **Clear Separation of Concerns**
   - Component logic in `src/components/`
   - Stories in `__stories__/`
   - Variants in `__variants__/`
   - Core properties in `packages/frame-core/`

2. **Reusable Frame Core**
   - Can be published as standalone npm package
   - Other projects can use frame properties without full component library
   - Easier to version and maintain

3. **Better Organization**
   - Easier to find all stories in one place
   - Easier to find all variants in one place
   - Cleaner component folders

4. **Improved Build Process**
   - Can build frame-core independently
   - Storybook configuration cleaner
   - Better tree-shaking potential

## Next Steps

1. Update all import statements in:
   - Component files
   - Story files
   - Variant files
   - Test files

2. Update Storybook configuration to look in `__stories__/`

3. Build frame-core package:
   ```bash
   cd packages/frame-core
   npm install
   npm run build
   ```

4. Test all components and stories to ensure imports work correctly
