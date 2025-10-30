import { ExtendVariant } from '../../frame/frame-properties/variants/variants.props';
import { VARIANT_STYLES } from '../../../theme/variant';

export const LABEL_SIZES = {
  fill: {
    autoLayout: { width: 'fill', height: 'fill' },
  },
  sm:{
    typography: { type: 'body' },
    autoLayout: { width: '1rem', height: 'fill' },
  },
  md:{
    typography: { type: 'h6' },
    autoLayout: { width: '2rem', height: 'fill' },
  },
  lg:{
    typography: { type: 'h5' },
    autoLayout: { width: '3rem', height: 'fill' },
  },
} satisfies ExtendVariant;

export const LABEL_VARIANTS = {
  primary: {
    fill: { type: 'solid', color: 'black6', opacity: 1 },
    stroke: { type: 'none' },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },
    appearance: { radius: 0 },
    typography: {
      type: 'h6',
      color: 'white2',
      wrap: 'nowrap',
    },
    animate: { hover: { variant: 'primaryHover', duration: '0.2s', curve: 'ease-in-out' }, click: { variant: 'primaryActive', duration: '0.2s', curve: 'ease-in-out' } },
  },

 primaryHover: {
    fill: { type: 'solid', color: 'black7', opacity: 1 },
    stroke: { type: 'none' },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },
    appearance: { radius: 0 },
    typography: {
      type: 'h6',
      color: 'white1',
      wrap: 'nowrap',
    },
    animate: { hover: { variant: 'primaryHover', duration: '0.2s', curve: 'ease-in-out' }, click: { variant: 'primaryActive', duration: '0.2s', curve: 'ease-in-out' } },
  },

  primaryActive: {
     fill: { type: 'solid', color: 'black7', opacity: 1 },
        stroke: { type: 'solid', color: 'black4', weight: 1 },
        autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },
        typography: {
          type: 'h6',
            color: 'white6',
            wrap: 'nowrap',

        },
    animate: { hover: { variant: 'primaryActiveHover', duration: '0.2s', curve: 'ease-in-out' }, click: { variant: 'primaryActive', duration: '0.2s', curve: 'ease-in-out' } },
  },

  primaryActiveHover: {
    fill: { type: 'solid', color: 'black6', opacity: .2 },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },
    stroke: { type: 'solid', color: 'black4', weight: 1, opacity: 0 },
    appearance: { radius: 0 },
    typography: {
      type: 'h6',
      color: 'black6',
      wrap: 'nowrap',
    },
    animate: { hover: { variant: 'primaryActiveHover', duration: '0.2s', curve: 'ease-in-out' }, click: { variant: 'primary', duration: '0.2s', curve: 'ease-in-out' } },
  },

  disabled: {
    fill: { type: 'solid', color: 'gray1' },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 2 },
    stroke: { type: 'solid', color: 'gray5', weight: 1 },
    appearance: { opacity: 0.3 },
    typography: {
      type: 'h6',
      color: 'gray7',
    },
    cursor: { type: 'not-allowed' }
  },
} satisfies ExtendVariant;
