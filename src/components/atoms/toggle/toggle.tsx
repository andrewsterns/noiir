import React, { ReactNode } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { TOGGLE_SIZES, TOGGLE_VARIANTS } from './toggle.variants';
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
  variantThumb?: string;
  size?: FrameVariantConfig | string;
  transitions?: Transitions;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(({
  children,
  variant = 'primary',
  variants = TOGGLE_VARIANTS,
  variantThumb = 'solidThumb',
  size = '2',
  sizes = TOGGLE_SIZES,
  transitions,
  checked = false,
  onChange,
  ...toggleProps
}, ref) => {

  const defaultTransitions: Transitions = [
    // Toggle track alignment on click
    { event: 'click', targetId: 'trackId', toggle: true, toggleVariants: ['primary', 'primaryActive'], duration: '0.2s', curve: 'ease' },
    // Toggle thumb variant on click
    { event: 'click', targetId: 'thumbId', toggle: true, toggleVariants: ['solidThumb', 'solidThumbActive'], duration: '0.2s', curve: 'ease' },
    // Track hover states
    { event: 'mouseEnter', targetId: 'trackId', toVariant: 'primaryHover', fromVariant: 'primary', duration: '0.1s', curve: 'ease' },
    { event: 'mouseLeave', targetId: 'trackId', toVariant: 'primary', fromVariant: 'primaryHover', duration: '0.1s', curve: 'ease' },
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