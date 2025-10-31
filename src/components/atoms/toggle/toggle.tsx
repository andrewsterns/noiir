import React, { useState } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { TOGGLE_VARIANTS, TOGGLE_SIZES } from './toggle.variants';
import { FrameVariantConfig } from '../../frame/frame-properties/variants/variants.props';

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
 * Example: animate={{ hover: { variant: 'solidHover' }, click: { variant: 'solidActive' } }}
 *
 * Only add new props if they provide unique functionality not covered by Frame's extensive prop system.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see TOGGLE_VARIANTS in toggle.variants.tsx for available animation states
 */

export interface ToggleProps extends Omit<FrameProps, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: '1' | '2' | '3';
  label?: string;
}

export const Toggle = React.forwardRef<HTMLDivElement, ToggleProps>(({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = '2',
  label,
  variant = 'solid',
  variants = TOGGLE_VARIANTS,
  sizes = TOGGLE_SIZES,
  ...toggleProps
}, ref) => {



  return (
      <Frame
        variant='solid'
        variants={TOGGLE_VARIANTS}
        size={size}
        sizes={sizes}
        autoLayout={{ flow: 'horizontal' }}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        tabIndex={disabled ? -1 : 0}
      >
        <Frame
          id='thumb'
          variant='solidThumb'
          variants={TOGGLE_VARIANTS}
          autoLayout={{ width: '18', height: 18 }}
          appearance={{ radius: 9 }}
        />
      </Frame>

  );
});

Toggle.displayName = 'Toggle';

export default Toggle;
