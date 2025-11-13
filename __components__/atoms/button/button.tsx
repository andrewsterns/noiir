import React, { ReactNode } from 'react';
import { Frame, FrameProps } from '@components/frame/Frame';
import { BUTTON_SIZES, BUTTON_VARIANTS } from '@variants/atoms/button/button.variants';
import { FrameVariantConfig } from '@noiir/frame-core/variants/variants.props';
import { Animate } from '@noiir/frame-core/animate/animate.props';

/**
 * Button Component
 *
 * This component extends Frame and should leverage Frame's built-in props as much as possible.
 * Prefer using Frame props (appearance, typography, fill, stroke, effects, cursor, etc.)
 * instead of creating custom props for styling/behavior.
 *
 * For animations and state Animate, use BUTTON_VARIANTS with Frame's animate prop
 * instead of handling hover/click states in component logic.
 *
 * Only add new props if they provide unique functionality not covered by Frame's extensive prop system.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see BUTTON_VARIANTS in button.variants.tsx for available animation states
 */

export interface ButtonProps extends FrameProps {
  id?: string;
  children: ReactNode;
  variant?: string;
  variants?: Record<string, any>; // Allow flexible variant definitions
  size?: any; // Allow flexible size definitions
  sizes?: Record<string, any>; // Allow flexible size definitions
  animate?: Animate;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  fill?: import('@noiir/frame-core/appearance/fill.props').FillProps;
  // All FrameProps are supported via extension and prop forwarding
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  id,
  variant = 'primary',
  variants: customVariants,
  size = '2',
  sizes: customSizes,
  iconStart,
  iconEnd,
  animate,
  as,
  ...buttonProps
}, ref) => {
  // Use custom variants if provided, otherwise use defaults
  const variants = customVariants || BUTTON_VARIANTS;
  const sizes = customSizes || BUTTON_SIZES;

  // Simple animation logic that works for all variants
  const defaultAnimate: Animate = [
    // Active hover rules (more specific, checked first)
    { mouseEnter: { fromVariant: `${variant}Active`, toVariant: `${variant}ActiveHover`, duration: '0.15s', curve: 'ease-out' } },
    { mouseLeave: { fromVariant: `${variant}ActiveHover`, toVariant: `${variant}Active`, duration: '0.15s', curve: 'ease-out' } },
    
    // Basic hover rules
    { mouseEnter: { fromVariant: variant, toVariant: `${variant}Hover`, duration: '0.15s', curve: 'ease-out' } },
    { mouseLeave: { fromVariant: `${variant}Hover`, toVariant: variant, duration: '0.15s', curve: 'ease-out' } },
    
    // Click toggle
    { onClick: { toggleVariant: [variant, `${variant}Active`], duration: '0.1s', curve: 'ease-out' } },
  ];

  const finalAnimate = animate || defaultAnimate;

  return (
    <Frame
      id={id}
      ref={ref}
      as='button'
      type='button'
      variant={variant}
      variants={variants}
      sizes={sizes}
      size={size}
      cursor="pointer"
      iconStart={iconStart}
      iconEnd={iconEnd}
      animate={finalAnimate}
      {...buttonProps}
    >
      {children}
    </Frame>
  );
});

Button.displayName = 'Button';

export default Button;


