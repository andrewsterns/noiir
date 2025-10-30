import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';
import { VARIANT_STYLES } from '../../../theme/variant';

export const TOGGLE_SIZES = {
    '1': {
        autoLayout: { width: 136, height: 20 },
    },
    '2': {
        autoLayout: { width: 44, height: 24 },
    },
    '3': {
        autoLayout: { width: 52, height: 28 },
    },
};

export const TOGGLE_VARIANTS: ExtendVariant = {
    // Background (track) variants - these don't change
    solid: {
        ...VARIANT_STYLES.solid as any,
        autoLayout: { alignment: 'centerLeft' },
        appearance: { radius: '10' },
        animate: { hover: { variant: 'solidHover', duration: '0.2s', curve: 'ease-in-out' }, click: { variant: 'solidActive', duration: '0.2s', curve: 'ease-in-out' } },
    },

    solidHover: {
        ...VARIANT_STYLES.solidHover as any,
        autoLayout: { alignment: 'center' },
        animate: { hover: { variant: 'solidHover', duration: '0.2s', curve: 'ease-in-out' }, click: { variant: 'solidActive', duration: '0.2s', curve: 'ease-in-out' } },
    },

    solidActive: {
        ...VARIANT_STYLES.solidActive as any,
        autoLayout: { alignment: 'centerRight' },
        animate: { hover: { variant: 'solidHover', duration: '0.2s', curve: 'ease-in-out' }, click: { variant: 'solid', duration: '0.2s', curve: 'ease-in-out' } },
    },

    solidTrack: {
       ...VARIANT_STYLES.solidActive as any,
       autoLayout: { width: 'fill-container', height: 'fill-container', padding: 2 },
    },

    solidThumb: {
        fill: { type: 'solid', color: 'tomato5' },
        stroke: { type: 'solid', color: 'gray4', weight: 1 },
    },

} satisfies ExtendVariant;