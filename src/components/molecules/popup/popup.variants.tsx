import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';

/**
 * Popup Variants Library
 *
 * This file contains variant configurations for the Popup component.
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
 * <Frame variant="overlay" variants={POPUP_VARIANTS} />
 *
 * @see FrameVariantConfig in variants.props.tsx for available properties
 * @see ExtendVariant type for variant collection structure
 */

export const POPUP_VARIANTS: ExtendVariant = {
  overlay: {
    fill: { type: 'solid', color: 'rgba(0, 0, 0, 0.5)' },
    position: { x: 0, y: 0 },
    autoLayout: {
      width: '100vw',
      height: '100vh',
      alignment: 'center'
    },
  },
  'default-small': {
    fill: { type: 'solid', color: 'white1' },
    stroke: { type: 'solid', color: 'gray4', weight: 1 },
    appearance: { radius: 8 },
    autoLayout: { width: 400, maxWidth: '90vw', maxHeight: '80vh' },
    effects: {
      dropShadow: [{
        x: 0,
        y: 8,
        blur: 24,
        color: 'rgba(0, 0, 0, 0.15)',
      }],
    },
  },
  'default-medium': {
    fill: { type: 'solid', color: 'white1' },
    stroke: { type: 'solid', color: 'gray4', weight: 1 },
    appearance: { radius: 12 },
    autoLayout: { width: 600, maxWidth: '90vw', maxHeight: '80vh' },
    effects: {
      dropShadow: [{
        x: 0,
        y: 8,
        blur: 24,
        color: 'rgba(0, 0, 0, 0.15)',
      }],
    },
  },
  'default-large': {
    fill: { type: 'solid', color: 'white1' },
    stroke: { type: 'solid', color: 'gray4', weight: 1 },
    appearance: { radius: 16 },
    autoLayout: { width: 800, maxWidth: '95vw', maxHeight: '90vh' },
    effects: {
      dropShadow: [{
        x: 0,
        y: 8,
        blur: 24,
        color: 'rgba(0, 0, 0, 0.15)',
      }],
    },
  },
  'default-fullscreen': {
    fill: { type: 'solid', color: 'white1' },
    stroke: { type: 'solid', color: 'gray4', weight: 1 },
    appearance: { radius: 0 },
    autoLayout: { width: '100vw', height: '100vh' },
  },
  header: {
    autoLayout: {
      flow: 'horizontal',
      alignment: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16
    },
    stroke: { type: 'solid', color: 'gray4', weight: 1 },
  },
  title: {
    typography: { fontSize: 18, fontWeight: 600, color: 'gray9' },
    autoLayout: { width: 'fill-container' },
  },
  'close-button': {
    fill: { type: 'solid', color: 'transparent' },
    autoLayout: { width: 32, height: 32, alignment: 'center' },
    typography: { fontSize: 24, color: 'gray6' },
    cursor: 'pointer',
    appearance: { radius: 4 },
  },
  'close-button-hover': {
    fill: { type: 'solid', color: 'gray2' },
    autoLayout: { width: 32, height: 32, alignment: 'center' },
    typography: { fontSize: 24, color: 'gray8' },
    cursor: 'pointer',
    appearance: { radius: 4 },
  },
  content: {
    autoLayout: { paddingHorizontal: 24, paddingVertical: 20, width: 'fill-container' },
    typography: { fontSize: 14, color: 'gray8' },
  },
} satisfies ExtendVariant;