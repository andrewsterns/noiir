import * as React from 'react';
import { 
  TypographyProps, 
  convertTypographyProps as convertTypographyPropsBase,
  applyTypographyPreset,
  mergeTypographyProps
} from '../../packages/frame-core/src/typography/typography.props';
import { fonts } from './fonts';

/**
 * Re-export the main conversion function from types
 */
export const convertTypographyProps = convertTypographyPropsBase;

/**
 * Re-export helper functions from types
 */
export { mergeTypographyProps, applyTypographyPreset };

// Re-export fonts for convenience
export { fonts };

/**
 * DEPRECATED: Typography presets have been moved to __variants__/atoms/text/text.variants.tsx
 * Use the Text component with variants instead:
 * 
 * @example
 * import { Text } from '@noiir/core';
 * <Text variant="h1">Heading</Text>
 * <Text variant="body">Body text</Text>
 * 
 * For backward compatibility, use text variants directly:
 * import { textVariants } from '@noiir/core/variants';
 */