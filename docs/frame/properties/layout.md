# Layout Properties

Layout properties control Frame sizing, auto layout behavior, and how child elements are arranged - mirroring Figma's layout system.

## Size Properties

### Basic Sizing

```tsx
interface SizeProps {
  width?: number | string | 'auto' | 'hug' | 'fill-container';
  height?: number | string | 'auto' | 'hug' | 'fill-container';
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
}

// Example usage
<Frame
  size={{ 
    width: 200, 
    height: 100,
    minWidth: 150,
    maxWidth: 300 
  }}
  fill={{ type: 'solid', color: 'primary6' }}
>
  Fixed size with constraints
</Frame>
```

### Size Values

```tsx
// Fixed sizes (pixels)
size={{ width: 200, height: 100 }}

// Percentage sizes
size={{ width: '100%', height: '50%' }}

// Auto sizing (content-driven)
size={{ width: 'auto', height: 'auto' }}

// Hug content (Figma terminology)
size={{ width: 'hug', height: 'hug' }}

// Fill container
size={{ width: 'fill-container', height: 'fill-container' }}

// Mixed sizing
size={{ width: 300, height: 'auto' }}
```

### Responsive Sizing

```tsx
// Responsive breakpoint sizing
size={{
  width: { 
    base: 300,    // Default size
    sm: 400,      // Small screens and up
    md: 500,      // Medium screens and up
    lg: 600       // Large screens and up
  },
  height: 200
}}

// Container query sizing (future)
size={{
  width: {
    container: {
      small: 200,
      medium: 300,
      large: 400
    }
  }
}}
```

## Auto Layout Properties

Auto Layout arranges child elements automatically - equivalent to Figma's Auto Layout.

```tsx
interface AutoLayoutProps {
  flow?: 'horizontal' | 'vertical' | 'grid' | 'freeform';
  alignment?: 
    | 'top-left' | 'top-center' | 'top-right'
    | 'center-left' | 'center' | 'center-right'
    | 'bottom-left' | 'bottom-center' | 'bottom-right'
    | 'space-between' | 'space-around' | 'space-evenly';
  gap?: number;
  padding?: number | {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    horizontal?: number;
    vertical?: number;
    all?: number;
  };
  wrap?: boolean;
}
```

### Flow Directions

```tsx
// Horizontal flow (row)
<Frame
  autoLayout={{ flow: 'horizontal', gap: 12 }}
  size={{ width: 'hug', height: 'hug' }}
>
  <Frame size={{ width: 100, height: 50 }}>Item 1</Frame>
  <Frame size={{ width: 100, height: 50 }}>Item 2</Frame>
  <Frame size={{ width: 100, height: 50 }}>Item 3</Frame>
</Frame>

// Vertical flow (column)
<Frame
  autoLayout={{ flow: 'vertical', gap: 16 }}
  size={{ width: 200, height: 'hug' }}
>
  <Frame size={{ width: '100%', height: 40 }}>Row 1</Frame>
  <Frame size={{ width: '100%', height: 40 }}>Row 2</Frame>
  <Frame size={{ width: '100%', height: 40 }}>Row 3</Frame>
</Frame>

// Grid layout (future)
<Frame
  autoLayout={{ 
    flow: 'grid',
    gridColumns: 3,
    gap: 20
  }}
>
  <Frame>Grid Item 1</Frame>
  <Frame>Grid Item 2</Frame>
  <Frame>Grid Item 3</Frame>
  <Frame>Grid Item 4</Frame>
</Frame>
```

### Alignment Options

```tsx
// Center alignment
<Frame
  autoLayout={{ 
    flow: 'horizontal',
    alignment: 'center',
    gap: 16
  }}
  size={{ width: 400, height: 200 }}
>
  <Frame>Centered Item 1</Frame>
  <Frame>Centered Item 2</Frame>
</Frame>

// Space between
<Frame
  autoLayout={{ 
    flow: 'horizontal',
    alignment: 'space-between'
  }}
  size={{ width: 400, height: 60 }}
>
  <Frame>Left Item</Frame>
  <Frame>Right Item</Frame>
</Frame>

// Top-right alignment
<Frame
  autoLayout={{ 
    flow: 'vertical',
    alignment: 'top-right',
    gap: 8
  }}
  size={{ width: 300, height: 200 }}
>
  <Frame>Item 1</Frame>
  <Frame>Item 2</Frame>
</Frame>
```

### Padding and Spacing

```tsx
// Uniform padding
<Frame
  autoLayout={{ 
    flow: 'vertical',
    gap: 12,
    padding: 20
  }}
>
  Content with 20px padding on all sides
</Frame>

// Individual padding values
<Frame
  autoLayout={{ 
    flow: 'horizontal',
    gap: 16,
    padding: { 
      top: 24, 
      right: 32, 
      bottom: 24, 
      left: 32 
    }
  }}
>
  Custom padding per side
</Frame>

// Shorthand padding
<Frame
  autoLayout={{ 
    flow: 'vertical',
    gap: 8,
    padding: { 
      horizontal: 20,  // Left and right
      vertical: 16     // Top and bottom
    }
  }}
>
  Horizontal and vertical padding
</Frame>
```

## Real-World Layout Examples

### Card Layout

```tsx
<Frame
  size={{ width: 320, height: 'hug' }}
  fill={{ type: 'solid', color: 'white' }}
  appearance={{ radius: 12 }}
  autoLayout={{ 
    flow: 'vertical',
    gap: 16,
    padding: 24
  }}
  effects={[
    { type: 'drop-shadow', blur: 16, color: 'rgba(0,0,0,0.1)' }
  ]}
>
  {/* Header */}
  <Frame
    autoLayout={{ flow: 'horizontal', alignment: 'space-between' }}
    size={{ width: '100%', height: 'hug' }}
  >
    <Frame typography={{ fontSize: 20, fontWeight: 600 }}>
      Card Title
    </Frame>
    <Frame typography={{ fontSize: 14, color: 'neutral6' }}>
      Status
    </Frame>
  </Frame>
  
  {/* Content */}
  <Frame
    typography={{ fontSize: 16, lineHeight: 1.5, color: 'neutral8' }}
  >
    Card content goes here. This text will wrap naturally and the card
    height will adjust to fit the content.
  </Frame>
  
  {/* Actions */}
  <Frame
    autoLayout={{ flow: 'horizontal', gap: 12, alignment: 'right' }}
    size={{ width: '100%', height: 'hug' }}
  >
    <Frame 
      fill={{ type: 'solid', color: 'neutral3' }}
      size={{ width: 'hug', height: 'hug' }}
      autoLayout={{ padding: { horizontal: 16, vertical: 8 } }}
    >
      Cancel
    </Frame>
    <Frame 
      fill={{ type: 'solid', color: 'primary6' }}
      size={{ width: 'hug', height: 'hug' }}
      autoLayout={{ padding: { horizontal: 16, vertical: 8 } }}
    >
      Confirm
    </Frame>
  </Frame>
</Frame>
```

### Navigation Bar

```tsx
<Frame
  size={{ width: '100%', height: 64 }}
  fill={{ type: 'solid', color: 'white' }}
  stroke={{ color: 'neutral3', weight: 1 }}
  autoLayout={{ 
    flow: 'horizontal',
    alignment: 'space-between',
    padding: { horizontal: 24, vertical: 12 }
  }}
>
  {/* Logo */}
  <Frame
    autoLayout={{ flow: 'horizontal', alignment: 'center', gap: 12 }}
  >
    <Frame size={{ width: 32, height: 32 }}>🏠</Frame>
    <Frame typography={{ fontSize: 18, fontWeight: 700 }}>
      App Name
    </Frame>
  </Frame>
  
  {/* Navigation Items */}
  <Frame
    autoLayout={{ flow: 'horizontal', gap: 32 }}
  >
    <Frame typography={{ fontSize: 16 }}>Home</Frame>
    <Frame typography={{ fontSize: 16 }}>About</Frame>
    <Frame typography={{ fontSize: 16 }}>Contact</Frame>
  </Frame>
  
  {/* User Profile */}
  <Frame
    size={{ width: 40, height: 40 }}
    fill={{ type: 'solid', color: 'primary6' }}
    appearance={{ radius: 20 }}
  >
    User
  </Frame>
</Frame>
```

### Responsive Grid

```tsx
const ResponsiveGrid = ({ items }) => (
  <Frame
    autoLayout={{ 
      flow: 'horizontal',
      wrap: true,
      gap: 20,
      padding: 20
    }}
    size={{ width: '100%', height: 'hug' }}
  >
    {items.map((item, index) => (
      <Frame
        key={index}
        size={{ 
          width: { 
            base: '100%',      // 1 column on mobile
            sm: 'calc(50% - 10px)',  // 2 columns on small screens
            lg: 'calc(33.333% - 14px)' // 3 columns on large screens
          },
          height: 200
        }}
        fill={{ type: 'solid', color: 'white' }}
        appearance={{ radius: 8 }}
        stroke={{ color: 'neutral3', weight: 1 }}
        autoLayout={{ 
          flow: 'vertical',
          alignment: 'center',
          padding: 16
        }}
      >
        {item.content}
      </Frame>
    ))}
  </Frame>
);
```

## Performance Considerations

### Efficient Layout

```tsx
// ✅ Good - Minimal auto layout nesting
<Frame autoLayout={{ flow: 'horizontal', gap: 16 }}>
  <Frame>Item 1</Frame>
  <Frame>Item 2</Frame>
  <Frame>Item 3</Frame>
</Frame>

// ❌ Avoid - Unnecessary nesting
<Frame autoLayout={{ flow: 'horizontal' }}>
  <Frame autoLayout={{ flow: 'horizontal' }}>
    <Frame>Item 1</Frame>
  </Frame>
</Frame>
```

### Large Lists

```tsx
// ✅ Good - Use virtualization for large lists
import { VirtualizedFrame } from '@/components/atoms/frame/VirtualizedFrame';

<VirtualizedFrame
  autoLayout={{ flow: 'vertical', gap: 8 }}
  items={largeItemList}
  renderItem={(item) => (
    <Frame key={item.id}>{item.content}</Frame>
  )}
/>

// ❌ Avoid - Rendering thousands of items directly
<Frame autoLayout={{ flow: 'vertical', gap: 8 }}>
  {thousandsOfItems.map(item => (
    <Frame key={item.id}>{item.content}</Frame>
  ))}
</Frame>
```

## Animation with Layout

Layout properties can be smoothly animated:

```tsx
<Frame
  animate={{
    trigger: 'hover',
    duration: '0.3s',
    timeline: {
      '@0s': {
        size: { width: 200, height: 100 },
        autoLayout: { gap: 8, padding: 16 }
      },
      '@0.3s': {
        size: { width: 240, height: 120 },
        autoLayout: { gap: 12, padding: 20 }
      }
    }
  }}
>
  Hover to expand layout
</Frame>
```

## Common Layout Patterns

### Centering Content

```tsx
// Center single item
<Frame
  size={{ width: 400, height: 300 }}
  autoLayout={{ alignment: 'center' }}
>
  <Frame>Centered content</Frame>
</Frame>

// Center multiple items
<Frame
  autoLayout={{ 
    flow: 'vertical',
    alignment: 'center',
    gap: 16
  }}
>
  <Frame>Centered Item 1</Frame>
  <Frame>Centered Item 2</Frame>
</Frame>
```

### Sidebar Layout

```tsx
<Frame
  size={{ width: '100%', height: '100vh' }}
  autoLayout={{ flow: 'horizontal' }}
>
  {/* Sidebar */}
  <Frame
    size={{ width: 240, height: '100%' }}
    fill={{ type: 'solid', color: 'neutral2' }}
    autoLayout={{ flow: 'vertical', padding: 20, gap: 16 }}
  >
    Sidebar content
  </Frame>
  
  {/* Main content */}
  <Frame
    size={{ width: 'fill-container', height: '100%' }}
    autoLayout={{ flow: 'vertical', padding: 32 }}
  >
    Main content area
  </Frame>
</Frame>
```

### Sticky Footer

```tsx
<Frame
  size={{ width: '100%', minHeight: '100vh' }}
  autoLayout={{ flow: 'vertical' }}
>
  {/* Main content */}
  <Frame
    size={{ width: '100%', height: 'fill-container' }}
    autoLayout={{ flow: 'vertical', padding: 20 }}
  >
    Main content that grows to fill space
  </Frame>
  
  {/* Footer */}
  <Frame
    size={{ width: '100%', height: 'hug' }}
    fill={{ type: 'solid', color: 'neutral2' }}
    autoLayout={{ padding: 20 }}
  >
    Footer content (always at bottom)
  </Frame>
</Frame>
```

Layout properties provide the foundation for creating flexible, responsive layouts that adapt to content and screen sizes while maintaining consistent spacing and alignment.