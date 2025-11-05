import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { Check } from '../../../theme/icons/check';
import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';
import { Transitions } from '../../frame/frame-properties/transition/transition.props';

/**
 * Checkbox Component
 *
 * Uses transition system for hover and checked states.
 * State flow: unchecked ⟷ uncheckedHover (hover on base)
 *            checked ⟷ checkedHover (hover on active)
 * 
 * - Hover states are visual overlays (temporary)
 * - Checked state is the logical state (persistent)
 * 
 * @see ICON_VARIANTS for all state definitions
 */

export interface CheckboxProps extends FrameProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    size?: any; // Allow flexible size definitions
    sizes?: Record<string, any>; // Allow flexible size definitions
    variant?: string;
    variants?: Record<string, any>; // Allow flexible variant definitions
    transitions?: Transitions;
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
    },
    uncheckedHover: {
        fill: { type: 'solid' as const, color: 'gray2' },
        typography: { color: 'gray6' },
        stroke: { type: 'solid' as const, color: 'gray5', weight: 2 },
        appearance: { radius: 4 },
        iconStart: null,
    },
    checked: {
        fill: { type: 'solid' as const, color: 'blue5' },
        typography: { color: 'white3' },
        stroke: { type: 'solid' as const, color: 'blue5', weight: 2 },
        appearance: { radius: 4 },
        iconStart: <Check />,
    },
    checkedHover: {
        fill: { type: 'solid' as const, color: 'blue6' },
        typography: { color: 'white2' },
        stroke: { type: 'solid' as const, color: 'blue6', weight: 2 },
        appearance: { radius: 4 },
        iconStart: <Check />,
    },
} satisfies ExtendVariant;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
    checked = false,
    onCheckedChange,
    size = '2',
    sizes: customSizes,
    variant,
    variants: customVariants,
    transitions,
    onClick,
    ...props
}, ref) => {
    // Use custom variants/sizes if provided, otherwise use defaults
    const variants = customVariants || ICON_VARIANTS;
    const sizes = customSizes || CHECKBOX_SIZES;

    const defaultTransitions: Transitions = [
        // Hover on unchecked state
        { 
            event: 'mouseEnter', 
            targetId: 'checkboxId',
            fromVariant: 'unchecked', 
            toVariant: 'uncheckedHover', 
            duration: '0.15s', 
            curve: 'ease' 
        },
        { 
            event: 'mouseLeave', 
            targetId: 'checkboxId',
            fromVariant: 'uncheckedHover', 
            toVariant: 'unchecked', 
            duration: '0.15s', 
            curve: 'ease' 
        },
        // Click: Toggle between unchecked and checked
        { 
            event: 'click', 
            targetId: 'checkboxId',
            toggle: true, 
            toggleVariants: ['unchecked', 'checked'], 
            duration: '0.2s', 
            curve: 'ease' 
        },
        // Hover on checked state
        { 
            event: 'mouseEnter', 
            targetId: 'checkboxId',
            fromVariant: 'checked', 
            toVariant: 'checkedHover', 
            duration: '0.15s', 
            curve: 'ease' 
        },
        { 
            event: 'mouseLeave', 
            targetId: 'checkboxId',
            fromVariant: 'checkedHover', 
            toVariant: 'checked', 
            duration: '0.15s', 
            curve: 'ease' 
        },
    ];

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (onCheckedChange) {
            onCheckedChange(!checked);
        }
        onClick?.(e);
    };

    return (
        <Frame
            ref={ref}
            id="checkboxId"
            as="button"
            autoLayout={{
                flow: 'horizontal',
                alignment: 'center',
            }}
            size={size}
            sizes={sizes}
            variants={variants}
            variant={variant ?? (checked ? 'checked' : 'unchecked')}
            transitions={transitions ?? defaultTransitions}
            cursor="pointer"
            onClick={handleClick}
            {...props}
        >
        </Frame>
    );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
