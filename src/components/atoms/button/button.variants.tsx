import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';
import { VARIANT_STYLES } from '../../../theme/variant';
import { HappyFace, HappyWink } from '../../../theme/icons/fun';
import { Typography } from '../../frame/frame-properties/typography/typography.props.stories';


export const BUTTON_SIZES = {

    1: {
        typography: { type: 'h6', wrap: 'nowrap' },
        autoLayout: { paddingHorizontal: 12, paddingVertical: 4 },
    },
    2: {
        typography: { type: 'h5', wrap: 'nowrap' },
        autoLayout: { paddingHorizontal: 16, paddingVertical: 8 },
    },
    3: {
        typography: { type: 'h3', wrap: 'nowrap' },
        autoLayout: { paddingHorizontal: 20, paddingVertical: 12 },
    },
    'fill': {
        autoLayout: { width: 'fill-container', height: 'hug', paddingHorizontal: 20, paddingVertical: 12 },
        typography: { type: 'h5', wrap: 'nowrap' },
    }
};

export const BUTTON_VARIANTS: ExtendVariant = {
    primary: {
        ...VARIANT_STYLES.solid as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        iconStart: <HappyFace />,
        animate: { hover: { variant: 'primaryHover', duration: '.3s', curve: 'ease-in-out' }, click: { variant: 'primaryActive', duration: '.3s', curve: 'ease-in-out' } },

    },
    primaryHover: {
        ...VARIANT_STYLES.solidHover as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        iconStart: <HappyWink />,
    },
    primaryActive: {
        ...VARIANT_STYLES.solidActive as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },   
        iconStart: <HappyFace />,
        animate: { 
            hover: { variant: 'primaryActiveHover', duration: '.3s', curve: 'ease-in-out' },
        click: { variant: 'primary', duration: '.3s', curve: 'ease-in-out' } },
    },

    primaryActiveHover: {
        ...VARIANT_STYLES.solid as any,
        fill: { type: 'solid', color: 'black7', opacity: 1 },
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        typography: {
            color: 'white4',
            wrap: 'nowrap',
        },
        iconStart: <HappyWink />,
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

export const BUTTON_SOLID_VARIANTS: ExtendVariant = {
    solid: {
        ...VARIANT_STYLES.solid as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        iconStart: <HappyFace />,
        animate: { hover: { variant: 'solidHover', duration: '.3s', curve: 'ease-in-out' }, click: { variant: 'solidActive', duration: '.3s', curve: 'ease-in-out' } },
    },
    solidHover: {
        ...VARIANT_STYLES.solidHover as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        iconStart: <HappyWink />,
    },
    solidActive: {
        ...VARIANT_STYLES.solidActive as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },   
        iconStart: <HappyFace />,
        animate: { hover: { variant: 'solidActiveHover', duration: '.3s', curve: 'ease-in-out' }, click: { variant: 'solid', duration: '.3s', curve: 'ease-in-out' } },
    },
    solidActiveHover: {
        ...VARIANT_STYLES.solid as any,
        fill: { type: 'solid', color: 'black7', opacity: 1 },
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        typography: {
            color: 'white4',
            wrap: 'nowrap',
        },
        iconStart: <HappyWink />,
    },
} satisfies ExtendVariant;

export const BUTTON_SOFT_VARIANTS: ExtendVariant = {
    soft: {
        ...VARIANT_STYLES.soft as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        iconStart: <HappyFace />,
        animate: { hover: { variant: 'softHover', duration: '.3s', curve: 'ease-in-out' }, click: { variant: 'softActive', duration: '.3s', curve: 'ease-in-out' } },
    },
    softHover: {
        ...VARIANT_STYLES.softHover as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        iconStart: <HappyWink />,
    },
    softActive: {
        ...VARIANT_STYLES.softActive as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },   
        iconStart: <HappyFace />,
        animate: { hover: { variant: 'softActiveHover', duration: '.3s', curve: 'ease-in-out' }, click: { variant: 'soft', duration: '.3s', curve: 'ease-in-out' } },
    },
    softActiveHover: {
        ...VARIANT_STYLES.soft as any,
        fill: { type: 'solid', color: 'black7', opacity: 1 },
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        typography: {
            color: 'white4',
            wrap: 'nowrap',
        },
        iconStart: <HappyWink />,
    },
} satisfies ExtendVariant;

export const BUTTON_SURFACE_VARIANTS: ExtendVariant = {
    surface: {
        ...VARIANT_STYLES.surface as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        iconStart: <HappyFace />,
        animate: { hover: { variant: 'surfaceHover', duration: '.3s', curve: 'ease-in-out' }, click: { variant: 'surfaceActive', duration: '.3s', curve: 'ease-in-out' } },
    },
    surfaceHover: {
        ...VARIANT_STYLES.surfaceHover as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        iconStart: <HappyWink />,
    },
    surfaceActive: {
        ...VARIANT_STYLES.surfaceActive as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },   
        iconStart: <HappyFace />,
        animate: { hover: { variant: 'surfaceActiveHover', duration: '.3s', curve: 'ease-in-out' }, click: { variant: 'surface', duration: '.3s', curve: 'ease-in-out' } },
    },
    surfaceActiveHover: {
        ...VARIANT_STYLES.surface as any,
        fill: { type: 'solid', color: 'black7', opacity: 1 },
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        typography: {
            color: 'white4',
            wrap: 'nowrap',
        },
        iconStart: <HappyWink />,
    },
} satisfies ExtendVariant;

export const BUTTON_GHOST_VARIANTS: ExtendVariant = {
    ghost: {
        ...VARIANT_STYLES.ghost as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        iconStart: <HappyFace />,
        animate: { hover: { variant: 'ghostHover', duration: '.3s', curve: 'ease-in-out' }, click: { variant: 'ghostActive', duration: '.3s', curve: 'ease-in-out' } },
    },
    ghostHover: {
        ...VARIANT_STYLES.ghostHover as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        iconStart: <HappyWink />,
    },
    ghostActive: {
        ...VARIANT_STYLES.ghostActive as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },   
        iconStart: <HappyFace />,
        animate: { hover: { variant: 'ghostActiveHover', duration: '.3s', curve: 'ease-in-out' }, click: { variant: 'ghost', duration: '.3s', curve: 'ease-in-out' } },
    },
    ghostActiveHover: {
        ...VARIANT_STYLES.ghost as any,
        fill: { type: 'solid', color: 'black7', opacity: 1 },
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        typography: {
            color: 'white4',
            wrap: 'nowrap',
        },
        iconStart: <HappyWink />,
    },
} satisfies ExtendVariant;

export const BUTTON_OUTLINE_VARIANTS: ExtendVariant = {
    outline: {
        ...VARIANT_STYLES.outline as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        iconStart: <HappyFace />,
        animate: { hover: { variant: 'outlineHover', duration: '.3s', curve: 'ease-in-out' }, click: { variant: 'outlineActive', duration: '.3s', curve: 'ease-in-out' } },
    },
    outlineHover: {
        ...VARIANT_STYLES.outlineHover as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        iconStart: <HappyWink />,
    },
    outlineActive: {
        ...VARIANT_STYLES.outlineActive as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },   
        iconStart: <HappyFace />,
        animate: { hover: { variant: 'outlineActiveHover', duration: '.3s', curve: 'ease-in-out' }, click: { variant: 'outline', duration: '.3s', curve: 'ease-in-out' } },
    },
    outlineActiveHover: {
        ...VARIANT_STYLES.outline as any,
        fill: { type: 'solid', color: 'black7', opacity: 1 },
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        typography: {
            color: 'white4',
            wrap: 'nowrap',
        },
        iconStart: <HappyWink />,
    },
} satisfies ExtendVariant;
