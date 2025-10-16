# Getting Started with Figma Components Framework

This guide shows you how to install dependencies and run Storybook to explore all the components interactively.

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Storybook**:
   ```bash
   npm run storybook
   ```

3. **Open your browser** to `http://localhost:6006` to see all the components with interactive controls!

## What You'll Find in Storybook

### 🖼️ Frame Component
- Auto layout controls (row, column, grid)
- Fill colors and gradients
- Stroke/border settings
- Corner radius
- Drop shadows and effects
- Size and positioning

### 📝 Text Component
- Typography controls (font size, weight, family)
- Text alignment and spacing
- Color fills and gradients
- Text strokes/outlines
- Drop shadows
- Auto-resize options

### ⬜ Rectangle Component
- Size controls
- Fill colors and gradients
- Border/stroke settings
- Corner radius
- Drop shadows and effects
- Rotation

### ⭕ Ellipse Component
- Size controls for perfect circles or ovals
- Fill colors and gradients
- Border/stroke settings
- Drop shadows and effects

### 🎨 Real-World Examples
- User profile cards
- Button sets with different states
- Status indicator cards
- Feature showcase cards
- Navigation bars

## Interactive Features

In Storybook, you can:
- **Toggle settings** in real-time using the Controls panel
- **Copy code** examples for each component
- **View documentation** with detailed prop descriptions
- **Test responsive behavior** by adjusting the viewport
- **Experiment with colors** using the color picker controls

## Building Components

Each component follows Figma's design property structure:

```tsx
<Frame
  autoLayout={{
    flow: 'column',
    gap: 16,
    padding: 24
  }}
  fill={{ color: '#f5f5f5' }}
  cornerRadius={12}
>
  <Text
    content="Hello Figma!"
    typography={{
      fontSize: 18,
      fontWeight: 600
    }}
  />
</Frame>
```

Happy designing! 🎨