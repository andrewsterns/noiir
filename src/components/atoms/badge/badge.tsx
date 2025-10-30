import React from 'react';
import { Frame } from '../../frame/Frame';
import {BADGE_VARIANTS} from './badge.variants';

export interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  size?: number;
  variant?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color, size = 20, variant = 'neutral' }) => {
  return (
    <Frame
      variant={variant}
      variants={BADGE_VARIANTS}
      autoLayout={{ width: 'hug', height: size, paddingHorizontal: 8, alignment: 'center' }}
      fill={color ? { type: 'solid', color } : undefined}
      appearance={{ radius: size / 2 }}
    >
      {children}
    </Frame>
  );
};

export default Badge;
