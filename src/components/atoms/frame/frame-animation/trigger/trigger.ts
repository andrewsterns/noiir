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

// Event handler type for animations
export type AnimationEventHandler = (event: React.MouseEvent<HTMLDivElement>) => void;

// Event handlers interface
export interface AnimationEventHandlers {
  onClick?: AnimationEventHandler;
  onMouseEnter?: AnimationEventHandler;
  onMouseLeave?: AnimationEventHandler;
  onMouseDown?: AnimationEventHandler;
  onMouseUp?: AnimationEventHandler;
}

// Create event handler for an animation configuration
export function createAnimationEventHandler(
  animation: any, // AnimationConfig
  context: {
    currentVariant: string;
    variants: any;
    currentProps: any;
    customData?: any;
    changeVariant: (variant: string) => void;
    updateAnimationProps: (props: any) => void;
    updateActionData: (data: any) => void;
    handleAction: (action: any, destination: any, context: any) => any;
  }
): AnimationEventHandler {
  const {
    trigger: animTrigger,
    action: animAction,
    destination: animDestination
  } = animation;

  return (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(`[AnimationEvent] Event fired: ${event.type} for trigger: ${animTrigger}`);
    
    // Handle trigger using the trigger system
    const triggerResult = handleTrigger(animTrigger as any, event);
    
    console.log(`[AnimationEvent] Trigger result for ${animTrigger}:`, triggerResult);
    
    // Handle action if trigger succeeded and action is provided
    if (triggerResult && animAction) {
      console.log(`[AnimationEvent] Executing action: ${animAction} with destination:`, animDestination);
      const actionContext = {
        currentVariant: context.currentVariant,
        variants: context.variants,
        currentProps: context.currentProps,
        event,
        customData: context.customData
      };

      const result = context.handleAction(animAction, animDestination, actionContext);

      // Apply the result
      if (result) {
        if (result.variant) {
          console.log(`[AnimationEvent] Changing to variant "${result.variant}"`);
          context.changeVariant(result.variant);
        }
        if (result.props) {
          console.log(`[AnimationEvent] Updating props:`, result.props);
          context.updateAnimationProps(result.props);
        }
        if (result.data !== undefined) {
          console.log(`[AnimationEvent] Updating data:`, result.data);
          context.updateActionData(result.data);
        }
      }
    } else {
      console.log(`[AnimationEvent] No action executed - triggerResult: ${triggerResult}, animAction: ${animAction}`);
    }
  };
}

// Map trigger to event handler property
export function getEventHandlerKey(trigger: AnimationTrigger): keyof AnimationEventHandlers | null {
  switch (trigger) {
    case 'onClick':
      return 'onClick';
    case 'onHover':
    case 'mouseEnter':
      return 'onMouseEnter';
    case 'mouseLeave':
      return 'onMouseLeave';
    case 'mouseDown':
      return 'onMouseDown';
    case 'mouseUp':
      return 'onMouseUp';
    case 'onDrag':
    case 'whilePressing':
    case 'key':
    case 'afterDelay':
    default:
      return null; // Not yet implemented
  }
}

// Create event handlers for an array of animations
export function createAnimationEventHandlers(
  animations: any[], // AnimationConfig[]
  context: Parameters<typeof createAnimationEventHandler>[1]
): AnimationEventHandlers {
  const eventHandlers: AnimationEventHandlers = {};

  animations.forEach((animation) => {
    const eventHandler = createAnimationEventHandler(animation, context);
    const handlerKey = getEventHandlerKey(animation.trigger as AnimationTrigger);
    
    if (handlerKey && eventHandler) {
      eventHandlers[handlerKey] = eventHandler;
    }
  });

  return eventHandlers;
}

// Example: logic to handle triggers (stub)
export function handleTrigger(trigger: AnimationTrigger, event: any): boolean {
  console.log(`[Trigger] Checking trigger "${trigger}" against event type "${event.type}"`);
  
  // Check if the trigger matches the event type
  switch (trigger) {
    case 'onClick':
      const clickResult = event.type === 'click';
      console.log(`[Trigger] onClick check: ${clickResult}`);
      return clickResult;
    case 'onHover':
    case 'mouseEnter':
      const mouseEnterResult = event.type === 'mouseenter';
      console.log(`[Trigger] mouseEnter check: ${mouseEnterResult}`);
      return mouseEnterResult;
    case 'mouseLeave':
      const mouseLeaveResult = event.type === 'mouseleave';
      console.log(`[Trigger] mouseLeave check: ${mouseLeaveResult}`);
      return mouseLeaveResult;
    case 'mouseDown':
      const mouseDownResult = event.type === 'mousedown';
      console.log(`[Trigger] mouseDown check: ${mouseDownResult}`);
      return mouseDownResult;
    case 'mouseUp':
      const mouseUpResult = event.type === 'mouseup';
      console.log(`[Trigger] mouseUp check: ${mouseUpResult}`);
      return mouseUpResult;
    case 'onDrag':
      const dragResult = event.type === 'drag';
      console.log(`[Trigger] onDrag check: ${dragResult}`);
      return dragResult;
    case 'whilePressing':
      const pressingResult = event.type === 'mousedown' || event.type === 'touchstart';
      console.log(`[Trigger] whilePressing check: ${pressingResult}`);
      return pressingResult;
    case 'key':
      const keyResult = event.type.startsWith('key');
      console.log(`[Trigger] key check: ${keyResult}`);
      return keyResult;
    case 'afterDelay':
      // This would need timer logic, for now just return true
      console.log(`[Trigger] afterDelay check: true`);
      return true;
    default:
      console.warn(`Unknown trigger: ${trigger}`);
      return false;
  }
}
