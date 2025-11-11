# @noiir/frame-core

Core frame properties and variants for the Noiir design system.

## Overview

Frame-core is the foundational package that provides all the design properties and variants used by the Frame component. This package can be used independently to build custom components or extended to create new design systems.

## What's Included

### Frame Properties
- **Appearance**: Fill, stroke, cursor, radius, and other visual properties
- **Layout**: Auto-layout, flex properties, spacing, sizing
- **Position**: Absolute/relative positioning, z-index
- **Typography**: Font styles, sizes, weights, text properties
- **Effects**: Shadows, blur, opacity, filters
- **Events**: Event handlers and interactions
- **Transitions**: Animation and transition properties

### Variants System
- **ExtendVariant**: Type-safe variant definitions
- **Size Props**: Standardized size system
- **Variant Registry**: Central variant management

## Installation

```bash
npm install @noiir/frame-core
```

## Usage

```tsx
import { 
  ExtendVariant,
  LayoutProps,
  FillProps,
  TypographyProps 
} from '@noiir/frame-core';

// Define component variants
export const MY_VARIANTS: ExtendVariant = {
  primary: {
    fill: { type: 'solid', color: 'primary5' },
    typography: { fontSize: 16, fontWeight: 600 },
    autoLayout: { paddingHorizontal: 16, paddingVertical: 8 }
  }
};
```

## Development

```bash
# Build the package
npm run build

# Watch mode for development
npm run dev
```

## License

MIT
