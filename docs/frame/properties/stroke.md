# Stroke Properties

Stroke properties define borders, outlines, and edge styling for Frames - providing precise control over border appearance, style, and positioning.

## Basic Stroke Properties

Stroke creates borders around Frames with customizable appearance and positioning.

```tsx
interface StrokeProps {
  stroke?: {
    color: string;
    weight: number;
    style?: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
    sides?: 'all' | 'top' | 'right' | 'bottom' | 'left' | Array<'top' | 'right' | 'bottom' | 'left'>;
    opacity?: number;
    offset?: number;
    dashArray?: number[];
    lineCap?: 'butt' | 'round' | 'square';
    lineJoin?: 'miter' | 'round' | 'bevel';
  };
}
```

## Simple Strokes

### Basic Border Styles

```tsx
// Simple solid border
<Frame
  stroke={{ color: 'neutral4', weight: 1 }}
  size={{ width: 200, height: 100 }}
  fill={{ type: 'solid', color: 'white' }}
>
  Basic border
</Frame>

// Thick border
<Frame
  stroke={{ 
    color: 'primary6', 
    weight: 3,
    style: 'solid'
  }}
  size={{ width: 200, height: 100 }}
>
  Thick primary border
</Frame>

// Subtle border
<Frame
  stroke={{ 
    color: 'neutral2', 
    weight: 1,
    opacity: 0.5
  }}
>
  Subtle semi-transparent border
</Frame>
```

### Border Colors

```tsx
// Theme colors
<Frame stroke={{ color: 'primary6', weight: 2 }}>
  Primary border
</Frame>

<Frame stroke={{ color: 'success6', weight: 2 }}>
  Success border
</Frame>

<Frame stroke={{ color: 'warning6', weight: 2 }}>
  Warning border
</Frame>

<Frame stroke={{ color: 'error6', weight: 2 }}>
  Error border
</Frame>

// Custom colors
<Frame stroke={{ color: '#FF6B6B', weight: 2 }}>
  Custom hex border
</Frame>

<Frame stroke={{ color: 'rgba(0,0,0,0.3)', weight: 1 }}>
  Transparent border
</Frame>
```

## Border Styles

Control the visual appearance of border lines.

### Line Styles

```tsx
// Solid line (default)
<Frame
  stroke={{ 
    color: 'neutral6', 
    weight: 2,
    style: 'solid'
  }}
>
  Solid border
</Frame>

// Dashed line
<Frame
  stroke={{ 
    color: 'primary6', 
    weight: 2,
    style: 'dashed'
  }}
>
  Dashed border
</Frame>

// Dotted line
<Frame
  stroke={{ 
    color: 'secondary6', 
    weight: 2,
    style: 'dotted'
  }}
>
  Dotted border
</Frame>

// Double line
<Frame
  stroke={{ 
    color: 'neutral7', 
    weight: 4,
    style: 'double'
  }}
>
  Double border
</Frame>
```

### 3D Border Effects

```tsx
// Groove effect
<Frame
  stroke={{ 
    color: 'neutral5', 
    weight: 3,
    style: 'groove'
  }}
  fill={{ type: 'solid', color: 'neutral1' }}
>
  Groove border
</Frame>

// Ridge effect
<Frame
  stroke={{ 
    color: 'neutral5', 
    weight: 3,
    style: 'ridge'
  }}
  fill={{ type: 'solid', color: 'neutral1' }}
>
  Ridge border
</Frame>

// Inset effect
<Frame
  stroke={{ 
    color: 'neutral5', 
    weight: 2,
    style: 'inset'
  }}
  fill={{ type: 'solid', color: 'white' }}
>
  Inset border
</Frame>

// Outset effect
<Frame
  stroke={{ 
    color: 'neutral5', 
    weight: 2,
    style: 'outset'
  }}
  fill={{ type: 'solid', color: 'white' }}
>
  Outset border
</Frame>
```

## Custom Dash Patterns

Create custom dashed and dotted patterns.

```tsx
// Custom dash pattern
<Frame
  stroke={{ 
    color: 'primary6', 
    weight: 2,
    style: 'dashed',
    dashArray: [10, 5] // 10px dash, 5px gap
  }}
>
  Custom dash pattern
</Frame>

// Complex dash pattern
<Frame
  stroke={{ 
    color: 'warning6', 
    weight: 3,
    style: 'dashed',
    dashArray: [15, 5, 5, 5] // Long dash, gap, short dash, gap
  }}
>
  Morse code pattern
</Frame>

// Dot pattern
<Frame
  stroke={{ 
    color: 'success6', 
    weight: 2,
    style: 'dotted',
    dashArray: [2, 8] // Small dots with large gaps
  }}
>
  Spaced dots
</Frame>
```

## Line Caps and Joins

Control how line ends and corners are rendered.

```tsx
// Line caps
<Frame
  stroke={{ 
    color: 'primary6', 
    weight: 8,
    style: 'dashed',
    dashArray: [20, 10],
    lineCap: 'butt' // Square ends
  }}
>
  Butt line caps
</Frame>

<Frame
  stroke={{ 
    color: 'primary6', 
    weight: 8,
    style: 'dashed',
    dashArray: [20, 10],
    lineCap: 'round' // Rounded ends
  }}
>
  Round line caps
</Frame>

<Frame
  stroke={{ 
    color: 'primary6', 
    weight: 8,
    style: 'dashed',
    dashArray: [20, 10],
    lineCap: 'square' // Extended square ends
  }}
>
  Square line caps
</Frame>

// Line joins (for corners)
<Frame
  stroke={{ 
    color: 'error6', 
    weight: 6,
    lineJoin: 'miter' // Sharp corners
  }}
  appearance={{ radius: 0 }}
>
  Miter joins
</Frame>

<Frame
  stroke={{ 
    color: 'error6', 
    weight: 6,
    lineJoin: 'round' // Rounded corners
  }}
  appearance={{ radius: 0 }}
>
  Round joins
</Frame>

<Frame
  stroke={{ 
    color: 'error6', 
    weight: 6,
    lineJoin: 'bevel' // Angled corners
  }}
  appearance={{ radius: 0 }}
>
  Bevel joins
</Frame>
```

## Selective Sides

Apply borders to specific sides only.

### Single Sides

```tsx
// Top border only
<Frame
  stroke={{ 
    color: 'primary6', 
    weight: 3,
    sides: 'top'
  }}
  autoLayout={{ padding: 16 }}
>
  Top border only
</Frame>

// Bottom border only
<Frame
  stroke={{ 
    color: 'neutral4', 
    weight: 1,
    sides: 'bottom'
  }}
  autoLayout={{ padding: 16 }}
>
  Bottom border only (underline effect)
</Frame>

// Left accent border
<Frame
  stroke={{ 
    color: 'success6', 
    weight: 4,
    sides: 'left'
  }}
  autoLayout={{ padding: { left: 20, vertical: 16, right: 16 } }}
>
  Left accent border
</Frame>

// Right border
<Frame
  stroke={{ 
    color: 'warning6', 
    weight: 2,
    sides: 'right'
  }}
  autoLayout={{ padding: 16 }}
>
  Right border
</Frame>
```

### Multiple Sides

```tsx
// Top and bottom
<Frame
  stroke={{ 
    color: 'neutral3', 
    weight: 1,
    sides: ['top', 'bottom']
  }}
  autoLayout={{ padding: 16 }}
>
  Top and bottom borders
</Frame>

// Left and right
<Frame
  stroke={{ 
    color: 'primary6', 
    weight: 2,
    sides: ['left', 'right']
  }}
  autoLayout={{ padding: 16 }}
>
  Left and right borders
</Frame>

// Three sides (missing bottom)
<Frame
  stroke={{ 
    color: 'error6', 
    weight: 1,
    sides: ['top', 'left', 'right']
  }}
  autoLayout={{ padding: 16 }}
>
  Three-sided border
</Frame>
```

## Border Offset

Control border positioning relative to the Frame.

```tsx
// Inside border (default)
<Frame
  stroke={{ 
    color: 'primary6', 
    weight: 4,
    offset: 0 // Inside the frame
  }}
  size={{ width: 200, height: 100 }}
  fill={{ type: 'solid', color: 'primary1' }}
>
  Inside border
</Frame>

// Outside border
<Frame
  stroke={{ 
    color: 'secondary6', 
    weight: 4,
    offset: 4 // Outside the frame
  }}
  size={{ width: 200, height: 100 }}
  fill={{ type: 'solid', color: 'secondary1' }}
>
  Outside border
</Frame>

// Centered border
<Frame
  stroke={{ 
    color: 'warning6', 
    weight: 6,
    offset: -3 // Half inside, half outside
  }}
  size={{ width: 200, height: 100 }}
  fill={{ type: 'solid', color: 'warning1' }}
>
  Centered border
</Frame>
```

## Advanced Stroke Patterns

### Gradient Strokes

```tsx
// Gradient border (using multiple frames)
<Frame position={{ type: 'relative' }}>
  {/* Gradient background for border */}
  <Frame
    fill={{
      type: 'linear-gradient',
      angle: 45,
      stops: [
        { color: 'primary6', position: 0 },
        { color: 'secondary6', position: 1 }
      ]
    }}
    appearance={{ radius: 12 }}
    size={{ width: 200, height: 100 }}
  />
  
  {/* Inner content */}
  <Frame
    position={{ 
      type: 'absolute',
      top: 2, left: 2, right: 2, bottom: 2
    }}
    fill={{ type: 'solid', color: 'white' }}
    appearance={{ radius: 10 }}
    autoLayout={{ alignment: 'center' }}
  >
    Gradient border
  </Frame>
</Frame>
```

### Animated Strokes

```tsx
// Animated dashed border
<Frame
  stroke={{ 
    color: 'primary6', 
    weight: 2,
    style: 'dashed',
    dashArray: [10, 10]
  }}
  animate={{
    trigger: 'auto',
    duration: '2s',
    repeat: 'infinite',
    timeline: {
      '@0s': { stroke: { dashOffset: 0 } },
      '@2s': { stroke: { dashOffset: 20 } }
    }
  }}
>
  Marching ants border
</Frame>

// Color changing border
<Frame
  stroke={{ color: 'primary6', weight: 3 }}
  animate={{
    trigger: 'hover',
    duration: '0.3s',
    timeline: {
      '@0s': { stroke: { color: 'primary6' } },
      '@0.3s': { stroke: { color: 'success6' } }
    }
  }}
>
  Color changing border
</Frame>
```

## Real-World Stroke Examples

### Form Input States

```tsx
const InputField = ({ state = 'default', error }) => {
  const stateStyles = {
    default: { color: 'neutral4', weight: 1 },
    focus: { color: 'primary6', weight: 2 },
    error: { color: 'error6', weight: 2 },
    success: { color: 'success6', weight: 2 }
  };

  return (
    <Frame
      size={{ width: 300, height: 44 }}
      fill={{ type: 'solid', color: 'white' }}
      stroke={stateStyles[state]}
      appearance={{ radius: 8 }}
      autoLayout={{ 
        alignment: 'center-left',
        padding: { horizontal: 12 }
      }}
      typography={{ color: 'neutral7' }}
    >
      {error || 'Enter your email...'}
    </Frame>
  );
};

// Usage
<Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
  <InputField state="default" />
  <InputField state="focus" />
  <InputField state="error" error="Invalid email address" />
  <InputField state="success" />
</Frame>
```

### Card Variations

```tsx
const Card = ({ variant = 'default', children }) => {
  const variants = {
    default: { 
      stroke: { color: 'neutral3', weight: 1 },
      fill: { type: 'solid', color: 'white' }
    },
    outlined: { 
      stroke: { color: 'primary6', weight: 2 },
      fill: { type: 'solid', color: 'white' }
    },
    dashed: { 
      stroke: { 
        color: 'neutral4', 
        weight: 1,
        style: 'dashed',
        dashArray: [8, 4]
      },
      fill: { type: 'solid', color: 'neutral1' }
    }
  };

  return (
    <Frame
      size={{ width: 280, height: 200 }}
      appearance={{ radius: 12 }}
      autoLayout={{ padding: 20 }}
      {...variants[variant]}
    >
      {children}
    </Frame>
  );
};
```

### Status Indicators

```tsx
const StatusBox = ({ status, children }) => {
  const statusStyles = {
    info: { 
      stroke: { color: 'primary6', weight: 1, sides: 'left' },
      fill: { type: 'solid', color: 'primary1' }
    },
    success: { 
      stroke: { color: 'success6', weight: 1, sides: 'left' },
      fill: { type: 'solid', color: 'success1' }
    },
    warning: { 
      stroke: { color: 'warning6', weight: 1, sides: 'left' },
      fill: { type: 'solid', color: 'warning1' }
    },
    error: { 
      stroke: { color: 'error6', weight: 1, sides: 'left' },
      fill: { type: 'solid', color: 'error1' }
    }
  };

  return (
    <Frame
      size={{ width: '100%', height: 'hug' }}
      appearance={{ radius: 8 }}
      autoLayout={{ padding: { left: 16, vertical: 12, right: 12 } }}
      {...statusStyles[status]}
    >
      {children}
    </Frame>
  );
};
```

### Navigation Elements

```tsx
const TabButton = ({ active = false, children }) => (
  <Frame
    stroke={{ 
      color: active ? 'primary6' : 'transparent',
      weight: 2,
      sides: 'bottom'
    }}
    autoLayout={{ 
      padding: { horizontal: 16, vertical: 12 }
    }}
    typography={{
      color: active ? 'primary6' : 'neutral6',
      fontWeight: active ? 600 : 400
    }}
  >
    {children}
  </Frame>
);

// Tab bar
<Frame
  stroke={{ color: 'neutral3', weight: 1, sides: 'bottom' }}
  autoLayout={{ flow: 'horizontal', gap: 0 }}
>
  <TabButton active>Dashboard</TabButton>
  <TabButton>Analytics</TabButton>
  <TabButton>Settings</TabButton>
</Frame>
```

### Dividers and Separators

```tsx
// Horizontal divider
<Frame
  size={{ width: '100%', height: 1 }}
  fill={{ type: 'solid', color: 'neutral3' }}
/>

// Vertical divider
<Frame
  size={{ width: 1, height: 40 }}
  fill={{ type: 'solid', color: 'neutral3' }}
/>

// Dashed separator
<Frame
  stroke={{ 
    color: 'neutral4', 
    weight: 1,
    style: 'dashed',
    sides: 'top'
  }}
  autoLayout={{ padding: { top: 20 } }}
>
  Content after dashed separator
</Frame>

// Decorative border
<Frame
  stroke={{ 
    color: 'primary6', 
    weight: 2,
    style: 'dashed',
    dashArray: [3, 3],
    sides: ['top', 'bottom']
  }}
  autoLayout={{ padding: { vertical: 16, horizontal: 24 } }}
  typography={{ textAlign: 'center' }}
>
  Decorative frame
</Frame>
```

## Performance Considerations

### Efficient Strokes

```tsx
// ✅ Good - Simple stroke
stroke={{ color: 'neutral4', weight: 1 }}

// ✅ Good - Selective sides when needed
stroke={{ color: 'primary6', weight: 2, sides: 'bottom' }}

// ❌ Avoid - Overly complex dash patterns
stroke={{ 
  dashArray: [1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1],
  weight: 1
}}
```

### Border vs Box Shadow

```tsx
// ✅ Good - Use stroke for simple borders
stroke={{ color: 'neutral4', weight: 1 }}

// ✅ Good - Use box shadow for complex effects
effects={[
  { 
    type: 'drop-shadow',
    color: 'primary6',
    blur: 0,
    spread: 2,
    inset: true
  }
]}

// ❌ Avoid - Multiple nested frames just for borders
// (Use stroke or effects instead)
```

## Animation with Stroke

Stroke properties can be smoothly animated:

```tsx
<Frame
  stroke={{ color: 'neutral4', weight: 1 }}
  animate={{
    trigger: 'hover',
    duration: '0.2s',
    timeline: {
      '@0s': {
        stroke: { color: 'neutral4', weight: 1 }
      },
      '@0.2s': {
        stroke: { color: 'primary6', weight: 3 }
      }
    }
  }}
>
  Animated border on hover
</Frame>

// Progressive border reveal
<Frame
  stroke={{ 
    color: 'primary6', 
    weight: 2,
    style: 'dashed',
    dashArray: [0, 100] // Start with no visible dashes
  }}
  animate={{
    trigger: 'auto',
    duration: '2s',
    timeline: {
      '@0s': { stroke: { dashArray: [0, 100] } },
      '@2s': { stroke: { dashArray: [100, 0] } }
    }
  }}
>
  Progressive border reveal
</Frame>
```

## Accessibility Considerations

### High Contrast Borders

```tsx
// ✅ Good - Sufficient contrast
<Frame
  fill={{ type: 'solid', color: 'white' }}
  stroke={{ color: 'neutral7', weight: 1 }} // High contrast
>
  Accessible border contrast
</Frame>

// ✅ Good - Focus states
<Frame
  stroke={{ 
    color: focusVisible ? 'primary6' : 'neutral4',
    weight: focusVisible ? 2 : 1
  }}
>
  Accessible focus indicator
</Frame>
```

### Semantic Border Usage

```tsx
// Use borders to convey meaning
const ErrorField = ({ children }) => (
  <Frame
    stroke={{ color: 'error6', weight: 2 }}
    fill={{ type: 'solid', color: 'error1' }}
    appearance={{ radius: 6 }}
    autoLayout={{ padding: 12 }}
  >
    {children}
  </Frame>
);
```

Stroke properties provide comprehensive border control, enabling everything from simple outlines to complex decorative effects and interactive visual feedback.