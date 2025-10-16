/**
 * Effects Animation System
 *
 * Specialized animation system for handling effect transitions like shadow changes,
 * blur adjustments, and other visual effects.
 */
import React from 'react';
import type { EffectProps } from '../../frame-properties/effects/effects.props';
export interface EffectsAnimationProps {
    dropShadow?: {
        from?: EffectProps['dropShadow'];
        to: EffectProps['dropShadow'];
        duration?: string;
        timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    };
    innerShadow?: {
        from?: EffectProps['innerShadow'];
        to: EffectProps['innerShadow'];
        duration?: string;
        timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    };
    layerBlur?: {
        from?: EffectProps['layerBlur'];
        to: EffectProps['layerBlur'];
        duration?: string;
        timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    };
}
export interface EffectsAnimationState {
    isAnimating: boolean;
    currentDropShadow?: EffectProps['dropShadow'];
    currentInnerShadow?: EffectProps['innerShadow'];
    currentLayerBlur?: EffectProps['layerBlur'];
}
export declare const createEffectsAnimationStyles: (animation: EffectsAnimationProps, state: EffectsAnimationState) => React.CSSProperties;
export declare const resolveEffectsAnimation: (animation: EffectsAnimationProps, trigger: "hover" | "click" | "focus" | "active") => EffectsAnimationState;
export declare const EFFECTS_ANIMATION_PRESETS: {
    readonly hoverShadow: {
        readonly hover: {
            readonly effects: {
                readonly dropShadow: readonly [{
                    readonly x: 0;
                    readonly y: 4;
                    readonly blur: 12;
                    readonly spread: 0;
                    readonly color: "rgba(0, 0, 0, 0.15)";
                }];
            };
        };
    };
    readonly largeShadow: {
        readonly hover: {
            readonly effects: {
                readonly dropShadow: readonly [{
                    readonly x: 0;
                    readonly y: 8;
                    readonly blur: 24;
                    readonly spread: 0;
                    readonly color: "rgba(0, 0, 0, 0.2)";
                }];
            };
        };
    };
    readonly coloredShadow: {
        readonly hover: {
            readonly effects: {
                readonly dropShadow: readonly [{
                    readonly x: 0;
                    readonly y: 6;
                    readonly blur: 16;
                    readonly spread: 0;
                    readonly color: "rgba(59, 130, 246, 0.3)";
                }];
            };
        };
    };
    readonly blurOnHover: {
        readonly hover: {
            readonly effects: {
                readonly layerBlur: {
                    readonly radius: 4;
                };
            };
        };
    };
    readonly heavyBlur: {
        readonly hover: {
            readonly effects: {
                readonly layerBlur: {
                    readonly radius: 8;
                };
            };
        };
    };
    readonly glowEffect: {
        readonly hover: {
            readonly effects: {
                readonly dropShadow: readonly [{
                    readonly x: 0;
                    readonly y: 0;
                    readonly blur: 20;
                    readonly spread: 4;
                    readonly color: "rgba(59, 130, 246, 0.4)";
                }];
            };
        };
    };
};
