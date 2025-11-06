import React, { useState } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { TEXTAREA_VARIANTS, TEXTAREA_SIZES } from '../../../../__variants__/atoms/textarea/textarea.variants';
import { FrameVariantConfig } from '../../../../packages/frame-core/src/variants/variants.props';
import { Animate } from '../../../../packages/frame-core/src/animate/animate.props';

/**
 * Textarea Component
 *
 * Uses transition system for hover and focus states.
 * State flow: default → hover (visual overlay) → focus (logical state)
 * 
 * - Hover states are visual overlays (temporary)
 * - Focus state updates the variant directly (persistent while focused)
 * 
 * @see TEXTAREA_VARIANTS for all state definitions
 */

export interface TextareaProps extends Omit<FrameProps, 'onChange' | 'value' | 'placeholder' | 'onFocus' | 'onBlur'> {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  rows?: number;
  cols?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';
  maxLength?: number;
  minLength?: number;
  autoComplete?: string;
  autoFocus?: boolean;
  spellCheck?: boolean;
  wrap?: 'soft' | 'hard';
  error?: boolean;
  success?: boolean;
  variant?: string;
  variants?: Record<string, any>;
  size?: any;
  sizes?: Record<string, any>;
  transitions?: Animate;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  value: controlledValue,
  defaultValue = '',
  placeholder,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  readOnly = false,
  required = false,
  rows = 3,
  cols,
  resize = 'vertical',
  maxLength,
  minLength,
  autoComplete,
  autoFocus = false,
  spellCheck = true,
  wrap = 'soft',
  error = false,
  success = false,
  variant = 'solid',
  variants: customVariants,
  size = 'medium',
  sizes: customSizes,
  ...textareaProps
}, ref) => {
  const variants = customVariants || TEXTAREA_VARIANTS;
  const sizes = customSizes || TEXTAREA_SIZES;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (event: React.ChangeEvent<HTMLElement>) => {
    const target = event.target as HTMLTextAreaElement;
    const newValue = target.value;

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    setIsFocused(true);
    onFocus?.(event as React.FocusEvent<HTMLTextAreaElement>);
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    setIsFocused(false);
    onBlur?.(event as React.FocusEvent<HTMLTextAreaElement>);
  };

  // Determine the current state variant
  const getStateVariant = () => {
    if (error) return 'error';
    if (success) return 'success';
    if (isFocused) return 'focus';
    return 'default';
  };

  const stateVariant = getStateVariant();

  return (
    <Frame
      as="textarea"
      ref={ref}
      variant={`${variant}-${stateVariant}`}
      variants={variants}
      size={size}
      sizes={sizes}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      autoFocus={autoFocus}
      {...textareaProps}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;


