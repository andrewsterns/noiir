# Animation Actions

Animation actions provide Figma-like interaction capabilities to Frame components. Actions are executed when an animation trigger fires.

## Action Types

```typescript
type AnimationAction = 
  | 'none'           // Default, no action
  | 'changeTo'       // Change to a specific variant (default behavior)
  | 'back'           // Navigate back in browser history
  | 'scrollTo'       // Scroll to a specific element
  | 'openLink'       // Open a URL in a new tab
  | 'openOverlay'    // Open an overlay/modal
  | 'swapOverlay'    // Swap one overlay for another
  | 'closeOverlay'   // Close an overlay/modal
  | ((data?: any) => void); // Custom function action
```

## Basic Usage

```tsx
<Frame
  animate={[
    {
      trigger: 'click',
      action: 'openLink',
      url: 'https://github.com',
      toVariant: 'pressed',
      duration: '0.2s'
    }
  ]}
>
  Click me
</Frame>
```

## Action Examples

### 1. Open Link
Opens a URL in a new browser tab.

```tsx
{
  trigger: 'click',
  action: 'openLink',
  url: 'https://example.com'
}
```

### 2. Scroll To
Scrolls to a specific element by ID.

```tsx
{
  trigger: 'click',
  action: 'scrollTo',
  scrollTargetId: 'section-1',
  scrollBehavior: 'smooth' // 'auto' | 'smooth'
}
```

### 3. Browser Back
Navigates back in browser history.

```tsx
{
  trigger: 'click',
  action: 'back'
}
```

### 4. Custom Function
Execute custom JavaScript when triggered.

```tsx
{
  trigger: 'click',
  action: (animation) => {
    console.log('Clicked!', animation);
    // Your custom logic here
  }
}
```

### 5. Overlay Actions
Open, swap, or close overlays. These emit custom events that your overlay system can listen to.

```tsx
// Open overlay
{
  trigger: 'click',
  action: 'openOverlay',
  overlayId: 'modal-1'
}

// Swap overlay
{
  trigger: 'click',
  action: 'swapOverlay',
  overlayId: 'modal-2'
}

// Close overlay
{
  trigger: 'click',
  action: 'closeOverlay',
  overlayId: 'modal-1'
}
```

## Listening to Overlay Events

To implement overlay functionality, listen to these custom events:

```tsx
useEffect(() => {
  const handleOpenOverlay = (e: CustomEvent) => {
    console.log('Open overlay:', e.detail.overlayId);
    // Your overlay logic here
  };

  window.addEventListener('noiir:openOverlay', handleOpenOverlay);
  window.addEventListener('noiir:swapOverlay', handleSwapOverlay);
  window.addEventListener('noiir:closeOverlay', handleCloseOverlay);

  return () => {
    window.removeEventListener('noiir:openOverlay', handleOpenOverlay);
    window.removeEventListener('noiir:swapOverlay', handleSwapOverlay);
    window.removeEventListener('noiir:closeOverlay', handleCloseOverlay);
  };
}, []);
```

## Combining Actions with Variants

Actions work seamlessly with variant changes:

```tsx
<Frame
  animate={[
    {
      trigger: 'click',
      action: () => console.log('Clicked!'),
      toVariant: 'active',
      duration: '0.2s',
      curve: 'ease-in-out'
    },
    {
      trigger: 'mouseEnter',
      action: 'scrollTo',
      scrollTargetId: 'target',
      toVariant: 'hover',
      duration: '0.15s'
    }
  ]}
/>
```

## Action Properties

| Property | Type | Description | Used By |
|----------|------|-------------|---------|
| `action` | `AnimationAction` | The action to perform | All |
| `url` | `string` | URL to open | `openLink` |
| `overlayId` | `string` | Overlay identifier | `openOverlay`, `swapOverlay`, `closeOverlay` |
| `scrollTargetId` | `string` | Element ID to scroll to | `scrollTo` |
| `scrollBehavior` | `'auto' \| 'smooth'` | Scroll animation type (default: 'smooth') | `scrollTo` |

## Notes

- Actions are executed after the animation starts
- Multiple animations can have the same trigger but different actions
- Custom function actions receive the full animation object as a parameter
- The default action is `'none'` (no action is performed)
- Overlay actions emit custom events for you to implement your overlay system
