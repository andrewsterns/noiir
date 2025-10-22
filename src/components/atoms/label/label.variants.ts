import {
  FillProps,
  StrokeProps,
  AppearanceProps,
  TypographyProps,
  EffectProps,
  AutoLayoutProps,
  AnimateProps,
  CursorProps
} from '../../frame/frame-properties';

export type LabelVariant = 'primary' | 'secondary' | 'outline' | 'active' | 'hovered' | 'disabled' | 'ghost' | 'surface' | 'glass';

export interface LabelVariantConfig {
  fill: FillProps;
  stroke: StrokeProps;
  appearance: AppearanceProps;
  autoLayout?: AutoLayoutProps;
  typography: TypographyProps;
  effects?: EffectProps;
  animate?: AnimateProps;
  cursor?: CursorProps;
}



export const LABEL_VARIANTS: Record<LabelVariant, LabelVariantConfig> = {
  primary: {
    fill: { type: 'none', color: 'black8' },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, margin: 4, width: 'fill', height: 'fill' },
    stroke: { type: 'none' },
    appearance: { radius: 6 },
    typography: {
      fontSize: 16,
      fontWeight: 300,
      textAlign: 'center',
      color: 'gray3',
    },
    cursor: { type: 'pointer' },
    animate: { hover: 'hovered', click: 'secondary' }
  },
  secondary: {
    fill: { type: 'solid', color: 'black7' },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, margin: 4, width: 'fill', height: 'fill' },
    stroke: { type: 'solid', color: 'gray10', weight: 1 },
    appearance: { radius: 6 },
    effects: { innerShadow: [{ x: 3, y: 6, blur: 13, spread: 5, color: 'rgba(255, 255, 255, 0.14)' }] },
    typography: {
      fontSize: 16,
      fontWeight: 500,
      textAlign: 'center',
      color: 'gray4',
    },
    animate: { hover: 'hovered', click: 'primary' }
  },
  outline: {
    fill: { type: 'none', color: 'transparent' },
    stroke: { type: 'solid', color: 'gray6', weight: 1 },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, margin: 4, width: 'fill', height: 'fill' },
    appearance: { radius: 6 },
    typography: {
      fontSize: 16,
      fontWeight: 500,
      textAlign: 'center',
      color: 'gray5',
    },
  },
  active: {
    fill: { type: 'solid', color: 'blue7', opacity: 0.2 },
    stroke: { type: 'solid', color: 'blue7', weight: 1, position: 'inside' },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, margin: 4, width: 'fill', height: 'fill' },
    appearance: { radius: 6 },
    typography: {
      fontSize: 16,
      fontWeight: 500,
      textAlign: 'center',
      color: 'blue7',
    },
    effects: { dropShadow: [{ x: 0, y: 2, blur: 4, color: 'rgba(51, 71, 146, 0.3)' }] },
  },
  hovered: {
    fill: { type: 'solid', color: 'gray5', opacity: 0.25 },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, margin: 4, width: 'fill', height: 'fill' },
    stroke: { type: 'solid', color: 'gray4', weight: 1, position: 'inside' },
    appearance: { radius: 6 },
    typography: {
      fontSize: 16,
      fontWeight: 400,
      textAlign: 'center',
      color: 'gray1',
    },
    cursor: { type: 'pointer' },
    effects: { dropShadow: [{ x: 0, y: 1, blur: 2, color: 'rgba(255,255,255,0.1)' }] },
  },
  disabled: {
    fill: { type: 'none', color: 'transparent' },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, margin: 4, width: 'fill', height: 'fill' },
    stroke: { type: 'solid', color: 'gray8', weight: 1 },
    appearance: { radius: 6 },
    typography: {
      fontSize: 16,
      fontWeight: 500,
      textAlign: 'center',
      color: 'gray7',
    },
    cursor: { type: 'not-allowed' }
  },
  ghost: {
    fill: { type: 'none', color: 'transparent' },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, margin: 4, width: 'fill', height: 'fill' },
    stroke: { type: 'none' },
    appearance: { radius: 6 },
    typography: {
      fontSize: 16,
      fontWeight: 500,
      textAlign: 'center',
      color: 'gray4',
    },
  },
  glass: {
    fill: { type: 'solid', color: 'black2', opacity: 0.8 },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, margin: 4, width: 'fill', height: 'fill' },
    stroke: { type: 'solid', color: 'gray4', weight: 1 },
    appearance: { radius: 6 },
    typography: {
      fontSize: 16,
      fontWeight: 500,
      textAlign: 'center',
      color: 'gray12',
    },
    effects: {
      innerShadow: [{ x: 0, y: 0, blur: 10, spread: 0, color: 'rgba(255, 255, 255, 0.1)' }],
      dropShadow: [{ x: 0, y: 4, blur: 6, color: 'rgba(0,0,0,0.3)' }],
      noise: { intensity: 0.02 }
    }
  },
  surface: {
    fill: { type: 'solid', color: 'black3' },
    autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8, margin: 4, width: 'fill', height: 'fill' },
    stroke: { type: 'solid', color: 'gray4', weight: 1 },
    appearance: { radius: 6 },
    typography: {
      fontSize: 16,
      fontWeight: 500,
      textAlign: 'center',
      color: 'gray4',
    },
    effects: { dropShadow: [{ x: 0, y: 1, blur: 2, color: 'rgba(0,0,0,0.2)' }] },
  },
};
