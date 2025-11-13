# Noiir

A React component framework that mirrors Figma design properties with Frame-based components. Build UIs with the same flexibility and control as Figma, directly in React.

[![npm version](https://img.shields.io/npm/v/@noiir/core.svg)](https://www.npmjs.com/package/@noiir/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

✨ **Frame-Based Components** - Every component built on Figma's Frame concept  
🎨 **Complete Design Properties** - Position, auto layout, fill, stroke, effects, typography  
🎯 **Type-Safe** - Full TypeScript support with exported types  
📦 **Tree-Shakeable** - Multiple entry points for optimal bundle size  
🎪 **Variant System** - Pre-built and customizable component variants  
🌈 **Theme Support** - Comprehensive color and typography system  
🎭 **Animation System** - Built-in state-based animations and transitions  
🖼️ **Mask & Group** - Advanced clipping and organizational components  

## Installation

```bash
npm install @noiir/core
```

## Quick Start

```tsx
import { Frame, Button, Group, Mask } from '@noiir/core';

function App() {
  return (
    <Frame
      autoLayout={{ flow: 'vertical', gap: 16, padding: 24 }}
      fill={{ type: 'solid', color: 'primary3' }}
      appearance={{ cornerRadius: 12 }}
    >
      <Group animate={{ hover: 'scale-105' }}>
        <Button variant="primary">Click me</Button>
      </Group>

      <Mask appearance={{ cornerRadius: 8 }}>
        <Frame fill={{ type: 'image', image: { src: '/hero.jpg', scaleMode: 'cover' } }} />
      </Mask>
    </Frame>
  );
}
```

## Project Structure

Noiir follows a modular architecture with clear separation of concerns:

### 📁 `__frame-core__/`
Core frame properties and utilities that power all components:
- **animate/** - Animation and transition properties
- **appearance/** - Fill, stroke, cursor, and visual styling
- **layout/** - Auto-layout, flex properties, spacing, sizing
- **position/** - Absolute/relative positioning, z-index
- **typography/** - Font styles, sizes, weights, text properties
- **effects/** - Shadows, blur, opacity, filters
- **events/** - Event handlers and interactions
- **utils/** - CSS units, utilities, and helpers
- **variants/** - Size props and variant system

### 📁 `__components__/`
All React components organized by atomic design principles:
- **atoms/** - Basic UI elements (Button, Input, Badge, etc.)
- **molecules/** - Composite components (Card, Dropdown, Dialog, etc.)
- **organisms/** - Complex components (Navbar, etc.)
- **frame/** - Core Frame component
- **group/** - Group component for animation organization
- **mask/** - Mask component for clipping functionality

### 📁 `__variants__/`
Variant definitions, theme system, and design tokens:
- **atoms/** - Component-specific variants
- **molecules/** - Composite component variants
- **theme/** - Colors, fonts, icons, and theme utilities
- **index.ts** - Centralized variant exports

### 📁 `__stories__/`
Storybook stories for all components (development only, not published)

### 📁 `docs/`
Comprehensive documentation and guides

## Package Exports

Noiir provides multiple entry points for flexibility and optimal bundle sizes:

### Main Export (Everything)
```tsx
import { Frame, Button, Input, Group, Mask, colors, buttonVariants } from '@noiir/core';
```

### Frame & Core Properties
```tsx
import { 
  Frame, 
  PositionProps, 
  AutoLayoutProps, 
  FillProps,
  AnimateProps,
  EffectsProps
} from '@noiir/core/frame-core';
```

### Components Only
```tsx
import { Button, Input, Card, Dropdown, Group, Mask } from '@noiir/core/components';
```

### Individual Components
```tsx
import { Button } from '@noiir/core/components/Button';
import { Group } from '@noiir/core/components/Group';
import { Mask } from '@noiir/core/components/Mask';
```

### Variants & Theme
```tsx
import { buttonVariants, inputVariants } from '@noiir/core/variants';
import { colors, typography, resolveColor } from '@noiir/core/theme';
```

### Frame-Core Only
```tsx
import { 
  ExtendVariant,
  LayoutProps,
  FillProps,
  TypographyProps 
} from '@noiir/core/frame-core';
```

## Development Workflow

### Project Structure Overview

```
noiir/
├── __frame-core__/          # Core properties and utilities
├── __components__/          # React components (atoms/molecules/organisms)
├── __variants__/           # Variants, themes, and design tokens
├── __stories__/            # Storybook stories (dev only)
├── docs/                   # Documentation
├── dist/                   # Build output (published)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Building from Source

```bash
# Install dependencies
npm install

# Development with watch mode
npm run dev

# Build the package
npm run build

# Run Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

### Architecture Principles

Noiir follows atomic design principles with a layered architecture:

1. **Frame Props** → Foundational design properties
2. **Frame Component** → Core building block
3. **Components** → Specific UI elements
4. **Variants** → Style configurations

All components extend the base `Frame` component, ensuring consistency and enabling unlimited customization through Frame properties.

## Core Concepts

### Frame Component

The `Frame` component is the foundation of Noiir. It mirrors Figma's frame properties:

```tsx
<Frame
  // Position
  position={{ x: 100, y: 50, type: 'absolute' }}
  
  // Auto Layout
  autoLayout={{
    flow: 'horizontal',
    gap: 16,
    padding: 24,
    alignment: 'center',
    distribution: 'space-between'
  }}
  
  // Fill
  fill={{
    type: 'linear-gradient',
    angle: 45,
    stops: [
      { color: 'primary3', position: 0 },
      { color: 'primary8', position: 1 }
    ]
  }}
  
  // Stroke
  stroke={{
    type: 'solid',
    color: 'neutral6',
    weight: 2,
    position: 'inside'
  }}
  
  // Appearance
  appearance={{
    cornerRadius: 12,
    opacity: 0.95
  }}
  
  // Effects
  effects={{
    type: 'drop-shadow',
    color: 'rgba(0,0,0,0.1)',
    offsetX: 0,
    offsetY: 4,
    blur: 8
  }}
  
  // Typography (for text frames)
  typography={{
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center'
  }}
>
  {/* Your content */}
</Frame>
```

### Group Component

The `Group` component is a pure container for organizational and animation purposes. It doesn't render any DOM elements but provides hierarchical targeting for animations:

```tsx
import { Group, Button } from '@noiir/core';

// Group multiple elements for coordinated animations
<Group animate={{ hover: 'scale-105', click: 'scale-95' }}>
  <Button variant="primary">Button 1</Button>
  <Button variant="secondary">Button 2</Button>
</Group>

// Nested groups for complex hierarchies
<Group animate={{ hover: 'fade-in' }}>
  <Group animate={{ click: 'bounce' }}>
    <Button>Animated Button</Button>
  </Group>
</Group>
```

### Mask Component

The `Mask` component provides advanced clipping functionality with rectangular and SVG path support:

```tsx
import { Mask, Frame } from '@noiir/core';

// Rectangular mask with rounded corners
<Mask appearance={{ cornerRadius: 16 }}>
  <Frame fill={{ type: 'image', image: { src: '/photo.jpg', scaleMode: 'cover' } }} />
</Mask>

// SVG path mask
<Mask mask={{
  type: 'path',
  path: 'M50,0 L100,50 L50,100 L0,50 Z' // Diamond shape
}}>
  <Frame fill={{ type: 'solid', color: 'primary5' }} />
</Mask>
```

### Fill Types

```tsx
// Solid color
<Frame fill={{ type: 'solid', color: 'primary5' }} />

// Linear gradient
<Frame fill={{
  type: 'linear-gradient',
  angle: 90,
  stops: [
    { color: '#ff0000', position: 0 },
    { color: '#0000ff', position: 1 }
  ]
}} />

// Radial gradient
<Frame fill={{
  type: 'radial-gradient',
  stops: [
    { color: 'primary3', position: 0 },
    { color: 'primary8', position: 1 }
  ]
}} />

// Image fill
<Frame fill={{
  type: 'image',
  image: {
    src: '/path/to/image.jpg',
    scaleMode: 'fill' // 'fill' | 'fit' | 'crop' | 'tile'
  }
}} />
```

### Theme System

Noiir includes a comprehensive theme system:

```tsx
import { colors, typography } from 'noiir/theme';

// Use theme colors
<Frame fill={{ color: colors.primary5 }} />

// Or use shorthand
<Frame fill={{ color: 'primary5' }} />

// Typography presets
<Frame typography={typography.heading1} />
```

### Components

All components are built on Frame and support variants:

```tsx
import { Button, Input, Card, Dropdown, Group, Mask } from '@noiir/core';

// Atoms
<Button variant="primary">Click me</Button>
<Input variant="outlined" placeholder="Enter text" />
<Toggle variant="default" />
<Slider variant="primary" min={0} max={100} />
<Checkbox variant="default" />
<Avatar variant="circle" src="/avatar.jpg" />
<Badge variant="primary">New</Badge>

// Molecules
<Card variant="elevated">
  <h2>Card Title</h2>
  <p>Card content</p>
</Card>

<Dropdown variant="default" options={options} />
<Dialog variant="centered">Dialog content</Dialog>

// Layout & Effects
<Group animate={{ hover: 'scale-105' }}>
  <Button>Grouped Button</Button>
</Group>

<Mask appearance={{ cornerRadius: 8 }}>
  <Frame fill={{ type: 'image', image: { src: '/image.jpg' } }} />
</Mask>
```

### Custom Variants

Create your own variants:

```tsx
import { buttonVariants } from 'noiir/variants';

const customButton = {
  ...buttonVariants.primary,
  baseStyle: {
    ...buttonVariants.primary.baseStyle,
    fill: { type: 'solid', color: 'accent5' }
  }
};

<Button variant={customButton}>Custom</Button>
```

## TypeScript Support

Noiir is fully typed. Import types for your props:

```tsx
import type { 
  FrameProps, 
  FillProps, 
  AutoLayoutProps 
} from 'noiir/frame';

interface MyComponentProps {
  layout: AutoLayoutProps;
  fill: FillProps;
}
```

## Storybook

View all components in Storybook:

```bash
npm run storybook
```

## Build

Build the package:

```bash
npm run build
```


## License & Commercial Use

Noiir is open source under the MIT License.
Copyright (c) 2025 Andrew Sterns. All rights reserved.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/andrewsterns/noiir.git
cd noiir

# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm test

# Build and test
npm run build
```

## Support

- **Documentation**: See `docs/` folder for detailed guides
- **Storybook**: `npm run storybook` for interactive component docs
- **Issues**: [GitHub Issues](https://github.com/andrewsterns/noiir/issues)
- **Discussions**: [GitHub Discussions](https://github.com/andrewsterns/noiir/discussions)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

---

Built with ❤️ using React, TypeScript, and Figma design principles.
