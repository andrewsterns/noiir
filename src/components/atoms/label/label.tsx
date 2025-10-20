import React, { useState } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { LabelVariant, LABEL_VARIANTS } from './label.variants';

export type { LabelVariant };

export interface LabelProps extends FrameProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  variant?: LabelVariant;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({
  children,
  onClick,
  disabled = false,
  variant = 'normal',
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
  const effectiveVariant: LabelVariant = disabled ? 'disabled' :
                         isActive ? 'active' :
                         isClicked ? 'active' :
                         isHovered ? 'hovered' :
                         variant;

  // Get base variant styles
  const baseVariant = LABEL_VARIANTS[effectiveVariant];

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
      as={as || "label"}
      fill={baseVariant.fill}
      stroke={baseVariant.stroke}
      appearance={baseVariant.appearance}
      typography={baseVariant.typography}
      effects={baseVariant.effects}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      cursor={disabled ? 'not-allowed' : isActive ? 'pointer' : 'default'}
      {...frameProps}
    >
      {children}
    </Frame>
  );
});

Label.displayName = 'Label';

export default Label;
