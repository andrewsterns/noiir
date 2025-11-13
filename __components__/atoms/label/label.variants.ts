import { ExtendVariant } from '../../../__frame-core__/variants/variants.props';
import { VARIANT_STYLES } from '../../../__variants__/theme/variant';

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
    ...VARIANT_STYLES.solidActiveHover as any,
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },
    },
  

  disabled: {
    fill: { type: 'solid', color: 'gray4' },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 2 },
    stroke: { type: 'solid', color: 'gray5', weight: 1 },
    typography: {
      type: 'h6',
      color: 'gray5',
    },
    cursor: { type: 'not-allowed' }
  },

  hidden: {
    fill: { type: 'solid', color: 'green4' },
  },
} satisfies ExtendVariant;

