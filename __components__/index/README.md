# __components__/index

This folder contains barrel files and entry points for all component modules in the Noiir design system.

## Structure

### 📁 `atoms/`
Basic UI building blocks that cannot be broken down further:
- **avatar/** - User avatar component
- **badge/** - Status indicators and labels
- **button/** - Interactive buttons with variants
- **checkbox/** - Boolean input controls
- **input/** - Text input fields
- **label/** - Text labels and captions
- **progress-bar/** - Progress indicators
- **radio-button/** - Single selection controls
- **slider/** - Range input controls
- **text/** - Text display components
- **textarea/** - Multi-line text inputs
- **toggle/** - Switch/toggle controls
- **tooltip/** - Contextual help overlays

### 📁 `molecules/`
Composite components made from atoms:
- **card/** - Content containers with headers and actions
- **dialog/** - Modal dialogs and overlays
- **dropdown/** - Selectable option lists
- **list/** - Ordered and unordered lists
- **menu/** - Navigation and action menus
- **popup/** - Floating content containers
- **search-dropdown/** - Searchable selection components

### 📁 `organisms/`
Complex components made from molecules and atoms:
- **template/** - Page layout templates

### 📁 `frame/`
Core Frame component that all other components extend:
- **Frame.tsx** - The foundational component with all design properties

### 📁 `group/`
Organizational components:
- **group.tsx** - Pure container for animation hierarchies

### 📁 `mask/`
Clipping and masking components:
- **mask.tsx** - Advanced clipping with rectangular and SVG path support

### 📁 `json/`
Configuration and data files (reserved for future use)

## Exports

The `index.ts` file in this folder exports all components for easy importing:

```tsx
// Import everything
import { Frame, Button, Input, Group, Mask, Card } from '@noiir/core/components';

// Import specific components
import { Button } from '@noiir/core/components/Button';
import { Group } from '@noiir/core/components/Group';
```

## Component Architecture

All components follow the same pattern:
1. Extend the base `Frame` component
2. Accept component-specific props
3. Support variant customization
4. Pass through all Frame properties
5. Handle component-specific logic (icons, children, etc.)

## Adding New Components

When adding new components:

1. Create a new folder under the appropriate level (atoms/molecules/organisms)
2. Implement the component extending `Frame`
3. Create variants in a `.variants.tsx` file
4. Add exports to the appropriate `index.ts` files
5. Create Storybook stories in `__stories__`
6. Update documentation
