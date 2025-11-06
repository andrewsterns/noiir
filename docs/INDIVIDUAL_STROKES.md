# Individual Strokes

Individual strokes allow you to apply borders to specific sides of a frame, just like Figma's individual stroke feature. This gives you fine-grained control over which sides have borders and what those borders look like.

## Basic Usage

```tsx
import { Frame } from '@noiir/core';

// Border on only one side
<Frame
  stroke={{
    bottom: { 
      type: 'solid', 
      color: 'primary7', 
      weight: 3 
    }
  }}
/>
```

## Individual Stroke Properties

Each side (`top`, `bottom`, `left`, `right`) can have its own stroke configuration:

```typescript
interface IndividualStroke {
  type?: 'none' | 'solid' | 'gradient';
  color?: string;
  weight?: number;
  opacity?: number;
  dashPattern?: number[];
}
```

## Examples

### Single Side Border

```tsx
// Top border only
<Frame
  stroke={{
    top: { type: 'solid', color: 'primary7', weight: 3 }
  }}
/>

// Bottom border only (common for separators)
<Frame
  stroke={{
    bottom: { type: 'solid', color: 'gray4', weight: 1 }
  }}
/>
```

### Multiple Sides with Same Style

```tsx
// Horizontal borders (top + bottom)
<Frame
  stroke={{
    top: { type: 'solid', color: 'primary7', weight: 2 },
    bottom: { type: 'solid', color: 'primary7', weight: 2 }
  }}
/>

// Vertical borders (left + right)
<Frame
  stroke={{
    left: { type: 'solid', color: 'gray5', weight: 1 },
    right: { type: 'solid', color: 'gray5', weight: 1 }
  }}
/>
```

### All Four Sides with Different Colors

```tsx
<Frame
  stroke={{
    top: { type: 'solid', color: 'primary7', weight: 2 },
    right: { type: 'solid', color: 'success7', weight: 2 },
    bottom: { type: 'solid', color: 'warning7', weight: 2 },
    left: { type: 'solid', color: 'error7', weight: 2 }
  }}
/>
```

### Different Weights Per Side

```tsx
// Thick bottom, thin top
<Frame
  stroke={{
    top: { type: 'solid', color: 'gray5', weight: 1 },
    bottom: { type: 'solid', color: 'primary7', weight: 6 }
  }}
/>
```

### With Opacity and Dash Patterns

```tsx
// Each side can have its own opacity and dash pattern
<Frame
  stroke={{
    top: { 
      type: 'solid', 
      color: 'primary7', 
      weight: 2, 
      opacity: 0.5 
    },
    bottom: { 
      type: 'solid', 
      color: 'success7', 
      weight: 2, 
      dashPattern: [5, 5] 
    }
  }}
/>
```

### Removing Specific Sides

```tsx
// Set type to 'none' to remove a border
<Frame
  stroke={{
    top: { type: 'solid', color: 'primary7', weight: 2 },
    right: { type: 'none' },
    bottom: { type: 'solid', color: 'primary7', weight: 2 },
    left: { type: 'none' }
  }}
/>
```

## Common Use Cases

### Card with Accent Border

```tsx
<Frame
  autoLayout={{ 
    width: 300, 
    height: 200, 
    flow: 'vertical',
    padding: 20
  }}
  fill={{ type: 'solid', color: 'white2' }}
  stroke={{
    left: { type: 'solid', color: 'primary7', weight: 4 },
    top: { type: 'solid', color: 'gray3', weight: 1 },
    right: { type: 'solid', color: 'gray3', weight: 1 },
    bottom: { type: 'solid', color: 'gray3', weight: 1 }
  }}
  appearance={{ radius: 8 }}
>
  <h3>Featured Card</h3>
  <p>With a colored accent border on the left</p>
</Frame>
```

### List Item Separator

```tsx
<Frame
  stroke={{
    bottom: { type: 'solid', color: 'gray3', weight: 1 }
  }}
>
  <p>List item content</p>
</Frame>
```

### Tab Underline

```tsx
<Frame
  stroke={{
    bottom: { 
      type: 'solid', 
      color: 'primary7', 
      weight: 2 
    }
  }}
>
  <span>Active Tab</span>
</Frame>
```

### Alert with Status Border

```tsx
// Success alert with left accent
<Frame
  fill={{ type: 'solid', color: 'success1' }}
  stroke={{
    left: { type: 'solid', color: 'success7', weight: 4 }
  }}
  autoLayout={{ padding: 16 }}
>
  <p>Operation completed successfully!</p>
</Frame>

// Error alert with left accent
<Frame
  fill={{ type: 'solid', color: 'error1' }}
  stroke={{
    left: { type: 'solid', color: 'error7', weight: 4 }
  }}
  autoLayout={{ padding: 16 }}
>
  <p>An error occurred</p>
</Frame>
```

## How It Works

When you use individual strokes:

1. **Priority**: Individual stroke properties take precedence over the global `stroke` properties (`type`, `color`, `weight`, etc.)
2. **CSS Mapping**: Each side maps to its corresponding CSS border property:
   - `top` → `borderTop`
   - `bottom` → `borderBottom`
   - `left` → `borderLeft`
   - `right` → `borderRight`
3. **Flexibility**: You can mix and match - define only the sides you need
4. **No Conflict**: If individual strokes are defined, global stroke properties are ignored

## Comparison with Figma

This feature works exactly like Figma's individual strokes:

| Figma | @noiir/core |
|-------|-------------|
| Click stroke, then "Independent strokes" | Use `top`, `bottom`, `left`, `right` properties |
| Set weight per side | `weight` property per side |
| Set color per side | `color` property per side |
| Dash pattern per side | `dashPattern` property per side |
| Opacity per side | `opacity` property per side |

## When to Use Individual Strokes

✅ **Use individual strokes when:**
- You need borders on specific sides only (e.g., bottom border for dividers)
- Creating accent borders (e.g., left border on cards)
- Each side needs different styling (color, weight, pattern)
- Mimicking designs from Figma with individual strokes

❌ **Use regular stroke when:**
- All sides should have the same border
- You need gradient borders (individual strokes currently support solid only)
- Simpler code is preferred and all sides are identical

## TypeScript Types

```typescript
interface StrokeProps {
  // ... other properties ...
  
  // Individual strokes (like Figma)
  top?: IndividualStroke;
  bottom?: IndividualStroke;
  left?: IndividualStroke;
  right?: IndividualStroke;
}

interface IndividualStroke {
  type?: 'none' | 'solid' | 'gradient';
  color?: string;
  weight?: number;
  opacity?: number;
  dashPattern?: number[];
}
```

## See Also

- [Stroke Properties](./frame/properties/stroke.md)
- [Appearance Properties](./frame/properties/appearance.md)
- [CSS Units](./CSS_UNITS.md)
