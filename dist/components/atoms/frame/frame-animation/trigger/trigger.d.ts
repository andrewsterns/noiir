export type AnimationTrigger = 'onClick' | 'onHover' | 'onDrag' | 'whilePressing' | 'key' | 'mouseEnter' | 'mouseLeave' | 'mouseDown' | 'mouseUp' | 'afterDelay';
export type AnimationStateType = 'hover' | 'click' | 'toggle' | 'focus' | 'active' | 'disabled' | 'mouseEnter' | 'mouseExit' | 'mouseLeave' | 'mouseDown' | 'mouseUp' | 'keyDown' | 'keyUp' | 'keyPress' | 'scroll' | 'resize' | 'load' | 'unload' | 'beforeUnload' | 'doubleClick' | 'contextMenu' | 'wheel' | 'touchStart' | 'touchEnd' | 'touchMove';
export interface AnimationInteraction {
    trigger: string;
    action: string;
    destination?: string;
    animation?: string;
    direction?: string;
    curve?: string;
    duration?: number;
}
export interface ActionProps {
    action: string;
    destination?: string;
    animation?: string;
    direction?: string;
    curve?: string;
    duration?: number;
}
export interface TriggerProps {
    trigger: AnimationTrigger | AnimationStateType;
    condition?: (element: HTMLElement) => boolean;
    once?: boolean;
    priority?: number;
}
export declare function handleTrigger(trigger: AnimationTrigger, event: any): boolean;
