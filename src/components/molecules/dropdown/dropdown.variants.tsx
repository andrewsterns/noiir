import { VariantDocument } from '../../frame/frame-properties/variants/variants.props';
import { ArrowDown, ArrowUp } from '../../../theme/icons/arrows';

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
} satisfies VariantDocument;

// Dropdown-specific button variants
export const DROPDOWN_BUTTON_VARIANTS = {
  primary: {
    fill: { type: 'solid', color: 'white2', opacity: 0.9 },
    autoLayout: { flow: 'horizontal', paddingHorizontal: 16, paddingVertical: 8,  width: 'hug' },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 8 },
    effects: { dropShadow: [{ x: 1, y: 3, blur: 8, color: 'rgba(0, 0, 0, 0.25)', spread: -3 }] },
    typography: {
      type: 'h6',
      color: 'gray7',
      wrap: 'nowrap',
    },
    iconEnd: <ArrowDown />,
    animate: { hover: 'primary-hover', duration: '4s', curve: 'ease-in-out' },
  },

  'primary-hover': {
    fill: { type: 'solid', color: 'white1', opacity: 0.9 },
    autoLayout: { flow: 'horizontal', paddingHorizontal: 16, paddingVertical: 8, gap: 8, width: 'hug' },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 8 },
    effects: { dropShadow: [{ x: 1, y: 3, blur: 8, color: 'rgba(0, 0, 0, 0.1)', spread: -5 }] },
    typography: {
      type: 'h6',
      color: 'white7',
      wrap: 'nowrap',
    },
    iconEnd: <ArrowDown style={{ transform: 'translateY(12px)' }} />,
    animate: { click: 'primary-open', duration: '4s', curve: 'ease-in-out' },
  },

  'primary-open': {
    position: { y: 200 },
    fill: { type: 'solid', color: 'white2', opacity: 0.9 },
    autoLayout: { flow: 'horizontal', paddingHorizontal: 16, paddingVertical: 8, gap: 8, width: 'hug' },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 8 },
    effects: { dropShadow: [{ x: 1, y: 3, blur: 8, color: 'rgba(0, 0, 0, 0.25)', spread: -3 }] },
    typography: {
      type: 'h6',
      color: 'gray7',
      wrap: 'nowrap',
    },
    iconEnd: <ArrowUp />,
  },

  secondary: {
    fill: { type: 'solid', color: 'white6', opacity: 0.9 },
    autoLayout: { flow: 'horizontal', paddingHorizontal: 16, paddingVertical: 8, gap: 8, width: 'hug' },
    stroke: { type: 'none' },
    appearance: { radius: 30 },
    typography: {
      fontSize: 14,
      fontWeight: 400,
      textAlign: 'left',
      color: 'gray4',
    },
    iconEnd: <ArrowDown />,
  },

  'secondary-hover': {
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

  'secondary-open': {
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
} satisfies VariantDocument;
