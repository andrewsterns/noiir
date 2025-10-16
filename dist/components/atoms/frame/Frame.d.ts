import React from 'react';
import { PositionProps, ConstraintProps } from './frame-properties/position/position.props';
import { AutoLayoutProps } from './frame-properties/layout/layout.props';
import { AppearanceProps } from './frame-properties/appearance/appearance.props';
import { TypographyProps } from './frame-properties/typography.props';
import { FillProps } from './frame-properties/appearance/fill.props';
import { StrokeProps } from './frame-properties/appearance/stroke.props';
import { EffectProps } from './frame-properties/effects/effects.props';
import type { AnimateProps } from './frame-animation/types';
interface FrameProps {
    id?: string;
    variant?: string;
    as?: keyof JSX.IntrinsicElements;
    animate?: AnimateProps;
    position?: PositionProps;
    constraints?: ConstraintProps;
    autoLayout?: AutoLayoutProps;
    appearance?: AppearanceProps;
    typography?: TypographyProps;
    fill?: FillProps;
    stroke?: StrokeProps;
    effects?: EffectProps;
    cursor?: 'default' | 'pointer' | 'text' | 'move' | 'not-allowed' | 'grab' | 'grabbing';
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
}
/**
 * Frame component - The foundation of Figma layouts
 * Can render as any HTML element using the 'as' prop
 * Equivalent to a div with Figma-style properties by default
 * Animation logic is handled by the animation system
 */
export declare const Frame: {
    (props: FrameProps): React.DOMElement<{
        onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
        onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
        onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
        id: string | undefined;
        className: string | undefined;
        style: React.CSSProperties;
    }, Element>;
    displayName: string;
};
export type { FrameProps };
export default Frame;
