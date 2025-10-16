import * as React from 'react';
import { TypographyProps, applyTypographyPreset, mergeTypographyProps } from '../components/atoms/frame/frame-properties/typography.props';
import { fonts } from './fonts';
/**
 * Re-export the main conversion function from types
 */
export declare const convertTypographyProps: (props: TypographyProps) => React.CSSProperties;
/**
 * Re-export helper functions from types
 */
export { mergeTypographyProps, applyTypographyPreset };
export { fonts };
/**
 * Predefined Figma-style typography presets
 */
export declare const typographyPresets: {
    readonly h1: {
        readonly fontFamily: string;
        readonly fontWeight: 700;
        readonly fontSize: 32;
        readonly lineHeight: 1.2;
        readonly letterSpacing: -0.5;
    };
    readonly h2: {
        readonly fontFamily: string;
        readonly fontWeight: 700;
        readonly fontSize: 24;
        readonly lineHeight: 1.3;
        readonly letterSpacing: -0.25;
    };
    readonly h3: {
        readonly fontFamily: string;
        readonly fontWeight: 600;
        readonly fontSize: 20;
        readonly lineHeight: 1.4;
        readonly letterSpacing: 0;
    };
    readonly h4: {
        readonly fontFamily: string;
        readonly fontWeight: 600;
        readonly fontSize: 18;
        readonly lineHeight: 1.4;
        readonly letterSpacing: 0;
    };
    readonly h5: {
        readonly fontFamily: string;
        readonly fontWeight: 500;
        readonly fontSize: 16;
        readonly lineHeight: 1.5;
        readonly letterSpacing: 0;
    };
    readonly h6: {
        readonly fontFamily: string;
        readonly fontWeight: 500;
        readonly fontSize: 14;
        readonly lineHeight: 1.5;
        readonly letterSpacing: 0;
    };
    readonly body1: {
        readonly fontFamily: string;
        readonly fontWeight: 400;
        readonly fontSize: 16;
        readonly lineHeight: 1.5;
        readonly letterSpacing: 0;
    };
    readonly body2: {
        readonly fontFamily: string;
        readonly fontWeight: 400;
        readonly fontSize: 14;
        readonly lineHeight: 1.5;
        readonly letterSpacing: 0;
    };
    readonly label: {
        readonly fontFamily: string;
        readonly fontWeight: 500;
        readonly fontSize: 12;
        readonly lineHeight: 1.4;
        readonly letterSpacing: 0.5;
        readonly textTransform: "uppercase";
    };
    readonly caption: {
        readonly fontFamily: string;
        readonly fontWeight: 400;
        readonly fontSize: 12;
        readonly lineHeight: 1.4;
        readonly letterSpacing: 0.25;
    };
    readonly overline: {
        readonly fontFamily: string;
        readonly fontWeight: 500;
        readonly fontSize: 10;
        readonly lineHeight: 1.6;
        readonly letterSpacing: 1.5;
        readonly textTransform: "uppercase";
    };
    readonly button: {
        readonly fontFamily: string;
        readonly fontWeight: 500;
        readonly fontSize: 14;
        readonly lineHeight: 1.4;
        readonly letterSpacing: 0.25;
    };
    readonly display: {
        readonly fontFamily: string;
        readonly fontWeight: 600;
        readonly fontSize: 48;
        readonly lineHeight: 1.1;
        readonly letterSpacing: -1;
    };
    readonly code: {
        readonly fontFamily: string;
        readonly fontWeight: 400;
        readonly fontSize: 14;
        readonly lineHeight: 1.4;
        readonly letterSpacing: 0;
    };
};
/**
 * Helper function to apply a typography preset from this theme
 */
export declare const applyThemePreset: (preset: keyof typeof typographyPresets, overrides?: Partial<TypographyProps>) => React.CSSProperties;
