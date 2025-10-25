import React from 'react';
import { Frame } from '../../frame/Frame';
import BadgeVariants from './badge.variants';

export interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
  variant?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color, size = 20, style, variant = 'neutral' }) => {
  return (
    <Frame
      variant={variant}
      variants={BadgeVariants as any}
      autoLayout={{ width: 'hug', height: size, paddingHorizontal: 8, alignment: 'center' }}
      fill={color ? { type: 'solid', color } : undefined}
      appearance={{ radius: size / 2 }}
      style={style}
    >
      {children}
    </Frame>
  );
};

export default Badge;
