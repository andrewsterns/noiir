# Animation Triggers

Animation triggers are defined as keys in the Frame's `animate` object. Each trigger defines what user interaction or event will start that specific animation.

## Self-Triggers

Self-triggers animate the Frame based on its own user interactions. The cleanest syntax uses trigger names as keys:

### Mouse Events

```tsx
// Hover animations
<Frame animate={{
  hover: { '@0.3s': { fill: { color: 'primary7' } } }
}}>
  Animates on mouse enter
</Frame>

<Frame animate={{
  mouseEnter: { '@0.3s': { fill: { color: 'primary7' } } },
  mouseLeave: { '@0.3s': { fill: { color: 'primary6' } } }
}}>
  Separate enter and leave animations
</Frame>

// Click animations
<Frame animate={{
  click: { '@0.2s': { appearance: { scale: 0.95 } } }
}}>
  Animates on click
</Frame>

<Frame animate={{
  doubleClick: { '@0.5s': { appearance: { scale: 1.2 } } }
}}>
  Animates on double click
</Frame>

// Multiple triggers on same Frame
<Frame animate={{
  hover: { '@0.3s': { fill: { color: 'primary7' } } },
  click: { '@0.2s': { appearance: { scale: 0.95 } } },
  focus: { '@0.1s': { stroke: { color: 'primary6', weight: 2 } } }
}}>
  Multiple animations for different triggers
</Frame>
```

### Keyboard Events

```tsx
// Focus animations
<Frame animate={{
  focus: { '@0.2s': { stroke: { color: 'primary6', weight: 2 } } }
}}>
  Animates when focused
</Frame>

<Frame animate={{
  blur: { '@0.2s': { stroke: { color: 'neutral4', weight: 1 } } }
}}>
  Animates when focus is lost
</Frame>

// Specific key triggers
<Frame animate={{
  'keyDown:Enter': { '@0.1s': { fill: { color: 'success6' } } }
}}>
  Animates when Enter key is pressed
</Frame>

<Frame animate={{
  'keyDown:Space': { '@0.1s': { appearance: { scale: 0.98 } } }
}}>
  Animates when Space key is pressed
</Frame>

<Frame animate={{
  'keyDown:Escape': { '@0.2s': { fill: { color: 'error6' } } }
}}>
  Animates when Escape key is pressed
</Frame>
```

### Lifecycle Events

```tsx
// Component lifecycle
<Frame animate={{
  mount: { '@0s': { opacity: 0 }, '@0.3s': { opacity: 1 } }
}}>
  Animates when component mounts
</Frame>

<Frame animate={{
  unmount: { '@0s': { opacity: 1 }, '@0.2s': { opacity: 0 } }
}}>  
  Animates when component unmounts
</Frame>

// Visibility triggers
<Frame animate={{
  visible: { '@0s': { position: { y: 20 } }, '@0.5s': { position: { y: 0 } } }
}}>
  Animates when scrolled into view
</Frame>

<Frame animate={{
  hidden: { '@0.3s': { opacity: 0 } }
}}>
  Animates when scrolled out of view
</Frame>
```

## Cross-Frame Triggers

Cross-frame triggers allow one Frame to animate another Frame based on events. The syntax uses `frameId:eventName` as the trigger key.

### Basic Syntax

```tsx
// Trigger source - just needs an id
<Frame id="source-frame">
  I can trigger animations in other frames
</Frame>

// Animation target - listens using frameId:eventName syntax
<Frame animate={{
  'source-frame:click': { '@0.5s': { fill: { color: 'success6' } } }
}}>
  I animate when source-frame is clicked
</Frame>
```

### Event Types

```tsx
// Click events
<Frame animate={{
  'button-a:click': { '@0.3s': { fill: { color: 'success6' } } }
}}>
  Animates when button-a is clicked
</Frame>

<Frame animate={{
  'button-a:doubleClick': { '@0.5s': { appearance: { scale: 1.1 } } }
}}>
  Animates when button-a is double-clicked
</Frame>

// Hover events
<Frame animate={{
  'nav-item:hover': { '@0.2s': { fill: { color: 'primary1' } } }
}}>
  Animates when nav-item is hovered
</Frame>

<Frame animate={{
  'nav-item:mouseLeave': { '@0.2s': { fill: { color: 'white' } } }
}}>
  Animates when mouse leaves nav-item
</Frame>

// Focus events
<Frame animate={{
  'input-field:focus': { '@0.1s': { stroke: { color: 'primary6', weight: 2 } } }
}}>
  Animates when input-field receives focus
</Frame>

<Frame animate={{
  'input-field:blur': { '@0.2s': { stroke: { color: 'neutral4', weight: 1 } } }
}}>
  Animates when input-field loses focus
</Frame>
```

### Multiple Sources

```tsx
// Same animation for multiple triggers
<Frame animate={{
  'button-a:click': { '@0.3s': { fill: { color: 'success6' } } },
  'button-b:click': { '@0.3s': { fill: { color: 'success6' } } },
  'button-c:hover': { '@0.3s': { fill: { color: 'success6' } } }
}}>
  Animates when any of these events occur
</Frame>

// Different animations for different triggers
<Frame animate={{
  'master:click': { '@0.2s': { appearance: { scale: 1.05 } } },
  'master:hover': { '@0.3s': { fill: { color: 'primary7' } } },
  'secondary:click': { '@0.4s': { fill: { color: 'secondary6' } } }
}}>
  Different animations for different sources
</Frame>
```

## Custom Triggers

### Custom Event Names

```tsx
// Custom trigger events
<Frame animate={{
  'data-loaded': { '@0.5s': { opacity: 1 } }
}}>
  Animates when custom 'data-loaded' event is fired
</Frame>

// Fire custom events programmatically
const triggerCustomEvent = () => {
  frameAnimations.emit('data-loaded');
};
```

### Advanced Trigger Options

```tsx
// Trigger with conditions
<Frame animate={{
  click: {
    condition: (props, state) => !props.disabled && state.isReady,
    timeline: { '@0.2s': { fill: { color: 'success6' } } }
  }
}}>
  Only animates if conditions are met
</Frame>

// Debounced triggers
<Frame animate={{
  hover: {
    debounce: 300, // Wait 300ms between triggers
    timeline: { '@0.3s': { fill: { color: 'primary7' } } }
  }
}}>
  Debounced hover animation
</Frame>

// Trigger with custom timing
<Frame animate={{
  click: {
    delay: 200, // Wait 200ms before starting
    timeline: { '@0.3s': { appearance: { scale: 1.1 } } }
  }
}}>
  Delayed animation start
</Frame>
```

## Advanced Trigger Patterns

### Trigger Chains

```tsx
// Sequential triggers using animationComplete events
<Frame 
  id="step-1" 
  animate={{
    click: { '@0.3s': { fill: { color: 'success6' } } }
  }}
>
  Step 1
</Frame>

<Frame 
  id="step-2"
  animate={{
    'step-1:animationComplete': { '@0.3s': { fill: { color: 'success6' } } }
  }}
>
  Step 2 (starts when step-1 finishes)
</Frame>

<Frame 
  id="step-3"
  animate={{
    'step-2:animationComplete': { '@0.3s': { fill: { color: 'success6' } } }
  }}
>
  Step 3 (starts when step-2 finishes)
</Frame>
```

### State-Based Triggers

```tsx
// Trigger based on prop changes
<Frame 
  animate={{
    'prop:isLoading': { // Triggers when isLoading prop changes
      '@0s': { opacity: 0.5 },
      '@0.3s': { opacity: 1 }
    }
  }}
  isLoading={loadingState}
>
  Loading indicator
</Frame>

// Trigger based on data changes
<Frame 
  animate={{
    'data:users': { // Triggers when users data changes
      '@0s': { appearance: { scale: 0.95 } },
      '@0.2s': { appearance: { scale: 1.0 } }
    }
  }}
  data={{ users }}
>
  User list animation
</Frame>
```

### Global Triggers

```tsx
// Global event triggers
<Frame animate={{
  'global:theme-changed': { '@0.3s': { fill: { color: 'primary6' } } }
}}>
  Animates when theme changes globally
</Frame>

<Frame animate={{
  'global:route-changed': { '@0.5s': { position: { x: 0 } } }
}}>
  Animates on route changes
</Frame>

<Frame animate={{
  'global:window-resized': { '@0.2s': { size: { width: '100%' } } }
}}>
  Animates when window is resized
</Frame>
```

## Trigger Performance

### Efficient Patterns

```tsx
// ✅ Good - Self-animation (no event bus overhead)
<Frame animate={{
  hover: { '@0.3s': { fill: { color: 'primary7' } } }
}}>
  Efficient self-animation
</Frame>

// ✅ Good - Specific cross-frame trigger
<Frame animate={{
  'specific-button:click': { '@0.2s': { appearance: { scale: 1.05 } } }
}}>
  Efficient cross-frame animation
</Frame>

// ✅ Good - Multiple triggers on same Frame
<Frame animate={{
  hover: { '@0.3s': { fill: { color: 'primary7' } } },
  click: { '@0.2s': { appearance: { scale: 0.95 } } },
  focus: { '@0.1s': { stroke: { color: 'primary6', weight: 2 } } }
}}>
  Multiple efficient triggers
</Frame>
```

### Patterns to Avoid

```tsx
// ❌ Avoid - Too many cross-frame listeners
{items.map(item => (
  <Frame 
    key={item.id}
    animate={{
      'master:hover': { '@0.3s': { fill: { color: 'primary6' } } }
    }}
  >
    Creates many listeners
  </Frame>
))}

// ✅ Better - Use a wrapper with single listener
<Frame animate={{
  'master:hover': {
    '@0.3s': { 
      // Animate wrapper, children inherit
      fill: { color: 'primary1' }
    }
  }
}}>
  {items.map(item => <Frame key={item.id}>{item.name}</Frame>)}
</Frame>
```

## Debugging Triggers

### Debug Mode

```tsx
<Frame animate={{
  click: {
    debug: true, // Logs trigger events
    timeline: { '@0.2s': { fill: { color: 'success6' } } }
  }
}}>
  Debug enabled
</Frame>

// Global debug mode
<FrameAnimationProvider debug>
  <App />
</FrameAnimationProvider>
```

### Trigger Inspector

```tsx
// Development helper
<FrameTriggerInspector>
  <Frame id="button-a">Button A</Frame>
  <Frame animate={{
    'button-a:click': { '@0.3s': { fill: { color: 'success6' } } }
  }}>
    Target
  </Frame>
</FrameTriggerInspector>
// Shows visual connections between triggers and listeners
```

## Browser Events Integration

### Native Event Integration

```tsx
// Integration with native browser events
<Frame animate={{
  'scroll:up': { '@0.3s': { position: { y: -10 } } },    // Page scroll up
  'scroll:down': { '@0.3s': { position: { y: 10 } } },   // Page scroll down  
  'resize': { '@0.2s': { size: { width: '100%' } } },    // Window resize
  'orientation': { '@0.5s': { appearance: { rotate: 90 } } } // Device orientation change
}}>
  Responds to browser events
</Frame>

// Media query triggers
<Frame animate={{
  'media:mobile': { '@0.3s': { size: { width: '100%' } } },
  'media:desktop': { '@0.3s': { size: { width: '50%' } } }
}}>
  Responsive animations
</Frame>
```

## Real-World Examples

### Interactive Button

```tsx
export const InteractiveButton = () => (
  <Frame
    fill={{ type: 'solid', color: 'primary6' }}
    appearance={{ radius: 8 }}
    autoLayout={{ padding: { horizontal: 16, vertical: 12 } }}
    typography={{ color: 'white', fontWeight: 600 }}
    animate={{
      hover: { '@0.2s': { fill: { color: 'primary7' } } },
      click: { '@0.1s': { appearance: { scale: 0.95 } } },
      focus: { '@0.1s': { stroke: { color: 'primary3', weight: 2 } } }
    }}
  >
    Multi-State Button
  </Frame>
);
```

### Master-Detail Animation

```tsx
export const MasterDetail = () => (
  <>
    <Frame 
      id="master-list"
      animate={{
        'item:hover': { '@0.3s': { fill: { color: 'neutral1' } } }
      }}
    >
      Master List
    </Frame>
    
    <Frame animate={{
      'master-list:item:hover': { 
        '@0.3s': { 
          opacity: 1,
          position: { x: 0 }
        } 
      }
    }}>
      Detail Panel (shows on item hover)
    </Frame>
  </>
);
```

This trigger-object syntax provides a clean, intuitive way to define complex interactive animations while maintaining performance and readability.