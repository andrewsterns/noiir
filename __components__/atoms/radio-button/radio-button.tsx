import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { RADIO_BUTTON_VARIANTS, RADIO_BUTTON_SIZES, RADIO_BUTTON_FILL_SIZES } from '@variants/atoms/radio-button/radio-button.variants';
import { Animate } from '@noiir/frame-core/animate/animate.props';

/**
 * Radio Button Component
 *
 * Uses transition system for hover and checked states.
 * State flow: unchecked ⟷ uncheckedHover (hover on base)
 *            checked ⟷ checkedHover (hover on active)
 * 
 * - Hover states are visual overlays (temporary)
 * - Checked state is the logical state (persistent)
 * 
 * @see RADIO_BUTTON_VARIANTS for all state definitions
 */

export interface RadioButtonProps extends Omit<FrameProps, 'value'> {
    checked?: boolean;
    disabled?: boolean;
    name?: string;
    radioValue?: string | number;
    onValueChange?: (value: string | number) => void;
    label?: string;
    variant?: string;
    variants?: Record<string, any>;
    sizeRadio?: any;
    sizeRadioSizes?: Record<string, any>;
    sizeFill?: any;
    sizeFillSizes?: Record<string, any>;
    transitions?: Animate;
}

export const RadioButton = React.forwardRef<HTMLButtonElement, RadioButtonProps>(({
    checked = false,
    disabled = false,
    name,
    radioValue,
    onValueChange,
    label,
    variant,
    variants: customVariants,
    sizeRadio = 'medium',
    sizeRadioSizes: customRadioSizes,
    sizeFill = 'medium',
    sizeFillSizes: customFillSizes,
    onClick,
    transitions,
    ...radioButtonProps
}, ref) => {
    const variants = customVariants || RADIO_BUTTON_VARIANTS;
    const radioSizes = customRadioSizes || RADIO_BUTTON_SIZES;
    const fillSizes = customFillSizes || RADIO_BUTTON_FILL_SIZES;

    // Default transition rules for radio button inner circle
    const defaultTransitions: Animate = [
        // Hover on unchecked state
        { 
            trigger: 'mouseEnter', 
            targetId: 'radioFillId',
            fromVariant: 'unchecked', 
            toVariant: 'uncheckedHover', 
            duration: '0.15s', 
            curve: 'ease' 
        },
        { 
            trigger: 'mouseLeave', 
            targetId: 'radioFillId',
            fromVariant: 'uncheckedHover', 
            toVariant: 'unchecked', 
            duration: '0.15s', 
            curve: 'ease' 
        },
        // Click: Toggle between unchecked and checked
        { 
            trigger: 'click', 
            targetId: 'radioFillId',
            toggle: true, 
            toggleVariants: ['unchecked', 'checked'], 
            duration: '0.2s', 
            curve: 'ease' 
        },
        // Hover on checked state
        { 
            trigger: 'mouseEnter', 
            targetId: 'radioFillId',
            fromVariant: 'checked', 
            toVariant: 'checkedHover', 
            duration: '0.15s', 
            curve: 'ease' 
        },
        { 
            trigger: 'mouseLeave', 
            targetId: 'radioFillId',
            fromVariant: 'checkedHover', 
            toVariant: 'checked', 
            duration: '0.15s', 
            curve: 'ease' 
        },
    ];

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (!disabled && onValueChange && radioValue !== undefined) {
            onValueChange(radioValue);
        }
        onClick?.(e);
    };

    const radioElement = (
        <Frame
            ref={ref}
            as="button"
            onClick={handleClick}
            variant={checked ? 'radioBackgroundActive' : 'radioBackground'}
            variants={variants}
            size={sizeRadio}
            sizes={radioSizes}
            cursor={disabled ? 'not-allowed' : 'pointer'}
            disabled={disabled}
            autoLayout={{
                flow: 'horizontal',
                alignment: 'center',
            }}
            {...radioButtonProps}
        >
            <Frame
                id="radioFillId"
                variant={checked ? 'checked' : 'unchecked'}
                variants={variants}
                animate={transitions ?? defaultTransitions}
                size={sizeFill}
                sizes={fillSizes}
                cursor={disabled ? 'not-allowed' : 'pointer'}
                disabled={disabled}
            />
        </Frame>
    );

    if (label) {
        return (
            <Frame
                autoLayout={{ flow: 'horizontal', alignment: 'center', gap: 8 }}
                cursor={disabled ? 'not-allowed' : 'pointer'}
                onClick={handleClick}
            >
                {radioElement}
                <Frame
                    variant={disabled ? 'disabled' : 'default'}
                    variants={variants}
                >
                    {label}
                </Frame>
            </Frame>
        );
    }

    return radioElement;
});

RadioButton.displayName = 'RadioButton';

export default RadioButton;


