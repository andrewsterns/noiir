import Frame from "../../frame/Frame";
import { useState, useEffect } from "react";
import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';
import { VARIANT_STYLES } from '../../../theme/variant';

/**
 * Input Component
 *
 * This component uses Frame internally and should leverage Frame's built-in props as much as possible.
 * Prefer using Frame props (appearance, typography, fill, stroke, effects, cursor, etc.)
 * instead of creating custom props for styling/behavior.
 *
 * For animations and state transitions, use INPUT_VARIANTS with Frame's animate prop
 * instead of handling hover/click states in component logic.
 *
 * Example: animate={{ hover: { variant: 'primaryHover' }, click: { variant: 'primaryActive' } }}
 *
 * Only add new props if they provide unique functionality not covered by Frame's extensive prop system.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see INPUT_VARIANTS in this file for available animation states
 */

interface InputProps {
    size?: string;
    type?: string;
    variant?: string;
    variants?: Record<string, any>;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
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
        autoLayout: { flow: 'horizontal' as const, gap: 1, alignment: 'centerLeft' as const, },
        fill: { type: 'solid' as const, color: 'white2' },
        stroke: { type: 'solid' as const, color: 'gray2', weight: .5 },
    },
    primaryHover: {
        autoLayout: { flow: 'horizontal' as const, gap: 1, alignment: 'centerLeft' as const, },
        fill: { type: 'solid' as const, color: 'white4' },
        cursor: { type: 'text' as const },
    },
    primaryActive: {
        autoLayout: { flow: 'horizontal' as const, gap: .15, alignment: 'centerLeft' as const, },
        fill: { type: 'solid' as const, color: 'white3' },
        stroke: { type: 'solid' as const, color: 'gray5', weight: 1 },
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
        type = 'text',
        variant = 'primary',
        variants = INPUT_VARIANTS,
        value = '',
        onChange,
        placeholder = '',
        disabled = false,
        autoFocus = false } = props;

    const [focused, setFocused] = useState(false);

    useEffect(() => {
        // console.log('focused changed to:', focused);
    }, [focused]);

    const handleFocus = () => {
        // console.log('handleFocus called, setting focused to true');
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

    const refText = value;
    return (
        <Frame
            onClick={() => {
                setFocused(true);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            size={size}
            sizes={INPUT_SIZES}
            variant={variant}
            variants={variants}
        >

            {refText}
            <Frame
                variant={focused ? 'blinkOn' : 'cursor'}
                variants={CURSOR_VARIANTS}
            >|</Frame>
        </Frame>
    );
};

export { Input, INPUT_VARIANTS }; export type { InputProps };

