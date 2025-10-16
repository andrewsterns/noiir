import { FramePropertyParser } from './property-parser';
/**
 * Easing functions for smooth animations
 */
export const easingFunctions = {
    linear: (t) => t,
    easeIn: (t) => t * t,
    easeOut: (t) => 1 - (1 - t) * (1 - t),
    easeInOut: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    bounce: (t) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1)
            return n1 * t * t;
        if (t < 2 / d1)
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        if (t < 2.5 / d1)
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
};
/**
 * Keyframe interpolator for smooth Frame property animations
 */
export class FrameKeyframeInterpolator {
    /**
     * Create CSS keyframes animation for a timeline
     */
    static createCSSAnimation(timeline, duration, easing = 'easeOut') {
        // Parse timeline keyframes
        const keyframes = this.parseTimelineToKeyframes(timeline, duration);
        // Convert to CSS Keyframe objects
        const cssKeyframes = keyframes.map(kf => {
            const parsedProperties = FramePropertyParser.parse(kf.properties);
            return {
                offset: kf.offset,
                ...parsedProperties
            };
        });
        const options = {
            duration: duration,
            easing: this.easingToCSSEasing(easing),
            fill: 'forwards'
        };
        return { keyframes: cssKeyframes, options };
    }
    /**
     * Interpolate between two property values
     */
    static interpolateValue(startValue, endValue, progress, easing = 'linear') {
        const easedProgress = easingFunctions[easing](progress);
        // Handle different value types
        if (typeof startValue === 'number' && typeof endValue === 'number') {
            return startValue + (endValue - startValue) * easedProgress;
        }
        if (typeof startValue === 'string' && typeof endValue === 'string') {
            // Try to interpolate numeric values in strings
            const startNum = parseFloat(startValue);
            const endNum = parseFloat(endValue);
            if (!isNaN(startNum) && !isNaN(endNum)) {
                const interpolated = startNum + (endNum - startNum) * easedProgress;
                return startValue.replace(startNum.toString(), interpolated.toString());
            }
        }
        // For non-interpolatable values, return start or end based on progress
        return easedProgress < 0.5 ? startValue : endValue;
    }
    /**
     * Create smooth interpolated frames between keyframes
     */
    static createInterpolatedFrames(startFrame, endFrame, steps, easing = 'easeOut') {
        const frames = [];
        for (let i = 0; i <= steps; i++) {
            const progress = i / steps;
            const frame = {};
            // Interpolate each property
            this.interpolateProperties(startFrame, endFrame, progress, easing, frame);
            frames.push(frame);
        }
        return frames;
    }
    /**
     * Parse timeline object to sorted keyframes with offsets
     */
    static parseTimelineToKeyframes(timeline, totalDuration) {
        const keyframes = [];
        // Parse time keys and convert to offsets
        Object.entries(timeline).forEach(([timeKey, properties]) => {
            if (timeKey.startsWith('@')) {
                const time = this.parseTimeString(timeKey);
                const offset = time / totalDuration;
                keyframes.push({ time, offset: Math.min(1, Math.max(0, offset)), properties });
            }
        });
        // Sort by offset
        keyframes.sort((a, b) => a.offset - b.offset);
        // Ensure we have keyframes at 0 and 1
        if (keyframes.length === 0) {
            return [];
        }
        if (keyframes[0].offset > 0) {
            // Add implicit start keyframe
            keyframes.unshift({ time: 0, offset: 0, properties: {} });
        }
        if (keyframes[keyframes.length - 1].offset < 1) {
            // Extend last keyframe to end
            keyframes[keyframes.length - 1].offset = 1;
        }
        return keyframes.map(kf => ({ offset: kf.offset, properties: kf.properties }));
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
     * Convert easing function to CSS easing string
     */
    static easingToCSSEasing(easing) {
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
     * Recursively interpolate properties between two frames
     */
    static interpolateProperties(start, end, progress, easing, result) {
        // Get all unique property keys
        const keys = new Set([
            ...Object.keys(start || {}),
            ...Object.keys(end || {})
        ]);
        keys.forEach(key => {
            const startValue = start === null || start === void 0 ? void 0 : start[key];
            const endValue = end === null || end === void 0 ? void 0 : end[key];
            if (startValue !== undefined && endValue !== undefined) {
                if (typeof startValue === 'object' && typeof endValue === 'object' &&
                    !Array.isArray(startValue) && !Array.isArray(endValue)) {
                    // Recursively interpolate nested objects
                    result[key] = {};
                    this.interpolateProperties(startValue, endValue, progress, easing, result[key]);
                }
                else {
                    // Interpolate primitive values
                    result[key] = this.interpolateValue(startValue, endValue, progress, easing);
                }
            }
            else if (startValue !== undefined) {
                result[key] = startValue;
            }
            else if (endValue !== undefined) {
                result[key] = endValue;
            }
        });
    }
}
/**
 * Advanced animation utilities
 */
export class FrameAnimationUtils {
    /**
     * Create staggered animation delays for multiple elements
     */
    static createStaggeredDelays(count, baseDelay = 100) {
        return Array.from({ length: count }, (_, i) => i * baseDelay);
    }
    /**
     * Create spring-based animation timing
     */
    static createSpringTiming(tension = 170, friction = 26, mass = 1) {
        // Simplified spring calculation
        const stiffness = tension;
        const damping = friction;
        const w0 = Math.sqrt(stiffness / mass);
        const zeta = damping / (2 * Math.sqrt(stiffness * mass));
        const duration = zeta < 1
            ? (4 / (w0 * Math.sqrt(1 - zeta * zeta))) * 1000
            : (4 / w0) * 1000;
        // Create cubic-bezier for spring-like motion
        const easing = `cubic-bezier(0.175, 0.885, ${0.32 / zeta}, ${1.275 - 0.175 * zeta})`;
        return {
            duration: Math.max(100, Math.min(3000, duration)),
            easing
        };
    }
    /**
     * Create physics-based animation with momentum
     */
    static createMomentumAnimation(velocity, deceleration = 0.95) {
        const duration = Math.abs(velocity) * 1000 * (1 - deceleration);
        const easing = velocity > 0 ? 'easeOut' : 'easeIn';
        return { duration, easing };
    }
    /**
     * Create morphing animation between different shapes
     */
    static createMorphAnimation(startPath, endPath, steps = 20) {
        // Simplified path morphing - in reality would need proper SVG path interpolation
        const frames = [];
        for (let i = 0; i <= steps; i++) {
            const progress = i / steps;
            frames.push(progress < 0.5 ? startPath : endPath);
        }
        return frames;
    }
}
