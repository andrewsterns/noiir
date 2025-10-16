# Animatable Properties

This document details all Frame properties that can be animated through the timeline system. Every visual, layout, and typographic property can be smoothly animated.

## Visual Properties

### Fill Properties

All fill types and their properties can be animated:

```tsx
timeline: {
  '@0s': {
    fill: { type: 'solid', color: 'primary6' }
  },
  '@0.5s': {
    fill: { type: 'solid', color: 'success6' }
  },
  '@1s': {
    fill: {
      type: 'linear-gradient',
      angle: 45,
      stops: [
        { color: 'primary4', position: 0 },
        { color: 'primary8', position: 1 }
      ]
    }
  }
}
```

#### Solid Fill Animation
```tsx
// Color transitions
fill: { type: 'solid', color: 'primary6' } // → 'success6' → 'error6'

// Opacity within solid fills
fill: { type: 'solid', color: 'primary6', opacity: 0.5 } // → opacity: 1.0
```

#### Gradient Fill Animation
```tsx
// Linear gradient properties
fill: {
  type: 'linear-gradient',
  angle: 0,     // → 45 → 90 → 180
  stops: [
    { color: 'primary6', position: 0 },    // Colors can animate
    { color: 'primary8', position: 1 }     // Positions can animate
  ]
}

// Radial gradient properties  
fill: {
  type: 'radial-gradient',
  centerX: 0.5, // → 0.3 → 0.7 (center position can animate)
  centerY: 0.5, // → 0.2 → 0.8
  stops: [/* animatable stops */]
}

// Conic gradient properties
fill: {
  type: 'conic-gradient', 
  angle: 0,     // → 90 → 180 → 360
  centerX: 0.5, // → 0.3 → 0.7
  centerY: 0.5, // → 0.2 → 0.8
  stops: [/* animatable stops */]
}
```

### Stroke Properties

```tsx
timeline: {
  '@0s': {
    stroke: {
      color: 'primary6',
      weight: 1,
      style: 'solid',
      opacity: 1.0
    }
  },
  '@1s': {
    stroke: {
      color: 'success6',
      weight: 4,
      style: 'dashed',
      opacity: 0.7
    }
  }
}
```

#### Animatable Stroke Properties
- `color`: Any valid color value
- `weight`: Numeric stroke width
- `opacity`: 0.0 to 1.0
- `dashArray`: Dash pattern (advanced)
- `dashOffset`: Dash offset animation (advanced)

### Appearance Properties

```tsx
timeline: {
  '@0s': {
    appearance: {
      opacity: 1.0,
      radius: 8,
      scale: 1.0,
      rotation: 0,
      skewX: 0,
      skewY: 0,
      blur: 0,
      brightness: 1.0,
      contrast: 1.0,
      saturate: 1.0,
      hueRotate: 0
    }
  },
  '@1s': {
    appearance: {
      opacity: 0.8,
      radius: 16,
      scale: 1.2,
      rotation: 90,
      skewX: 15,
      skewY: 5,
      blur: 2,
      brightness: 1.2,
      contrast: 1.1,
      saturate: 1.3,
      hueRotate: 180
    }
  }
}
```

#### Individual Radius Properties
```tsx
appearance: {
  radius: 8,              // All corners
  // OR individual corners
  radiusTopLeft: 0,       // → 16
  radiusTopRight: 8,      // → 12  
  radiusBottomRight: 16,  // → 8
  radiusBottomLeft: 4     // → 20
}
```

## Layout Properties

### Size Properties

```tsx
timeline: {
  '@0s': {
    size: {
      width: 100,
      height: 50,
      minWidth: 80,
      minHeight: 40,
      maxWidth: 200,
      maxHeight: 100
    }
  },
  '@1s': {
    size: {
      width: 150,
      height: 75,
      minWidth: 120,
      minHeight: 60,
      maxWidth: 300,
      maxHeight: 150
    }  
  }
}
```

#### Responsive Size Units
```tsx
size: {
  width: '100px',    // → '150px'
  height: '50%',     // → '75%'  
  width: 'auto',     // Can animate to specific values
  width: 'fit-content' // Can animate to specific values
}
```

### Position Properties

```tsx
timeline: {
  '@0s': {
    position: {
      x: 0,
      y: 0,
      z: 0,          // 3D positioning
      rotation: 0,
      rotationX: 0,  // 3D rotation
      rotationY: 0,
      rotationZ: 0
    }
  },
  '@1s': {
    position: {
      x: 100,
      y: 50,
      z: 10,
      rotation: 180,
      rotationX: 45,
      rotationY: 90,
      rotationZ: 180
    }
  }
}
```

### Auto Layout Properties

```tsx
timeline: {
  '@0s': {
    autoLayout: {
      gap: 8,
      padding: { top: 16, right: 16, bottom: 16, left: 16 },
      alignment: 'center'
    }
  },
  '@1s': {
    autoLayout: {
      gap: 20,
      padding: { top: 24, right: 24, bottom: 24, left: 24 },
      alignment: 'center'
    }
  }
}
```

#### Animatable Auto Layout Properties
- `gap`: Spacing between items
- `padding`: All padding values (top, right, bottom, left)
- `alignment`: Transitions between alignment values
- `justifyContent`: Flex justification
- `alignItems`: Flex alignment

## Typography Properties

### Text Styling

```tsx
timeline: {
  '@0s': {
    typography: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: 0,
      wordSpacing: 0,
      textIndent: 0,
      color: 'neutral8'
    }
  },
  '@1s': {
    typography: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: 2,
      wordSpacing: 4,
      textIndent: 20,
      color: 'primary6'
    }
  }
}
```

### Text Effects

```tsx
timeline: {
  '@0s': {
    typography: {
      textShadow: '0 0 0 transparent',
      textStrokeWidth: 0,
      textStrokeColor: 'transparent'
    }
  },
  '@1s': {
    typography: {
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      textStrokeWidth: 1,
      textStrokeColor: 'primary6'
    }
  }
}
```

## Advanced Animation Properties

### Transform Properties

```tsx
timeline: {
  '@0s': {
    transform: {
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      skewX: 0,
      skewY: 0,
      perspective: 1000
    }
  },
  '@1s': {
    transform: {
      translateX: 50,
      translateY: 25,
      translateZ: 10,
      scaleX: 1.2,
      scaleY: 0.8, 
      scaleZ: 1.1,
      rotateX: 45,
      rotateY: 90,
      rotateZ: 180,
      skewX: 15,
      skewY: -10,
      perspective: 800
    }
  }
}
```

### Filter Properties

```tsx
timeline: {
  '@0s': {
    filter: {
      blur: 0,
      brightness: 1,
      contrast: 1,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      saturate: 1,
      sepia: 0,
      dropShadow: '0 0 0 transparent'
    }
  },
  '@1s': {
    filter: {
      blur: 4,
      brightness: 1.2,
      contrast: 1.3,
      grayscale: 0.5,
      hueRotate: 180,
      invert: 0.2,
      saturate: 1.5,
      sepia: 0.3,
      dropShadow: '4px 4px 8px rgba(0,0,0,0.3)'
    }
  }
}
```

## Property Animation Patterns

### Smooth Color Transitions

```tsx
// Animate through color spectrum
timeline: {
  '@0s': { fill: { color: 'hsl(0, 70%, 50%)' } },      // Red
  '@0.2s': { fill: { color: 'hsl(60, 70%, 50%)' } },   // Yellow  
  '@0.4s': { fill: { color: 'hsl(120, 70%, 50%)' } },  // Green
  '@0.6s': { fill: { color: 'hsl(180, 70%, 50%)' } },  // Cyan
  '@0.8s': { fill: { color: 'hsl(240, 70%, 50%)' } },  // Blue
  '@1s': { fill: { color: 'hsl(300, 70%, 50%)' } }     // Magenta
}
```

### Complex Morphing

```tsx
// Shape morphing animation
timeline: {
  '@0s': {
    size: { width: 100, height: 100 },
    appearance: { radius: 50 },           // Circle
    fill: { color: 'primary6' }
  },
  '@0.5s': {
    size: { width: 141, height: 71 },     // Aspect ratio change
    appearance: { radius: 8 },            // Rounded rectangle  
    fill: { color: 'success6' }
  },
  '@1s': {
    size: { width: 200, height: 50 },     // Wide rectangle
    appearance: { radius: 0 },            // Sharp corners
    fill: { color: 'error6' }
  }
}
```

### Multi-Property Coordination

```tsx
// Coordinated property animation
timeline: {
  '@0s': {
    size: { width: 100 },
    fill: { color: 'primary6' },
    typography: { fontSize: 14 },
    appearance: { opacity: 1 }
  },
  '@0.3s': {
    size: { width: 120 },
    fill: { color: 'primary7' },
    typography: { fontSize: 16 },
    appearance: { opacity: 0.9 }
  },
  '@0.7s': {
    size: { width: 140 },
    fill: { color: 'primary8' },
    typography: { fontSize: 18 },
    appearance: { opacity: 0.8 }
  },
  '@1s': {
    size: { width: 160 },
    fill: { color: 'success6' },
    typography: { fontSize: 20 },
    appearance: { opacity: 1 }
  }
}
```

## Property Animation Performance

### GPU-Accelerated Properties

These properties use hardware acceleration for smooth 60fps animations:

```tsx
// ✅ Highly performant (GPU accelerated)
timeline: {
  '@0s': {
    transform: { translateX: 0, scale: 1, rotate: 0 },
    appearance: { opacity: 1 }
  },
  '@1s': {
    transform: { translateX: 100, scale: 1.2, rotate: 180 },
    appearance: { opacity: 0.8 }
  }
}
```

### Layout-Triggering Properties

Use sparingly as they can cause reflows:

```tsx
// ⚠️ Can trigger layout recalculation
timeline: {
  '@0s': {
    size: { width: 100, height: 100 },
    position: { x: 0, y: 0 }
  },
  '@1s': {
    size: { width: 200, height: 150 },
    position: { x: 50, y: 25 }
  }
}
```

## Dynamic Property Animation

### Conditional Properties

```tsx
timeline: (props, state) => ({
  '@0s': {
    fill: { color: props.isError ? 'error6' : 'primary6' }
  },
  '@1s': {
    fill: { color: props.isError ? 'error8' : 'primary8' },
    appearance: { 
      scale: props.emphasize ? 1.2 : 1.1 
    }
  }
})
```

### Data-Driven Animation

```tsx
timeline: (props, state, eventData) => ({
  '@0s': {
    size: { width: 100 }
  },
  '@1s': {
    size: { width: 100 + (eventData.progress * 100) }, // 100-200px based on data
    fill: { 
      color: eventData.progress > 0.8 ? 'success6' : 'warning6' 
    }
  }
})
```

This comprehensive property system allows you to animate every aspect of a Frame, creating rich, engaging user experiences while maintaining excellent performance through intelligent optimization and GPU acceleration where possible.