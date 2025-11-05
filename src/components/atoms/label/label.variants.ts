import { ExtendVariant } from '../../../../packages/frame-core/src/variants/variants.props';
import { VARIANT_STYLES } from '../../../theme/variant';

/**
 * Label Variants Library
 *
 * This file contains variant configurations for the Label component.
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
 * <Frame variant="primary" variants={LABEL_VARIANTS} animate={{ hover: { variant: 'primaryHover' } }} />
 *
 * @see FrameVariantConfig in variants.props.tsx for available properties
 * @see ExtendVariant type for variant collection structure
 */

export const LABEL_SIZES = {
  fill: {
    autoLayout: { width: 'fill-container', height: 'fill' },
  },
  sm:{
    typography: { type: 'body' },
    autoLayout: { width: '1rem', height: 'fill' },
  },
  md:{
    typography: { type: 'h6' },
    autoLayout: { width: '2rem', height: 'fill' },
  },
  lg:{
    typography: { type: 'h5' },
    autoLayout: { width: '3rem', height: 'fill' },
  },
} satisfies ExtendVariant;

export const LABEL_VARIANTS: ExtendVariant = {
  primary: {
    ...VARIANT_STYLES.solid as any,
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },

  },

 primaryHover: {
  ...VARIANT_STYLES.solidHover as any,
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },

  },

  primaryActive: {
    ...VARIANT_STYLES.solidActive as any,
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },
  },

  primaryActiveHover: {
    fill: { type: 'solid', color: 'blue6', opacity: 1 },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },
    stroke: { type: 'solid', color: 'black4', weight: 1, opacity: 0 },
    appearance: { radius: 0 },
    typography: {
      type: 'h6',
      color: 'blue7',
      wrap: 'nowrap',
    },
  },

  disabled: {
    fill: { type: 'solid', color: 'black1' },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 2 },
    stroke: { type: 'solid', color: 'gray5', weight: 1 },
    typography: {
      type: 'h6',
      color: 'black3',
    },
    cursor: { type: 'not-allowed' }
  },

  hidden: {
    fill: { type: 'solid', color: 'green4' },
  },
} satisfies ExtendVariant;

