/**
 * Layout Animation System
 *
 * Specialized animation system for handling layout transitions like flow changes,
 * alignment shifts, spacing adjustments, and dimension changes.
 */
/**
 * Utilities for Layout Animations
 */
// Create CSS transition string for layout properties
export function createLayoutTransition(config) {
    const { property, duration, timing, delay = '0s' } = config;
    return `${property} ${duration} ${timing} ${delay}`;
}
// Create multiple layout transitions
export function createLayoutTransitions(configs) {
    return configs.map(createLayoutTransition).join(', ');
}
// Get default transition config for different layout properties
export const LAYOUT_TRANSITION_DEFAULTS = {
    flow: { duration: '0.3s', timing: 'ease-out' },
    alignment: { duration: '0.2s', timing: 'ease-out' },
    gap: { duration: '0.2s', timing: 'ease-out' },
    padding: { duration: '0.2s', timing: 'ease-out' },
    dimensions: { duration: '0.3s', timing: 'ease-out' },
    wrap: { duration: '0.2s', timing: 'ease-out' },
};
// Convert layout animation props to actual layout props
export function resolveLayoutAnimation(baseProps, animation, state) {
    var _a, _b;
    const resolved = { ...baseProps };
    // Apply flow animation
    if (animation.flow && state.animationType) {
        resolved.flow = animation.flow.to;
    }
    // Apply alignment animation  
    if (animation.alignment && state.animationType) {
        resolved.alignment = animation.alignment.to;
    }
    // Apply spacing animations
    if (((_a = animation.spacing) === null || _a === void 0 ? void 0 : _a.gap) && state.animationType) {
        resolved.gap = animation.spacing.gap.to;
    }
    if (((_b = animation.spacing) === null || _b === void 0 ? void 0 : _b.padding) && state.animationType) {
        resolved.padding = animation.spacing.padding.to;
    }
    // Apply wrap animation
    if (animation.wrap && state.animationType) {
        resolved.wrap = animation.wrap.to;
    }
    return resolved;
}
// Create transition styles for layout animations
export function createLayoutAnimationStyles(animation) {
    var _a, _b, _c, _d;
    const transitions = [];
    // Flow transitions
    if (animation.flow) {
        transitions.push({
            property: 'flex-direction',
            duration: animation.flow.duration || LAYOUT_TRANSITION_DEFAULTS.flow.duration,
            timing: animation.flow.timing || LAYOUT_TRANSITION_DEFAULTS.flow.timing,
        });
    }
    // Alignment transitions  
    if (animation.alignment) {
        transitions.push({
            property: 'justify-content',
            duration: animation.alignment.duration || LAYOUT_TRANSITION_DEFAULTS.alignment.duration,
            timing: animation.alignment.timing || LAYOUT_TRANSITION_DEFAULTS.alignment.timing,
        }, {
            property: 'align-items',
            duration: animation.alignment.duration || LAYOUT_TRANSITION_DEFAULTS.alignment.duration,
            timing: animation.alignment.timing || LAYOUT_TRANSITION_DEFAULTS.alignment.timing,
        });
    }
    // Spacing transitions
    if ((_a = animation.spacing) === null || _a === void 0 ? void 0 : _a.gap) {
        transitions.push({
            property: 'gap',
            duration: animation.spacing.gap.duration || LAYOUT_TRANSITION_DEFAULTS.gap.duration,
            timing: animation.spacing.gap.timing || LAYOUT_TRANSITION_DEFAULTS.gap.timing,
        });
    }
    if ((_b = animation.spacing) === null || _b === void 0 ? void 0 : _b.padding) {
        transitions.push({
            property: 'padding',
            duration: animation.spacing.padding.duration || LAYOUT_TRANSITION_DEFAULTS.padding.duration,
            timing: animation.spacing.padding.timing || LAYOUT_TRANSITION_DEFAULTS.padding.timing,
        });
    }
    // Dimension transitions
    if ((_c = animation.dimensions) === null || _c === void 0 ? void 0 : _c.width) {
        transitions.push({
            property: 'width',
            duration: animation.dimensions.width.duration || LAYOUT_TRANSITION_DEFAULTS.dimensions.duration,
            timing: animation.dimensions.width.timing || LAYOUT_TRANSITION_DEFAULTS.dimensions.timing,
        });
    }
    if ((_d = animation.dimensions) === null || _d === void 0 ? void 0 : _d.height) {
        transitions.push({
            property: 'height',
            duration: animation.dimensions.height.duration || LAYOUT_TRANSITION_DEFAULTS.dimensions.duration,
            timing: animation.dimensions.height.timing || LAYOUT_TRANSITION_DEFAULTS.dimensions.timing,
        });
    }
    // Wrap transitions
    if (animation.wrap) {
        transitions.push({
            property: 'flex-wrap',
            duration: animation.wrap.duration || LAYOUT_TRANSITION_DEFAULTS.wrap.duration,
            timing: animation.wrap.timing || LAYOUT_TRANSITION_DEFAULTS.wrap.timing,
        });
    }
    return {
        transition: transitions.length > 0 ? createLayoutTransitions(transitions) : undefined,
    };
}
// Layout Animation Presets
export const LAYOUT_ANIMATION_PRESETS = {
    // Size presets
    hoverGrow: {
        hover: {
            size: { width: '120%', height: '120%' }
        }
    },
    hoverShrink: {
        hover: {
            size: { width: '90%', height: '90%' }
        }
    },
    clickShrink: {
        click: {
            size: { width: '95%', height: '95%' }
        }
    },
    // Flow transitions
    horizontalToVertical: {
        hover: {
            autoLayout: { flow: 'vertical' }
        }
    },
    verticalToHorizontal: {
        hover: {
            autoLayout: { flow: 'horizontal' }
        }
    },
    // Gap and padding changes
    increaseGap: {
        hover: {
            autoLayout: { gap: 20 }
        }
    },
    increasePadding: {
        hover: {
            autoLayout: { padding: 24 }
        }
    },
    // Responsive layout
    expandContainer: {
        hover: {
            size: { width: 400, height: 300 },
            autoLayout: { gap: 16, padding: 20 }
        }
    }
};
