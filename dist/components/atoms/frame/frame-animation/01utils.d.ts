/**
 * Frame Animation Utilities



/**
 * Animation Utilities
 *
 * Helper functions for handling Frame animations
 */
import React from 'react';
import type { AnimationStateManager, AnimationProps, AnimatedFrameProps, FrameAnimationResult } from './00types';
import type { FrameProps } from '../Frame';
/**
 * Merges animation state properties with base frame properties
 * Preserves individual properties within nested objects
 */
export declare function mergeAnimationProps(baseProps: FrameProps, animations: AnimationProps, state: AnimationStateManager): FrameProps;
/**
 * Converts Frame props to CSS styles (similar to Frame component)
 */
export declare function convertFramePropsToStyles(props: FrameProps): React.CSSProperties;
/**
 * Creates CSS transition styles for animations
 */
export declare function createAnimationStyles(baseProps: AnimatedFrameProps, transition?: string): React.CSSProperties;
/**
 * Extracts Frame props from AnimatedFrameProps
 */
export declare function extractFrameProps(props: FrameProps): FrameProps;
/**
 * Creates default animation state
 */
export declare function createDefaultAnimationState(): AnimationStateManager;
export declare const DEFAULT_TRANSITIONS: {
    readonly fast: "all 0.15s ease-out";
    readonly normal: "all 0.3s ease-out";
    readonly slow: "all 0.5s ease-out";
    readonly spring: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    readonly bounce: "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
};
/**
 * Common animation presets (legacy - use specific animation modules for new presets)
 * @deprecated Use APPEARANCE_ANIMATION_PRESETS, EFFECTS_ANIMATION_PRESETS, etc. from specific modules
 */
export declare const ANIMATION_PRESETS: {
    readonly hoverGrow: {
        readonly hover: {
            readonly scale: 1.05;
        };
    };
    readonly hoverShrink: {
        readonly hover: {
            readonly scale: 0.95;
        };
    };
    readonly clickShrink: {
        readonly click: {
            readonly scale: 0.95;
        };
    };
    readonly focusBorder: {
        readonly focus: {
            readonly stroke: {
                readonly color: "#3b82f6";
                readonly width: 2;
            };
        };
    };
    readonly buttonPress: {
        readonly hover: {
            readonly appearance: {
                readonly scale: 1.02;
            };
        };
        readonly click: {
            readonly appearance: {
                readonly scale: 0.98;
            };
        };
    };
};
/**
 * Main animation hook for Frame components
 */
export declare function useFrameAnimation(props: FrameProps, animate?: AnimationProps): FrameAnimationResult;
