# CSS Units & Grid Layout Support

**Version 1.1.0** introduces comprehensive CSS unit support and grid layout functionality to the Frame component.

## Overview

All dimension and spacing properties now support standard CSS units, making the framework more intuitive for developers familiar with CSS.

## Supported CSS Units

- **px** - Pixels (default when using plain numbers)
- **%** - Percentage of parent container
- **em** - Relative to element's font size
- **rem** - Relative to root element's font size
- **vh** - Percentage of viewport height
- **vw** - Percentage of viewport width
- **vmin** - Smaller of vh or vw
- **vmax** - Larger of vh or vw
- **ch** - Width of "0" character in element's font
- **ex** - x-height of element's font

## Properties That Support CSS Units

### Layout Properties (`autoLayout`)
- `width`, `height`
- `minWidth`, `maxWidth`, `minHeight`, `maxHeight`
- `gap` - spacing between flex/grid items
- `padding` - can be single value or object with `{top, right, bottom, left}`
- `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`
- `paddingHorizontal`, `paddingVertical`
- `margin` - can be single value or object with `{top, right, bottom, left}`

### Appearance Properties (`appearance`)
- `radius` - border radius (uniform)
- `radiusTopLeft`, `radiusTopRight`, `radiusBottomRight`, `radiusBottomLeft`

## Usage Examples

### Plain Numbers (Default: px)
```tsx
<Frame
  autoLayout={{
    width: 300,        // Treated as 300px
    height: 200,       // Treated as 200px
    padding: 20,       // Treated as 20px
  }}
/>
```

### String Units
```tsx
<Frame
  autoLayout={{
    width: "50%",      // Percentage
    height: "20rem",   // REM units
    padding: "2em",    // EM units
    gap: "1vw",        // Viewport width
  }}
/>
```

### Object Spacing with Mixed Units
```tsx
<Frame
  autoLayout={{
    padding: {
      top: "1rem",
      right: "2em",
      bottom: "10%",
      left: "20px"
    }
  }}
/>
```

### CSS Functions
Modern CSS functions like `clamp()`, `min()`, `max()`, `calc()` are fully supported:

```tsx
<Frame
  autoLayout={{
    width: "min(90vw, 1200px)",              // Never wider than 1200px
    height: "clamp(300px, 50vh, 600px)",     // Between 300px and 600px
    padding: "clamp(1rem, 5vw, 3rem)",       // Responsive padding
  }}
/>
```

### Border Radius
```tsx
// Uniform radius
<Frame
  appearance={{
    radius: "2rem"     // 2rem on all corners
  }}
/>

// Individual corners
<Frame
  appearance={{
    radiusTopLeft: "4rem",
    radiusTopRight: "1rem",
    radiusBottomRight: "4rem",
    radiusBottomLeft: "1rem"
  }}
/>
```

## Grid Layout

Grid layout now supports a simple shorthand syntax for quick configuration.

### Grid Shorthand Syntax
```tsx
<Frame
  autoLayout={{
    flow: 'grid',
    grid: "3x4",       // 3 columns, 4 rows
    gap: "1rem",       // Gap between grid items
  }}
>
  {/* Your grid items */}
</Frame>
```

### Grid with Custom Configuration
For more control, use the full configuration object:

```tsx
<Frame
  autoLayout={{
    flow: 'grid',
    grid: {
      columns: 3,
      rows: 4,
      columnGap: "2rem",    // Different gaps for columns...
      rowGap: "1rem",       // ...and rows
    }
  }}
>
  {/* Your grid items */}
</Frame>
```

### Grid with Template Strings
You can also use CSS grid template strings for more advanced layouts:

```tsx
<Frame
  autoLayout={{
    flow: 'grid',
    grid: {
      columns: 3,
      columnTemplate: "1fr 2fr 1fr",  // Custom column sizes
      rowTemplate: "auto 1fr auto",    // Custom row sizes
    }
  }}
/>
```

## Type Safety

The type system ensures you can write dimensions naturally:

```typescript
type DimensionValue = 
  | number                    // Plain number (px)
  | `${number}px`            // Explicit px
  | `${number}em`            // EM units
  | `${number}rem`           // REM units
  | `${number}vh`            // Viewport height
  | `${number}vw`            // Viewport width
  | `${number}%`             // Percentage
  | string                    // Any CSS string (clamp, calc, etc.)
  | 'auto' | 'hug' | 'fill' | 'fill-container' | 'none' | 'full';
```

## Migration Guide

### Before (v1.0.x)
```tsx
<Frame
  autoLayout={{
    width: 300,           // Only numbers worked reliably
    padding: 20,
  }}
/>
```

### After (v1.1.0)
```tsx
<Frame
  autoLayout={{
    width: 300,           // Still works (backward compatible)
    width: "50%",         // Now also works!
    width: "20rem",       // And this!
    width: "80vw",        // And this!
    padding: "2rem",      // CSS units everywhere
  }}
/>
```

**All existing code remains compatible** - plain numbers still work as before (treated as px).

## Implementation Details

### New Utilities (`packages/frame-core/src/utils/css-units.ts`)

- **`normalizeCSSUnit(value)`** - Converts any value to valid CSS unit string
- **`normalizeSpacing(value)`** - Handles spacing (single value or object)
- **`spacingToCSS(spacing)`** - Converts spacing object to CSS shorthand
- **`parseGridShorthand(grid)`** - Parses "3x4" syntax to grid config
- **`gridConfigToCSS(config)`** - Converts grid config to CSS properties

### Updated Files
- `packages/frame-core/src/layout/layout.props.ts` - Updated types and conversion
- `packages/frame-core/src/appearance/appearance.props.ts` - Updated radius handling
- `packages/frame-core/src/utils/css-units.ts` - New utility file
- `packages/frame-core/src/index.ts` - Exports new utilities

## Examples in Storybook

See `__stories__/css-units.stories.tsx` for interactive examples demonstrating:
- All unit types
- Grid layouts with shorthand
- Responsive designs with CSS functions
- Mixed unit configurations

## Best Practices

1. **Use rem for scalable designs** - Respects user font size preferences
2. **Use % for fluid layouts** - Adapts to parent container
3. **Use vh/vw for full-screen sections** - Viewport-relative sizing
4. **Use grid shorthand for simple grids** - `"3x4"` is cleaner than full config
5. **Use CSS functions for responsive** - `clamp()`, `min()`, `max()` for fluid sizing
6. **Use plain numbers for fixed** - When you need exact pixel values

## Performance

All CSS unit handling is done at render time with minimal overhead. The utilities use simple string operations and are highly optimized.

## Browser Support

All CSS units and functions are supported by modern browsers. For older browsers, ensure your build process includes appropriate polyfills.

---

**Questions or Issues?** Open an issue on GitHub or check the Storybook examples.
