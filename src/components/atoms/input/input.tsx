import Frame from "../../frame/Frame";
import { useState } from "react";
import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';
import { Transitions } from '../../frame/frame-properties/transition/transition.props';

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
    transitions?: Transitions;
}

const INPUT_SIZES = {
    '1': {
        typography: { type: 'h6' },
        autoLayout: { paddingHorizontal: 12, paddingVertical: 4, width: 100 },
    },
    '2': {
        typography: { type: 'h5' },
        autoLayout: { paddingHorizontal: 16, paddingVertical: 8, width: 180 },
    },
    '3': {
        typography: { type: 'h3' },
        autoLayout: { paddingHorizontal: 20, paddingVertical: 12, width: 280 },
    },
    'fill': {
        autoLayout: { width: 'fill-container', height: 'hug' },

    }
};

const INPUT_VARIANTS = {
    primary: {
        autoLayout: { flow: 'horizontal' as const, gap: 1, alignment: 'centerLeft' as const },
        fill: { type: 'solid' as const, color: 'white2' },
        stroke: { type: 'solid' as const, color: 'gray2', weight: 0.5 },
    },
    primaryHover: {
        autoLayout: { flow: 'horizontal' as const, gap: 1, alignment: 'centerLeft' as const },
        fill: { type: 'solid' as const, color: 'white3' },
        stroke: { type: 'solid' as const, color: 'gray3', weight: 0.5 },
        cursor: 'text' as const,
    },
    primaryFocus: {
        autoLayout: { flow: 'horizontal' as const, gap: 0.15, alignment: 'centerLeft' as const },
        fill: { type: 'solid' as const, color: 'white3' },
        stroke: { type: 'solid' as const, color: 'blue5', weight: 2 },
    },
} satisfies ExtendVariant;

const CURSOR_VARIANTS = {
    cursor: {
        autoLayout: { flow: 'grid', width: 'hug', height: 'hug' },
        typography: { type: 'h4' },
        appearance: { opacity: 0 },
    },
    blinkOn: {
        autoLayout: { flow: 'grid', width: 'hug', height: 'hug' },
        typography: { type: 'h4' },
        appearance: { opacity: 1 },
    },
    blinkOff: {
        typography: { type: 'h4' },
        appearance: { opacity: 0 },
    },
} satisfies ExtendVariant;

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
        transitions } = props;

    // Use custom variants/sizes if provided, otherwise use defaults
    const variants = customVariants || INPUT_VARIANTS;
    const sizes = customSizes || INPUT_SIZES;

    const [focused, setFocused] = useState(false);

    const defaultTransitions: Transitions = [
        // Hover on base state
        { 
            event: 'mouseEnter', 
            targetId: 'inputId',
            fromVariant: 'primary', 
            toVariant: 'primaryHover', 
            duration: '0.15s', 
            curve: 'ease' 
        },
        { 
            event: 'mouseLeave', 
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
            variant={focused ? 'primaryFocus' : variant}
            variants={variants}
            transitions={transitions ?? defaultTransitions}
        >
            {value}
            <Frame
                variant={focused ? 'blinkOn' : 'cursor'}
                variants={CURSOR_VARIANTS}
            >|</Frame>
        </Frame>
    );
};

export { Input, INPUT_VARIANTS }; export type { InputProps };

