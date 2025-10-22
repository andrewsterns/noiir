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

export type ButtonVariant =
    | 'primary'
    | 'primary-hover'
    | 'secondary'
    | 'secondary-hover'
    | 'outline'
    | 'active'
    | 'disabled'
    | 'ghost'
    | 'surface'
    | 'glass';


export interface ButtonVariantConfig {
    fill: FillProps;
    stroke: StrokeProps;
    appearance: AppearanceProps;
    autoLayout?: AutoLayoutProps
    typography: TypographyProps;
    effects?: EffectProps;
    animate?: AnimateProps;
    cursor?: CursorProps;
}

export const BUTTON_VARIANTS: Record<ButtonVariant, ButtonVariantConfig> = {
    primary: {
        fill: { type: 'solid', color: 'black9', opacity: .9 },
        autoLayout: { flow: 'grid', paddingHorizontal: 25, paddingVertical: 8 },
        stroke: { type: 'none' },
        appearance: { radius: 30 },

        typography: {
            fontSize: 16,
            fontWeight: 300,
            textAlign: 'center',
            color: 'gray4',
            opacity: 0.8,
        },
        animate: { hover: 'primary-hover', click: 'secondary' }
    },
    secondary: {
        fill: { type: 'solid', color: '#ff0000', opacity: .9 },
        autoLayout: { flow: 'grid', paddingHorizontal: 25, paddingVertical: 8 },
        stroke: { type: 'none' },
        appearance: { radius: 30 },

        typography: {
            fontSize: 16,
            fontWeight: 300,
            textAlign: 'center',
            color: 'gray4',
            opacity: 0.8,
        },
        animate: { hover: 'secondary-hover', click: 'primary' }
    },

    'primary-hover': {
        fill: { type: 'solid', color: 'gray1', opacity: 0.8 },
        autoLayout: { flow: 'grid', paddingHorizontal: 25, paddingVertical: 8 },
        stroke: { type: 'none' },
        appearance: { radius: 30 },
        typography: {
            fontSize: 16,
            fontWeight: 300,
            textAlign: 'center',
            color: 'black7'
        },
    },
    'secondary-hover': {
        fill: { type: 'none' },
        stroke: { type: 'solid', color: '#ff0000', weight: 1 },
        appearance: { radius: 30 },
        autoLayout: { flow: 'grid', paddingHorizontal: 25, paddingVertical: 8 },
        typography: {
            fontSize: 16,
            fontWeight: 300,
            textAlign: 'center',
            color: 'gray7'
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
        effects: { dropShadow: [{ x: 0, y: 1, blur: 2, color: 'rgba(0,0,0,0.2)' }] }
    },

};