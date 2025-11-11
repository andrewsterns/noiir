import { ExtendVariant } from '../../../__frame-core__/variants/variants.props';

/**
 * Tooltip Variants Library
 *
 * This file contains variant configurations for the Tooltip component.
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
 * <Frame variant="default-top" variants={TOOLTIP_VARIANTS} />
 *
 * @see FrameVariantConfig in variants.props.tsx for available properties
 * @see ExtendVariant type for variant collection structure
 */

export const TOOLTIP_VARIANTS: ExtendVariant = {
  'default-top': {
    fill: { type: 'solid', color: 'gray9' },
    stroke: { type: 'solid', color: 'gray6', weight: 1 },
    appearance: { radius: 6 },
    typography: { fontSize: 12, color: 'white1' },
    autoLayout: { paddingHorizontal: 8, paddingVertical: 4 },
    effects: {
      dropShadow: [{
        x: 0,
        y: 4,
        blur: 8,
        color: 'rgba(0, 0, 0, 0.15)',
      }],
    },
    position: { y: -8 },
  },
  'default-top-enter': {
    fill: { type: 'solid', color: 'gray9' },
    stroke: { type: 'solid', color: 'gray6', weight: 1 },
    appearance: { radius: 6 },
    typography: { fontSize: 12, color: 'white1' },
    autoLayout: { paddingHorizontal: 8, paddingVertical: 4 },
    effects: {
      dropShadow: [{
        x: 0,
        y: 4,
        blur: 8,
        color: 'rgba(0, 0, 0, 0.15)',
      }],
    },
    position: { y: -8 },
  },
  'default-top-exit': {
    fill: { type: 'solid', color: 'gray9', opacity: 0 },
    stroke: { type: 'solid', color: 'gray6', weight: 1 },
    appearance: { radius: 6 },
    typography: { fontSize: 12, color: 'white1' },
    autoLayout: { paddingHorizontal: 8, paddingVertical: 4 },
    effects: {
      dropShadow: [{
        x: 0,
        y: 4,
        blur: 8,
        color: 'rgba(0, 0, 0, 0.15)',
      }],
    },
    position: { y: -8 },
  },
  'default-bottom': {
    fill: { type: 'solid', color: 'gray9' },
    stroke: { type: 'solid', color: 'gray6', weight: 1 },
    appearance: { radius: 6 },
    typography: { fontSize: 12, color: 'white1' },
    autoLayout: { paddingHorizontal: 8, paddingVertical: 4 },
    effects: {
      dropShadow: [{
        x: 0,
        y: 4,
        blur: 8,
        color: 'rgba(0, 0, 0, 0.15)',
      }],
    },
    position: { y: 8 },
  },
  'default-bottom-enter': {
    fill: { type: 'solid', color: 'gray9' },
    stroke: { type: 'solid', color: 'gray6', weight: 1 },
    appearance: { radius: 6 },
    typography: { fontSize: 12, color: 'white1' },
    autoLayout: { paddingHorizontal: 8, paddingVertical: 4 },
    effects: {
      dropShadow: [{
        x: 0,
        y: 4,
        blur: 8,
        color: 'rgba(0, 0, 0, 0.15)',
      }],
    },
    position: { y: 8 },
  },
  'default-bottom-exit': {
    fill: { type: 'solid', color: 'gray9', opacity: 0 },
    stroke: { type: 'solid', color: 'gray6', weight: 1 },
    appearance: { radius: 6 },
    typography: { fontSize: 12, color: 'white1' },
    autoLayout: { paddingHorizontal: 8, paddingVertical: 4 },
    effects: {
      dropShadow: [{
        x: 0,
        y: 4,
        blur: 8,
        color: 'rgba(0, 0, 0, 0.15)',
      }],
    },
    position: { y: 8 },
  },
  'default-left': {
    fill: { type: 'solid', color: 'gray9' },
    stroke: { type: 'solid', color: 'gray6', weight: 1 },
    appearance: { radius: 6 },
    typography: { fontSize: 12, color: 'white1' },
    autoLayout: { paddingHorizontal: 8, paddingVertical: 4 },
    effects: {
      dropShadow: [{
        x: 0,
        y: 4,
        blur: 8,
        color: 'rgba(0, 0, 0, 0.15)',
      }],
    },
    position: { x: -8 },
  },
  'default-right': {
    fill: { type: 'solid', color: 'gray9' },
    stroke: { type: 'solid', color: 'gray6', weight: 1 },
    appearance: { radius: 6 },
    typography: { fontSize: 12, color: 'white1' },
    autoLayout: { paddingHorizontal: 8, paddingVertical: 4 },
    effects: {
      dropShadow: [{
        x: 0,
        y: 4,
        blur: 8,
        color: 'rgba(0, 0, 0, 0.15)',
      }],
    },
    position: { x: 8 },
  },
} satisfies ExtendVariant;