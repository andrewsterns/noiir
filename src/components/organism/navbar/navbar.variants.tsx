import { ExtendVariant, FrameVariantConfig } from '../../frame/frame-properties/variants/variants.props';
import { VARIANT_STYLES } from '../../../theme/variant';

/**
 * Navbar Variants Library
 *
 * Uses solid variant styles from theme/variant.ts for consistent styling.
 * Implements Radix-style navigation with transition-based interactions.
 *
 * @see FrameVariantConfig in variants.props.tsx for available properties
 * @see ExtendVariant type for variant collection structure
 */

export const NAVBAR_VARIANTS: ExtendVariant = {
  // Main navbar container
  default: {
    ...VARIANT_STYLES.solid as any,
    autoLayout: { 
      alignment: 'topCenter' as const,
      width: 'hug', 
      height: 87,
      flow: 'horizontal' as const,
      clipContent: false
    },
    appearance: { radius: 12 },
    effects: {
      dropShadow: [{
        x: 0,
        y: 2,
        blur: 8,
        color: 'rgba(0, 0, 0, 0.08)',
      }],
    },
  },
  
  // Inner container with horizontal layout
  container: {
    autoLayout: {
      flow: 'horizontal' as const,
      alignment: 'topCenter' as const,
      paddingHorizontal: 24,
      paddingVertical: 18,
      gap: 24,
      width: 'fill-container',
    },
  },
  
  // Logo area
  logo: {
    autoLayout: { width: 'hug', paddingVertical: 10 },
    typography: { fontSize: 20, fontWeight: 700, color: 'primary7' },
  },
  
  // Nav items container
  'nav-items': {
    autoLayout: { 
      flow: 'horizontal' as const, 
      gap: 8, 
      alignment: 'topCenter' as const,
      width: 'hug'
    },
  },
  
  'nav-item-wrapper': {
    position: { type: 'relative' as const },
    autoLayout: { width: 'hug' },
  },
  
  // Nav item button - ghost style
  navItem: {
    fill: { type: 'none' as const },
    stroke: { type: 'none' as const },
    autoLayout: { paddingHorizontal: 12, paddingVertical: 8, width: 'hug', flow: 'vertical' as const },
    typography: { fontSize: 14, fontWeight: 500, color: 'gray8' },
    appearance: { radius: 6 },
    effects: {},
  },
  
  navItemHover: {
    fill: { type: 'solid' as const, color: 'primary1', opacity: 0.5 },
    stroke: { type: 'none' as const },
    autoLayout: { paddingHorizontal: 12, paddingVertical: 8, width: 'hug', flow: 'vertical' as const },
    typography: { fontSize: 14, fontWeight: 500, color: 'primary7' },
    appearance: { radius: 6 },
    effects: { dropShadow: [{ x: 0, y: 2, blur: 6, color: 'rgba(0,0,0,0.05)' }] },
  },
  
  // Actions area
  actions: {
    autoLayout: { flow: 'horizontal' as const, gap: 8, alignment: 'center' as const },
  },
  
  // Mobile toggle button
  mobileToggle: {
    fill: { type: 'none' as const },
    stroke: { type: 'none' as const },
    autoLayout: { width: 40, height: 40, flow: 'vertical' as const, alignment: 'center' as const },
    appearance: { radius: 6 },
    display: 'none', // Hidden on desktop
    cursor: 'pointer' as const,
    effects: {},
  },
  
  mobileToggleOpen: {
    fill: { type: 'solid' as const, color: 'primary2', opacity: 0.5 },
    stroke: { type: 'none' as const },
    autoLayout: { width: 40, height: 40, flow: 'vertical' as const, alignment: 'center' as const },
    appearance: { radius: 6 },
    display: 'none',
    cursor: 'pointer' as const,
    effects: { dropShadow: [{ x: 0, y: 1, blur: 3, color: 'rgba(0,0,0,0.08)' }] },
    typography: { color: 'primary9' },
  },
  
  hamburger: {
    autoLayout: { flow: 'vertical' as const, gap: 4, width: 20, height: 16, alignment: 'center' as const },
  },
  
  'hamburger-line': {
    fill: { type: 'solid' as const, color: 'gray8' },
    autoLayout: { width: 'fill-container', height: 2 },
    appearance: { radius: 1 },
  },
  
  // Mobile menu
  'mobile-menu': {
    fill: { type: 'solid' as const, color: 'white2' },
    stroke: { type: 'solid' as const, color: 'gray4', weight: 1 },
    autoLayout: { 
      flow: 'vertical' as const, 
      width: 'fill-container',
      padding: 16,
      gap: 8
    },
    effects: {
      dropShadow: [{
        x: 0,
        y: 4,
        blur: 12,
        color: 'rgba(0, 0, 0, 0.1)',
      }],
    },
  },
  
  'mobile-item-wrapper': {
    autoLayout: { flow: 'vertical' as const, gap: 4, width: 'fill-container' },
  },
  
  mobileItem: {
    fill: { type: 'none' as const },
    stroke: { type: 'none' as const },
    autoLayout: { paddingHorizontal: 16, paddingVertical: 12, width: 'fill-container', flow: 'vertical' as const },
    typography: { fontSize: 16, fontWeight: 500, color: 'gray8' },
    appearance: { radius: 6 },
    effects: {},
  },
  
  mobileItemHover: {
    fill: { type: 'solid' as const, color: 'primary1', opacity: 0.5 },
    stroke: { type: 'none' as const },
    autoLayout: { paddingHorizontal: 16, paddingVertical: 12, width: 'fill-container', flow: 'vertical' as const },
    typography: { fontSize: 16, fontWeight: 500, color: 'primary7' },
    appearance: { radius: 6 },
    effects: { dropShadow: [{ x: 0, y: 2, blur: 6, color: 'rgba(0,0,0,0.05)' }] },
  },
  
  'mobile-actions': {
    autoLayout: { 
      flow: 'vertical' as const, 
      gap: 8, 
      paddingTop: 16,
      width: 'fill-container'
    },
    stroke: { type: 'solid' as const, color: 'gray3', weight: 1 },
  },
} satisfies Record<string, FrameVariantConfig>;
