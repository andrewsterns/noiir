# Frame Properties Index

Complete reference for all Frame component properties, organized by category for easy navigation.

## Property Categories

### [Position Properties](./position.md)
Control Frame positioning, constraints, and spatial relationships.
- **Basic Positioning**: Absolute, relative, fixed, and static positioning
- **Coordinates**: X, Y, Z positioning with pixel-perfect control
- **Constraints**: Left, right, top, bottom constraints for responsive layouts
- **3D Positioning**: Z-index and transform-based 3D positioning
- **Animation Integration**: Position-based animations and transitions

### [Layout Properties](./layout.md)
Define Frame sizing, auto layout behavior, and child element arrangement.
- **Size Properties**: Width, height, min/max sizing with responsive breakpoints
- **Auto Layout**: Flow directions, alignment, gap, and padding control
- **Responsive Sizing**: Breakpoint-based sizing and container queries
- **Performance**: Efficient layout patterns and virtualization

### [Appearance Properties](./appearance.md)
Control visual styling including backgrounds, borders, and visual effects.
- **Fill Properties**: Solid colors, gradients, images, and layered backgrounds
- **Border Radius**: Corner rounding with individual corner control
- **Opacity & Blend Modes**: Transparency and blend effects
- **Real-World Examples**: Cards, buttons, status indicators

### [Typography Properties](./typography.md)
Comprehensive text styling and layout control.
- **Font Properties**: Family, size, weight, style with responsive scaling
- **Text Styling**: Color, decoration, transform, shadows
- **Line Control**: Height, clamping, white space, word breaking
- **Typography Presets**: Heading hierarchy, body text, specialized styles
- **Accessibility**: High contrast, readable typography patterns

### [Fill Properties](./fill.md)
Advanced background styling with multiple fill types and layering.
- **Solid Fills**: Basic colors with opacity control
- **Gradient Fills**: Linear, radial, and conic gradients with complex stops
- **Image Fills**: Background images with positioning and overlay effects
- **Video Fills**: Dynamic video backgrounds with controls
- **Pattern Fills**: Procedural patterns and textures
- **Multiple Fills**: Layering effects for complex backgrounds

### [Stroke Properties](./stroke.md)
Border and outline control with advanced styling options.
- **Basic Strokes**: Colors, weights, and styles
- **Border Styles**: Solid, dashed, dotted, and 3D effects
- **Custom Patterns**: Dash arrays and line cap/join control
- **Selective Sides**: Individual side borders and combinations
- **Advanced Effects**: Gradient borders and animated strokes

### [Effects Properties](./effects.md)
Visual depth and polish through shadows, blurs, and visual enhancements.
- **Shadow Effects**: Drop shadows, inner shadows, and colored shadows
- **Multiple Shadows**: Layered shadows for realistic lighting
- **Blur Effects**: Backdrop blur and content blur for focus effects
- **Glow Effects**: Luminous and energy effects
- **Material Design**: Standard elevation shadow sets

## Quick Reference

### Most Common Properties

```tsx
// Essential Frame with common properties
<Frame
  // Position
  position={{ type: 'relative' }}
  
  // Layout
  size={{ width: 300, height: 200 }}
  autoLayout={{ flow: 'vertical', gap: 16, padding: 20 }}
  
  // Appearance
  fill={{ type: 'solid', color: 'white' }}
  appearance={{ radius: 12 }}
  stroke={{ color: 'neutral3', weight: 1 }}
  
  // Typography
  typography={{ fontSize: 16, color: 'neutral8' }}
  
  // Effects
  effects={[
    {
      type: 'drop-shadow',
      color: 'rgba(0,0,0,0.1)',
      blur: 8,
      offset: { x: 0, y: 2 }
    }
  ]}
>
  Frame content
</Frame>
```

### Property Inheritance

All Frame properties can be:
- **Inherited**: Extended by component compositions
- **Overridden**: Customized at any level
- **Animated**: Smoothly transitioned between states
- **Responsive**: Adapted to different screen sizes

### Animation Support

Every property category supports smooth animations:

```tsx
animate={{
  trigger: 'hover',
  duration: '0.3s',
  timeline: {
    '@0s': {
      position: { x: 0, y: 0 },
      size: { width: 200, height: 100 },
      fill: { type: 'solid', color: 'primary6' },
      appearance: { radius: 8 },
      typography: { fontSize: 16 },
      effects: [{ type: 'drop-shadow', blur: 4 }]
    },
    '@0.3s': {
      position: { x: 0, y: -4 },
      size: { width: 220, height: 110 },
      fill: { type: 'solid', color: 'primary7' },
      appearance: { radius: 12 },
      typography: { fontSize: 18 },
      effects: [{ type: 'drop-shadow', blur: 12 }]
    }
  }
}}
```

## Integration Patterns

### Component Extension

```tsx
// Button extends Frame with all properties
const Button = (props) => {
  const { children, variant = 'primary', ...frameProps } = props;
  
  return (
    <Frame
      // Default button styling
      fill={{ type: 'solid', color: 'primary6' }}
      appearance={{ radius: 8 }}
      typography={{ color: 'white', fontWeight: 600 }}
      
      // User overrides
      {...frameProps}
      
      // Auto layout for button content
      autoLayout={{ 
        padding: { horizontal: 16, vertical: 12 },
        alignment: 'center'
      }}
    >
      {children}
    </Frame>
  );
};
```

### Theme Integration

```tsx
// Properties work seamlessly with theme system
<Frame
  fill={{ type: 'solid', color: 'primary6' }}    // Theme color
  typography={{ fontSize: 'lg', color: 'white' }} // Theme typography
  effects={theme.shadows.medium}                   // Theme effects
  appearance={{ radius: theme.radii.lg }}         // Theme radius
>
  Themed Frame
</Frame>
```

## Best Practices

### Performance
- Use simple properties when possible
- Leverage CSS custom properties for theme values
- Apply complex effects conditionally
- Use `will-change` for animated properties

### Accessibility
- Ensure sufficient color contrast
- Provide focus indicators with effects
- Use semantic property combinations
- Test with screen readers and keyboard navigation

### Maintainability
- Create property presets for common patterns
- Document custom property combinations
- Use TypeScript for property validation
- Establish consistent naming conventions

This comprehensive property system enables Frame to serve as a universal primitive for any interface element while maintaining performance and accessibility standards.