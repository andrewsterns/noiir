# User-Defined Variants Guide

## Overview

Noiir is designed to be framework-agnostic when it comes to design tokens. **Colors, fonts, and typography scales are NOT baked into the framework** - you define them as variants in your own project.

This guide covers:
- 🎨 **Colors** - Define your color palette
- 🔤 **Fonts** - Define your font families
- 📏 **Typography Scales** - Define font sizes, weights, line heights, letter spacing

## Colors

### Defining Your Color Palette

Create your own color palette in your project. You can use the example `colors.variants.tsx` as a starting point:

```typescript
// my-app/variants/colors.variants.tsx
export const colorVariants = {
  // Brand colors - replace with your brand
  brandPrimary: '#ff6b6b',
  brandSecondary: '#4ecdc4',
  brandAccent: '#45b7d1',
  
  // Semantic colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Neutral scale
  neutral900: '#1a1a1a',
  neutral600: '#525252',
  neutral300: '#d4d4d4',
  neutral100: '#f5f5f5',
  
  // Basic
  black: '#000000',
  white: '#ffffff',
};

export default colorVariants;
```

### Using Colors

**Option 1: Direct Hex Values (Recommended)**
```tsx
<Frame fill={{ type: 'solid', color: '#ff6b6b' }}>
  Content
</Frame>

<Text typography={{ color: '#1a1a1a', fontSize: 16 }}>
  Text content
</Text>
```

**Option 2: Reference Color Variants**
```tsx
// Import your colors
import { myColors } from './variants/colors';

// Use in variants
export const buttonVariants = {
  primary: {
    fill: { type: 'solid', color: myColors.brand1 },
    typography: { color: myColors.white }
  }
};

// Apply variant
<Frame variants={buttonVariants} variant="primary">
  Button
</Frame>
```

**Option 3: Pass Color Palette to Frame (Advanced)**
```tsx
import { myColors } from './variants/colors';

<Frame 
  colorPalette={myColors}
  fill={{ type: 'solid', color: 'brand1' }}  // Now 'brand1' resolves from myColors
>
  Content
</Frame>
```

## Fonts

### Defining Your Font Palette

Create your own font palette in your project. You can use the example `fonts.variants.tsx` as a starting point:

```typescript
// my-app/variants/fonts.variants.tsx
export const fontVariants = {
  // Font stacks
  display: 'Poppins, -apple-system, sans-serif',
  heading: 'Inter, -apple-system, sans-serif',
  body: 'Inter, -apple-system, sans-serif',
  mono: 'Fira Code, Monaco, Consolas, monospace',
};

// Optional: Font definitions with metadata
export const fontDefinitions = {
  poppins: {
    family: 'Poppins, sans-serif',
    weights: [400, 500, 600, 700],
    styles: ['normal', 'italic'] as const,
  },
  inter: {
    family: 'Inter, sans-serif',
    weights: [300, 400, 500, 600, 700, 800],
    styles: ['normal', 'italic'] as const,
  }
};

export default fontVariants;
```

### Using Fonts

**Option 1: Direct Font Family (Recommended)**
```tsx
<Text typography={{ 
  fontFamily: 'Poppins, Arial, sans-serif',
  fontSize: 24,
  fontWeight: 600
}}>
  Heading
</Text>
```

**Option 2: Reference Font Variants**
```tsx
// Import your fonts
import { myFonts } from './variants/fonts';

// Use in typography variants
export const typographyVariants = {
  h1: {
    typography: {
      fontFamily: myFonts.heading,
      fontSize: 32,
      fontWeight: 700,
      color: '#1a1a1a'
    }
  },
  body: {
    typography: {
      fontFamily: myFonts.body,
      fontSize: 16,
      fontWeight: 400,
      color: '#333333'
    }
  }
};

// Apply variant
<Text variants={typographyVariants} variant="h1">
  Heading Text
</Text>
```

**Option 3: Pass Font Palette to Frame (Advanced)**
```tsx
import { myFonts } from './variants/fonts';

<Frame 
  fontPalette={myFonts}
  typography={{ fontFamily: 'heading', fontSize: 24 }}  // 'heading' resolves from myFonts
>
  Content
</Frame>
```

## Typography Scales

### Defining Your Typography Scales

Instead of hardcoding `fontSize: 16`, `fontWeight: 700`, etc., define scales that can be referenced by name. This creates consistency across your design system.

Create your typography scales in your project. You can use the example `typography.variants.tsx` as a starting point:

```typescript
// my-app/variants/typography.variants.tsx

// Font Size Scale (in pixels)
export const fontSizeScale = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};

// Font Weight Scale
export const fontWeightScale = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

// Line Height Scale (unitless multipliers)
export const lineHeightScale = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

// Letter Spacing Scale (in pixels)
export const letterSpacingScale = {
  tighter: -0.5,
  tight: -0.25,
  normal: 0,
  wide: 0.25,
  wider: 0.5,
  widest: 0.75,
};

// Export all together
export const typographyScales = {
  fontSize: fontSizeScale,
  fontWeight: fontWeightScale,
  lineHeight: lineHeightScale,
  letterSpacing: letterSpacingScale,
};
```

### Using Typography Scales

**Option 1: Direct Values (Simple)**
```tsx
<Text typography={{ 
  fontSize: 24,        // pixels
  fontWeight: 700,     // weight value
  lineHeight: 1.5,     // unitless
  letterSpacing: 0.5   // pixels
}}>
  Heading
</Text>
```

**Option 2: Reference Scale in Variants**
```tsx
// Import your scales
import { fontSizeScale, fontWeightScale } from './variants/typography';

// Use in variants
export const textVariants = {
  h1: {
    typography: {
      fontSize: fontSizeScale['3xl'],  // 30px
      fontWeight: fontWeightScale.bold, // 700
      lineHeight: 1.2
    }
  },
  body: {
    typography: {
      fontSize: fontSizeScale.base,    // 16px
      fontWeight: fontWeightScale.normal, // 400
      lineHeight: 1.5
    }
  }
};
```

**Option 3: Pass Typography Scale to Frame (Advanced)**
```tsx
import { typographyScales } from './variants/typography';

<Frame 
  typographyScale={typographyScales}
  typography={{ 
    fontSize: 'lg',        // resolves to 18 from scale
    fontWeight: 'semibold', // resolves to 600 from scale
    lineHeight: 'normal',   // resolves to 1.5 from scale
    letterSpacing: 'wide'   // resolves to 0.25 from scale
  }}
>
  Content with scaled typography
</Frame>
```

**Option 4: Use String Keys Directly (Resolution Automatic)**

When you define variants, you can use string keys and they'll automatically resolve:

```typescript
// button.variants.ts
export const buttonVariants = {
  primary: {
    typography: {
      fontSize: 'base',     // Will look for scale, fallback to value
      fontWeight: 'semibold',
      lineHeight: 'normal'
    }
  }
};
```

### Why Typography Scales?

1. **Consistency**: One source of truth for all sizes/weights
2. **Maintainability**: Change scale values in one place
3. **Flexibility**: Can use numeric values OR scale keys
4. **Type Safety**: TypeScript autocomplete for scale keys
5. **Design Systems**: Matches tools like Tailwind, Chakra UI, etc.

## Composing Variants

The power of Noiir is in **composing variants**. You can reference color and font variants inside other variants:

```typescript
// colors.ts
export const colors = {
  primary: '#2196f3',
  white: '#ffffff',
  dark: '#1a1a1a'
};

// fonts.ts
export const fonts = {
  heading: 'Poppins, sans-serif',
  body: 'Inter, sans-serif'
};

// button.variants.ts
import { colors } from './colors';
import { fonts } from './fonts';

export const buttonVariants = {
  primary: {
    fill: { type: 'solid', color: colors.primary },
    typography: { 
      fontFamily: fonts.body,
      color: colors.white,
      fontSize: 16,
      fontWeight: 600
    },
    appearance: { radius: 8 },
    autoLayout: { padding: { horizontal: 24, vertical: 12 } }
  }
};

// text.variants.ts
import { colors } from './colors';
import { fonts } from './fonts';

export const textVariants = {
  h1: {
    typography: {
      fontFamily: fonts.heading,
      fontSize: 32,
      fontWeight: 700,
      color: colors.dark
    }
  },
## Example Variant Files

Noiir provides example variant files in `@variants/theme`:
- `colors.variants.tsx` - Example color palette (17 colors)
- `fonts.variants.tsx` - Example font palette (5 fonts)
- `typography.variants.tsx` - Example typography scales (fontSize, fontWeight, lineHeight, letterSpacing)

These are **minimal examples** for stories and demos. **You should create your own**:

```typescript
// my-app/variants/design-tokens.ts
export const myDesignSystem = {
  colors: {
    // Your brand colors
    brandPrimary: '#6366f1',
    brandSecondary: '#ec4899',
  },
  fonts: {
    // Your font choices
    heading: 'Your Font, sans-serif',
    body: 'Your Font, sans-serif',
  },
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 20,
      xl: 24,
      '2xl': 32,
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    }
  },
  spacing: {
    // Your spacing scale
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radii: {
    // Your border radius scale
    sm: 4,
    md: 8,
    lg: 16,
  }
};
```
## Complete Example: Building a Custom Button System

### Step 1: Define Your Design Tokens

Create your design system in your project:

```typescript
// src/variants/my-design-tokens.ts

// Your brand colors
export const myColors = {
  brandBlue: '#0066cc',
  brandPink: '#ff0066',
  darkText: '#1a1a1a',
  lightText: '#666666',
  white: '#ffffff',
  success: '#10b981',
  error: '#ef4444',
};

// Your fonts
export const myFonts = {
  heading: 'Poppins, -apple-system, sans-serif',
  body: 'Inter, -apple-system, sans-serif',
};

// Your typography scale
export const myTypographyScale = {
  fontSize: {
    sm: 14,
    base: 16,
    lg: 18,
    xl: 24,
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  }
};
```

### Step 2: Create Your Component Variants

Use your design tokens to define component variants:

```typescript
// src/variants/button.variants.ts
import { myColors, myFonts, myTypographyScale } from './my-design-tokens';

export const myButtonVariants = {
  primary: {
    fill: { type: 'solid', color: myColors.brandBlue },
    typography: { 
      fontFamily: myFonts.body,
      fontSize: myTypographyScale.fontSize.base,
      fontWeight: myTypographyScale.fontWeight.semibold,
      color: myColors.white
    },
    appearance: { radius: 8 },
    autoLayout: { 
      padding: { horizontal: 24, vertical: 12 },
      width: 'hug',
      height: 'hug'
    },
    cursor: { cursor: 'pointer' }
  },
  
  secondary: {
    fill: { type: 'solid', color: myColors.brandPink },
    typography: { 
      fontFamily: myFonts.body,
      fontSize: myTypographyScale.fontSize.base,
      fontWeight: myTypographyScale.fontWeight.semibold,
      color: myColors.white
    },
    appearance: { radius: 8 },
    autoLayout: { 
      padding: { horizontal: 24, vertical: 12 },
      width: 'hug',
      height: 'hug'
    },
    cursor: { cursor: 'pointer' }
  },
  
  small: {
    typography: { fontSize: myTypographyScale.fontSize.sm },
    autoLayout: { padding: { horizontal: 16, vertical: 8 } }
  },
  
  large: {
    typography: { fontSize: myTypographyScale.fontSize.lg },
    autoLayout: { padding: { horizontal: 32, vertical: 16 } }
  }
};
```

### Step 3: Use in Your Component

Apply variants to your components:

```tsx
// src/components/MyButton.tsx
import { Frame } from '@noiir/core';
import { myButtonVariants } from '../variants/button.variants';

export function MyButton({ variant = 'primary', size, children, onClick }) {
  return (
    <Frame
      as="button"
      variants={myButtonVariants}
      variant={variant}
      variantState={size}
      onClick={onClick}
    >
      {children}
    </Frame>
  );
}

// Usage
<MyButton variant="primary">Click Me</MyButton>
<MyButton variant="secondary" size="small">Small Button</MyButton>
<MyButton variant="primary" size="large">Large Button</MyButton>
```

### Alternative: Direct Values (No Variants)

You can skip variants and use values directly for simple cases:

```tsx
// Simple approach - direct values
<Frame
  as="button"
  fill={{ type: 'solid', color: '#0066cc' }}
  typography={{ 
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    fontWeight: 600,
    color: '#ffffff'
  }}
  appearance={{ radius: 8 }}
  autoLayout={{ padding: { horizontal: 24, vertical: 12 } }}
  cursor={{ cursor: 'pointer' }}
  onClick={() => console.log('clicked')}
>
  Click Me
</Frame>
```

### With Typography Scales (Advanced)

Pass scales to Frame for automatic resolution:

```tsx
import { myTypographyScale } from './variants/my-design-tokens';

<Frame
  typographyScale={myTypographyScale}
  typography={{ 
    fontSize: 'lg',        // resolves to 18
    fontWeight: 'semibold', // resolves to 600
    lineHeight: 'normal'    // resolves to 1.5
  }}
>
  Content with scaled typography
</Frame>
```

## Using the Example Variants

Noiir includes example variant files for reference:

```typescript
// Import example variants (for prototyping)
import { colorVariants, fontVariants, typographyScales } from '@noiir/core/theme';

// Use in your components
<Frame fill={{ type: 'solid', color: colorVariants.brandPrimary }}>
  Content
</Frame>
```

**For production, copy these files to your project and customize:**

```bash
# Copy example files to your project
cp node_modules/@noiir/core/__variants__/theme/colors.variants.tsx src/variants/
cp node_modules/@noiir/core/__variants__/theme/fonts.variants.tsx src/variants/
cp node_modules/@noiir/core/__variants__/theme/typography.variants.tsx src/variants/

# Then customize them with your brand colors, fonts, and scales
```

## The Noiir Workflow

Noiir doesn't force a workflow. You have flexibility:

1. **✅ Direct values** (simplest) - Use hex colors, pixel values directly
2. **✅ Token files** - Create design token files and reference them
3. **✅ Variant systems** - Build composable variant libraries
4. **✅ Scale resolution** - Pass scales to Frame for automatic resolution

Choose the approach that fits your project size and complexity.
