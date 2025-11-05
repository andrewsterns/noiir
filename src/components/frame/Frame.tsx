import React, { useId as reactUseId } from 'react';
import { PositionProps } from '../../../packages/frame-core/src/position/position.props';
import { AutoLayoutProps } from '../../../packages/frame-core/src/layout/layout.props';
import { AppearanceProps } from '../../../packages/frame-core/src/appearance/appearance.props';
import { TypographyProps } from '../../../packages/frame-core/src/typography/typography.props';
import { FillProps } from '../../../packages/frame-core/src/appearance/fill.props';
import { StrokeProps } from '../../../packages/frame-core/src/appearance/stroke.props';
import { CursorProps } from '../../../packages/frame-core/src/appearance/cursor.props';
import { EffectProps } from '../../../packages/frame-core/src/effects/effects.props';
import { EventProps } from '../../../packages/frame-core/src/events/event.props';
import { samplePathPoints } from '../../../packages/frame-core/src/layout/svgPathUtils';
import { getCurvedLayoutChildren } from '../../../packages/frame-core/src/layout/curvedLayout';
import { mergeSizeProps } from '../../../packages/frame-core/src/variants/size.props';
import { mergeVariantAndSize, mergeSizeWithAnimation, FrameVariantConfig } from '../../../packages/frame-core/src/variants/variants.props';
import {
  applyChildStates,
  injectVariant,
  composeEventHandlers,
  convertFramePropsToStyles,
  calculateHugDimensions,
  ChildStateMap
} from '../../../packages/frame-core/src';
import { useTransitionContext, Transitions, TransitionProvider, parseTime } from '../../../packages/frame-core/src/transition/transition.props';

// FRAME PROPS ARE PULLED IN FROM THEIR RESPECTIVE FILES
// ROOT 'CORE' PROPS ARE PULLED IN FROM UTILS FILE


export interface FrameProps extends EventProps {
  id?: string;
  as?: keyof JSX.IntrinsicElements;
  childStates?: { [childId: string]: string };
  position?: PositionProps;
  autoLayout?: AutoLayoutProps;
  appearance?: AppearanceProps;
  typography?: TypographyProps;
  fill?: FillProps;
  stroke?: StrokeProps;
  effects?: EffectProps;
  cursor?: CursorProps | CursorProps['type'];
  children?: React.ReactNode;
  className?: string;
  onHover?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  iconStartColor?: string;
  iconEndColor?: string;
  size?: FrameVariantConfig | string;
  variant?: FrameVariantConfig | string;
  variants?: Record<string, FrameVariantConfig> | Record<string, any>;
  sizes?: Record<string, any>;
  pointerEvents?: string;
  transitions?: Transitions;

  display?: string;
  type?: string;
  zIndex?: number;
  [key: `variant-${string}`]: any; // Allow variant-* properties
}

// Add the missing Frame component definition
const FrameInner = React.forwardRef<HTMLElement, FrameProps>(function Frame(props, ref) {
  const {
    as = 'div',
    id,
    childStates,
    position,
    autoLayout,
    appearance,
    typography,
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
    onInput,
    onChange,
    value,
    placeholder,
    disabled,
    autoFocus,
    onHover,
    iconStart,
    iconEnd,
    iconStartColor,
    iconEndColor,
    size,
    variant,
    variants: variantsProp,
    sizes: sizesProp,
    pointerEvents,
    transitions,

    display,
    type,
    tabIndex,
    contentEditable,
    suppressContentEditableWarning,
    ...otherProps
  } = props;

  // Generate unique ID if not provided
  const generatedId = reactUseId();
  const frameId = id || `frame-${generatedId}`;

  // Collect variant configurations from props starting with 'variant-' and variants prop
  const variants: Record<string, any> = { ...(variantsProp || {}) };
  Object.keys(otherProps).forEach(key => {
    if (key.startsWith('variant-')) {
      const variantName = key.slice(8); // Remove 'variant-' prefix
      variants[variantName] = otherProps[key as keyof typeof otherProps];
    }
  });

  const sizes: Record<string, any> = { ...(sizesProp || {}) };

  // Transition context
  let transitionContext: ReturnType<typeof useTransitionContext> | null = null;
  try {
    transitionContext = useTransitionContext();
  } catch (e) {
    // No transition context
  }

  const registerFrameRef = React.useRef(transitionContext?.registerFrame);
  const unregisterFrameRef = React.useRef(transitionContext?.unregisterFrame);
  const registerTransitionsRef = React.useRef(transitionContext?.registerTransitions);
  const unregisterTransitionsRef = React.useRef(transitionContext?.unregisterTransitions);

  React.useEffect(() => {
    registerFrameRef.current = transitionContext?.registerFrame;
    unregisterFrameRef.current = transitionContext?.unregisterFrame;
    registerTransitionsRef.current = transitionContext?.registerTransitions;
    unregisterTransitionsRef.current = transitionContext?.unregisterTransitions;
  }, [transitionContext]);

  const effectiveVariant = frameId && transitionContext && transitionContext.getVisualVariant(frameId) !== '' ? transitionContext.getVisualVariant(frameId) : variant;

  if (frameId) console.log('Frame', frameId, 'effectiveVariant:', effectiveVariant);

  // Register frame and transitions
  React.useEffect(() => {
    if (registerFrameRef.current && unregisterFrameRef.current && frameId) {
      const initialVariant = typeof variant === 'string' ? variant : '';
      registerFrameRef.current(frameId, initialVariant);
      return () => {
        unregisterFrameRef.current!(frameId);
      };
    }
  }, [frameId, variant]);

  React.useEffect(() => {
    if (registerTransitionsRef.current && unregisterTransitionsRef.current && transitions && frameId) {
      // For component-level transitions, set the sourceId to this component's id
      const componentTransitions = transitions.map(t => ({ ...t, sourceId: t.sourceId || frameId }));
      registerTransitionsRef.current(componentTransitions);
      return () => {
        unregisterTransitionsRef.current!(componentTransitions);
      };
    }
  }, [transitions, frameId]);

  // Collect variant configurations from props starting with 'variant-' and variants prop

  // Get animate prop from variant if it exists, otherwise use explicit animate
  const variantProps = typeof effectiveVariant === 'string' ? (variants[effectiveVariant] || {}) : (effectiveVariant || {});
  const sizeProps = typeof size === 'string' ? (sizes[size] || {}) : (size || {});
  
  // Deep merge variant and size props
  const effectiveVariantProps = mergeVariantAndSize(variantProps, sizeProps);
  
  // Use the animation logic hook
  const allVariants = { ...variants, ...sizes };
  const currentVariant = undefined;
  const eventHandlers = {};

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
  if (autoLayout !== undefined) explicitProps.autoLayout = autoLayout;
  if (appearance !== undefined) explicitProps.appearance = appearance;
  if (typography !== undefined) explicitProps.typography = typography;
  if (fill !== undefined) explicitProps.fill = fill;
  if (stroke !== undefined) explicitProps.stroke = stroke;
  if (effects !== undefined) explicitProps.effects = effects;
  if (cursor !== undefined) explicitProps.cursor = cursor;
  if (size !== undefined) explicitProps.size = size;
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
  if (onInput !== undefined) explicitProps.onInput = onInput;
  if (onChange !== undefined) explicitProps.onChange = onChange;
  if (value !== undefined) explicitProps.value = value;
  if (placeholder !== undefined) explicitProps.placeholder = placeholder;
  if (disabled !== undefined) explicitProps.disabled = disabled;
  if (autoFocus !== undefined) explicitProps.autoFocus = autoFocus;
  if (onHover !== undefined) explicitProps.onHover = onHover;
  if (iconStart !== undefined) explicitProps.iconStart = iconStart;
  if (iconEnd !== undefined) explicitProps.iconEnd = iconEnd;
  if (iconStartColor !== undefined) explicitProps.iconStartColor = iconStartColor;
  if (iconEndColor !== undefined) explicitProps.iconEndColor = iconEndColor;
  if (pointerEvents !== undefined) explicitProps.pointerEvents = pointerEvents;
  if (display !== undefined) explicitProps.display = display;
  if (tabIndex !== undefined) explicitProps.tabIndex = tabIndex;
  if (type !== undefined) explicitProps.type = type;

  // Create effective variant props without animate if it's explicitly provided
  const filteredVariantProps = { ...finalEffectiveVariantProps };

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
    onInput: finalOnInput,
    onChange: finalOnChange,
    value: finalValue,
    placeholder: finalPlaceholder,
    disabled: finalDisabled,
    autoFocus: finalAutoFocus,
    onHover: finalOnHover,
    iconStart: finalIconStart,
    iconEnd: finalIconEnd,
    iconStartColor: finalIconStartColor,
    iconEndColor: finalIconEndColor,
    pointerEvents: finalPointerEvents,
    transform: finalTransform,
    display: finalDisplay,
    tabIndex: finalTabIndex,
    contentEditable: finalContentEditable,
    suppressContentEditableWarning: finalSuppressContentEditableWarning,
    type: finalType,
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

  // Collect transition properties for CSS transitions
  const transitionProps = React.useMemo(() => {
    if (!transitionContext || !frameId) return null;

    // Find transitions that target this component
    const relevantTransitions = transitionContext.getTransitionsForFrame(frameId);

    if (!relevantTransitions || relevantTransitions.length === 0) return null;

    // Use the first transition's animation properties (could be enhanced to merge multiple)
    const transition = relevantTransitions[0];

    const duration = transition.duration ? parseTime(transition.duration) + 'ms' : '300ms';
    const delay = transition.delay ? parseTime(transition.delay) + 'ms' : '0ms';
    const curve = transition.curve || 'ease';

    console.log(`Frame ${frameId} applying CSS transition:`, {
      duration,
      delay,
      curve,
      transition: `all ${duration} ${curve} ${delay}`
    });

    return { duration, delay, curve };
  }, [transitionContext, frameId]);

  // Apply alignment-based transforms to children for smooth animation
  let alignedChildren = finalChildren;
  if (mergedAutoLayout?.alignment && mergedAutoLayout?.flow === 'vertical') {
    const alignment = mergedAutoLayout.alignment;
    
    let top: string | undefined;
    let left: string | undefined;
    let transform: string;
    
    if (alignment === 'topLeft') {
      top = '0';
      left = '0';
      transform = 'translate(0, 0)';
    } else if (alignment === 'topCenter') {
      top = '0';
      left = '50%';
      transform = 'translateX(-50%)';
    } else if (alignment === 'topRight') {
      top = '0';
      left = '100%';
      transform = 'translateX(-100%)';
    } else if (alignment === 'centerLeft') {
      top = '50%';
      left = '0';
      transform = 'translateY(-50%)';
    } else if (alignment === 'center') {
      top = '50%';
      left = '50%';
      transform = 'translate(-50%, -50%)';
    } else if (alignment === 'centerRight') {
      top = '50%';
      left = '100%';
      transform = 'translate(-100%, -50%)';
    } else if (alignment === 'bottomLeft') {
      top = '100%';
      left = '0';
      transform = 'translateY(-100%)';
    } else if (alignment === 'bottomCenter') {
      top = '100%';
      left = '50%';
      transform = 'translate(-50%, -100%)';
    } else if (alignment === 'bottomRight') {
      top = '100%';
      left = '100%';
      transform = 'translate(-100%, -100%)';
    } else if (alignment === 'top') {
      top = '0';
      transform = 'translateY(0)';
    } else if (alignment === 'bottom') {
      top = '100%';
      transform = 'translateY(-100%)';
    } else if (alignment === 'left') {
      left = '0';
      transform = 'translateX(0)';
    } else if (alignment === 'right') {
      left = '100%';
      transform = 'translateX(-100%)';
    }
    
    if (top !== undefined || left !== undefined) {
      alignedChildren = React.Children.map(finalChildren, (child, index) => {
        if (React.isValidElement(child)) {
          const transitionStr = transitionProps 
            ? `${top ? `top ${transitionProps.duration} ${transitionProps.curve} ${transitionProps.delay}, ` : ''}${left ? `left ${transitionProps.duration} ${transitionProps.curve} ${transitionProps.delay}, ` : ''}transform ${transitionProps.duration} ${transitionProps.curve} ${transitionProps.delay}`
            : undefined;
          
          return React.cloneElement(child, {
            ...child.props,
            style: {
              ...child.props.style,
              position: 'absolute',
              ...(top && { top }),
              ...(left && { left }),
              transform,
              ...(transitionStr && { transition: transitionStr })
            }
          });
        }
        return child;
      });
    }
  }

  // Add icons as children if defined
  let childrenWithIcons = alignedChildren;
  if (finalIconStart || finalIconEnd) {
    const iconChildren = [];
    if (finalIconStart) {
      iconChildren.push(React.createElement('div', { 
        key: 'iconStart', 
        style: { display: 'flex', alignItems: 'center', flexShrink: 0 } 
      }, finalIconStart));
    }
    iconChildren.push(...React.Children.toArray(alignedChildren));
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
    autoLayout: mergedAutoLayout,
    appearance: finalAppearance,
    typography: finalTypography,
    fill: finalFill,
    stroke: finalStroke,
    effects: finalEffects,
  }, hasAutoLayout);

  // Add zIndex to styles if provided
  if (props.zIndex !== undefined) {
    finalStyles.zIndex = props.zIndex;
  }

  // If this frame has alignment-based positioning for children, ensure it's positioned relatively
  // BUT don't override if position is already fixed or absolute
  if (mergedAutoLayout?.alignment && mergedAutoLayout?.flow === 'vertical' && !finalStyles.position) {
    finalStyles.position = 'relative';
  }



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

  // Add transition to styles if transition props exist
  if (transitionProps) {
    finalStyles.transition = `all ${transitionProps.duration} ${transitionProps.curve} ${transitionProps.delay}`;
  }

  // Compose event handlers: Frame's animation handlers take precedence but call original handlers too
  const composedHandlers = composeEventHandlers({
    onMouseEnter: finalOnMouseEnter,
    onMouseLeave: finalOnMouseLeave,
    onMouseDown: finalOnMouseDown,
    onMouseUp: finalOnMouseUp,
    onKeyDown: finalOnKeyDown
  }, eventHandlers || {});

  const handleClick = (e: any) => {
    if (transitionContext && frameId) {
      transitionContext.emitEvent(frameId, 'click', e);
    }
    finalOnClick?.(e);
  };
  const handleMouseEnter = (e: any) => {
    console.log('[Frame] MouseEnter on', frameId, 'with currentVariant:', currentVariant);
    if (transitionContext && frameId) {
      transitionContext.emitEvent(frameId, 'mouseEnter');
    }
    composedHandlers.onMouseEnter?.(e);
  };
  const handleMouseLeave = (e: any) => {
    console.log('[Frame] MouseLeave on', frameId, 'with currentVariant:', currentVariant);
    if (transitionContext && frameId) {
      transitionContext.emitEvent(frameId, 'mouseLeave');
    }
    composedHandlers.onMouseLeave?.(e);
  };
  const handleMouseDown = (e: any) => {
    if (transitionContext && frameId) {
      transitionContext.emitEvent(frameId, 'mouseDown');
    }
    composedHandlers.onMouseDown?.(e);
  };
  const handleMouseUp = (e: any) => {
    if (transitionContext && frameId) {
      transitionContext.emitEvent(frameId, 'mouseUp');
    }
    composedHandlers.onMouseUp?.(e);
  };
  const handleKeyDown = (e: any) => {
    if (transitionContext && frameId) transitionContext.emitEvent(frameId, 'key', e);
    composedHandlers.onKeyDown?.(e);
  };

  // For freeform, wrap children in a relative container to anchor absolutely positioned children
  if (mergedAutoLayout?.flow === 'freeform') {
    const hugDimensions = calculateHugDimensions(childrenWithIcons, mergedAutoLayout);
    return React.createElement(
      as,
      {
        ref,
        id: frameId,
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
        onKeyDown: handleKeyDown,
        onKeyUp: finalOnKeyUp,
        onKeyPress: finalOnKeyPress,
        onFocus: finalOnFocus,
        onBlur: finalOnBlur,
        onInput: finalOnInput,
        onChange: finalOnChange,
        value: finalValue,
        placeholder: finalPlaceholder,
        disabled: finalDisabled,
        tabIndex: finalTabIndex,
        contentEditable: finalContentEditable,
        suppressContentEditableWarning: finalSuppressContentEditableWarning,
        type: finalType,
      },
      childrenWithIcons
    );
  }
  return React.createElement(
    as,
    {
      ref,
      id: frameId,
      className,
      style: finalStyles,
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onKeyDown: handleKeyDown,
      onKeyUp: finalOnKeyUp,
      onKeyPress: finalOnKeyPress,
      onFocus: finalOnFocus,
      onBlur: finalOnBlur,
      onInput: finalOnInput,
      onChange: finalOnChange,
      value: finalValue,
      placeholder: finalPlaceholder,
      disabled: finalDisabled,
      tabIndex: finalTabIndex,
      contentEditable: finalContentEditable,
      suppressContentEditableWarning: finalSuppressContentEditableWarning,
      type: finalType,
    },
    mergedAutoLayout?.flow === 'curved' ? curvedChildren : childrenWithIcons
  );
});

export const Frame = React.forwardRef<HTMLElement, FrameProps>(function Frame(props, ref) {
  let hasContext = false;
  try {
    useTransitionContext();
    hasContext = true;
  } catch (e) {
    // No context
  }
  const isTransitionRoot = !!props.transitions && !hasContext;
  if (isTransitionRoot) {
    return <TransitionProvider><FrameInner {...props} ref={ref} /></TransitionProvider>;
  } else {
    return <FrameInner {...props} ref={ref} />;
  }
});

Frame.displayName = 'Frame';

export default Frame;