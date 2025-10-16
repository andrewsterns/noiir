import { TimelineKeyframe } from './animate';
/**
 * Easing functions for smooth animations
 */
export declare const easingFunctions: {
    linear: (t: number) => number;
    easeIn: (t: number) => number;
    easeOut: (t: number) => number;
    easeInOut: (t: number) => number;
    easeInCubic: (t: number) => number;
    easeOutCubic: (t: number) => number;
    easeInOutCubic: (t: number) => number;
    bounce: (t: number) => number;
};
export type EasingFunction = keyof typeof easingFunctions;
/**
 * Keyframe interpolator for smooth Frame property animations
 */
export declare class FrameKeyframeInterpolator {
    /**
     * Create CSS keyframes animation for a timeline
     */
    static createCSSAnimation(timeline: {
        [key: string]: TimelineKeyframe;
    }, duration: number, easing?: EasingFunction): {
        keyframes: Keyframe[];
        options: KeyframeAnimationOptions;
    };
    /**
     * Interpolate between two property values
     */
    static interpolateValue(startValue: any, endValue: any, progress: number, easing?: EasingFunction): any;
    /**
     * Create smooth interpolated frames between keyframes
     */
    static createInterpolatedFrames(startFrame: TimelineKeyframe, endFrame: TimelineKeyframe, steps: number, easing?: EasingFunction): TimelineKeyframe[];
    /**
     * Parse timeline object to sorted keyframes with offsets
     */
    private static parseTimelineToKeyframes;
    /**
     * Parse time string to milliseconds
     */
    private static parseTimeString;
    /**
     * Convert easing function to CSS easing string
     */
    private static easingToCSSEasing;
    /**
     * Recursively interpolate properties between two frames
     */
    private static interpolateProperties;
}
/**
 * Advanced animation utilities
 */
export declare class FrameAnimationUtils {
    /**
     * Create staggered animation delays for multiple elements
     */
    static createStaggeredDelays(count: number, baseDelay?: number): number[];
    /**
     * Create spring-based animation timing
     */
    static createSpringTiming(tension?: number, friction?: number, mass?: number): {
        duration: number;
        easing: string;
    };
    /**
     * Create physics-based animation with momentum
     */
    static createMomentumAnimation(velocity: number, deceleration?: number): {
        duration: number;
        easing: EasingFunction;
    };
    /**
     * Create morphing animation between different shapes
     */
    static createMorphAnimation(startPath: string, endPath: string, steps?: number): string[];
}
