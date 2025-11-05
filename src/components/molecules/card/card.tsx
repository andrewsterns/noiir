import React, { Children } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { Avatar } from '../../atoms/avatar/avatar';
import { ExtendVariant } from '../../../../packages/frame-core/src/variants/variants.props';

/**
 * Card Component
 *
 * This component extends Frame and should leverage Frame's built-in props as much as possible.
 * Prefer using Frame props (appearance, typography, fill, stroke, effects, cursor, etc.)
 * instead of creating custom props for styling/behavior.
 *
 * For animations and state transitions, use CARD_VARIANTS with Frame's animate prop
 * instead of handling hover/click states in component logic.
 *
 * Example: animate={{ hover: { variant: 'defaultHover' }, click: { variant: 'elevated' } }}
 *
 * Only add new props if they provide unique functionality not covered by Frame's extensive prop system.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see CARD_VARIANTS in this file for available animation states
 */

export interface CardProps extends FrameProps {
  title?: string;
  subheader?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  variant?: string;
  variants?: Record<string, any>; // Allow flexible variant definitions
  size?: any; // Allow flexible size definitions
  sizes?: Record<string, any>; // Allow flexible size definitions
  children?: React.ReactNode;
}

export const CARD_SIZES = {
  1: {
    autoLayout: {
      width: 240,
      height: 240,
      paddingHorizontal: 12,
      paddingVertical: 12,
      gap: 12
    },
  },
  2: {
    autoLayout: {
      width: 320,
      height: 240,
      paddingHorizontal: 16,
      paddingVertical: 16,
      gap: 16
    }
  },
  3: {
    autoLayout: {
      width: 360,
      height: 240,
      paddingHorizontal: 30,
      paddingVertical: 20,
      gap: 30
    }
  }
};

export const CARD_VARIANTS = {
  default: {
    fill: { type: 'solid' as const, color: 'white1' },
    stroke: { type: 'solid' as const, color: 'gray3', weight: 1 },
    appearance: { radius: 24 },
    effects: {
      layerBlur: { radius: .5 },
      dropShadow: [
        { x: 12, y: 12, blur: 32, color: 'rgba(0,0,0,0.10)' },
        { x: -12, y: -12, blur: 32, color: 'rgba(255,255,255,0.7)' }
      ]
    },
  },
  defaultHover: {
    fill: { type: 'solid' as const, color: 'gray1' },
    stroke: { type: 'solid' as const, color: 'gray4', weight: 1 },
    appearance: { radius: 12 },
    effects: { dropShadow: [{ x: 0, y: 4, blur: 12, color: 'rgba(0, 0, 0, 0.08)' }] }
  },
  elevated: {
    fill: { type: 'solid' as const, color: 'white1' },
    stroke: { type: 'solid' as const, color: 'gray3', weight: 1 },
    appearance: { radius: 12 },
    effects: { dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0, 0, 0, 0.06)' }] },
  },
  elevatedHover: {
    fill: { type: 'solid' as const, color: 'white1' },
    stroke: { type: 'solid' as const, color: 'gray3', weight: 1 },
    appearance: { radius: 12 },
    effects: { dropShadow: [{ x: 0, y: 8, blur: 24, color: 'rgba(0, 0, 0, 0.12)' }] }
  },
  hidden: {
    display: 'none',
  }
} satisfies ExtendVariant;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  title,
  subheader,
  avatarSrc,
  avatarAlt,
  size = '2',
  sizes: customSizes,
  variant = 'default',
  variants: customVariants,
  children,
  ...props
}, ref) => {
  // Use custom variants/sizes if provided, otherwise use defaults
  const variants = customVariants || CARD_VARIANTS;
  const sizes = customSizes || CARD_SIZES;
  
  return (
    <Frame
      ref={ref}
      as="article"
      size={size}
      sizes={sizes}
      variant={variant}
      variants={variants}
      autoLayout={{
        flow: 'horizontal',
        alignment: 'centerLeft'
      }}
      {...props}
    >
       {children}
    </Frame>
  );
});

Card.displayName = 'Card';

export default Card;


