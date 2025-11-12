import React from 'react';
import { Frame } from '../../frame/Frame';
import {BADGE_VARIANTS} from '../../../__variants__/atoms/badge/badge.variants';

/**
 * Badge Component
 *
 * This component uses Frame internally and should leverage Frame's built-in props as much as possible.
 * Prefer using Frame props (appearance, typography, fill, stroke, effects, cursor, etc.)
 * instead of creating custom props for styling/behavior.
 *
 * For animations and state transitions, use BADGE_VARIANTS with Frame's animate prop
 * instead of handling hover/click states in component logic.
 *
 * Example: animate={{ hover: { variant: 'neutral-hover' }, click: { variant: 'active' } }}
 *
 * Only add new props if they provide unique functionality not covered by Frame's extensive prop system.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see BADGE_VARIANTS in badge.variants.ts for available animation states
 */

export interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  size?: number;
  variant?: string;
  variants?: Record<string, any>; // Allow flexible variant definitions
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  color, 
  size = 20, 
  variant = 'neutral',
  variants: customVariants 
}) => {
  // Use custom variants if provided, otherwise use defaults
  const variants = customVariants || BADGE_VARIANTS;
  
  return (
    <Frame
      variant={variant}
      variants={variants}
      autoLayout={{ width: 'hug', height: size, paddingHorizontal: 8, alignment: 'center' }}
      fill={color ? { type: 'solid', color } : undefined}
      appearance={{ radius: size / 2 }}
    >
      {children}
    </Frame>
  );
};

export default Badge;


