# __stories__/

This folder contains Storybook stories for all components in the Noiir design system. Stories provide interactive documentation and development tools.

## Overview

Storybook stories demonstrate component usage, showcase variants, and serve as living documentation. This folder mirrors the component structure but is excluded from the published package.

## Structure

### 📁 `atoms/`
Stories for atomic components:
- **avatar/** - Avatar component stories
- **badge/** - Badge component stories
- **button/** - Button variants and states
- **checkbox/** - Checkbox interactions
- **input/** - Input field examples
- **...** - Other atomic component stories

### 📁 `molecules/`
Stories for molecular components:
- **card/** - Card layout examples
- **dialog/** - Modal dialog demonstrations
- **dropdown/** - Dropdown menu interactions
- **...** - Other molecular component stories

### 📁 `organisms/`
Stories for complex components:
- **template/** - Page template examples

### 📁 `frame/`
Core Frame component stories:
- **frame-properties/** - Stories for each Frame property category
  - **animate/** - Animation and transition examples
  - **appearance/** - Fill, stroke, and visual properties
  - **effects/** - Shadows, blur, and effects
  - **layout/** - Auto-layout and positioning
  - **position/** - Absolute positioning examples
  - **typography/** - Text styling demonstrations

### 📁 `group/`
Group component stories demonstrating animation hierarchies.

### 📁 `mask/`
Mask component stories showing clipping functionality.

### 📁 `theme/`
Theme system stories:
- **Theme.stories.tsx** - Color palette and theme demonstrations

### 📁 `css-units/`
CSS units and measurement system stories.

## Story Organization

Each story file follows the pattern `Component.stories.tsx` and includes:

### Basic Stories
- **Default** - Basic component usage
- **Variants** - All available variants
- **States** - Interactive states (hover, focus, active, disabled)

### Advanced Stories
- **Customization** - Custom styling examples
- **Animation** - Animation and transition examples
- **Layout** - Different layout configurations
- **Accessibility** - Accessibility features and testing

## Running Storybook

```bash
# Start Storybook development server
npm run storybook

# Build static Storybook site
npm run build-storybook
```

The Storybook will be available at `http://localhost:6006` with:
- Interactive component playground
- Controls for prop exploration
- Documentation generated from stories
- Visual testing and development tools

## Writing Stories

Stories use Storybook's CSF (Component Story Format) 3.0:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@noiir/core';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};
```

## Storybook Addons

The project includes several Storybook addons:
- **Controls** - Interactive prop controls
- **Actions** - Event logging
- **Docs** - Auto-generated documentation
- **Viewport** - Responsive testing
- **Accessibility** - a11y testing

## Development Workflow

1. Create/update component stories alongside component development
2. Use stories to test component variants and edge cases
3. Include interaction testing for complex components
4. Document component usage patterns in story descriptions
5. Use Storybook for visual regression testing

## Publishing

Stories are development-only and are not included in the published package. The `storybook-static/` folder contains the built Storybook site for deployment.