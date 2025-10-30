import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';
import { VARIANT_STYLES } from '../../../theme/variant';

export const SLIDER_SIZES = {
  small: {
    typography: { type: 'caption' },
    autoLayout: { height: 4 },
  },
  medium: {
    typography: { type: 'body', size: 'small' },
    autoLayout: { height: 6 },
  },
  large: {
    typography: { type: 'body' },
    autoLayout: { height: 8 },
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

  // Thumb variants
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

  // Active thumb variants
  thumbActive: {
    ...VARIANT_STYLES.solidActive as any,
    effects: { dropShadow: [{ x: 0, y: 4, blur: 8, color: 'rgba(0,0,0,0.30)' }] },
  },
  thumbSoftActive: {
    ...VARIANT_STYLES.softActive as any,
    effects: { dropShadow: [{ x: 0, y: 3, blur: 6, color: 'rgba(0,0,0,0.20)' }] },
  },
  thumbGhostActive: {
    ...VARIANT_STYLES.ghostActive as any,
    stroke: { type: 'solid', color: 'gray5', weight: 2 },
    effects: { dropShadow: [{ x: 0, y: 2, blur: 4, color: 'rgba(0,0,0,0.15)' }] },
  },
  thumbOutlineActive: {
    ...VARIANT_STYLES.outlineActive as any,
    effects: { dropShadow: [{ x: 0, y: 4, blur: 8, color: 'rgba(0,0,0,0.35)' }] },
  },
} satisfies ExtendVariant;