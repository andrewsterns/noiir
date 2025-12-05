/**
 * Color Variants - Example Design Tokens
 * 
 * These are example colors provided as placeholders for stories and demos.
 * In your own project, create your own color palette with your brand colors.
 * 
 * Copy this file to your project and customize with your own colors.
 */

export const colorVariants = {
  // Brand colors - replace with your brand
  brandPrimary: '#6366f1',    // Indigo
  brandSecondary: '#ec4899',  // Pink
  brandAccent: '#14b8a6',     // Teal
  
  // Semantic colors
  success: '#10b981',  // Green
  warning: '#f59e0b',  // Amber
  error: '#ef4444',    // Red
  info: '#3b82f6',     // Blue
  
  // Neutral scale (light to dark)
  neutral50: '#fafafa',
  neutral100: '#f5f5f5',
  neutral200: '#e5e5e5',
  neutral300: '#d4d4d4',
  neutral400: '#a3a3a3',
  neutral500: '#737373',
  neutral600: '#525252',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',
  
  // Special
  transparent: 'transparent',
  white: '#ffffff',
  black: '#000000',
};

// Semantic color mappings
export const semanticColors = {
  text: {
    primary: colorVariants.neutral900,
    secondary: colorVariants.neutral600,
    disabled: colorVariants.neutral400,
    inverse: colorVariants.white,
  },
  background: {
    primary: colorVariants.white,
    secondary: colorVariants.neutral50,
    tertiary: colorVariants.neutral100,
    inverse: colorVariants.neutral900,
  },
  border: {
    default: colorVariants.neutral300,
    hover: colorVariants.neutral400,
    focus: colorVariants.brandPrimary,
  }
};

export type ColorVariantName = keyof typeof colorVariants;

export default colorVariants;
