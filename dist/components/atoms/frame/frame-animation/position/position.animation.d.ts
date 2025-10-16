/**
 * Position Animation System
 *
 * Specialized animation system for handling position transitions like coordinate changes,
 * rotation adjustments, and constraint-based positioning.
 */
import React from 'react';
import type { PositionProps } from '../../frame-properties/position/position.props';
export interface PositionAnimationProps {
    coordinates?: {
        from?: {
            x?: number;
            y?: number;
        };
        to: {
            x?: number;
            y?: number;
        };
        duration?: string;
        timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    };
    rotation?: {
        from?: PositionProps['rotation'];
        to: PositionProps['rotation'];
        duration?: string;
        timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    };
    transformOrigin?: {
        from?: string;
        to: string;
        duration?: string;
        timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    };
}
export interface PositionAnimationState {
    isAnimating: boolean;
    currentX?: number;
    currentY?: number;
    currentRotation?: PositionProps['rotation'];
    currentTransformOrigin?: string;
}
export declare const createPositionAnimationStyles: (animation: PositionAnimationProps, state: PositionAnimationState) => React.CSSProperties;
export declare const resolvePositionAnimation: (animation: PositionAnimationProps, trigger: "hover" | "click" | "focus" | "active") => PositionAnimationState;
export declare const POSITION_ANIMATION_PRESETS: {
    readonly slideRight: {
        readonly hover: {
            readonly position: {
                readonly x: 10;
                readonly y: 0;
            };
        };
    };
    readonly slideLeft: {
        readonly hover: {
            readonly position: {
                readonly x: -10;
                readonly y: 0;
            };
        };
    };
    readonly slideUp: {
        readonly hover: {
            readonly position: {
                readonly x: 0;
                readonly y: -10;
            };
        };
    };
    readonly slideDown: {
        readonly hover: {
            readonly position: {
                readonly x: 0;
                readonly y: 10;
            };
        };
    };
    readonly rotateClockwise: {
        readonly hover: {
            readonly position: {
                readonly rotation: 15;
            };
        };
    };
    readonly rotateCounterClockwise: {
        readonly hover: {
            readonly position: {
                readonly rotation: -15;
            };
        };
    };
    readonly spin: {
        readonly hover: {
            readonly position: {
                readonly rotation: 180;
            };
        };
    };
    readonly slideAndRotate: {
        readonly hover: {
            readonly position: {
                readonly x: 15;
                readonly y: -10;
                readonly rotation: 10;
            };
        };
    };
};
