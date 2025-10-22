import React, { ReactNode } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { ButtonVariant, BUTTON_VARIANTS } from './button.variants';

export interface ButtonProps extends FrameProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  iconStart?: ReactNode;
  iconStartActive?: ReactNode;
  iconEnd?: ReactNode;
  iconEndActive?: ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  iconStart,
  iconStartActive,
  iconEnd,
  iconEndActive,
  as,
  ...frameProps
}, ref) => {
  // Get variant styles
  const baseVariant = BUTTON_VARIANTS[variant];

  // Determine which icons to show (simplified - just use active versions if provided)
  const showIconStart = iconStartActive || iconStart;
  const showIconEnd = iconEndActive || iconEnd;

  return (
    <Frame
      ref={ref}
      as={as || "button"}
      variant={baseVariant}
      variants={BUTTON_VARIANTS}
      cursor="pointer"
      {...frameProps}
    >
      {showIconStart && (
        <Frame
          autoLayout={{ flow: 'grid' }}
        >
          {showIconStart}
        </Frame>
      )}
      <Frame
        autoLayout={{ flow: 'grid' }}
        typography={baseVariant.typography}
      >
        {children}
      </Frame>

      {showIconEnd && (
        <Frame
          autoLayout={{ flow: 'grid' }}
        >
          {showIconEnd}
        </Frame>
      )}
    </Frame>
  );
});

Button.displayName = 'Button';

export default Button;
