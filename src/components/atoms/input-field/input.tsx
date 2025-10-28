import React, { useState, useRef, useEffect, useCallback } from 'react';
import Frame, { FrameProps } from '../../frame/Frame';
import { INPUT_VARIANTS, CURSOR_VARIANTS, INPUT_SIZES } from './input.variants';

export interface InputFieldProps extends FrameProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    variant?: string; // Allow overriding the internal variant logic
}


export const InputField = React.forwardRef<HTMLDivElement, InputFieldProps>(
  function InputField({
    value = '',
    onChange,
    placeholder = '',
    disabled = false,
    autoFocus = false,
    variant: externalVariant,
    size = 'md',
    ...frameProps
  }, ref) {
        console.log('InputField: rendered with', { externalVariant, variants: frameProps.variants });
        const [inputValue, setInputValue] = useState(value);
        const [isFocused, setIsFocused] = useState(false);
        const inputRef = useRef<HTMLInputElement>(null);

        // Update internal value when prop changes
        useEffect(() => {
            setInputValue(value);
        }, [value]);

        // Auto-focus effect
        useEffect(() => {
            if (autoFocus && inputRef.current) {
                inputRef.current.focus();
                setIsFocused(true);
            }
        }, [autoFocus]);

        const handleFocus = useCallback(() => {
            console.log('InputField: handleFocus called');
            setIsFocused(true);
        }, []);

        const handleBlur = useCallback(() => {
            console.log('InputField: handleBlur called');
            setIsFocused(false);
        }, []);

        const handleMouseLeave = useCallback(() => {
            console.log('InputField: mouse left input frame');
        }, []);

        const handleFrameClick = useCallback(() => {
            // Removed onClick handler - handled by parent
        }, []);

        const currentVariant = externalVariant || (isFocused ? 'primaryFocus' : 'primary');
        console.log('InputField: currentVariant =', currentVariant, 'externalVariant =', externalVariant, 'isFocused =', isFocused);

        return (
            <Frame
                ref={ref}
                size={size}
                sizes={INPUT_SIZES}
                variant={currentVariant}
                variants={frameProps.variants || INPUT_VARIANTS}
                cursor={disabled ? 'not-allowed' : 'text'}
                onMouseLeave={handleMouseLeave}
                {...frameProps}
            >
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => {
                    const newValue = e.target.value;
                    console.log('InputField: input onChange', newValue);
                    setInputValue(newValue);
                    onChange?.(newValue);
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={isFocused ? '' : placeholder}
                disabled={disabled}
                style={{
                    position: 'relative',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    color: 'inherit',
                    font: 'inherit',
                    boxSizing: 'border-box',
                }}
            />
            </Frame>
        );
    });

export default InputField;
