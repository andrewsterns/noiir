import { ExtendVariant } from '../../../packages/frame-core/src/variants/variants.props';
import { VARIANT_STYLES } from '../../../src/theme/variant';

/**
 * Slider Variants
 *
 * State flow:
 * - thumb (base) ⟷ thumbHover (hover overlay)
 * - thumb/thumbHover → thumbGrabbing (grab/drag state) ⟷ thumbGrabbingHover
 * - thumbGrabbing/thumbGrabbingHover → thumb (release)
 *
 * Variants are suffixed by component variant: thumb, thumbSoft, thumbGhost, thumbOutline
 */

export const SLIDER_SIZES = {
  small: {
    autoLayout: { height: 4 , width: 100},
  },
  medium: {
    autoLayout: { height: 6, width: 180},
  },
  large: {
    autoLayout: { height: 8, width: 300 },
  },
};

export const SLIDER_VARIANTS: ExtendVariant = {
  // Base track variants
  track: {
    ...VARIANT_STYLES.surface as any,
    autoLayout: { width: 'fill-container', height: 'fill-container' },
  },
  trackSoft: {
    ...VARIANT_STYLES.soft as any,
    autoLayout: { width: 'fill-container', height: 'fill-container' },
  },
  trackGhost: {
    ...VARIANT_STYLES.ghost as any,
    autoLayout: { width: 'fill-container', height: 'fill-container' },
  },
  trackOutline: {
    ...VARIANT_STYLES.outline as any,
    autoLayout: { width: 'fill-container', height: 'fill-container' },
  },

  // Track fill variants
  trackFill: {
    fill: { type: 'solid', color: 'black7' },
    autoLayout: { width: 'fill-container', height: 'fill-container' },
  },
  trackFillSoft: {
    fill: { type: 'solid', color: 'white1', opacity: 0.5 },
    autoLayout: { width: 'fill-container', height: 'fill-container' },
  },
  trackFillGhost: {
    fill: { type: 'solid', color: 'black7', opacity: 0.3 },
    autoLayout: { width: 'fill-container', height: 'fill-container' },
  },
  trackFillOutline: {
    fill: { type: 'solid', color: 'black7', opacity: 0.8 },
    autoLayout: { width: 'fill-container', height: 'fill-container' },
  },

  // Thumb variants (base state)
  thumb: {
    ...VARIANT_STYLES.solid as any,
    effects: { dropShadow: [{ x: 0, y: 2, blur: 4, color: 'rgba(0,0,0,0.20)' }] },
  },
  thumbSoft: {
    ...VARIANT_STYLES.soft as any,
    effects: { dropShadow: [{ x: 0, y: 2, blur: 4, color: 'rgba(0,0,0,0.15)' }] },
  },
  thumbGhost: {
    ...VARIANT_STYLES.ghost as any,
    stroke: { type: 'solid', color: 'gray4', weight: 2 },
    effects: { dropShadow: [{ x: 0, y: 1, blur: 2, color: 'rgba(0,0,0,0.10)' }] },
  },
  thumbOutline: {
    ...VARIANT_STYLES.outline as any,
    effects: { dropShadow: [{ x: 0, y: 2, blur: 4, color: 'rgba(0,0,0,0.25)' }] },
  },

  // Thumb hover variants
  thumbHover: {
    ...VARIANT_STYLES.solidHover as any,
    effects: { dropShadow: [{ x: 0, y: 3, blur: 6, color: 'rgba(0,0,0,0.25)' }] },
  },
  thumbSoftHover: {
    ...VARIANT_STYLES.softHover as any,
    effects: { dropShadow: [{ x: 0, y: 3, blur: 6, color: 'rgba(0,0,0,0.18)' }] },
  },
  thumbGhostHover: {
    ...VARIANT_STYLES.ghostHover as any,
    stroke: { type: 'solid', color: 'gray5', weight: 2 },
    effects: { dropShadow: [{ x: 0, y: 2, blur: 4, color: 'rgba(0,0,0,0.12)' }] },
  },
  thumbOutlineHover: {
    ...VARIANT_STYLES.outlineHover as any,
    effects: { dropShadow: [{ x: 0, y: 3, blur: 6, color: 'rgba(0,0,0,0.28)' }] },
  },

  // Thumb grabbing variants (active/drag state)
  thumbGrabbing: {
    ...VARIANT_STYLES.solidActive as any,
    effects: { dropShadow: [{ x: 0, y: 4, blur: 8, color: 'rgba(0,0,0,0.30)' }] },
  },
  thumbSoftGrabbing: {
    ...VARIANT_STYLES.softActive as any,
    effects: { dropShadow: [{ x: 0, y: 3, blur: 6, color: 'rgba(0,0,0,0.20)' }] },
  },
  thumbGhostGrabbing: {
    ...VARIANT_STYLES.ghostActive as any,
    stroke: { type: 'solid', color: 'gray6', weight: 2 },
    effects: { dropShadow: [{ x: 0, y: 2, blur: 4, color: 'rgba(0,0,0,0.15)' }] },
  },
  thumbOutlineGrabbing: {
    ...VARIANT_STYLES.outlineActive as any,
    effects: { dropShadow: [{ x: 0, y: 4, blur: 8, color: 'rgba(0,0,0,0.35)' }] },
  },

  // Thumb grabbing + hover variants
  thumbGrabbingHover: {
    ...VARIANT_STYLES.solidActive as any,
    effects: { dropShadow: [{ x: 0, y: 5, blur: 10, color: 'rgba(0,0,0,0.35)' }] },
  },
  thumbSoftGrabbingHover: {
    ...VARIANT_STYLES.softActive as any,
    effects: { dropShadow: [{ x: 0, y: 4, blur: 8, color: 'rgba(0,0,0,0.25)' }] },
  },
  thumbGhostGrabbingHover: {
    ...VARIANT_STYLES.ghostActive as any,
    stroke: { type: 'solid', color: 'gray7', weight: 2 },
    effects: { dropShadow: [{ x: 0, y: 3, blur: 6, color: 'rgba(0,0,0,0.18)' }] },
  },
  thumbOutlineGrabbingHover: {
    ...VARIANT_STYLES.outlineActive as any,
    effects: { dropShadow: [{ x: 0, y: 5, blur: 10, color: 'rgba(0,0,0,0.40)' }] },
  },
} satisfies ExtendVariant;