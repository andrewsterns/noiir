# Noiir Project Structure - Before & After

## 🔴 BEFORE: Mixed Structure

```
src/components/atoms/button/
├── button.tsx            ← Component
├── button.variants.tsx   ← Variants (mixed in)
└── button.stories.tsx    ← Stories (mixed in)

src/components/frame/frame-properties/
├── appearance/
├── effects/
├── layout/
└── ... (all properties mixed with Frame component)
```

**Problems:**
- 😵 Stories, variants, and components all mixed together
- 🔀 Hard to find all stories or all variants
- 📦 Frame properties couldn't be used independently
- 🚫 No clear package boundaries

---

## 🟢 AFTER: Clean Separation

```
📁 noiir/
│
├── 📘 __stories__/                    ← ALL STORIES HERE
│   ├── atoms/button/
│   │   └── button.stories.tsx
│   ├── molecules/card/
│   │   └── card.stories.tsx
│   └── ...
│
├── 🎨 __variants__/                   ← ALL VARIANTS HERE
│   ├── atoms/button/
│   │   └── button.variants.tsx
│   ├── molecules/card/
│   │   └── card.variants.tsx
│   └── index.ts                       (exports all variants)
│
├── 📦 packages/                       ← REUSABLE PACKAGES
│   └── frame-core/                    ← STANDALONE PACKAGE
│       ├── src/
│       │   ├── appearance/
│       │   ├── effects/
│       │   ├── layout/
│       │   ├── position/
│       │   ├── typography/
│       │   ├── variants/
│       │   └── index.ts
│       ├── package.json               (can publish to npm!)
│       ├── tsconfig.json
│       └── README.md
│
└── 💻 src/                            ← ONLY COMPONENTS
    └── components/
        ├── atoms/button/
        │   └── button.tsx             (just the component!)
        ├── molecules/card/
        │   └── card.tsx
        └── frame/
            └── Frame.tsx
```

---

## 🎯 Import Flow

### Component Implementation
```tsx
// src/components/atoms/button/button.tsx
import { Frame } from '../../frame/Frame';
import { BUTTON_VARIANTS } from '@variants/atoms/button/button.variants';
import { ExtendVariant } from '@noiir/frame-core';
```

### Variant Definition
```tsx
// __variants__/atoms/button/button.variants.tsx
import { ExtendVariant } from '@noiir/frame-core';
import { VARIANT_STYLES } from '../../../src/theme/variant';

export const BUTTON_VARIANTS: ExtendVariant = { ... };
```

### Story Definition
```tsx
// __stories__/atoms/button/button.stories.tsx
import { Button } from '../../../src/components/atoms/button/button';
import { BUTTON_VARIANTS } from '@variants/atoms/button/button.variants';
```

---

## 🎁 Benefits

### 1️⃣ Clear Organization
```
Need to update a story?     → Go to __stories__/
Need to update a variant?   → Go to __variants__/
Need to update component?   → Go to src/components/
```

### 2️⃣ Reusable Package
```
packages/frame-core/ can be:
✅ Published to npm independently
✅ Used in other projects without full component library
✅ Versioned separately
✅ Documented as standalone package
```

### 3️⃣ Better DX
```
TypeScript path aliases:
@noiir/frame-core   → packages/frame-core/src
@variants/*         → __variants__/*
@stories/*          → __stories__/*

Cleaner imports, better autocomplete!
```

### 4️⃣ Scalable Architecture
```
Easy to add more packages:
packages/
├── frame-core/         ✅ Done
├── animation-system/   ← Could add
├── theme-system/       ← Could add
└── form-system/        ← Could add
```

---

## 🚀 Quick Start After Reorganization

### Build frame-core package
```bash
cd packages/frame-core
npm install
npm run build
```

### Find files that need import updates
```bash
.\scripts\find-import-updates.ps1
```

### Update imports in your files
Use the patterns from REORGANIZATION_GUIDE.md

### Test everything
```bash
npm run storybook
npm run build
```

---

## 📊 Files Moved

| Category | Count | New Location |
|----------|-------|--------------|
| Stories | 30+ | `__stories__/` |
| Variants | 12+ | `__variants__/` |
| Frame Props | 17 | `packages/frame-core/src/` |

**Result:** Clean, organized, scalable architecture! 🎉
