import Frame from "../../frame/Frame";
import { useState, useEffect } from "react";
import { Typography } from "../../frame/frame-properties/typography/typography.props.stories";

interface InputProps {
    size?: string;
    type?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
}

const Input=(props: InputProps)=>{
    const { 
        size='2',
        type='text', 
        value='', 
        onChange, 
        placeholder='', 
        disabled=false, 
        autoFocus=false }=props;

    const [focused, setFocused] = useState(false);
    const [currentVariant, setCurrentVariant] = useState('primary');

    useEffect(() => {
        // console.log('focused changed to:', focused);
    }, [focused]);

    const handleFocus = () => {
        // console.log('handleFocus called, setting focused to true');
        setFocused(true);
    };

    const resetVariant = () => setCurrentVariant('primary');  //when we click outside of the input, we reset the variant to primary

    const handleBlur = () => {
        setFocused(false);
        resetVariant();
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
            autoLayout: {flow: 'horizontal' as const, gap: 1, alignment: 'centerLeft' as const, },
            fill: {color: 'white2'},
            stroke: {type: 'solid', color: 'gray2', weight: .5},
        },
        primaryHover: {
            autoLayout: {flow: 'horizontal' as const, gap: 1, alignment: 'centerLeft' as const, },
            fill: {color: 'white4'},
            cursor: {type: 'text'},
        },
        primaryActive: {
            autoLayout: {flow: 'horizontal' as const, gap: .15, alignment: 'centerLeft' as const, },
            fill: {color: 'white3'},
            stroke: {type: 'solid', color: 'gray5', weight: 1},
        },
    };
    const CURSOR_VARIANTS = {

        cursor: {
            autoLayout: {flow:'grid', width: 'hug', height: 'hug'},
            typography: {type: 'h4'},
            appearance: {opacity: 0},
        },

        blinkOn: {
            autoLayout: {flow:'grid', width: 'hug', height: 'hug'},
            typography: {type: 'h4'},
            appearance: {opacity: 1},
            animate: { afterDelay: 'blinkOff', delay: '0.5s' } //cursor blink animation
        },
        blinkOff: {
            typography: {type: 'h4'},
            appearance: {opacity: 0},
            animate: { afterDelay: 'blinkOn', delay: '0.5s' } //cursor blink animation
        },
    };
        return(
                <Frame
                onClick={() => {
                    setCurrentVariant('primaryActive');
                    setFocused(true);
                }} //  ability to type refText
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                animate ={{ hover: 'primaryHover' }} //this handles the visual states
                size= {size}
                sizes= {INPUT_SIZES}
                variant={currentVariant}
                variants= {INPUT_VARIANTS}
                >
                    
                    {refText}
                    <Frame
                                        variant={focused ? 'blinkOn' : 'cursor'} //cursor visible state
                    variants={CURSOR_VARIANTS}
                    >|</Frame>
                    </Frame>
        );
};

export { Input };    export type { InputProps };

