# __frame-core__/index

This folder contains barrel files and entry points for all frame-core modules that power the Noiir design system.

## Overview

Frame-core provides the foundational properties and utilities that enable Figma-like design capabilities in React. All components in Noiir are built on top of these core properties.

## Structure

### 📁 `animate/`
Animation and transition properties:
- **animate.props.tsx** - Event-driven variant switching and transitions
- **animate.props.md** - Animation system documentation

### 📁 `appearance/`
Visual styling properties:
- **appearance.props.ts** - Main appearance interface
- **cursor.props.ts** - Cursor style definitions
- **fill.props.ts** - Fill types (solid, gradient, image)
- **stroke.props.ts** - Stroke/border properties

### 📁 `booleanOperation/`
Boolean operations for shapes:
- **booleanOperation.props.ts** - Union, subtract, intersect, exclude operations

### 📁 `effects/`
Visual effects and filters:
- **effects.props.ts** - Shadows, blur, opacity, and other effects

### 📁 `events/`
Event handling properties:
- **event.props.ts** - Event handler definitions

### 📁 `layout/`
Layout and positioning properties:
- **layout.props.ts** - Auto-layout, flex properties, spacing
- **curvedLayout.ts** - Curved layout utilities
- **svgBoundingBox.ts** - SVG bounding box calculations
- **svgPathUtils.ts** - SVG path manipulation utilities

### 📁 `mask/`
Masking and clipping properties:
- **mask.props.ts** - Mask definitions and clipping paths

### 📁 `position/`
Positioning and transform properties:
- **position.props.ts** - Absolute/relative positioning, z-index, transforms

### 📁 `typography/`
Text styling properties:
- **typography.props.ts** - Font styles, sizes, weights, alignment

### 📁 `utils/`
Utility functions and helpers:
- **css-units.ts** - CSS unit conversions and utilities
- **utils.ts** - General utility functions

### 📁 `variants/`
Variant system infrastructure:
- **size.props.tsx** - Standardized size system
- **variants.props.tsx** - Variant definitions and registry

## Core Concepts

### Frame Props
All visual and interactive properties are defined as "Frame Props":

```tsx
interface FrameProps {
  // Layout and positioning
  autoLayout?: AutoLayoutProps;
  position?: PositionProps;

  // Visual styling
  fill?: FillProps;
  stroke?: StrokeProps;
  appearance?: AppearanceProps;

  // Effects and interactions
  effects?: EffectsProps;
  animate?: AnimateProps;

  // Text styling
  typography?: TypographyProps;

  // Advanced features
  mask?: MaskProps;
  booleanOperation?: BooleanOperationProps;
}
```

### Variant System
The variant system enables type-safe, reusable style configurations:

```tsx
import { ExtendVariant } from '@noiir/core/frame-core';

const MY_VARIANTS: ExtendVariant = {
  primary: {
    fill: { type: 'solid', color: 'primary5' },
    typography: { fontSize: 16, fontWeight: 600 },
    autoLayout: { paddingHorizontal: 16, paddingVertical: 8 }
  }
};
```

### Animation System
Built-in support for state-based animations:

```tsx
<Frame
  animate={{
    hover: 'hover-variant',
    active: 'active-variant',
    focus: 'focus-variant'
  }}
/>
```

## Usage

Frame-core is typically used indirectly through components, but can be imported directly for advanced use cases:

```tsx
import {
  FrameProps,
  FillProps,
  AutoLayoutProps,
  AnimateProps
} from '@noiir/core/frame-core';

// For building custom components
interface MyComponentProps extends FrameProps {
  customProp: string;
}
```

## Exports

The `index.ts` file exports all frame-core modules:

```tsx
// Import everything
import { FrameProps, AnimateProps, FillProps } from '@noiir/core/frame-core';

// Import specific modules
import { FillProps } from '@noiir/core/frame-core/appearance/fill.props';
import { AnimateProps } from '@noiir/core/frame-core/animate/animate.props';
```
