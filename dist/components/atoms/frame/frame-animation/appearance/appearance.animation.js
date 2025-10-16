/**
 * Appearance Animation System
 *
 * Specialized animation system for handling appearance transitions like opacity changes,
 * radius adjustments, blend mode transitions, and visibility states.
 */
// Utility functions for appearance animations
export const createAppearanceAnimationStyles = (animation, state) => {
    var _a, _b;
    const styles = {};
    if (animation.opacity) {
        styles.transition = `opacity ${animation.opacity.duration || '0.3s'} ${animation.opacity.timing || 'ease'}`;
        styles.opacity = (_a = state.currentOpacity) !== null && _a !== void 0 ? _a : animation.opacity.to;
    }
    if (animation.radius) {
        const radiusTransition = `border-radius ${animation.radius.duration || '0.3s'} ${animation.radius.timing || 'ease'}`;
        styles.transition = styles.transition
            ? `${styles.transition}, ${radiusTransition}`
            : radiusTransition;
        if (typeof state.currentRadius === 'number') {
            styles.borderRadius = `${state.currentRadius}px`;
        }
        else if (typeof state.currentRadius === 'object') {
            const { topLeft, topRight, bottomLeft, bottomRight } = state.currentRadius;
            styles.borderRadius = `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
        }
    }
    if (animation.visible) {
        const visibleTransition = `opacity ${animation.visible.duration || '0.3s'} ${animation.visible.timing || 'ease'}`;
        styles.transition = styles.transition
            ? `${styles.transition}, ${visibleTransition}`
            : visibleTransition;
        styles.opacity = state.currentVisible ? 1 : 0;
    }
    if (animation.blendMode) {
        const blendTransition = `mix-blend-mode ${animation.blendMode.duration || '0.3s'} ${animation.blendMode.timing || 'ease'}`;
        styles.transition = styles.transition
            ? `${styles.transition}, ${blendTransition}`
            : blendTransition;
        styles.mixBlendMode = (_b = state.currentBlendMode) !== null && _b !== void 0 ? _b : animation.blendMode.to;
    }
    return styles;
};
export const resolveAppearanceAnimation = (animation, trigger) => {
    var _a, _b, _c, _d;
    return {
        isAnimating: true,
        currentOpacity: (_a = animation.opacity) === null || _a === void 0 ? void 0 : _a.to,
        currentRadius: (_b = animation.radius) === null || _b === void 0 ? void 0 : _b.to,
        currentVisible: (_c = animation.visible) === null || _c === void 0 ? void 0 : _c.to,
        currentBlendMode: (_d = animation.blendMode) === null || _d === void 0 ? void 0 : _d.to,
    };
};
// Appearance Animation Presets
export const APPEARANCE_ANIMATION_PRESETS = {
    // Fade animations
    fadeIn: {
        hover: { appearance: { opacity: 1 } }
    },
    fadeOut: {
        hover: { appearance: { opacity: 0.7 } }
    },
    // Radius animations  
    roundCorners: {
        hover: { appearance: { radius: 16 } }
    },
    sharpCorners: {
        hover: { appearance: { radius: 0 } }
    },
    // Visibility toggles
    hideOnHover: {
        hover: { appearance: { visible: false } }
    },
    showOnHover: {
        hover: { appearance: { visible: true } }
    },
    // Blend mode effects
    multiplyBlend: {
        hover: { appearance: { blendMode: 'multiply' } }
    },
    screenBlend: {
        hover: { appearance: { blendMode: 'screen' } }
    }
};
