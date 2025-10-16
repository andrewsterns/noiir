# Cross-Element Animation System

A comprehensive animation coordination system for Frame components that allows animations to trigger across multiple DOM elements using CSS selector syntax.

## Overview

The Cross-Element Animation System enables Frame components to trigger animations on other elements in the DOM, creating coordinated and interactive user interfaces. It supports both React component coordination and direct DOM element interaction.

## Features

### Core Features
- ✅ **CSS Selector Targeting**: Use `#id.trigger` and `.class.trigger` syntax
- ✅ **Multi-trigger Support**: `hover`, `click`, `toggle`, `focus`, `active`, `disabled`
- ✅ **Performance Optimized**: Adaptive debouncing, memory leak prevention, cleanup
- ✅ **TypeScript Support**: Full type safety with intelligent autocomplete

### Advanced Features
- ✅ **Conditional Animations**: Execute animations based on element state
- ✅ **Animation Chaining**: Trigger cascading animations
- ✅ **Priority System**: Control animation execution order
- ✅ **Once-only Animations**: Animations that only trigger once
- ✅ **Performance Monitoring**: Real-time metrics and optimization

## Quick Start

### Basic Usage

```tsx
// Trigger Element
<Frame
  id="trigger-button"
  animate={{
    // Self animation
    hover: { 
      fill: { color: '#1e40af' },
      duration: '0.2s'
    },
    // Cross-element animation - target element by ID
    '#target-card.hover': { 
      fill: { color: '#10b981' },
      appearance: { opacity: 0.8 },
      duration: '0.3s'
    }
  }}
>
  Hover me to animate the card
</Frame>

// Target Element
<Frame
  id="target-card"
  fill={{ type: 'solid', color: '#6b7280' }}
>
  I will animate when you hover the button
</Frame>
```

### Class Selector Targeting

```tsx
<Frame
  animate={{
    '.card.click': { 
      fill: { color: '#f97316' },
      position: { y: -10 },
      duration: '0.4s'
    }
  }}
>
  Click to animate all cards
</Frame>

{/* All elements with class "card" will animate */}
{cards.map(card => (
  <Frame key={card.id} className="card">
    {card.content}
  </Frame>
))}
```

## Syntax Reference

### Selector Patterns
- `#elementId.trigger` - Target element by ID
- `.className.trigger` - Target elements by class name
- Supported triggers: `hover`, `click`, `toggle`, `focus`, `active`, `disabled`

### Animation Configuration
```typescript
interface AnimationStateConfig {
  // Standard Frame properties
  fill?: FillProps;
  appearance?: AppearanceProps;
  position?: PositionProps;
  // ... other Frame props
  
  // Timing controls
  duration?: string;       // e.g., '0.3s', '200ms'
  timing?: string;         // 'ease', 'ease-in', 'linear', etc.
  delay?: string;          // e.g., '0.1s'
  
  // Advanced features
  condition?: (el: HTMLElement) => boolean; // Conditional execution
  chain?: string[];        // Chain other animations
  priority?: number;       // Execution priority (higher = first)
  once?: boolean;         // Only execute once
}
```

## Advanced Examples

### Conditional Animations
```tsx
<Frame
  animate={{
    '#status-panel.click': {
      fill: { color: '#10b981' },
      condition: (el) => el.dataset.status === 'active',
      duration: '0.3s'
    }
  }}
>
  Click to activate (only if status is active)
</Frame>
```

### Animation Chaining
```tsx
<Frame
  animate={{
    '#card1.hover': {
      fill: { color: '#3b82f6' },
      chain: ['#card2.hover', '#card3.hover'], // Trigger other animations
      duration: '0.2s'
    }
  }}
>
  Hover to trigger chain reaction
</Frame>
```

### Priority System
```tsx
<Frame
  animate={{
    '.high-priority.click': {
      fill: { color: '#ef4444' },
      priority: 10, // Higher priority
      duration: '0.1s'
    },
    '.low-priority.click': {
      fill: { color: '#6b7280' },
      priority: 1,  // Lower priority
      duration: '0.3s'
    }
  }}
>
  Click for prioritized animations
</Frame>
```

### Once-only Animations
```tsx
<Frame
  animate={{
    '#welcome-banner.click': {
      appearance: { opacity: 0 },
      once: true, // Only animate once
      duration: '0.5s'
    }
  }}
>
  Click to dismiss (once only)
</Frame>
```

## Performance

### Built-in Optimizations
- **Adaptive Debouncing**: 16ms (60fps) → 50ms when system stressed
- **Automatic Cleanup**: Removes orphaned listeners every 30 seconds
- **Memory Management**: Tracks and prevents memory leaks
- **Smart Batching**: Limits concurrent animations to prevent frame drops

### Performance Monitoring
```tsx
import { AnimationPerformanceMonitor } from './performance-monitor';

// Add to your app for real-time monitoring
<AnimationPerformanceMonitor detailed={true} />
```

### Performance Metrics
- **Triggers/Second**: Current animation activity
- **Memory Usage**: JavaScript heap usage tracking
- **Active Elements**: Number of registered animation elements
- **DOM Listeners**: Direct DOM event listener count

## API Reference

### AnimationCoordinator Methods
```typescript
// Global coordinator instance
import { animationCoordinator } from './animation-coordinator';

// Trigger animations programmatically
animationCoordinator.triggerAnimation(
  '#target.click', 
  'click', 
  { fill: { color: 'red' } }
);

// Get performance metrics
const metrics = animationCoordinator.getPerformanceMetrics();

// Force cleanup
animationCoordinator.forceCleanup();

// Setup DOM listeners
animationCoordinator.setupDOMListener('#button', 'click');
```

### Performance Hook
```tsx
import { useAnimationPerformance } from './performance-monitor';

function MyComponent() {
  const { metrics, forceCleanup } = useAnimationPerformance();
  
  return (
    <div>
      <p>Triggers/sec: {metrics?.triggersPerSecond}</p>
      <button onClick={forceCleanup}>Cleanup</button>
    </div>
  );
}
```

## Best Practices

### ✅ Do
- Use semantic IDs and class names for better maintainability
- Prefer shorter animation durations (< 300ms) for better UX
- Use the performance monitor during development
- Clean up animations in component unmount
- Group related animations with consistent timing

### ❌ Don't
- Create circular animation chains (A → B → A)
- Use overly complex selectors
- Trigger too many animations simultaneously (> 10)
- Forget to test performance with many elements
- Rely on animations for critical functionality

### Performance Tips
```tsx
// ✅ Good: Reasonable animation count
animate={{
  '#button.hover': { fill: { color: 'blue' } },
  '.card.hover': { appearance: { opacity: 0.9 } }
}}

// ❌ Avoid: Too many cross-element animations
animate={{
  '#elem1.hover': { /* ... */ },
  '#elem2.hover': { /* ... */ },
  '#elem3.hover': { /* ... */ },
  // ... 20+ more animations
}}
```

## Troubleshooting

### Common Issues

#### Animation Not Triggering
1. **Check selector syntax**: Ensure `#id.trigger` format
2. **Verify element exists**: Target element must be in DOM
3. **Check console**: Look for coordinator warnings
4. **Test timing**: Element might not be rendered yet

#### Performance Issues
1. **Monitor triggers/sec**: Use performance monitor
2. **Check animation count**: Limit concurrent animations
3. **Verify cleanup**: Ensure proper component unmounting
4. **Test with production build**: Development has extra overhead

#### Memory Leaks
1. **Enable performance monitoring**: Watch memory usage
2. **Force cleanup**: Use `forceCleanup()` method
3. **Check unmount**: Ensure components clean up properly
4. **Limit listener count**: Max 50 listeners per selector

### Debug Tools
```tsx
// Enable debug logging (development only)
if (process.env.NODE_ENV === 'development') {
  // Performance metrics
  console.table(animationCoordinator.getPerformanceMetrics());
  
  // Active selectors
  console.log(animationCoordinator.getRegisteredSelectors());
}
```

## Examples

See the comprehensive Storybook examples:
- **Basic ID Targeting**: Simple hover animations
- **Class Selector Targeting**: Multiple element animations
- **Toggle Animation Chain**: Complex state management
- **Real-World Dashboard**: Practical usage patterns
- **Performance Monitoring**: Load testing and optimization

## TypeScript Integration

Full TypeScript support with intelligent autocomplete:

```typescript
import type { AnimationProps, AnimationStateConfig } from './types';

const animations: AnimationProps = {
  hover: {
    fill: { color: '#3b82f6' },
    duration: '0.2s'
  },
  '#target.click': {
    appearance: { opacity: 0.8 },
    condition: (el) => el.classList.contains('active'),
    priority: 5
  }
};
```

## Browser Support

- ✅ **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- ✅ **CSS Selectors**: Supports all standard CSS selector syntax
- ✅ **Performance API**: Memory monitoring where available
- ⚠️ **Legacy Browsers**: Graceful degradation, no cross-element animations

## License

This animation system is part of the Noiir design system and follows the same license terms.