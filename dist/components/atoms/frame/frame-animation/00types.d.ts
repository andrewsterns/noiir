/**
 * Animation State Management
 *
 * Core interfaces and types for Frame animations
 */
import type { FrameProps } from '../Frame';
export type AnimationState = 'hover' | 'click' | 'focus' | 'active' | 'disabled';
import type { LayoutAnimationProps } from './layout/layout.animation';
export interface AnimationProps {
    hover?: Partial<FrameProps>;
    click?: Partial<FrameProps>;
    toggle?: Partial<FrameProps>;
    focus?: Partial<FrameProps>;
    active?: Partial<FrameProps>;
    disabled?: Partial<FrameProps>;
    layoutAnimation?: {
        hover?: LayoutAnimationProps;
        click?: LayoutAnimationProps;
        toggle?: LayoutAnimationProps;
        focus?: LayoutAnimationProps;
    };
    duration?: string;
    timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    delay?: string;
    property?: string;
}
export interface AnimationTransition {
    duration?: string;
    timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    delay?: string;
    property?: string;
}
export interface AnimatedFrameProps extends FrameProps {
}
export interface AnimationStateManager {
    isHovered: boolean;
    isClicked: boolean;
    isToggled: boolean;
    isFocused: boolean;
    isActive: boolean;
    isDisabled: boolean;
}
export interface FrameAnimationResult {
    currentProps: FrameProps;
    animationStyles: React.CSSProperties;
    eventHandlers: {
        onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
        onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
        onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
        onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
        onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
    };
}
export declare function createTransitionString(transition: string | AnimationTransition): string;
