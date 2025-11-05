import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { LABEL_VARIANTS, LABEL_SIZES } from './label.variants';
import { Transitions } from '../../../../packages/frame-core/src/transition/transition.props';

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
  variant?: string;
  variants?: Record<string, any>; // Allow flexible variant definitions
  size?: any; // Allow flexible size definitions
  sizes?: Record<string, any>; // Allow flexible size definitions
  transitions?: Transitions;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  variants: customVariants,
  size = 'default',
  sizes: customSizes,
  transitions,
  ...frameProps
}, ref) => {
  // Use custom variants if provided, otherwise use defaults
  const variants = customVariants || LABEL_VARIANTS;
  const sizes = customSizes || LABEL_SIZES;
  
  // Determine effective variant based on disabled state
  const effectiveVariant = disabled ? 'disabled' : variant;

  const defaultTransitions: Transitions = [
    { event: 'mouseEnter', toVariant: 'primaryHover', fromVariant: 'primary', duration: '0.2s', curve: 'ease' },
    { event: 'mouseLeave', toVariant: 'primary', fromVariant: 'primaryHover', duration: '0.2s', curve: 'ease' },
    { event: 'click', toggleVariants: ['primary', 'primaryActive'], toggle: true, duration: '0.1s', curve: 'ease' },
    { event: 'click', toVariant: 'primaryActive', fromVariant: 'primaryHover', duration: '0.1s', curve: 'ease' },
    { event: 'mouseEnter', toVariant: 'primaryActiveHover', fromVariant: 'primaryActive', duration: '0.1s', curve: 'ease' },
    { event: 'mouseLeave', toVariant: 'primaryActive', fromVariant: 'primaryActiveHover', duration: '0.1s', curve: 'ease' },
  ];

  return (
    <Frame
      ref={ref}
      as='label'
      id='label'
      size={size}
      sizes={sizes}
      variant={variant}
      variants={variants}
      cursor={'pointer'}
      onClick={disabled ? undefined : onClick}
      transitions={transitions ?? defaultTransitions}
      {...frameProps}
    >
      {children}
    </Frame>
  );
});

Label.displayName = 'Label';

export default Label;


