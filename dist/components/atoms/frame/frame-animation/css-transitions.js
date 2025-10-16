import { FramePropertyParser } from './property-parser';
/**
 * Convert easing function to CSS easing string
 */
function easingToCSSEasing(easing) {
    const cssEasings = {
        linear: 'linear',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
        easeInCubic: 'cubic-bezier(0.32, 0, 0.67, 0)',
        easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
        easeInOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
        bounce: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
    };
    return cssEasings[easing] || 'ease-out';
}
/**
 * CSS Transitions integration for Frame animations
 * Provides optimized CSS-based animations when possible
 */
export class FrameCSSTransitions {
    /**
     * Determine if animation can use CSS transitions instead of keyframes
     */
    static canUseTransitions(timeline) {
        const timeKeys = Object.keys(timeline).filter(key => key.startsWith('@'));
        // Only simple two-keyframe animations can use transitions
        if (timeKeys.length !== 2)
            return false;
        // Check if start time is @0s and has only one other keyframe
        const startKey = timeKeys.find(key => key === '@0s' || key === '@0');
        if (!startKey)
            return false;
        return true;
    }
    /**
     * Create CSS transition string for Frame animation
     */
    static createTransition(timeline, duration, easing = 'easeOut', delay = 0) {
        const timeKeys = Object.keys(timeline).filter(key => key.startsWith('@'));
        const sortedKeys = timeKeys.sort((a, b) => this.parseTimeString(a) - this.parseTimeString(b));
        const startFrame = timeline[sortedKeys[0]] || {};
        const endFrame = timeline[sortedKeys[sortedKeys.length - 1]] || {};
        // Parse properties to CSS
        const initialStyles = FramePropertyParser.parse(startFrame);
        const finalStyles = FramePropertyParser.parse(endFrame);
        // Get all properties that will animate
        const animatingProperties = new Set([
            ...Object.keys(initialStyles),
            ...Object.keys(finalStyles)
        ]);
        // Filter to only CSS-transitionable properties
        const transitionableProps = Array.from(animatingProperties).filter(prop => this.TRANSITION_PROPERTIES.some(tp => prop.includes(tp)));
        return {
            transitionProperty: transitionableProps.join(', ') || 'all',
            transitionDuration: `${duration}ms`,
            transitionTimingFunction: easingToCSSEasing(easing),
            transitionDelay: `${delay}ms`,
            initialStyles,
            finalStyles
        };
    }
    /**
     * Apply CSS transition to element
     */
    static applyTransition(element, timeline, duration, easing = 'easeOut', delay = 0) {
        return new Promise((resolve) => {
            const transition = this.createTransition(timeline, duration, easing, delay);
            // Apply initial styles
            Object.assign(element.style, transition.initialStyles);
            // Setup transition
            element.style.transitionProperty = transition.transitionProperty;
            element.style.transitionDuration = transition.transitionDuration;
            element.style.transitionTimingFunction = transition.transitionTimingFunction;
            element.style.transitionDelay = transition.transitionDelay;
            // Listen for transition end
            const handleTransitionEnd = () => {
                element.removeEventListener('transitionend', handleTransitionEnd);
                resolve();
            };
            element.addEventListener('transitionend', handleTransitionEnd);
            // Trigger transition by applying final styles
            requestAnimationFrame(() => {
                Object.assign(element.style, transition.finalStyles);
            });
            // Fallback timeout
            setTimeout(() => {
                element.removeEventListener('transitionend', handleTransitionEnd);
                resolve();
            }, duration + delay + 100);
        });
    }
    /**
     * Create optimized transform transitions
     */
    static createTransformTransition(transforms, duration, easing = 'easeOut') {
        const from = transforms.from || {};
        const to = transforms.to || {};
        const initialTransform = this.buildTransformString({
            x: from.x || 0,
            y: from.y || 0,
            scale: from.scale || 1,
            rotate: from.rotate || 0
        });
        const finalTransform = this.buildTransformString({
            x: to.x || 0,
            y: to.y || 0,
            scale: to.scale || 1,
            rotate: to.rotate || 0
        });
        const cssEasing = easingToCSSEasing(easing);
        return {
            initialTransform,
            finalTransform,
            transition: `transform ${duration}ms ${cssEasing}`
        };
    }
    /**
     * Create smooth opacity transitions
     */
    static createOpacityTransition(from, to, duration, easing = 'easeOut') {
        const cssEasing = easingToCSSEasing(easing);
        return {
            initialOpacity: from.toString(),
            finalOpacity: to.toString(),
            transition: `opacity ${duration}ms ${cssEasing}`
        };
    }
    /**
     * Create color transitions for fills and strokes
     */
    static createColorTransition(property, from, to, duration, easing = 'easeOut') {
        const cssEasing = easingToCSSEasing(easing);
        return {
            initialColor: from,
            finalColor: to,
            transition: `${property} ${duration}ms ${cssEasing}`
        };
    }
    /**
     * Create size transitions with aspect ratio preservation
     */
    static createSizeTransition(from, to, duration, easing = 'easeOut', preserveAspectRatio = false) {
        const cssEasing = easingToCSSEasing(easing);
        let initialStyles = {};
        let finalStyles = {};
        if (preserveAspectRatio && from.width && from.height && to.width && to.height) {
            // Calculate aspect ratios and use transform scale instead
            const fromAspect = from.width / from.height;
            const toAspect = to.width / to.height;
            const scaleX = to.width / from.width;
            const scaleY = to.height / from.height;
            initialStyles = {
                width: `${from.width}px`,
                height: `${from.height}px`,
                transform: 'scale(1, 1)'
            };
            finalStyles = {
                width: `${from.width}px`,
                height: `${from.height}px`,
                transform: `scale(${scaleX}, ${scaleY})`
            };
        }
        else {
            // Regular size transition
            if (from.width !== undefined)
                initialStyles.width = `${from.width}px`;
            if (from.height !== undefined)
                initialStyles.height = `${from.height}px`;
            if (to.width !== undefined)
                finalStyles.width = `${to.width}px`;
            if (to.height !== undefined)
                finalStyles.height = `${to.height}px`;
        }
        const properties = Object.keys({ ...initialStyles, ...finalStyles });
        return {
            initialStyles,
            finalStyles,
            transition: `${properties.join(', ')} ${duration}ms ${cssEasing}`
        };
    }
    /**
     * Parse time string to milliseconds
     */
    static parseTimeString(timeStr) {
        const match = timeStr.match(/@([\d.]+)(s|ms)?/);
        if (!match)
            return 0;
        const value = parseFloat(match[1]);
        const unit = match[2] || 's';
        return unit === 's' ? value * 1000 : value;
    }
    /**
     * Build CSS transform string from transform object
     */
    static buildTransformString(transform) {
        const transforms = [];
        if (transform.x !== undefined || transform.y !== undefined) {
            transforms.push(`translate(${transform.x || 0}px, ${transform.y || 0}px)`);
        }
        if (transform.scale !== undefined && transform.scale !== 1) {
            transforms.push(`scale(${transform.scale})`);
        }
        if (transform.rotate !== undefined && transform.rotate !== 0) {
            transforms.push(`rotate(${transform.rotate}deg)`);
        }
        return transforms.join(' ') || 'none';
    }
}
FrameCSSTransitions.TRANSITION_PROPERTIES = [
    'opacity',
    'transform',
    'background-color',
    'border-color',
    'color',
    'width',
    'height',
    'top',
    'left',
    'right',
    'bottom',
    'margin',
    'padding',
    'border-width',
    'box-shadow',
    'filter',
    'backdrop-filter'
];
/**
 * Performance-optimized animation strategies
 */
export class FrameAnimationOptimizer {
    /**
     * Choose optimal animation strategy based on animation complexity
     */
    static chooseStrategy(timeline) {
        // Simple two-keyframe animations can use CSS transitions
        if (FrameCSSTransitions.canUseTransitions(timeline)) {
            return 'css-transition';
        }
        // Complex multi-keyframe animations use CSS keyframes
        const keyframeCount = Object.keys(timeline).filter(k => k.startsWith('@')).length;
        if (keyframeCount <= 10) {
            return 'css-keyframes';
        }
        // Very complex animations fall back to JavaScript
        return 'js-animation';
    }
    /**
     * Optimize animation for 60fps performance
     */
    static optimizeForPerformance(timeline) {
        const suggestions = [];
        const optimizedTimeline = { ...timeline };
        // Check for performance-heavy properties
        Object.entries(timeline).forEach(([timeKey, keyframe]) => {
            const parsed = FramePropertyParser.parse(keyframe);
            // Suggest transform instead of position changes
            if (parsed.left || parsed.top || parsed.right || parsed.bottom) {
                suggestions.push('Consider using transform: translate() instead of position properties for better performance');
            }
            // Suggest will-change for heavy animations
            if (parsed.filter || parsed.backdropFilter) {
                suggestions.push('Add will-change: filter for filter animations');
            }
            // Suggest composite layers for complex animations
            if (parsed.boxShadow || parsed.borderRadius) {
                suggestions.push('Consider adding will-change: transform to create composite layer');
            }
        });
        return { optimizedTimeline, suggestions };
    }
    /**
     * Batch DOM updates to prevent layout thrashing
     */
    static batchDOMUpdates(updates) {
        requestAnimationFrame(() => {
            updates.forEach(update => update());
        });
    }
    /**
     * Detect and warn about expensive style changes
     */
    static analyzePerformanceImpact(timeline) {
        let score = 100;
        const warnings = [];
        const recommendations = [];
        const expensiveProperties = ['width', 'height', 'left', 'top', 'border-width'];
        const moderateProperties = ['box-shadow', 'border-radius', 'background-color'];
        const cheapProperties = ['transform', 'opacity'];
        Object.values(timeline).forEach(keyframe => {
            const parsed = FramePropertyParser.parse(keyframe);
            Object.keys(parsed).forEach(prop => {
                if (expensiveProperties.some(ep => prop.includes(ep))) {
                    score -= 20;
                    warnings.push(`Property '${prop}' may cause layout recalculation`);
                    recommendations.push(`Consider using transform instead of '${prop}'`);
                }
                else if (moderateProperties.some(mp => prop.includes(mp))) {
                    score -= 10;
                }
            });
        });
        return {
            score: Math.max(0, score),
            warnings,
            recommendations
        };
    }
}
