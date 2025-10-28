import React, { useState, useRef, useEffect, useCallback } from 'react';
import Frame from '../../frame/Frame';
import { LABEL_VARIANTS } from '../label/label.variants';
import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';
import { INPUT_VARIANTS, CURSOR_VARIANTS, INPUT_SIZES } from './input.variants';

export interface InputFieldProps {
    value?: string;
    onChange?: (value: string) => void;
    variant?: string;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    size?: string;
}


export const InputField = React.forwardRef<HTMLDivElement, InputFieldProps>(
  function InputField({
    value = '',
    onChange,
    variant = 'primary',
    placeholder = '',
    disabled = false,
    autoFocus = false,
    size = 'fill',
  }, ref) {
        const [inputValue, setInputValue] = useState(value);
        const [isFocused, setIsFocused] = useState(false);
        const [showCursor, setShowCursor] = useState(false);
        const inputRef = useRef<HTMLDivElement>(null);

        // Update internal value when prop changes
        useEffect(() => {
            setInputValue(value);
        }, [value]);

        // Cursor blinking effect
        useEffect(() => {
            if (!isFocused) {
                setShowCursor(false);
                return;
            }

            const interval = setInterval(() => {
                setShowCursor(prev => !prev);
            }, 350);

            return () => clearInterval(interval);
        }, [isFocused]);

        // Auto-focus effect
        useEffect(() => {
            if (autoFocus && inputRef.current) {
                inputRef.current.focus();
                setIsFocused(true);
            }
        }, [autoFocus]);

        const handleFocus = useCallback(() => {
            if (disabled) return;
            setIsFocused(true);
            setShowCursor(true);
        }, [disabled]);

        const handleBlur = useCallback(() => {
            setIsFocused(false);
            setShowCursor(false);
        }, []);

        const handleClick = useCallback((e: React.MouseEvent) => {
            if (disabled) return;
            handleFocus();
        }, [disabled, handleFocus]);

        const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
            if (disabled) return;

            e.preventDefault();

            if (e.key === 'Backspace') {
                const newValue = inputValue.slice(0, -1);
                setInputValue(newValue);
                onChange?.(newValue);
            } else if (e.key === 'Enter') {
                // Could handle form submission here
            } else if (e.key.length === 1) {
                const newValue = inputValue + e.key;
                setInputValue(newValue);
                onChange?.(newValue);
            }
        }, [disabled, inputValue, onChange]);

        const currentVariant = isFocused ? 'primaryActive' : 'primaryFocus';
        const displayText = inputValue || (isFocused ? '' : placeholder);
        
        const cursorVariant = showCursor ? 'cursorBlinkOn' : 'cursorBlinkOff';
        const cursor = isFocused ? (
            <Frame
                variant={cursorVariant}
                variants={CURSOR_VARIANTS}
            >
                |
            </Frame>
        ) : null;

        return (
            <Frame
                ref={ref || inputRef}
                size={size}
                sizes={INPUT_SIZES}
                variant={currentVariant}
                variants={INPUT_VARIANTS}
                onClick={handleClick}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
                cursor={disabled ? 'not-allowed' : 'text'}
                autoLayout={{ flow: 'horizontal' }}
            >
                {displayText}
                {cursor}
            </Frame>
        );
    });

export default InputField;
