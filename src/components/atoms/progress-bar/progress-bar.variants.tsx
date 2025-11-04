import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';
import { VARIANT_STYLES } from '../../../theme/variant';

/**
 * Progress Bar Variants Library
 *
 * This file contains variant configurations for the ProgressBar component.
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
 * <Frame variant="default" variants={PROGRESS_BAR_VARIANTS} />
 *
 * @see FrameVariantConfig in variants.props.tsx for available properties
 * @see ExtendVariant type for variant collection structure
 */

export const PROGRESS_BAR_SIZES = {
  '1': {
    autoLayout: { height: 9, width: 250 },
    appearance: { radius: 2 },
  },
  '2': {
    autoLayout: { height: 14, width: 350 },
    appearance: { radius: 4 },
  },
  '3': {
    autoLayout: { height: 12, width: 500 },
    appearance: { radius: 6 },
  },
};

export const PROGRESS_BAR_VARIANTS: ExtendVariant = {
  default: {
    fill: { type: 'solid', color: 'gray3' },
    autoLayout: { flow: 'horizontal' },
  },
  default1: {
    fill: { type: 'solid', color: 'gray3' },
    autoLayout: { flow: 'horizontal', ...PROGRESS_BAR_SIZES['1'].autoLayout },
    appearance: PROGRESS_BAR_SIZES['1'].appearance,
  },
  default2: {
    fill: { type: 'solid', color: 'gray3' },
    autoLayout: { flow: 'horizontal', ...PROGRESS_BAR_SIZES['2'].autoLayout },
    appearance: PROGRESS_BAR_SIZES['2'].appearance,
  },
  default3: {
    fill: { type: 'solid', color: 'gray3' },
    autoLayout: { flow: 'horizontal', ...PROGRESS_BAR_SIZES['3'].autoLayout },
    appearance: PROGRESS_BAR_SIZES['3'].appearance,
  },
  progress: {
    fill: { type: 'solid', color: 'primary6' },
    autoLayout: { height: 'fill-container', width: 'hug' },
    effects: {
      dropShadow: [{
        x: 0,
        y: 2,
        blur: 4,
        color: 'rgba(0, 0, 0, 0.1)',
      }],
    },
  },
  indeterminate: {
    fill: { type: 'linear-gradient', angle: 90, stops: [
      { color: 'primary4', position: 0 },
      { color: 'primary6', position: 0.5 },
      { color: 'primary4', position: 1 },
    ]},
    autoLayout: { height: 'fill-container', width: 'fill-container' },
  },
  success: {
    fill: { type: 'solid', color: 'success6' },
    autoLayout: { height: 'fill-container', width: 'hug' },
  },
  warning: {
    fill: { type: 'solid', color: 'warning6' },
    autoLayout: { height: 'fill-container', width: 'hug' },
  },
  error: {
    fill: { type: 'solid', color: 'error6' },
    autoLayout: { height: 'fill-container', width: 'hug' },
  },
} satisfies ExtendVariant;