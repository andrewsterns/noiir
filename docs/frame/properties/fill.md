# Fill Properties

Fill properties define background colors, gradients, images, and textures for Frames - providing comprehensive background styling capabilities.

## Fill Types

Fill supports multiple types of backgrounds that can be layered for complex visual effects.

```tsx
type Fill = 
  | SolidFill
  | LinearGradientFill
  | RadialGradientFill
  | ConicGradientFill
  | ImageFill
  | VideoFill
  | PatternFill
  | Fill[];

interface FillProps {
  fill?: Fill;
}
```

## Solid Fills

The most basic fill type for solid color backgrounds.

```tsx
interface SolidFill {
  type: 'solid';
  color: string;
  opacity?: number;
}
```

### Basic Solid Colors

```tsx
// Theme colors
<Frame
  fill={{ type: 'solid', color: 'primary6' }}
  size={{ width: 200, height: 100 }}
>
  Primary color background
</Frame>

// Custom hex colors
<Frame
  fill={{ type: 'solid', color: '#FF6B6B' }}
>
  Custom red background
</Frame>

// RGB/RGBA colors
<Frame
  fill={{ type: 'solid', color: 'rgb(75, 192, 192)' }}
>
  RGB color background
</Frame>

// HSL colors
<Frame
  fill={{ type: 'solid', color: 'hsl(210, 100%, 50%)' }}
>
  HSL blue background
</Frame>
```

### Solid with Opacity

```tsx
// Semi-transparent overlay
<Frame
  fill={{ 
    type: 'solid', 
    color: 'black',
    opacity: 0.5
  }}
  position={{ 
    type: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0
  }}
>
  Modal overlay
</Frame>

// Subtle tint
<Frame
  fill={{ 
    type: 'solid', 
    color: 'primary6',
    opacity: 0.1
  }}
>
  Subtle primary tint
</Frame>
```

## Linear Gradients

Linear gradients create smooth transitions between colors along a straight line.

```tsx
interface LinearGradientFill {
  type: 'linear-gradient';
  angle: number; // Degrees (0-360)
  stops: GradientStop[];
}

interface GradientStop {
  color: string;
  position: number; // 0-1
  opacity?: number;
}
```

### Basic Linear Gradients

```tsx
// Horizontal gradient
<Frame
  fill={{
    type: 'linear-gradient',
    angle: 90,
    stops: [
      { color: 'primary6', position: 0 },
      { color: 'secondary6', position: 1 }
    ]
  }}
>
  Blue to purple gradient
</Frame>

// Vertical gradient
<Frame
  fill={{
    type: 'linear-gradient',
    angle: 0,
    stops: [
      { color: '#FF6B6B', position: 0 },
      { color: '#4ECDC4', position: 1 }
    ]
  }}
>
  Top to bottom gradient
</Frame>

// Diagonal gradient
<Frame
  fill={{
    type: 'linear-gradient',
    angle: 45,
    stops: [
      { color: 'warning6', position: 0 },
      { color: 'error6', position: 1 }
    ]
  }}
>
  Diagonal sunset gradient
</Frame>
```

### Multi-Stop Gradients

```tsx
// Three color gradient
<Frame
  fill={{
    type: 'linear-gradient',
    angle: 135,
    stops: [
      { color: '#667eea', position: 0 },
      { color: '#764ba2', position: 0.5 },
      { color: '#f093fb', position: 1 }
    ]
  }}
>
  Multi-color gradient
</Frame>

// Complex rainbow gradient
<Frame
  fill={{
    type: 'linear-gradient',
    angle: 90,
    stops: [
      { color: '#ff0000', position: 0 },
      { color: '#ff8800', position: 0.17 },
      { color: '#ffff00', position: 0.33 },
      { color: '#00ff00', position: 0.5 },
      { color: '#0088ff', position: 0.67 },
      { color: '#4400ff', position: 0.83 },
      { color: '#8800ff', position: 1 }
    ]
  }}
>
  Rainbow gradient
</Frame>
```

### Gradient with Opacity

```tsx
// Fade to transparent
<Frame
  fill={{
    type: 'linear-gradient',
    angle: 0,
    stops: [
      { color: 'black', position: 0, opacity: 0.8 },
      { color: 'black', position: 1, opacity: 0 }
    ]
  }}
>
  Fade overlay
</Frame>

// Complex opacity transitions
<Frame
  fill={{
    type: 'linear-gradient',
    angle: 90,
    stops: [
      { color: 'primary6', position: 0, opacity: 1 },
      { color: 'primary6', position: 0.3, opacity: 0.7 },
      { color: 'secondary6', position: 0.7, opacity: 0.5 },
      { color: 'secondary6', position: 1, opacity: 0.2 }
    ]
  }}
>
  Gradient opacity fade
</Frame>
```

## Radial Gradients

Radial gradients create circular or elliptical color transitions.

```tsx
interface RadialGradientFill {
  type: 'radial-gradient';
  center?: { x: number; y: number }; // 0-1 coordinates
  radius?: number | { x: number; y: number }; // 0-1 or pixel values
  shape?: 'circle' | 'ellipse';
  stops: GradientStop[];
}
```

### Basic Radial Gradients

```tsx
// Center radial gradient
<Frame
  fill={{
    type: 'radial-gradient',
    center: { x: 0.5, y: 0.5 },
    radius: 0.7,
    stops: [
      { color: 'primary6', position: 0 },
      { color: 'primary8', position: 1 }
    ]
  }}
>
  Center radial gradient
</Frame>

// Off-center gradient
<Frame
  fill={{
    type: 'radial-gradient',
    center: { x: 0.2, y: 0.3 },
    radius: 0.6,
    stops: [
      { color: 'white', position: 0, opacity: 0.9 },
      { color: 'transparent', position: 1 }
    ]
  }}
>
  Spotlight effect
</Frame>

// Elliptical gradient
<Frame
  fill={{
    type: 'radial-gradient',
    center: { x: 0.5, y: 0.5 },
    radius: { x: 0.8, y: 0.4 },
    shape: 'ellipse',
    stops: [
      { color: 'success6', position: 0 },
      { color: 'success8', position: 1 }
    ]
  }}
>
  Elliptical gradient
</Frame>
```

### Advanced Radial Effects

```tsx
// Vignette effect
<Frame
  fill={{
    type: 'radial-gradient',
    center: { x: 0.5, y: 0.5 },
    radius: 1.2,
    stops: [
      { color: 'transparent', position: 0 },
      { color: 'transparent', position: 0.6 },
      { color: 'black', position: 1, opacity: 0.6 }
    ]
  }}
>
  Vignette overlay
</Frame>

// Glow effect
<Frame
  fill={{
    type: 'radial-gradient',
    center: { x: 0.5, y: 0.5 },
    radius: 0.5,
    stops: [
      { color: 'primary6', position: 0, opacity: 0.8 },
      { color: 'primary6', position: 0.3, opacity: 0.4 },
      { color: 'transparent', position: 1 }
    ]
  }}
>
  Glow effect
</Frame>
```

## Conic Gradients

Conic gradients create color transitions around a center point.

```tsx
interface ConicGradientFill {
  type: 'conic-gradient';
  center?: { x: number; y: number };
  startAngle?: number; // Degrees
  stops: GradientStop[];
}
```

### Conic Gradient Examples

```tsx
// Color wheel
<Frame
  fill={{
    type: 'conic-gradient',
    center: { x: 0.5, y: 0.5 },
    startAngle: 0,
    stops: [
      { color: '#ff0000', position: 0 },
      { color: '#ffff00', position: 0.17 },
      { color: '#00ff00', position: 0.33 },
      { color: '#00ffff', position: 0.5 },
      { color: '#0000ff', position: 0.67 },
      { color: '#ff00ff', position: 0.83 },
      { color: '#ff0000', position: 1 }
    ]
  }}
  size={{ width: 200, height: 200 }}
  appearance={{ radius: 100 }}
>
  Color wheel
</Frame>

// Progress indicator
<Frame
  fill={{
    type: 'conic-gradient',
    center: { x: 0.5, y: 0.5 },
    startAngle: -90, // Start from top
    stops: [
      { color: 'success6', position: 0 },
      { color: 'success6', position: 0.75 }, // 75% complete
      { color: 'neutral3', position: 0.75 },
      { color: 'neutral3', position: 1 }
    ]
  }}
  size={{ width: 100, height: 100 }}
  appearance={{ radius: 50 }}
>
  75% Complete
</Frame>
```

## Image Fills

Use images as backgrounds with various sizing and positioning options.

```tsx
interface ImageFill {
  type: 'image';
  src: string;
  alt?: string;
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  position?: string | { x: number; y: number };
  repeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
  opacity?: number;
}
```

### Basic Image Fills

```tsx
// Cover image (default)
<Frame
  fill={{
    type: 'image',
    src: '/hero-background.jpg',
    alt: 'Hero background',
    fit: 'cover'
  }}
  size={{ width: 400, height: 300 }}
>
  Content over image
</Frame>

// Contain image
<Frame
  fill={{
    type: 'image',
    src: '/logo.png',
    fit: 'contain',
    position: 'center'
  }}
  size={{ width: 200, height: 200 }}
>
  Logo background
</Frame>

// Positioned image
<Frame
  fill={{
    type: 'image',
    src: '/pattern.jpg',
    fit: 'cover',
    position: { x: 0.3, y: 0.7 } // 30% from left, 70% from top
  }}
>
  Positioned background
</Frame>
```

### Image with Overlays

```tsx
// Image with color overlay
<Frame
  fill={[
    // Base image
    {
      type: 'image',
      src: '/dark-texture.jpg',
      fit: 'cover'
    },
    // Color overlay
    {
      type: 'solid',
      color: 'primary6',
      opacity: 0.7
    }
  ]}
>
  Image with colored overlay
</Frame>

// Image with gradient overlay
<Frame
  fill={[
    {
      type: 'image',
      src: '/hero-bg.jpg',
      fit: 'cover'
    },
    {
      type: 'linear-gradient',
      angle: 0,
      stops: [
        { color: 'black', position: 0, opacity: 0 },
        { color: 'black', position: 1, opacity: 0.6 }
      ]
    }
  ]}
>
  Image with gradient overlay
</Frame>
```

### Repeating Patterns

```tsx
// Tiled pattern
<Frame
  fill={{
    type: 'image',
    src: '/tile-pattern.png',
    fit: 'none',
    repeat: 'repeat'
  }}
>
  Tiled pattern background
</Frame>

// Horizontal stripe
<Frame
  fill={{
    type: 'image',
    src: '/horizontal-stripe.png',
    fit: 'none',
    repeat: 'repeat-x'
  }}
>
  Horizontal repeating pattern
</Frame>
```

## Video Fills

Use videos as dynamic backgrounds.

```tsx
interface VideoFill {
  type: 'video';
  src: string | string[];
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  fit?: 'cover' | 'contain' | 'fill';
  opacity?: number;
}
```

### Video Background

```tsx
// Looping video background
<Frame
  fill={{
    type: 'video',
    src: ['/background-video.mp4', '/background-video.webm'],
    poster: '/video-poster.jpg',
    autoplay: true,
    loop: true,
    muted: true,
    fit: 'cover'
  }}
  size={{ width: '100%', height: 400 }}
>
  Content over video background
</Frame>

// Video with overlay
<Frame
  fill={[
    {
      type: 'video',
      src: '/ambient-video.mp4',
      autoplay: true,
      loop: true,
      muted: true,
      fit: 'cover'
    },
    {
      type: 'solid',
      color: 'black',
      opacity: 0.3
    }
  ]}
>
  Video with dark overlay
</Frame>
```

## Pattern Fills

Procedural patterns and textures.

```tsx
interface PatternFill {
  type: 'pattern';
  pattern: 'dots' | 'lines' | 'grid' | 'noise' | 'waves';
  color?: string;
  backgroundColor?: string;
  size?: number;
  spacing?: number;
  opacity?: number;
}
```

### Procedural Patterns

```tsx
// Dot pattern
<Frame
  fill={{
    type: 'pattern',
    pattern: 'dots',
    color: 'primary6',
    backgroundColor: 'white',
    size: 4,
    spacing: 20,
    opacity: 0.6
  }}
>
  Dot pattern background
</Frame>

// Line pattern
<Frame
  fill={{
    type: 'pattern',
    pattern: 'lines',
    color: 'neutral4',
    backgroundColor: 'neutral1',
    size: 1,
    spacing: 8
  }}
>
  Striped background
</Frame>

// Grid pattern
<Frame
  fill={{
    type: 'pattern',
    pattern: 'grid',
    color: 'neutral3',
    backgroundColor: 'white',
    size: 1,
    spacing: 24
  }}
>
  Grid paper background
</Frame>
```

## Multiple Fills (Layering)

Layer multiple fills for complex visual effects.

```tsx
// Complex layered background
<Frame
  fill={[
    // Base gradient
    {
      type: 'linear-gradient',
      angle: 45,
      stops: [
        { color: '#667eea', position: 0 },
        { color: '#764ba2', position: 1 }
      ]
    },
    // Noise texture
    {
      type: 'pattern',
      pattern: 'noise',
      opacity: 0.1
    },
    // Subtle highlight
    {
      type: 'radial-gradient',
      center: { x: 0.3, y: 0.2 },
      radius: 0.6,
      stops: [
        { color: 'white', position: 0, opacity: 0.1 },
        { color: 'transparent', position: 1 }
      ]
    }
  ]}
>
  Complex layered background
</Frame>
```

## Real-World Fill Examples

### Hero Section

```tsx
const HeroSection = () => (
  <Frame
    size={{ width: '100%', height: '60vh' }}
    fill={[
      // Background image
      {
        type: 'image',
        src: '/hero-background.jpg',
        fit: 'cover',
        position: 'center'
      },
      // Dark overlay for text readability
      {
        type: 'linear-gradient',
        angle: 0,
        stops: [
          { color: 'black', position: 0, opacity: 0.3 },
          { color: 'black', position: 1, opacity: 0.7 }
        ]
      }
    ]}
    autoLayout={{ 
      alignment: 'center',
      padding: 40
    }}
  >
    <Frame
      typography={{
        preset: 'h1',
        color: 'white',
        textAlign: 'center'
      }}
    >
      Welcome to Our Platform
    </Frame>
  </Frame>
);
```

### Card Collection

```tsx
const GradientCard = ({ title, gradient }) => (
  <Frame
    size={{ width: 280, height: 200 }}
    fill={{
      type: 'linear-gradient',
      angle: gradient.angle,
      stops: gradient.stops
    }}
    appearance={{ radius: 16 }}
    autoLayout={{ 
      alignment: 'bottom-left',
      padding: 24
    }}
  >
    <Frame
      typography={{
        preset: 'h3',
        color: 'white',
        fontWeight: 600,
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}
    >
      {title}
    </Frame>
  </Frame>
);

// Usage
<Frame autoLayout={{ flow: 'horizontal', gap: 20 }}>
  <GradientCard 
    title="Ocean"
    gradient={{
      angle: 135,
      stops: [
        { color: '#667eea', position: 0 },
        { color: '#764ba2', position: 1 }
      ]
    }}
  />
  <GradientCard 
    title="Sunset"
    gradient={{
      angle: 45,
      stops: [
        { color: '#f093fb', position: 0 },
        { color: '#f5576c', position: 1 }
      ]
    }}
  />
</Frame>
```

### Status Indicators

```tsx
const StatusIndicator = ({ status, children }) => {
  const statusFills = {
    success: {
      type: 'linear-gradient',
      angle: 135,
      stops: [
        { color: 'success5', position: 0 },
        { color: 'success7', position: 1 }
      ]
    },
    warning: {
      type: 'linear-gradient',
      angle: 135,
      stops: [
        { color: 'warning5', position: 0 },
        { color: 'warning7', position: 1 }
      ]
    },
    error: {
      type: 'linear-gradient',
      angle: 135,
      stops: [
        { color: 'error5', position: 0 },
        { color: 'error7', position: 1 }
      ]
    }
  };

  return (
    <Frame
      fill={statusFills[status]}
      appearance={{ radius: 8 }}
      size={{ width: 'hug', height: 'hug' }}
      autoLayout={{ padding: { horizontal: 12, vertical: 6 } }}
      typography={{ color: 'white', fontWeight: 500 }}
    >
      {children}
    </Frame>
  );
};
```

## Performance Considerations

### Gradient Optimization

```tsx
// ✅ Good - Simple gradients
fill={{
  type: 'linear-gradient',
  angle: 90,
  stops: [
    { color: 'primary6', position: 0 },
    { color: 'secondary6', position: 1 }
  ]
}}

// ❌ Avoid - Complex gradients with many stops
fill={{
  type: 'radial-gradient',
  stops: Array.from({ length: 50 }, (_, i) => ({
    color: `hsl(${i * 7}, 70%, 50%)`,
    position: i / 49
  }))
}}
```

### Image Optimization

```tsx
// ✅ Good - Optimized images
fill={{
  type: 'image',
  src: '/hero-bg-1200w.webp', // WebP format, appropriate size
  fit: 'cover'
}}

// ❌ Avoid - Large unoptimized images
fill={{
  type: 'image',
  src: '/huge-original-image.png', // 5MB+ unoptimized image
  fit: 'cover'
}}
```

## Animation with Fill

Fill properties can be smoothly animated:

```tsx
<Frame
  animate={{
    trigger: 'hover',
    duration: '0.5s',
    timeline: {
      '@0s': {
        fill: {
          type: 'linear-gradient',
          angle: 45,
          stops: [
            { color: 'primary6', position: 0 },
            { color: 'secondary6', position: 1 }
          ]
        }
      },
      '@0.5s': {
        fill: {
          type: 'linear-gradient',
          angle: 135,
          stops: [
            { color: 'secondary6', position: 0 },
            { color: 'primary6', position: 1 }
          ]
        }
      }
    }
  }}
>
  Animated gradient background
</Frame>
```

Fill properties provide unlimited creative possibilities for Frame backgrounds, from simple solid colors to complex layered effects with gradients, images, and procedural patterns.