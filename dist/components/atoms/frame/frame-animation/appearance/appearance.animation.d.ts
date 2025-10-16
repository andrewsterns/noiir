/**
 * Appearance Animation System
 *
 * Specialized animation system for handling appearance transitions like opacity changes,
 * radius adjustments, blend mode transitions, and visibility states.
 */
import React from 'react';
import type { AppearanceProps } from '../../frame-properties/appearance/appearance.props';
export interface AppearanceAnimationProps {
    opacity?: {
        from?: number;
        to: number;
        duration?: string;
        timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    };
    radius?: {
        from?: AppearanceProps['radius'];
        to: AppearanceProps['radius'];
        duration?: string;
        timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    };
    visible?: {
        from?: AppearanceProps['visible'];
        to: AppearanceProps['visible'];
        duration?: string;
        timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    };
    blendMode?: {
        from?: AppearanceProps['blendMode'];
        to: AppearanceProps['blendMode'];
        duration?: string;
        timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    };
}
export interface AppearanceAnimationState {
    isAnimating: boolean;
    currentOpacity?: number;
    currentRadius?: AppearanceProps['radius'];
    currentVisible?: AppearanceProps['visible'];
    currentBlendMode?: AppearanceProps['blendMode'];
}
export declare const createAppearanceAnimationStyles: (animation: AppearanceAnimationProps, state: AppearanceAnimationState) => React.CSSProperties;
export declare const resolveAppearanceAnimation: (animation: AppearanceAnimationProps, trigger: "hover" | "click" | "focus" | "active") => AppearanceAnimationState;
export declare const APPEARANCE_ANIMATION_PRESETS: {
    readonly fadeIn: {
        readonly hover: {
            readonly appearance: {
                readonly opacity: 1;
            };
        };
    };
    readonly fadeOut: {
        readonly hover: {
            readonly appearance: {
                readonly opacity: 0.7;
            };
        };
    };
    readonly roundCorners: {
        readonly hover: {
            readonly appearance: {
                readonly radius: 16;
            };
        };
    };
    readonly sharpCorners: {
        readonly hover: {
            readonly appearance: {
                readonly radius: 0;
            };
        };
    };
    readonly hideOnHover: {
        readonly hover: {
            readonly appearance: {
                readonly visible: false;
            };
        };
    };
    readonly showOnHover: {
        readonly hover: {
            readonly appearance: {
                readonly visible: true;
            };
        };
    };
    readonly multiplyBlend: {
        readonly hover: {
            readonly appearance: {
                readonly blendMode: "multiply";
            };
        };
    };
    readonly screenBlend: {
        readonly hover: {
            readonly appearance: {
                readonly blendMode: "screen";
            };
        };
    };
};
