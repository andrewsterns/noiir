// Variant types and logic for Frame components

import type { FrameProps } from '../Frame';

export type FrameVariantName = string;

// FrameVariantProps allows all Frame visual/structural properties (appearance, layout, effects, position, etc.)
// Excludes non-visual props like animate, children, event handlers, etc.
export interface FrameVariantProps extends Omit<FrameProps, 'id' | 'variant' | 'animate' | 'children' | 'className' | 'style' | 'onClick' | 'onMouseEnter' | 'onMouseLeave'> {
  // This includes:
  // - position (x/y, z-index, constraints)
  // - autoLayout (flow, alignment, spacing)
  // - size (width, height)
  // - appearance (radius, border, opacity)
  // - typography (font, size, weight, color)
  // - fill (background color/gradient)
  // - stroke (border stroke properties)
  // - effects (shadows, blurs)
}

export interface FrameVariants {
  [variant: string]: FrameVariantProps;
}

// Helper to get props for a variant
// Returns merged props for a variant, falling back to 'default' if needed
export function getVariantProps(variants: FrameVariants, variant: FrameVariantName, baseProps: FrameVariantProps = {}): FrameVariantProps {
  const variantProps = variants[variant] || variants['default'] || {};
  return { ...baseProps, ...variantProps };
}

// AnimationProps extension for variants
export interface AnimationVariantsProps {
  variants?: FrameVariants;
  initialVariant?: FrameVariantName;
}

// Predefined semantic style variants that can be used across components
export const semanticVariants: FrameVariants = {
  solid: {
    fill: { type: 'solid', color: 'primary6' },
    stroke: { type: 'solid', color: 'primary6', weight: 0 },
    typography: { color: 'primary1', fontSize: 16, fontWeight: 500 },
    appearance: { radius: 8 }
  },
  surface: {
    fill: { type: 'solid', color: 'success' },
    stroke: { type: 'solid', color: 'primary4', weight: 1, opacity: 0.5 },
    typography: { color: 'primary2', fontSize: 16, fontWeight: 500 },
    appearance: { radius: 8 }
  },
  outline: {
    fill: { type: 'none' },
    stroke: { type: 'solid', color: 'primary6', weight: 2 },
    typography: { color: 'primary6', fontSize: 16, fontWeight: 500 },
    appearance: { radius: 8 }
  },
  ghost: {
    fill: { type: 'none' },
    stroke: { type: 'solid', color: 'transparent', weight: 0 },
    typography: { color: 'primary6', fontSize: 16, fontWeight: 500 },
    appearance: { radius: 8 }
  },
  transparent: {
    fill: { type: 'none' },
    stroke: { type: 'solid', color: 'transparent', weight: 0 },
    typography: { color: 'neutral9', fontSize: 16, fontWeight: 500 },
    appearance: { radius: 0 }
  },
  glass: {
    fill: { type: 'solid', color: 'white' },
    stroke: { type: 'solid', color: 'neutral3', weight: 1 },
    typography: { color: 'neutral9', fontSize: 16, fontWeight: 500 },
    appearance: { radius: 12, opacity: 0.8 },
    effects: {
      dropShadow: [{ x: 0, y: 4, blur: 12, color: 'neutral12' }]
    }
  }
};

// Helper to create component-specific variants based on semantic variants
export function createComponentVariants(baseVariants: FrameVariants, overrides: Record<string, Partial<FrameVariantProps>> = {}): FrameVariants {
  const result: FrameVariants = {};

  for (const [variantName, baseProps] of Object.entries(baseVariants)) {
    result[variantName] = { ...baseProps, ...(overrides[variantName] || {}) };
  }

  return result;
}
