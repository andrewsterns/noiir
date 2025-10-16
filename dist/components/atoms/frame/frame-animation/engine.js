import { FramePropertyParser } from './property-parser';
/**
 * Core animation engine for Frame components
 * Handles timeline parsing, property interpolation, and trigger management
 */
export class FrameAnimationEngine {
    constructor(frameId) {
        this.frameId = frameId;
        this.animations = new Map();
        this.activeTransitions = new Map();
        this.eventBus = new EventTarget();
    }
    /**
     * Register animation configuration for this frame
     */
    setAnimations(animateProps) {
        this.animations.clear();
        Object.entries(animateProps).forEach(([trigger, config]) => {
            if (config) {
                this.animations.set(trigger, config);
            }
        });
    }
    /**
     * Execute an animation for a specific trigger
     */
    async animate(trigger, element) {
        const config = this.animations.get(trigger);
        if (!config)
            return;
        // Check conditions
        if (config.condition && !config.condition(element, {})) {
            return;
        }
        // Apply debouncing
        if (config.debounce) {
            // TODO: Implement debouncing logic
        }
        // Apply delay
        if (config.delay) {
            await new Promise(resolve => setTimeout(resolve, config.delay));
        }
        // Debug logging
        if (config.debug) {
            console.log(`[Frame Animation] Triggering '${trigger}' on frame '${this.frameId}'`, config);
        }
        // Parse timeline and execute animation
        await this.executeTimeline(config, element);
    }
    /**
     * Execute a timeline configuration
     */
    async executeTimeline(config, element) {
        // Extract timeline keyframes (keys starting with '@')
        const timelineKeys = Object.keys(config).filter(key => key.startsWith('@'));
        if (timelineKeys.length === 0)
            return;
        // Sort keyframes by time
        const sortedKeyframes = timelineKeys
            .map(key => ({
            time: this.parseTimeString(key),
            properties: config[key]
        }))
            .sort((a, b) => a.time - b.time);
        // Find the total duration
        const totalDuration = Math.max(...sortedKeyframes.map(kf => kf.time));
        // Apply each keyframe with CSS transitions
        for (let i = 0; i < sortedKeyframes.length; i++) {
            const keyframe = sortedKeyframes[i];
            const nextKeyframe = sortedKeyframes[i + 1];
            // Convert Frame properties to CSS styles
            const cssStyles = FramePropertyParser.parse(keyframe.properties);
            // Calculate transition duration to next keyframe
            const transitionDuration = nextKeyframe
                ? (nextKeyframe.time - keyframe.time)
                : 0;
            // Apply styles with transition
            if (transitionDuration > 0) {
                element.style.transition = `all ${transitionDuration}ms ease-out`;
            }
            // Apply the CSS styles
            Object.assign(element.style, cssStyles);
            // Wait for this keyframe timing if not the last one
            if (nextKeyframe) {
                await new Promise(resolve => setTimeout(resolve, transitionDuration));
            }
        }
    }
    /**
     * Parse time string like '@0.5s' to milliseconds
     */
    parseTimeString(timeStr) {
        const match = timeStr.match(/@([\d.]+)(s|ms)?/);
        if (!match)
            return 0;
        const value = parseFloat(match[1]);
        const unit = match[2] || 's';
        return unit === 's' ? value * 1000 : value;
    }
    /**
     * Clean up animations and event listeners
     */
    cleanup() {
        this.activeTransitions.forEach(animation => animation.cancel());
        this.activeTransitions.clear();
        this.animations.clear();
    }
    /**
     * Legacy method - use cleanup() instead
     * @deprecated
     */
    destroy() {
        this.cleanup();
    }
}
