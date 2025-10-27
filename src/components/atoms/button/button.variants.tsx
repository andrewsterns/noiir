import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';
import { HappyFace, HappyWink } from '../../../theme/icons/fun';


export const BUTTON_SIZES = {
    sm: {
        typography: { type: 'h6' },
        autoLayout: { paddingHorizontal: 12, paddingVertical: 4 },
    },
    md: {
        typography: { type: 'h5' },
        autoLayout: { paddingHorizontal: 16, paddingVertical: 8 },
    },
    lg: {
        typography: { type: 'h3' },
        autoLayout: { paddingHorizontal: 20, paddingVertical: 12 },
    }
};

export const BUTTON_VARIANTS = {
    primary: {
        fill: { type: 'solid', color: 'white2', opacity: .9 },
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
        appearance: { radius: 8 },
        effects: { dropShadow: [{ x: 1, y: 3, blur: 8, color: 'rgba(0, 0, 0, 0.25)', spread: -3 }] },

        typography: {
            color: 'gray7',
            wrap: 'nowrap',
        },
        iconStart: <HappyFace />,
        animate: { hover: 'primaryHover', click: 'primaryActive', duration: '.3s', curve: 'ease-in-out' },

    },
    primaryHover: {
        fill: { type: 'solid', color: 'white1', opacity: .9 },
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
        appearance: { radius: 8 },
        effects: { dropShadow: [{ x: 1, y: 3, blur: 8, color: 'rgba(0, 0, 0, 0.1)', spread: -5 }] },
        typography: {
            color: 'white7',
            wrap: 'nowrap',
        },
        iconStart: <HappyWink />,


    },
    primaryActive: {
        fill: { type: 'solid', color: 'black7', opacity: .1 },
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        stroke: { type: 'solid', color: 'black4', weight: 1 },
        appearance: { radius: 8 },
        effects: { dropShadow: [{ x: 1, y: 3, blur: 8, color: 'rgba(0, 0, 0, 0.25)', spread: -3 }] },
        typography: {
            color: 'white9',
            wrap: 'nowrap',

        },
        iconStart: <HappyFace />,
        animate: { hover: 'primaryActiveHover', click: 'primary', duration: '.3s', curve: 'ease-in-out' },
    },

    primaryActiveHover: {
        fill: { type: 'solid', color: 'black6', opacity: .2 },
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        stroke: { type: 'solid', color: 'black4', weight: 1 },
        appearance: { radius: 8 },
        effects: { dropShadow: [{ x: 1, y: 3, blur: 8, color: 'rgba(0, 0, 0, 0.25)', spread: -3 }] },
        typography: {
            color: 'gray7',
            wrap: 'nowrap',

        },
        iconStart: <HappyFace />,
    },

        secondary: {
            fill: { type: 'solid', color: 'black6', opacity: .9, },
            autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
            stroke: { type: 'none' },
            appearance: { radius: 8 },
            typography: {
                color: 'white2',
                wrap: 'nowrap',

            },
            iconStart: <HappyFace />,
            animate: { click: 'primary', duration: '0.2s', curve: 'ease-in-out' },
        },

        disabled: {
            fill: { type: 'none', color: 'transparent' },
            autoLayout: { flow: 'grid', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
            stroke: { type: 'solid', color: 'gray8', weight: 4 },
            appearance: { radius: 6 },
            typography: {

                fontWeight: 500,
                textAlign: 'center',
                color: 'gray7'
            },
        },

    } satisfies ExtendVariant;