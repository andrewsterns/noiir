# Cross-Frame Animation

Cross-frame animation allows one Frame to animate based on events from another Frame using the `frameId:eventName` trigger syntax.

## Basic Usage

### Simple Cross-Frame Animation

```tsx
// Source frame - just needs an id
<Button id="master-button">
  Click me to animate the circle
</Button>

// Target frame - uses frameId:eventName syntax
<Frame 
  animate={{
    'master-button:click': {
      '@0.5s': { 
        fill: { type: 'solid', color: 'success6' },
        appearance: { scale: 1.2 }
      }
    }
  }}
  size={{ width: 100, height: 100 }}
  appearance={{ radius: 50 }}
>
  🎯
</Frame>
```

## ListenFor Syntax

### Event Format
```
listenFor="frameId:eventType"
```

- **frameId**: The `id` prop of the source frame
- **eventType**: The type of event to listen for

### Supported Event Types

```tsx
// Mouse events
<Frame listenFor="source:click">Click events</Frame>
<Frame listenFor="source:doubleClick">Double-click events</Frame>
<Frame listenFor="source:hover">Mouse enter events</Frame>
<Frame listenFor="source:mouseEnter">Mouse enter events (same as hover)</Frame>
<Frame listenFor="source:mouseLeave">Mouse leave events</Frame>

// Keyboard events
<Frame listenFor="source:focus">Focus events</Frame>
<Frame listenFor="source:blur">Blur events</Frame>
<Frame listenFor="source:keyDown">Any key press</Frame>
<Frame listenFor="source:keyDown:Enter">Specific key press</Frame>

// Animation events
<Frame listenFor="source:animationStart">Animation starts</Frame>
<Frame listenFor="source:animationComplete">Animation completes</Frame>
<Frame listenFor="source:animationCancel">Animation cancelled</Frame>
```

## Multiple Listeners

### Array Syntax

```tsx
// Listen to multiple events from same source
<Frame listenFor={['button-a:click', 'button-a:hover']}>
  Responds to click OR hover on button-a
</Frame>

// Listen to events from multiple sources
<Frame listenFor={['button-a:click', 'button-b:click', 'button-c:hover']}>
  Responds to multiple sources
</Frame>
```

### Object Syntax with Different Animations

```tsx
<Frame 
  animate={[
    {
      trigger: 'button-a:click',
      timeline: { '@0.3s': { fill: { color: 'primary8' } } }
    },
    {
      trigger: 'button-b:hover', 
      timeline: { '@0.2s': { appearance: { scale: 1.1 } } }
    }
  ]}
>
  Different animations for different triggers
</Frame>
```

## Event Data Passing

### Receiving Event Data

```tsx
<Frame 
  listenFor="form:submit"
  animate={{
    timeline: {
      '@0.5s': { 
        // Access event data in animation
        fill: { color: '${data.success ? "success6" : "error6"}' }
      }
    }
  }}
>
  Changes color based on form result
</Frame>
```

### Custom Event Data

```tsx
// Source frame can pass custom data
<Frame 
  id="data-source"
  onClick={() => {
    frameEvents.emit('data-source:click', { 
      timestamp: Date.now(),
      userId: currentUser.id 
    });
  }}
>
  Click with custom data
</Frame>

// Listener receives the data
<Frame 
  listenFor="data-source:click"
  animate={{
    timeline: (data) => ({
      '@0.5s': { 
        typography: { 
          content: `Clicked at ${data.timestamp}` 
        }
      }
    })
  }}
>
  Displays custom data
</Frame>
```

## Advanced Patterns

### One-to-Many Communication

```tsx
// One source, multiple listeners
<Button id="master-control">Master Control</Button>

<Frame listenFor="master-control:click">Target 1</Frame>
<Frame listenFor="master-control:click">Target 2</Frame>  
<Frame listenFor="master-control:click">Target 3</Frame>
<Frame listenFor="master-control:click">Target 4</Frame>
```

### Many-to-One Communication

```tsx
// Multiple sources, one listener
<Button id="btn-1">Button 1</Button>
<Button id="btn-2">Button 2</Button>
<Button id="btn-3">Button 3</Button>

<Frame listenFor={['btn-1:click', 'btn-2:click', 'btn-3:click']}>
  Responds to any button click
</Frame>
```

### Chained Communication

```tsx
// Create animation chains
<Frame id="step-1" animate={{ trigger: 'click' }}>
  Step 1
</Frame>

<Frame 
  id="step-2" 
  listenFor="step-1:animationComplete"
  animate={{
    timeline: { '@0.5s': { fill: { color: 'success6' } } }
  }}
>
  Step 2 (starts when step-1 finishes)
</Frame>

<Frame 
  id="step-3"
  listenFor="step-2:animationComplete"
>
  Step 3 (starts when step-2 finishes)
</Frame>
```

## Conditional Listening

### Listen with Conditions

```tsx
<Frame 
  listenFor="source:click"
  animate={{
    condition: (props, state, eventData) => {
      return props.isEnabled && !state.isAnimating;
    },
    timeline: { /* ... */ }
  }}
>
  Only animates if conditions are met
</Frame>
```

### Dynamic Listen Targets

```tsx
const [currentTarget, setCurrentTarget] = useState('button-a');

<Frame listenFor={`${currentTarget}:click`}>
  Dynamically changes what it listens to
</Frame>
```

## Performance Optimization

### Efficient Listening

```tsx
// ✅ Good - Specific event listening
<Frame listenFor="specific-button:click">
  Efficient single listener
</Frame>

// ❌ Avoid - Too broad listening
<Frame listenFor="*:click"> {/* Listens to ALL click events */}
  Inefficient global listener
</Frame>
```

### Lazy Listeners

```tsx
<Frame 
  listenFor="source:click"
  animate={{
    lazy: true, // Only register listener when component is visible
    timeline: { /* ... */ }
  }}
>
  Lazy-loaded listener
</Frame>
```

### Cleanup Management

```tsx
// Automatic cleanup when component unmounts
useEffect(() => {
  // Listeners are automatically cleaned up
  return () => {
    // No manual cleanup needed
  };
}, []);
```

## Debugging ListenFor

### Debug Mode

```tsx
<Frame 
  listenFor="source:click"
  animate={{
    debug: true, // Logs when events are received
    timeline: { /* ... */ }
  }}
>
  Debug enabled
</Frame>
```

### Visual Connection Inspector

```tsx
// Development tool to visualize connections
<FrameConnectionInspector>
  <Frame id="source">Source</Frame>
  <Frame listenFor="source:click">Target 1</Frame>
  <Frame listenFor="source:hover">Target 2</Frame>
</FrameConnectionInspector>
// Shows visual lines connecting sources to listeners
```

## Event Namespacing

### Namespaced Events

```tsx
// Organize events with namespaces
<Frame listenFor="ui:button:primary:click">
  Listens to namespaced events
</Frame>

<Frame listenFor="data:user:updated">
  Listens to data events
</Frame>

<Frame listenFor="animation:sequence:complete">
  Listens to animation events
</Frame>
```

### Wildcard Listening

```tsx
// Listen to event categories
<Frame listenFor="ui:button:*">
  Listens to all button events
</Frame>

<Frame listenFor="data:*">
  Listens to all data events
</Frame>
```

## Global Event System

### Global Listeners

```tsx
// Listen to global application events
<Frame listenFor="global:route-changed">
  Animates on route changes
</Frame>

<Frame listenFor="global:theme-toggled">
  Animates on theme changes
</Frame>

<Frame listenFor="global:user-logged-in">
  Animates on user login
</Frame>
```

### Custom Global Events

```tsx
// Emit global events from anywhere
const handleSuccess = () => {
  frameEvents.emitGlobal('operation-complete', { 
    success: true,
    message: 'Data saved successfully'
  });
};

// Listen to global events
<Frame listenFor="global:operation-complete">
  Shows success animation
</Frame>
```

## Real-World Examples

### Navigation Animation

```tsx
// Animate multiple elements when nav item is hovered
<Frame id="nav-products">Products</Frame>

<Frame listenFor="nav-products:hover">Dropdown Menu</Frame>
<Frame listenFor="nav-products:hover">Background Overlay</Frame>
<Frame listenFor="nav-products:hover">Arrow Icon</Frame>
```

### Form Validation Animation

```tsx
<Form id="contact-form">
  <Input id="email-field" />
  <Button type="submit">Submit</Button>
</Form>

<Frame listenFor="email-field:invalid">
  Error message animation
</Frame>

<Frame listenFor="contact-form:submit-success">
  Success checkmark animation
</Frame>
```

### Shopping Cart Animation

```tsx
<Button id="add-to-cart">Add to Cart</Button>
<Frame id="cart-icon" listenFor="add-to-cart:click">
  🛒 {cartCount}
</Frame>

<Frame listenFor="add-to-cart:click">
  Cart notification popup
</Frame>
```

The `listenFor` system creates a powerful, declarative way to coordinate animations across your entire application while maintaining clean component boundaries and excellent performance.