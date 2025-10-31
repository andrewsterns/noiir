import React, { useState } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { TEXTAREA_VARIANTS, TEXTAREA_SIZES } from './textarea.variants';
import { FrameVariantConfig } from '../../frame/frame-properties/variants/variants.props';

/**
 * Textarea Component
 *
 * This component extends Frame and should leverage Frame's built-in props as much as possible.
 * Prefer using Frame props (appearance, typography, fill, stroke, effects, cursor, etc.)
 * instead of creating custom props for styling/behavior.
 *
 * For animations and state transitions, use TEXTAREA_VARIANTS with Frame's animate prop
 * instead of handling hover/click states in component logic.
 *
 * Example: animate={{ hover: { variant: 'solid-focus' }, focus: { variant: 'solid-focus' } }}
 *
 * Only add new props if they provide unique functionality not covered by Frame's extensive prop system.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see TEXTAREA_VARIANTS in textarea.variants.tsx for available animation states
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
  variants = TEXTAREA_VARIANTS,
  size = 'medium',
  sizes = TEXTAREA_SIZES,
  ...textareaProps
}, ref) => {
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
