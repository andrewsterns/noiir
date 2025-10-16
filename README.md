# Figma Components Framework

A React component framework that mirrors Figma's design properties and naming conventions, allowing developers to build interfaces using the same mental model as designers working in Figma.

## Features

- 🎨 **Figma-style Properties**: Use the same property names and concepts as Figma
- 🧩 **Component Primitives**: Frame, Text, Rectangle, Ellipse components
- 📐 **Auto Layout**: Flexbox and grid layouts with Figma terminology
- 🎭 **Effects & Fills**: Gradients, shadows, and advanced styling
- 📱 **Responsive**: Built-in support for responsive design patterns
- 🔧 **TypeScript**: Full type support for better developer experience

## Installation

```bash
npm install figma-components-framework
# or
yarn add figma-components-framework
```

## Quick Start

```tsx
import React from 'react';
import { Frame, Text, Rectangle } from 'figma-components-framework';

function App() {
  return (
    <Frame
      autoLayout={{
        flow: 'column',
        gap: 16,
        padding: 24
      }}
      fill={{ color: '#f5f5f5' }}
      cornerRadius={12}
    >
      <Text
        content="Hello Figma!"
        typography={{
          fontSize: 24,
          fontWeight: 'bold'
        }}
        fill={{ color: '#333' }}
      />
      
      <Rectangle
        size={{ width: 200, height: 100 }}
        fill={{ color: '#4F46E5' }}
        cornerRadius={8}
      />
    </Frame>
  );
}
```

## Components

### Frame

The foundation component for layouts, equivalent to a `<div>` with Figma-style properties.

```tsx
<Frame
  autoLayout={{
    flow: 'row', // 'row' | 'column' | 'grid'
    gap: 16,
    padding: 20,
    primaryAxisAlignment: 'center', // main axis
    counterAxisAlignment: 'center'   // cross axis
  }}
  fill={{ color: '#ffffff' }}
  stroke={{ color: '#e1e1e1', weight: 1 }}
  cornerRadius={8}
  effects={{
    dropShadow: {
      x: 0, y: 2, blur: 8, color: 'rgba(0,0,0,0.1)'
    }
  }}
>
  {children}
</Frame>
```

### Text

Text rendering with typography controls.

```tsx
<Text
  content="Your text here"
  typography={{
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: 0.5
  }}
  fill={{ color: '#333333' }}
  autoResize="width" // 'none' | 'width' | 'height' | 'width-and-height'
/>
```

### Rectangle

Basic rectangular shape primitive.

```tsx
<Rectangle
  size={{ width: 200, height: 100 }}
  fill={{
    type: 'gradient',
    gradient: {
      type: 'linear',
      angle: 45,
      stops: [
        { color: '#FF6B6B', position: 0 },
        { color: '#4ECDC4', position: 1 }
      ]
    }
  }}
  cornerRadius={{ topLeft: 8, topRight: 8 }}
/>
```

### Ellipse

Circular shape primitive.

```tsx
<Ellipse
  size={{ width: 48, height: 48 }}
  fill={{ color: '#4F46E5' }}
  effects={{
    dropShadow: {
      x: 0, y: 2, blur: 4, color: 'rgba(79, 70, 229, 0.3)'
    }
  }}
/>
```

## Property Types

### Auto Layout

Control flexbox and grid layouts using Figma terminology:

```tsx
type AutoLayoutProps = {
  flow?: 'row' | 'column' | 'grid';
  gap?: number;
  padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
  primaryAxisAlignment?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  counterAxisAlignment?: 'start' | 'center' | 'end' | 'stretch';
};
```

### Fill Properties

Support for solid colors, gradients, and images:

```tsx
type FillProps = {
  type?: 'solid' | 'gradient' | 'image';
  color?: string;
  gradient?: {
    type: 'linear' | 'radial' | 'angular';
    stops: Array<{ color: string; position: number }>;
    angle?: number;
  };
  image?: {
    url: string;
    scaleMode?: 'fill' | 'fit' | 'crop' | 'tile';
  };
};
```

### Effects

Box shadows and filters:

```tsx
type EffectProps = {
  dropShadow?: {
    x: number; y: number; blur: number; spread?: number; color: string;
  };
  innerShadow?: {
    x: number; y: number; blur: number; spread?: number; color: string;
  };
  blur?: { radius: number };
};
```

### Typography

Text styling properties:

```tsx
type TypographyProps = {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number | 'normal' | 'bold';
  lineHeight?: number | 'normal';
  letterSpacing?: number;
  textDecoration?: 'none' | 'underline' | 'line-through';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
};
```

## Examples

### Card Component

```tsx
<Frame
  autoLayout={{
    flow: 'row',
    gap: 16,
    padding: 20,
    counterAxisAlignment: 'center'
  }}
  fill={{ color: 'white' }}
  stroke={{ color: '#e1e1e1', weight: 1 }}
  cornerRadius={8}
  effects={{
    dropShadow: { x: 0, y: 2, blur: 8, color: 'rgba(0,0,0,0.1)' }
  }}
>
  <Ellipse
    size={{ width: 48, height: 48 }}
    fill={{ color: '#4F46E5' }}
  />
  
  <Frame
    autoLayout={{ flow: 'column', gap: 4 }}
    size={{ width: 'fill-parent' }}
  >
    <Text
      content="John Doe"
      typography={{ fontSize: 16, fontWeight: 600 }}
    />
    <Text
      content="Product Designer"
      typography={{ fontSize: 14 }}
      fill={{ color: '#666' }}
    />
  </Frame>
</Frame>
```

### Button Component

```tsx
<Frame
  autoLayout={{
    flow: 'row',
    padding: { top: 12, right: 24, bottom: 12, left: 24 },
    primaryAxisAlignment: 'center'
  }}
  fill={{ color: '#4F46E5' }}
  cornerRadius={6}
  effects={{
    dropShadow: { x: 0, y: 1, blur: 2, color: 'rgba(0,0,0,0.1)' }
  }}
>
  <Text
    content="Click me"
    typography={{ fontSize: 14, fontWeight: 500 }}
    fill={{ color: 'white' }}
  />
</Frame>
```

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch for changes
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Inspiration

This framework is inspired by Figma's design properties and aims to bridge the gap between design and development by using consistent terminology and concepts.