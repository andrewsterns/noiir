import * as React from 'react';
import { resolveColor } from '@variants/theme/colors';
// import { textVariants } from '../../../../src/variants';

// Example scales for backward compatibility
const exampleFontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
};

const exampleFontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

const exampleLineHeights = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
};

const exampleLetterSpacings = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
};

/**
 * Resolve fontSize from a key or return the value as-is
 * @param value - fontSize value (number, string key, or pixel string like "16px")
 * @param scale - Optional user-defined font size scale
 */
export function resolveFontSize(
  value: number | string | undefined,
  scale?: Record<string, number>
): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  
  // Check user scale first
  if (scale && value in scale) return scale[value];
  
  // Check example scale
  if (value in exampleFontSizes) return exampleFontSizes[value as keyof typeof exampleFontSizes];
  
  // If it's a string like "16px", parse it
  if (typeof value === 'string' && value.endsWith('px')) {
    return parseInt(value);
  }
  
  // Return as-is if it's a CSS value
  return value as any;
}

/**
 * Resolve fontWeight from a key or return the value as-is
 * @param value - fontWeight value (number, string key like "bold", or CSS value)
 * @param scale - Optional user-defined font weight scale
 */
export function resolveFontWeight(
  value: number | string | undefined,
  scale?: Record<string, number>
): number | string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  
  // Check user scale first
  if (scale && value in scale) return scale[value];
  
  // Check example scale
  if (value in exampleFontWeights) return exampleFontWeights[value as keyof typeof exampleFontWeights];
  
  // Return as-is (could be CSS keyword like "bold", "normal", etc.)
  return value;
}

/**
 * Resolve lineHeight from a key or return the value as-is
 * @param value - lineHeight value (number, string key, or CSS value)
 * @param scale - Optional user-defined line height scale
 */
export function resolveLineHeight(
  value: number | string | undefined,
  scale?: Record<string, number>
): number | string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  
  // Check user scale first
  if (scale && value in scale) return scale[value];
  
  // Check example scale
  if (value in exampleLineHeights) return exampleLineHeights[value as keyof typeof exampleLineHeights];
  
  // Return as-is
  return value;
}

/**
 * Resolve letterSpacing from a key or return the value as-is
 * @param value - letterSpacing value (number, string key, or CSS value)
 * @param scale - Optional user-defined letter spacing scale
 */
export function resolveLetterSpacing(
  value: number | string | undefined,
  scale?: Record<string, number>
): number | string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  
  // Check user scale first
  if (scale && value in scale) return scale[value];
  
  // Check example scale
  if (value in exampleLetterSpacings) return exampleLetterSpacings[value as keyof typeof exampleLetterSpacings];
  
  // Return as-is
  return value;
}

/**
 * Typography Properties
 */
export interface TypographyProps {
  type?: string;
  fontFamily?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  lineHeight?: number | string;
  letterSpacing?: number | string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textDecoration?: 'none' | 'underline' | 'line-through';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  color?: string;
  opacity?: number;
  whiteSpace?: string;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  clipContent?: boolean;
}

/**
 * Text-specific Properties
 */
export interface TextProps extends TypographyProps {
  children: React.ReactNode;
}

/**
 * Rectangle Properties (using typography for text styling)
 */
export interface RectangleProps extends TypographyProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  // Additional Frame properties
  position?: any;
  appearance?: any;
  effects?: any;
  constraints?: any;
  className?: string;
  style?: React.CSSProperties;
}



/**
 * Convert typography props to CSS styles
 * @param props - Typography properties
 * @param scales - Optional user-defined scales for resolution
 */
export function convertTypographyProps(
  props: TypographyProps,
  scales?: {
    fontSize?: Record<string, number>;
    fontWeight?: Record<string, number>;
    lineHeight?: Record<string, number>;
    letterSpacing?: Record<string, number>;
  }
): React.CSSProperties {
  // Always merge Frame defaults with provided props, so variant props override but missing values fall back to Frame defaults
  let merged = { ...props } as TypographyProps;

  // If type is specified, merge the preset (removed textVariants dependency)
  // if (merged.type && merged.type in textVariants) {
  //   const preset = textVariants[merged.type as keyof typeof textVariants];
  //   merged = { ...merged, ...preset };
  // }

  // Remove type from merged as it's not a CSS property
  const { type, ...styleProps } = merged;

  const styles: React.CSSProperties = {};
  if (styleProps.fontFamily !== undefined) styles.fontFamily = styleProps.fontFamily;
  
  // Resolve fontSize from scale
  const resolvedFontSize = resolveFontSize(styleProps.fontSize, scales?.fontSize);
  if (resolvedFontSize !== undefined) {
    styles.fontSize = typeof resolvedFontSize === 'number' ? `${resolvedFontSize}px` : resolvedFontSize;
  }
  
  // Resolve fontWeight from scale
  const resolvedFontWeight = resolveFontWeight(styleProps.fontWeight, scales?.fontWeight);
  if (resolvedFontWeight !== undefined) styles.fontWeight = resolvedFontWeight;
  
  // Resolve lineHeight from scale
  const resolvedLineHeight = resolveLineHeight(styleProps.lineHeight, scales?.lineHeight);
  if (resolvedLineHeight !== undefined) styles.lineHeight = resolvedLineHeight;
  
  // Resolve letterSpacing from scale
  const resolvedLetterSpacing = resolveLetterSpacing(styleProps.letterSpacing, scales?.letterSpacing);
  if (resolvedLetterSpacing !== undefined) {
    styles.letterSpacing = typeof resolvedLetterSpacing === 'number' ? `${resolvedLetterSpacing}px` : resolvedLetterSpacing;
  }
  if (styleProps.textAlign !== undefined) styles.textAlign = styleProps.textAlign;
  if (styleProps.textDecoration !== undefined) styles.textDecoration = styleProps.textDecoration;
  if (styleProps.textTransform !== undefined) styles.textTransform = styleProps.textTransform;
  if (styleProps.color !== undefined) styles.color = resolveColor(styleProps.color);
  if (styleProps.opacity !== undefined) styles.opacity = styleProps.opacity;
  if (styleProps.whiteSpace !== undefined) styles.whiteSpace = styleProps.whiteSpace;
  if (styleProps.wrap !== undefined) {
    if (styleProps.wrap === 'nowrap') styles.whiteSpace = 'nowrap';
    else if (styleProps.wrap === 'wrap') styles.whiteSpace = 'normal';
    else if (styleProps.wrap === 'wrap-reverse') styles.whiteSpace = 'pre-wrap';
  }
  if (styleProps.clipContent === true) {
    styles.overflow = 'hidden';
  }
  return styles;
}

/**
 * Resolve text properties (alias for convertTypographyProps)
 */
export const resolveTextProps = convertTypographyProps;

/**
 * Create typography scale
 */
export const createTypographyScale = (baseSize: number = 16, ratio: number = 1.25) => {
  return {
    xs: Math.round(baseSize / Math.pow(ratio, 2)),
    sm: Math.round(baseSize / ratio),
    base: baseSize,
    lg: Math.round(baseSize * ratio),
    xl: Math.round(baseSize * Math.pow(ratio, 2)),
    '2xl': Math.round(baseSize * Math.pow(ratio, 3)),
    '3xl': Math.round(baseSize * Math.pow(ratio, 4)),
    '4xl': Math.round(baseSize * Math.pow(ratio, 5)),
  };
};

/**
 * Create typography preset
 */
export const createTypographyPreset = (config: Partial<TypographyProps>) => {
  return config;
};

/**
 * Apply typography preset to an element
 */
export const applyTypographyPreset = (preset: TypographyProps, overrides?: Partial<TypographyProps>): TypographyProps => {
  return {
    ...preset,
    ...overrides,
  };
};

/**
 * Merge multiple typography configurations
 */
export const mergeTypographyProps = (...configs: Partial<TypographyProps>[]): TypographyProps => {
  return configs.reduce((merged, config) => ({
    ...merged,
    ...config,
  }), {});
};

/**
 * Create common typography presets
 */
export const createCommonPresets = () => {
  return {
    heading1: createTypographyPreset({
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 1.2,
    }),
    heading2: createTypographyPreset({
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 1.3,
    }),
    heading3: createTypographyPreset({
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 1.4,
    }),
    body: createTypographyPreset({
      fontSize: 16,
      lineHeight: 1.5,
    }),
    caption: createTypographyPreset({
      fontSize: 14,
      lineHeight: 1.4,
    }),
  };
};