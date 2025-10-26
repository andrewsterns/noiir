import { VariantDocument } from '../../frame/frame-properties/variants/variants.props';

export const LABEL_SIZES = {
  sm: {
    typography: { type: 'h6' },
    autoLayout: { paddingHorizontal: 8, paddingVertical: 4, width: 'hug', height: 'hug' },
  },
  md: {
    typography: { type: 'h5' },
    autoLayout: { paddingHorizontal: 16, paddingVertical: 8, width: 'hug', height: 'hug' },
  },
  lg: {
    typography: { type: 'h4' },
    autoLayout: { paddingHorizontal: 20, paddingVertical: 12, width: 'hug', height: 'hug' },
  },
  none: {
    typography: { type: 'h6' },
    autoLayout: { paddingHorizontal: 0, paddingVertical: 0 },
  },
  fill: {
    typography: { type: 'h4' },
    autoLayout: { paddingHorizontal: 20, paddingVertical: 12, width: 'fill', height: 'hug' },
  }

} satisfies VariantDocument;

export const LABEL_VARIANTS = {
  primary: {
    fill: { type: 'solid', color: 'white2', opacity: 0.9 },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 0 },
    typography: {
      color: 'gray7',
      wrap: 'nowrap',
    },
    animate: { hover: 'primary-hover', click: 'primary-active', duration: '0.2s', curve: 'ease-in-out' },
  },

  'primary-hover': {
    fill: { type: 'solid', color: '#ff0000', opacity: 0.9 },
    
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 0 },
    typography: {
      color: 'white7',
      wrap: 'nowrap',
    },
    animate: { hover: 'primary-hover', click: 'primary-active', duration: '0.2s', curve: 'ease-in-out' },
  },

'primary-active': {
    fill: { type: 'solid', color: 'black2', opacity: 1 },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 0 },
    typography: {
      color: 'gray2',
      wrap: 'nowrap',
    },
    animate: { hover: 'primary-active-hover', click: 'primary-active', duration: '0.2s', curve: 'ease-in-out' },
  },

  'primary-active-hover': {
    fill: { type: 'solid', color: '#0000ff', opacity: .9 },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 0 },
    typography: {
      color: 'white2',
      wrap: 'nowrap',
    },
    animate: { hover: 'primary-active-hover', click: 'primary', duration: '0.2s', curve: 'ease-in-out' },
  },

  disabled: {
    fill: { type: 'solid', color: 'gray1' },
    autoLayout: { marginVertical: 2 },
    stroke: { type: 'solid', color: 'gray5', weight: 1 },
    appearance: { opacity: 0.3 },
    typography: {
      color: 'gray7',
    },
    cursor: { type: 'not-allowed' }
  },
} satisfies VariantDocument;
