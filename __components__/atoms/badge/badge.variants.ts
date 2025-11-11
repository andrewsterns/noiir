import { ExtendVariant } from '../../../__frame-core__/variants/variants.props';
import { VARIANT_STYLES } from '../../../__variants__/theme/variant';

/**
 * Badge Variants Library
 *
 * This file contains variant configurations for the Badge component.
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
 * <Frame variant="neutral" variants={BADGE_VARIANTS} />
 *
 * @see FrameVariantConfig in variants.props.tsx for available properties
 * @see ExtendVariant type for variant collection structure
 */

export const BADGE_VARIANTS: ExtendVariant = {
  neutral: {
    ...VARIANT_STYLES.solid,
    fill: { type: 'solid', color: 'white3' },
    stroke: { type: 'solid', color: 'black2', weight: 0.5, opacity: 0.08 },
    appearance: { radius: 8 },
    typography: { color: 'black7', fontSize: 13, fontWeight: 500, letterSpacing: 0.5 },
    autoLayout: { flow: 'vertical' as const },
  },
  accent: {
    ...VARIANT_STYLES.solid,
    fill: { type: 'solid', color: 'black7', opacity: 0.92 },
    stroke: { type: 'solid', color: 'white2', weight: 1, opacity: 0.12 },
    appearance: { radius: 8 },
    typography: { color: 'white1', fontSize: 13, fontWeight: 600, letterSpacing: 0.5 },
    autoLayout: { flow: 'vertical' as const },
  },
  outline: {
    ...VARIANT_STYLES.outline,
    fill: { type: 'solid', color: 'white1', opacity: 0.7 },
    stroke: { type: 'solid', color: 'black7', weight: 1, opacity: 0.18 },
    appearance: { radius: 8 },
    typography: { color: 'black7', fontSize: 13, fontWeight: 500, letterSpacing: 0.5 },
    autoLayout: { flow: 'vertical' as const },
  },
  softDark: {
    ...VARIANT_STYLES.solid,
    fill: { type: 'solid', color: 'black3', opacity: 0.12 },
    stroke: { type: 'solid', color: 'black7', weight: 0.5, opacity: 0.10 },
    appearance: { radius: 8 },
    typography: { color: 'black7', fontSize: 13, fontWeight: 500 },
    autoLayout: { flow: 'vertical' as const },
    effects: {
      dropShadow: [
        { x: 3, y: 3, blur: 8, spread: 1, color: 'rgba(0,0,0,0.6)' },
        { x: -3, y: -3, blur: 16, spread: 1, color: 'rgba(255, 255, 255, 0.7)' }
      ]
    },
  },
  softLight: {
    ...VARIANT_STYLES.surface,
    fill: { type: 'solid', color: 'white2', opacity: 0.85 },
    stroke: { type: 'solid', color: 'black2', weight: 0.5, opacity: 0.06 },
    appearance: { radius: 8 },
    typography: { color: 'black7', fontSize: 13, fontWeight: 500 },
    autoLayout: { flow: 'vertical' as const },
    effects: {
      dropShadow: [
        { x: 0, y: 2, blur: 8, color: 'rgba(0, 0, 0, 0.3)' },
        { x: 0, y: 6, blur: 20, color: 'rgba(0, 0, 0, 0.15)' }
      ]
    },
  },
  primary: {
    ...VARIANT_STYLES.solid,
    fill: { type: 'solid', color: 'black7', opacity: 0.98 },
    stroke: { type: 'solid', color: 'white1', weight: 1, opacity: 0.10 },
    appearance: { radius: 8 },
    typography: { color: 'white1', fontSize: 13, fontWeight: 600 },
    autoLayout: { flow: 'vertical' as const },
  },
  'neutral-hover': {
    ...VARIANT_STYLES.surface,
    fill: { type: 'solid', color: 'white2', opacity: 0.95 },
    stroke: { type: 'solid', color: 'black2', weight: 0.5, opacity: 0.10 },
    appearance: { radius: 8 },
    typography: { color: 'black7', fontSize: 13, fontWeight: 500 },
    autoLayout: { flow: 'vertical' as const },
  },
  active: {
    ...VARIANT_STYLES.solid,
    fill: { type: 'solid', color: 'black7', opacity: 0.98 },
    stroke: { type: 'solid', color: 'white1', weight: 1, opacity: 0.10 },
    appearance: { radius: 8 },
    typography: { color: 'white1', fontSize: 13, fontWeight: 600 },
    autoLayout: { flow: 'vertical' as const },
  },
} satisfies ExtendVariant;

/**
 * BADGE_VARIANTS contains all styling configurations for the Badge component.
 * Each variant defines complete visual states including:
 * - Background (fill properties)
 * - Borders (stroke properties)
 * - Corners (appearance radius)
 * - Text styling (typography properties)
 * - Layout (autoLayout properties)
 * - Effects (dropShadow for depth)
 *
 * Use these variants with Frame's animate prop for smooth transitions
 * between states instead of conditional styling in component logic.
 */
