// Trigger types and logic for frame animation

export type AnimationTrigger =
  | 'onClick'
  | 'onHover'
  | 'onDrag'
  | 'whilePressing'
  | 'key'
  | 'mouseEnter'
  | 'mouseLeave'
  | 'mouseDown'
  | 'mouseUp'
  | 'afterDelay';

// Animation state types (moved from types.ts)
export type AnimationStateType = 
  | 'hover' 
  | 'click' 
  | 'toggle' 
  | 'focus' 
  | 'active' 
  | 'disabled'
  | 'mouseEnter'
  | 'mouseExit'
  | 'mouseLeave'
  | 'mouseDown'
  | 'mouseUp'
  | 'keyDown'
  | 'keyUp'
  | 'keyPress'
  | 'scroll'
  | 'resize'
  | 'load'
  | 'unload'
  | 'beforeUnload'
  | 'doubleClick'
  | 'contextMenu'
  | 'wheel'
  | 'touchStart'
  | 'touchEnd'
  | 'touchMove';

// Animation interaction type (moved from types.ts)
export interface AnimationInteraction {
  trigger: string;
  action: string;
  destination?: string;
  animation?: string;
  direction?: string;
  curve?: string;
  duration?: number;
}

// ActionProps for actions
export interface ActionProps {
  action: string;
  destination?: string;
  animation?: string;
  direction?: string;
  curve?: string;
  duration?: number;
}

// TriggerProps for triggers
export interface TriggerProps {
  trigger: AnimationTrigger | AnimationStateType;
  condition?: (element: HTMLElement) => boolean;
  once?: boolean;
  priority?: number;
}

// Example: logic to handle triggers (stub)
export function handleTrigger(trigger: AnimationTrigger, event: any): boolean {
  // Implement trigger logic here
  return true;
}
