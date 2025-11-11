import { ExtendVariant } from "../../../__frame-core__/variants/variants.props";

/**
 * List Variants Library
 *
 * This file contains variant configurations for the List component.
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
 * <Frame variant="default" variants={LIST_VARIANTS} />
 *
 * @see FrameVariantConfig in variants.props.tsx for available properties
 * @see ExtendVariant type for variant collection structure
 */

export type ListVariant = 'default';

export interface ListVariantConfig {
  // List-specific styling can be added here if needed
}

export const LIST_SIZES = {
  '1': {
    autoLayout: { width: 150, height: 'hug' },
  },
  '2': {
    autoLayout: { width: 250, height: 'hug', gap: 0 },
  },
  '3': {
    autoLayout: { width: 350, height: 'hug' },
  },
  'fill': {
    autoLayout: { width: 'fill-container', height: 'hug' },
  },
} satisfies ExtendVariant;

export const LIST_VARIANTS = {
  default: {
    autoLayout: { flow: 'vertical', alignment: 'center', gap: 0 },
    fill: { type: 'none' },
    stroke: { type: 'none' },
    appearance: { radius: 0 },
  },
  secondary: {
    autoLayout: { flow: 'vertical', paddingVertical: 8, paddingHorizontal: 0, maxHeight: 200, overflow: 'auto', width: 'fill' },
    fill: { type: 'solid', color: 'white6', opacity: 0.9 },
    stroke: { type: 'none' },
    appearance: { radius: 30 },
  },
  active: {
    autoLayout: { flow: 'vertical', paddingVertical: 8, paddingHorizontal: 0, maxHeight: 200, overflow: 'auto', width: 'fill' },
    fill: { type: 'solid', color: 'white6', opacity: 0.9 },
    stroke: { type: 'none' },
    appearance: { radius: 8 },
  },
  closed: {
    display: 'none',
  },
  disabled: {
    autoLayout: { flow: 'vertical', paddingVertical: 8, paddingHorizontal: 0, maxHeight: 200, overflow: 'auto', width: 'fill' },
    fill: { type: 'none', color: 'transparent' },
    stroke: { type: 'solid', color: 'gray8', weight: 1 },
    appearance: { radius: 8 },
    cursor: { type: 'not-allowed' }
  },
} satisfies ExtendVariant;

/**
 * LIST_VARIANTS contains all styling configurations for the List component.
 * Each variant defines complete visual states including:
 * - Layout (autoLayout properties)
 * - Background (fill properties)
 * - Borders (stroke properties)
 * - Corners (appearance radius)
 * - Interactive states (cursor, display)
 *
 * Use these variants with Frame's animate prop for smooth transitions
 * between states instead of conditional styling in component logic.
 */
