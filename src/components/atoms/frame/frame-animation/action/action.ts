// Action types and logic for frame animation
import type { AnimationAction, AnimationContext, AnimationResult, AnimationDestination } from '../types';

// Figma-like action types for frame animation (predefined)
export type PredefinedAnimationAction =
  | 'none'
  | 'navigateTo'
  | 'changeTo'
  | 'cycleVariants'
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
  switch (action) {
    case 'changeTo':
      if (typeof destination === 'string') {
        return { variant: destination };
      } else if (typeof destination === 'function') {
        const result = destination(context);
        return typeof result === 'string' ? { variant: result } : result;
      }
      break;

    case 'cycleVariants':
      const variantNames = Object.keys(context.variants);
      const currentIndex = variantNames.indexOf(context.currentVariant);
      const nextIndex = (currentIndex + 1) % variantNames.length;
      return { variant: variantNames[nextIndex] };

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
  // Handle custom function actions
  if (typeof action === 'function') {
    return action(context);
  }

  // Handle predefined actions
  if (typeof action === 'string') {
    return handlePredefinedAction(action as PredefinedAnimationAction, destination!, context);
  }
}
