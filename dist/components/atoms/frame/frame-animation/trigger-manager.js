/**
 * Global event bus for cross-frame communication
 */
class GlobalAnimationEventBus {
    constructor() {
        this.eventTarget = new EventTarget();
        this.frameEngines = new Map();
    }
    /**
     * Register a frame animation engine
     */
    registerFrame(frameId, engine) {
        this.frameEngines.set(frameId, engine);
    }
    /**
     * Unregister a frame animation engine
     */
    unregisterFrame(frameId) {
        this.frameEngines.delete(frameId);
    }
    /**
     * Emit a cross-frame event
     */
    emit(frameId, eventName, data) {
        const eventKey = `${frameId}:${eventName}`;
        const event = new CustomEvent(eventKey, { detail: data });
        this.eventTarget.dispatchEvent(event);
    }
    /**
     * Listen for cross-frame events
     */
    listen(eventKey, callback) {
        const handler = (event) => {
            const customEvent = event;
            callback(customEvent.detail);
        };
        this.eventTarget.addEventListener(eventKey, handler);
        // Return cleanup function
        return () => {
            this.eventTarget.removeEventListener(eventKey, handler);
        };
    }
    /**
     * Emit global events (window resize, theme change, etc.)
     */
    emitGlobal(eventName, data) {
        this.emit('global', eventName, data);
    }
}
// Global singleton instance
export const globalEventBus = new GlobalAnimationEventBus();
/**
 * Trigger manager for handling Frame animation triggers
 */
export class FrameTriggerManager {
    constructor(element, frameId, engine) {
        this.eventListeners = [];
        this.element = element;
        this.frameId = frameId;
        this.engine = engine;
        // Register with global event bus
        globalEventBus.registerFrame(frameId, engine);
    }
    /**
     * Set up triggers for the given animate props
     */
    setupTriggers(animateProps) {
        // Clean up existing listeners
        this.cleanup();
        Object.keys(animateProps).forEach(trigger => {
            if (this.isSelfTrigger(trigger)) {
                this.setupSelfTrigger(trigger);
            }
            else if (this.isCrossFrameTrigger(trigger)) {
                this.setupCrossFrameTrigger(trigger);
            }
        });
    }
    /**
     * Check if trigger is a self-trigger (hover, click, etc.)
     */
    isSelfTrigger(trigger) {
        const selfTriggers = [
            'hover', 'click', 'doubleClick', 'mouseEnter', 'mouseLeave',
            'focus', 'blur', 'mount', 'unmount', 'visible', 'hidden',
            'keyDown:Enter', 'keyDown:Space', 'keyDown:Escape'
        ];
        return selfTriggers.includes(trigger);
    }
    /**
     * Check if trigger is a cross-frame trigger (frameId:eventName)
     */
    isCrossFrameTrigger(trigger) {
        return trigger.includes(':') && !trigger.startsWith('keyDown:');
    }
    /**
     * Set up self-trigger event listener
     */
    setupSelfTrigger(trigger) {
        let eventName;
        let element = this.element;
        switch (trigger) {
            case 'hover':
            case 'mouseEnter':
                eventName = 'mouseenter';
                break;
            case 'mouseLeave':
                eventName = 'mouseleave';
                break;
            case 'click':
                eventName = 'click';
                break;
            case 'doubleClick':
                eventName = 'dblclick';
                break;
            case 'focus':
                eventName = 'focus';
                this.element.tabIndex = this.element.tabIndex >= 0 ? this.element.tabIndex : 0;
                break;
            case 'blur':
                eventName = 'blur';
                break;
            case 'mount':
                // Trigger immediately on setup
                setTimeout(() => this.engine.animate(trigger, this.element), 0);
                return;
            case 'visible':
                this.setupIntersectionObserver(trigger);
                return;
            case 'keyDown:Enter':
            case 'keyDown:Space':
            case 'keyDown:Escape':
                this.setupKeyboardTrigger(trigger);
                return;
            default:
                return;
        }
        const handler = (event) => {
            this.engine.animate(trigger, this.element);
            // Emit cross-frame event for other frames to listen to
            if (this.frameId) {
                globalEventBus.emit(this.frameId, trigger.replace('mouseEnter', 'hover'));
            }
        };
        element.addEventListener(eventName, handler);
        this.eventListeners.push(() => element.removeEventListener(eventName, handler));
    }
    /**
     * Set up cross-frame trigger listener
     */
    setupCrossFrameTrigger(trigger) {
        const cleanup = globalEventBus.listen(trigger, () => {
            this.engine.animate(trigger, this.element);
        });
        this.eventListeners.push(cleanup);
    }
    /**
     * Set up keyboard trigger
     */
    setupKeyboardTrigger(trigger) {
        const keyMap = {
            'keyDown:Enter': 'Enter',
            'keyDown:Space': ' ',
            'keyDown:Escape': 'Escape'
        };
        const targetKey = keyMap[trigger];
        if (!targetKey)
            return;
        const handler = (event) => {
            if (event.key === targetKey) {
                this.engine.animate(trigger, this.element);
            }
        };
        // Make element focusable for keyboard events
        if (this.element.tabIndex < 0) {
            this.element.tabIndex = 0;
        }
        this.element.addEventListener('keydown', handler);
        this.eventListeners.push(() => this.element.removeEventListener('keydown', handler));
    }
    /**
     * Set up intersection observer for visibility triggers
     */
    setupIntersectionObserver(trigger) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (trigger === 'visible' && entry.isIntersecting) {
                    this.engine.animate(trigger, this.element);
                }
                else if (trigger === 'hidden' && !entry.isIntersecting) {
                    this.engine.animate(trigger, this.element);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(this.element);
        this.eventListeners.push(() => observer.disconnect());
    }
    /**
     * Clean up all event listeners
     */
    cleanup() {
        this.eventListeners.forEach(cleanup => cleanup());
        this.eventListeners = [];
    }
    /**
     * Destroy the trigger manager
     */
    destroy() {
        this.cleanup();
        globalEventBus.unregisterFrame(this.frameId);
    }
}
/**
 * Set up global event listeners for window events
 */
export function setupGlobalTriggers() {
    // Window resize
    const handleResize = () => globalEventBus.emitGlobal('resize');
    window.addEventListener('resize', handleResize);
    // Window scroll
    const handleScroll = () => globalEventBus.emitGlobal('scroll');
    window.addEventListener('scroll', handleScroll);
    // Theme changes (custom event)
    const handleThemeChange = (event) => {
        const customEvent = event;
        globalEventBus.emitGlobal('theme-change', customEvent.detail);
    };
    window.addEventListener('theme-change', handleThemeChange);
    // Route changes (for SPAs)
    const handleRouteChange = () => globalEventBus.emitGlobal('route-change', window.location.pathname);
    window.addEventListener('popstate', handleRouteChange);
    // Return cleanup function
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('theme-change', handleThemeChange);
        window.removeEventListener('popstate', handleRouteChange);
    };
}
