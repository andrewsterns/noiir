import React, { useState } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { TOGGLE_VARIANTS, TOGGLE_SIZES } from './toggle.variants';
import { FrameVariantConfig } from '../../frame/frame-properties/variants/variants.props';

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
