# Noiir Package Usage Guide

This guide explains how to use the Noiir package after installation.

## Installation

```bash
npm install noiir
# or
yarn add noiir
# or
pnpm add noiir
```

## Import Methods

### Method 1: Main Entry (Recommended for most use cases)

Import everything you need from the main package:

```tsx
import { 
  Frame, 
  Button, 
  Input, 
  Card,
  colors,
  typography,
  buttonVariants
} from 'noiir';
```

**Best for:** Applications using multiple Noiir features

### Method 2: Specific Entry Points (Tree-shaking optimized)

Import from specific modules for better tree-shaking:

```tsx
// Frame and properties only
import { Frame, PositionProps, AutoLayoutProps } from 'noiir/frame';

// Theme only
import { colors, typography, resolveColor } from 'noiir/theme';

// Components only
import { Button, Input, Card } from 'noiir/components';

// Variants only
import { buttonVariants, inputVariants } from 'noiir/variants';
```

**Best for:** Libraries or applications that need minimal bundle size

## Example Usage

### Basic App

```tsx
import React from 'react';
import { Frame, Button } from 'noiir';

export default function App() {
  return (
    <Frame
      autoLayout={{
        flow: 'vertical',
        gap: 16,
        padding: 32,
        alignment: 'center'
      }}
      fill={{ type: 'solid', color: '#f5f5f5' }}
      appearance={{ cornerRadius: 8 }}
    >
      <h1>Welcome to Noiir</h1>
      <Button variant="primary">Get Started</Button>
    </Frame>
  );
}
```

### Using Theme

```tsx
import { Frame, colors } from 'noiir';

function ThemedComponent() {
  return (
    <Frame
      fill={{ type: 'solid', color: colors.primary5 }}
      stroke={{ type: 'solid', color: colors.primary8, weight: 2 }}
    >
      <p style={{ color: colors.neutral1 }}>Themed content</p>
    </Frame>
  );
}
```

### Custom Variants

```tsx
import { Button, buttonVariants } from 'noiir';
import type { ButtonVariant } from 'noiir/variants';

const customVariant: ButtonVariant = {
  ...buttonVariants.primary,
  baseStyle: {
    ...buttonVariants.primary.baseStyle,
    fill: { type: 'solid', color: '#ff6b6b' },
    appearance: { cornerRadius: 20 }
  }
};

function CustomButton() {
  return <Button variant={customVariant}>Custom Button</Button>;
}
```

### Building Layouts

```tsx
import { Frame, Card, Button } from 'noiir';

function Dashboard() {
  return (
    <Frame autoLayout={{ flow: 'vertical', gap: 24, padding: 32 }}>
      {/* Header */}
      <Frame autoLayout={{ 
        flow: 'horizontal', 
        gap: 16,
        distribution: 'space-between',
        alignment: 'center' 
      }}>
        <h1>Dashboard</h1>
        <Button variant="primary">New Item</Button>
      </Frame>

      {/* Content Grid */}
      <Frame autoLayout={{ flow: 'horizontal', gap: 16, wrap: true }}>
        <Card variant="elevated">Card 1</Card>
        <Card variant="elevated">Card 2</Card>
        <Card variant="elevated">Card 3</Card>
      </Frame>
    </Frame>
  );
}
```

### Gradient Backgrounds

```tsx
import { Frame } from 'noiir/frame';

function GradientCard() {
  return (
    <Frame
      fill={{
        type: 'linear-gradient',
        angle: 135,
        stops: [
          { color: '#667eea', position: 0 },
          { color: '#764ba2', position: 1 }
        ]
      }}
      appearance={{ cornerRadius: 16 }}
      effects={{
        type: 'drop-shadow',
        color: 'rgba(0,0,0,0.2)',
        offsetY: 8,
        blur: 16
      }}
      autoLayout={{ padding: 32 }}
    >
      <h2 style={{ color: 'white' }}>Gradient Card</h2>
    </Frame>
  );
}
```

### Responsive Layouts

```tsx
import { Frame } from 'noiir';
import { useState, useEffect } from 'react';

function ResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Frame
      autoLayout={{
        flow: isMobile ? 'vertical' : 'horizontal',
        gap: isMobile ? 16 : 32,
        padding: isMobile ? 16 : 32
      }}
    >
      <Card>Content 1</Card>
      <Card>Content 2</Card>
      <Card>Content 3</Card>
    </Frame>
  );
}
```

## TypeScript

All exports are fully typed:

```tsx
import type {
  FrameProps,
  FillProps,
  AutoLayoutProps,
  AppearanceProps,
  TypographyProps
} from 'noiir/frame';

import type {
  ButtonProps,
  InputProps,
  CardProps
} from 'noiir/components';

import type {
  ButtonVariant,
  InputVariant
} from 'noiir/variants';

interface MyComponentProps {
  layout: AutoLayoutProps;
  fill: FillProps;
}
```

## Next.js Integration

```tsx
// app/layout.tsx or pages/_app.tsx
import 'noiir/dist/styles.css'; // If styles are needed

// app/page.tsx or pages/index.tsx
import { Frame, Button } from 'noiir';

export default function Home() {
  return (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, padding: 32 }}>
      <h1>Next.js + Noiir</h1>
      <Button variant="primary">Click me</Button>
    </Frame>
  );
}
```

## Vite Integration

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Frame, Button } from 'noiir';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Frame autoLayout={{ flow: 'vertical', gap: 16, padding: 32 }}>
      <h1>Vite + Noiir</h1>
      <Button variant="primary">Click me</Button>
    </Frame>
  </React.StrictMode>,
);
```

## Bundle Size Optimization

For minimal bundle size, use specific imports:

```tsx
// Instead of:
import { Button, Input, Card, Dropdown, colors, typography } from 'noiir';

// Use:
import { Button } from 'noiir/components';
import { colors } from 'noiir/theme';

// Or even more specific:
import { Frame } from 'noiir/frame';
```

## API Reference

See [README.md](./README.md) for complete API documentation.

## Examples

Check the `examples/` folder for more usage examples:
- Basic layouts
- Form building
- Dashboard creation
- Animation examples
- Custom theme implementation
