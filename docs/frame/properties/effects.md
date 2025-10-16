# Effects Properties

Effects properties add visual depth and polish to Frames through shadows, blurs, glows, and other visual enhancements - creating modern, layered interfaces.

## Shadow Effects

Shadows create depth and visual hierarchy by simulating lighting and elevation.

```tsx
interface ShadowEffect {
  type: 'drop-shadow' | 'inner-shadow';
  color: string;
  blur: number;
  spread?: number;
  offset?: { x: number; y: number };
  opacity?: number;
  inset?: boolean;
}

interface EffectsProps {
  effects?: ShadowEffect[];
}
```

### Drop Shadows

Basic drop shadows for elevation and depth.

```tsx
// Subtle card shadow
<Frame
  fill={{ type: 'solid', color: 'white' }}
  appearance={{ radius: 8 }}
  effects={[
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.1)',
      blur: 8,
      offset: { x: 0, y: 2 }
    }
  ]}
  size={{ width: 280, height: 160 }}
>
  Card with subtle shadow
</Frame>

// Medium elevation shadow
<Frame
  fill={{ type: 'solid', color: 'white' }}
  appearance={{ radius: 12 }}
  effects={[
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.15)',
      blur: 16,
      offset: { x: 0, y: 4 },
      spread: 0
    }
  ]}
>
  Medium elevation
</Frame>

// High elevation shadow
<Frame
  fill={{ type: 'solid', color: 'white' }}
  appearance={{ radius: 16 }}
  effects={[
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.2)',
      blur: 24,
      offset: { x: 0, y: 8 },
      spread: 0
    }
  ]}
>
  High elevation
</Frame>
```

### Colored Shadows

Use colored shadows for brand accent and visual interest.

```tsx
// Primary color shadow
<Frame
  fill={{ type: 'solid', color: 'primary6' }}
  appearance={{ radius: 8 }}
  effects={[
    {
      type: 'drop-shadow',
      color: 'primary6',
      blur: 20,
      offset: { x: 0, y: 4 },
      opacity: 0.3
    }
  ]}
  typography={{ color: 'white' }}
>
  Primary glow effect
</Frame>

// Success shadow
<Frame
  fill={{ type: 'solid', color: 'success6' }}
  appearance={{ radius: 8 }}
  effects={[
    {
      type: 'drop-shadow',
      color: 'success6',
      blur: 16,
      offset: { x: 0, y: 2 },
      opacity: 0.4
    }
  ]}
>
  Success state with glow
</Frame>

// Warning shadow
<Frame
  fill={{ type: 'solid', color: 'warning6' }}
  appearance={{ radius: 8 }}
  effects={[
    {
      type: 'drop-shadow',
      color: 'warning6',
      blur: 12,
      offset: { x: 0, y: 3 },
      opacity: 0.5
    }
  ]}
>
  Warning with colored shadow
</Frame>
```

### Multiple Shadows

Layer multiple shadows for complex lighting effects.

```tsx
// Realistic material shadow
<Frame
  fill={{ type: 'solid', color: 'white' }}
  appearance={{ radius: 12 }}
  effects={[
    // Ambient shadow (soft, large)
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.04)',
      blur: 32,
      offset: { x: 0, y: 0 },
      spread: 0
    },
    // Direct shadow (sharper, offset)
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.12)',
      blur: 8,
      offset: { x: 0, y: 4 },
      spread: 0
    }
  ]}
>
  Realistic material shadow
</Frame>

// Neon glow effect
<Frame
  fill={{ type: 'solid', color: 'primary8' }}
  appearance={{ radius: 8 }}
  effects={[
    // Inner glow
    {
      type: 'inner-shadow',
      color: 'primary4',
      blur: 8,
      offset: { x: 0, y: 0 },
      spread: 2
    },
    // Outer glow (close)
    {
      type: 'drop-shadow',
      color: 'primary6',
      blur: 8,
      offset: { x: 0, y: 0 },
      spread: 0,
      opacity: 0.8
    },
    // Outer glow (far)
    {
      type: 'drop-shadow',
      color: 'primary6',
      blur: 20,
      offset: { x: 0, y: 0 },
      spread: 0,
      opacity: 0.4
    }
  ]}
  typography={{ color: 'white' }}
>
  Neon glow effect
</Frame>
```

## Inner Shadows

Inner shadows create inset, carved, or pressed appearances.

```tsx
// Inset button effect
<Frame
  fill={{ type: 'solid', color: 'neutral2' }}
  appearance={{ radius: 6 }}
  effects={[
    {
      type: 'inner-shadow',
      color: 'rgba(0,0,0,0.2)',
      blur: 4,
      offset: { x: 0, y: 2 },
      spread: 0
    }
  ]}
  autoLayout={{ padding: { horizontal: 16, vertical: 8 } }}
>
  Pressed button
</Frame>

// Input field inset
<Frame
  fill={{ type: 'solid', color: 'white' }}
  stroke={{ color: 'neutral3', weight: 1 }}
  appearance={{ radius: 6 }}
  effects={[
    {
      type: 'inner-shadow',
      color: 'rgba(0,0,0,0.05)',
      blur: 2,
      offset: { x: 0, y: 1 },
      spread: 0
    }
  ]}
  size={{ width: 280, height: 40 }}
>
  Input field with inset
</Frame>

// Deep inset effect
<Frame
  fill={{ type: 'solid', color: 'neutral1' }}
  appearance={{ radius: 8 }}
  effects={[
    {
      type: 'inner-shadow',
      color: 'rgba(0,0,0,0.3)',
      blur: 8,
      offset: { x: 0, y: 4 },
      spread: 2
    }
  ]}
  size={{ width: 200, height: 100 }}
  autoLayout={{ alignment: 'center' }}
>
  Deep carved effect
</Frame>
```

## Blur Effects

Blur effects create focus, depth of field, and glassmorphism styles.

```tsx
interface BlurEffect {
  type: 'blur' | 'backdrop-blur';
  radius: number;
  opacity?: number;
}
```

### Background Blur

```tsx
// Backdrop blur for glassmorphism
<Frame
  fill={{ 
    type: 'solid', 
    color: 'white',
    opacity: 0.1
  }}
  appearance={{ radius: 16 }}
  effects={[
    {
      type: 'backdrop-blur',
      radius: 10
    },
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.1)',
      blur: 8,
      offset: { x: 0, y: 4 }
    }
  ]}
  stroke={{ color: 'white', weight: 1, opacity: 0.2 }}
  size={{ width: 320, height: 200 }}
>
  Glassmorphism panel
</Frame>

// Modal backdrop
<Frame
  fill={{ 
    type: 'solid', 
    color: 'black',
    opacity: 0.3
  }}
  effects={[
    {
      type: 'backdrop-blur',
      radius: 8
    }
  ]}
  position={{ 
    type: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0
  }}
>
  Blurred modal backdrop
</Frame>
```

### Content Blur

```tsx
// Focus blur (blur background content)
<Frame
  effects={[
    {
      type: 'blur',
      radius: 4,
      opacity: 0.8
    }
  ]}
>
  Blurred background content
</Frame>

// Loading state blur
<Frame
  effects={[
    {
      type: 'blur',
      radius: isLoading ? 2 : 0
    }
  ]}
  animate={{
    trigger: 'auto',
    duration: '0.3s'
  }}
>
  Content that blurs when loading
</Frame>
```

## Glow Effects

Create luminous, energy, and highlight effects.

```tsx
// Soft glow
<Frame
  fill={{ type: 'solid', color: 'primary6' }}
  appearance={{ radius: 8 }}
  effects={[
    {
      type: 'drop-shadow',
      color: 'primary6',
      blur: 16,
      offset: { x: 0, y: 0 },
      spread: 0,
      opacity: 0.5
    }
  ]}
  typography={{ color: 'white' }}
>
  Soft glow button
</Frame>

// Intense glow
<Frame
  fill={{ type: 'solid', color: 'success6' }}
  appearance={{ radius: 6 }}
  effects={[
    {
      type: 'drop-shadow',
      color: 'success4',
      blur: 8,
      offset: { x: 0, y: 0 },
      spread: 2,
      opacity: 0.8
    },
    {
      type: 'drop-shadow',
      color: 'success6',
      blur: 20,
      offset: { x: 0, y: 0 },
      spread: 0,
      opacity: 0.6
    }
  ]}
>
  Intense glow effect
</Frame>

// Pulsing glow
<Frame
  fill={{ type: 'solid', color: 'warning6' }}
  appearance={{ radius: 50 }}
  size={{ width: 100, height: 100 }}
  effects={[
    {
      type: 'drop-shadow',
      color: 'warning6',
      blur: 20,
      offset: { x: 0, y: 0 },
      spread: 0,
      opacity: 0.7
    }
  ]}
  animate={{
    trigger: 'auto',
    duration: '2s',
    repeat: 'infinite',
    timeline: {
      '@0s': { 
        effects: [{ 
          blur: 20, 
          opacity: 0.7 
        }] 
      },
      '@1s': { 
        effects: [{ 
          blur: 30, 
          opacity: 0.9 
        }] 
      },
      '@2s': { 
        effects: [{ 
          blur: 20, 
          opacity: 0.7 
        }] 
      }
    }
  }}
>
  Pulsing indicator
</Frame>
```

## Material Design Elevation

Standard Material Design shadow elevations.

```tsx
const elevationShadows = {
  1: [
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.2)',
      blur: 2,
      offset: { x: 0, y: 1 }
    },
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.12)',
      blur: 1,
      offset: { x: 0, y: 1 }
    }
  ],
  2: [
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.2)',
      blur: 4,
      offset: { x: 0, y: 1 }
    },
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.14)',
      blur: 2,
      offset: { x: 0, y: 2 }
    }
  ],
  4: [
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.2)',
      blur: 8,
      offset: { x: 0, y: 2 }
    },
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.14)',
      blur: 4,
      offset: { x: 0, y: 4 }
    }
  ],
  8: [
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.2)',
      blur: 16,
      offset: { x: 0, y: 4 }
    },
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.14)',
      blur: 8,
      offset: { x: 0, y: 8 }
    }
  ],
  16: [
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.2)',
      blur: 32,
      offset: { x: 0, y: 8 }
    },
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.14)',
      blur: 16,
      offset: { x: 0, y: 16 }
    }
  ]
};

// Usage
<Frame
  effects={elevationShadows[4]}
  fill={{ type: 'solid', color: 'white' }}
  appearance={{ radius: 8 }}
>
  Material elevation 4
</Frame>
```

## Real-World Effects Examples

### Interactive Button States

```tsx
const InteractiveButton = ({ children, variant = 'primary' }) => {
  const [state, setState] = useState('default');
  
  const buttonEffects = {
    default: [
      {
        type: 'drop-shadow',
        color: 'rgba(0,0,0,0.1)',
        blur: 4,
        offset: { x: 0, y: 2 }
      }
    ],
    hover: [
      {
        type: 'drop-shadow',
        color: 'rgba(0,0,0,0.15)',
        blur: 8,
        offset: { x: 0, y: 4 }
      }
    ],
    active: [
      {
        type: 'inner-shadow',
        color: 'rgba(0,0,0,0.2)',
        blur: 4,
        offset: { x: 0, y: 2 }
      }
    ]
  };

  return (
    <Frame
      fill={{ type: 'solid', color: 'primary6' }}
      appearance={{ radius: 8 }}
      effects={buttonEffects[state]}
      autoLayout={{ padding: { horizontal: 24, vertical: 12 } }}
      typography={{ color: 'white', fontWeight: 600 }}
      animate={{
        trigger: 'state',
        duration: '0.2s'
      }}
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onMouseDown={() => setState('active')}
      onMouseUp={() => setState('hover')}
    >
      {children}
    </Frame>
  );
};
```

### Card Hover Effects

```tsx
const HoverCard = ({ children }) => (
  <Frame
    fill={{ type: 'solid', color: 'white' }}
    appearance={{ radius: 12 }}
    size={{ width: 320, height: 200 }}
    autoLayout={{ padding: 24 }}
    effects={[
      {
        type: 'drop-shadow',
        color: 'rgba(0,0,0,0.1)',
        blur: 8,
        offset: { x: 0, y: 2 }
      }
    ]}
    animate={{
      trigger: 'hover',
      duration: '0.3s',
      timeline: {
        '@0s': {
          effects: [
            {
              type: 'drop-shadow',
              color: 'rgba(0,0,0,0.1)',
              blur: 8,
              offset: { x: 0, y: 2 }
            }
          ],
          position: { y: 0 }
        },
        '@0.3s': {
          effects: [
            {
              type: 'drop-shadow',
              color: 'rgba(0,0,0,0.2)',
              blur: 24,
              offset: { x: 0, y: 8 }
            }
          ],
          position: { y: -4 }
        }
      }
    }}
  >
    {children}
  </Frame>
);
```

### Loading Shimmer Effect

```tsx
const ShimmerEffect = () => (
  <Frame
    size={{ width: 300, height: 20 }}
    fill={{ type: 'solid', color: 'neutral2' }}
    appearance={{ radius: 4 }}
    effects={[
      {
        type: 'inner-shadow',
        color: 'rgba(255,255,255,0.5)',
        blur: 0,
        offset: { x: 0, y: 0 },
        spread: 1
      }
    ]}
    animate={{
      trigger: 'auto',
      duration: '1.5s',
      repeat: 'infinite',
      timeline: {
        '@0s': {
          fill: {
            type: 'linear-gradient',
            angle: 90,
            stops: [
              { color: 'neutral2', position: 0 },
              { color: 'neutral3', position: 0.5 },
              { color: 'neutral2', position: 1 }
            ]
          }
        },
        '@0.75s': {
          fill: {
            type: 'linear-gradient',
            angle: 90,
            stops: [
              { color: 'neutral3', position: 0 },
              { color: 'neutral2', position: 0.5 },
              { color: 'neutral3', position: 1 }
            ]
          }
        },
        '@1.5s': {
          fill: {
            type: 'linear-gradient',
            angle: 90,
            stops: [
              { color: 'neutral2', position: 0 },
              { color: 'neutral3', position: 0.5 },
              { color: 'neutral2', position: 1 }
            ]
          }
        }
      }
    }}
  />
);
```

### Notification Toast

```tsx
const ToastNotification = ({ type = 'info', children }) => {
  const toastStyles = {
    info: {
      fill: { type: 'solid', color: 'primary1' },
      stroke: { color: 'primary6', weight: 1, sides: 'left' },
      effects: [
        {
          type: 'drop-shadow',
          color: 'primary6',
          blur: 8,
          offset: { x: 0, y: 2 },
          opacity: 0.2
        }
      ]
    },
    success: {
      fill: { type: 'solid', color: 'success1' },
      stroke: { color: 'success6', weight: 1, sides: 'left' },
      effects: [
        {
          type: 'drop-shadow',
          color: 'success6',
          blur: 8,
          offset: { x: 0, y: 2 },
          opacity: 0.2
        }
      ]
    },
    error: {
      fill: { type: 'solid', color: 'error1' },
      stroke: { color: 'error6', weight: 1, sides: 'left' },
      effects: [
        {
          type: 'drop-shadow',
          color: 'error6',
          blur: 8,
          offset: { x: 0, y: 2 },
          opacity: 0.2
        }
      ]
    }
  };

  return (
    <Frame
      size={{ width: 360, height: 'hug' }}
      appearance={{ radius: 8 }}
      autoLayout={{ padding: 16 }}
      {...toastStyles[type]}
      animate={{
        trigger: 'enter',
        duration: '0.3s',
        timeline: {
          '@0s': {
            position: { x: 400 },
            opacity: 0
          },
          '@0.3s': {
            position: { x: 0 },
            opacity: 1
          }
        }
      }}
    >
      {children}
    </Frame>
  );
};
```

### Focus States

```tsx
const FocusableElement = ({ children, focused = false }) => (
  <Frame
    fill={{ type: 'solid', color: 'white' }}
    stroke={{ color: 'neutral4', weight: 1 }}
    appearance={{ radius: 6 }}
    effects={focused ? [
      {
        type: 'drop-shadow',
        color: 'primary6',
        blur: 0,
        offset: { x: 0, y: 0 },
        spread: 2,
        opacity: 0.3
      },
      {
        type: 'drop-shadow',
        color: 'primary6',
        blur: 8,
        offset: { x: 0, y: 0 },
        spread: 0,
        opacity: 0.2
      }
    ] : []}
    autoLayout={{ padding: 12 }}
    animate={{
      trigger: 'focus',
      duration: '0.2s'
    }}
  >
    {children}
  </Frame>
);
```

## Performance Considerations

### Efficient Shadow Usage

```tsx
// ✅ Good - Simple shadows
effects={[
  {
    type: 'drop-shadow',
    color: 'rgba(0,0,0,0.1)',
    blur: 8,
    offset: { x: 0, y: 2 }
  }
]}

// ❌ Avoid - Too many complex shadows
effects={[
  // 10+ shadow effects with high blur values
  // Can cause performance issues
]}
```

### Conditional Effects

```tsx
// ✅ Good - Apply effects conditionally
effects={interactive ? [
  {
    type: 'drop-shadow',
    color: 'rgba(0,0,0,0.15)',
    blur: 12,
    offset: { x: 0, y: 4 }
  }
] : undefined}

// ✅ Good - Use will-change for animations
<Frame
  effects={animatedEffects}
  style={{ willChange: 'box-shadow' }}
>
  Animated shadows
</Frame>
```

## Animation with Effects

Effects can be smoothly animated for dynamic visual feedback:

```tsx
<Frame
  animate={{
    trigger: 'hover',
    duration: '0.3s',
    timeline: {
      '@0s': {
        effects: [
          {
            type: 'drop-shadow',
            color: 'rgba(0,0,0,0.1)',
            blur: 4,
            offset: { x: 0, y: 2 }
          }
        ]
      },
      '@0.3s': {
        effects: [
          {
            type: 'drop-shadow',
            color: 'rgba(0,0,0,0.2)',
            blur: 16,
            offset: { x: 0, y: 8 }
          }
        ]
      }
    }
  }}
>
  Animated shadow on hover
</Frame>

// Glow intensity animation
<Frame
  animate={{
    trigger: 'pulse',
    duration: '2s',
    repeat: 'infinite',
    timeline: {
      '@0s': {
        effects: [
          {
            type: 'drop-shadow',
            color: 'primary6',
            blur: 8,
            opacity: 0.3
          }
        ]
      },
      '@1s': {
        effects: [
          {
            type: 'drop-shadow',
            color: 'primary6',
            blur: 20,
            opacity: 0.8
          }
        ]
      },
      '@2s': {
        effects: [
          {
            type: 'drop-shadow',
            color: 'primary6',
            blur: 8,
            opacity: 0.3
          }
        ]
      }
    }
  }}
>
  Pulsing glow effect
</Frame>
```

Effects properties enable sophisticated visual enhancements that create depth, focus, and polish - elevating Frame components from flat elements to rich, interactive experiences.