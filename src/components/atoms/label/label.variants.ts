import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';

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
    animate: { hover: 'primaryHover', click: 'primaryActive', duration: '0.2s', curve: 'ease-in-out' },
  },

 primaryHover: {
    fill: { type: 'solid', color: 'tomato6', opacity: 0.9 },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, width: 'fill', height: 'fill' },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 0 },
    typography: {
      type: 'h6',
      color: 'white7',
      wrap: 'nowrap',
    },
    animate: { hover: 'primaryHover', click: 'primaryActive', duration: '0.2s', curve: 'ease-in-out' },
  },

  primaryActive: {
    fill: { type: 'solid', color: 'black2', opacity: 1 },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, width: 'fill', height: 'fill' },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 0 },
    typography: {
      type: 'h6',
      color: 'gray2',
      wrap: 'nowrap',
    },
    animate: { hover: 'primaryActiveHover', click: 'primaryActive', duration: '0.2s', curve: 'ease-in-out' },
  },

  primaryActiveHover: {
    fill: { type: 'solid', color: '#0000ff', opacity: .9 },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, width: 'fill', height: 'fill' },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 0 },
    typography: {
      type: 'h6',
      color: 'white2',
      wrap: 'nowrap',
    },
    animate: { hover: 'primaryActiveHover', click: 'primary', duration: '0.2s', curve: 'ease-in-out' },
  },

  disabled: {
    fill: { type: 'solid', color: 'gray1' },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 2, width: 'fill', height: 'fill' },
    stroke: { type: 'solid', color: 'gray5', weight: 1 },
    appearance: { opacity: 0.3 },
    typography: {
      type: 'h6',
      color: 'gray7',
    },
    cursor: { type: 'not-allowed' }
  },
} satisfies ExtendVariant;
