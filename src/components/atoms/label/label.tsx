import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { LabelVariant, LABEL_VARIANTS, LABEL_SIZES } from './label.variants';

export type { LabelVariant };

export type LabelSize = keyof typeof LABEL_SIZES;

export interface LabelProps extends FrameProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  variant?: LabelVariant;
  size?: 'sm' | 'md' | 'lg';
  as?: React.ElementType;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  as,
  ...frameProps
}, ref) => {
  // Determine effective variant based on disabled state
  const effectiveVariant = disabled ? 'disabled' : variant;
  
  // Get variant styles
  const baseVariant = LABEL_VARIANTS[effectiveVariant];

  return (
    <Frame
      ref={ref}
      as={as || "div"}
      size={LABEL_SIZES[size]}
      variant={baseVariant}
      variants={LABEL_VARIANTS}
      onClick={disabled ? undefined : onClick}
      {...frameProps}
    >
      {children}
    </Frame>
  );
});

Label.displayName = 'Label';

export default Label;
