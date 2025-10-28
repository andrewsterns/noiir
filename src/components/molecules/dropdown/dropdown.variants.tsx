import { ExtendVariant} from '../../frame/frame-properties/variants/variants.props';
import { ArrowDown, ArrowUp } from '../../../theme/icons/arrows';
import { BUTTON_VARIANTS } from '../../atoms/button/button.variants';


export const DROPDOWN_SIZES = {
  sm: {
    autoLayout: { width: 150, height: 'hug' },
  },
  md: {
    autoLayout: { width: 250, height: 'hug' },
  },
  lg: {
    autoLayout: { width: 350, height: 'hug' },
  },
} satisfies ExtendVariant;

// Dropdown container variant
export const DROPDOWN_VARIANT = {
  default: {
    autoLayout: { 
      flow: 'vertical', 
      width: 'fill',  // Forces dropdown to fill parent
      gap: 0 
    },
    important: ['autoLayout'], // Prevents explicit autoLayout from overriding width
  },
} satisfies ExtendVariant;

// Dropdown-specific button variants
export const DROPDOWN_BUTTON_VARIANTS: ExtendVariant = {
  ...BUTTON_VARIANTS,
  primary: {
    ...BUTTON_VARIANTS.primary,
    iconStart: null,
    iconEnd: <ArrowDown />,
    animate: { hover: 'primaryHover', duration: '.25s', curve: 'ease-in-out' },
  },

  primaryHover: {
    ...BUTTON_VARIANTS.primaryHover,
    iconStart: null,
    iconEnd: <ArrowDown />,
    animate: { hover: 'primaryActiveHover', click: 'primaryOpen', duration: '.25s', curve: 'ease-in-out' },
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
