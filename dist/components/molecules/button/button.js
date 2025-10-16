import { jsx as _jsx } from "react/jsx-runtime";
import { Frame } from '../../atoms/frame/Frame';
/**
 * Button component - Frame with click interactions
 * Inherits ALL Frame properties: fill, stroke, position, layout, typography, etc.
 *
 * @example
 * ```tsx
 * <Button
 *   fill={{ type: 'solid', color: 'primary6' }}
 *   appearance={{ radius: 8 }}
 *   size={{ width: 200, height: 60 }}
 *   onClick={() => console.log('clicked!')}
 * >
 *   Click me
 * </Button>
 *
 * // With gradient and all Frame powers
 * <Button
 *   fill={{
 *     type: 'linear-gradient',
 *     angle: 45,
 *     stops: [
 *       { color: 'primary4', position: 0 },
 *       { color: 'primary8', position: 1 }
 *     ]
 *   }}
 *   stroke={{ color: 'white', weight: 2 }}
 *   appearance={{ radius: 12 }}
 *   typography={{ fontSize: 18, fontWeight: 600, textAlign: 'center' }}
 *   onClick={handleClick}
 * >
 *   Gradient Button
 * </Button>
 * ```
 */
export const Button = ({ onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, disabled = false, cursor = 'pointer', tabIndex = 0, 'aria-label': ariaLabel, role = 'button', children, style, ...frameProps // This spreads ALL Frame props automatically!
 }) => {
    const handleClick = (event) => {
        if (disabled)
            return;
        onClick === null || onClick === void 0 ? void 0 : onClick(event);
    };
    const handleMouseEnter = (event) => {
        if (disabled)
            return;
        onMouseEnter === null || onMouseEnter === void 0 ? void 0 : onMouseEnter(event);
    };
    const handleMouseLeave = (event) => {
        if (disabled)
            return;
        onMouseLeave === null || onMouseLeave === void 0 ? void 0 : onMouseLeave(event);
    };
    const handleFocus = (event) => {
        if (disabled)
            return;
        onFocus === null || onFocus === void 0 ? void 0 : onFocus(event);
    };
    const handleBlur = (event) => {
        if (disabled)
            return;
        onBlur === null || onBlur === void 0 ? void 0 : onBlur(event);
    };
    const handleKeyDown = (event) => {
        if (disabled)
            return;
        // Handle Enter and Space as clicks for accessibility
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick === null || onClick === void 0 ? void 0 : onClick(event);
        }
    };
    return (_jsx("div", { tabIndex: disabled ? -1 : tabIndex, "aria-label": ariaLabel, role: role, "aria-disabled": disabled, onFocus: handleFocus, onBlur: handleBlur, onKeyDown: handleKeyDown, style: {
            cursor: disabled ? 'not-allowed' : cursor,
            opacity: disabled ? 0.5 : 1,
            userSelect: 'none',
            outline: 'none', // We'll handle focus with Frame's appearance
            transition: 'opacity 0.2s ease-in-out, transform 0.1s ease-in-out',
            display: 'inline-block', // Prevent full-width by default
        }, children: _jsx(Frame, { ...frameProps, onClick: handleClick, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, style: {
                ...style,
            }, children: children }) }));
};
Button.displayName = 'Button';
