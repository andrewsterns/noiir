import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';

/**
 * Navbar Variants Library
 *
 * This file contains variant configurations for the Navbar component.
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
 * <Frame variant="default" variants={NAVBAR_VARIANTS} />
 *
 * @see FrameVariantConfig in variants.props.tsx for available properties
 * @see ExtendVariant type for variant collection structure
 */

export const NAVBAR_VARIANTS: ExtendVariant = {
  default: {
    fill: { type: 'solid', color: 'white1' },
    stroke: { type: 'solid', color: 'gray4', weight: 1 },
    autoLayout: { width: 'fill-container', height: 64 },
    effects: {
      dropShadow: [{
        x: 0,
        y: 2,
        blur: 8,
        color: 'rgba(0, 0, 0, 0.1)',
      }],
    },
  },
  transparent: {
    fill: { type: 'solid', color: 'transparent' },
    autoLayout: { width: 'fill-container', height: 64 },
  },
  container: {
    autoLayout: {
      flow: 'horizontal',
      alignment: 'center',
      paddingHorizontal: 24,
      paddingVertical: 12,
      width: 'fill-container',
      height: 'fill-container'
    },
  },
  logo: {
    autoLayout: { width: 'hug', height: 'fill-container' },
    typography: { fontSize: 24, fontWeight: 700, color: 'primary6' },
  },
  'desktop-menu': {
    autoLayout: { width: 'fill-container', height: 'fill-container' },
    display: 'flex',
  },
  'navbar-menu': {
    autoLayout: { flow: 'horizontal', gap: 24, alignment: 'center' },
  },
  'item-default': {
    fill: { type: 'solid', color: 'transparent' },
    autoLayout: { paddingHorizontal: 12, paddingVertical: 8 },
    typography: { fontSize: 16, color: 'gray8' },
  },
  'item-hover': {
    fill: { type: 'solid', color: 'gray2' },
    autoLayout: { paddingHorizontal: 12, paddingVertical: 8 },
    typography: { fontSize: 16, color: 'primary6' },
  },
  actions: {
    autoLayout: { flow: 'horizontal', gap: 12, alignment: 'center' },
  },
  'action-item': {
    autoLayout: { width: 'hug' },
  },
  'mobile-toggle': {
    display: 'none', // Hidden on desktop, shown on mobile via responsive variants
  },
  hamburger: {
    fill: { type: 'solid', color: 'transparent' },
    autoLayout: { width: 24, height: 24, flow: 'vertical', gap: 4, alignment: 'center' },
    cursor: 'pointer',
  },
  'hamburger-line': {
    fill: { type: 'solid', color: 'gray8' },
    autoLayout: { width: 20, height: 2 },
    appearance: { radius: 1 },
  },
  'mobile-menu': {
    fill: { type: 'solid', color: 'white1' },
    stroke: { type: 'solid', color: 'gray4', weight: 1 },
    autoLayout: { flow: 'vertical', width: 'fill-container' },
    position: { x: 0, y: 64 },
    effects: {
      dropShadow: [{
        x: 0,
        y: 4,
        blur: 12,
        color: 'rgba(0, 0, 0, 0.15)',
      }],
    },
  },
  'mobile-menu-items': {
    autoLayout: { flow: 'vertical', gap: 0, paddingHorizontal: 24, paddingVertical: 12 },
  },
  'mobile-actions': {
    autoLayout: { flow: 'vertical', gap: 12, paddingHorizontal: 24, paddingVertical: 12 },
    stroke: { type: 'solid', color: 'gray4', weight: 1 },
  },
  'mobile-action-item': {
    autoLayout: { width: 'fill-container' },
  },
} satisfies ExtendVariant;