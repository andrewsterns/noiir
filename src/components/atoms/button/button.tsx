import React, { ReactNode } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './button.variants';
import { FrameVariantConfig } from '../../frame/frame-properties/variants/variants.props';
import { Transitions } from '../../frame/frame-properties/transition/transition';

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
 * Only add new props if they provide unique functionality not covered by Frame's extensive prop system.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see BUTTON_VARIANTS in button.variants.tsx for available animation states
 */

export interface ButtonProps extends FrameProps {
  children: ReactNode;
  variant?: string;
  size?: FrameVariantConfig | string;
  transitions?: Transitions;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  variants = BUTTON_VARIANTS,
  size = '2',
  sizes = BUTTON_SIZES,
  iconStart,
  iconEnd,
  transitions,
  as,
  ...buttonProps
}, ref) => {
  const defaultTransitions: Transitions = variant ? [
    { event: 'mouseEnter', toVariant: 'primaryHover', fromVariant: 'primary', duration: '0.2s', curve: 'ease' },
    { event: 'mouseLeave', toVariant: 'primary', fromVariant: 'primaryHover', duration: '0.2s', curve: 'ease' },
    { event: 'click', toggleVariants: ['primary', 'primaryActive'], toggle: true, duration: '0.1s', curve: 'ease' },
    { event: 'click', toVariant: 'primaryActive', fromVariant: 'primaryHover', duration: '0.1s', curve: 'ease' },
    { event: 'mouseEnter', toVariant: 'primaryActiveHover', fromVariant: 'primaryActive', duration: '0.1s', curve: 'ease' },
    { event: 'mouseLeave', toVariant: 'primaryActive', fromVariant: 'primaryActiveHover', duration: '0.1s', curve: 'ease' },
  ] : [];

  console.log('Button defaultTransitions:', defaultTransitions);

  return (
    <Frame
    id='button'
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
      transitions={transitions ?? defaultTransitions}
      {...buttonProps}
    >
      {children}
    </Frame>
  );
});

Button.displayName = 'Button';

export default Button;
