import { jsx as _jsx } from "react/jsx-runtime";
import { convertPositionProps } from '../frame/frame-settings/00position';
import { convertSizeProps } from '../frame/frame-settings/01layout';
import { convertAppearanceProps } from '../frame/frame-settings/02appearance';
import { convertFillProps } from '../frame/frame-settings/04fill';
import { convertStrokeProps } from '../frame/frame-settings/05stroke';
import { convertEffectProps } from '../frame/frame-settings/06effects';
import { mergeStyles } from '../../../utils/style.utils';
/**
 * Ellipse component - Figma-style ellipse/circle primitive
 * A circular shape with fills, strokes, and effects
 */
export const Ellipse = ({ position, appearance, fill, stroke, effects, size, constraints, className, style: overrideStyle, }) => {
    // Convert Figma props to CSS styles
    const positionStyles = convertPositionProps(position);
    const appearanceStyles = convertAppearanceProps(appearance);
    const fillStyles = fill ? convertFillProps({ type: 'solid', color: fill }) : {};
    const strokeStyles = stroke ? convertStrokeProps({ color: stroke }) : {};
    const effectStyles = convertEffectProps(effects);
    const sizeStyles = convertSizeProps(size);
    // Base styles for ellipses
    const baseStyles = {
        boxSizing: 'border-box',
        display: 'block',
        borderRadius: '50%', // Makes it circular
        // Default size if not specified
        width: (size === null || size === void 0 ? void 0 : size.width) ? undefined : '100px',
        height: (size === null || size === void 0 ? void 0 : size.height) ? undefined : '100px',
    };
    // Merge all styles with override taking precedence
    const finalStyles = mergeStyles(baseStyles, positionStyles, appearanceStyles, fillStyles, strokeStyles, effectStyles, sizeStyles, overrideStyle);
    return _jsx("div", { className: className, style: finalStyles });
};
Ellipse.displayName = 'Ellipse';
