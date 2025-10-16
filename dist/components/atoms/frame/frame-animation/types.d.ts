import type { FrameProps } from '../Frame';
export type FrameVariantName = string;
export type FrameVariants = Record<FrameVariantName, FrameVariantProps>;
export interface FrameVariantProps extends Omit<FrameProps, "animate" | "children" | "variants" | "initialVariant"> {
}
export type AnimationAction = string | ((context: AnimationContext) => AnimationResult | void);
export interface AnimationContext {
    currentVariant: string;
    variants: FrameVariants;
    currentProps: FrameProps;
    event?: React.MouseEvent<HTMLDivElement>;
    customData?: any;
}
export interface AnimationResult {
    variant?: string;
    props?: Partial<FrameProps>;
    data?: any;
}
export type AnimationDestination = string | ((context: AnimationContext) => string | AnimationResult);
export interface AnimateProps {
    trigger?: string;
    action?: AnimationAction;
    destination?: AnimationDestination;
    animation?: string;
    direction?: string;
    curve?: string;
    duration?: number;
    cursor?: 'default' | 'pointer' | 'text' | 'move' | 'not-allowed' | 'grab' | 'grabbing';
    animations?: Array<{
        trigger: string;
        action?: AnimationAction;
        destination?: AnimationDestination;
        animation?: string;
        direction?: string;
        curve?: string;
        duration?: number;
        cursor?: 'default' | 'pointer' | 'text' | 'move' | 'not-allowed' | 'grab' | 'grabbing';
    }>;
    variants: FrameVariants;
    customData?: any;
}
export interface FrameAnimationResult {
    currentProps: FrameProps;
    animationStyles: React.CSSProperties;
    eventHandlers: {
        onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
        onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
        onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
    };
}
