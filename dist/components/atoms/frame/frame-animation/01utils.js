/**
 * Frame Animation Utilities



/**
 * Animation Utilities
 *
 * Helper functions for handling Frame animations
 */
import { useState, useCallback } from 'react';
import { resolveLayoutAnimation, createLayoutAnimationStyles } from './layout/layout.animation';
import { convertPositionProps } from '../frame-properties/position/position.props';
import { convertAutoLayoutProps, convertSizeProps } from '../frame-properties/layout/layout.props';
import { convertAppearanceProps } from '../frame-properties/appearance/appearance.props';
import { convertTypographyProps } from '../frame-properties/typography.props';
import { convertFillProps } from '../frame-properties/appearance/fill.props';
import { convertStrokeProps } from '../frame-properties/appearance/stroke.props';
import { convertEffectProps } from '../frame-properties/effects/effects.props';
/**
 * Deep merge helper for Frame properties
 */
function deepMergeFrameProps(base, override) {
    const result = { ...base };
    // Handle each property type specifically
    if (override.size) {
        result.size = { ...base.size, ...override.size };
    }
    if (override.appearance) {
        result.appearance = { ...base.appearance, ...override.appearance };
    }
    if (override.typography) {
        result.typography = { ...base.typography, ...override.typography };
    }
    if (override.fill) {
        result.fill = { ...base.fill, ...override.fill };
    }
    if (override.stroke) {
        result.stroke = { ...base.stroke, ...override.stroke };
    }
    if (override.effects) {
        result.effects = { ...base.effects, ...override.effects };
    }
    if (override.position) {
        result.position = { ...base.position, ...override.position };
    }
    if (override.constraints) {
        result.constraints = { ...base.constraints, ...override.constraints };
    }
    if (override.autoLayout) {
        result.autoLayout = { ...base.autoLayout, ...override.autoLayout };
    }
    // Handle primitive properties
    if (override.id !== undefined)
        result.id = override.id;
    if (override.className !== undefined)
        result.className = override.className;
    if (override.style !== undefined)
        result.style = override.style;
    if (override.children !== undefined)
        result.children = override.children;
    if (override.onClick !== undefined)
        result.onClick = override.onClick;
    if (override.onMouseEnter !== undefined)
        result.onMouseEnter = override.onMouseEnter;
    if (override.onMouseLeave !== undefined)
        result.onMouseLeave = override.onMouseLeave;
    return result;
}
/**
 * Merges animation state properties with base frame properties
 * Preserves individual properties within nested objects
 */
export function mergeAnimationProps(baseProps, animations, state) {
    let result = { ...baseProps };
    // Apply hover state
    if (state.isHovered && animations.hover) {
        result = deepMergeFrameProps(result, animations.hover);
    }
    // Apply click state (takes precedence)
    if (state.isClicked && animations.click) {
        result = deepMergeFrameProps(result, animations.click);
    }
    // Apply toggle state (persistent - takes precedence over hover/click)
    if (state.isToggled && animations.toggle) {
        result = deepMergeFrameProps(result, animations.toggle);
    }
    // Apply focus state
    if (state.isFocused && animations.focus) {
        result = deepMergeFrameProps(result, animations.focus);
    }
    // Apply active state
    if (state.isActive && animations.active) {
        result = deepMergeFrameProps(result, animations.active);
    }
    // Apply disabled state (overrides all)
    if (state.isDisabled && animations.disabled) {
        result = deepMergeFrameProps(result, animations.disabled);
    }
    return result;
}
/**
 * Converts Frame props to CSS styles (similar to Frame component)
 */
export function convertFramePropsToStyles(props) {
    const { position, constraints, autoLayout, size, appearance, typography, fill, stroke, effects, } = props;
    // Determine if this frame uses auto layout
    const hasAutoLayout = !!autoLayout && (autoLayout.flow === 'horizontal' || autoLayout.flow === 'vertical');
    // Convert Figma props to CSS styles
    const positionStyles = convertPositionProps(position || {}, hasAutoLayout);
    const autoLayoutStyles = convertAutoLayoutProps(autoLayout || {});
    const sizeStyles = convertSizeProps(size || {});
    const appearanceStyles = convertAppearanceProps(appearance || {});
    const typographyStyles = convertTypographyProps(typography || {});
    const fillStyles = convertFillProps(fill || {}, false);
    const strokeStyles = convertStrokeProps(stroke || {});
    const effectStyles = convertEffectProps(effects || {});
    // Base styles for frames
    const baseStyles = {
        boxSizing: 'border-box',
        // Only set position: relative if not using absolute positioning
        ...((!(position === null || position === void 0 ? void 0 : position.x) && !(position === null || position === void 0 ? void 0 : position.y) && !constraints) && { position: 'relative' })
    };
    // Merge all styles
    return {
        ...baseStyles,
        ...positionStyles,
        ...autoLayoutStyles,
        ...sizeStyles,
        ...appearanceStyles,
        ...typographyStyles,
        ...fillStyles,
        ...strokeStyles,
        ...effectStyles,
    };
}
/**
 * Creates CSS transition styles for animations
 */
export function createAnimationStyles(baseProps, transition) {
    const styles = convertFramePropsToStyles(baseProps);
    if (transition) {
        styles.transition = transition;
    }
    return styles;
}
/**
 * Extracts Frame props from AnimatedFrameProps
 */
export function extractFrameProps(props) {
    const { animate, ...frameProps } = props;
    return frameProps;
}
/**
 * Creates default animation state
 */
export function createDefaultAnimationState() {
    return {
        isHovered: false,
        isClicked: false,
        isToggled: false, // New: persistent toggle state
        isFocused: false,
        isActive: false,
        isDisabled: false
    };
}
// Default animation transitions
export const DEFAULT_TRANSITIONS = {
    fast: 'all 0.15s ease-out',
    normal: 'all 0.3s ease-out',
    slow: 'all 0.5s ease-out',
    spring: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    bounce: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};
/**
 * Common animation presets (legacy - use specific animation modules for new presets)
 * @deprecated Use APPEARANCE_ANIMATION_PRESETS, EFFECTS_ANIMATION_PRESETS, etc. from specific modules
 */
export const ANIMATION_PRESETS = {
    hoverGrow: {
        hover: { scale: 1.05 }
    },
    hoverShrink: {
        hover: { scale: 0.95 }
    },
    clickShrink: {
        click: { scale: 0.95 }
    },
    focusBorder: {
        focus: {
            stroke: { color: '#3b82f6', width: 2 }
        }
    },
    buttonPress: {
        hover: { appearance: { scale: 1.02 } },
        click: { appearance: { scale: 0.98 } }
    }
};
/**
 * Main animation hook for Frame components
 */
export function useFrameAnimation(props, animate) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    // Animation state management
    const [animationState, setAnimationState] = useState(createDefaultAnimationState());
    // Layout animation state
    const [layoutAnimationState, setLayoutAnimationState] = useState({
        currentFlow: (_a = props.autoLayout) === null || _a === void 0 ? void 0 : _a.flow,
        currentAlignment: (_b = props.autoLayout) === null || _b === void 0 ? void 0 : _b.alignment,
        currentGap: (_c = props.autoLayout) === null || _c === void 0 ? void 0 : _c.gap,
        currentPadding: (_d = props.autoLayout) === null || _d === void 0 ? void 0 : _d.padding,
        currentWidth: (_e = props.size) === null || _e === void 0 ? void 0 : _e.width,
        currentHeight: (_f = props.size) === null || _f === void 0 ? void 0 : _f.height,
        currentWrap: (_g = props.autoLayout) === null || _g === void 0 ? void 0 : _g.wrap,
        isAnimating: false,
    });
    // Create event handlers
    const handleMouseEnter = useCallback((event) => {
        var _a, _b;
        if (animate === null || animate === void 0 ? void 0 : animate.hover) {
            setAnimationState(prev => ({ ...prev, isHovered: true }));
            if ((_a = animate.layoutAnimation) === null || _a === void 0 ? void 0 : _a.hover) {
                setLayoutAnimationState(prev => ({ ...prev, isAnimating: true, animationType: 'hover' }));
            }
        }
        (_b = props.onMouseEnter) === null || _b === void 0 ? void 0 : _b.call(props, event);
    }, [animate === null || animate === void 0 ? void 0 : animate.hover, (_h = animate === null || animate === void 0 ? void 0 : animate.layoutAnimation) === null || _h === void 0 ? void 0 : _h.hover, props.onMouseEnter]);
    const handleMouseLeave = useCallback((event) => {
        var _a, _b;
        if (animate === null || animate === void 0 ? void 0 : animate.hover) {
            setAnimationState(prev => ({ ...prev, isHovered: false, isClicked: false }));
            if ((_a = animate.layoutAnimation) === null || _a === void 0 ? void 0 : _a.hover) {
                setLayoutAnimationState(prev => ({ ...prev, isAnimating: false, animationType: undefined }));
            }
        }
        (_b = props.onMouseLeave) === null || _b === void 0 ? void 0 : _b.call(props, event);
    }, [animate === null || animate === void 0 ? void 0 : animate.hover, (_j = animate === null || animate === void 0 ? void 0 : animate.layoutAnimation) === null || _j === void 0 ? void 0 : _j.hover, props.onMouseLeave]);
    const handleClick = useCallback((event) => {
        var _a, _b, _c;
        if (animate === null || animate === void 0 ? void 0 : animate.toggle) {
            // Toggle state - persistent until clicked again
            setAnimationState(prev => ({ ...prev, isToggled: !prev.isToggled }));
            if ((_a = animate.layoutAnimation) === null || _a === void 0 ? void 0 : _a.toggle) {
                setLayoutAnimationState(prev => ({
                    ...prev,
                    isAnimating: true,
                    animationType: prev.animationType === 'toggle' ? undefined : 'toggle'
                }));
            }
        }
        else if (animate === null || animate === void 0 ? void 0 : animate.click) {
            // Regular click state - temporary
            setAnimationState(prev => ({ ...prev, isClicked: true }));
            if ((_b = animate.layoutAnimation) === null || _b === void 0 ? void 0 : _b.click) {
                setLayoutAnimationState(prev => ({ ...prev, isAnimating: true, animationType: 'click' }));
            }
            setTimeout(() => {
                var _a;
                setAnimationState(prev => ({ ...prev, isClicked: false }));
                if ((_a = animate.layoutAnimation) === null || _a === void 0 ? void 0 : _a.click) {
                    setLayoutAnimationState(prev => ({ ...prev, isAnimating: false, animationType: undefined }));
                }
            }, 150);
        }
        (_c = props.onClick) === null || _c === void 0 ? void 0 : _c.call(props, event);
    }, [animate === null || animate === void 0 ? void 0 : animate.toggle, animate === null || animate === void 0 ? void 0 : animate.click, (_k = animate === null || animate === void 0 ? void 0 : animate.layoutAnimation) === null || _k === void 0 ? void 0 : _k.toggle, (_l = animate === null || animate === void 0 ? void 0 : animate.layoutAnimation) === null || _l === void 0 ? void 0 : _l.click, props.onClick]);
    // Merge props with animation state
    let currentProps = props;
    if (animate) {
        currentProps = mergeAnimationProps(props, animate, animationState);
        // Apply layout animations
        if (animate.layoutAnimation && layoutAnimationState.animationType) {
            const layoutAnimation = animate.layoutAnimation[layoutAnimationState.animationType];
            if (layoutAnimation && currentProps.autoLayout) {
                currentProps.autoLayout = resolveLayoutAnimation(currentProps.autoLayout, layoutAnimation, layoutAnimationState);
            }
        }
    }
    // Create animation styles
    const animationStyles = {};
    if (animate) {
        // Add regular transition
        const transition = [
            animate.duration || '0.2s',
            animate.timing || 'ease-out',
            animate.delay || '0s',
            animate.property || 'all'
        ].join(' ');
        animationStyles.transition = transition;
        // Add layout animation styles
        if (animate.layoutAnimation && layoutAnimationState.animationType) {
            const layoutAnimation = animate.layoutAnimation[layoutAnimationState.animationType];
            if (layoutAnimation) {
                const layoutStyles = createLayoutAnimationStyles(layoutAnimation);
                Object.assign(animationStyles, layoutStyles);
            }
        }
        // Add cursor if interactive
        if (animate.hover || animate.click || animate.toggle) {
            animationStyles.cursor = 'pointer';
        }
    }
    // Create event handlers object
    const eventHandlers = {};
    if ((animate === null || animate === void 0 ? void 0 : animate.hover) || ((_m = animate === null || animate === void 0 ? void 0 : animate.layoutAnimation) === null || _m === void 0 ? void 0 : _m.hover)) {
        eventHandlers.onMouseEnter = handleMouseEnter;
        eventHandlers.onMouseLeave = handleMouseLeave;
    }
    if ((animate === null || animate === void 0 ? void 0 : animate.click) || (animate === null || animate === void 0 ? void 0 : animate.toggle) || ((_o = animate === null || animate === void 0 ? void 0 : animate.layoutAnimation) === null || _o === void 0 ? void 0 : _o.click) || ((_p = animate === null || animate === void 0 ? void 0 : animate.layoutAnimation) === null || _p === void 0 ? void 0 : _p.toggle)) {
        eventHandlers.onClick = handleClick;
    }
    return {
        currentProps,
        animationStyles,
        eventHandlers
    };
}
