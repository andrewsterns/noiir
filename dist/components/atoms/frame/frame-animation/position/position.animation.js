/**
 * Position Animation System
 *
 * Specialized animation system for handling position transitions like coordinate changes,
 * rotation adjustments, and constraint-based positioning.
 */
// Utility functions for position animations
export const createPositionAnimationStyles = (animation, state) => {
    const styles = {};
    const transitions = [];
    if (animation.coordinates) {
        transitions.push(`transform ${animation.coordinates.duration || '0.3s'} ${animation.coordinates.timing || 'ease'}`);
        let transform = '';
        if (state.currentX !== undefined || state.currentY !== undefined) {
            const x = state.currentX || 0;
            const y = state.currentY || 0;
            transform += `translate(${x}px, ${y}px)`;
        }
        if (state.currentRotation !== undefined) {
            const rotateTransform = `rotate(${state.currentRotation}deg)`;
            transform += transform ? ` ${rotateTransform}` : rotateTransform;
        }
        if (transform) {
            styles.transform = transform;
        }
    }
    if (animation.rotation && !animation.coordinates) {
        transitions.push(`transform ${animation.rotation.duration || '0.3s'} ${animation.rotation.timing || 'ease'}`);
        if (state.currentRotation !== undefined) {
            styles.transform = `rotate(${state.currentRotation}deg)`;
        }
    }
    if (animation.transformOrigin) {
        transitions.push(`transform-origin ${animation.transformOrigin.duration || '0.3s'} ${animation.transformOrigin.timing || 'ease'}`);
        if (state.currentTransformOrigin) {
            styles.transformOrigin = state.currentTransformOrigin;
        }
    }
    if (transitions.length > 0) {
        styles.transition = transitions.join(', ');
    }
    return styles;
};
export const resolvePositionAnimation = (animation, trigger) => {
    var _a, _b, _c, _d;
    return {
        isAnimating: true,
        currentX: (_a = animation.coordinates) === null || _a === void 0 ? void 0 : _a.to.x,
        currentY: (_b = animation.coordinates) === null || _b === void 0 ? void 0 : _b.to.y,
        currentRotation: (_c = animation.rotation) === null || _c === void 0 ? void 0 : _c.to,
        currentTransformOrigin: (_d = animation.transformOrigin) === null || _d === void 0 ? void 0 : _d.to,
    };
};
// Position Animation Presets  
export const POSITION_ANIMATION_PRESETS = {
    // Movement presets
    slideRight: {
        hover: { position: { x: 10, y: 0 } }
    },
    slideLeft: {
        hover: { position: { x: -10, y: 0 } }
    },
    slideUp: {
        hover: { position: { x: 0, y: -10 } }
    },
    slideDown: {
        hover: { position: { x: 0, y: 10 } }
    },
    // Rotation presets
    rotateClockwise: {
        hover: { position: { rotation: 15 } }
    },
    rotateCounterClockwise: {
        hover: { position: { rotation: -15 } }
    },
    spin: {
        hover: { position: { rotation: 180 } }
    },
    // Combined movement and rotation
    slideAndRotate: {
        hover: {
            position: {
                x: 15,
                y: -10,
                rotation: 10
            }
        }
    }
};
