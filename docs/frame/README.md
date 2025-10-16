# Frame Component

The Frame component is the foundational primitive of the design system - equivalent to Figma's Frame with complete layout, styling, and interaction capabilities.

## Overview

Frame serves as the universal building block for all other components. Just like in Figma, every visual element can be built using Frame properties:

- **Layout Control**: Position, size, auto layout, constraints
- **Visual Styling**: Fill, stroke, appearance, effects  
- **Typography**: Text styling and formatting
- **Interactions**: Click, hover, focus, and animation
- **Responsive**: Constraints and responsive behavior

## Quick Start

```tsx
import { Frame } from '@/components/atoms/frame/Frame';

// Basic Frame
<Frame
  size={{ width: 200, height: 100 }}
  fill={{ type: 'solid', color: 'primary6' }}
  appearance={{ radius: 8 }}
>
  Content goes here
</Frame>

// Complex Frame with multiple properties
<Frame
  position={{ x: 50, y: 25 }}
  size={{ width: 300, height: 200 }}
  fill={{
    type: 'linear-gradient',
    angle: 45,
    stops: [
      { color: 'primary4', position: 0 },
      { color: 'primary8', position: 1 }
    ]
  }}
  stroke={{ color: 'white', weight: 2 }}
  appearance={{ radius: 16, opacity: 0.9 }}
  typography={{ fontSize: 18, fontWeight: 600, color: 'white' }}
  autoLayout={{
    flow: 'vertical',
    alignment: 'center',
    gap: 12,
    padding: { top: 20, right: 24, bottom: 20, left: 24 }
  }}
>
  Advanced Frame
</Frame>
```

## Core Properties

### [Position Properties](./properties/position.md)
Control Frame placement and positioning
```tsx
position={{ x: 100, y: 50, rotation: 45 }}
constraints={{ horizontal: 'left-right', vertical: 'top' }}
```

### [Layout Properties](./properties/layout.md) 
Handle sizing and auto layout behavior
```tsx
size={{ width: 200, height: 'auto' }}
autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}
```

### [Appearance Properties](./properties/appearance.md)
Visual styling like radius, opacity, effects
```tsx
appearance={{ radius: 12, opacity: 0.8, blur: 2 }}
```

### [Typography Properties](./properties/typography.md)
Text styling and formatting
```tsx
typography={{ fontSize: 16, fontWeight: 500, color: 'white' }}
```

### [Fill Properties](./properties/fill.md)
Background colors, gradients, and images
```tsx
fill={{ type: 'solid', color: 'primary6' }}
fill={{ type: 'linear-gradient', angle: 45, stops: [...] }}
```

### [Stroke Properties](./properties/stroke.md)
Border styling and effects
```tsx
stroke={{ color: 'primary8', weight: 2, style: 'solid' }}
```

### [Effects Properties](./properties/effects.md)
Shadows, glows, and other visual effects
```tsx
effects={[
  { type: 'drop-shadow', blur: 8, color: 'rgba(0,0,0,0.2)' }
]}
```

## Property Inheritance

Frame properties follow Figma's inheritance model:

```tsx
// Parent Frame
<Frame
  typography={{ fontSize: 16, color: 'neutral8' }}
  fill={{ type: 'solid', color: 'white' }}
>
  {/* Child inherits typography but can override */}
  <Frame typography={{ fontWeight: 600 }}>
    Bold text (inherits fontSize and color)
  </Frame>
  
  {/* Child with different fill */}
  <Frame fill={{ type: 'solid', color: 'primary6' }}>
    Different background
  </Frame>
</Frame>
```

## Responsive Behavior

Frame supports responsive properties through constraints and breakpoints:

```tsx
<Frame
  size={{
    width: { base: 300, md: 400, lg: 500 },
    height: 200
  }}
  constraints={{
    horizontal: 'left-right', // Stretches horizontally
    vertical: 'top'           // Fixed to top
  }}
>
  Responsive Frame
</Frame>
```

## Performance Considerations

### Efficient Frame Usage

```tsx
// ✅ Good - Minimal properties
<Frame
  size={{ width: 200, height: 100 }}
  fill={{ type: 'solid', color: 'primary6' }}
>
  Efficient Frame
</Frame>

// ✅ Good - Grouped related properties
<Frame
  appearance={{ radius: 8, opacity: 0.9, blur: 1 }}
>
  Grouped properties
</Frame>
```

### Patterns to Avoid

```tsx
// ❌ Avoid - Unnecessary wrapper Frames
<Frame>
  <Frame>
    <Frame>
      Over-nested
    </Frame>
  </Frame>
</Frame>

// ✅ Better - Single Frame with properties
<Frame
  fill={{ type: 'solid', color: 'white' }}
  stroke={{ color: 'neutral4', weight: 1 }}
  appearance={{ radius: 8 }}
>
  Single Frame
</Frame>
```

## Integration with Other Components

Frame serves as the foundation for all other components:

```tsx
// Button is just Frame with presets
const Button = (props) => (
  <Frame
    {...props}
    appearance={{ radius: 8, ...props.appearance }}
    typography={{ fontSize: 16, fontWeight: 500, ...props.typography }}
    interactive={{ role: 'button', ...props.interactive }}
  />
);

// Card is Frame with specific styling
const Card = (props) => (
  <Frame
    {...props}
    fill={{ type: 'solid', color: 'white', ...props.fill }}
    stroke={{ color: 'neutral3', weight: 1, ...props.stroke }}
    appearance={{ radius: 12, ...props.appearance }}
    effects={[
      { type: 'drop-shadow', blur: 8, color: 'rgba(0,0,0,0.1)' },
      ...(props.effects || [])
    ]}
  />
);
```

## Advanced Usage

### Conditional Properties

```tsx
<Frame
  fill={{
    type: 'solid',
    color: isError ? 'error6' : isSuccess ? 'success6' : 'primary6'
  }}
  appearance={{
    radius: size === 'small' ? 4 : size === 'large' ? 16 : 8
  }}
>
  Conditional styling
</Frame>
```

### Dynamic Properties

```tsx
const [hovered, setHovered] = useState(false);

<Frame
  fill={{
    type: hovered ? 'linear-gradient' : 'solid',
    ...(hovered 
      ? { angle: 45, stops: [{ color: 'primary4', position: 0 }, { color: 'primary8', position: 1 }] }
      : { color: 'primary6' }
    )
  }}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
>
  Dynamic hover effect
</Frame>
```

### Composition Patterns

```tsx
// Layout Frame
<Frame
  autoLayout={{ flow: 'vertical', gap: 20, padding: { all: 24 } }}
  appearance={{ radius: 12 }}
  fill={{ type: 'solid', color: 'white' }}
>
  {/* Header */}
  <Frame
    autoLayout={{ flow: 'horizontal', alignment: 'space-between' }}
    size={{ width: '100%' }}
  >
    <Frame typography={{ fontSize: 24, fontWeight: 700 }}>Title</Frame>
    <Frame typography={{ fontSize: 14, color: 'neutral6' }}>Subtitle</Frame>
  </Frame>
  
  {/* Content */}
  <Frame
    autoLayout={{ flow: 'vertical', gap: 12 }}
    size={{ width: '100%' }}
  >
    <Frame>Content item 1</Frame>
    <Frame>Content item 2</Frame>
    <Frame>Content item 3</Frame>
  </Frame>
  
  {/* Footer */}
  <Frame
    autoLayout={{ flow: 'horizontal', gap: 12, alignment: 'right' }}
    size={{ width: '100%' }}
  >
    <Frame fill={{ type: 'solid', color: 'neutral4' }}>Cancel</Frame>
    <Frame fill={{ type: 'solid', color: 'primary6' }}>Confirm</Frame>
  </Frame>
</Frame>
```

## Debugging Frame Properties

### Development Tools

```tsx
// Debug mode shows all applied properties
<Frame
  debug={true}
  size={{ width: 200, height: 100 }}
  fill={{ type: 'solid', color: 'primary6' }}
>
  Debug Frame (shows property values in dev tools)
</Frame>
```

### Property Inspector

```tsx
// Development component to inspect Frame properties
<FramePropertyInspector>
  <Frame
    size={{ width: 200, height: 100 }}
    fill={{ type: 'linear-gradient', angle: 45, stops: [...] }}
    appearance={{ radius: 8, opacity: 0.9 }}
  >
    Inspected Frame
  </Frame>
</FramePropertyInspector>
```

## TypeScript Support

Frame provides complete TypeScript support for all properties:

```tsx
import type { FrameProps } from '@/components/atoms/frame/Frame';

const MyComponent = (props: { variant: 'primary' | 'secondary' }) => {
  const frameProps: FrameProps = {
    size: { width: 200, height: 100 },
    fill: {
      type: 'solid',
      color: props.variant === 'primary' ? 'primary6' : 'secondary6'
    },
    appearance: { radius: 8 }
  };
  
  return <Frame {...frameProps}>TypeScript Frame</Frame>;
};
```

## Browser Support

- **Modern Browsers**: Full support with all features
- **Legacy Browsers**: Graceful degradation for advanced properties
- **Mobile**: Touch-optimized interactions and responsive behavior
- **Accessibility**: Full screen reader and keyboard navigation support

Frame is designed to be the universal foundation that makes building consistent, accessible, and performant interfaces effortless while maintaining the familiar mental model from Figma.