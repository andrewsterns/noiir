import React, { ReactNode } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { BUTTON_VARIANTS as ButtonVariants } from './button.variants';


export interface ButtonProps extends FrameProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'disabled';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  variants = ButtonVariants,
  size,
  iconStart,
  iconEnd,
  as,
  ...buttonProps
}, ref) => {
  return (
    <Frame
      ref={ref}
      as={as || "button"}
      variant={variant}
      variants={variants}
      cursor="pointer"
      iconStart={iconStart}
      iconEnd={iconEnd}
      size={size}
      {...buttonProps}
    >
      {children}
    </Frame>
  );
});

Button.displayName = 'Button';

export default Button;
