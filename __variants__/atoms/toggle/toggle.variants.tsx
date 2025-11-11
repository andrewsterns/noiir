import { ExtendVariant } from '../../../__frame-core__/variants/variants.props';
import { VARIANT_STYLES } from '../../theme/variant';

/**
 * Toggle Variants Library
 *
 * This file contains variant configurations for the Toggle component.
 * Variants are imported into components via the 'variants' prop on Frame.
 *
 * Variants handle:
 * - Styling (fill, stroke, appearance, typography, effects)
 * - Animation states (hover, click, active)
 * - Layout properties (autoLayout, spacing)
 * - Interactive behavior (cursor, transitions)
 *
 * Instead of handling hover/click states in component logic,
 * variants define different visual states that the component switches between.
 *
 * Example usage:
 * <Frame variant="primary" variants={TOGGLE_VARIANTS} />
 *
 * @see FrameVariantConfig in variants.props.tsx for available properties
 * @see ExtendVariant type for variant collection structure
 */

export const TOGGLE_SIZES = {
    '1': {
        autoLayout: { width: 136, height: 20 },
    },
    '2': {
        autoLayout: { width: 144, height: 24, paddingVertical: 2 },
    },
    '3': {
        autoLayout: { width: 52, height: 28 },
    },
};

export const TOGGLE_VARIANTS: ExtendVariant = {
    // Track (background) variants - control color only, not position
    primary: {
        fill: { type: 'solid', color: 'gray3', opacity: 1 },
        stroke: { type: 'solid', color: 'gray4', weight: 1 },
        autoLayout: { flow: 'vertical', alignment: 'centerLeft' },
        appearance: { radius: 12 },
    },

    primaryHover: {
        fill: { type: 'solid', color: 'gray4', opacity: 1 },
        stroke: { type: 'solid', color: 'gray5', weight: 1 },
        autoLayout: { flow: 'vertical', alignment: 'center' },
        appearance: { radius: 12 },
    },

    primaryActive: {
        fill: { type: 'solid', color: 'blue5', opacity: 1 },
        stroke: { type: 'solid', color: 'blue6', weight: 1 },
        autoLayout: { flow: 'vertical', alignment: 'centerRight' },
        appearance: { radius: 12 },
    },

    primaryActiveHover: {
        fill: { type: 'solid', color: 'blue6', opacity: 1 },
        stroke: { type: 'solid', color: 'blue7', weight: 1 },
        autoLayout: { flow: 'vertical', alignment: 'centerRight' },
        appearance: { radius: 12 },
    },

    // Thumb variants - circular element that moves
    solidThumb: {
        fill: { type: 'solid', color: 'white1', opacity: 1 },
        stroke: { type: 'solid', color: 'gray3', weight: 1 },
        autoLayout: { width: 6, height: 6 },
        effects: { dropShadow: [{ x: 0, y: 1, blur: 2, color: 'rgba(0,0,0,0.1)' }] },
    },

    solidThumbActive: {
        fill: { type: 'solid', color: 'white1', opacity: 1 },
        stroke: { type: 'solid', color: 'gray3', weight: 1 },
        autoLayout: { width: 11, height: 11 },
        appearance: { radius: 12 },

    },

};