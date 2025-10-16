import React from 'react';
import { PositionProps, ConstraintProps } from './frame-properties/position/position.props';
import { AutoLayoutProps } from './frame-properties/layout/layout.props';
import { AppearanceProps } from './frame-properties/appearance/appearance.props';
import { TypographyProps, convertTypographyProps } from './frame-properties/typography/typography.props';
import { FillProps, convertFillProps } from './frame-properties/appearance/fill.props';
import { StrokeProps, convertStrokeProps } from './frame-properties/appearance/stroke.props';
import { EffectProps, convertEffectProps } from './frame-properties/effects/effects.props';
import { convertPositionProps } from './frame-properties/position/position.props';
import { convertAutoLayoutProps } from './frame-properties/layout/layout.props';
import { convertAppearanceProps } from './frame-properties/appearance/appearance.props';
import { resolveColor, colorUtils } from '../../../theme/colors';
import type { AnimationConfig } from './frame-animation/types';
import { useFrameAnimation } from './frame-animation/core';
import type { FrameVariantProps } from './variants/variants';

interface FrameProps {
  id?: string;
  variant?: string;
  variants?: { [key: string]: FrameVariantProps };
  as?: keyof JSX.IntrinsicElements;
  
  // Animation Properties - handled by animation system
  animation?: AnimationConfig | AnimationConfig[];
  
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
    variant,
    variants,
    animation,
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

  // Get variant props if variant is specified
  const variantProps = variant && variants?.[variant] ? variants[variant] : {};
  
  // Extract styling props from variant (excluding animation since animation system handles it)
  const { animation: _, ...variantStylingProps } = variantProps;
  
  // Merge all props: explicit props override variant props
  const mergedProps = {
    ...variantStylingProps,
    position: position ?? variantStylingProps.position,
    constraints: constraints ?? variantStylingProps.constraints,
    autoLayout: autoLayout ?? variantStylingProps.autoLayout,
    appearance: appearance ?? variantStylingProps.appearance,
    typography: typography ?? variantStylingProps.typography,
    fill: fill ?? variantStylingProps.fill,
    stroke: stroke ?? variantStylingProps.stroke,
    effects: effects ?? variantStylingProps.effects,
    cursor: props.cursor ?? variantStylingProps.cursor,
  };

  // Use animation hook - this handles all animation logic
  const {
    currentProps,
    animationStyles,
    eventHandlers
  } = useFrameAnimation({ ...mergedProps, variant, variants: props.variants });

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

  // Check if we have a gradient stroke that needs special handling
  const hasGradientStroke = currentProps.stroke?.type === 'gradient' && currentProps.stroke.stops && currentProps.stroke.stops.length > 0;

  // Base styles for frames
  const baseStyles: React.CSSProperties = {
    boxSizing: 'border-box',
    // Only set position: relative if not using absolute positioning
    ...((!position?.x && !position?.y && !constraints) && { position: 'relative' })
  };

  // For gradient strokes, combine fill and stroke backgrounds using CSS background-clip technique
  let finalStyles: React.CSSProperties;
  if (hasGradientStroke) {
    const stroke = currentProps.stroke!;
    const strokeWeight = stroke.weight || 1;
    
    // Create gradient stops
    const gradientStops = stroke.stops!.map(stop => {
      const color = resolveColor(stop.color);
      const opacity = stop.opacity !== undefined ? stop.opacity : 1;
      const rgbaColor = opacity < 1 ? colorUtils.hexToRgba(color, opacity) : color;
      return `${rgbaColor} ${stop.position * 100}%`;
    }).join(', ');
    
    const angle = stroke.angle || 0;
    const gradientValue = `linear-gradient(${angle}deg, ${gradientStops})`;
    
    // Get the fill background - handle both background and backgroundColor
    let fillBackgroundValue = 'transparent';
    if (fillStyles.background && typeof fillStyles.background === 'string') {
      fillBackgroundValue = fillStyles.background;
    } else if (fillStyles.backgroundColor && typeof fillStyles.backgroundColor === 'string') {
      // Convert backgroundColor to a solid background
      fillBackgroundValue = `linear-gradient(${fillStyles.backgroundColor}, ${fillStyles.backgroundColor})`;
    }
    
    // Combine backgrounds: fill in padding-box, gradient in border-box
    const combinedBackground = fillBackgroundValue === 'transparent' 
      ? gradientValue 
      : `${fillBackgroundValue} padding-box, ${gradientValue} border-box`;
    
    const combinedBackgroundClip = fillBackgroundValue === 'transparent' 
      ? 'border-box' 
      : 'padding-box, border-box';
    
    finalStyles = {
      ...baseStyles,
      ...positionStyles,
      ...autoLayoutStyles,
      ...appearanceStyles,
      ...typographyStyles,
      ...effectStyles,
      ...animationStyles,
      ...(currentProps.cursor && { cursor: currentProps.cursor }),
      ...overrideStyle,
      // Gradient stroke styles
      border: `${strokeWeight}px solid transparent`,
      background: combinedBackground,
      backgroundClip: combinedBackgroundClip,
    };
    
    // Remove backgroundColor since we're using background
    if (finalStyles.backgroundColor) {
      delete (finalStyles as any).backgroundColor;
    }
  } else {
    // Normal case - merge all styles
    finalStyles = {
      ...baseStyles,
      ...positionStyles,
      ...autoLayoutStyles,
      ...appearanceStyles,
      ...typographyStyles,
      ...fillStyles,
      ...strokeStyles,
      ...effectStyles,
      ...animationStyles,
      ...(currentProps.cursor && { cursor: currentProps.cursor }),
      ...overrideStyle
    };
  }

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