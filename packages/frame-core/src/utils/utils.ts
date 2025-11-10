import React from 'react';
import { PositionProps, convertPositionProps } from '../position/position.props';
import { AutoLayoutProps, convertAutoLayoutProps } from '../layout/layout.props';
import { AppearanceProps, convertAppearanceProps } from '../appearance/appearance.props';
import { TypographyProps, convertTypographyProps } from '../typography/typography.props';
import { FillProps, convertFillProps } from '../appearance/fill.props';
import { StrokeProps, convertStrokeProps } from '../appearance/stroke.props';
import { EffectProps, convertEffectProps } from '../effects/effects.props';
import { MaskPropsInput, convertMaskProps } from '../mask/mask.props';
import { BooleanOperationProps, convertBooleanOperationProps } from '../booleanOperation/booleanOperation.props';
import { resolveColor, colorUtils } from '../../../../src/theme/colors';

//ALL CORE FRAME PROPS AND UTILITIES SHOULD GO IN THIS FILE
//PROPS SUCH AS POSITION, AUTO LAYOUT, APPEARANCE, FILL, STROKE, EFFECTS, ETC SHOULD BE IMPORTED FROM THEIR RESPECTIVE FILES


export interface FramePropsBase {
  position?: PositionProps;
  autoLayout?: AutoLayoutProps;
  appearance?: AppearanceProps;
  typography?: TypographyProps;
  fill?: FillProps;
  stroke?: StrokeProps;
  effects?: EffectProps;
  mask?: MaskPropsInput;
  booleanOperation?: BooleanOperationProps;
  style?: React.CSSProperties;
}

export interface ChildStateMap {
  [childId: string]: string;
}

export interface EventHandlers {
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

/**
 * Applies child states to children with matching IDs
 */
export const applyChildStates = (
  children: React.ReactNode,
  childStates?: ChildStateMap
): React.ReactNode => {
  if (!childStates) return children;

  const applyToChild = (child: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(child)) return child;
    const childId = child.props.id;
    const childState = childStates[childId];
    let newProps: any = { ...child.props };
    if (childId && childState) {
      newProps.state = childState;
    }
    // If child has a position prop, apply absolute positioning styles
    if (child.props.position) {
      const { x = 0, y = 0, rotation = 0 } = child.props.position;
      newProps.style = {
        ...(child.props.style || {}),
        position: 'absolute',
        left: x,
        top: y,
        transform: `rotate(${rotation}deg)`
      };
    } else if (child.props.autoLayout?.flow === 'freeform') {
      // For freeform, force absolute positioning if not already set
      newProps.style = {
        ...(child.props.style || {}),
        position: 'absolute',
      };
    }
    if (child.props.children) {
      newProps.children = React.Children.map(child.props.children, applyToChild);
    }
    return React.cloneElement(child, newProps);
  };

  return React.Children.map(children, applyToChild);
};

/**
 * Injects current variant into children that accept a 'variant' prop
 */
export const injectVariant = (
  children: React.ReactNode,
  currentVariant?: string
): React.ReactNode => {
  if (!currentVariant) return children;

  const injectToChild = (child: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(child)) return child;
    // Only inject if child accepts 'variant' prop and doesn't already have one
    if ('variant' in (child.props || {}) && !child.props.variant) {
      return React.cloneElement(child, { ...child.props, variant: currentVariant });
    }
    return child;
  };

  return React.Children.map(children, injectToChild);
};

/**
 * Composes event handlers, allowing animation handlers to take precedence but call originals
 */
export const composeEventHandlers = (
  originalHandlers: Partial<EventHandlers>,
  animationHandlers: Partial<EventHandlers>
): EventHandlers => {
  const composed: EventHandlers = {};

  // Handle each event type separately
  if (originalHandlers.onMouseEnter || animationHandlers.onMouseEnter) {
    const original = originalHandlers.onMouseEnter;
    const animation = animationHandlers.onMouseEnter;
    composed.onMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
      if (animation) animation(event);
      if (original) original(event);
    };
  }

  if (originalHandlers.onMouseLeave || animationHandlers.onMouseLeave) {
    const original = originalHandlers.onMouseLeave;
    const animation = animationHandlers.onMouseLeave;
    composed.onMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
      if (animation) animation(event);
      if (original) original(event);
    };
  }

  if (originalHandlers.onMouseDown || animationHandlers.onMouseDown) {
    const original = originalHandlers.onMouseDown;
    const animation = animationHandlers.onMouseDown;
    composed.onMouseDown = (event: React.MouseEvent<HTMLElement>) => {
      if (animation) animation(event);
      if (original) original(event);
    };
  }

  if (originalHandlers.onMouseUp || animationHandlers.onMouseUp) {
    const original = originalHandlers.onMouseUp;
    const animation = animationHandlers.onMouseUp;
    composed.onMouseUp = (event: React.MouseEvent<HTMLElement>) => {
      if (animation) animation(event);
      if (original) original(event);
    };
  }

  if (originalHandlers.onKeyDown || animationHandlers.onKeyDown) {
    const original = originalHandlers.onKeyDown;
    const animation = animationHandlers.onKeyDown;
    composed.onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      if (animation) animation(event);
      if (original) original(event);
    };
  }

  return composed;
};

/**
 * Converts all frame props to CSS styles, handling special cases like gradient strokes
 */
export const convertFramePropsToStyles = (
  props: FramePropsBase,
  hasAutoLayout: boolean
): React.CSSProperties => {
  const {
    position,
    autoLayout,
    appearance,
    typography,
    fill,
    stroke,
    effects,
    mask,
    booleanOperation,
    style: overrideStyle
  } = props;

  // Convert Figma props to CSS styles
  const positionStyles = convertPositionProps(position || {}, hasAutoLayout);
  const autoLayoutStyles = convertAutoLayoutProps(autoLayout || {});
  const appearanceStyles = convertAppearanceProps(appearance || {});
  const typographyStyles = convertTypographyProps(typography || {});
  const fillStyles = convertFillProps(fill || {}, false);
  const strokeStyles = convertStrokeProps(stroke || {});
  const effectStyles = convertEffectProps(effects || {});
  const maskStyles = convertMaskProps(mask);
  const booleanOperationStyles = convertBooleanOperationProps(booleanOperation);

  // Check if we have a gradient stroke that needs special handling
  // Handle both single stroke object and array of strokes
  const strokeObj = Array.isArray(stroke) ? stroke[0] : stroke;
  const hasGradientStroke = strokeObj?.type === 'gradient' && strokeObj.stops && strokeObj.stops.length > 0;

  // Base styles for frames
  const baseStyles: React.CSSProperties = {
    boxSizing: 'border-box',
    // Only set position: relative if not using absolute or fixed positioning
    ...((!position?.x && !position?.y && !position?.type) && { position: 'relative' })
  };

  // For gradient strokes, combine fill and stroke backgrounds using CSS background-clip technique
  if (hasGradientStroke) {
    const strokeWeight = strokeObj.weight || 1;
    // Create gradient stops
    const gradientStops = strokeObj.stops!.map((stop: any) => {
      const color = resolveColor(stop.color);
      const opacity = stop.opacity !== undefined ? stop.opacity : 1;
      const rgbaColor = opacity < 1 ? colorUtils.hexToRgba(color, opacity) : color;
      return `${rgbaColor} ${stop.position * 100}%`;
    }).join(', ');
    const angle = strokeObj.angle || 0;
    const gradientValue = `linear-gradient(${angle}deg, ${gradientStops})`;
    // Get the fill background - handle both background and backgroundColor
    let fillBackgroundValue = 'transparent';
    if (fillStyles.background && typeof fillStyles.background === 'string') {
      fillBackgroundValue = fillStyles.background;
    } else if (fillStyles.backgroundColor && typeof fillStyles.backgroundColor === 'string') {
      fillBackgroundValue = `linear-gradient(${fillStyles.backgroundColor}, ${fillStyles.backgroundColor})`;
    }
    // Combine backgrounds: fill in padding-box, gradient in border-box
    const combinedBackground = fillBackgroundValue === 'transparent'
      ? gradientValue
      : `${fillBackgroundValue} padding-box, ${gradientValue} border-box`;
    const combinedBackgroundClip = fillBackgroundValue === 'transparent'
      ? 'border-box'
      : 'padding-box, border-box';
    return {
      ...baseStyles,
      ...positionStyles,
      ...autoLayoutStyles,
      ...appearanceStyles,
      ...typographyStyles,
      ...effectStyles,
      ...overrideStyle,
      // Gradient stroke styles
      border: `${strokeWeight}px solid transparent`,
      background: combinedBackground,
      backgroundClip: combinedBackgroundClip,
    };
  } else {
    // Normal case - merge all styles
    return {
      ...baseStyles,
      ...positionStyles,
      ...autoLayoutStyles,
      ...appearanceStyles,
      ...fillStyles,
      ...strokeStyles,
      ...effectStyles,
      ...maskStyles,
      ...booleanOperationStyles,
      ...overrideStyle,
      ...typographyStyles // typographyStyles last so fontFamily always wins
    };
  }
};

/**
 * Calculates hug dimensions for freeform layout
 */
export const calculateHugDimensions = (
  children: React.ReactNode,
  autoLayout: AutoLayoutProps
): { width?: number; height?: number } => {
  if (autoLayout.width !== 'hug' && autoLayout.height !== 'hug') return {};

  let maxRight = 0;
  let maxBottom = 0;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const el = child as React.ReactElement<any>;
      const x = el.props.position?.x || 0;
      const y = el.props.position?.y || 0;
      // Prefer autoLayout.width/height, fallback to style.width/height, fallback to 0
      let w = 0;
      let h = 0;
      if (el.props.autoLayout?.width && typeof el.props.autoLayout.width === 'number') w = el.props.autoLayout.width;
      else if (el.props.style?.width) w = parseInt(el.props.style.width, 10) || 0;
      if (el.props.autoLayout?.height && typeof el.props.autoLayout.height === 'number') h = el.props.autoLayout.height;
      else if (el.props.style?.height) h = parseInt(el.props.style.height, 10) || 0;
      maxRight = Math.max(maxRight, x + w);
      maxBottom = Math.max(maxBottom, y + h);
    }
  });

  return {
    ...(autoLayout.width === 'hug' ? { width: maxRight } : {}),
    ...(autoLayout.height === 'hug' ? { height: maxBottom } : {})
  };
};