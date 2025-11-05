# Noiir

A React component framework that mirrors Figma design properties with Frame-based components. Build UIs with the same flexibility and control as Figma, directly in React.

[![npm version](https://img.shields.io/npm/v/noiir.svg)](https://www.npmjs.com/package/noiir)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

✨ **Frame-Based Components** - Every component built on Figma's Frame concept  
🎨 **Complete Design Properties** - Position, auto layout, fill, stroke, effects, typography  
🎯 **Type-Safe** - Full TypeScript support with exported types  
📦 **Tree-Shakeable** - Multiple entry points for optimal bundle size  
🎪 **Variant System** - Pre-built and customizable component variants  
🌈 **Theme Support** - Comprehensive color and typography system  

## Installation

```bash
npm install noiir
```

## Quick Start

```tsx
import { Frame, Button } from 'noiir';

function App() {
  return (
    <Frame
      autoLayout={{ flow: 'vertical', gap: 16, padding: 24 }}
      fill={{ type: 'solid', color: 'primary3' }}
      appearance={{ cornerRadius: 12 }}
    >
      <Button variant="primary">Click me</Button>
    </Frame>
  );
}
```

## Package Exports

Noiir provides multiple entry points for flexibility:

### Main Export (Everything)
```tsx
import { Frame, Button, Input, colors, buttonVariants } from 'noiir';
```

### Frame & Properties
```tsx
import { 
  Frame, 
  PositionProps, 
  AutoLayoutProps, 
  FillProps 
} from 'noiir/frame';
```

### Theme System
```tsx
import { colors, typography, resolveColor } from 'noiir/theme';
```

### Components Only
```tsx
import { Button, Input, Card, Dropdown } from 'noiir/components';
```

### Variants Only
```tsx
import { buttonVariants, inputVariants } from 'noiir/variants';
```

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

### Auto Layout

Noiir supports all Figma auto layout features:

```tsx
// Vertical stack
<Frame autoLayout={{ flow: 'vertical', gap: 8 }}>
  <Button>First</Button>
  <Button>Second</Button>
</Frame>

// Horizontal with space between
<Frame autoLayout={{ 
  flow: 'horizontal', 
  gap: 16,
  distribution: 'space-between' 
}}>
  <Button>Left</Button>
  <Button>Right</Button>
</Frame>

// Freeform (absolute positioning)
<Frame autoLayout={{ flow: 'freeform' }}>
  <Frame position={{ x: 10, y: 20 }}>Positioned</Frame>
</Frame>

// Hug/Fill sizing
<Frame autoLayout={{ 
  flow: 'vertical',
  width: 'hug',  // Fits content
  height: 'fill' // Fills parent
}}>
  <Button>Content</Button>
</Frame>
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
import { Button, Input, Card, Dropdown } from 'noiir/components';

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

// Organisms
<Navbar variant="default">
  <NavbarLogo />
  <NavbarLinks />
</Navbar>
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

## License

MIT

## Contributing

Contributions welcome! Please read our contributing guidelines.

## Support

- Documentation: [Link to docs]
- Issues: [GitHub Issues](https://github.com/yourusername/noiir/issues)
- Discord: [Join our community]
