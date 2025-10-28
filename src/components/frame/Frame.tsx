import React from 'react';
import { useAnimateVariant, AnimateProps } from './frame-properties/animation/animate.props';
import { PositionProps, ConstraintProps } from './frame-properties/position/position.props';
import { AutoLayoutProps } from './frame-properties/layout/layout.props';
import { AppearanceProps } from './frame-properties/appearance/appearance.props';
import { TypographyProps } from './frame-properties/typography/typography.props';
import { FillProps } from './frame-properties/appearance/fill.props';
import { StrokeProps } from './frame-properties/appearance/stroke.props';
import { CursorProps } from './frame-properties/appearance/cursor.props';
import { EffectProps } from './frame-properties/effects/effects.props';
import { samplePathPoints } from './frame-properties/layout/svgPathUtils';
import { getCurvedLayoutChildren } from './frame-properties/layout/curvedLayout';
import { mergeSizeProps } from './frame-properties/variants/size.props';
import { mergeVariantAndSize, mergeSizeWithAnimation, FrameVariantConfig } from './frame-properties/variants/variants.props';
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
  cursor?: CursorProps | CursorProps['type'];
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  onHover?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  iconStartColor?: string;
  iconEndColor?: string;
  size?: FrameVariantConfig | string;
  sizeKey?: string;
  variant?: FrameVariantConfig | string;
  variants?: Record<string, FrameVariantConfig>;
  sizes?: Record<string, any>;
  pointerEvents?: string;
  transform?: string;
  display?: string;
  tabIndex?: number;
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
    animate,
    fill,
    stroke,
    effects,
    cursor,
    children,
    className,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onFocus,
    onBlur,
    onHover,
    iconStart,
    iconEnd,
    iconStartColor,
    iconEndColor,
    size,
    sizeKey,
    variant,
    variants: variantsProp,
    sizes: sizesProp,
    pointerEvents,
    transform,
    display,
    tabIndex,
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

  const sizes: Record<string, any> = { ...(sizesProp || {}) };

  // Get animate prop from variant if it exists, otherwise use explicit animate
  const variantProps = typeof variant === 'string' ? (variants[variant] || {}) : (variant || {});
  const sizeProps = typeof size === 'string' ? (sizes[size] || {}) : (size || {});
  
  // Deep merge variant and size props
  const effectiveVariantProps = mergeVariantAndSize(variantProps, sizeProps);
  
  const effectiveAnimate = animate !== undefined ? animate : effectiveVariantProps.animate;

  // Use the animation logic hook
  const allVariants = { ...variants, ...sizes };
  const { currentVariant, eventHandlers } = useAnimateVariant({ animate: effectiveAnimate, onHover, variants: allVariants, variant: typeof variant === 'string' ? variant : undefined });

  // Get the current variant props based on currentVariant
  const currentVariantProps = currentVariant ? allVariants[currentVariant] : {};

  // Use current variant props if animating, otherwise base variant props
  let finalEffectiveVariantProps = effectiveVariantProps;
  if (currentVariant) {
    finalEffectiveVariantProps = mergeSizeWithAnimation(sizeProps, currentVariantProps);
  }

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
  if (size !== undefined) explicitProps.size = size;
  if (sizeKey !== undefined) explicitProps.sizeKey = sizeKey;
  if (onClick !== undefined) explicitProps.onClick = onClick;
  if (onMouseEnter !== undefined) explicitProps.onMouseEnter = onMouseEnter;
  if (onMouseLeave !== undefined) explicitProps.onMouseLeave = onMouseLeave;
  if (onMouseDown !== undefined) explicitProps.onMouseDown = onMouseDown;
  if (onMouseUp !== undefined) explicitProps.onMouseUp = onMouseUp;
  if (onKeyDown !== undefined) explicitProps.onKeyDown = onKeyDown;
  if (onKeyUp !== undefined) explicitProps.onKeyUp = onKeyUp;
  if (onKeyPress !== undefined) explicitProps.onKeyPress = onKeyPress;
  if (onFocus !== undefined) explicitProps.onFocus = onFocus;
  if (onBlur !== undefined) explicitProps.onBlur = onBlur;
  if (onHover !== undefined) explicitProps.onHover = onHover;
  if (animate !== undefined) explicitProps.animate = animate;
  if (iconStart !== undefined) explicitProps.iconStart = iconStart;
  if (iconEnd !== undefined) explicitProps.iconEnd = iconEnd;
  if (iconStartColor !== undefined) explicitProps.iconStartColor = iconStartColor;
  if (iconEndColor !== undefined) explicitProps.iconEndColor = iconEndColor;
  if (pointerEvents !== undefined) explicitProps.pointerEvents = pointerEvents;
  if (transform !== undefined) explicitProps.transform = transform;
  if (display !== undefined) explicitProps.display = display;
  if (tabIndex !== undefined) explicitProps.tabIndex = tabIndex;

  // Create effective variant props without animate if it's explicitly provided
  const filteredVariantProps = { ...finalEffectiveVariantProps };
  if (animate !== undefined) {
    delete filteredVariantProps.animate;
  }

  // Extract important props from variant
  const importantProps = filteredVariantProps.important || [];
  const variantPropsWithoutImportant = { ...filteredVariantProps };
  delete variantPropsWithoutImportant.important;

  // Merge props: explicit props override variant props, unless marked as important
  const mergedProps = { ...variantPropsWithoutImportant, ...explicitProps };
  
  // Special handling for autoLayout - merge objects instead of replacing
  if (explicitProps.autoLayout && variantPropsWithoutImportant.autoLayout) {
    mergedProps.autoLayout = { ...variantPropsWithoutImportant.autoLayout, ...explicitProps.autoLayout };
  }

  // For important props, variant wins over explicit
  importantProps.forEach((propName: string) => {
    if (variantPropsWithoutImportant[propName] !== undefined) {
      mergedProps[propName] = variantPropsWithoutImportant[propName];
    }
  });

  // Merge size properties into mergedProps and get size's autoLayout
  const sizeAutoLayout = mergeSizeProps(mergedProps);  // Extract merged props for use
  const {
    position: finalPosition,
    constraints: finalConstraints,
    autoLayout: finalAutoLayout,
    appearance: finalAppearance,
    typography: finalTypography,
    fill: finalFill,
    stroke: finalStroke,
    effects: finalEffects,
    cursor: finalCursorRaw,
    onClick: finalOnClick,
    onMouseEnter: finalOnMouseEnter,
    onMouseLeave: finalOnMouseLeave,
    onMouseDown: finalOnMouseDown,
    onMouseUp: finalOnMouseUp,
    onKeyDown: finalOnKeyDown,
    onKeyUp: finalOnKeyUp,
    onKeyPress: finalOnKeyPress,
    onFocus: finalOnFocus,
    onBlur: finalOnBlur,
    onHover: finalOnHover,
    animate: finalAnimate,
    iconStart: finalIconStart,
    iconEnd: finalIconEnd,
    iconStartColor: finalIconStartColor,
    iconEndColor: finalIconEndColor,
    pointerEvents: finalPointerEvents,
    transform: finalTransform,
    display: finalDisplay,
    tabIndex: finalTabIndex,
  } = mergedProps;

  // Merge size's autoLayout into finalAutoLayout if present
  let mergedAutoLayout = finalAutoLayout;
  if (sizeAutoLayout) {
    mergedAutoLayout = { ...finalAutoLayout, ...sizeAutoLayout };
  }

  // Handle cursor - it can be an object { type: 'pointer' } or string 'pointer'
  const finalCursor = typeof finalCursorRaw === 'object' && finalCursorRaw?.type 
    ? finalCursorRaw.type 
    : finalCursorRaw;

  // Use the same animation state for children
  const childCurrentVariant = currentVariant;

  // Apply child states to children with matching IDs
  const processedChildren = applyChildStates(children, childStates);

  // If currentVariant is set, inject it as a prop to children (if they accept 'variant')
  const finalChildren = injectVariant(processedChildren, childCurrentVariant);

  // Add icons as children if defined
  let childrenWithIcons = finalChildren;
  if (finalIconStart || finalIconEnd) {
    const iconChildren = [];
    if (finalIconStart) {
      iconChildren.push(React.createElement('div', { 
        key: 'iconStart', 
        style: { display: 'flex', alignItems: 'center', flexShrink: 0 } 
      }, finalIconStart));
    }
    iconChildren.push(...React.Children.toArray(finalChildren));
    if (finalIconEnd) {
      iconChildren.push(React.createElement('div', { 
        key: 'iconEnd', 
        style: { display: 'flex', alignItems: 'center', flexShrink: 0 } 
      }, finalIconEnd));
    }
    childrenWithIcons = iconChildren;
  }

  // Determine if this frame uses auto layout
  const hasAutoLayout = !!mergedAutoLayout && (mergedAutoLayout.flow === 'horizontal' || mergedAutoLayout.flow === 'vertical' || mergedAutoLayout.flow === 'grid');

  // Curved auto layout: distribute children along SVG path
  let curvedChildren = childrenWithIcons;
  if (mergedAutoLayout?.flow === 'curved' && Array.isArray(childrenWithIcons)) {
    curvedChildren = getCurvedLayoutChildren(childrenWithIcons, mergedAutoLayout).filter((c): c is React.ReactElement => !!c);
  }

  // Convert all frame props to CSS styles
  const finalStyles = convertFramePropsToStyles({
    position: finalPosition,
    constraints: finalConstraints,
    autoLayout: mergedAutoLayout,
    appearance: finalAppearance,
    typography: finalTypography,
    fill: finalFill,
    stroke: finalStroke,
    effects: finalEffects,
  }, hasAutoLayout);



  // Add cursor to styles
  if (finalCursor) {
    finalStyles.cursor = finalCursor;
  }

  // Add pointerEvents to styles
  if (finalPointerEvents) {
    finalStyles.pointerEvents = finalPointerEvents;
  }

  // Add transform to styles
  if (finalTransform) {
    finalStyles.transform = finalTransform;
  }

  // Add display to styles
  if (finalDisplay) {
    finalStyles.display = finalDisplay;
  }

  // Add size to styles if it's an object and doesn't have autoLayout
  const finalSize = mergedProps.size;
  if (finalSize && typeof finalSize === 'object' && !finalSize.autoLayout) {
    Object.assign(finalStyles, finalSize);
  }

  // Add transition for animations - apply when any animate configuration exists
  const hasAnimateConfig = effectiveAnimate || Object.values(allVariants).some(v => v.animate);
  if (hasAnimateConfig) {
    let transitionDuration = '0.2s';
    let transitionCurve = 'ease-in-out';

    // Use explicit animate duration/curve if provided
    if (effectiveAnimate) {
      transitionDuration = effectiveAnimate.duration || transitionDuration;
      transitionCurve = effectiveAnimate.curve || transitionCurve;
    }

    // Check if current variant matches a destination and use its duration/curve
    if (currentVariant) {
      const currentVariantProps = allVariants[currentVariant];
      if (currentVariantProps?.animate) {
        const variantAnimate = currentVariantProps.animate;
        transitionDuration = variantAnimate.duration || transitionDuration;
        transitionCurve = variantAnimate.curve || transitionCurve;
      }
    }

    finalStyles.transition = `all ${transitionDuration} ${transitionCurve}`;
  }

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
  if (mergedAutoLayout?.flow === 'freeform') {
    const hugDimensions = calculateHugDimensions(childrenWithIcons, mergedAutoLayout);
    return React.createElement(
      as,
      {
        ref,
        id,
        className,
        style: {
          ...finalStyles,
          // Only set position relative if not already absolutely positioned
          ...((!finalPosition?.x && !finalPosition?.y) && { position: 'relative' }),
          ...hugDimensions,
        },
        onClick: handleClick,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onKeyDown: finalOnKeyDown,
        onKeyUp: finalOnKeyUp,
        onKeyPress: finalOnKeyPress,
        onFocus: finalOnFocus,
        onBlur: finalOnBlur,
        tabIndex: finalTabIndex,
      },
      childrenWithIcons
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
      onKeyDown: finalOnKeyDown,
      onKeyUp: finalOnKeyUp,
      onKeyPress: finalOnKeyPress,
      onFocus: finalOnFocus,
      onBlur: finalOnBlur,
      tabIndex: finalTabIndex,
    },
    mergedAutoLayout?.flow === 'curved' ? curvedChildren : childrenWithIcons
  );
});

Frame.displayName = 'Frame';

// Export default for convenience
export default Frame;