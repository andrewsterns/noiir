import * as React from 'react';
import { 
  TypographyProps, 
  convertTypographyProps as convertTypographyPropsBase,
  applyTypographyPreset,
  mergeTypographyProps
} from '../components/atoms/frame/frame-properties/typography/typography.props';
import { fonts } from './fonts';

/**
 * Re-export the main conversion function from types
 */
export const convertTypographyProps = convertTypographyPropsBase;

/**
 * Re-export helper functions from types
 */
export { mergeTypographyProps, applyTypographyPreset };

// Re-export fonts for convenience
export { fonts };

/**
 * Predefined Figma-style typography presets
 */
export const typographyPresets = {
  // Headings
  h1: {
    fontFamily: fonts.atkinsonMono.family,
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: fonts.atkinsonMono.family,
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 1.3,
    letterSpacing: -0.25,
  },
  h3: {
    fontFamily: fonts.atkinsonMono.family,
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 1.4,
    letterSpacing: 0,
  },
  h4: {
    fontFamily: fonts.atkinsonMono.family,
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 1.4,
    letterSpacing: 0,
  },
  h5: {
    fontFamily: fonts.atkinsonMono.family,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0,
  },
  h6: {
    fontFamily: fonts.atkinsonMono.family,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1.5,
    letterSpacing: 0,
  },

  // Body text
  body1: {
    fontFamily: fonts.inter.family,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0,
  },
  body2: {
    fontFamily: fonts.inter.family,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 1.5,
    letterSpacing: 0,
  },

  // Labels and UI text
  label: {
    fontFamily: fonts.inter.family,
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 1.4,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontFamily: fonts.inter.family,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.4,
    letterSpacing: 0.25,
  },
  overline: {
    fontFamily: fonts.inter.family,
    fontWeight: 500,
    fontSize: 10,
    lineHeight: 1.6,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },

  // Button text
  button: {
    fontFamily: fonts.inter.family,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1.4,
    letterSpacing: 0.25,
  },

  // Special presets with different fonts
  display: {
    fontFamily: fonts.poppins.family,
    fontWeight: 600,
    fontSize: 48,
    lineHeight: 1.1,
    letterSpacing: -1,
  },
  code: {
    fontFamily: fonts.jetbrainsMono.family,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 1.4,
    letterSpacing: 0,
  },
} as const;

/**
 * Helper function to apply a typography preset from this theme
 */
export const applyThemePreset = (
  preset: keyof typeof typographyPresets,
  overrides?: Partial<TypographyProps>
): React.CSSProperties => {
  const basePreset = typographyPresets[preset];
  const mergedProps = { ...basePreset, ...overrides };
  return convertTypographyProps(mergedProps);
};