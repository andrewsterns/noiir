import React, { useState, useEffect } from 'react';
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
import type { AnimationConfig } from './frame-animation/core';
import { useFrameAnimation } from './frame-animation/core';
import type { FrameVariantProps } from './variants/variants';

interface FrameProps {
  id?: string;
  variant?: string;
  variants?: { [key: string]: FrameVariantProps };
  as?: keyof JSX.IntrinsicElements;
  
  // Child variants - defines variants for child components by ID
  childVariants?: { [childId: string]: string };
  
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
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Frame component - The foundation of Figma layouts
 * Can render as any HTML element using the 'as' prop
 * Equivalent to a div with Figma-style properties by default
 * Animation logic is handled by the animation system
 */
export const Frame = React.forwardRef<HTMLElement, FrameProps>((props, ref) => {
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
    onMouseDown,
    onMouseUp,
  } = props;

  // Frame manages its own variant state for animations to work
  const [internalVariant, setInternalVariant] = useState(variant || 'default');

  // Update internal variant when prop changes (for controlled usage)
  useEffect(() => {
    if (variant !== undefined) {
      setInternalVariant(variant);
    }
  }, [variant]);

  // Get current variant props for styling
  const currentVariantProps = internalVariant && variants?.[internalVariant] ? variants[internalVariant] : {};
  const { animation: currentAnimation, ...currentVariantStyling } = currentVariantProps;

  // Use animation hook with current animation config
  // Use explicit animation prop if provided, otherwise use variant animation
  const animationToUse = animation || currentAnimation;
  const {
    currentProps: animationProps,
    eventHandlers
  } = useFrameAnimation({ 
    ...props, // Pass all frame props
    variant: internalVariant,
    animation: animationToUse,
    onVariantChange: setInternalVariant
  });

  console.log('[Frame] Animation props received:', animationProps);
  console.log('[Frame] Event handlers received:', Object.keys(eventHandlers));

  // Merge explicit props with current variant props and animation props
  const finalProps = {
    ...currentVariantStyling,
    position: position ?? currentVariantStyling.position,
    constraints: constraints ?? currentVariantStyling.constraints,
    autoLayout: autoLayout ?? currentVariantStyling.autoLayout,
    appearance: appearance ?? currentVariantStyling.appearance,
    typography: typography ?? currentVariantStyling.typography,
    fill: fill ?? currentVariantStyling.fill,
    stroke: stroke ?? currentVariantStyling.stroke,
    effects: effects ?? currentVariantStyling.effects,
    cursor: props.cursor ?? currentVariantStyling.cursor,
    // Animation props override everything
    ...animationProps,
  };

  console.log(`[Frame] internalVariant:`, internalVariant);
  console.log(`[Frame] finalProps.fill:`, finalProps.fill);

  // Apply child variants to children with matching IDs
  const applyChildVariants = (child: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(child)) return child;
    
    const childId = child.props.id;
    const childVariant = finalProps.childVariants?.[childId];
    
    if (childId && childVariant) {
      // Clone the child element with the new variant
      return React.cloneElement(child, { 
        ...child.props, 
        variant: childVariant 
      });
    }
    
    // Recursively process children if they exist
    if (child.props.children) {
      const processedChildren = React.Children.map(child.props.children, applyChildVariants);
      return React.cloneElement(child, { children: processedChildren });
    }
    
    return child;
  };

  // Use children directly, then apply child variants
  const finalChildren = React.Children.map(children, applyChildVariants);

  // Determine if this frame uses auto layout
  const hasAutoLayout = !!finalProps.autoLayout &&
    (finalProps.autoLayout.flow === 'horizontal' || finalProps.autoLayout.flow === 'vertical');

  // Convert Figma props to CSS styles (using finalProps which includes variant overrides)
  const positionStyles = convertPositionProps(finalProps.position || {}, hasAutoLayout);
  const autoLayoutStyles = convertAutoLayoutProps(finalProps.autoLayout || {});
  const appearanceStyles = convertAppearanceProps(finalProps.appearance || {});
  const typographyStyles = convertTypographyProps(finalProps.typography || {});
  const fillStyles = convertFillProps(finalProps.fill || {}, false);
  const strokeStyles = convertStrokeProps(finalProps.stroke || {});
  const effectStyles = convertEffectProps(finalProps.effects || {});

  // Check if we have a gradient stroke that needs special handling
  const hasGradientStroke = finalProps.stroke?.type === 'gradient' && finalProps.stroke.stops && finalProps.stroke.stops.length > 0;

  // Base styles for frames
  const baseStyles: React.CSSProperties = {
    boxSizing: 'border-box',
    // Only set position: relative if not using absolute positioning
    ...((!position?.x && !position?.y && !constraints) && { position: 'relative' })
  };

  // For gradient strokes, combine fill and stroke backgrounds using CSS background-clip technique
  let finalStyles: React.CSSProperties;
  if (hasGradientStroke) {
    const stroke = finalProps.stroke!;
    const strokeWeight = stroke.weight || 1;
    
    // Create gradient stops
    const gradientStops = stroke.stops!.map((stop: any) => {
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
      ...(finalProps.cursor && { cursor: finalProps.cursor }),
      ...overrideStyle,
      // Gradient stroke styles
      border: `${strokeWeight}px solid transparent`,
      background: combinedBackground,
      backgroundClip: combinedBackgroundClip,
      ...(props.animation && { transition: 'all 200ms ease' }),
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
      ...(finalProps.cursor && { cursor: finalProps.cursor }),
      ...(props.animation && { transition: 'all 200ms ease' }),
      ...overrideStyle
    };
  }

  return React.createElement(
    as,
    {
      ref,
      id: props.id,
      className,
      style: finalStyles,
      onClick: onClick || eventHandlers.onClick,
      onMouseEnter: onMouseEnter || eventHandlers.onMouseEnter,
      onMouseLeave: onMouseLeave || eventHandlers.onMouseLeave,
      onMouseDown: onMouseDown || eventHandlers.onMouseDown,
      onMouseUp: onMouseUp || eventHandlers.onMouseUp,
    },
    finalChildren
  );
});

Frame.displayName = 'Frame';

// Export the props type for external use
export type { FrameProps };

// Export default for convenience 
export default Frame;