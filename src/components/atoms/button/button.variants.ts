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
import { Typography } from '../../frame/frame-properties/typography/typography.props.stories';

export type ButtonVariant =
    | 'primary'
    | 'primary-hover'
    | 'secondary'
    | 'secondary-hover'
    | 'disabled'



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


export const BUTTON_SIZES = {
    sm: {
        autoLayout: { paddingHorizontal: 16, paddingVertical: 2 },
        typography: {
            fontSize: 12,
            fontWeight: 300,
            textAlign: 'center',
        }
    },
    md: {
        autoLayout: { paddingHorizontal: 20, paddingVertical: 8 },
                typography: {
            fontSize: 14,
            fontWeight: 300,
            textAlign: 'center',
        }
    },
    lg: {
        autoLayout: { paddingHorizontal: 24, paddingVertical: 10 },
    }
};

export const BUTTON_VARIANTS: Record<ButtonVariant, ButtonVariantConfig> = {
    primary: {
        fill: { type: 'solid', color: 'black9', opacity: .9 },
        autoLayout: { flow: 'grid' },
        stroke: { type: 'none' },
        appearance: { radius: 30 },

        typography: {
            fontSize: 16,
            fontWeight: 300,
            textAlign: 'center',
            color: 'gray4',

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

};