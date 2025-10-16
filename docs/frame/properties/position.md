# Position Properties

Position properties control Frame placement, rotation, and positioning behavior within its container.

## Position Props

### Basic Positioning

```tsx
interface PositionProps {
  x?: number;              // Horizontal position
  y?: number;              // Vertical position
  rotation?: number;       // Rotation in degrees
}

// Example usage
<Frame
  position={{ x: 100, y: 50, rotation: 45 }}
  size={{ width: 200, height: 100 }}
  fill={{ type: 'solid', color: 'primary6' }}
>
  Positioned and rotated Frame
</Frame>
```

### Coordinate System

```tsx
// Absolute positioning (pixels from top-left)
position={{ x: 0, y: 0 }}        // Top-left corner
position={{ x: 100, y: 50 }}     // 100px right, 50px down
position={{ x: -20, y: -10 }}    // Can use negative values

// Rotation around center point
position={{ rotation: 0 }}       // No rotation
position={{ rotation: 90 }}      // 90 degrees clockwise
position={{ rotation: -45 }}     // 45 degrees counter-clockwise
position={{ rotation: 180 }}     // Upside down
```

## Constraint Properties

Constraints define how a Frame behaves when its container resizes - mirroring Figma's constraint system.

```tsx
interface ConstraintProps {
  horizontal?: 'left' | 'right' | 'center' | 'left-right' | 'scale';
  vertical?: 'top' | 'bottom' | 'center' | 'top-bottom' | 'scale';
}
```

### Horizontal Constraints

```tsx
// Fixed to left edge
<Frame
  constraints={{ horizontal: 'left' }}
  position={{ x: 20 }}
>
  Stays 20px from left edge
</Frame>

// Fixed to right edge  
<Frame
  constraints={{ horizontal: 'right' }}
  position={{ x: -20 }} // 20px from right edge
>
  Stays 20px from right edge
</Frame>

// Centered horizontally
<Frame
  constraints={{ horizontal: 'center' }}
>
  Always centered horizontally
</Frame>

// Stretches with container
<Frame
  constraints={{ horizontal: 'left-right' }}
  position={{ x: 20 }} // Left margin
  size={{ width: -40 }} // Right margin (container width - 40)
>
  Stretches horizontally with 20px margins
</Frame>

// Scales proportionally
<Frame
  constraints={{ horizontal: 'scale' }}
>
  Scales with container width
</Frame>
```

### Vertical Constraints

```tsx
// Fixed to top edge
<Frame
  constraints={{ vertical: 'top' }}
  position={{ y: 10 }}
>
  Stays 10px from top
</Frame>

// Fixed to bottom edge
<Frame
  constraints={{ vertical: 'bottom' }}
  position={{ y: -30 }} // 30px from bottom
>
  Stays 30px from bottom
</Frame>

// Centered vertically
<Frame
  constraints={{ vertical: 'center' }}
>
  Always centered vertically
</Frame>

// Stretches vertically
<Frame
  constraints={{ vertical: 'top-bottom' }}
  position={{ y: 15 }} // Top margin
  size={{ height: -30 }} // Bottom margin
>
  Stretches vertically with 15px margins
</Frame>
```

## Advanced Positioning

### 3D Positioning (Future)

```tsx
interface Position3DProps {
  x?: number;
  y?: number;
  z?: number;              // Depth (for 3D transforms)
  rotationX?: number;      // X-axis rotation
  rotationY?: number;      // Y-axis rotation
  rotationZ?: number;      // Z-axis rotation (same as rotation)
}
```

### Transform Origin

```tsx
// Control rotation and scale origin point
<Frame
  position={{ rotation: 45 }}
  transformOrigin="top-left"    // Rotate around top-left corner
>
  Rotates around top-left
</Frame>

<Frame
  position={{ rotation: 90 }}
  transformOrigin="center"      // Default - rotate around center
>
  Rotates around center
</Frame>
```

## Real-World Examples

### Floating Action Button

```tsx
<Frame
  position={{ x: -80, y: -80 }} // 80px from bottom-right
  constraints={{ horizontal: 'right', vertical: 'bottom' }}
  size={{ width: 60, height: 60 }}
  fill={{ type: 'solid', color: 'primary6' }}
  appearance={{ radius: 30 }}
>
  +
</Frame>
```

### Rotated Card

```tsx
<Frame
  position={{ x: 50, y: 100, rotation: -5 }}
  size={{ width: 300, height: 200 }}
  fill={{ type: 'solid', color: 'white' }}
  appearance={{ radius: 12 }}
  effects={[
    { type: 'drop-shadow', blur: 16, color: 'rgba(0,0,0,0.1)' }
  ]}
>
  Slightly rotated card
</Frame>
```

### Responsive Layout

```tsx
// Desktop: Fixed position
// Mobile: Centered with constraints
<Frame
  position={{ 
    x: isDesktop ? 100 : 0,
    y: isDesktop ? 50 : 20
  }}
  constraints={{
    horizontal: isDesktop ? 'left' : 'center',
    vertical: 'top'
  }}
  size={{ 
    width: isDesktop ? 400 : '90%',
    height: 300
  }}
>
  Responsive positioned Frame
</Frame>
```

### Sticky Header

```tsx
<Frame
  constraints={{ horizontal: 'left-right', vertical: 'top' }}
  position={{ x: 0, y: 0 }}
  size={{ width: '100%', height: 60 }}
  fill={{ type: 'solid', color: 'white' }}
  style={{ position: 'sticky', top: 0, zIndex: 100 }}
>
  Sticky header that spans full width
</Frame>
```

## Animation with Position

Position properties are highly animatable:

```tsx
<Frame
  animate={{
    trigger: 'click',
    duration: '0.5s',
    timeline: {
      '@0s': { 
        position: { x: 0, y: 0, rotation: 0 }
      },
      '@0.25s': {
        position: { x: 50, y: -20, rotation: 10 }
      },
      '@0.5s': {
        position: { x: 100, y: 0, rotation: 0 }
      }
    }
  }}
>
  Click to animate position
</Frame>
```

## Performance Considerations

### GPU-Accelerated Properties

```tsx
// ✅ Highly performant (uses CSS transforms)
position={{ x: 100, y: 50, rotation: 45 }}

// ⚠️ Can trigger layout recalculation
position={{ x: '50%', y: '25%' }} // Percentage values
```

### Optimization Tips

```tsx
// ✅ Good - Use transform-based positioning
<Frame
  position={{ x: 100, y: 50 }}
  style={{ willChange: 'transform' }} // Hint for GPU acceleration
>
  Optimized positioning
</Frame>

// ❌ Avoid - Frequent position changes without animation
const [pos, setPos] = useState({ x: 0, y: 0 });
// This can cause performance issues if updated rapidly
```

## Common Patterns

### Centering

```tsx
// Center in container
<Frame
  constraints={{ horizontal: 'center', vertical: 'center' }}
>
  Perfectly centered
</Frame>

// Center with offset
<Frame
  constraints={{ horizontal: 'center', vertical: 'center' }}
  position={{ x: 0, y: -20 }} // Slightly above center
>
  Centered with offset
</Frame>
```

### Corner Positioning

```tsx
// Top-left corner
<Frame
  constraints={{ horizontal: 'left', vertical: 'top' }}
  position={{ x: 20, y: 20 }}
>
  Top-left with margin
</Frame>

// Bottom-right corner
<Frame
  constraints={{ horizontal: 'right', vertical: 'bottom' }}
  position={{ x: -20, y: -20 }}
>
  Bottom-right with margin
</Frame>
```

### Overlapping Elements

```tsx
<Frame position={{ x: 0, y: 0 }}>Base element</Frame>
<Frame 
  position={{ x: 50, y: 25 }}
  style={{ zIndex: 10 }}
>
  Overlapping element
</Frame>
```

Position properties provide the foundation for creating complex, responsive layouts that behave predictably across different screen sizes and containers, just like in Figma.