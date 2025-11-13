# Documentation

This folder contains comprehensive documentation for the Noiir design system.

## Overview

Noiir is a React component framework that mirrors Figma design properties with Frame-based components. This documentation covers architecture, usage, development, and advanced features.

## Documentation Structure

### 📖 Core Documentation

- **[NOIIR.md](./NOIIR.md)** - Designer-friendly syntax and compilation system
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Component architecture and design principles
- **[ANIMATION_ACTIONS.md](./ANIMATION_ACTIONS.md)** - Animation system and actions reference

### 🎨 Design System

- **[CSS_UNITS.md](./CSS_UNITS.md)** - CSS units and measurement system
- **[INDIVIDUAL_STROKES.md](./INDIVIDUAL_STROKES.md)** - Individual stroke properties

### 🏗️ Frame Properties

Located in `docs/frame/`:
- **Layout properties** - Auto-layout, positioning, sizing
- **Appearance properties** - Fill, stroke, effects, cursors
- **Typography properties** - Text styling and fonts
- **Animation properties** - Transitions and state changes

## Quick Start

### Installation
```bash
npm install @noiir/core
```

### Basic Usage
```tsx
import { Frame, Button } from '@noiir/core';

function App() {
  return (
    <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
      <Button variant="primary">Hello Noiir</Button>
    </Frame>
  );
}
```

## Key Concepts

### Frame Component
The foundation of all Noiir components - mirrors Figma's frame properties:

```tsx
<Frame
  fill={{ type: 'solid', color: 'primary5' }}
  autoLayout={{ flow: 'horizontal', gap: 16 }}
  appearance={{ cornerRadius: 8 }}
  effects={{ type: 'drop-shadow', blur: 8 }}
/>
```

### Component Hierarchy
```
Frame Props (animate, appearance, layout, etc.)
    ↓
Frame Component
    ↓
Specific Components (Button, Input, etc.)
    ↓
Component Variants
```

### Variant System
Type-safe style configurations:

```tsx
import { buttonVariants } from '@noiir/core/variants';

<Button variant="primary" />
<Button variant={buttonVariants.secondary} />
```

## Development

### Project Structure
```
noiir/
├── __frame-core__/     # Core properties and utilities
├── __components__/     # React components
├── __variants__/       # Variants and themes
├── __stories__/        # Storybook stories
├── docs/              # This documentation
└── dist/              # Build output
```

### Building
```bash
npm run build          # Build package
npm run storybook      # Run Storybook
npm run build:noiir    # Compile .noiir files
```

## Advanced Topics

### Animation System
Noiir includes a powerful animation system for state-based transitions:

```tsx
<Frame animate={{
  hover: 'hover-variant',
  active: 'active-variant'
}} />
```

### Mask Component
Advanced clipping with rectangular and SVG path support:

```tsx
<Mask appearance={{ cornerRadius: 16 }}>
  <Frame fill={{ type: 'image', image: { src: '/photo.jpg' } }} />
</Mask>
```

### Group Component
Organizational container for animation hierarchies:

```tsx
<Group animate={{ hover: 'scale-105' }}>
  <Button>Animated Button</Button>
</Group>
```

## API Reference

### Main Exports
- `Frame` - Core component with all design properties
- `Button`, `Input`, `Card`, etc. - Specific components
- `Group`, `Mask` - Layout and effects components

### Entry Points
- `@noiir/core` - Everything
- `@noiir/core/components` - Components only
- `@noiir/core/variants` - Variants and themes
- `@noiir/core/frame-core` - Core properties

## Contributing

When contributing to Noiir:

1. Update relevant documentation
2. Add Storybook stories for new components
3. Follow the established architecture patterns
4. Test across different use cases

## Resources

- **Storybook**: Interactive component documentation
- **GitHub**: Source code and issues
- **NPM**: Package registry

---

For more detailed information, see the individual documentation files in this folder.