import { ExtendVariant } from '../../../packages/frame-core/src/variants/variants.props';

/**
 * Radio Button Variants Library
 *
 * This file contains variant configurations for the RadioButton component.
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
 * <Frame variant="unchecked" variants={RADIO_BUTTON_VARIANTS} />
 *
 * @see FrameVariantConfig in variants.props.tsx for available properties
 * @see ExtendVariant type for variant collection structure
 */

export const RADIO_BUTTON_SIZES = {
  small: {
    autoLayout: { width: 16, height: 16 },
    appearance: { radius: 8 },
  },
  medium: {
    autoLayout: { width: 50, height: 50 },
    appearance: { radius: 10 },
  },
  large: {
    autoLayout: { width: 24, height: 24 },
    appearance: { radius: 12 },
  },
};

export const RADIO_BUTTON_FILL_SIZES = {
  small: {
    autoLayout: { width: 8, height: 8 },
    appearance: { radius: 4 },
  },
  medium: {
    autoLayout: { width: 12, height: 12 },
    appearance: { radius: 6 },
  },
  large: {
    autoLayout: { width: 16, height: 16 },
    appearance: { radius: 8 },
  },
};

export const RADIO_BUTTON_VARIANTS: ExtendVariant = {
  unchecked: {
    fill: { type: 'solid', color: 'white1' },
    stroke: { type: 'solid', color: 'gray4', weight: 2 },
    appearance: { radius: 12 },
  },
  uncheckedHover: {
    fill: { type: 'solid', color: 'gray2' },
    stroke: { type: 'solid', color: 'primary5', weight: 2 },
    appearance: { radius: 12 },
  },
  checked: {
    fill: { type: 'solid', color: 'primary5' },
    stroke: { type: 'solid', color: 'primary5', weight: 2 },
    appearance: { radius: 12 },
    effects: {
      dropShadow: [{
        x: 0,
        y: 2,
        blur: 4,
        color: 'rgba(0, 0, 0, 0.1)',
      }],
    },

  },
  checkedHover: {
    fill: { type: 'solid', color: 'primary6' },
    stroke: { type: 'solid', color: 'primary6', weight: 2 },
    appearance: { radius: 12 },
    effects: {
      dropShadow: [{
        x: 0,
        y: 2,
        blur: 6,
        color: 'rgba(0, 0, 0, 0.15)',
      }],
    },
  },
  disabled: {
    fill: { type: 'solid', color: 'gray3' },
    stroke: { type: 'solid', color: 'gray4', weight: 2 },
    appearance: { radius: 12 },
    cursor: 'not-allowed',
  },
  default: {
    typography: { fontSize: 14, color: 'gray8' },
  },
  radioBackground: {
    fill: { type: 'solid', color: 'transparent' },
    appearance: { radius: 12 },
  },
  radioBackgroundActive: {
    fill: { type: 'solid', color: 'white1' },
    appearance: { radius: 12 },
  },
} satisfies ExtendVariant;