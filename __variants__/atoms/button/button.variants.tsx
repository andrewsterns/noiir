import { ExtendVariant } from '../../../__frame-core__/variants/variants.props';
import { VARIANT_STYLES } from '../../theme/variant';
// No icon imports

/**
 * Button Variants Library
 *
 * This file contains variant configurations for the Button component.
 * Variants are imported into components via the 'variants' prop on Frame.
 *
 * Variants handle:
 * - Styling (fill, stroke, appearance, typography, effects)
 * - Animation states (hover, click, active)
 * - Layout properties (autoLayout, spacing)
 * - Interactive behavior (cursor, transitions)
 *
 * Instead of handling hover/click states in component logic,
 * define them as variant transitions using Frame's animate prop.
 *
 * Example usage:
 * <Frame variant="primary" variants={BUTTON_VARIANTS} animate={{ hover: { variant: 'primaryHover' } }} />
 *
 * @see FrameVariantConfig in variants.props.tsx for available properties
 * @see ExtendVariant type for variant collection structure
 */

export const BUTTON_SIZES = {

    '1': {
        typography: { type: 'h6', wrap: 'nowrap' },
        autoLayout: {flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', paddingHorizontal: 12, paddingVertical: 4, width: 'hug' },
    },
    '2': {
        typography: { type: 'h5', wrap: 'nowrap' },
        autoLayout: {flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', paddingHorizontal: 16, paddingVertical: 8, width: 'hug' },
    },
    '3': {
        typography: { type: 'h3', wrap: 'nowrap' },
        autoLayout: {flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', paddingHorizontal: 20, paddingVertical: 12, width: 'hug' },
    },
    'fill': {
        autoLayout: {flow: 'horizontal', alignment: 'center', gap: 'fill', wrap: 'nowrap', width: 'fill-container', height: 'hug', paddingHorizontal: 20, paddingVertical: 12 },
        typography: { type: 'h5', wrap: 'nowrap' },
    },
    'hug': {
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'hug', height: 'hug', paddingHorizontal: 4, paddingVertical: 4 },
        typography: { type: 'h5', wrap: 'nowrap' },
    },
};



export const BUTTON_VARIANTS: ExtendVariant = {
    primary: {
        ...VARIANT_STYLES.solid as any,
        appearance: { radius: 8 },
    // iconStart removed


    },
    primaryHover: {
        ...VARIANT_STYLES.solidHover as any,
        appearance: { radius: 8 },
    // iconStart removed
    },
    primaryActive: {
        ...VARIANT_STYLES.solidActive as any,
        appearance: { radius: 8 },   
    // iconStart removed

    },

    primaryActiveHover: {
        ...VARIANT_STYLES.solidActiveHover as any,
        appearance: { radius: 8 },
        typography: {
            color: 'primary3',
            wrap: 'nowrap',
        },
    // iconStart removed
    },

    disabled: {
            fill: { type: 'none', color: 'transparent' },
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
        // iconStart removed
    },
    solidHover: {
        ...VARIANT_STYLES.solidHover as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
            // iconStart removed
    },
    solidActive: {
        ...VARIANT_STYLES.solidActive as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },   
        // iconStart removed
    },
    solidActiveHover: {
        ...VARIANT_STYLES.solid as any,
        fill: { type: 'solid', color: 'warning7', opacity: 1 },
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
        typography: {
            color: 'white4',
            wrap: 'nowrap',
        },
        // iconStart removed
    },
} satisfies ExtendVariant;

export const BUTTON_SOFT_VARIANTS: ExtendVariant = {
    soft: {
        ...VARIANT_STYLES.soft as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
    // iconStart removed
       
    },
    softHover: {
        ...VARIANT_STYLES.softHover as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
    // iconStart removed
    },
    softActive: {
        ...VARIANT_STYLES.softActive as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },   
    // iconStart removed
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
    // iconStart removed
    },
} satisfies ExtendVariant;

export const BUTTON_SURFACE_VARIANTS: ExtendVariant = {
    surface: {
        ...VARIANT_STYLES.surface as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
    // iconStart removed
     
    },
    surfaceHover: {
        ...VARIANT_STYLES.surfaceHover as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
    // iconStart removed
    },
    surfaceActive: {
        ...VARIANT_STYLES.surfaceActive as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },   
    // iconStart removed
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
    // iconStart removed
    },
} satisfies ExtendVariant;

export const BUTTON_GHOST_VARIANTS: ExtendVariant = {
    ghost: {
        ...VARIANT_STYLES.ghost as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
            // iconStart removed
    },
    ghostHover: {
        ...VARIANT_STYLES.ghostHover as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
            // iconStart removed
    },
    ghostActive: {
        ...VARIANT_STYLES.ghostActive as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },   
            // iconStart removed
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
            // iconStart removed
    },
} satisfies ExtendVariant;

export const BUTTON_OUTLINE_VARIANTS: ExtendVariant = {
    outline: {
        ...VARIANT_STYLES.outline as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
            // iconStart removed
    },
    outlineHover: {
        ...VARIANT_STYLES.outlineHover as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },
            // iconStart removed
    },
    outlineActive: {
        ...VARIANT_STYLES.outlineActive as any,
        autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
        appearance: { radius: 8 },   
            // iconStart removed
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
            // iconStart removed
    },
} satisfies ExtendVariant;
