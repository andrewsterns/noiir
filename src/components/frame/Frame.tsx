import React from 'react';
import { useAnimateVariant, AnimateProps } from './frame-properties/animation/animate.props';
import { PositionProps, ConstraintProps } from './frame-properties/position/position.props';
import { AutoLayoutProps } from './frame-properties/layout/layout.props';
import { AppearanceProps } from './frame-properties/appearance/appearance.props';
import { TypographyProps } from './frame-properties/typography/typography.props';
import { FillProps } from './frame-properties/appearance/fill.props';
import { StrokeProps } from './frame-properties/appearance/stroke.props';
import { EffectProps } from './frame-properties/effects/effects.props';
import { samplePathPoints } from './frame-properties/layout/svgPathUtils';
import { getCurvedLayoutChildren } from './frame-properties/layout/curvedLayout';
import {
  applyChildStates,
  injectVariant,
  composeEventHandlers,
  convertFramePropsToStyles,
  calculateHugDimensions,
  ChildStateMap
} from './frame-properties';

export interface FrameAnimateMap {
  hover?: string;
  click?: string;
  event?: string;
  [key: string]: string | undefined;
}

export interface FrameProps {
  id?: string;
  as?: keyof JSX.IntrinsicElements;
  childStates?: { [childId: string]: string };
  position?: PositionProps;
  constraints?: ConstraintProps;
  autoLayout?: AutoLayoutProps;
  appearance?: AppearanceProps;
  typography?: TypographyProps;
  animate?: AnimateProps;
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
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLElement>) => void;
  onHover?: string;
  
  variant?: any;
  variants?: Record<string, any>;
  [key: `variant-${string}`]: any; // Allow variant-* properties
}

// Add the missing Frame component definition
export const Frame = React.forwardRef<HTMLElement, FrameProps>(function Frame(props, ref) {
  const {
    as = 'div',
    id,
    childStates,
    position,
    constraints,
    autoLayout,
    appearance,
    typography,
    fill,
    stroke,
    effects,
    cursor,
    children,
    className,
    style: overrideStyle,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onHover,
    animate,
    variant,
    variants: variantsProp,
    ...otherProps
  } = props;

  // Collect variant configurations from props starting with 'variant-' and variants prop
  const variants: Record<string, any> = { ...(variantsProp || {}) };
  Object.keys(otherProps).forEach(key => {
    if (key.startsWith('variant-')) {
      const variantName = key.slice(8); // Remove 'variant-' prefix
      variants[variantName] = otherProps[key as keyof typeof otherProps];
    }
  });

  // Get animate prop from variant if it exists, otherwise use explicit animate
  const variantProps = typeof variant === 'string' ? (variants[variant] || {}) : (variant || {});
  const effectiveAnimate = variantProps.animate || animate;

  // Use the animation logic hook
  const { currentVariant, eventHandlers } = useAnimateVariant({ animate: effectiveAnimate, onHover, variants });

  // Get the current variant props based on currentVariant
  const currentVariantProps = currentVariant ? variants[currentVariant] : {};

  // Merge variant props with explicit props, explicit props take precedence
  const explicitProps: Record<string, any> = {};
  
  // Only include explicit props that are actually defined
  if (position !== undefined) explicitProps.position = position;
  if (constraints !== undefined) explicitProps.constraints = constraints;
  if (autoLayout !== undefined) explicitProps.autoLayout = autoLayout;
  if (appearance !== undefined) explicitProps.appearance = appearance;
  if (typography !== undefined) explicitProps.typography = typography;
  if (fill !== undefined) explicitProps.fill = fill;
  if (stroke !== undefined) explicitProps.stroke = stroke;
  if (effects !== undefined) explicitProps.effects = effects;
  if (cursor !== undefined) explicitProps.cursor = cursor;
  if (onClick !== undefined) explicitProps.onClick = onClick;
  if (onMouseEnter !== undefined) explicitProps.onMouseEnter = onMouseEnter;
  if (onMouseLeave !== undefined) explicitProps.onMouseLeave = onMouseLeave;
  if (onMouseDown !== undefined) explicitProps.onMouseDown = onMouseDown;
  if (onMouseUp !== undefined) explicitProps.onMouseUp = onMouseUp;
  if (onHover !== undefined) explicitProps.onHover = onHover;
  if (animate !== undefined) explicitProps.animate = animate;

  const mergedProps = {
    ...variantProps,
    ...explicitProps,
    ...currentVariantProps,
  };

  // Extract merged props for use
  const {
    position: finalPosition,
    constraints: finalConstraints,
    autoLayout: finalAutoLayout,
    appearance: finalAppearance,
    typography: finalTypography,
    fill: finalFill,
    stroke: finalStroke,
    effects: finalEffects,
    cursor: finalCursor,
    onClick: finalOnClick,
    onMouseEnter: finalOnMouseEnter,
    onMouseLeave: finalOnMouseLeave,
    onMouseDown: finalOnMouseDown,
    onMouseUp: finalOnMouseUp,
    onHover: finalOnHover,
    animate: finalAnimate,
  } = mergedProps;

  // Use the same animation state for children
  const childCurrentVariant = currentVariant;

  // Apply child states to children with matching IDs
  const processedChildren = applyChildStates(children, childStates);

  // If currentVariant is set, inject it as a prop to children (if they accept 'variant')
  const finalChildren = injectVariant(processedChildren, childCurrentVariant);

  // Determine if this frame uses auto layout
  const hasAutoLayout = !!finalAutoLayout && (finalAutoLayout.flow === 'horizontal' || finalAutoLayout.flow === 'vertical');

  // Curved auto layout: distribute children along SVG path
  let curvedChildren = finalChildren;
  if (finalAutoLayout?.flow === 'curved' && Array.isArray(finalChildren)) {
    curvedChildren = getCurvedLayoutChildren(finalChildren, finalAutoLayout).filter((c): c is React.ReactElement => !!c);
  }

  // Convert all frame props to CSS styles
  const finalStyles = convertFramePropsToStyles({
    position: finalPosition,
    constraints: finalConstraints,
    autoLayout: finalAutoLayout,
    appearance: finalAppearance,
    typography: finalTypography,
    fill: finalFill,
    stroke: finalStroke,
    effects: finalEffects,
    style: overrideStyle
  }, hasAutoLayout);

  // Compose event handlers: Frame's animation handlers take precedence but call original handlers too
  const composedHandlers = composeEventHandlers({
    onMouseEnter: finalOnMouseEnter,
    onMouseLeave: finalOnMouseLeave,
    onMouseDown: finalOnMouseDown,
    onMouseUp: finalOnMouseUp
  }, eventHandlers || {});

  const handleClick = finalOnClick;
  const handleMouseEnter = composedHandlers.onMouseEnter;
  const handleMouseLeave = composedHandlers.onMouseLeave;
  const handleMouseDown = composedHandlers.onMouseDown;
  const handleMouseUp = composedHandlers.onMouseUp;

  // For freeform, wrap children in a relative container to anchor absolutely positioned children
  if (finalAutoLayout?.flow === 'freeform') {
    const hugDimensions = calculateHugDimensions(finalChildren, finalAutoLayout);
    return React.createElement(
      as,
      {
        ref,
        id,
        className,
        style: {
          ...finalStyles,
          position: 'relative',
          ...hugDimensions,
        },
        onClick: handleClick,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
      },
      finalChildren
    );
  }
  return React.createElement(
    as,
    {
      ref,
      id,
      className,
      style: finalStyles,
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
    },
    finalAutoLayout?.flow === 'curved' ? curvedChildren : finalChildren
  );
});

Frame.displayName = 'Frame';

// Export default for convenience
export default Frame;