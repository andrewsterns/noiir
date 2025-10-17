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
import type { FrameStateProps } from './states/states';

interface FrameProps {
  id?: string;
  state?: string;
  states?: { [key: string]: FrameStateProps };
  as?: keyof JSX.IntrinsicElements;
  
  // Child states - defines states for child components by ID
  childStates?: { [childId: string]: string };
  
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
    state,
    states,
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

  // Frame manages its own state for animations to work
  const [internalState, setInternalState] = useState(state || 'default');

  // Update internal state when prop changes (for controlled usage)
  useEffect(() => {
    if (state !== undefined) {
      setInternalState(state);
    }
  }, [state]);

  // Get current state props for styling
  const currentStateProps = internalState && states?.[internalState] ? states[internalState] : {};
  const { animation: currentAnimation, ...currentStateStyling } = currentStateProps;

  // Use animation hook with current animation config
  // Use explicit animation prop if provided, otherwise use state animation
  const animationToUse = animation || currentAnimation;
  const {
    currentProps: animationProps,
    eventHandlers
  } = useFrameAnimation({ 
    ...props, // Pass all frame props
    states, // Explicitly pass states
    state: internalState,
    initialState: props.state || 'default',
    animation: animationToUse,
    onStateChange: setInternalState
  });

  console.log('[Frame] Animation props received:', animationProps);
  console.log('[Frame] Event handlers received:', Object.keys(eventHandlers));

  // Merge explicit props with current state props and animation props
  const finalProps = {
    ...currentStateStyling,
    position: position ?? currentStateStyling.position,
    constraints: constraints ?? currentStateStyling.constraints,
    autoLayout: autoLayout ?? currentStateStyling.autoLayout,
    appearance: appearance ?? currentStateStyling.appearance,
    typography: typography ?? currentStateStyling.typography,
    fill: fill ?? currentStateStyling.fill,
    stroke: stroke ?? currentStateStyling.stroke,
    effects: effects ?? currentStateStyling.effects,
    cursor: props.cursor ?? currentStateStyling.cursor,
    // Animation props override everything
    ...animationProps,
  };

  console.log(`[Frame] internalState:`, internalState);
  console.log(`[Frame] finalProps.fill:`, finalProps.fill);

  // Apply child states to children with matching IDs
  const applyChildStates = (child: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(child)) return child;
    
    const childId = child.props.id;
    const childState = finalProps.childStates?.[childId];
    
    if (childId && childState) {
      // Clone the child element with the new state
      return React.cloneElement(child, { 
        ...child.props, 
        state: childState 
      });
    }
    
    // Recursively process children if they exist
    if (child.props.children) {
      const processedChildren = React.Children.map(child.props.children, applyChildStates);
      return React.cloneElement(child, { children: processedChildren });
    }
    
    return child;
  };

  // Use children directly, then apply child states
  const finalChildren = React.Children.map(children, applyChildStates);

  // Determine if this frame uses auto layout
  const hasAutoLayout = !!finalProps.autoLayout &&
    (finalProps.autoLayout.flow === 'horizontal' || finalProps.autoLayout.flow === 'vertical');

  // Convert Figma props to CSS styles (using finalProps which includes state overrides)
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
      onClick: onClick ? (e: React.MouseEvent<HTMLElement>) => { console.log('Frame onClick called, event.type:', e.type, 'eventHandlers.onClick:', eventHandlers.onClick, 'eventHandlers:', eventHandlers); eventHandlers.onClick?.(e as any); onClick(e); } : eventHandlers.onClick,
      onMouseEnter: onMouseEnter ? (e: React.MouseEvent<HTMLElement>) => { onMouseEnter(e); eventHandlers.onMouseEnter?.(e as any); } : eventHandlers.onMouseEnter,
      onMouseLeave: onMouseLeave ? (e: React.MouseEvent<HTMLElement>) => { onMouseLeave(e); eventHandlers.onMouseLeave?.(e as any); } : eventHandlers.onMouseLeave,
      onMouseDown: onMouseDown ? (e: React.MouseEvent<HTMLElement>) => { onMouseDown(e); eventHandlers.onMouseDown?.(e as any); } : eventHandlers.onMouseDown,
      onMouseUp: onMouseUp ? (e: React.MouseEvent<HTMLElement>) => { onMouseUp(e); eventHandlers.onMouseUp?.(e as any); } : eventHandlers.onMouseUp,
    },
    finalChildren
  );
});

Frame.displayName = 'Frame';

// Export the props type for external use
export type { FrameProps };

// Export default for convenience 
export default Frame;