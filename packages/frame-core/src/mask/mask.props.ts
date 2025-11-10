import React from 'react';

/**
 * Mask Props
 * Controls clipping/masking behavior of a Frame
 * 
 * Examples:
 * - <Frame mask={true}>...</Frame>  // Simple boolean mask
 * - <Frame mask={{type: 'alpha'}}>...</Frame>  // Alpha channel mask
 * - <Frame mask={{type: 'luminance', invert: true}}>...</Frame>  // Inverted luminance mask
 */
export interface MaskProps {
  // Simple boolean for basic masking, or object for advanced options
  enabled?: boolean;
  
  // Mask type
  type?: 'alpha' | 'luminance' | 'clip';
  
  // Invert the mask
  invert?: boolean;
  
  // Mask source (if using external image/SVG as mask)
  source?: string | React.ReactElement;
}

// Support both boolean and object syntax
export type MaskPropsInput = boolean | MaskProps;

/**
 * Convert mask props to CSS styles
 */
export const convertMaskProps = (
  mask: MaskPropsInput | undefined
): React.CSSProperties => {
  console.log('🎭 convertMaskProps called:', { mask, type: typeof mask });
  
  if (!mask) {
    console.log('  ❌ No mask, returning empty styles');
    return {};
  }
  
  const styles: React.CSSProperties = {};
  
  // Handle boolean input
  if (typeof mask === 'boolean') {
    console.log('  ✅ Boolean mask detected:', mask);
    if (mask) {
      // Basic clip-path masking using overflow hidden
      styles.overflow = 'hidden';
      console.log('  📦 Setting overflow: hidden');
    }
    return styles;
  }
  
  // Handle object input
  const enabled = mask.enabled !== false; // Default to true if not specified
  console.log('  📋 Object mask detected:', { enabled, type: mask.type, invert: mask.invert });
  
  if (!enabled) {
    console.log('  ❌ Mask disabled, returning empty styles');
    return {};
  }
  
  const maskType = mask.type || 'clip';
  const invert = mask.invert || false;
  
  console.log('  🎨 Processing mask type:', maskType);
  
  switch (maskType) {
    case 'clip':
      // Simple clipping (overflow hidden)
      styles.overflow = 'hidden';
      break;
      
    case 'alpha':
      // Alpha channel masking using CSS mask
      if (mask.source && typeof mask.source === 'string') {
        styles.maskImage = `url(${mask.source})`;
        styles.WebkitMaskImage = `url(${mask.source})`;
        (styles as any).maskMode = 'alpha';
        (styles as any).WebkitMaskMode = 'alpha';
        styles.maskRepeat = 'no-repeat';
        styles.WebkitMaskRepeat = 'no-repeat';
        styles.maskSize = 'cover';
        styles.WebkitMaskSize = 'cover';
        styles.maskPosition = 'center';
        styles.WebkitMaskPosition = 'center';
      } else {
        // Use shape as mask (overflow hidden)
        styles.overflow = 'hidden';
      }
      break;
      
    case 'luminance':
      // Luminance masking
      if (mask.source && typeof mask.source === 'string') {
        styles.maskImage = `url(${mask.source})`;
        styles.WebkitMaskImage = `url(${mask.source})`;
        (styles as any).maskMode = 'luminance';
        (styles as any).WebkitMaskMode = 'luminance';
        styles.maskRepeat = 'no-repeat';
        styles.WebkitMaskRepeat = 'no-repeat';
        styles.maskSize = 'cover';
        styles.WebkitMaskSize = 'cover';
        styles.maskPosition = 'center';
        styles.WebkitMaskPosition = 'center';
      } else {
        styles.overflow = 'hidden';
      }
      break;
  }
  
  // Apply invert if specified (only works with CSS mask-image)
  if (invert && mask.source) {
    // CSS doesn't have direct mask invert, but we can use a filter workaround
    // This is a limitation - true inversion requires SVG masks
    console.warn('Mask invert with CSS is limited. Consider using SVG mask for full control.');
  }
  
  return styles;
};

/**
 * Check if mask uses React element (requires special rendering)
 */
export const hasMaskElement = (mask: MaskPropsInput | undefined): boolean => {
  if (!mask || typeof mask === 'boolean') return false;
  return React.isValidElement(mask.source);
};

/**
 * Get mask element for rendering
 */
export const getMaskElement = (mask: MaskPropsInput | undefined): React.ReactElement | null => {
  if (!mask || typeof mask === 'boolean') return null;
  if (React.isValidElement(mask.source)) {
    return mask.source;
  }
  return null;
};
