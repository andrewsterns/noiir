// Action types and logic for frame animation
import type { AnimationAction, AnimationContext, AnimationResult, AnimationDestination } from '../core';

// Figma-like action types for frame animation (predefined)
export type PredefinedAnimationAction =
  | 'none'
  | 'navigateTo'
  | 'changeTo'
  | 'cycleStates'
  | 'back'
  | 'scrollTo'
  | 'openLink'
  | 'openOverlay'
  | 'swapOverlay'
  | 'closeOverlay'
  | 'setVariable'
  | 'conditional';

// ActionProps for actions
export interface ActionProps {
  action: AnimationAction;
  destination?: AnimationDestination;
  variable?: string;    // For setVariable
  value?: any;          // For setVariable
  condition?: (context: any) => boolean; // For conditional
  animation?: string;
  direction?: string;
  curve?: string;
  duration?: number;
}

// Handle predefined actions
function handlePredefinedAction(
  action: PredefinedAnimationAction,
  destination: AnimationDestination,
  context: AnimationContext
): AnimationResult | void {
  console.log(`[PredefinedAction] Executing "${action}" with destination:`, destination);
  
  switch (action) {
    case 'changeTo':
      console.log(`[PredefinedAction] changeTo: destination type is ${typeof destination}`);
      if (typeof destination === 'string') {
        console.log(`[PredefinedAction] changeTo: changing to state "${destination}"`);
        return { state: destination };
      } else if (typeof destination === 'object' && destination !== null) {
        console.log(`[PredefinedAction] changeTo: applying inline properties`, destination);
        return { props: destination };
      } else if (typeof destination === 'function') {
        const result = destination(context);
        console.log(`[PredefinedAction] changeTo: function destination returned:`, result);
        return typeof result === 'string' ? { state: result } : result;
      }
      console.log(`[PredefinedAction] changeTo: invalid destination type`);
      break;

    case 'cycleStates':
      const stateNames = Object.keys(context.states);
      const currentIndex = stateNames.indexOf(context.currentState);
      const nextIndex = (currentIndex + 1) % stateNames.length;
      return { state: stateNames[nextIndex] };

    case 'navigateTo':
      // TODO: Implement navigation logic
      console.log('Navigate to:', destination);
      break;

    case 'back':
      // TODO: Go back in navigation stack
      console.log('Go back');
      break;

    case 'scrollTo':
      // TODO: Scroll frame or viewport
      console.log('Scroll to:', destination);
      break;

    case 'openLink':
      // TODO: Open external link
      if (typeof destination === 'string') {
        window.open(destination, '_blank');
      }
      break;

    case 'openOverlay':
      // TODO: Show overlay frame
      console.log('Open overlay:', destination);
      break;

    case 'swapOverlay':
      // TODO: Swap overlays
      console.log('Swap overlay:', destination);
      break;

    case 'closeOverlay':
      // TODO: Close overlay
      console.log('Close overlay');
      break;

    case 'setVariable':
      // TODO: Set variable in context/state
      console.log('Set variable:', destination);
      break;

    case 'conditional':
      // TODO: Perform conditional logic
      console.log('Conditional action');
      break;

    case 'none':
    default:
      // No action
      break;
  }
}

// Main action handler
export function handleAction(
  action: AnimationAction,
  destination: AnimationDestination | undefined,
  context: AnimationContext
): AnimationResult | void {
  console.log(`[Action] Handling action "${action}" with destination:`, destination);
  console.log(`[Action] Context: currentState="${context.currentState}", available states:`, Object.keys(context.states));
  
  // Handle custom function actions
  if (typeof action === 'function') {
    console.log(`[Action] Executing custom function action`);
    return action(context);
  }

  // Handle predefined actions
  if (typeof action === 'string') {
    console.log(`[Action] Executing predefined action: ${action}`);
    return handlePredefinedAction(action as PredefinedAnimationAction, destination!, context);
  }
  
  console.log(`[Action] No action executed - action type not recognized`);
}
