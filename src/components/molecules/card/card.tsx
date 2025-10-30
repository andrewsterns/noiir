import React, { Children } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { Avatar } from '../../atoms/avatar/avatar';
import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';

export interface CardProps extends FrameProps {
  title?: string;
  subheader?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  variant?: string;
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
    animate: { hover: { variant: 'defaultHover' } }
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
    animate: { hover: { variant: 'elevatedHover' } }
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
  variant = 'default',
  variants = CARD_VARIANTS,
  sizes = CARD_SIZES,
  children,
  ...props
}, ref) => {
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
