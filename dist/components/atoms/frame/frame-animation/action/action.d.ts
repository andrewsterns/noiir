import type { AnimationAction, AnimationContext, AnimationResult, AnimationDestination } from '../types';
export type PredefinedAnimationAction = 'none' | 'navigateTo' | 'changeTo' | 'cycleVariants' | 'back' | 'scrollTo' | 'openLink' | 'openOverlay' | 'swapOverlay' | 'closeOverlay' | 'setVariable' | 'conditional';
export interface ActionProps {
    action: AnimationAction;
    destination?: AnimationDestination;
    variable?: string;
    value?: any;
    condition?: (context: any) => boolean;
    animation?: string;
    direction?: string;
    curve?: string;
    duration?: number;
}
export declare function handleAction(action: AnimationAction, destination: AnimationDestination | undefined, context: AnimationContext): AnimationResult | void;
