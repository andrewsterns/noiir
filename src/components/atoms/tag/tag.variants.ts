import { FillProps } from '../../frame/frame-properties/appearance/fill.props';
import { StrokeProps } from '../../frame/frame-properties/appearance/stroke.props';
import { AppearanceProps } from '../../frame/frame-properties/appearance/appearance.props';
import { TypographyProps } from '../../frame/frame-properties/typography/typography.props';
import { EffectProps } from '../../frame/frame-properties/effects/effects.props';

export type TagVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type TagAction = 'add' | 'remove';

export interface TagVariantConfig {
  fill?: FillProps;
  stroke?: StrokeProps;
  appearance?: AppearanceProps;
  typography?: TypographyProps;
  effects?: EffectProps;
}

export const TAG_VARIANTS: Record<TagVariant, TagVariantConfig> = {
  default: {
    fill: { type: 'solid', color: 'black3' },
    stroke: { type: 'solid', color: 'gray5', weight: 1 },
    appearance: { radius: 12 },
    typography: {
      color: 'gray12',
      fontSize: 14,
      fontWeight: 500,
      textAlign: 'center'
    }
  },
  primary: {
    fill: { type: 'solid', color: 'blue9', opacity: 0.1 },
    stroke: { type: 'solid', color: 'blue9', weight: 1 },
    appearance: { radius: 12 },
    typography: {
      color: 'blue9',
      fontSize: 14,
      fontWeight: 500,
      textAlign: 'center'
    }
  },
  secondary: {
    fill: { type: 'solid', color: 'gray6', opacity: 0.1 },
    stroke: { type: 'solid', color: 'gray6', weight: 1 },
    appearance: { radius: 12 },
    typography: {
      color: 'gray12',
      fontSize: 14,
      fontWeight: 500,
      textAlign: 'center'
    }
  },
  success: {
    fill: { type: 'solid', color: 'grass9', opacity: 0.1 },
    stroke: { type: 'solid', color: 'grass9', weight: 1 },
    appearance: { radius: 12 },
    typography: {
      color: 'grass9',
      fontSize: 14,
      fontWeight: 500,
      textAlign: 'center'
    }
  },
  warning: {
    fill: { type: 'solid', color: 'warning9', opacity: 0.1 },
    stroke: { type: 'solid', color: 'warning9', weight: 1 },
    appearance: { radius: 12 },
    typography: {
      color: 'warning9',
      fontSize: 14,
      fontWeight: 500,
      textAlign: 'center'
    }
  },
  danger: {
    fill: { type: 'solid', color: 'tomato9', opacity: 0.1 },
    stroke: { type: 'solid', color: 'tomato9', weight: 1 },
    appearance: { radius: 12 },
    typography: {
      color: 'tomato9',
      fontSize: 14,
      fontWeight: 500,
      textAlign: 'center'
    }
  },
  info: {
    fill: { type: 'solid', color: 'blue7', opacity: 0.1 },
    stroke: { type: 'solid', color: 'blue7', weight: 1 },
    appearance: { radius: 12 },
    typography: {
      color: 'blue7',
      fontSize: 14,
      fontWeight: 500,
      textAlign: 'center'
    }
  }
};