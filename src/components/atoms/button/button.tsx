import React, { ReactNode } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './button.variants';
import { FrameVariantConfig } from '../../frame/frame-properties/variants/variants.props';

/**
 * Button Component
 *
 * This component extends Frame and should leverage Frame's built-in props as much as possible.
 * Prefer using Frame props (appearance, typography, fill, stroke, effects, cursor, etc.)
 * instead of creating custom props for styling/behavior.
 *
 * For animations and state transitions, use BUTTON_VARIANTS with Frame's animate prop
 * instead of handling hover/click states in component logic.
 *
 * Example: animate={{ hover: { variant: 'primaryHover' }, click: { variant: 'primaryActive' } }}
 *
 * Only add new props if they provide unique functionality not covered by Frame's extensive prop system.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see BUTTON_VARIANTS in button.variants.tsx for available animation states
 */

export interface ButtonProps extends FrameProps {
  children: ReactNode;
  variant?: string;
  size?: FrameVariantConfig | string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  variants = BUTTON_VARIANTS,
  size = 'fill',
  sizes = BUTTON_SIZES,
  iconStart,
  iconEnd,
  as,
  ...buttonProps
}, ref) => {
  return (
    <Frame
      ref={ref}
      variant={variant}
      variants={variants}
      sizes={sizes}
      size={size}
      cursor="pointer"
      iconStart={iconStart}
      iconEnd={iconEnd}
      {...buttonProps}
    >
      {children}
    </Frame>
  );
});

Button.displayName = 'Button';

export default Button;
