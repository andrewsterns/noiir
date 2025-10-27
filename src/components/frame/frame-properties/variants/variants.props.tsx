import {
  FillProps,
  StrokeProps,
  AppearanceProps,
  TypographyProps,
  EffectProps,
  AutoLayoutProps,
  AnimateProps,
  CursorProps,
  PositionProps,
  ConstraintProps
} from '../';
import { mergeSizeProps } from './size.props';

/**
 * Configuration for a Frame variant, defining style and behavior properties
 */
export interface FrameVariantConfig {
  fill?: FillProps;
  stroke?: StrokeProps;
  appearance?: AppearanceProps;
  autoLayout?: AutoLayoutProps;
  typography?: TypographyProps;
  effects?: EffectProps;
  animate?: AnimateProps;
  cursor?: CursorProps | CursorProps['type'];
  position?: PositionProps;
  constraints?: ConstraintProps;
  size?: any;
  sizeKey?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  iconStartColor?: string;
  iconEndColor?: string;
  pointerEvents?: string;
  transform?: string;
  display?: string;
  important?: string[]; // Array of prop names that should override explicit props
}

/**
 * Type for a variant document, a collection of named variants
 */
export type ExtendVariant = Record<string, FrameVariantConfig>;


/**
 * Merges size properties into the provided props object with special handling for typography
 * @param mergedProps - The props object to merge size into
 * @returns The merged autoLayout from size
 */
export { mergeSizeProps } from './size.props';

/**
 * Merges variant and size props with deep merging for object properties
 * @param variantProps - The variant configuration
 * @param sizeProps - The size configuration
 * @returns The merged configuration
 */
export function mergeVariantAndSize(variantProps: any, sizeProps: any): any {
  const merged = { ...variantProps, ...sizeProps };
  // Deep merge autoLayout
  if (sizeProps.autoLayout && variantProps.autoLayout) {
    merged.autoLayout = { ...variantProps.autoLayout, ...sizeProps.autoLayout };
  }
  // Deep merge typography
  if (sizeProps.typography && variantProps.typography) {
    merged.typography = { ...variantProps.typography, ...sizeProps.typography };
  }
  // Deep merge effects
  if (sizeProps.effects && variantProps.effects) {
    merged.effects = { ...variantProps.effects, ...sizeProps.effects };
  }
  // Deep merge appearance
  if (sizeProps.appearance && variantProps.appearance) {
    merged.appearance = { ...variantProps.appearance, ...sizeProps.appearance };
  }
  return merged;
}

/**
 * Merges size props with animation variant props
 * @param sizeProps - The size configuration
 * @param currentVariantProps - The current animation variant configuration
 * @returns The merged configuration
 */
export function mergeSizeWithAnimation(sizeProps: any, currentVariantProps: any): any {
  const safeSize = sizeProps || {};
  const safeVariant = currentVariantProps || {};
  const merged = { ...safeSize, ...safeVariant };
  // Deep merge autoLayout
  if (safeVariant.autoLayout && safeSize.autoLayout) {
    merged.autoLayout = { ...safeSize.autoLayout, ...safeVariant.autoLayout };
  }
  // Deep merge typography
  if (safeVariant.typography && safeSize.typography) {
    merged.typography = { ...safeSize.typography, ...safeVariant.typography };
  }
  // Deep merge effects
  if (safeVariant.effects && safeSize.effects) {
    merged.effects = { ...safeSize.effects, ...safeVariant.effects };
  }
  // Deep merge appearance
  if (safeVariant.appearance && safeSize.appearance) {
    merged.appearance = { ...safeSize.appearance, ...safeVariant.appearance };
  }
  return merged;
}
