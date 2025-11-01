import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { RADIO_BUTTON_VARIANTS, RADIO_BUTTON_SIZES, RADIO_BUTTON_FILL_SIZES } from './radio-button.variants';


/**
 * Radio Button Component
 *
 * A radio button component built using Frame with support for checked/unchecked states.
 * Uses Frame's layout and appearance properties for consistent styling.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see RADIO_BUTTON_VARIANTS in radio-button.variants.tsx for available variants
 */

export interface RadioButtonProps extends Omit<FrameProps, 'value'> {
    checked?: boolean;
    disabled?: boolean;
    name?: string;
    radioValue?: string | number;
    onValueChange?: (value: string | number) => void;
    label?: string;
    variant?: string;
    sizeRadio?: 'small' | 'medium' | 'large';
    sizeFill?: 'small' | 'medium' | 'large';
}

export const RadioButton = React.forwardRef<HTMLButtonElement, RadioButtonProps>(({
    checked = false,
    disabled = false,
    name,
    radioValue,
    onValueChange,
    label,
    variant,
    variants = RADIO_BUTTON_VARIANTS,
    sizeRadio = 'medium',
    sizeFill = 'medium',
    onClick,
    ...radioButtonProps
}, ref) => {
    const [visualChecked, setVisualChecked] = React.useState(checked);
    const [isHovered, setIsHovered] = React.useState(false);

    // Sync visual state with prop changes
    React.useEffect(() => {
        setVisualChecked(checked);
    }, [checked]);

    //handleHover changes variant to hover state
    const handleHover = (hovered: boolean) => {
        if (!disabled) {
            setIsHovered(hovered);
        }
    };

    //handleClick changes unchecked variant to checked
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (!disabled) {
            const newChecked = !visualChecked;
            setVisualChecked(newChecked);
            if (onValueChange && radioValue !== undefined) {
                onValueChange(radioValue);
            }
        }
        onClick?.(e);
    };


    const radioElement = (
        <Frame
            ref={ref}
            as="button"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={handleClick}
            variant={visualChecked ? 'radioBackgroundActive' : 'radioBackground'}
            variants={variants}
            size={sizeRadio}
            sizes={RADIO_BUTTON_SIZES}
            cursor={disabled ? 'not-allowed' : 'pointer'}
            disabled={disabled}
            autoLayout={{
                flow: 'horizontal',
                alignment: 'center',
            }}

            {...radioButtonProps}
        >
            <Frame
                variant={isHovered ? 'checkedHover' : (visualChecked ? 'checked' : 'unchecked')}
                variants={variants}
                size={sizeFill}
                sizes={RADIO_BUTTON_FILL_SIZES}
                cursor={disabled ? 'not-allowed' : 'pointer'}
                disabled={disabled}

                {...radioButtonProps}
            ></Frame>

        </Frame>
    );

    if (label) {
        return (
            <Frame
                autoLayout={{ flow: 'horizontal', alignment: 'center', gap: 8 }}
                cursor={disabled ? 'not-allowed' : 'pointer'}
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
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