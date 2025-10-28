import { ExtendVariant } from "../../frame/frame-properties/variants/variants.props";
import { LABEL_VARIANTS } from "../label/label.variants";

export const INPUT_SIZES = {
  fill: {
    autoLayout: { width: 'fill', height: 'fill' },
  },
  sm: {
    autoLayout: { width: '1rem', height: 'fill' },
  },
  md: {
    autoLayout: { width: '2rem', height: 'fill' },
  },
  lg: {
    autoLayout: { width: '3rem', height: 'fill' },
  },
} satisfies ExtendVariant;

export const INPUT_VARIANTS: ExtendVariant = {
    primary: {
        ...LABEL_VARIANTS.primary,
        iconStart: null,
        animate: { hover: 'primaryHover', duration: '.25s', curve: 'ease-in-out' },
        typography: { type: 'body', color: 'white7' },
    },

    primaryHover: {
        ...LABEL_VARIANTS.primaryHover,
        iconStart: null,

        animate: { hover: 'primaryActiveHover', click: 'primaryBlink', duration: '.25s', curve: 'ease-in-out' },
    },

    primaryActive: {
        ...LABEL_VARIANTS.primaryActive,
        fill: { type: 'solid' as const, color: 'black6', opacity: 1 },
        stroke: { type: 'solid' as const, color: 'gray4', weight: 1, opacity: 0 },
        typography: { type: 'body', color: 'white3' },
        iconStart: null,
        animate: { hover: 'primaryActiveHover', duration: '.25s', curve: 'ease-in-out' },
    },

    primaryActiveHover: {
        ...LABEL_VARIANTS.primaryActiveHover,
        fill: { type: 'solid' as const, color: 'black5', opacity: .9 },
        stroke: { type: 'solid' as const, color: 'gray4', weight: 1 },
        typography: { type: 'body', color: 'white3' },
        iconStart: null,

    },

    primaryFocus:{
        ...LABEL_VARIANTS.primary,
        typography: { type: 'body', color: 'black7' },
    }
} satisfies ExtendVariant;



export const CURSOR_VARIANTS = {

    cursorBlinkOn: {
        appearance: { opacity: 1 },
        typography: { type: 'body', color: 'gray7' },
    },
    cursorBlinkOff: {
        appearance: { opacity: 1 },
        typography: { type: 'body1', color: 'gray2' },
    },
} satisfies ExtendVariant;


