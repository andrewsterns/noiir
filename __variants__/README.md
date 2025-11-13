# __variants__/

This folder contains all variant definitions, theme configurations, and design tokens for the Noiir design system.

## Overview

Variants provide pre-built style configurations that can be applied to components. The variant system enables consistent theming, easy customization, and type-safe styling across all components.

## Structure

### 📁 `atoms/`
Component-specific variants for atomic components:
- **badge/** - Badge style variants
- **button/** - Button style variants (primary, secondary, outline, etc.)
- **input/** - Input field variants
- **label/** - Label and text variants
- **progress-bar/** - Progress indicator variants
- **radio-button/** - Radio button variants
- **...** - Other atomic component variants

### 📁 `molecules/`
Variants for molecular components:
- **card/** - Card container variants
- **dialog/** - Modal and dialog variants
- **dropdown/** - Dropdown menu variants
- **menu/** - Navigation menu variants
- **popup/** - Popup overlay variants
- **search-dropdown/** - Searchable dropdown variants

### 📁 `organism/`
Variants for complex organism components:
- **navbar/** - Navigation bar variants

### 📁 `theme/`
Core theme system and design tokens:
- **colors.ts** - Color palette and resolver functions
- **fonts.ts** - Typography and font definitions
- **colorUtils.ts** - Color manipulation utilities
- **variant.ts** - Core variant system infrastructure
- **icons/** - Icon components and definitions

### 📁 `icons/`
Individual icon components:
- **arrowdown/** - Arrow down icon
- **book/** - Book icon
- **check/** - Check mark icons
- **search/** - Search icon
- **...** - Other icon components

### 📁 `json/`
Reserved for theme configuration files (currently unused)

## Variant System

### How Variants Work

Variants are type-safe style configurations that extend base component styles:

```tsx
// Example button variants
export const buttonVariants = {
  primary: {
    baseStyle: {
      fill: { type: 'solid', color: 'primary5' },
      typography: { fontSize: 16, fontWeight: 600, color: 'white' },
      autoLayout: { paddingHorizontal: 16, paddingVertical: 8 },
      appearance: { cornerRadius: 6 }
    }
  },
  secondary: {
    baseStyle: {
      fill: { type: 'solid', color: 'neutral3' },
      typography: { fontSize: 16, fontWeight: 500, color: 'neutral9' },
      // ... other properties
    }
  }
};
```

### Using Variants

```tsx
import { Button } from '@noiir/core';
import { buttonVariants } from '@noiir/core/variants';

// Use predefined variants
<Button variant="primary">Primary Button</Button>

// Use custom variants
<Button variant={buttonVariants.secondary}>Secondary Button</Button>

// Extend variants
const customVariant = {
  ...buttonVariants.primary,
  baseStyle: {
    ...buttonVariants.primary.baseStyle,
    fill: { type: 'solid', color: 'accent5' }
  }
};
```

## Theme System

### Colors

The theme includes a comprehensive color system:

```tsx
import { colors, resolveColor } from '@noiir/core/theme';

// Use semantic colors
<Frame fill={{ color: colors.primary5 }} />

// Use color resolver for dynamic colors
<Frame fill={{ color: resolveColor('primary5') }} />
```

### Typography

Predefined typography scales:

```tsx
import { typography } from '@noiir/core/theme';

<Frame typography={typography.heading1} />
<Frame typography={typography.body} />
```

## Creating New Variants

When adding new component variants:

1. Create a `.variants.tsx` file in the appropriate component folder
2. Define variants using the `ExtendVariant` type
3. Export the variants object
4. Add exports to the appropriate `index.ts` files
5. Update component prop types to accept the new variants

```tsx
// myComponent.variants.tsx
import { ExtendVariant } from '@noiir/core/frame-core';

export const myComponentVariants: ExtendVariant = {
  default: {
    fill: { type: 'solid', color: 'neutral1' },
    // ... other properties
  },
  highlighted: {
    fill: { type: 'solid', color: 'accent3' },
    // ... other properties
  }
};
```

## Exports

The `index.ts` file centralizes all variant exports:

```tsx
// Import all variants
import { buttonVariants, inputVariants, colors } from '@noiir/core/variants';

// Import specific categories
import { colors, typography } from '@noiir/core/theme';
import { buttonVariants } from '@noiir/core/variants/atoms/button';
```