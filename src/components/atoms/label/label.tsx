import React from 'react';
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
  variant = 'primary',
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
