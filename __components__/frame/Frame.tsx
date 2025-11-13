import React, { useId as reactUseId } from 'react';
import { PositionProps } from '@noiir/frame-core/position/position.props';
import { AutoLayoutProps } from '@noiir/frame-core/layout/layout.props';
import { AppearanceProps } from '@noiir/frame-core/appearance/appearance.props';
import { TypographyProps } from '@noiir/frame-core/typography/typography.props';
import { FillProps, createImageFillStyles } from '@noiir/frame-core/appearance/fill.props';
import { StrokeProps } from '@noiir/frame-core/appearance/stroke.props';
import { CursorProps } from '@noiir/frame-core/appearance/cursor.props';
import { EffectProps } from '@noiir/frame-core/effects/effects.props';
import { EventProps } from '@noiir/frame-core/events/event.props';
import { MaskPropsInput } from '@noiir/frame-core/mask/mask.props';
import { BooleanOperationProps } from '@noiir/frame-core/booleanOperation/booleanOperation.props';
import { resolveColor } from '@variants/theme/colors';
import { samplePathPoints } from '@noiir/frame-core/layout/svgPathUtils';
import { getCurvedLayoutChildren } from '@noiir/frame-core/layout/curvedLayout';
import {
  applyChildStates,
  injectVariant,
  composeEventHandlers,
  convertFramePropsToStyles,
  calculateHugDimensions,
  ChildStateMap,
  mergeSizeProps,
  mergeVariantAndSize,
  mergeSizeWithAnimation,
  FrameVariantConfig,
  useAnimateContext,
  Animate,
  AnimateProvider,
  parseTime,
  useParent,
  ParentContext
} from '@noiir/frame-core';

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
  mask?: MaskPropsInput;
  booleanOperation?: BooleanOperationProps;
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
  animate?: Animate;

  display?: string;
  type?: string;
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
    mask,
    booleanOperation,
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
    animate,

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

  // Animate context
  let animateContext: ReturnType<typeof useAnimateContext> | null = null;
  try {
    animateContext = useAnimateContext();
  } catch (e) {
    // No animate context
  }

  const parent = useParent();

  const registerFrameRef = React.useRef(animateContext?.registerFrame);
  const unregisterFrameRef = React.useRef(animateContext?.unregisterFrame);
  const registerAnimationsRef = React.useRef(animateContext?.registerAnimations);
  const unregisterAnimationsRef = React.useRef(animateContext?.unregisterAnimations);

  React.useEffect(() => {
    registerFrameRef.current = animateContext?.registerFrame;
    unregisterFrameRef.current = animateContext?.unregisterFrame;
    registerAnimationsRef.current = animateContext?.registerAnimations;
    unregisterAnimationsRef.current = animateContext?.unregisterAnimations;
  }, [animateContext]);

  // State to track current variant for re-rendering when animations change it
  const [currentVariantState, setCurrentVariantState] = React.useState(variant);

  React.useEffect(() => {
    if (animateContext && frameId) {
      const visualVariant = animateContext.getVisualVariant(frameId);
      const logicalVariant = animateContext.getVariant(frameId);
      const newVariant = visualVariant !== '' ? visualVariant : logicalVariant !== '' ? logicalVariant : variant;
      if (newVariant !== currentVariantState) {
        setCurrentVariantState(newVariant);
      }
    }
  }, [animateContext, frameId, variant, currentVariantState]);

  const effectiveVariant = currentVariantState;

  // Register frame and animate
  React.useEffect(() => {
    if (registerFrameRef.current && unregisterFrameRef.current && frameId) {
      const initialVariant = typeof variant === 'string' ? variant : '';
      console.log('[Frame] Registering frame:', frameId, 'with parent:', parent, 'initialVariant:', initialVariant);
      registerFrameRef.current(frameId, parent, initialVariant);
      return () => {
        console.log('[Frame] Unregistering frame:', frameId);
        unregisterFrameRef.current!(frameId);
      };
    }
  }, [frameId, variant, parent]);

  React.useEffect(() => {
    if (registerAnimationsRef.current && unregisterAnimationsRef.current && animate && frameId) {
      registerAnimationsRef.current(frameId, animate);
      return () => {
        unregisterAnimationsRef.current!(frameId, animate);
      };
    }
  }, [animate, frameId]);

  // Collect variant configurations from props starting with 'variant-' and variants prop

  // Get animate prop from variant if it exists, otherwise use explicit animate
  const variantProps = typeof effectiveVariant === 'string' ? (variants[effectiveVariant] || {}) : (effectiveVariant || {});
  const sizeProps = typeof size === 'string' ? (sizes[size] || {}) : (size || {});
  
  // Deep merge variant and size props
  const effectiveVariantProps = mergeVariantAndSize(variantProps, sizeProps);
  
  // Use the animation logic hook
  const allVariants = { ...variants, ...sizes };
  const eventHandlers = {};

  // Get the current variant props based on childCurrentVariant
  const currentVariantProps = {};

  // Use current variant props if animating, otherwise base variant props
  let finalEffectiveVariantProps = effectiveVariantProps;

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
  const childCurrentVariant = undefined;

  // Apply child states to children with matching IDs
  const processedChildren = applyChildStates(children, childStates);

  // If currentVariant is set, inject it as a prop to children (if they accept 'variant')
  const finalChildren = injectVariant(processedChildren, childCurrentVariant);

  // Collect animation properties for CSS animate
  const animateProps = React.useMemo(() => {
    if (animateContext && frameId) {
      const props = animateContext.getAnimationProps(frameId);
      console.log('[Frame]', frameId, 'animateProps:', props);
      return props;
    }
    return null;
  }, [animateContext, frameId]);

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
          const animatetr = `transform 300ms ease 0ms`;
          
          return React.cloneElement(child, {
            ...child.props,
            style: {
              ...child.props.style,
              position: 'absolute',
              ...(top && { top }),
              ...(left && { left }),
              transform,
              ...(animatetr && { transition: animatetr })
            }
          });
        }
        return child;
      });
    }
  }

  // Add fill element if it's a React element or image with opacity
  let childrenWithFillElement = alignedChildren;
  const fillElement = React.useMemo(() => {
    if (!finalFill) {
      return null;
    }
    
    const fillArray = Array.isArray(finalFill) ? finalFill : [finalFill];
    
    // Find first fill that needs special rendering (React elements or images with opacity)
    for (const fill of fillArray) {
      if (fill.type === 'image' && fill.image) {
        const hasOpacity = fill.opacity !== undefined && fill.opacity < 1;
        const isReactElement = fill.image.element || (fill.image.src && typeof fill.image.src !== 'string');
        
        if (isReactElement && React.isValidElement(isReactElement)) {
          // Handle React elements (existing logic)
          const fillColor = fill.color ? resolveColor(fill.color) : undefined;
          const elementProps = isReactElement.props as any;
          
          return React.cloneElement(isReactElement, {
            ...elementProps,
            style: {
              ...(elementProps.style || {}),
              ...(fillColor && { color: fillColor }),
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,
              ...(hasOpacity && { opacity: fill.opacity })
            }
          });
        } else if (hasOpacity && fill.image.src && typeof fill.image.src === 'string') {
          // Handle string images with opacity - create a background div
          const imageStyles = createImageFillStyles(fill.image);
          
          return React.createElement('div', {
            style: {
              ...imageStyles,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,  // Same level as children, but appears first in DOM
              opacity: fill.opacity
            }
          });
        }
      }
    }
    return null;
  }, [finalFill, frameId]);

  if (fillElement) {
    // Wrap children to ensure they appear above the background fill element
    const wrappedChildren = React.Children.map(alignedChildren, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...child.props,
          style: {
            ...child.props.style,
            position: child.props.style?.position || 'relative',
            zIndex: child.props.style?.zIndex !== undefined ? child.props.style.zIndex : 1
          }
        });
      }
      return child;
    });
    
    childrenWithFillElement = [
      fillElement,
      ...(wrappedChildren ? React.Children.toArray(wrappedChildren) : [])
    ];
  }

  // Add icons as children if defined
  let childrenWithIcons = childrenWithFillElement;
  if (finalIconStart || finalIconEnd) {
    const iconChildren = [];
    if (finalIconStart) {
      iconChildren.push(React.createElement('div', { 
        key: 'iconStart', 
        style: { display: 'flex', alignItems: 'center', flexShrink: 0 } 
      }, finalIconStart));
    }
    iconChildren.push(...React.Children.toArray(childrenWithFillElement));
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
    mask: mask,
    booleanOperation: booleanOperation,
  }, hasAutoLayout);

  // If this frame has alignment-based positioning for children, ensure it's positioned relatively
  // BUT don't override if position is already fixed or absolute
  if (mergedAutoLayout?.alignment && mergedAutoLayout?.flow === 'vertical' && !finalStyles.position) {
    finalStyles.position = 'relative';
  }

  // If this frame has a fill element (like image with opacity), ensure it's positioned relatively
  if (fillElement && !finalStyles.position) {
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
  if (animateProps) {
    const { duration = '0s', delay = '0s', curve = 'ease' } = animateProps;
    finalStyles.transition = `all ${duration} ${curve} ${delay}`;
    console.log('[Frame]', frameId, 'applied transition:', finalStyles.transition);
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
    console.log('[Frame] handleClick called for frameId:', frameId, 'animateContext exists:', !!animateContext);
    if (animateContext && frameId) {
      console.log('[Frame] Emitting click event for frameId:', frameId);
      animateContext.emitEvent(frameId, 'click', e);
    }
    finalOnClick?.(e);
  };
  const handleMouseEnter = (e: any) => {
    if (animateContext && frameId) {
      animateContext.emitEvent(frameId, 'mouseEnter');
    }
    composedHandlers.onMouseEnter?.(e);
  };
  const handleMouseLeave = (e: any) => {
    if (animateContext && frameId) {
      animateContext.emitEvent(frameId, 'mouseLeave');
    }
    composedHandlers.onMouseLeave?.(e);
  };
  const handleMouseDown = (e: any) => {
    if (animateContext && frameId) {
      animateContext.emitEvent(frameId, 'mouseDown');
    }
    composedHandlers.onMouseDown?.(e);
  };
  const handleMouseUp = (e: any) => {
    if (animateContext && frameId) {
      animateContext.emitEvent(frameId, 'mouseUp');
    }
    composedHandlers.onMouseUp?.(e);
  };
  const handleFocus = (e: any) => {
    if (animateContext && frameId) {
      animateContext.emitEvent(frameId, 'focus');
    }
    finalOnFocus?.(e);
  };
  const handleBlur = (e: any) => {
    if (animateContext && frameId) {
      animateContext.emitEvent(frameId, 'blur');
    }
    finalOnBlur?.(e);
  };
  const handleKeyDown = (e: any) => {
    if (animateContext && frameId) animateContext.emitEvent(frameId, 'key', e);
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
        onFocus: handleFocus,
        onBlur: handleBlur,
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
      <ParentContext.Provider value={frameId}>
        {childrenWithIcons}
      </ParentContext.Provider>
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
      onFocus: handleFocus,
      onBlur: handleBlur,
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
    <ParentContext.Provider value={frameId}>
      {mergedAutoLayout?.flow === 'curved' ? curvedChildren : childrenWithIcons}
    </ParentContext.Provider>
  );
});

export const Frame = React.forwardRef<HTMLElement, FrameProps>(function Frame(props, ref) {
  let hasContext = false;
  try {
    useAnimateContext();
    hasContext = true;
  } catch (e) {
    // No context
  }
  console.log('[Frame] Frame id:', props.id, 'has animate:', !!props.animate, 'hasContext:', hasContext, 'isAnimateRoot:', !!props.animate && !hasContext);
  const isAnimateRoot = !!props.animate && !hasContext;
  if (isAnimateRoot) {
    return <AnimateProvider><FrameInner {...props} ref={ref} /></AnimateProvider>;
  } else {
    return <FrameInner {...props} ref={ref} />;
  }
});

Frame.displayName = 'Frame';

export default Frame;
