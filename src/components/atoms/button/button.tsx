import React, { ReactNode } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './button.variants';
import { FrameVariantConfig } from '../../frame/frame-properties/variants/variants.props';


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
