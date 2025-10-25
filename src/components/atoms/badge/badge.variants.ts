import { VariantDocument } from '../../frame/frame-properties/variants/variants.props';

export default {
  neutral: {
    fill: { type: 'solid', color: 'gray4' },
    typography: { color: 'gray1', fontSize: 12, fontWeight: 600 }
  },
  accent: {
    fill: { type: 'solid', color: 'blue7' },
    typography: { color: 'gray1', fontSize: 12, fontWeight: 600 }
  },
  outline: {
    fill: { type: 'solid', color: 'transparent' },
    typography: { color: 'gray10', fontSize: 12, fontWeight: 600 },
    stroke: { type: 'solid', color: 'gray5', weight: 1 }
  },
  softDark: {
    fill: { type: 'solid', color: 'gray10' },
    typography: { color: 'gray2', fontSize: 12, fontWeight: 600 }
  },
  softLight: {
    fill: { type: 'solid', color: 'gray2' },
    typography: { color: 'gray10', fontSize: 12, fontWeight: 600 }
  },
  primary: {
    fill: { type: 'solid', color: 'black10', opacity: 0.9 },
    typography: { color: 'gray4', fontSize: 12, fontWeight: 600, opacity: 0.9 }
  },
  'neutral-hover': {
    fill: { type: 'solid', color: 'gray3' },
    typography: { color: 'gray1', fontSize: 12, fontWeight: 600 }
  },
  active: {
    fill: { type: 'solid', color: 'gray2' },
    typography: { color: 'gray1', fontSize: 12, fontWeight: 600 }
  },
} satisfies VariantDocument;