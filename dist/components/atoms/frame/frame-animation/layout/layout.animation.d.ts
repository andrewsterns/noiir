/**
 * Layout Animation System
 *
 * Specialized animation system for handling layout transitions like flow changes,
 * alignment shifts, spacing adjustments, and dimension changes.
 */
import React from 'react';
import type { AutoLayoutProps, SizeProps } from '../../frame-properties/layout/layout.props';
export interface LayoutAnimationProps {
    flow?: {
        from?: AutoLayoutProps['flow'];
        to: AutoLayoutProps['flow'];
        duration?: string;
        timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    };
    alignment?: {
        from?: AutoLayoutProps['alignment'];
        to: AutoLayoutProps['alignment'];
        duration?: string;
        timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    };
    spacing?: {
        gap?: {
            from?: number;
            to: number;
            duration?: string;
            timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
        };
        padding?: {
            from?: AutoLayoutProps['padding'];
            to: AutoLayoutProps['padding'];
            duration?: string;
            timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
        };
    };
    dimensions?: {
        width?: {
            from?: SizeProps['width'];
            to: SizeProps['width'];
            duration?: string;
            timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
        };
        height?: {
            from?: SizeProps['height'];
            to: SizeProps['height'];
            duration?: string;
            timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
        };
    };
    wrap?: {
        from?: AutoLayoutProps['wrap'];
        to: AutoLayoutProps['wrap'];
        duration?: string;
        timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    };
}
export interface AnimatedLayoutProps extends AutoLayoutProps {
    animate?: {
        hover?: LayoutAnimationProps;
        click?: LayoutAnimationProps;
        toggle?: LayoutAnimationProps;
        focus?: LayoutAnimationProps;
    };
    animationDuration?: string;
    animationTiming?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
}
export interface LayoutAnimationState {
    currentFlow?: AutoLayoutProps['flow'];
    currentAlignment?: AutoLayoutProps['alignment'];
    currentGap?: number;
    currentPadding?: AutoLayoutProps['padding'];
    currentWidth?: SizeProps['width'];
    currentHeight?: SizeProps['height'];
    currentWrap?: AutoLayoutProps['wrap'];
    isAnimating: boolean;
    animationType?: 'hover' | 'click' | 'toggle' | 'focus';
}
export interface LayoutTransitionConfig {
    property: string;
    duration: string;
    timing: string;
    delay?: string;
}
/**
 * Utilities for Layout Animations
 */
export declare function createLayoutTransition(config: LayoutTransitionConfig): string;
export declare function createLayoutTransitions(configs: LayoutTransitionConfig[]): string;
export declare const LAYOUT_TRANSITION_DEFAULTS: {
    readonly flow: {
        readonly duration: "0.3s";
        readonly timing: "ease-out";
    };
    readonly alignment: {
        readonly duration: "0.2s";
        readonly timing: "ease-out";
    };
    readonly gap: {
        readonly duration: "0.2s";
        readonly timing: "ease-out";
    };
    readonly padding: {
        readonly duration: "0.2s";
        readonly timing: "ease-out";
    };
    readonly dimensions: {
        readonly duration: "0.3s";
        readonly timing: "ease-out";
    };
    readonly wrap: {
        readonly duration: "0.2s";
        readonly timing: "ease-out";
    };
};
export declare function resolveLayoutAnimation(baseProps: AutoLayoutProps, animation: LayoutAnimationProps, state: LayoutAnimationState): AutoLayoutProps;
export declare function createLayoutAnimationStyles(animation: LayoutAnimationProps): React.CSSProperties;
export declare const LAYOUT_ANIMATION_PRESETS: {
    readonly hoverGrow: {
        readonly hover: {
            readonly size: {
                readonly width: "120%";
                readonly height: "120%";
            };
        };
    };
    readonly hoverShrink: {
        readonly hover: {
            readonly size: {
                readonly width: "90%";
                readonly height: "90%";
            };
        };
    };
    readonly clickShrink: {
        readonly click: {
            readonly size: {
                readonly width: "95%";
                readonly height: "95%";
            };
        };
    };
    readonly horizontalToVertical: {
        readonly hover: {
            readonly autoLayout: {
                readonly flow: "vertical";
            };
        };
    };
    readonly verticalToHorizontal: {
        readonly hover: {
            readonly autoLayout: {
                readonly flow: "horizontal";
            };
        };
    };
    readonly increaseGap: {
        readonly hover: {
            readonly autoLayout: {
                readonly gap: 20;
            };
        };
    };
    readonly increasePadding: {
        readonly hover: {
            readonly autoLayout: {
                readonly padding: 24;
            };
        };
    };
    readonly expandContainer: {
        readonly hover: {
            readonly size: {
                readonly width: 400;
                readonly height: 300;
            };
            readonly autoLayout: {
                readonly gap: 16;
                readonly padding: 20;
            };
        };
    };
};
