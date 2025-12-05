// Legacy utilities (backward compatibility)
export * from './colors';
export * from './colorUtils';
export * from './fonts';
export * from './variant';

// Example variants (for stories and prototyping)
export { colorVariants, semanticColors } from './colors.variants';
export type { ColorVariantName } from './colors.variants';

export { fontVariants, fontDefinitions } from './fonts.variants';
export type { FontVariantName } from './fonts.variants';