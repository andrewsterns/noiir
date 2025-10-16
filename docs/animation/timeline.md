# Animation Timeline

The timeline system allows you to define keyframe-based animations that can modify any Frame property over time. Think of it as CSS keyframes but for semantic Frame properties.

## Basic Timeline Syntax

### Simple Timeline

```tsx
<Frame 
  animate={{
    trigger: 'click',
    duration: '1s',
    timeline: {
      '@0s': { fill: { type: 'solid', color: 'primary6' } },
      '@0.5s': { fill: { type: 'solid', color: 'success6' } },
      '@1s': { fill: { type: 'solid', color: 'primary8' } }
    }
  }}
>
  Color transitions over 1 second
</Frame>
```

### Timeline Format
```
'@{time}': { frameProps }
```

- **@{time}**: Keyframe timestamp (`@0s`, `@0.5s`, `@1s`, `@100ms`)
- **frameProps**: Any Frame properties to apply at that time

## Time Formats

### Supported Time Units

```tsx
timeline: {
  '@0s': { /* Start state */ },
  '@500ms': { /* Half second */ },
  '@0.5s': { /* Also half second */ },
  '@1s': { /* One second */ },
  '@2000ms': { /* Two seconds */ },
  '@2.5s': { /* Two and half seconds */ }
}
```

### Relative Timing

```tsx
timeline: {
  '@0%': { /* Animation start */ },
  '@25%': { /* Quarter through */ },
  '@50%': { /* Halfway */ },
  '@75%': { /* Three-quarters */ },
  '@100%': { /* Animation end */ }
}
```

## Animatable Properties

### Visual Properties

```tsx
timeline: {
  '@0s': {
    // Fill animations
    fill: { type: 'solid', color: 'primary6' },
    
    // Stroke animations  
    stroke: { color: 'primary8', weight: 2 },
    
    // Appearance animations
    appearance: {
      radius: 8,
      opacity: 1,
      scale: 1.0,
      rotation: 0
    }
  },
  '@1s': {
    fill: { 
      type: 'linear-gradient',
      angle: 45,
      stops: [
        { color: 'primary4', position: 0 },
        { color: 'primary8', position: 1 }
      ]
    },
    stroke: { color: 'success6', weight: 4 },
    appearance: {
      radius: 16,
      opacity: 0.8,
      scale: 1.2,
      rotation: 360
    }
  }
}
```

### Layout Properties

```tsx
timeline: {
  '@0s': {
    size: { width: 100, height: 50 },
    position: { x: 0, y: 0 }
  },
  '@0.5s': {
    size: { width: 150, height: 75 },
    position: { x: 25, y: 10 }
  },
  '@1s': {
    size: { width: 200, height: 100 },
    position: { x: 50, y: 20 }
  }
}
```

### Typography Properties

```tsx
timeline: {
  '@0s': {
    typography: {
      fontSize: 16,
      fontWeight: 400,
      color: 'neutral8',
      textAlign: 'left'
    }
  },
  '@1s': {
    typography: {
      fontSize: 24,
      fontWeight: 700,
      color: 'primary6',
      textAlign: 'center'
    }
  }
}
```

## Advanced Timeline Features

### Partial Property Updates

```tsx
// Only animate specific nested properties
timeline: {
  '@0s': {
    appearance: { scale: 1.0 } // Only animates scale, keeps other appearance props
  },
  '@0.5s': {
    appearance: { scale: 1.1 }
  },
  '@1s': {
    appearance: { scale: 1.0 }
  }
}
```

### Complex Property Transitions

```tsx
timeline: {
  '@0s': {
    fill: { type: 'solid', color: 'primary6' },
    size: { width: 100, height: 100 },
    appearance: { radius: 8 }
  },
  '@0.3s': {
    fill: { type: 'solid', color: 'primary8' },
    size: { width: 110, height: 110 },
    appearance: { radius: 12 }
  },
  '@0.6s': {
    fill: {
      type: 'linear-gradient',
      angle: 45,
      stops: [
        { color: 'success4', position: 0 },
        { color: 'success8', position: 1 }
      ]
    },
    size: { width: 120, height: 120 },
    appearance: { radius: 16 }
  },
  '@1s': {
    fill: {
      type: 'radial-gradient',
      stops: [
        { color: '#ffffff', position: 0 },
        { color: 'success6', position: 1 }
      ]
    },
    size: { width: 100, height: 100 },
    appearance: { radius: 50 }
  }
}
```

## Timeline Patterns

### Bounce Animation

```tsx
timeline: {
  '@0s': { appearance: { scale: 1.0 } },
  '@0.1s': { appearance: { scale: 0.9 } },
  '@0.2s': { appearance: { scale: 1.1 } },
  '@0.3s': { appearance: { scale: 0.95 } },
  '@0.4s': { appearance: { scale: 1.05 } },
  '@0.5s': { appearance: { scale: 1.0 } }
}
```

### Pulse Animation

```tsx
timeline: {
  '@0s': { appearance: { opacity: 1.0, scale: 1.0 } },
  '@0.5s': { appearance: { opacity: 0.7, scale: 1.05 } },
  '@1s': { appearance: { opacity: 1.0, scale: 1.0 } }
}
```

### Color Wave Animation

```tsx
timeline: {
  '@0s': { fill: { type: 'solid', color: 'primary6' } },
  '@0.2s': { fill: { type: 'solid', color: 'success6' } },
  '@0.4s': { fill: { type: 'solid', color: 'warning6' } },
  '@0.6s': { fill: { type: 'solid', color: 'error6' } },
  '@0.8s': { fill: { type: 'solid', color: 'primary8' } },
  '@1s': { fill: { type: 'solid', color: 'primary6' } }
}
```

### Morphing Animation

```tsx
timeline: {
  '@0s': {
    size: { width: 100, height: 50 },
    appearance: { radius: 8 },
    fill: { type: 'solid', color: 'primary6' }
  },
  '@0.5s': {
    size: { width: 75, height: 75 },
    appearance: { radius: 37.5 },
    fill: { type: 'solid', color: 'success6' }
  },
  '@1s': {
    size: { width: 50, height: 100 },
    appearance: { radius: 25 },
    fill: { type: 'solid', color: 'error6' }
  }
}
```

## Dynamic Timelines

### Function-Based Timelines

```tsx
timeline: (props, state, eventData) => ({
  '@0s': { 
    fill: { type: 'solid', color: props.isSuccess ? 'success6' : 'error6' }
  },
  '@1s': { 
    appearance: { scale: eventData?.intensity || 1.1 }
  }
})
```

### Conditional Keyframes

```tsx
timeline: {
  '@0s': { appearance: { scale: 1.0 } },
  ...(props.showBounce && {
    '@0.2s': { appearance: { scale: 1.2 } },
    '@0.4s': { appearance: { scale: 0.9 } }
  }),
  '@1s': { appearance: { scale: 1.0 } }
}
```

## Timeline Composition

### Reusable Timeline Pieces

```tsx
// Define reusable timeline pieces
const bounceIn = {
  '@0s': { appearance: { scale: 0, opacity: 0 } },
  '@0.5s': { appearance: { scale: 1.1, opacity: 1 } },
  '@1s': { appearance: { scale: 1.0, opacity: 1 } }
};

const colorPulse = {
  '@0s': { fill: { type: 'solid', color: 'primary6' } },
  '@0.5s': { fill: { type: 'solid', color: 'primary8' } },
  '@1s': { fill: { type: 'solid', color: 'primary6' } }
};

// Combine timelines
<Frame 
  animate={{
    trigger: 'click',
    timeline: {
      ...bounceIn,
      ...colorPulse
    }
  }}
>
  Combined animations
</Frame>
```

### Timeline Inheritance

```tsx
// Base timeline
const baseTimeline = {
  '@0s': { appearance: { opacity: 0 } },
  '@1s': { appearance: { opacity: 1 } }
};

// Extended timeline
const extendedTimeline = {
  ...baseTimeline,
  '@0.5s': { fill: { type: 'solid', color: 'success6' } }
};
```

## Performance Considerations

### Efficient Keyframes

```tsx
// ✅ Good - Minimal keyframes
timeline: {
  '@0s': { appearance: { scale: 1.0 } },
  '@1s': { appearance: { scale: 1.2 } }
}

// ❌ Avoid - Too many keyframes  
timeline: {
  '@0s': { appearance: { scale: 1.0 } },
  '@0.1s': { appearance: { scale: 1.02 } },
  '@0.2s': { appearance: { scale: 1.04 } },
  // ... 50 more keyframes
}
```

### Property Grouping

```tsx
// ✅ Good - Group related properties
timeline: {
  '@0s': {
    appearance: { scale: 1.0, opacity: 1.0, rotation: 0 }
  },
  '@1s': {
    appearance: { scale: 1.2, opacity: 0.8, rotation: 90 }
  }
}

// ❌ Less efficient - Separate keyframes for related properties
timeline: {
  '@0s': { appearance: { scale: 1.0 } },
  '@0s': { appearance: { opacity: 1.0 } }, // Overwrites previous
  '@0s': { appearance: { rotation: 0 } }   // Overwrites previous
}
```

## Timeline Debugging

### Debug Timeline

```tsx
<Frame 
  animate={{
    trigger: 'click',
    debug: true, // Shows timeline progress in console
    timeline: {
      '@0s': { fill: { color: 'primary6' } },
      '@0.5s': { fill: { color: 'success6' } },
      '@1s': { fill: { color: 'primary8' } }
    }
  }}
>
  Debug timeline
</Frame>
```

### Timeline Visualization

```tsx
// Development tool
<TimelineVisualizer 
  timeline={{
    '@0s': { appearance: { scale: 1.0 } },
    '@0.5s': { appearance: { scale: 1.2 } },
    '@1s': { appearance: { scale: 1.0 } }
  }}
  duration="1s"
/>
// Renders visual timeline with property changes
```

## Timeline Presets

### Common Animation Presets

```tsx
import { timelines } from '@/frame/animation/presets';

<Frame 
  animate={{
    trigger: 'click',
    timeline: timelines.bounceIn
  }}
>
  Preset bounce animation
</Frame>

<Frame 
  animate={{
    trigger: 'hover',
    timeline: timelines.scaleUp
  }}
>
  Preset scale animation
</Frame>
```

### Custom Preset Library

```tsx
// Create your own preset library
export const customTimelines = {
  brandBounce: {
    '@0s': { appearance: { scale: 1.0 }, fill: { color: 'brand-primary' } },
    '@0.3s': { appearance: { scale: 1.2 }, fill: { color: 'brand-secondary' } },
    '@1s': { appearance: { scale: 1.0 }, fill: { color: 'brand-primary' } }
  },
  
  successPulse: {
    '@0s': { fill: { color: 'success6' }, appearance: { opacity: 1 } },
    '@0.5s': { fill: { color: 'success8' }, appearance: { opacity: 0.8 } },
    '@1s': { fill: { color: 'success6' }, appearance: { opacity: 1 } }
  }
};
```

The timeline system provides infinite flexibility for creating sophisticated animations while maintaining a simple, declarative API that mirrors the familiar keyframe concept from CSS animations.