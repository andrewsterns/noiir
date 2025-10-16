import { TimelineKeyframe } from './animate';
import { EasingFunction } from './keyframe-interpolator';
/**
 * CSS Transitions integration for Frame animations
 * Provides optimized CSS-based animations when possible
 */
export declare class FrameCSSTransitions {
    private static readonly TRANSITION_PROPERTIES;
    /**
     * Determine if animation can use CSS transitions instead of keyframes
     */
    static canUseTransitions(timeline: {
        [key: string]: TimelineKeyframe;
    }): boolean;
    /**
     * Create CSS transition string for Frame animation
     */
    static createTransition(timeline: {
        [key: string]: TimelineKeyframe;
    }, duration: number, easing?: EasingFunction, delay?: number): {
        transitionProperty: string;
        transitionDuration: string;
        transitionTimingFunction: string;
        transitionDelay: string;
        initialStyles: {
            [key: string]: any;
        };
        finalStyles: {
            [key: string]: any;
        };
    };
    /**
     * Apply CSS transition to element
     */
    static applyTransition(element: HTMLElement, timeline: {
        [key: string]: TimelineKeyframe;
    }, duration: number, easing?: EasingFunction, delay?: number): Promise<void>;
    /**
     * Create optimized transform transitions
     */
    static createTransformTransition(transforms: {
        from?: {
            x?: number;
            y?: number;
            scale?: number;
            rotate?: number;
        };
        to?: {
            x?: number;
            y?: number;
            scale?: number;
            rotate?: number;
        };
    }, duration: number, easing?: EasingFunction): {
        initialTransform: string;
        finalTransform: string;
        transition: string;
    };
    /**
     * Create smooth opacity transitions
     */
    static createOpacityTransition(from: number, to: number, duration: number, easing?: EasingFunction): {
        initialOpacity: string;
        finalOpacity: string;
        transition: string;
    };
    /**
     * Create color transitions for fills and strokes
     */
    static createColorTransition(property: 'background-color' | 'border-color' | 'color', from: string, to: string, duration: number, easing?: EasingFunction): {
        initialColor: string;
        finalColor: string;
        transition: string;
    };
    /**
     * Create size transitions with aspect ratio preservation
     */
    static createSizeTransition(from: {
        width?: number;
        height?: number;
    }, to: {
        width?: number;
        height?: number;
    }, duration: number, easing?: EasingFunction, preserveAspectRatio?: boolean): {
        initialStyles: {
            [key: string]: string;
        };
        finalStyles: {
            [key: string]: string;
        };
        transition: string;
    };
    /**
     * Parse time string to milliseconds
     */
    private static parseTimeString;
    /**
     * Build CSS transform string from transform object
     */
    private static buildTransformString;
}
/**
 * Performance-optimized animation strategies
 */
export declare class FrameAnimationOptimizer {
    /**
     * Choose optimal animation strategy based on animation complexity
     */
    static chooseStrategy(timeline: {
        [key: string]: TimelineKeyframe;
    }): 'css-transition' | 'css-keyframes' | 'js-animation';
    /**
     * Optimize animation for 60fps performance
     */
    static optimizeForPerformance(timeline: {
        [key: string]: TimelineKeyframe;
    }): {
        optimizedTimeline: {
            [key: string]: TimelineKeyframe;
        };
        suggestions: string[];
    };
    /**
     * Batch DOM updates to prevent layout thrashing
     */
    static batchDOMUpdates(updates: (() => void)[]): void;
    /**
     * Detect and warn about expensive style changes
     */
    static analyzePerformanceImpact(timeline: {
        [key: string]: TimelineKeyframe;
    }): {
        score: number;
        warnings: string[];
        recommendations: string[];
    };
}
