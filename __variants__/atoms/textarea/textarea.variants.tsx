import { ExtendVariant } from '../../../__frame-core__/variants/variants.props';
import { VARIANT_STYLES } from '../../theme/variant';

/**
 * Textarea Variants Library
 *
 * This file contains variant configurations for the Textarea component.
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
 * <Frame variant="solid-default" variants={TEXTAREA_VARIANTS} animate={{ focus: { variant: 'solid-focus' } }} />
 *
 * @see FrameVariantConfig in variants.props.tsx for available properties
 * @see ExtendVariant type for variant collection structure
 */

export const TEXTAREA_SIZES = {
  small: {
    typography: { type: 'caption' },
    autoLayout: { paddingHorizontal: 8, paddingVertical: 6 },
  },
  medium: {
    typography: { type: 'body', size: 'small' },
    autoLayout: { paddingHorizontal: 12, paddingVertical: 8 },
  },
  large: {
    typography: { type: 'body' },
    autoLayout: { paddingHorizontal: 16, paddingVertical: 12 },
  },
};

export const TEXTAREA_VARIANTS: ExtendVariant = {
  // Solid variants
  'solid-default': {
    ...VARIANT_STYLES.solid as any,
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
  },
  'solid-focus': {
    ...VARIANT_STYLES.solid as any,
    stroke: { type: 'solid', color: 'blue5', weight: 2 },
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
    effects: { dropShadow: [{ x: 0, y: 0, blur: 4, color: 'rgba(59, 130, 246, 0.1)' }] },
  },
  'solid-error': {
    ...VARIANT_STYLES.solid as any,
    stroke: { type: 'solid', color: 'red5', weight: 2 },
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
  },
  'solid-success': {
    ...VARIANT_STYLES.solid as any,
    stroke: { type: 'solid', color: 'green5', weight: 2 },
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
  },

  // Soft variants
  'soft-default': {
    ...VARIANT_STYLES.soft as any,
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
  },
  'soft-focus': {
    ...VARIANT_STYLES.soft as any,
    stroke: { type: 'solid', color: 'blue5', weight: 2 },
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
    effects: { dropShadow: [{ x: 0, y: 0, blur: 4, color: 'rgba(59, 130, 246, 0.1)' }] },
  },
  'soft-error': {
    ...VARIANT_STYLES.soft as any,
    stroke: { type: 'solid', color: 'red5', weight: 2 },
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
  },
  'soft-success': {
    ...VARIANT_STYLES.soft as any,
    stroke: { type: 'solid', color: 'green5', weight: 2 },
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
  },

  // Ghost variants
  'ghost-default': {
    ...VARIANT_STYLES.ghost as any,
    stroke: { type: 'solid', color: 'gray4', weight: 1 },
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
  },
  'ghost-focus': {
    ...VARIANT_STYLES.ghost as any,
    stroke: { type: 'solid', color: 'blue5', weight: 2 },
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
    effects: { dropShadow: [{ x: 0, y: 0, blur: 4, color: 'rgba(59, 130, 246, 0.1)' }] },
  },
  'ghost-error': {
    ...VARIANT_STYLES.ghost as any,
    stroke: { type: 'solid', color: 'red5', weight: 2 },
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
  },
  'ghost-success': {
    ...VARIANT_STYLES.ghost as any,
    stroke: { type: 'solid', color: 'green5', weight: 2 },
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
  },

  // Outline variants
  'outline-default': {
    ...VARIANT_STYLES.outline as any,
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
  },
  'outline-focus': {
    ...VARIANT_STYLES.outline as any,
    stroke: { type: 'solid', color: 'blue5', weight: 2 },
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
    effects: { dropShadow: [{ x: 0, y: 0, blur: 4, color: 'rgba(59, 130, 246, 0.1)' }] },
  },
  'outline-error': {
    ...VARIANT_STYLES.outline as any,
    stroke: { type: 'solid', color: 'red5', weight: 2 },
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
  },
  'outline-success': {
    ...VARIANT_STYLES.outline as any,
    stroke: { type: 'solid', color: 'green5', weight: 2 },
    autoLayout: { width: 'fill-container' },
    typography: { color: 'gray7' },
  },
} satisfies ExtendVariant;