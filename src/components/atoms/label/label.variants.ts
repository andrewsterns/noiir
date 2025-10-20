import { FillProps } from '../../frame/frame-properties/appearance/fill.props';
import { StrokeProps } from '../../frame/frame-properties/appearance/stroke.props';
import { AppearanceProps } from '../../frame/frame-properties/appearance/appearance.props';
import { TypographyProps } from '../../frame/frame-properties/typography/typography.props';
import { EffectProps } from '../../frame/frame-properties/effects/effects.props';

export type LabelVariant = 'normal' | 'hovered' | 'disabled' | 'active';

export interface LabelVariantConfig {
  fill?: FillProps;
  stroke?: StrokeProps;
  appearance?: AppearanceProps;
  typography?: TypographyProps;
  effects?: EffectProps;
}

export const LABEL_VARIANTS: Record<LabelVariant, LabelVariantConfig> = {
  normal: {
    // Default styling - transparent background, standard text
    fill: { type: 'none', color: 'transparent' },
    stroke: { type: 'none' },
    typography: {
      color: 'gray12'
    }
  },
  hovered: {
    fill: { type: 'solid', color: 'gray12', opacity: 0.05 },
    stroke: { type: 'solid', color: 'gray5', weight: 1 },
    appearance: { radius: 4 },
    typography: {
      color: 'gray12'
    }
  },
  disabled: {
    fill: { type: 'none', color: 'transparent' },
    stroke: { type: 'none' },
    typography: {
      color: 'gray5'
    },
  },
  active: {
    fill: { type: 'solid', color: 'blue9', opacity: 0.1 },
    stroke: { type: 'solid', color: 'blue9', weight: 1 },
    appearance: { radius: 4 },
    typography: {
      color: 'blue9'
    },
    effects: { dropShadow: [{ x: 0, y: 1, blur: 2, color: 'rgba(51, 71, 146, 0.2)' }] },
  },
};
