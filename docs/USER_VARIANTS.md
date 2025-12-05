# User-Defined Variants Guide

## Overview

Noiir is designed to be framework-agnostic when it comes to design tokens. **Colors and fonts are NOT baked into the framework** - you define them as variants in your own project.

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
- `colors.variants.tsx` - Example color palette
- `fonts.variants.tsx` - Example font palette

These are placeholders for stories and demos. **You should create your own**:

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
```,
  fonts: {
    // Your font choices
  },
  spacing: {
## Using the Example Variants

Noiir includes example variant files for reference:

```typescript
// Import example variants (for prototyping)
import colorVariants from '@variants/theme/colors.variants';
import fontVariants from '@variants/theme/fonts.variants';

// Use in your components
<Frame fill={{ type: 'solid', color: colorVariants.brandPrimary }}>
  Content
</Frame>
```

**For production, copy these files to your project and customize:**

```bash
# Copy example files to your project
cp node_modules/noiir/__variants__/theme/colors.variants.tsx src/variants/
cp node_modules/noiir/__variants__/theme/fonts.variants.tsx src/variants/

# Then customize them with your brand colors and fonts
```
// colors.primary6, colors.error5, etc.
```

**After:**
```tsx
// Define your own
export const myColors = {
  primary: '#2196f3',
  error: '#f44336'
};

// Or use hex directly
<Frame fill={{ type: 'solid', color: '#2196f3' }} />
```

The `exampleColors` in `@variants/theme/colors` can serve as a starting point, but copy them to your project and customize them to your needs.
