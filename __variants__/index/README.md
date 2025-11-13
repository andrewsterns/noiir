# __variants__/index

This folder contains barrel files and entry points for all variant modules in the Noiir design system.

## Overview

The variants index provides centralized access to all variant definitions, theme configurations, and design tokens. This ensures consistent theming and easy customization across all components.

## Structure

### 📁 `atoms/`
Individual component variants organized by atomic design:
- **badge/** - Badge component variants
- **button/** - Button style variants (primary, secondary, outline, etc.)
- **input/** - Input field variants
- **...** - Other atomic component variants

### 📁 `molecules/`
Molecular component variants:
- **card/** - Card container variants
- **dialog/** - Modal and dialog variants
- **...** - Other molecular component variants

### 📁 `organisms/`
Complex component variants:
- **navbar/** - Navigation bar variants

### 📁 `theme/`
Core theme system and design tokens:
- **colors.ts** - Color palette and resolver functions
- **fonts.ts** - Typography and font definitions
- **colorUtils.ts** - Color manipulation utilities
- **variant.ts** - Core variant system infrastructure
- **icons/** - Icon components and definitions

## Exports

The `index.ts` file centralizes all variant exports:

```tsx
// Import all variants
import { buttonVariants, inputVariants, colors } from '@noiir/core/variants';

// Import specific categories
import { colors, typography } from '@noiir/core/theme';
import { buttonVariants } from '@noiir/core/variants/atoms/button';

// Import theme utilities
import { resolveColor } from '@noiir/core/theme';
```

## Variant Categories

### Component Variants
Pre-built style configurations for specific components:

```tsx
import { buttonVariants } from '@noiir/core/variants';

<Button variant="primary" />
<Button variant={buttonVariants.secondary} />
```

### Theme Tokens
Core design tokens used across all variants:

```tsx
import { colors, typography } from '@noiir/core/theme';

// Use in custom variants or components
const customVariant = {
  fill: { type: 'solid', color: colors.primary5 },
  typography: typography.body
};
```

### Icon Variants
Icon components with consistent theming:

```tsx
import { ArrowDown, CheckCircle } from '@noiir/core/variants/icons';

<ArrowDown />
<CheckCircle />
```

## Creating New Variants

When adding new component variants:

1. Create a `.variants.tsx` file in the appropriate component folder
2. Define variants using the `ExtendVariant` type
3. Export the variants object
4. Add exports to the appropriate `index.ts` files
5. Update component prop types to accept the new variants

## Theme Integration

Variants automatically integrate with the theme system:

```tsx
// Variants can reference theme colors
const primaryButton = {
  fill: { type: 'solid', color: 'primary5' }, // Uses theme color
  typography: { fontSize: 16, fontWeight: 600 }
};
```

## Development Workflow

1. Define variants in component-specific files
2. Export through index files for easy importing
3. Use variants in components and stories
4. Test variants across different themes
5. Update exports when adding new variants
