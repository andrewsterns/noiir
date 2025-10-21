import { FillProps } from '../../frame/frame-properties/appearance/fill.props';
import { StrokeProps } from '../../frame/frame-properties/appearance/stroke.props';
import { AppearanceProps } from '../../frame/frame-properties/appearance/appearance.props';
import { TypographyProps } from '../../frame/frame-properties/typography/typography.props';
import { EffectProps } from '../../frame/frame-properties/effects/effects.props';
import { AutoLayoutProps } from '../../frame/frame-properties';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'active' | 'hovered' | 'disabled' | 'ghost' | 'surface' | 'glass';

export interface ButtonVariantConfig {
    fill: FillProps;
    stroke: StrokeProps;
    appearance: AppearanceProps;
    autoLayout?: AutoLayoutProps
    typography: TypographyProps;
    effects?: EffectProps;
}

export const BUTTON_VARIANTS: Record<ButtonVariant, ButtonVariantConfig> = {
    primary: {
        fill: { type: 'none', color: 'transparent' },
        autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },
        stroke: { type: 'solid', color: 'gray9', weight: 2 },
        appearance: { radius: 6 },
        typography: {
            fontSize: 16,
            fontWeight: 300,
            textAlign: 'center',
            color: 'gray3'
        },
    },
    secondary: {
        fill: { type: 'solid', color: 'black7' },
        autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },
        stroke: { type: 'solid', color: 'gray10', weight: 1 },
        appearance: { radius: 6 },
        effects: { innerShadow: [{ x: 3, y: 6, blur: 13, spread: 5, color: 'rgba(255, 255, 255, 0.14)' }] },
        typography: {
            fontSize: 16,
            fontWeight: 500,
            textAlign: 'center',
            color: 'gray4'
        },
    },
    outline: {
        fill: { type: 'none', color: 'transparent' },
        stroke: { type: 'solid', color: 'gray6', weight: 1 },
        autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },
        appearance: { radius: 6 },
        typography: {
            fontSize: 16,
            fontWeight: 500,
            textAlign: 'center',
            color: 'gray5'
        },
    },
    active: {
        fill: { type: 'solid', color: 'gray1' },
        stroke: { type: 'none', color: 'gray7', weight: 1 },
        autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },

        appearance: { radius: 6 },
        typography: {
            fontSize: 16,
            fontWeight: 500,
            textAlign: 'center',
            color: 'black2'
        },
    },
    hovered: {
        fill: { type: 'solid', color: 'gray2', opacity: 0.5 },
        autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },
        stroke: { type: 'solid', color: 'gray9', weight: 1 },
        appearance: { radius: 6 },
        typography: {
            fontSize: 16,
            fontWeight: 400,
            textAlign: 'center',
            color: 'gray1'
        },
    },
    disabled: {
        fill: { type: 'none', color: 'transparent' },
        autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },
        stroke: { type: 'solid', color: 'gray8', weight: 1 },
        appearance: { radius: 6 },
        typography: {
            fontSize: 16,
            fontWeight: 500,
            textAlign: 'center',
            color: 'gray7'
        },
    },
    ghost: {
        fill: { type: 'none', color: 'transparent' },
        autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },
        stroke: { type: 'none' },
        appearance: { radius: 6 },
        typography: {
            fontSize: 16,
            fontWeight: 500,
            textAlign: 'center',
            color: 'gray4'
        },
    },
    glass: {
        fill: { type: 'solid', color: 'black2', opacity: 0.8 },
        autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },
        stroke: { type: 'solid', color: 'gray4', weight: 1 },
        appearance: { radius: 6 },
        typography: {
            fontSize: 16,
            fontWeight: 500,
            textAlign: 'center',
            color: 'gray12'
        },
        effects: {
            innerShadow: [{ x: 0, y: 0, blur: 10, spread: 0, color: 'rgba(255, 255, 255, 0.1)' }],
            dropShadow: [{ x: 0, y: 4, blur: 6, color: 'rgba(0,0,0,0.3)' }],
            noise: { intensity: 0.02 }
        }
    },

    surface: {
        fill: { type: 'solid', color: 'black3' },
        autoLayout: { flow: 'grid', paddingHorizontal: 16, paddingVertical: 8 },
        stroke: { type: 'solid', color: 'gray4', weight: 1 },
        appearance: { radius: 6 },
        typography: {
            fontSize: 16,
            fontWeight: 500,
            textAlign: 'center',
            color: 'gray4'
        },
        effects: { dropShadow: [{ x: 0, y: 1, blur: 2, color: 'rgba(0,0,0,0.2)' }] },
    },
};