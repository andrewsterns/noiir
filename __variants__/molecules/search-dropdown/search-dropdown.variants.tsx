import { SearchIcon } from '@variants/icons';
import { ExtendVariant } from '../../../__frame-core__/variants/variants.props';
import { VARIANT_STYLES } from '@variants/theme/variant';

/**
 * SearchDropdown Variants Library
 *
 * This file contains variant configurations for the SearchDropdown component.
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
 * <SearchDropdown variants={SEARCH_DROPDOWN_VARIANTS} />
 *
 * @see FrameVariantConfig in variants.props.tsx for available properties
 * @see ExtendVariant type for variant collection structure
 */

export const S_DROPDOWN_VARIANTS: ExtendVariant = {
  default: {
    autoLayout: { flow: 'vertical', gap: 4 },
    fill: { type: 'none' },
    stroke: { type: 'none' },
  },
  bordered: {
    autoLayout: { flow: 'vertical', gap: 4 },
    fill: { type: 'solid', color: 'white' },
    stroke: { type: 'solid', color: 'gray4', weight: 1 },
    appearance: { radius: 8 },
  },
} satisfies ExtendVariant;


export const S_DROPDOWN_INPUT_VARIANTS: ExtendVariant = {
  primary: {
    ...VARIANT_STYLES.solid as any,
    autoLayout: {
      flow: 'horizontal',
      alignment: 'centerLeft',
      gap: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      paddingLeft: 14, // Make room for search icon
    },
    stroke: { type: 'none' },
    appearance: { radius: 6 },
    typography: { type: 'body', color: 'gray6' },
    iconStart: <SearchIcon />,
    iconStartColor: 'gray5',
  },
  primaryHover: {
    ...VARIANT_STYLES.solidHover as any,
   autoLayout: {
      flow: 'horizontal',
      alignment: 'centerLeft',
      gap: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      paddingLeft: 14, // Make room for search icon
    },
    fill: { type: 'solid', color: 'gray1' },
    stroke: { type: 'solid', color: 'gray5', weight: 1 },
    appearance: { radius: 6 },
    iconStart: <SearchIcon />,
    iconStartColor: 'gray2',
  },
  primaryActive: {
    ...VARIANT_STYLES.solidActive as any,
    autoLayout: {
      flow: 'horizontal',
      alignment: 'centerLeft',
      gap: 3,
      paddingHorizontal: 12,
      paddingVertical: 8,
      paddingLeft: 14, // Make room for search icon
    },
    fill: { type: 'solid', color: 'primary2' },
    stroke: { type: 'solid', color: 'primary6', weight: 2 },
    appearance: { radius: 6 },
  }
} satisfies ExtendVariant;