export type AnimationDirection = 'none' | 'left' | 'right' | 'up' | 'down' | 'in' | 'out' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export declare function getDirectionTransform(direction: AnimationDirection, animationType?: string): string;
export declare function isValidDirectionForAnimation(direction: AnimationDirection, animationType: string): boolean;
export declare function getOppositeDirection(direction: AnimationDirection): AnimationDirection;
export declare function getAvailableDirections(): AnimationDirection[];
