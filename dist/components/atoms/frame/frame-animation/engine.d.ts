import { FrameAnimateProps, AnimationTrigger, IFrameAnimationEngine } from './types';
/**
 * Core animation engine for Frame components
 * Handles timeline parsing, property interpolation, and trigger management
 */
export declare class FrameAnimationEngine implements IFrameAnimationEngine {
    readonly frameId: string;
    private animations;
    private activeTransitions;
    private eventBus;
    constructor(frameId: string);
    /**
     * Register animation configuration for this frame
     */
    setAnimations(animateProps: FrameAnimateProps): void;
    /**
     * Execute an animation for a specific trigger
     */
    animate(trigger: AnimationTrigger, element: HTMLElement): Promise<void>;
    /**
     * Execute a timeline configuration
     */
    private executeTimeline;
    /**
     * Parse time string like '@0.5s' to milliseconds
     */
    private parseTimeString;
    /**
     * Clean up animations and event listeners
     */
    cleanup(): void;
    /**
     * Legacy method - use cleanup() instead
     * @deprecated
     */
    destroy(): void;
}
