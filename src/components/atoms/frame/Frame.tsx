import React from 'react';
import { PositionProps, ConstraintProps } from './frame-properties/position/position.props';
import { AutoLayoutProps } from './frame-properties/layout/layout.props';
import { AppearanceProps } from './frame-properties/appearance/appearance.props';
import { TypographyProps, convertTypographyProps } from './frame-properties/typography.props';
import { FillProps, convertFillProps } from './frame-properties/appearance/fill.props';
import { StrokeProps, convertStrokeProps } from './frame-properties/appearance/stroke.props';
import { EffectProps, convertEffectProps } from './frame-properties/effects/effects.props';
import { convertPositionProps } from './frame-properties/position/position.props';
import { convertAutoLayoutProps } from './frame-properties/layout/layout.props';
import { convertAppearanceProps } from './frame-properties/appearance/appearance.props';
import type { AnimateProps } from './frame-animation/types';
import { useFrameAnimation } from './frame-animation/core';

interface FrameProps {
  id?: string;
  variant?: string;
  as?: keyof JSX.IntrinsicElements;
  
  // Animation Properties - handled by animation system
  animate?: AnimateProps;
  
  // Core Figma properties
  position?: PositionProps;
  constraints?: ConstraintProps;
  autoLayout?: AutoLayoutProps;
  appearance?: AppearanceProps;
  typography?: TypographyProps;
  fill?: FillProps;
  stroke?: StrokeProps;
  effects?: EffectProps;
  
  // Interaction properties
  cursor?: 'default' | 'pointer' | 'text' | 'move' | 'not-allowed' | 'grab' | 'grabbing';
  
  // React properties
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
export const Frame = (props: FrameProps) => {
  const {
    as = 'div',
    animate,
    position,
    constraints,
    autoLayout,
    appearance,
    typography,
    fill,
    stroke,
    effects,
    children,
    className,
    style: overrideStyle,
  onClick,
  onMouseEnter,
  onMouseLeave,
  } = props;

  // Use animation hook - this handles all animation logic
  const {
    currentProps,
    animationStyles,
    eventHandlers
  } = useFrameAnimation(props, animate);

  console.log(`[Frame] Rendering with currentProps.fill:`, currentProps.fill);

  // Use merged children if variant overrides it
  const finalChildren = currentProps.children !== undefined ? currentProps.children : children;

  // Determine if this frame uses auto layout
  const hasAutoLayout = !!currentProps.autoLayout &&
    (currentProps.autoLayout.flow === 'horizontal' || currentProps.autoLayout.flow === 'vertical');

  // Convert Figma props to CSS styles (using currentProps which includes animation/variant overrides)
  const positionStyles = convertPositionProps(currentProps.position || {}, hasAutoLayout);
  const autoLayoutStyles = convertAutoLayoutProps(currentProps.autoLayout || {});
  const appearanceStyles = convertAppearanceProps(currentProps.appearance || {});
  const typographyStyles = convertTypographyProps(currentProps.typography || {});
  const fillStyles = convertFillProps(currentProps.fill || {}, false);
  const strokeStyles = convertStrokeProps(currentProps.stroke || {});
  const effectStyles = convertEffectProps(currentProps.effects || {});

  // Base styles for frames
  const baseStyles: React.CSSProperties = {
    boxSizing: 'border-box',
    // Only set position: relative if not using absolute positioning
    ...((!position?.x && !position?.y && !constraints) && { position: 'relative' })
  };

  // Merge all styles
  const finalStyles: React.CSSProperties = {
    ...baseStyles,
    ...positionStyles,
    ...autoLayoutStyles,
    ...appearanceStyles,
    ...typographyStyles,
    ...fillStyles,
    ...strokeStyles,
    ...effectStyles,
    ...animationStyles, // Animation system provides these
    ...(currentProps.cursor && { cursor: currentProps.cursor }), // Apply cursor if set
    ...overrideStyle
  };

  return React.createElement(
    as,
    {
      id: props.id,
      className,
      style: finalStyles,
      ...eventHandlers, // Animation system provides these
    },
    finalChildren
  );
};

Frame.displayName = 'Frame';

// Export the props type for external use
export type { FrameProps };

// Export default for convenience 
export default Frame;