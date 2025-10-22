import { AnimateProps } from '../../frame/frame-properties/animation/animate.props';
import { FillProps } from '../../frame/frame-properties/appearance/fill.props';
import { TypographyProps } from '../../frame/frame-properties/typography/typography.props';

export type BadgeVariant = 'neutral' | 'accent' | 'outline' | 'softDark' | 'softLight' | 'primary' | 'neutral-hover' | 'active';

export interface BadgeVariantConfig {
  fill: FillProps;
  typography: TypographyProps;
  border?: string;
  animate?: AnimateProps;
}
export const BADGE_VARIANTS: Record<BadgeVariant, BadgeVariantConfig> = {
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
    border: '1px solid #d1d5db'
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
};