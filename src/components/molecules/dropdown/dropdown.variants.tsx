import { ExtendVariant} from '../../frame/frame-properties/variants/variants.props';
import { ArrowDown, ArrowUp } from '../../../theme/icons/arrows';
import { BUTTON_VARIANTS } from '../../atoms/button/button.variants';

/**
 * Dropdown Variants Library
 *
 * This file contains variant configurations for the Dropdown component.
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
 * <Frame variant="primary" variants={DROPDOWN_BUTTON_VARIANTS} animate={{ hover: { variant: 'primaryHover' } }} />
 *
 * @see FrameVariantConfig in variants.props.tsx for available properties
 * @see ExtendVariant type for variant collection structure
 */

export const DROPDOWN_SIZES = {
  1: {
    autoLayout: { width: 150, height: 'hug', clipContent: true },
  },
  2: {
    autoLayout: { width: 250, height: 'hug' },
  },
  3: {
    autoLayout: { width: 350, height: 'hug' },
  },
  'fill': {
    autoLayout: { width: 'fill-container', height: 'hug' },
  },
} satisfies ExtendVariant;

// Dropdown container variant
export const DROPDOWN_VARIANT = {
  default: {
    autoLayout: { 
      flow: 'vertical', 
      gap: 0 
    },
  },
} satisfies ExtendVariant;

// Dropdown-specific button variants
export const DROPDOWN_BUTTON_VARIANTS: ExtendVariant = {
  ...BUTTON_VARIANTS,
  primary: {
    ...BUTTON_VARIANTS.primary,
    iconStart: null,
    iconEnd: <ArrowDown />,
    animate: { hover: { variant: 'primaryHover', duration: '.25s', curve: 'ease-in-out' } },
  },

  primaryHover: {
    ...BUTTON_VARIANTS.primaryHover,
    iconStart: null,
    iconEnd: <ArrowDown />,
    animate: { hover: { variant: 'primaryActiveHover', duration: '.25s', curve: 'ease-in-out' }, click: { variant: 'primaryOpen', duration: '.25s', curve: 'ease-in-out' } },
  },

  primaryActive: {
    ...BUTTON_VARIANTS.primaryActive,
    iconStart: null,
    iconEnd: <ArrowUp />,
  },

  primaryActiveHover: {
     ...BUTTON_VARIANTS.primaryActiveHover,
     iconStart: null,
     iconEnd: <ArrowUp />,
  },

  secondary: {
    ...BUTTON_VARIANTS.secondary,
    fill: { type: 'solid', color: 'white6', opacity: 0.9 },
    autoLayout: { flow: 'horizontal', paddingHorizontal: 16, paddingVertical: 8, gap: 8, width: 'hug' },
    stroke: { type: 'none' },
    appearance: { radius: 30 },
    typography: {
      fontWeight: 400,
      textAlign: 'left',
      color: 'gray4',
    },
    iconEnd: <ArrowDown />,
  },

  secondaryHover: {

    fill: { type: 'none' },
    autoLayout: { flow: 'horizontal', paddingHorizontal: 16, paddingVertical: 8, gap: 8, width: 'hug' },
    stroke: { type: 'solid', color: 'white7', weight: 1 },
    appearance: { radius: 30 },
    typography: {
      fontSize: 14,
      fontWeight: 400,
      textAlign: 'left',
      color: 'gray7',
    },
    iconEnd: <ArrowDown />,
  },

  secondaryOpen: {
    fill: { type: 'none' },
    autoLayout: { flow: 'horizontal', paddingHorizontal: 16, paddingVertical: 8, gap: 8, width: 'hug' },
    stroke: { type: 'solid', color: 'white7', weight: 1 },
    appearance: { radius: 30 },
    typography: {
      fontSize: 14,
      fontWeight: 400,
      textAlign: 'left',
      color: 'gray7',
    },
    iconEnd: <ArrowUp />,
  },

  disabled: {
    fill: { type: 'none', color: 'transparent' },
    autoLayout: { flow: 'horizontal', paddingHorizontal: 16, paddingVertical: 8, gap: 8, width: 'hug' },
    stroke: { type: 'solid', color: 'gray8', weight: 1 },
    appearance: { radius: 8 },
    typography: {
      fontSize: 14,
      fontWeight: 400,
      textAlign: 'left',
      color: 'gray7',
    },
    iconEnd: <ArrowDown />,
    cursor: { type: 'not-allowed' }
  },
} satisfies ExtendVariant;
