### Component Hierarchy & Prop Inheritance

```
[
frame-animation (trigger, direction, duration, curves etc.)
↓
core.tsx
]

[
frame-props (appearance, effects, layout etc.) & ↓ core.tsx (frame-animation)
↓
frame.tsx (collects props in its interface)
↓
(molecule)component.tsx (this is anything like button or list etc)
↓ (contains states for that component)
(organism)component.tsx (this is something like a dropdown that borrows the states and props of things like button and list combined)
]
```

ie:
button= frame properties in core specific order
button state = a modified saved set of properties
dropdown= button properties as a specific state + list properties as a specific state
dropdown state = a different (modified) button state + list state

---

## 🏗️ **Component Development Blueprint**

This blueprint shows how to build components following our architecture. Each layer builds on the previous one, creating a consistent, composable system.

### **1. Start with Frame.tsx (Foundation Layer)**

**Frame.tsx** provides the core capabilities that all components inherit:

```tsx
// Frame.tsx - The foundation all components build on
interface FrameProps {
  // Animation props
  trigger?: TriggerConfig;
  animation?: AnimationConfig;

  // State system
  state?: string;
  states?: Record<string, FramestateProps>;

  // Child state control (for organisms)
  childStates?: Record<string, string>;

  // All Figma-style props
  position?: PositionProps;
  layout?: LayoutProps;
  appearance?: AppearanceProps;
  fill?: FillProps;
  stroke?: StrokeProps;
  typography?: TypographyProps;
  effects?: EffectProps;

  // Standard React props
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  // ... other event handlers
}
```

### **2. Build Molecule Components (Button, List, etc.)**

**Molecules** are specific UI elements that define their own variants using Frame properties:

```tsx
// components/molecules/button/button.tsx
import React from 'react';
import { Frame, FrameProps } from '../../atoms/frame/Frame';
import { FramestateProps } from '../../atoms/frame/variants/variants';

/**
 * Available button states with their visual characteristics
 */
export type ButtonState = 
  | 'default'      // Default state
  | 'hover'        // Hover state
  | 'active'       // Active/pressed state
  | 'disabled';    // Disabled state

export interface ButtonProps extends Omit<FrameProps, 'state' | 'states'> {
  children?: React.ReactNode;
  state?: ButtonState;
}

export const buttonStates: { [key: string]: FramestateProps } = {
  default: {
    autoLayout: { flow: 'horizontal', alignment: 'center', width: 'full', height: 40, padding: { left: 16, right: 16 } },
    appearance: { radius: 6 },
    fill: { type: 'solid', color: 'primary6' },
    typography: { color: 'primary2', fontWeight: 500 },
    animation: [
      {
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'active',
        animation: 'dissolve',
        duration: 150,
      },
      {
        trigger: 'onHover',
        action: 'changeTo',
        destination: 'hover',
        animation: 'dissolve',
        duration: 200,
      }
    ]
  },
  hover: {
    autoLayout: { flow: 'horizontal', alignment: 'center', width: 'full', height: 40, padding: { left: 16, right: 16 } },
    appearance: { radius: 6 },
    fill: { type: 'solid', color: 'primary9' },
    typography: { color: 'primary2', fontWeight: 600 },
    animation: [
      {
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'active',
        animation: 'dissolve',
        duration: 150,
      },
      {
        trigger: 'mouseLeave',
        action: 'changeTo',
        destination: 'default',
        animation: 'dissolve',
        duration: 200,
      }
    ]
  },
  active: {
    autoLayout: { flow: 'horizontal', alignment: 'center', width: 'full', height: 40, padding: { left: 16, right: 16 } },
    appearance: { radius: 6 },
    fill: { type: 'solid', color: 'primary8' },
    typography: { color: 'primary1', fontWeight: 700 },
    animation: [
      {
        trigger: 'mouseEnter',
        action: 'changeTo',
        destination: 'hover',
        animation: 'dissolve',
        duration: 150,
      },
      {
        trigger: 'mouseLeave',
        action: 'changeTo',
        destination: 'default',
        animation: 'dissolve',
        duration: 200,
      }
    ]
  },
  disabled: {
    autoLayout: { flow: 'horizontal', alignment: 'center', width: 'full', height: 40, padding: { left: 16, right: 16 } },
    appearance: { radius: 6, opacity: 0.5 },
    fill: { type: 'solid', color: 'neutral4' },
    typography: { color: 'neutral6', fontWeight: 500 }
  }
};

/**
 * Button component - pure Frame wrapper with button-specific variants
 * Animates between default, hover, and active variants on interactions
 */
export const Button = (props: ButtonProps) => {
  const {
    state = 'default',
    children,
    ...frameProps
  } = props;

  return (
    <Frame
      {...frameProps}
      state={state}
      states={buttonStates}
    >
      {children}
    </Frame>
  );
};
```

### **3. Build Organism Components (Dropdown, Modal, etc.)**

**Organisms** compose multiple molecules and coordinate their variants:

```tsx
// components/organisms/dropdown/dropdown.tsx
import { Frame } from '../../atoms/frame/Frame';
import { Button } from '../../molecules/button/button';
import { List } from '../../molecules/list/list';

export interface DropdownProps extends Omit<FrameProps, 'states'> {
  state?: 'default' | 'compact';
  items: Array<{ label: string; value: string }>;
  onSelect?: (value: string) => void;
}

const dropdownStates: Record<string, FramestateProps & { childStates: Record<string, string> }> = {
  default: {
    position: { width: 200 },
    childStates: {
      trigger: 'default-md',
      menu: 'default'
    }
  },
  compact: {
    position: { width: 150 },
    childStates: {
      trigger: 'default-sm',
      menu: 'compact'
    }
  }
};

export function Dropdown({
  state = 'default',
  items,
  onSelect,
  children,
  ...frameProps
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentState = dropdownStates[state];
  const triggerState = currentState.childStates.trigger;
  const menuState = currentState.childStates.menu;

  return (
    <Frame
      position={currentState.position}
      {...frameProps}
    >
      {/* Trigger Button */}
      <Button
        state={triggerState}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children} ▼
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <Frame
          position={{ top: '100%', left: 0, width: '100%' }}
          fill={{ type: 'solid', color: '#ffffff' }}
          stroke={{ type: 'solid', color: '#e5e7eb', weight: 1 }}
          appearance={{ borderRadius: 6 }}
          effects={{ shadow: { x: 0, y: 4, blur: 8, color: '#00000033' } }}
        >
          <List
            state={menuState}
            items={items}
            onSelect={(value) => {
              onSelect?.(value);
              setIsOpen(false);
            }}
          />
        </Frame>
      )}
    </Frame>
  );
}
```

### **4. Usage Examples**

#### **Simple Button:**
```tsx
<Button state="default">
  Click me
</Button>
```

#### **Button with Custom Props:**
```tsx
<Button
  state="default"
  onClick={() => console.log('clicked')}
  className="my-button"
>
  Custom Button
</Button>
```

#### **Disabled Button:**
```tsx
<Button state="disabled">
  Disabled Button
</Button>
```

#### **Button with Animation (inherits from states):**
```tsx
<Button state="default">
  Hover me (animates automatically)
</Button>
```

#### **Dropdown with States:**
```tsx
<Dropdown
  state="compact"
  items={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' }
  ]}
  onSelect={(value) => console.log(value)}
>
  Select an option
</Dropdown>
```

### **5. Component Creation Checklist**

#### **For Molecules:**
- [ ] Define component-specific `State` type (e.g., `ButtonState`)
- [ ] Create `ComponentProps` interface extending `Omit<FrameProps, 'state' | 'states'>`
- [ ] Define `componentStates` object with FramestateProps
- [ ] Include animation configurations within state definitions
- [ ] Export clean TypeScript interfaces
- [ ] Create Storybook stories for all states
- [ ] Add `displayName` for debugging

#### **For Organisms:**
- [ ] Identify which molecules to compose
- [ ] Define organism states that control child component states
- [ ] Use `childStates` for coordinated state changes
- [ ] Handle complex interactions between child components
- [ ] Ensure proper prop forwarding and event handling

#### **General Rules:**
- [ ] Always extend `Omit<FrameProps, 'state' | 'states'>` for custom states
- [ ] Use Frame properties for all styling (never direct CSS)
- [ ] States should be data objects with animation configs built-in
- [ ] Prefer composition over inheritance
- [ ] Keep component logic focused on behavior, not styling
- [ ] Include animations within state definitions for automatic interactions

### **6. Animation Integration Pattern**

Components automatically support animations through Frame variants. Animations are defined within variant objects:

```tsx
// Animation configurations are built into state definitions
const buttonStates = {
  default: {
    // ... styling props
    animation: [
      {
        trigger: 'onHover',
        action: 'changeTo',
        destination: 'hover',
        animation: 'dissolve',
        duration: 200,
      },
      {
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'active',
        animation: 'dissolve',
        duration: 150,
      }
    ]
  },
  hover: {
    // ... hover styling
    animation: [
      {
        trigger: 'mouseLeave',
        action: 'changeTo',
        destination: 'default',
        animation: 'dissolve',
        duration: 200,
      }
    ]
  }
};

// Usage - animations work automatically
<Button state="default" /> // Hover/click animations built-in
```

#### **Enhanced Destination System**

The animation system supports two types of destinations for maximum flexibility:

**1. String Destination (State Reference):**
```tsx
<Frame
  state="default"
  states={myStates}
  animation={[{
    trigger: 'onClick',
    action: 'changeTo',
    destination: 'hover'  // References myStates.hover
  }]}
>
```

**2. Object Destination (Inline Properties):**
```tsx
<Frame
  state="default"
  fill={{color: 'blue'}}
  animation={[{
    trigger: 'onClick',
    action: 'changeTo',
    destination: {
      fill: {color: 'red'},
      typography: {fontWeight: 600}
    },
    duration: 300
  }]}
>
  Click to change color and weight
</Frame>
```

**Benefits:**
- **States for Reusability**: Predefined combinations for common states
- **Inline for Flexibility**: One-off property changes without creating states
- **Mixed Usage**: Combine both approaches in the same component
- **Type Safety**: Full TypeScript support for both destination types

**Destination Type:**
```tsx
export type AnimationDestination = 
  | string                    // State name
  | Partial<FramestateProps> // Inline properties
```

For custom animations, you can still override:

```tsx
<Button
  state="default"
  triggers={{
    onHover: { action: 'changeTo', destination: 'hover' }
  }}
  animations={{
    hover: { type: 'smartAnimate', duration: 300 }
  }}
  states={{
    default: { fill: { color: 'primary6' } },
    hover: { fill: { color: 'primary9' } }
  }}
/>
```

### **7. Best Practices**

#### **State Design:**
- Use semantic state names (`default`, `hover`, `active`, `disabled`)
- Keep states focused on interaction states, not sizes or themes
- Include animation configurations within state definitions for automatic interactions
- Document state purposes and state transitions in comments

#### **Prop Forwarding:**
- Always use `Omit<FrameProps, 'state' | 'states'>` for component props
- Forward all remaining props to Frame with spread operator
- Don't override Frame's core functionality unless necessary

#### **Animation Patterns:**
- Define animations within state objects for automatic state transitions
- Use consistent animation types (`dissolve` for color changes, `smartAnimate` for complex transitions)
- Keep animation durations between 150-300ms for good UX
- Include reverse animations for state transitions (hover → default, active → hover)

#### **Composition:**
- Organisms should control child states through `childStates`
- Use Frame's layout props for positioning child components
- Prefer declarative state changes over imperative state

#### **TypeScript:**
- Define specific state types for each component (`ButtonState`, `ListState`)
- Export component props interfaces for external usage
- Use proper Frame prop exclusions to avoid conflicts

#### **Performance:**
- States are static objects (calculated at build time)
- Animations only run when triggered by user interactions
- Frame handles all DOM interactions efficiently
- Keep state objects lightweight and focused

---

## 📋 **Quick Reference**

### **Component Types:**
- **Frame**: Foundation with all capabilities
- **Molecules**: Specific UI elements (Button, Input, Card)
- **Organisms**: Compositions of molecules (Dropdown, Modal, Form)

### **Key Props:**
- `state`: Current visual state (extends FrameProps)
- `states`: Available visual states (excluded from component props)
- `triggers`: Event → Action mappings (can override state animations)
- `animations`: State → Animation definitions (can override state animations)
- `childStates`: Control child component states (organisms only)

### **State Structure:**
```tsx
interface FramestateProps {
  // Styling properties
  autoLayout?: AutoLayoutProps;
  appearance?: AppearanceProps;
  fill?: FillProps;
  stroke?: StrokeProps;
  typography?: TypographyProps;
  effects?: EffectProps;
  
  // Built-in animations (recommended)
  animation?: Array<{
    trigger: string;      // 'onHover', 'onClick', 'mouseLeave', etc.
    action: string;       // 'changeTo'
    destination: string;  // target state name
    animation: string;    // 'dissolve', 'smartAnimate', etc.
    duration: number;     // milliseconds
  }>;
}
```

### **Property Categories:**
- `position`: x, y, width, height, constraints
- `layout`: flex, gap, padding, alignment
- `appearance`: opacity, borderRadius, blendMode
- `fill`: solid colors, gradients, images
- `stroke`: borders, outlines
- `typography`: font, size, weight, color
- `effects`: shadows, blurs, overlays

This blueprint ensures all components follow the same patterns, making them predictable, composable, and maintainable. 🚀

