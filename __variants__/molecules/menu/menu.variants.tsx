import { ExtendVariant } from '../../../packages/frame-core/src/variants/variants.props';

/**
 * Menu Variants Library
 *
 * This file contains variant configurations for the Menu component.
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
 * <Frame variant="default" variants={MENU_VARIANTS} />
 *
 * @see FrameVariantConfig in variants.props.tsx for available properties
 * @see ExtendVariant type for variant collection structure
 */

export const MENU_VARIANTS: ExtendVariant = {
  default: {
    fill: { type: 'solid', color: 'white1' },
    stroke: { type: 'solid', color: 'gray4', weight: 1 },
    appearance: { radius: 6 },
    autoLayout: { width: 'hug' },
    effects: {
      dropShadow: [{
        x: 0,
        y: 2,
        blur: 8,
        color: 'rgba(0, 0, 0, 0.1)',
      }],
    },
  },
  'item-container': {
    autoLayout: { width: 'fill-container' },
  },
  'item-default': {
    fill: { type: 'solid', color: 'transparent' },
    appearance: { radius: 0 },
    autoLayout: { paddingHorizontal: 12, paddingVertical: 8, width: 'fill-container' },
    typography: { fontSize: 14, color: 'gray8' },
  },
  'item-hover': {
    fill: { type: 'solid', color: 'gray2' },
    appearance: { radius: 0 },
    autoLayout: { paddingHorizontal: 12, paddingVertical: 8, width: 'fill-container' },
    typography: { fontSize: 14, color: 'gray8' },
  },
  'item-active': {
    fill: { type: 'solid', color: 'gray3' },
    appearance: { radius: 0 },
    autoLayout: { paddingHorizontal: 12, paddingVertical: 8, width: 'fill-container' },
    typography: { fontSize: 14, color: 'gray8' },
  },
  'item-disabled': {
    fill: { type: 'solid', color: 'transparent' },
    appearance: { radius: 0 },
    autoLayout: { paddingHorizontal: 12, paddingVertical: 8, width: 'fill-container' },
    typography: { fontSize: 14, color: 'gray5' },
    cursor: 'not-allowed',
  },
  'item-link': {
    // Link styling - href will be handled by the 'as' prop
  },
  icon: {
    autoLayout: { width: 16, height: 16 },
  },
  label: {
    autoLayout: { width: 'fill-container' },
  },
  horizontal: {
    fill: { type: 'solid', color: 'white1' },
    autoLayout: { flow: 'horizontal', gap: 0 },
  },
  vertical: {
    fill: { type: 'solid', color: 'white1' },
    autoLayout: { flow: 'vertical', gap: 0 },
  },
} satisfies ExtendVariant;