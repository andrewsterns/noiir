# Appearance Properties

Appearance properties control Frame visual styling including background colors, borders, shadows, and visual effects.

## Fill Properties

Fill defines the background appearance of a Frame - supporting solid colors, gradients, images, and advanced fill types.

```tsx
interface FillProps {
  fill?: 
    | SolidFill
    | LinearGradientFill
    | RadialGradientFill
    | ImageFill
    | VideoFill
    | FillArray;
}

type SolidFill = {
  type: 'solid';
  color: string;
  opacity?: number;
};

type LinearGradientFill = {
  type: 'linear-gradient';
  angle: number;
  stops: GradientStop[];
};

type RadialGradientFill = {
  type: 'radial-gradient';
  center?: { x: number; y: number };
  radius?: number;
  stops: GradientStop[];
};

type GradientStop = {
  color: string;
  position: number; // 0-1
  opacity?: number;
};
```

### Solid Fills

```tsx
// Basic solid color
<Frame
  fill={{ type: 'solid', color: 'primary6' }}
  size={{ width: 200, height: 100 }}
>
  Solid blue background
</Frame>

// Solid with opacity
<Frame
  fill={{ 
    type: 'solid', 
    color: '#FF0000',
    opacity: 0.7
  }}
>
  Semi-transparent red
</Frame>

// Theme color usage
<Frame
  fill={{ type: 'solid', color: 'neutral8' }}
>
  Dark background using theme
</Frame>
```

### Linear Gradients

```tsx
// Horizontal gradient
<Frame
  fill={{
    type: 'linear-gradient',
    angle: 90, // degrees
    stops: [
      { color: 'primary6', position: 0 },
      { color: 'secondary6', position: 1 }
    ]
  }}
>
  Blue to purple gradient
</Frame>

// Complex multi-stop gradient
<Frame
  fill={{
    type: 'linear-gradient',
    angle: 45,
    stops: [
      { color: '#FF6B6B', position: 0 },
      { color: '#4ECDC4', position: 0.5 },
      { color: '#45B7D1', position: 1 }
    ]
  }}
>
  Sunset gradient
</Frame>

// Gradient with opacity stops
<Frame
  fill={{
    type: 'linear-gradient',
    angle: 0,
    stops: [
      { color: 'white', position: 0, opacity: 0 },
      { color: 'white', position: 0.5, opacity: 0.8 },
      { color: 'white', position: 1, opacity: 0 }
    ]
  }}
>
  Fade overlay
</Frame>
```

### Radial Gradients

```tsx
// Center radial gradient
<Frame
  fill={{
    type: 'radial-gradient',
    center: { x: 0.5, y: 0.5 }, // Center of frame
    radius: 0.7,
    stops: [
      { color: 'primary6', position: 0 },
      { color: 'transparent', position: 1 }
    ]
  }}
>
  Radial fade from center
</Frame>

// Off-center spotlight effect
<Frame
  fill={{
    type: 'radial-gradient',
    center: { x: 0.2, y: 0.3 },
    radius: 0.5,
    stops: [
      { color: '#FFFFFF', position: 0, opacity: 0.9 },
      { color: '#FFFFFF', position: 0.3, opacity: 0.4 },
      { color: 'transparent', position: 1 }
    ]
  }}
>
  Spotlight effect
</Frame>
```

### Image Fills

```tsx
// Background image
<Frame
  fill={{
    type: 'image',
    src: '/path/to/image.jpg',
    fit: 'cover', // 'cover' | 'contain' | 'fill' | 'none'
    position: 'center' // 'center' | 'top' | 'bottom' | custom
  }}
  size={{ width: 400, height: 300 }}
>
  Content over image
</Frame>

// Image with overlay
<Frame
  fill={[
    {
      type: 'image',
      src: '/hero-bg.jpg',
      fit: 'cover'
    },
    {
      type: 'solid',
      color: 'black',
      opacity: 0.4
    }
  ]}
>
  Image with dark overlay
</Frame>
```

### Multiple Fills

```tsx
// Layered fills (bottom to top)
<Frame
  fill={[
    // Base gradient
    {
      type: 'linear-gradient',
      angle: 45,
      stops: [
        { color: 'primary6', position: 0 },
        { color: 'secondary6', position: 1 }
      ]
    },
    // Noise texture overlay
    {
      type: 'image',
      src: '/noise-texture.png',
      opacity: 0.1
    },
    // Subtle highlight
    {
      type: 'linear-gradient',
      angle: 180,
      stops: [
        { color: 'white', position: 0, opacity: 0.1 },
        { color: 'transparent', position: 0.5 }
      ]
    }
  ]}
>
  Complex layered background
</Frame>
```

## Stroke Properties

Stroke defines borders and outlines around Frames.

```tsx
interface StrokeProps {
  stroke?: {
    color: string;
    weight: number;
    style?: 'solid' | 'dashed' | 'dotted';
    sides?: 'all' | 'top' | 'right' | 'bottom' | 'left' | string[];
    opacity?: number;
  };
}
```

### Basic Strokes

```tsx
// Simple border
<Frame
  stroke={{ color: 'neutral4', weight: 1 }}
  size={{ width: 200, height: 100 }}
>
  Basic border
</Frame>

// Thick colored border
<Frame
  stroke={{ 
    color: 'primary6', 
    weight: 3,
    style: 'solid'
  }}
>
  Thick blue border
</Frame>

// Dashed border
<Frame
  stroke={{ 
    color: 'warning6', 
    weight: 2,
    style: 'dashed'
  }}
>
  Dashed border
</Frame>
```

### Selective Sides

```tsx
// Bottom border only
<Frame
  stroke={{ 
    color: 'neutral3', 
    weight: 1,
    sides: 'bottom'
  }}
>
  Bottom border only
</Frame>

// Multiple sides
<Frame
  stroke={{ 
    color: 'neutral4', 
    weight: 1,
    sides: ['top', 'bottom']
  }}
>
  Top and bottom borders
</Frame>

// Custom side configuration
<Frame
  stroke={{ 
    color: 'primary6', 
    weight: 2,
    sides: ['left']
  }}
>
  Left accent border
</Frame>
```

## Border Radius

Control corner rounding for modern, polished appearances.

```tsx
interface RadiusProps {
  radius?: number | {
    topLeft?: number;
    topRight?: number;
    bottomRight?: number;
    bottomLeft?: number;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    all?: number;
  };
}
```

### Basic Radius

```tsx
// Uniform radius
<Frame
  appearance={{ radius: 8 }}
  fill={{ type: 'solid', color: 'primary6' }}
>
  Rounded corners
</Frame>

// Pill shape
<Frame
  appearance={{ radius: 9999 }}
  size={{ width: 200, height: 40 }}
>
  Pill button
</Frame>

// Circle
<Frame
  appearance={{ radius: 50 }}
  size={{ width: 100, height: 100 }}
>
  Circle
</Frame>
```

### Individual Corner Radius

```tsx
// Custom corner radius
<Frame
  appearance={{
    radius: {
      topLeft: 0,
      topRight: 16,
      bottomRight: 0,
      bottomLeft: 16
    }
  }}
>
  Custom corner styling
</Frame>

// Speech bubble effect
<Frame
  appearance={{
    radius: {
      topLeft: 16,
      topRight: 16,
      bottomRight: 4,
      bottomLeft: 16
    }
  }}
>
  Speech bubble
</Frame>
```

## Opacity and Blend Modes

Control transparency and how Frames interact with underlying content.

```tsx
interface OpacityProps {
  opacity?: number; // 0-1
  blendMode?: 
    | 'normal' | 'multiply' | 'screen' | 'overlay'
    | 'darken' | 'lighten' | 'color-dodge' | 'color-burn'
    | 'hard-light' | 'soft-light' | 'difference' | 'exclusion';
}
```

### Opacity Control

```tsx
// Semi-transparent overlay
<Frame
  fill={{ type: 'solid', color: 'black' }}
  appearance={{ opacity: 0.5 }}
  position={{ 
    type: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0
  }}
>
  Modal overlay
</Frame>

// Fade states
<Frame
  appearance={{ 
    opacity: isVisible ? 1 : 0.3
  }}
  // Will animate smoothly with CSS transitions
>
  Fadeable content
</Frame>
```

### Blend Modes

```tsx
// Overlay blend for interesting effects
<Frame
  fill={{ type: 'solid', color: 'primary6' }}
  appearance={{ 
    opacity: 0.8,
    blendMode: 'overlay'
  }}
>
  Overlay blend effect
</Frame>

// Multiply for darkening
<Frame
  fill={{ type: 'solid', color: 'primary6' }}
  appearance={{ blendMode: 'multiply' }}
>
  Multiply blend
</Frame>
```

## Real-World Appearance Examples

### Card with Elevation

```tsx
<Frame
  fill={{ type: 'solid', color: 'white' }}
  appearance={{ radius: 12 }}
  stroke={{ color: 'neutral2', weight: 1 }}
  effects={[
    { 
      type: 'drop-shadow',
      blur: 8,
      offset: { x: 0, y: 2 },
      color: 'rgba(0,0,0,0.1)'
    }
  ]}
  size={{ width: 320, height: 200 }}
>
  Elevated card design
</Frame>
```

### Glassmorphism Effect

```tsx
<Frame
  fill={{ 
    type: 'solid', 
    color: 'white',
    opacity: 0.1
  }}
  appearance={{ 
    radius: 16,
    backdrop: { blur: 10 }
  }}
  stroke={{ 
    color: 'white',
    weight: 1,
    opacity: 0.2
  }}
>
  Glassmorphism panel
</Frame>
```

### Button States

```tsx
const ButtonStates = () => (
  <>
    {/* Default state */}
    <Frame
      fill={{ type: 'solid', color: 'primary6' }}
      appearance={{ radius: 8 }}
      size={{ width: 'hug', height: 'hug' }}
      autoLayout={{ padding: { horizontal: 16, vertical: 12 } }}
    >
      Default Button
    </Frame>
    
    {/* Hover state */}
    <Frame
      fill={{ type: 'solid', color: 'primary7' }}
      appearance={{ radius: 8 }}
      effects={[
        { 
          type: 'drop-shadow',
          blur: 4,
          offset: { x: 0, y: 2 },
          color: 'rgba(0,0,0,0.15)'
        }
      ]}
    >
      Hover Button
    </Frame>
    
    {/* Disabled state */}
    <Frame
      fill={{ type: 'solid', color: 'neutral4' }}
      appearance={{ 
        radius: 8,
        opacity: 0.6
      }}
    >
      Disabled Button
    </Frame>
  </>
);
```

### Progress Indicator

```tsx
const ProgressBar = ({ progress = 0.4 }) => (
  <Frame
    size={{ width: 300, height: 8 }}
    fill={{ type: 'solid', color: 'neutral3' }}
    appearance={{ radius: 4 }}
  >
    <Frame
      size={{ width: `${progress * 100}%`, height: '100%' }}
      fill={{
        type: 'linear-gradient',
        angle: 90,
        stops: [
          { color: 'success6', position: 0 },
          { color: 'success7', position: 1 }
        ]
      }}
      appearance={{ radius: 4 }}
    />
  </Frame>
);
```

### Avatar with Status

```tsx
<Frame
  size={{ width: 64, height: 64 }}
  appearance={{ radius: 32 }}
  fill={{
    type: 'image',
    src: '/user-avatar.jpg',
    fit: 'cover'
  }}
  stroke={{ color: 'white', weight: 3 }}
  position={{ type: 'relative' }}
>
  {/* Status indicator */}
  <Frame
    size={{ width: 18, height: 18 }}
    fill={{ type: 'solid', color: 'success6' }}
    appearance={{ radius: 9 }}
    stroke={{ color: 'white', weight: 2 }}
    position={{ 
      type: 'absolute',
      bottom: 2,
      right: 2
    }}
  />
</Frame>
```

## Performance Considerations

### Efficient Gradients

```tsx
// ✅ Good - Simple gradients
fill={{
  type: 'linear-gradient',
  angle: 90,
  stops: [
    { color: 'primary6', position: 0 },
    { color: 'primary8', position: 1 }
  ]
}}

// ❌ Avoid - Complex gradients with many stops
fill={{
  type: 'radial-gradient',
  stops: Array.from({ length: 20 }, (_, i) => ({
    color: `hsl(${i * 18}, 70%, 50%)`,
    position: i / 19
  }))
}}
```

### Image Optimization

```tsx
// ✅ Good - Optimized images with proper sizing
fill={{
  type: 'image',
  src: '/optimized-bg-400w.webp',
  fit: 'cover'
}}

// ❌ Avoid - Large unoptimized images
fill={{
  type: 'image',
  src: '/huge-unoptimized-image.png',
  fit: 'cover'
}}
```

## Animation with Appearance

Appearance properties animate beautifully:

```tsx
<Frame
  animate={{
    trigger: 'hover',
    duration: '0.3s',
    timeline: {
      '@0s': {
        fill: { type: 'solid', color: 'primary6' },
        appearance: { radius: 8, opacity: 1 }
      },
      '@0.3s': {
        fill: { type: 'solid', color: 'primary7' },
        appearance: { radius: 12, opacity: 0.9 }
      }
    }
  }}
>
  Animated appearance changes
</Frame>
```

## Common Appearance Patterns

### Status Indicators

```tsx
const StatusBadge = ({ status }) => {
  const statusConfig = {
    success: { color: 'success6', text: 'Active' },
    warning: { color: 'warning6', text: 'Pending' },
    error: { color: 'error6', text: 'Error' }
  };
  
  return (
    <Frame
      fill={{ type: 'solid', color: statusConfig[status].color }}
      appearance={{ radius: 12 }}
      size={{ width: 'hug', height: 'hug' }}
      autoLayout={{ padding: { horizontal: 8, vertical: 4 } }}
      typography={{ fontSize: 12, fontWeight: 500, color: 'white' }}
    >
      {statusConfig[status].text}
    </Frame>
  );
};
```

### Loading States

```tsx
const LoadingSkeleton = () => (
  <Frame
    fill={{
      type: 'linear-gradient',
      angle: 90,
      stops: [
        { color: 'neutral2', position: 0 },
        { color: 'neutral3', position: 0.5 },
        { color: 'neutral2', position: 1 }
      ]
    }}
    appearance={{ radius: 4 }}
    animate={{
      trigger: 'auto',
      duration: '1.5s',
      repeat: 'infinite',
      timeline: {
        '@0s': { fill: { /* gradient position 1 */ } },
        '@1.5s': { fill: { /* gradient position 2 */ } }
      }
    }}
  />
);
```

Appearance properties provide the visual foundation for creating beautiful, modern interfaces with sophisticated styling and smooth interactive feedback.