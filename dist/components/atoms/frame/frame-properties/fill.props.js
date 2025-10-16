import { resolveColor } from '../../../../theme/colors';
/**
 * Convert fill props to CSS styles
 */
export const convertFillProps = (props, isTextElement = false) => {
    if (!props)
        return {};
    const styles = {};
    // Determine the fill type
    const fillType = props.type || (props.color ? 'solid' : props.stops ? 'linear-gradient' : props.image ? 'image' : 'solid');
    switch (fillType) {
        case 'none':
            // No fill - explicitly set transparent background
            if (!isTextElement) {
                styles.backgroundColor = 'transparent';
            }
            // For text elements, don't set any color (use inherited/default)
            break;
        case 'solid':
            // Solid color fill
            if (props.color && typeof props.color === 'string') {
                const resolvedColor = resolveColor(props.color);
                if (isTextElement) {
                    styles.color = resolvedColor;
                }
                else {
                    styles.backgroundColor = resolvedColor;
                }
            }
            break;
        case 'linear-gradient':
        case 'radial-gradient':
        case 'conic-gradient':
            // Gradient fill with flattened API
            if (props.stops && props.stops.length > 0) {
                const gradientString = createGradientString(fillType, props.stops, props.angle);
                if (gradientString) {
                    if (isTextElement) {
                        // For text elements, use background-clip: text
                        styles.background = gradientString;
                        styles.WebkitBackgroundClip = 'text';
                        styles.backgroundClip = 'text';
                        styles.WebkitTextFillColor = 'transparent';
                        styles.color = 'transparent';
                    }
                    else {
                        styles.background = gradientString;
                    }
                }
            }
            break;
        case 'image':
            // Image fill
            if (props.image) {
                const imageStyles = createImageFillStyles(props.image);
                if (isTextElement) {
                    // For text elements, use background-clip: text
                    Object.assign(styles, imageStyles);
                    styles.WebkitBackgroundClip = 'text';
                    styles.backgroundClip = 'text';
                    styles.WebkitTextFillColor = 'transparent';
                    styles.color = 'transparent';
                }
                else {
                    Object.assign(styles, imageStyles);
                }
            }
            break;
    }
    return styles;
};
/**
 * Create gradient strings with flattened API
 */
const createGradientString = (type, stops, angle) => {
    if (!stops.length)
        return '';
    // Sort stops by position
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    // Create color stops string
    const colorStops = sortedStops
        .map(stop => `${resolveColor(stop.color)} ${Math.round(stop.position * 100)}%`)
        .join(', ');
    switch (type) {
        case 'linear-gradient':
            const linearAngle = angle || 0;
            return `linear-gradient(${linearAngle}deg, ${colorStops})`;
        case 'radial-gradient':
            return `radial-gradient(circle, ${colorStops})`;
        case 'conic-gradient':
            const conicAngle = angle || 0;
            return `conic-gradient(from ${conicAngle}deg, ${colorStops})`;
        default:
            return `linear-gradient(0deg, ${colorStops})`;
    }
};
/**
 * Create image fill styles
 */
const createImageFillStyles = (image) => {
    if (!(image === null || image === void 0 ? void 0 : image.url))
        return {};
    const styles = {
        backgroundImage: `url(${image.url})`
    };
    // Scale mode
    switch (image.scaleMode) {
        case 'fill':
            // Fill entire container (may crop)
            styles.backgroundSize = 'cover';
            styles.backgroundPosition = 'center';
            styles.backgroundRepeat = 'no-repeat';
            break;
        case 'fit':
            // Fit entire image (may show empty space)
            styles.backgroundSize = 'contain';
            styles.backgroundPosition = 'center';
            styles.backgroundRepeat = 'no-repeat';
            break;
        case 'crop':
            // Show image at original size (may crop)
            styles.backgroundSize = 'auto';
            styles.backgroundPosition = 'center';
            styles.backgroundRepeat = 'no-repeat';
            break;
        case 'tile':
            // Repeat/tile the image
            styles.backgroundSize = 'auto';
            styles.backgroundRepeat = 'repeat';
            break;
        default:
            // Default to fill behavior
            styles.backgroundSize = 'cover';
            styles.backgroundPosition = 'center';
            styles.backgroundRepeat = 'no-repeat';
            break;
    }
    return styles;
};
// Export utility functions for external use
export { createGradientString };
export { createImageFillStyles };
// Create placeholder functions for missing exports
export const createMultipleFills = (fills) => {
    // For now, just return the first fill's styles
    return fills.length > 0 ? convertFillProps(fills[0]) : {};
};
// For backward compatibility, export the same function with different name
export const convertFillPropsUnified = convertFillProps;
export const convertSimpleFillProps = convertFillProps;
