import React, { useState } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { ButtonVariant, BUTTON_VARIANTS } from './button.variants';

export interface ButtonProps extends FrameProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  iconStart?: React.ReactNode;
  iconStartActive?: React.ReactNode;
  iconEnd?: React.ReactNode;
  iconEndActive?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  iconStart,
  iconStartActive,
  iconEnd,
  iconEndActive,
  as,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...frameProps
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Determine effective variant based on state
  const effectiveVariant: ButtonVariant = disabled ? 'disabled' :
                         isActive ? 'active' :
                         isClicked ? 'ghost' :
                         isHovered ? 'hovered' :
                         variant;

  // Get base variant styles
  const baseVariant = BUTTON_VARIANTS[effectiveVariant];

  // Determine which icons to show
  const showIconStart = iconStartActive !== undefined ? (isHovered ? iconStartActive : iconStart) : iconStart;
  const showIconEnd = iconEndActive !== undefined ? (isHovered ? iconEndActive : iconEnd) : iconEnd;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      setIsActive(!isActive);
      if (onClick) {
        onClick(event);
      }
    }
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      setIsHovered(true);
    }
    if (onMouseEnter) {
      onMouseEnter(event);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    setIsHovered(false);
    setIsClicked(false); // Reset click state when leaving
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      setIsClicked(true);
    }
    if (onMouseDown) {
      onMouseDown(event);
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLElement>) => {
    setIsClicked(false);
    if (onMouseUp) {
      onMouseUp(event);
    }
  };

  return (
    <Frame
      ref={ref}
      as={as || "button"}
      fill={baseVariant.fill}
      stroke={baseVariant.stroke}
      appearance={baseVariant.appearance}
      autoLayout={baseVariant.autoLayout}
      typography={baseVariant.typography}
      effects={baseVariant.effects}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      cursor={disabled ? 'not-allowed' : 'pointer'}
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
