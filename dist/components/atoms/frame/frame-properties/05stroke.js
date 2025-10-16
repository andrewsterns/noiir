import { resolveColor } from '../../../../theme/colors';
/**
 * Convert stroke props to CSS styles
 */
export const convertStrokeProps = (props) => {
    if (!props)
        return {};
    const styles = {};
    // Stroke weight (border width)
    const strokeWeight = props.weight || 1;
    // Stroke color
    const strokeColor = props.color ? resolveColor(props.color) : '#000000';
    // Stroke position
    switch (props.position) {
        case 'inside':
            // Inside stroke (default CSS behavior)
            styles.border = `${strokeWeight}px solid ${strokeColor}`;
            break;
        case 'outside':
            // Outside stroke using outline (closest CSS equivalent)
            styles.outline = `${strokeWeight}px solid ${strokeColor}`;
            styles.outlineOffset = '0px';
            break;
        case 'center':
        default:
            // Center stroke (default)
            styles.border = `${strokeWeight}px solid ${strokeColor}`;
            break;
    }
    // Dash pattern
    if (props.dashPattern && props.dashPattern.length > 0) {
        if (props.position === 'outside') {
            styles.outlineStyle = 'dashed';
        }
        else {
            styles.borderStyle = 'dashed';
        }
    }
    return styles;
};
/**
 * Create stroke pattern string
 */
export const createStrokePattern = (pattern) => {
    return pattern.join(' ');
};
