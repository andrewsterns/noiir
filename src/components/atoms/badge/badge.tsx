import React from 'react';
import { Frame } from '../../frame/Frame';
import { useAnimateVariant } from '../../frame/frame-properties/animation/animate.props';
import { BADGE_VARIANTS, BadgeVariant } from './badge.variants';
import { AnimateProps } from '../../frame/frame-properties/animation/animate.props';

export interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
  variant?: BadgeVariant;
  animate?: AnimateProps;
}

export const Badge: React.FC<BadgeProps> = ({ children, color, size = 20, style, variant = 'neutral', animate }) => {
  const baseVariant = BADGE_VARIANTS[variant];
  const { currentVariant } = useAnimateVariant({ animate });
  const currentVariantConfig = currentVariant ? BADGE_VARIANTS[currentVariant as BadgeVariant] : baseVariant;

  return (
    <Frame
      autoLayout={{ width: 'hug', height: size, paddingHorizontal: 8, alignment: 'center' }}
      fill={color ? { type: 'solid', color } : currentVariantConfig.fill}
      appearance={{ radius: size / 2 }}
      typography={currentVariantConfig.typography}
      style={{ border: currentVariantConfig.border, ...style }}
    >
      {children}
    </Frame>
  );
};

export default Badge;
