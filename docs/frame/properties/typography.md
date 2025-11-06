# Typography Properties

Typography properties control text rendering, font styling, and text layout within Frames - providing comprehensive control over text appearance and behavior.

## Font Properties

Control font family, size, weight, and style for precise typography control.

```tsx
interface FontProps {
  fontFamily?: string | string[];
  fontSize?: number | string;
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic' | 'oblique';
  fontVariant?: 'normal' | 'small-caps';
}
```

### Font Family

```tsx
// Theme font families
<Frame
  typography={{ fontFamily: 'heading' }}
  fill={{ type: 'solid', color: 'neutral8' }}
>
  Heading Font Family
</Frame>

<Frame
  typography={{ fontFamily: 'body' }}
>
  Body Font Family
</Frame>

// Custom font stack
<Frame
  typography={{ 
    fontFamily: ['Inter', 'system-ui', 'sans-serif']
  }}
>
  Custom font with fallbacks
</Frame>

// Monospace for code
<Frame
  typography={{ 
    fontFamily: 'mono',
    fontSize: 14
  }}
  fill={{ type: 'solid', color: 'neutral1' }}
  appearance={{ radius: 4 }}
  autoLayout={{ padding: { horizontal: 8, vertical: 4 } }}
>
  const code = 'example';
</Frame>
```

### Font Size

```tsx
// Numeric sizes (pixels)
<Frame typography={{ fontSize: 24 }}>24px Text</Frame>
<Frame typography={{ fontSize: 16 }}>16px Text</Frame>
<Frame typography={{ fontSize: 12 }}>12px Text</Frame>

// Relative sizes
<Frame typography={{ fontSize: '1.5rem' }}>1.5rem Text</Frame>
<Frame typography={{ fontSize: '120%' }}>120% Text</Frame>

// Theme sizes
<Frame typography={{ fontSize: 'lg' }}>Large Text</Frame>
<Frame typography={{ fontSize: 'sm' }}>Small Text</Frame>

// Responsive font sizes
<Frame
  typography={{
    fontSize: {
      base: 16,
      sm: 18,
      md: 20,
      lg: 24
    }
  }}
>
  Responsive typography
</Frame>
```

### Font Weight

```tsx
// Numeric weights
<Frame typography={{ fontWeight: 300 }}>Light (300)</Frame>
<Frame typography={{ fontWeight: 400 }}>Regular (400)</Frame>
<Frame typography={{ fontWeight: 500 }}>Medium (500)</Frame>
<Frame typography={{ fontWeight: 600 }}>Semibold (600)</Frame>
<Frame typography={{ fontWeight: 700 }}>Bold (700)</Frame>

// Named weights
<Frame typography={{ fontWeight: 'normal' }}>Normal Weight</Frame>
<Frame typography={{ fontWeight: 'bold' }}>Bold Weight</Frame>

// Variable font weight (future)
<Frame
  typography={{ 
    fontFamily: 'Inter Variable',
    fontWeight: 450 // Any value between min/max
  }}
>
  Variable font weight
</Frame>
```

## Text Color and Styling

Control text color, decoration, and visual styling.

```tsx
interface TextStyleProps {
  color?: string;
  textDecoration?: 'none' | 'underline' | 'line-through' | 'overline';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  letterSpacing?: number | string;
  textShadow?: string | TextShadow[];
}

type TextShadow = {
  offsetX: number;
  offsetY: number;
  blur: number;
  color: string;
};
```

### Text Color

```tsx
// Theme colors
<Frame typography={{ color: 'primary6' }}>Primary colored text</Frame>
<Frame typography={{ color: 'neutral8' }}>Dark text</Frame>
<Frame typography={{ color: 'neutral5' }}>Muted text</Frame>

// Custom colors
<Frame typography={{ color: '#FF6B6B' }}>Custom red text</Frame>
<Frame typography={{ color: 'rgba(0,0,0,0.7)' }}>Semi-transparent text</Frame>

// Context-aware colors
<Frame
  fill={{ type: 'solid', color: 'primary6' }}
  typography={{ color: 'white' }}
  autoLayout={{ padding: 16 }}
>
  White text on primary background
</Frame>
```

### Text Decoration and Transform

```tsx
// Text decorations
<Frame typography={{ textDecoration: 'underline' }}>Underlined text</Frame>
<Frame typography={{ textDecoration: 'line-through' }}>Strikethrough text</Frame>

// Text transforms
<Frame typography={{ textTransform: 'uppercase' }}>uppercase text</Frame>
<Frame typography={{ textTransform: 'capitalize' }}>capitalized text</Frame>
<Frame typography={{ textTransform: 'lowercase' }}>LOWERCASE TEXT</Frame>

// Letter spacing
<Frame typography={{ letterSpacing: 2 }}>Spaced out text</Frame>
<Frame typography={{ letterSpacing: -0.5 }}>Tight text</Frame>
<Frame typography={{ letterSpacing: '0.1em' }}>Relative spacing</Frame>
```

### Text Shadow

```tsx
// Simple text shadow
<Frame
  typography={{
    fontSize: 32,
    fontWeight: 700,
    color: 'white',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  }}
>
  Text with shadow
</Frame>

// Complex multi-shadow
<Frame
  typography={{
    fontSize: 48,
    fontWeight: 800,
    color: 'primary6',
    textShadow: [
      { offsetX: 1, offsetY: 1, blur: 0, color: 'primary7' },
      { offsetX: 2, offsetY: 2, blur: 0, color: 'primary8' },
      { offsetX: 3, offsetY: 3, blur: 6, color: 'rgba(0,0,0,0.3)' }
    ]
  }}
>
  3D Text Effect
</Frame>
```

## Line Height and Spacing

Control vertical spacing and text flow.

```tsx
interface LineProps {
  lineHeight?: number | string;
  lineClamp?: number;
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line';
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
}
```

### Line Height

```tsx
// Numeric line height (multiplier)
<Frame typography={{ lineHeight: 1.2 }}>
  Tight line height. Lorem ipsum dolor sit amet, consectetur 
  adipiscing elit. Multiple lines with tight spacing.
</Frame>

<Frame typography={{ lineHeight: 1.6 }}>
  Comfortable line height. Lorem ipsum dolor sit amet, consectetur 
  adipiscing elit. Multiple lines with comfortable spacing.
</Frame>

// Pixel line height
<Frame typography={{ fontSize: 16, lineHeight: 24 }}>
  Fixed 24px line height regardless of font size changes.
</Frame>

// Relative line height
<Frame typography={{ lineHeight: '150%' }}>
  Percentage-based line height for scalable typography.
</Frame>
```

### Text Overflow and Clamping

```tsx
// Single line with ellipsis
<Frame
  size={{ width: 200, height: 'hug' }}
  typography={{ 
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }}
>
  This is a very long text that will be truncated with ellipsis
</Frame>

// Multi-line clamp
<Frame
  size={{ width: 300, height: 'hug' }}
  typography={{ 
    lineClamp: 3,
    lineHeight: 1.5
  }}
>
  This is a longer paragraph that will be clamped to exactly three lines. 
  The text will be cut off after the third line and an ellipsis will be 
  shown to indicate there's more content available.
</Frame>

// Preserve formatting
<Frame
  typography={{ whiteSpace: 'pre-wrap' }}
  fill={{ type: 'solid', color: 'neutral1' }}
  autoLayout={{ padding: 16 }}
>
  {`This text preserves
  
  line breaks and    spacing
  exactly as written in the source.`}
</Frame>
```

## Text Alignment

Control text alignment within Frames.

```tsx
interface TextAlignProps {
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  verticalAlign?: 'top' | 'middle' | 'bottom' | 'baseline';
}
```

### Horizontal Alignment

```tsx
// Left aligned (default)
<Frame
  size={{ width: 300, height: 60 }}
  typography={{ textAlign: 'left' }}
  stroke={{ color: 'neutral3', weight: 1 }}
>
  Left aligned text content
</Frame>

// Center aligned
<Frame
  size={{ width: 300, height: 60 }}
  typography={{ textAlign: 'center' }}
  stroke={{ color: 'neutral3', weight: 1 }}
>
  Center aligned text content
</Frame>

// Right aligned
<Frame
  size={{ width: 300, height: 60 }}
  typography={{ textAlign: 'right' }}
  stroke={{ color: 'neutral3', weight: 1 }}
>
  Right aligned text content
</Frame>

// Justified
<Frame
  size={{ width: 300, height: 'hug' }}
  typography={{ 
    textAlign: 'justify',
    lineHeight: 1.6
  }}
  stroke={{ color: 'neutral3', weight: 1 }}
  autoLayout={{ padding: 16 }}
>
  Justified text spreads words evenly across the line width, creating 
  clean edges on both left and right sides of the text block.
</Frame>
```

### Vertical Alignment

```tsx
// Top aligned (default)
<Frame
  size={{ width: 200, height: 100 }}
  typography={{ verticalAlign: 'top' }}
  stroke={{ color: 'neutral3', weight: 1 }}
>
  Top aligned
</Frame>

// Middle aligned
<Frame
  size={{ width: 200, height: 100 }}
  typography={{ verticalAlign: 'middle' }}
  stroke={{ color: 'neutral3', weight: 1 }}
>
  Middle aligned
</Frame>

// Bottom aligned
<Frame
  size={{ width: 200, height: 100 }}
  typography={{ verticalAlign: 'bottom' }}
  stroke={{ color: 'neutral3', weight: 1 }}
>
  Bottom aligned
</Frame>
```

## Typography Presets

Pre-configured typography styles for common use cases.

```tsx
interface TypographyPreset {
  preset?: 
    | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    | 'body1' | 'body2' | 'caption' | 'overline'
    | 'button' | 'code' | 'label';
}
```

### Heading Presets

```tsx
// Heading hierarchy
<Frame typography={{ preset: 'h1' }}>
  Main Page Heading (H1)
</Frame>

<Frame typography={{ preset: 'h2' }}>
  Section Heading (H2)
</Frame>

<Frame typography={{ preset: 'h3' }}>
  Subsection Heading (H3)
</Frame>

<Frame typography={{ preset: 'h4' }}>
  Minor Heading (H4)
</Frame>

// Custom heading with overrides
<Frame
  typography={{ 
    preset: 'h2',
    color: 'primary6',
    fontWeight: 600
  }}
>
  Custom styled heading
</Frame>
```

### Body Text Presets

```tsx
// Body text variants
<Frame typography={{ preset: 'body1' }}>
  Primary body text with comfortable reading size and spacing.
</Frame>

<Frame typography={{ preset: 'body2' }}>
  Secondary body text, slightly smaller for less prominent content.
</Frame>

<Frame typography={{ preset: 'caption' }}>
  Caption text for image descriptions, footnotes, and small details.
</Frame>

<Frame typography={{ preset: 'overline' }}>
  OVERLINE TEXT FOR CATEGORIES AND LABELS
</Frame>
```

### Specialized Presets

```tsx
// Button text
<Frame
  fill={{ type: 'solid', color: 'primary6' }}
  appearance={{ radius: 8 }}
  autoLayout={{ padding: { horizontal: 16, vertical: 12 } }}
  typography={{ preset: 'button', color: 'white' }}
>
  Button Text
</Frame>

// Code text
<Frame
  fill={{ type: 'solid', color: 'neutral1' }}
  appearance={{ radius: 4 }}
  autoLayout={{ padding: { horizontal: 8, vertical: 4 } }}
  typography={{ preset: 'code' }}
>
  const example = 'code';
</Frame>

// Form labels
<Frame typography={{ preset: 'label' }}>
  Form Field Label
</Frame>
```

## Real-World Typography Examples

### Article Layout

```tsx
const ArticleContent = () => (
  <Frame
    size={{ width: 600, height: 'hug' }}
    autoLayout={{ flow: 'vertical', gap: 24, padding: 32 }}
  >
    {/* Article title */}
    <Frame
      typography={{
        preset: 'h1',
        lineHeight: 1.2,
        color: 'neutral9'
      }}
    >
      The Future of Design Systems
    </Frame>
    
    {/* Subtitle */}
    <Frame
      typography={{
        preset: 'h3',
        fontWeight: 400,
        color: 'neutral6',
        lineHeight: 1.4
      }}
    >
      How modern tools are reshaping the way we build interfaces
    </Frame>
    
    {/* Meta information */}
    <Frame
      autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}
    >
      <Frame typography={{ preset: 'caption', color: 'neutral5' }}>
        By John Smith
      </Frame>
      <Frame typography={{ preset: 'caption', color: 'neutral4' }}>
        •
      </Frame>
      <Frame typography={{ preset: 'caption', color: 'neutral5' }}>
        March 15, 2024
      </Frame>
    </Frame>
    
    {/* Body content */}
    <Frame
      typography={{
        preset: 'body1',
        lineHeight: 1.6,
        color: 'neutral8'
      }}
    >
      Design systems have evolved from simple style guides to comprehensive 
      ecosystems that enable teams to build consistent, accessible, and 
      scalable user interfaces. The integration of modern tooling and 
      methodologies has transformed how we approach design and development.
    </Frame>
  </Frame>
);
```

### Card with Typography Hierarchy

```tsx
const ProductCard = ({ product }) => (
  <Frame
    size={{ width: 280, height: 'hug' }}
    fill={{ type: 'solid', color: 'white' }}
    appearance={{ radius: 12 }}
    stroke={{ color: 'neutral2', weight: 1 }}
    autoLayout={{ flow: 'vertical', gap: 16, padding: 20 }}
  >
    {/* Product name */}
    <Frame
      typography={{
        preset: 'h4',
        fontWeight: 600,
        color: 'neutral9',
        lineClamp: 2
      }}
    >
      {product.name}
    </Frame>
    
    {/* Price */}
    <Frame
      typography={{
        fontSize: 24,
        fontWeight: 700,
        color: 'primary6'
      }}
    >
      ${product.price}
    </Frame>
    
    {/* Description */}
    <Frame
      typography={{
        preset: 'body2',
        color: 'neutral6',
        lineHeight: 1.5,
        lineClamp: 3
      }}
    >
      {product.description}
    </Frame>
    
    {/* Rating */}
    <Frame
      autoLayout={{ flow: 'horizontal', gap: 8, alignment: 'center' }}
    >
      <Frame typography={{ fontSize: 16 }}>⭐⭐⭐⭐⭐</Frame>
      <Frame typography={{ preset: 'caption', color: 'neutral5' }}>
        ({product.reviews} reviews)
      </Frame>
    </Frame>
  </Frame>
);
```

### Form with Typography

```tsx
const FormField = ({ label, placeholder, error }) => (
  <Frame
    autoLayout={{ flow: 'vertical', gap: 6 }}
    size={{ width: '100%', height: 'hug' }}
  >
    {/* Label */}
    <Frame
      typography={{
        preset: 'label',
        fontWeight: 500,
        color: 'neutral8'
      }}
    >
      {label}
    </Frame>
    
    {/* Input field */}
    <Frame
      size={{ width: '100%', height: 44 }}
      fill={{ type: 'solid', color: 'white' }}
      stroke={{ 
        color: error ? 'error5' : 'neutral3', 
        weight: 1 
      }}
      appearance={{ radius: 6 }}
      autoLayout={{ alignment: 'center-left', padding: 12 }}
      typography={{
        preset: 'body1',
        color: 'neutral7'
      }}
    >
      {placeholder}
    </Frame>
    
    {/* Error message */}
    {error && (
      <Frame
        typography={{
          preset: 'caption',
          color: 'error6'
        }}
      >
        {error}
      </Frame>
    )}
  </Frame>
);
```

## Performance Considerations

### Font Loading

```tsx
// ✅ Good - Optimize font loading
typography={{
  fontFamily: 'Inter Variable', // Use variable fonts
  fontDisplay: 'swap' // Ensure text remains visible during font swap
}}

// ✅ Good - Limit font weights
typography={{
  fontFamily: 'Inter',
  fontWeight: 400 // Only load needed weights
}}

// ❌ Avoid - Loading too many font variants
typography={{
  fontFamily: 'Custom Font', // Multiple weights/styles
  fontWeight: [100, 200, 300, 400, 500, 600, 700, 800, 900]
}}
```

### Text Rendering

```tsx
// ✅ Good - Use line clamping for performance
typography={{
  lineClamp: 3, // Limits rendering to 3 lines
  lineHeight: 1.5
}}

// ❌ Avoid - Very long text without constraints
typography={{
  whiteSpace: 'normal' // Could render thousands of lines
}}
```


## Accessibility Considerations

### Readable Typography

```tsx
// ✅ Good - High contrast and readable sizes
<Frame
  typography={{
    fontSize: 16, // Minimum 16px for readability
    lineHeight: 1.5, // Comfortable line spacing
    color: 'neutral9', // High contrast
    fontWeight: 400 // Regular weight for body text
  }}
>
  Accessible text content
</Frame>

// ✅ Good - Sufficient color contrast
<Frame
  fill={{ type: 'solid', color: 'primary6' }}
  typography={{
    color: 'white', // Ensures good contrast ratio
    fontWeight: 500 // Slightly heavier on colored backgrounds
  }}
>
  High contrast text
</Frame>
```

### Responsive Typography

```tsx
// ✅ Good - Scalable typography
<Frame
  typography={{
    fontSize: {
      base: 14,
      sm: 16,
      md: 18
    },
    lineHeight: 1.6
  }}
>
  Typography that scales appropriately across devices
</Frame>
```

Typography properties provide comprehensive control over text appearance, ensuring both visual appeal and optimal readability across all devices and use cases.