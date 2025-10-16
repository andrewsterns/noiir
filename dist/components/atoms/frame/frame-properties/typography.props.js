import { resolveColor } from '../../../../theme/colors';
/**
 * Convert typography props to CSS styles
 */
export const convertTypographyProps = (props) => {
    const styles = {};
    if (props.fontFamily !== undefined)
        styles.fontFamily = props.fontFamily;
    if (props.fontSize !== undefined)
        styles.fontSize = typeof props.fontSize === 'number' ? `${props.fontSize}px` : props.fontSize;
    if (props.fontWeight !== undefined)
        styles.fontWeight = props.fontWeight;
    if (props.lineHeight !== undefined)
        styles.lineHeight = props.lineHeight;
    if (props.letterSpacing !== undefined)
        styles.letterSpacing = typeof props.letterSpacing === 'number' ? `${props.letterSpacing}px` : props.letterSpacing;
    if (props.textAlign !== undefined)
        styles.textAlign = props.textAlign;
    if (props.textDecoration !== undefined)
        styles.textDecoration = props.textDecoration;
    if (props.textTransform !== undefined)
        styles.textTransform = props.textTransform;
    if (props.color !== undefined)
        styles.color = resolveColor(props.color);
    return styles;
};
/**
 * Resolve text properties (alias for convertTypographyProps)
 */
export const resolveTextProps = convertTypographyProps;
/**
 * Create typography scale
 */
export const createTypographyScale = (baseSize = 16, ratio = 1.25) => {
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
export const createTypographyPreset = (config) => {
    return config;
};
/**
 * Apply typography preset to an element
 */
export const applyTypographyPreset = (preset, overrides) => {
    return {
        ...preset,
        ...overrides,
    };
};
/**
 * Merge multiple typography configurations
 */
export const mergeTypographyProps = (...configs) => {
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
