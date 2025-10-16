# Frame Animation System Documentation

The Frame animation system provides declarative, timeline-based animations that can be triggered by user interactions or cross-frame communication.

## Core Concepts

- **Self-Animation**: Frame animates itself based on user interactions
- **Cross-Frame Animation**: Frame animates based on events from other frames
- **Timeline-Based**: Define animation keyframes at specific time points
- **Property-Driven**: Animate any Frame property (fill, size, typography, etc.)

## Quick Start

```tsx
// Self-animating button with multiple triggers
<Button animate={{
  click: { '@0.3s': { appearance: { scale: 0.95 } } },
  hover: { '@0.2s': { fill: { color: 'primary7' } } }
}}>
  Interactive Button
</Button>

// Cross-frame animation
<Frame id="trigger-btn">Source</Frame>
<Frame animate={{
  'trigger-btn:click': { '@0.5s': { fill: { color: 'success6' } } }
}}>
  Target animates when source is clicked
</Frame>
```

## Documentation Structure

### Core API
- [Triggers](./triggers.md) - All available trigger types and clean trigger-object syntax
- [Timeline](./timeline.md) - Animation timeline syntax and keyframes (@0s, @1s, etc.)
- [Properties](./animatable-properties.md) - Complete list of animatable Frame properties
- [Cross-Frame](./cross-frame.md) - frameId:eventName syntax for cross-component animation

### Advanced Features
- [Physics](./physics.md) - Spring-based and physics-driven animations
- [Sequences](./sequences.md) - Chained and staggered animations  
- [Conditions](./conditions.md) - Conditional animation logic
- [Performance](./performance.md) - Optimization strategies and best practices

### Examples
- [Common Patterns](./examples/common-patterns.md) - Frequently used animation patterns
- [Button Animations](./examples/button-animations.md) - Button-specific examples
- [Layout Animations](./examples/layout-animations.md) - Layout and positioning animations
- [Cross-Component](./examples/cross-component.md) - Complex cross-frame scenarios

## API Overview

```tsx
interface FrameProps {
  // Animation configuration
  animate?: AnimationConfig;
  
  // Cross-frame communication
  id?: string;              // Unique identifier for this frame
  listenFor?: string;       // Listen for events from other frames
  
  // Standard Frame props...
}

interface AnimationConfig {
  trigger: string;          // What triggers this animation
  duration: string;         // Animation duration ('0.3s', '300ms')
  delay?: string;           // Optional delay before starting
  easing?: string;          // CSS easing function
  timeline: Timeline;       // Animation keyframes
  loop?: boolean | number;  // Loop animation
  condition?: Function;     // Conditional animation logic
}
```

## Performance Considerations

- **Self-animations** have zero overhead when not triggered
- **Cross-frame animations** use an efficient event bus system
- **Lazy initialization** - animation system only loads when needed
- **Automatic cleanup** - event listeners are cleaned up on unmount

## Browser Support

- Modern browsers with CSS transitions support
- Graceful degradation on older browsers
- Respects `prefers-reduced-motion` user preference