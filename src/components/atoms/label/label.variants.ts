import { VariantDocument } from '../../frame/frame-properties/variants/variants.props';

export const LABEL_VARIANTS = {
  primary: {
    fill: { type: 'solid', color: 'white2', opacity: 0.9 },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, width: 'fill', height: 'fill' },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 0 },
    typography: {
      type: 'h6',
      color: 'gray7',
      wrap: 'nowrap',
    },
    animate: { hover: 'primary-hover', click: 'primary-active', duration: '0.2s', curve: 'ease-in-out' },
  },

  'primary-hover': {
    fill: { type: 'solid', color: '#ff0000', opacity: 0.9 },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, width: 'fill', height: 'fill' },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 0 },
    typography: {
      type: 'h6',
      color: 'white7',
      wrap: 'nowrap',
    },
    animate: { hover: 'primary-hover', click: 'primary-active', duration: '0.2s', curve: 'ease-in-out' },
  },

'primary-active': {
    fill: { type: 'solid', color: 'black2', opacity: 1 },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, width: 'fill', height: 'fill' },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 0 },
    typography: {
      type: 'h6',
      color: 'gray2',
      wrap: 'nowrap',
    },
    animate: { hover: 'primary-active-hover', click: 'primary-active', duration: '0.2s', curve: 'ease-in-out' },
  },

  'primary-active-hover': {
    fill: { type: 'solid', color: '#0000ff', opacity: .9 },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, width: 'fill', height: 'fill' },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 0 },
    typography: {
      type: 'h6',
      color: 'white2',
      wrap: 'nowrap',
    },
    animate: { hover: 'primary-active-hover', click: 'primary', duration: '0.2s', curve: 'ease-in-out' },
  },

  disabled: {
    fill: { type: 'none', color: 'transparent' },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, width: 'fill', height: 'fill' },
    stroke: { type: 'solid', color: 'gray8', weight: 1 },
    appearance: { radius: 8 },
    typography: {
      fontSize: 14,
      fontWeight: 400,
      textAlign: 'center',
      color: 'gray7',
    },
    cursor: { type: 'not-allowed' }
  },
} satisfies VariantDocument;
