import React from 'react';
import { Frame } from '../../frame/Frame';


export type AvatarVariant = 'default' | 'softDark' | 'softLight' | 'outline';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  fallback?: React.ReactNode;
  style?: React.CSSProperties;
  variant?: AvatarVariant;
}

const AVATAR_VARIANTS: Record<AvatarVariant, { fill: string; border?: string }> = {
  default: { fill: 'gray4' },
  softDark: { fill: 'gray10' },
  softLight: { fill: 'gray2' },
  outline: { fill: 'white', border: '1px solid #e5e7eb' },
};

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 40, fallback, style, variant = 'default' }) => {
  const v = AVATAR_VARIANTS[variant];
  return (
    <Frame
      autoLayout={{ width: size, height: size, alignment: 'center' }}
      appearance={{ radius: 'full' }}
      fill={{ type: 'solid', color: v.fill }}
      style={{ overflow: 'hidden', border: v.border, ...style }}
    >
      {src ? (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
      ) : (
        fallback || <span style={{ color: 'gray10', fontSize: size / 2 }}>?</span>
      )}
    </Frame>
  );
};

export default Avatar;
