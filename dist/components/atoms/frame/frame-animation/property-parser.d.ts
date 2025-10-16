import { AnimationKeyframe, FrameProperties, FramePosition, FrameSize, FrameAppearance, FrameFill, FrameStroke, FrameTypography, FrameEffects, IFramePropertyParser } from './types';
/**
 * Comprehensive property parser for Frame animation properties
 * Converts Frame property objects to CSS-animatable values
 */
export declare class FramePropertyParser implements IFramePropertyParser {
    /**
     * Convert Frame properties to CSS styles (instance method)
     */
    parse(properties: FrameProperties): CSSStyleDeclaration;
    /**
     * Instance method wrappers for interface compliance
     */
    parsePosition(position: FramePosition): Partial<CSSStyleDeclaration>;
    parseSize(size: FrameSize): Partial<CSSStyleDeclaration>;
    parseAppearance(appearance: FrameAppearance): Partial<CSSStyleDeclaration>;
    parseFill(fill: FrameFill): Partial<CSSStyleDeclaration>;
    parseStroke(stroke: FrameStroke): Partial<CSSStyleDeclaration>;
    parseTypography(typography: FrameTypography): Partial<CSSStyleDeclaration>;
    parseEffects(effects: FrameEffects): Partial<CSSStyleDeclaration>;
    /**
     * Convert Frame properties to CSS styles (static method for backwards compatibility)
     */
    static parse(properties: AnimationKeyframe): Partial<CSSStyleDeclaration>;
    /**
     * Internal static parsing method
     */
    private static parseStatic;
    /**
     * Parse position properties
     */
    private static parsePosition;
    /**
     * Parse size properties
     */
    private static parseSize;
    /**
     * Parse appearance properties
     */
    private static parseAppearance;
    /**
     * Parse fill properties
     */
    private static parseFill;
    /**
     * Parse stroke properties
     */
    private static parseStroke;
    /**
     * Parse typography properties
     */
    private static parseTypography;
    /**
     * Parse effects properties (shadows, blurs, etc.)
     */
    private static parseEffects;
    /**
     * Parse unit values (number to px, string as-is)
     */
    private static parseUnit;
    /**
     * Apply opacity to color
     */
    private static applyOpacityToColor;
    /**
     * Create linear gradient CSS
     */
    private static createLinearGradient;
    /**
     * Create radial gradient CSS
     */
    private static createRadialGradient;
}
