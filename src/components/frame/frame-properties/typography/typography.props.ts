import * as React from 'react';
import { resolveColor } from '../../../../theme/colors';
import { typographyPresets } from '../../../../theme/typography';

/**
 * Typography Properties
 */
export interface TypographyProps {
  type?: string;
  fontFamily?: string;
  fontSize?: number;
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
 */
export function convertTypographyProps(props: TypographyProps): React.CSSProperties {
  // Always merge Frame defaults with provided props, so variant props override but missing values fall back to Frame defaults
  let merged = { ...typographyPresets?.Frame || {}, ...props } as TypographyProps;

  // If type is specified, merge the preset
  if (merged.type && merged.type in typographyPresets) {
    const preset = typographyPresets[merged.type as keyof typeof typographyPresets];
    merged = { ...merged, ...preset };
  }

  // Remove type from merged as it's not a CSS property
  const { type, ...styleProps } = merged;

  const styles: React.CSSProperties = {};
  if (styleProps.fontFamily !== undefined) styles.fontFamily = styleProps.fontFamily;
  if (styleProps.fontSize !== undefined) styles.fontSize = typeof styleProps.fontSize === 'number' ? `${styleProps.fontSize}px` : styleProps.fontSize;
  if (styleProps.fontWeight !== undefined) styles.fontWeight = styleProps.fontWeight;
  if (styleProps.lineHeight !== undefined) styles.lineHeight = styleProps.lineHeight;
  if (styleProps.letterSpacing !== undefined) styles.letterSpacing = typeof styleProps.letterSpacing === 'number' ? `${styleProps.letterSpacing}px` : styleProps.letterSpacing;
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