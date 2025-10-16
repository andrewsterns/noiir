import * as React from 'react';
/**
 * Typography Properties
 */
export interface TypographyProps {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number | string;
    lineHeight?: number | string;
    letterSpacing?: number | string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    textDecoration?: 'none' | 'underline' | 'line-through';
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    color?: string;
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
    position?: any;
    appearance?: any;
    effects?: any;
    size?: any;
    constraints?: any;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * Ellipse Properties (using typography for text styling)
 */
/**
 * Convert typography props to CSS styles
 */
export declare const convertTypographyProps: (props: TypographyProps) => React.CSSProperties;
/**
 * Resolve text properties (alias for convertTypographyProps)
 */
export declare const resolveTextProps: (props: TypographyProps) => React.CSSProperties;
/**
 * Create typography scale
 */
export declare const createTypographyScale: (baseSize?: number, ratio?: number) => {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
};
/**
 * Create typography preset
 */
export declare const createTypographyPreset: (config: Partial<TypographyProps>) => Partial<TypographyProps>;
/**
 * Apply typography preset to an element
 */
export declare const applyTypographyPreset: (preset: TypographyProps, overrides?: Partial<TypographyProps>) => TypographyProps;
/**
 * Merge multiple typography configurations
 */
export declare const mergeTypographyProps: (...configs: Partial<TypographyProps>[]) => TypographyProps;
/**
 * Create common typography presets
 */
export declare const createCommonPresets: () => {
    heading1: Partial<TypographyProps>;
    heading2: Partial<TypographyProps>;
    heading3: Partial<TypographyProps>;
    body: Partial<TypographyProps>;
    caption: Partial<TypographyProps>;
};
