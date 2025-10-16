import { FrameAnimationEngine } from './engine';
/**
 * Global event bus for cross-frame communication
 */
declare class GlobalAnimationEventBus {
    private eventTarget;
    private frameEngines;
    /**
     * Register a frame animation engine
     */
    registerFrame(frameId: string, engine: FrameAnimationEngine): void;
    /**
     * Unregister a frame animation engine
     */
    unregisterFrame(frameId: string): void;
    /**
     * Emit a cross-frame event
     */
    emit(frameId: string, eventName: string, data?: any): void;
    /**
     * Listen for cross-frame events
     */
    listen(eventKey: string, callback: (data?: any) => void): () => void;
    /**
     * Emit global events (window resize, theme change, etc.)
     */
    emitGlobal(eventName: string, data?: any): void;
}
export declare const globalEventBus: GlobalAnimationEventBus;
/**
 * Trigger manager for handling Frame animation triggers
 */
export declare class FrameTriggerManager {
    private element;
    private frameId;
    private engine;
    private eventListeners;
    constructor(element: HTMLElement, frameId: string, engine: FrameAnimationEngine);
    /**
     * Set up triggers for the given animate props
     */
    setupTriggers(animateProps: any): void;
    /**
     * Check if trigger is a self-trigger (hover, click, etc.)
     */
    private isSelfTrigger;
    /**
     * Check if trigger is a cross-frame trigger (frameId:eventName)
     */
    private isCrossFrameTrigger;
    /**
     * Set up self-trigger event listener
     */
    private setupSelfTrigger;
    /**
     * Set up cross-frame trigger listener
     */
    private setupCrossFrameTrigger;
    /**
     * Set up keyboard trigger
     */
    private setupKeyboardTrigger;
    /**
     * Set up intersection observer for visibility triggers
     */
    private setupIntersectionObserver;
    /**
     * Clean up all event listeners
     */
    cleanup(): void;
    /**
     * Destroy the trigger manager
     */
    destroy(): void;
}
/**
 * Set up global event listeners for window events
 */
export declare function setupGlobalTriggers(): () => void;
export {};
