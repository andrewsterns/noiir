import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { LABEL_VARIANTS, LABEL_SIZES } from './label.variants';

export interface LabelProps extends FrameProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  variant?: 'primary'| 'primary-hover' | 'primary-active' | 'primary-active-hover' | 'disabled';
  size?: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'default',
  ...frameProps
}, ref) => {
  // Determine effective variant based on disabled state
  const effectiveVariant = disabled ? 'disabled' : variant;

  return (
    <Frame
      ref={ref}
      size={size}
      sizes={LABEL_SIZES}
      variant={effectiveVariant}
      variants={LABEL_VARIANTS}
      cursor={onClick && !disabled ? 'pointer' : undefined}
      onClick={disabled ? undefined : onClick}
      {...frameProps}
    >
      {children}
    </Frame>
  );
});

Label.displayName = 'Label';

export default Label;
