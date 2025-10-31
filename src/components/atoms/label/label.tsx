import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { LABEL_VARIANTS, LABEL_SIZES } from './label.variants';

/**
 * Label Component
 *
 * This component extends Frame and should leverage Frame's built-in props as much as possible.
 * Prefer using Frame props (appearance, typography, fill, stroke, effects, cursor, etc.)
 * instead of creating custom props for styling/behavior.
 *
 * For animations and state transitions, use LABEL_VARIANTS with Frame's animate prop
 * instead of handling hover/click states in component logic.
 *
 * Example: animate={{ hover: { variant: 'primaryHover' }, click: { variant: 'primaryActive' } }}
 *
 * Only add new props if they provide unique functionality not covered by Frame's extensive prop system.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see LABEL_VARIANTS in label.variants.ts for available animation states
 */

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
