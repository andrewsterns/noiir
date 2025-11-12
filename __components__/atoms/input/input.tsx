import Frame from '@components/frame/Frame';
import { useState, useEffect } from 'react';
import { ExtendVariant } from '@noiir/frame-core/variants/variants.props';
import { Animate } from '@noiir/frame-core/animate/animate.props';
import { INPUT_SIZES, INPUT_VARIANTS, CURSOR_VARIANTS } from '@variants/atoms/input/input.variants';

/**
 * Input Component
 *
 * Uses transition system for hover and focus states.
 * State flow: primary ⟷ primaryHover ⟷ primaryFocus
 * 
 * - Hover state is a visual overlay (temporary)
 * - Focus state is the logical state (persistent while focused)
 * 
 * @see INPUT_VARIANTS for all state definitions
 */

interface InputProps {
    size?: any; // Allow flexible size definitions
    sizes?: Record<string, any>; // Allow flexible size definitions
    type?: string;
    variant?: string;
    variants?: Record<string, any>; // Allow flexible variant definitions
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    transitions?: Animate;
    cursorVariant?: string;
    cursorVariants?: Record<string, any>;
}

const Input = (props: InputProps) => {
    const {
        size = '2',
        sizes: customSizes,
        type = 'text',
        variant = 'primary',
        variants: customVariants,
        value = '',
        onChange,
        placeholder = '',
        disabled = false,
        autoFocus = false,
        cursorVariant = 'cursor',
        cursorVariants = CURSOR_VARIANTS,
        transitions } = props;

    // Use custom variants/sizes if provided, otherwise use defaults
    const variants = customVariants || INPUT_VARIANTS;
    const sizes = customSizes || INPUT_SIZES;

    const [focused, setFocused] = useState(false);
    const [cursorBlink, setCursorBlink] = useState(false);

    // Cursor blinking effect
    useEffect(() => {
        if (!focused) {
            setCursorBlink(false);
            return;
        }

        const interval = setInterval(() => {
            setCursorBlink(prev => !prev);
        }, 500); // Blink every 500ms

        return () => clearInterval(interval);
    }, [focused]);

    // Determine cursor variant based on focus and blink state
    const currentCursorVariant = focused 
        ? (cursorBlink ? 'blinkOn' : 'blinkOff')
        : cursorVariant;

    const defaultTransitions: Animate = [
        // Hover on base state
        { 
            trigger: 'mouseEnter', 
            targetId: 'inputId',
            fromVariant: 'primary', 
            toVariant: 'primaryHover', 
            duration: '0.15s', 
            curve: 'ease' 
        },
        { 
            trigger: 'mouseLeave', 
            targetId: 'inputId',
            fromVariant: 'primaryHover', 
            toVariant: 'primary', 
            duration: '0.15s', 
            curve: 'ease' 
        },
        // Focus transitions (manual via onClick/onBlur)
    ];

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;
        e.preventDefault();
        if (onChange) {
            if (e.key === 'Backspace') {
                onChange(value.slice(0, -1));
            } else if (e.key.length === 1) {
                onChange(value + e.key);
            }
        }
    };

    return (
        <Frame
            id="inputId"
            onClick={handleFocus}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            size={size}
            sizes={sizes}
            variant={variant}
            variants={variants}
            animate={transitions ?? defaultTransitions}
        >
            {value}
            <Frame
                id="cursorId"
                variant={currentCursorVariant}
                variants={cursorVariants}
            >|</Frame>
        </Frame>
    );
};

export { Input };



