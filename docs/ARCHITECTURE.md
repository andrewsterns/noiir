# Component Architecture Documentation

## Overview

Our design system follows a modular, layered architecture where components are built on top of a flexible [`Frame`](src/components/frame/Frame.tsx ) component. This ensures consistency, reusability, and easy customization across all UI elements.

## Architecture Flow

```
frame-props:
[animate, appearance, layout, effects, position, typography]
    ↧
   frame
    ↧
 component
    ↧
frame-props + componentProps
    ↧
component-variant
```

## Layer Breakdown

### 1. Frame Props
The foundational properties that control all visual and interactive aspects:

- **animate**: Event-driven variant switching (hover, click, etc.)
- **appearance**: Visual styling (fill, stroke, radius, etc.)
- **layout**: Positioning and sizing (autoLayout, width, height, etc.)
- **effects**: Visual effects (shadows, blur, noise, etc.)
- **position**: Absolute positioning (x, y coordinates)
- **typography**: Text styling (font, size, color, alignment, etc.)

### 2. Frame Component
The core building block that:
- Accepts all frame-props
- Renders as a styled HTML element (div, button, etc.)
- Handles animation logic via `useAnimateVariant` hook
- Provides consistent layout and styling foundation

### 3. Component Layer
Individual components (Button, Badge, Card, etc.) that:
- Extend Frame with component-specific props
- Define their own variants using frame-props
- Handle component-specific logic (icons, children, etc.)
- Pass through frame-props to underlying Frame

### 4. Component Variants
Predefined style configurations that:
- Combine frame-props with component-specific settings
- Enable consistent theming across similar components
- Support animation states (hover, active, disabled, etc.)
- Allow easy customization via variant prop

## Example: Button Component

```typescript
// Component Props + Frame Props
interface ButtonProps extends FrameProps {
  variant?: ButtonVariant;
  children: ReactNode;
  // ... component-specific props
}

// Variant Configuration
const BUTTON_VARIANTS: Record<ButtonVariant, ButtonVariantConfig> = {
  primary: {
    fill: { type: 'solid', color: 'black9' },
    typography: { fontSize: 16, fontWeight: 300, color: 'gray4' },
    // ... other frame-props
  },
  // ... other variants
};

// Component Implementation
export const Button = ({ variant = 'primary', ...frameProps }) => {
  const baseVariant = BUTTON_VARIANTS[variant];

  return (
    <Frame
      fill={baseVariant.fill}
      typography={baseVariant.typography}
      // ... spread other frame-props
      {...frameProps}
    >
      {children}
    </Frame>
  );
};
```

## Benefits

- **Consistency**: All components share the same styling foundation
- **Flexibility**: Frame-props allow unlimited customization
- **Modularity**: Components can be easily extended or modified
- **Animation**: Built-in support for interactive states
- **Type Safety**: Full TypeScript support with proper interfaces

## Usage Patterns

```tsx
// Basic component usage
<Button variant="primary">Click me</Button>

// With animation
<Button
  variant="primary"
  animate={{ hover: 'primary-hover', click: 'active' }}
>
  Animated Button
</Button>

// Full customization
<Button
  variant="primary"
  fill={{ type: 'solid', color: 'blue5' }}
  typography={{ fontSize: 18, color: 'white' }}
  appearance={{ radius: 12 }}
>
  Custom Button
</Button>
```

## File Structure

```
src/
├── components/
│   ├── frame/
│   │   ├── Frame.tsx                    # Core Frame component
│   │   └── frame-properties/           # Frame prop definitions
│   │       ├── animate/
│   │       ├── appearance/
│   │       ├── effects/
│   │       ├── layout/
│   │       ├── position/
│   │       └── typography/
│   ├── atoms/
│   │   ├── button/
│   │   │   ├── button.tsx              # Button component
│   │   │   └── button.variants.ts      # Button variants
│   │   └── badge/
│   │       ├── badge.tsx               # Badge component
│   │       └── badge.variants.ts       # Badge variants
│   └── molecules/
│       └── dropdown/
│           └── dropdown.tsx            # Composite components
└── theme/
    ├── colors.ts                       # Color definitions
    └── fonts.ts                        # Typography presets
```

This architecture enables rapid development of consistent, customizable UI components while maintaining a clean separation of concerns.</content>
<parameter name="filePath">c:\Users\andre\noiir\docs\ARCHITECTURE.md