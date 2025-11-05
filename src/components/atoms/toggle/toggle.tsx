import React, { ReactNode } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { TOGGLE_SIZES, TOGGLE_VARIANTS } from '../../../../__variants__/atoms/toggle/toggle.variants';
import { FrameVariantConfig } from '../../frame/frame-properties/variants/variants.props';
import { Transitions } from '../../frame/frame-properties/transition/transition';

/**
 * Toggle Component
 *
 * This component extends Frame and should leverage Frame's built-in props as much as possible.
 * Prefer using Frame props (appearance, typography, fill, stroke, effects, cursor, etc.)
 * instead of creating custom props for styling/behavior.
 *
 * For animations and state transitions, use TOGGLE_VARIANTS with Frame's animate prop
 * instead of handling hover/click states in component logic.
 *
 * Only add new props if they provide unique functionality not covered by Frame's extensive prop system.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see TOGGLE_VARIANTS in toggle.variants.tsx for available animation states
 */

export interface ToggleProps extends Omit<FrameProps, 'onChange'> {
  children?: ReactNode;
  variant?: string;
  variants?: Record<string, any>; // Allow flexible variant definitions
  variantThumb?: string;
  size?: any; // Allow flexible size definitions
  sizes?: Record<string, any>; // Allow flexible size definitions
  transitions?: Transitions;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(({
  children,
  variant = 'primary',
  variants: customVariants,
  variantThumb = 'solidThumb',
  size = '2',
  sizes: customSizes,
  transitions,
  checked = false,
  onChange,
  ...toggleProps
}, ref) => {
  // Use custom variants/sizes if provided, otherwise use defaults
  const variants = customVariants || TOGGLE_VARIANTS;
  const sizes = customSizes || TOGGLE_SIZES;

  const defaultTransitions: Transitions = [
    // Click: Toggle between base states (primary <-> primaryActive)
    { 
      event: 'click', 
      targetId: 'trackId', 
      toggle: true, 
      toggleVariants: ['primary', 'primaryActive'], 
      duration: '0.2s', 
      curve: 'ease' 
    },
    // Click: Toggle thumb size/position
    { 
      event: 'click', 
      targetId: 'thumbId', 
      toggle: true, 
      toggleVariants: ['solidThumb', 'solidThumbActive'], 
      duration: '0.2s', 
      curve: 'ease' 
    },
    // MouseEnter: Apply hover overlay when entering primary state
    { 
      event: 'mouseEnter', 
      targetId: 'trackId', 
      fromVariant: 'primary', 
      toVariant: 'primaryHover', 
      duration: '0.15s', 
      curve: 'ease' 
    },
    // MouseLeave: Remove hover overlay when leaving primary state
    { 
      event: 'mouseLeave', 
      targetId: 'trackId', 
      fromVariant: 'primaryHover', 
      toVariant: 'primary', 
      duration: '0.15s', 
      curve: 'ease' 
    },
    // MouseEnter: Apply hover overlay when entering primaryActive state
    { 
      event: 'mouseEnter', 
      targetId: 'trackId', 
      fromVariant: 'primaryActive', 
      toVariant: 'primaryActiveHover', 
      duration: '0.15s', 
      curve: 'ease' 
    },
    // MouseLeave: Remove hover overlay when leaving primaryActive state
    { 
      event: 'mouseLeave', 
      targetId: 'trackId', 
      fromVariant: 'primaryActiveHover', 
      toVariant: 'primaryActive', 
      duration: '0.15s', 
      curve: 'ease' 
    },
  ];


  return (

      <Frame
       ref={ref}  
      as="button"
      id="trackId"
      variant={variant}
      variants={variants}
      size={size}
      sizes={sizes}
      transitions={transitions ?? defaultTransitions}
 
      {...toggleProps}
      >
        <Frame
          id="thumbId"
          variant={variantThumb}
          variants={variants}
        />
      </Frame>

  );
});

Toggle.displayName = 'Toggle';

export default Toggle;