# Animate Props Documentation

## Overview
The `animate` prop defines interactions for a Frame, similar to Figma's prototype interactions. It uses a declarative, object-based DSL (Domain-Specific Language) that mirrors variant definitions for simplicity and readability.

## Component Structure Reminder
```jsx
<Frame
  id="idName"
  variant="startVariant"
  variants={VARIANT_LIBRARY}
  animate={[{ /* logic here */ }]}
/>
```

## Format
`animate` is an array of objects, where each object represents an interaction rule. Keys are triggers (e.g., `onHover`) and actions (e.g., `toVariant`).

### Triggers
- `onHover`: Shorthand for `mouseEnter`/`mouseLeave` (hover in/out).
- `onClick`: On click.
- `mouseEnter` / `mouseLeave`: Specific mouse events.
- `onFocus` / `onBlur`: Focus events.
- `afterDelay`: Time-based trigger (auto-fires after delay).
- `onScroll`: On scroll event.
- `hotKey`: On key press (specify `key`).
- `onKey`: General key event.
- `whileHovering`: Continuous while hovering (e.g., for drag states).
- `whilePressing`: Continuous while pressing.
- Add more as needed (e.g., `mouseUp`, `mouseDown`).

### Actions
- `toVariant`: String `'id.variant'` (shorthand for target + variant) or object with options.
- `fromVariant`: String `'id.variant'` for conditional actions (only apply if target is in this variant).
- `toggleVariant`: Array of `'id.variant'` for cycling through variants.
- `scrollTo`: Target ID to scroll to (with optional `scrollBehavior`).
- `duration`: Animation duration (e.g., `'0.15s'`, `200`).
- `curve`: Easing curve (e.g., `'ease'`, `'ease-in'`).
- `delay`: For `afterDelay` (e.g., `'3s'`, `3000`).
- `targetId`: Explicit target Frame ID (optional; parsed from shorthand if not provided).

### Shorthand
- `'id.variant'`: Parses to `targetId: 'id'`, `toVariant: 'variant'` (or `fromVariant: 'variant'`). Variant resolved from target's `variants` library.
- `'parent.child.variant'`: Parses to `targetId: 'parent.child'`, `toVariant: 'variant'`. Supports deeper hierarchies like `'grandparent.parent.child.variant'`.
- If no `id`, assumes current Frame (e.g., `'variant'` → `targetId: currentId`).

### Hierarchical Targeting
The animation system supports targeting deeply nested Frames using dot-separated paths. This allows drilling into multiple layers of components to apply animations.

- `'parent.child.variant'`: Targets the Frame with ID `'child'` that is a child of `'parent'`, changing it to `'variant'`.
- `'grandparent.parent.child.variant'`: Targets the Frame with ID `'child'` that is a child of `'parent'`, which is a child of `'grandparent'`.

The system traverses the component tree based on registered parent-child relationships to resolve the exact target Frame.

Example:
```jsx
<Group id="grandparent">
  <Group id="parent">
    <Frame id="child" variants={{ active: { /* styles */ } }} />
  </Group>
</Group>

// In another component's animate:
{ onClick: { toVariant: 'grandparent.parent.child.active' } }
```

This enables precise targeting across complex component hierarchies, similar to Figma's nested layer selection.

### Examples
```typescript
// Simple hover: Change to variant on hover
{ onHover: 'inputId.primaryHover' }

// Click with options: Change cross-Frame with timing
{ onClick: { toVariant: 'boxId.variant1', duration: '2s', curve: 'ease-in' } }

// Conditional click: Only if inputId is in var1, change to var2
{ onClick: { fromVariant: 'inputId.var1', toVariant: 'inputId.var2' } }

// After delay: Auto-change after 3s
{ afterDelay: { toVariant: 'cursorId.blinkOn', delay: '3s' } }

// Toggle: Cycle variants on click
{ onClick: { toggleVariant: ['inputId.variant1', 'inputId.variant2'] } }

// Scroll: Scroll to target on scroll event
{ onScroll: { scrollTo: 'footerId', scrollBehavior: 'smooth' } }

// Hotkey: Change on key press
{ hotKey: { key: 'Enter', toVariant: 'inputId.submit' } }

// Continuous: While hovering, apply variant
{ whileHovering: 'inputId.dragState' }
```

### Advanced Examples
Here are more detailed examples showing cross-Frame interactions, chaining, and real JSX usage.

#### Cross-Frame Interaction
```jsx
// Frame 1: Button that triggers change on Frame 2
<Frame
  id="buttonId"
  animate={[{
    onClick: {
      fromVariant: 'inputId.var1',  // Condition: only if inputId is in var1
      toVariant: 'inputId.var2',    // Action: change inputId to var2
      duration: '0.5s'
    }
  }]}
/>

// Frame 2: Input that gets affected
<Frame
  id="inputId"
  variant="var1"
  variants={UNIQUE_LIBRARY}  // Contains var1, var2, etc.
/>
```

#### Hover with Toggle and Delay
```jsx
<Frame
  id="menuId"
  animate={[
    {
      onHover: 'menuId.expanded',  // Expand on hover
    },
    {
      mouseLeave: {  // Collapse on leave with delay
        toVariant: 'menuId.collapsed',
        delay: '0.5s'
      }
    },
    {
      onClick: {  // Toggle sub-menu variants
        toggleVariant: ['submenuId.visible', 'submenuId.hidden']
      }
    }
  ]}
/>
```

#### After Delay with Sequence
```jsx
<Frame
  id="notificationId"
  animate={[
    {
      afterDelay: {  // Show notification after 2s
        toVariant: 'notificationId.visible',
        delay: '2s'
      }
    },
    {
      afterDelay: {  // Auto-hide after another 5s
        toVariant: 'notificationId.hidden',
        delay: '7s'  // Total 2s + 5s
      }
    }
  ]}
/>
```

#### Key-Based Interaction
```jsx
<Frame
  id="formId"
  animate={[
    {
      onKey: {  // Submit on Enter
        key: 'Enter',
        toVariant: 'formId.submitted'
      }
    },
    {
      hotKey: {  // Cancel on Ctrl+Z
        key: 'z',
        toVariant: 'formId.cancelled'
      }
    }
  ]}
/>
```

#### Scroll and Continuous Triggers
```jsx
<Frame
  id="scrollIndicatorId"
  animate={[
    {
      onScroll: {  // Change on scroll
        toVariant: 'scrollIndicatorId.active'
      }
    },
    {
      whileHovering: {  // Continuous hover state
        toVariant: 'scrollIndicatorId.highlighted'
      }
    }
  ]}
/>
```

### Resolution
- Variants are always looked up from the **target Frame's `variants`** prop (whatever library it is).
- Cross-Frame: `'boxId.variant1'` uses `boxId`'s library, not the source Frame's.
- No global library—each Frame is self-contained.

### Backwards Compatibility
The animation system now exclusively uses the DSL format. The old `FrameAnimation[]` format (with `trigger`, `toVariant`, etc.) has been completely removed. The DSL is parsed to `FrameAnimation[]` internally for execution.

### Trigger Specification Notes
- `trigger: 'id'` – Triggers on the specified Frame ID.
- `trigger: 'id.variant'` – More specific: triggers only when the Frame is in that variant.
- `trigger: null` – Uses the current component (default if no ID specified).
- Examples:
  - `onHover: 'nameID.variant2'` – On hover, change to `variant2` on `nameID` (assumes current if no ID).
  - `afterDelay: '3s'` – Wait 3s, then apply the action.

