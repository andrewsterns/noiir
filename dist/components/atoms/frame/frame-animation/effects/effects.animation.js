/**
 * Effects Animation System
 *
 * Specialized animation system for handling effect transitions like shadow changes,
 * blur adjustments, and other visual effects.
 */
// Helper function to create box-shadow string from shadow array
const createBoxShadowString = (shadows) => {
    return shadows.map(shadow => `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread || 0}px ${shadow.color}`).join(', ');
};
// Helper function to create inset box-shadow string
const createInsetShadowString = (shadows) => {
    return shadows.map(shadow => `inset ${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread || 0}px ${shadow.color}`).join(', ');
};
// Utility functions for effects animations
export const createEffectsAnimationStyles = (animation, state) => {
    const styles = {};
    const transitions = [];
    if (animation.dropShadow && state.currentDropShadow) {
        transitions.push(`box-shadow ${animation.dropShadow.duration || '0.3s'} ${animation.dropShadow.timing || 'ease'}`);
        styles.boxShadow = createBoxShadowString(state.currentDropShadow);
    }
    if (animation.innerShadow && state.currentInnerShadow) {
        const insetShadow = createInsetShadowString(state.currentInnerShadow);
        if (styles.boxShadow) {
            styles.boxShadow += `, ${insetShadow}`;
        }
        else {
            styles.boxShadow = insetShadow;
        }
    }
    if (animation.layerBlur && state.currentLayerBlur) {
        transitions.push(`filter ${animation.layerBlur.duration || '0.3s'} ${animation.layerBlur.timing || 'ease'}`);
        styles.filter = `blur(${state.currentLayerBlur.radius}px)`;
    }
    if (transitions.length > 0) {
        styles.transition = transitions.join(', ');
    }
    return styles;
};
export const resolveEffectsAnimation = (animation, trigger) => {
    var _a, _b, _c;
    return {
        isAnimating: true,
        currentDropShadow: (_a = animation.dropShadow) === null || _a === void 0 ? void 0 : _a.to,
        currentInnerShadow: (_b = animation.innerShadow) === null || _b === void 0 ? void 0 : _b.to,
        currentLayerBlur: (_c = animation.layerBlur) === null || _c === void 0 ? void 0 : _c.to,
    };
};
// Effects Animation Presets
export const EFFECTS_ANIMATION_PRESETS = {
    // Shadow presets
    hoverShadow: {
        hover: {
            effects: {
                dropShadow: [{
                        x: 0,
                        y: 4,
                        blur: 12,
                        spread: 0,
                        color: 'rgba(0, 0, 0, 0.15)'
                    }]
            }
        }
    },
    largeShadow: {
        hover: {
            effects: {
                dropShadow: [{
                        x: 0,
                        y: 8,
                        blur: 24,
                        spread: 0,
                        color: 'rgba(0, 0, 0, 0.2)'
                    }]
            }
        }
    },
    coloredShadow: {
        hover: {
            effects: {
                dropShadow: [{
                        x: 0,
                        y: 6,
                        blur: 16,
                        spread: 0,
                        color: 'rgba(59, 130, 246, 0.3)'
                    }]
            }
        }
    },
    // Blur presets
    blurOnHover: {
        hover: {
            effects: {
                layerBlur: { radius: 4 }
            }
        }
    },
    heavyBlur: {
        hover: {
            effects: {
                layerBlur: { radius: 8 }
            }
        }
    },
    // Combined effects
    glowEffect: {
        hover: {
            effects: {
                dropShadow: [
                    {
                        x: 0,
                        y: 0,
                        blur: 20,
                        spread: 4,
                        color: 'rgba(59, 130, 246, 0.4)'
                    }
                ]
            }
        }
    }
};
