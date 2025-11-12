import { ExtendVariant } from '@noiir/frame-core/variants/variants.props';

export const INPUT_SIZES = {
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

export const INPUT_VARIANTS = {
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

export const CURSOR_VARIANTS = {
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
