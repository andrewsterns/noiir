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
export type VariantDocument = Record<string, FrameVariantConfig>;

/**
 * Merges size properties into the provided props object with special handling for typography
 * @param mergedProps - The props object to merge size into
 * @returns The merged autoLayout from size
 */
export function mergeSizeProps(mergedProps: Record<string, any>): any {
  // Extract finalSize and sizeKey
  const finalSize = mergedProps.size;
  const sizeKey = mergedProps.sizeKey;

  // If size is a map and sizeKey is provided, select the specific size
  const effectiveSize = (typeof finalSize === 'object' && sizeKey && finalSize[sizeKey]) ? finalSize[sizeKey] : finalSize;

  // Merge size properties (excluding autoLayout) into mergedProps
  if (effectiveSize && typeof effectiveSize === 'object') {
    const sizeProps = { ...effectiveSize };
    delete sizeProps.autoLayout;

    // Special handling for typography - merge instead of replace
    if (sizeProps.typography && mergedProps.typography) {
      sizeProps.typography = { ...mergedProps.typography, ...sizeProps.typography };
    }

    Object.assign(mergedProps, sizeProps);
  }

  // Return the size's autoLayout for separate merging
  return effectiveSize?.autoLayout;
}

/**
 * Default variants for Frame components, acting like CSS modules for state management
 */
export default {
  default: {
    // Basic default variant - can be extended or overridden
  },
  button: {
    cursor: { type: 'pointer' },
    appearance: { radius: 4 },
  },
  card: {
    fill: { type: 'solid', color: 'white' },
    stroke: { type: 'solid', color: 'gray1', weight: 1 },
    appearance: { radius: 8 },
  },
} satisfies Record<string, FrameVariantConfig>;