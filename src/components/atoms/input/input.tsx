import Frame from "../../frame/Frame";
import { useState, useEffect } from "react";
import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';
import { VARIANT_STYLES } from '../../../theme/variant';

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
        animate: { hover: { variant: 'primaryHover' }, click: { variant: 'primaryActive' } },
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
        animate: { afterDelay: 'blinkOff', delay: '0.5s' }
    },
    blinkOff: {
        typography: { type: 'h4' },
        appearance: { opacity: 0 },
        animate: { afterDelay: 'blinkOn', delay: '0.5s' }
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

