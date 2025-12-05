/**
 * Typography Scale Variants
 * 
 * Define your typography scales for font sizes, weights, line heights, and spacing.
 * These are example scales - users should define their own based on their design system.
 * 
 * Common scales:
 * - Font Sizes: Use a modular scale (e.g., 1.25, 1.5, 2.0 ratio)
 * - Font Weights: Map to actual font weight values (100-900)
 * - Line Heights: Relative to font size (unitless) for better scaling
 * - Letter Spacing: In pixels or em units
 * 
 * @example
 * // Use in variants:
 * typography: {
 *   fontSize: 'lg',      // resolves to fontSizeScale.lg (18)
 *   fontWeight: 'bold',  // resolves to fontWeightScale.bold (700)
 *   lineHeight: 'normal' // resolves to lineHeightScale.normal (1.5)
 * }
 */

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
} as const;

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
} as const;

// Line Height Scale (unitless multipliers)
export const lineHeightScale = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

// Letter Spacing Scale (in pixels)
export const letterSpacingScale = {
  tighter: -0.5,
  tight: -0.25,
  normal: 0,
  wide: 0.25,
  wider: 0.5,
  widest: 0.75,
} as const;

// Type exports for TypeScript
export type FontSizeName = keyof typeof fontSizeScale;
export type FontWeightName = keyof typeof fontWeightScale;
export type LineHeightName = keyof typeof lineHeightScale;
export type LetterSpacingName = keyof typeof letterSpacingScale;

/**
 * Typography Scale Collection
 * Export all scales together for convenience
 */
export const typographyScales = {
  fontSize: fontSizeScale,
  fontWeight: fontWeightScale,
  lineHeight: lineHeightScale,
  letterSpacing: letterSpacingScale,
};
