# Quick Start Example

Get started with Noiir in minutes!

## Installation

```bash
npm install noiir
# or
yarn add noiir
# or
pnpm add noiir
```

## Basic Example

```tsx
import { Frame, Button } from 'noiir';

function App() {
  return (
    <Frame
      autoLayout={{
        flow: 'vertical',
        gap: 16,
        padding: 32,
        alignment: 'center'
      }}
      fill={{ type: 'solid', color: '#f5f5f5' }}
      appearance={{ cornerRadius: 12 }}
    >
      <h1>Welcome to Noiir!</h1>
      <Button variant="primary">Get Started</Button>
    </Frame>
  );
}
```

## With Gradient Background

```tsx
import { Frame, Button, Card } from 'noiir';

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
      autoLayout={{ padding: 32, gap: 16, alignment: 'center' }}
    >
      <h2 style={{ color: 'white' }}>Beautiful Gradients</h2>
      <Button variant="secondary">Learn More</Button>
    </Frame>
  );
}
```

## Layout Example

```tsx
import { Frame, Card } from 'noiir';

function Dashboard() {
  return (
    <Frame autoLayout={{ flow: 'vertical', gap: 24, padding: 32 }}>
      {/* Header */}
      <Frame 
        autoLayout={{ 
          flow: 'horizontal',
          gap: 16,
          distribution: 'space-between',
          alignment: 'center'
        }}
      >
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

## Using Theme Colors

```tsx
import { Frame, colors } from 'noiir';

function ThemedComponent() {
  return (
    <Frame
      fill={{ type: 'solid', color: colors.primary5 }}
      stroke={{ type: 'solid', color: colors.primary8, weight: 2 }}
      appearance={{ cornerRadius: 8 }}
      autoLayout={{ padding: 24 }}
    >
      <p style={{ color: colors.neutral1 }}>
        Themed content using Noiir's color system
      </p>
    </Frame>
  );
}
```

## Custom Variants

```tsx
import { Button, buttonVariants } from 'noiir';
import type { ButtonVariant } from 'noiir/variants';

const customButtonVariant: ButtonVariant = {
  ...buttonVariants.primary,
  baseStyle: {
    ...buttonVariants.primary.baseStyle,
    fill: { type: 'solid', color: '#ff6b6b' },
    appearance: { cornerRadius: 20 }
  },
  states: {
    hover: {
      ...buttonVariants.primary.states.hover,
      fill: { type: 'solid', color: '#ff5252' }
    }
  }
};

function CustomButton() {
  return <Button variant={customButtonVariant}>Custom Styled</Button>;
}
```

## Responsive Layout

```tsx
import { Frame, Card } from 'noiir';
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
        padding: isMobile ? 16 : 32,
        alignment: 'stretch'
      }}
    >
      <Card>Content 1</Card>
      <Card>Content 2</Card>
      <Card>Content 3</Card>
    </Frame>
  );
}
```

## Advanced: Position-Based Layout

```tsx
import { Frame } from 'noiir';

function PositionedElements() {
  return (
    <Frame 
      autoLayout={{ flow: 'freeform', width: 400, height: 300 }}
      fill={{ type: 'solid', color: '#f0f0f0' }}
      appearance={{ cornerRadius: 8 }}
    >
      <Frame
        position={{ x: 20, y: 20 }}
        fill={{ type: 'solid', color: 'primary5' }}
        appearance={{ cornerRadius: 4 }}
        autoLayout={{ width: 100, height: 100 }}
      />
      
      <Frame
        position={{ x: 140, y: 60, rotation: 15 }}
        fill={{ type: 'solid', color: 'accent5' }}
        appearance={{ cornerRadius: 4 }}
        autoLayout={{ width: 100, height: 100 }}
      />
    </Frame>
  );
}
```

## Next.js Integration

```tsx
// app/page.tsx or pages/index.tsx
import { Frame, Button, Card } from 'noiir';

export default function Home() {
  return (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, padding: 32 }}>
      <h1>Next.js + Noiir</h1>
      <Card>
        <p>Build beautiful UIs with Figma-like properties!</p>
        <Button variant="primary">Get Started</Button>
      </Card>
    </Frame>
  );
}
```

## Documentation

- 📖 [Full Documentation](./README.md)
- 🎯 [Package Usage Guide](./PACKAGE_USAGE.md)
- 🎨 [Storybook](http://localhost:6006) (run `npm run storybook`)

## TypeScript

Get full type safety:

```tsx
import type { 
  FrameProps, 
  FillProps, 
  AutoLayoutProps 
} from 'noiir/frame';

const fill: FillProps = {
  type: 'linear-gradient',
  angle: 45,
  stops: [
    { color: 'primary3', position: 0 },
    { color: 'primary8', position: 1 }
  ]
};
```

## Support

- 🐛 [Report Issues](https://github.com/yourusername/noiir/issues)
- 💬 [Discussions](https://github.com/yourusername/noiir/discussions)
- 📚 [Documentation](./README.md)

Happy building! 🚀
