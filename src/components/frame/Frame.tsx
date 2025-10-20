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
import { resolveColor, colorUtils } from '../../theme/colors';

interface FrameProps {
  id?: string;
  as?: keyof JSX.IntrinsicElements;
  childStates?: { [childId: string]: string };
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
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Frame = React.forwardRef<HTMLElement, FrameProps>((props, ref) => {
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
  } = props;

  // Apply child states to children with matching IDs
  const applyChildStates = (child: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(child)) return child;
    const childId = child.props.id;
    const childState = childStates?.[childId];
    if (childId && childState) {
      return React.cloneElement(child, {
        ...child.props,
        state: childState,
      });
    }
    if (child.props.children) {
      const processedChildren = React.Children.map(child.props.children, applyChildStates);
      return React.cloneElement(child, { children: processedChildren });
    }
    return child;
  };

  const finalChildren = React.Children.map(children, applyChildStates);

  // Determine if this frame uses auto layout
  const hasAutoLayout = !!autoLayout && (autoLayout.flow === 'horizontal' || autoLayout.flow === 'vertical');

  // Convert Figma props to CSS styles
  const positionStyles = convertPositionProps(position || {}, hasAutoLayout);
  const autoLayoutStyles = convertAutoLayoutProps(autoLayout || {});
  const appearanceStyles = convertAppearanceProps(appearance || {});
  const typographyStyles = convertTypographyProps(typography || {});
  const fillStyles = convertFillProps(fill || {}, false);
  const strokeStyles = convertStrokeProps(stroke || {});
  const effectStyles = convertEffectProps(effects || {});

  // Check if we have a gradient stroke that needs special handling
  const hasGradientStroke = stroke?.type === 'gradient' && stroke.stops && stroke.stops.length > 0;

  // Base styles for frames
  const baseStyles: React.CSSProperties = {
    boxSizing: 'border-box',
    // Only set position: relative if not using absolute positioning
    ...((!position?.x && !position?.y && !constraints) && { position: 'relative' })
  };

  // For gradient strokes, combine fill and stroke backgrounds using CSS background-clip technique
  let finalStyles: React.CSSProperties;
  if (hasGradientStroke) {
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
      ...(cursor && { cursor }),
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
      ...(cursor && { cursor }),
      ...overrideStyle
    };
  }

  return React.createElement(
    as,
    {
      ref,
      id,
      className,
      style: finalStyles,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
    },
    finalChildren
  );
});

Frame.displayName = 'Frame';

// Export the props type for external use
export type { FrameProps };

// Export default for convenience
export default Frame;