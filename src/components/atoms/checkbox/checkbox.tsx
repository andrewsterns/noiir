import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { Check } from '../../../theme/icons/check';
import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';

export interface CheckboxProps extends FrameProps {
    sizes?: Record<string, any>;
    variants?: Record<string, any>;
}

export const CHECKBOX_SIZES = {
    1: {
        autoLayout: { width: 16, height: 16 },
    },
    2: {
        autoLayout: { width: 20, height: 20 },
    },
    3: {
        autoLayout: { width: 24, height: 24 },
    },
};

export const ICON_VARIANTS = {
    unchecked: {
        fill: { type: 'solid' as const, color: 'white1' },
        typography: { color: 'gray5' },
        stroke: { type: 'solid' as const, color: 'gray4', weight: 2 },
        appearance: { radius: 4 },
        iconStart: null,
        animate: { hover: { variant: 'checkHover', duration: '.4s', curve: 'ease-in-out' }, click: { variant: 'checked', duration: '.4s', curve: 'ease-in-out' } },
    },
    checked: {
        fill: { type: 'solid' as const, color: 'blue5' },
        typography: { color: 'white3' },
        stroke: { type: 'solid' as const, color: 'blue5', weight: 2 },
        appearance: { radius: 4 },
        iconStart: <Check />,
        animate: { hover: { variant: 'checkHover', duration: '.2s', curve: 'ease-in-out' }, click: { variant: 'unchecked', duration: '.2s', curve: 'ease-in-out' } },
    },
    checkHover: {
        fill: { type: 'solid' as const, color: 'black4' },
        typography: { color: 'white2' },
        stroke: { type: 'solid' as const, color: 'blue4', weight: 1, opacity: 0 },
        appearance: { radius: 4 },
        iconStart: <Check />,
        animate: { hover: { variant: 'checkHover', duration: '.2s', curve: 'ease-in-out' }, click: { variant: 'unchecked', duration: '.2s', curve: 'ease-in-out' } },
    },
} satisfies ExtendVariant;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
    size = '2',
    variant = 'unchecked',
    variants = ICON_VARIANTS,
    sizes = CHECKBOX_SIZES,
    ...props
}, ref) => {

    return (
        <Frame
            ref={ref}
            as="button"
            autoLayout={{
                flow: 'horizontal',
                alignment: 'center',
            }}
            size={size}
            sizes={sizes}
            variants={variants}
            variant={variant}
            cursor="pointer"
            {...props}
        >
        </Frame>
    );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
