import React from 'react';
import { Frame } from '../../frame/Frame';
import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';

export type AvatarVariant = 'default' | 'softDark' | 'softLight' | 'outline';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  fallback?: React.ReactNode;
  variant?: AvatarVariant;
}

const AVATAR_VARIANTS = {
  default: {
    fill: { type: 'image' as const,
    image: {
      src: 'https://i.pravatar.cc/100',
    alt: 'User',
    size: 48,
      scaleMode: 'fill' as const
    } },
    appearance: { radius: '100%' }
  },
  softDark: {
    fill: { type: 'solid' as const, color: 'gray7' },
    appearance: { radius: '100%' }
  },
  softLight: {
    fill: { type: 'solid' as const, color: 'gray2' },
    appearance: { radius: '100%' }
  },
  outline: {
    fill: { type: 'solid' as const, color: 'white1' },
    stroke: { type: 'solid' as const, color: 'gray4', weight: 2 },
    appearance: { radius: '100%' }
  }
} satisfies ExtendVariant;

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 40, fallback, variant = 'default' }) => {
  // Create dynamic fill based on whether we have a src
  const fill = src ? {
    type: 'image' as const,
    image: {
      src: src,
      alt: alt,
      scaleMode: 'fill' as const
    }
  } : undefined;

  return (
    <Frame
      autoLayout={{ width: size, height: size, alignment: 'center' }}
      variant={variant}
      variants={AVATAR_VARIANTS}
      fill={fill}
    >
    </Frame>
  );
};

export default Avatar;
