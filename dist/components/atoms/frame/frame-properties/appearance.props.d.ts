import React from 'react';
export interface AppearanceProps {
    opacity?: number;
    blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light';
    visible?: boolean;
    radius?: number | string;
    radiusTopLeft?: number | string;
    radiusTopRight?: number | string;
    radiusBottomRight?: number | string;
    radiusBottomLeft?: number | string;
}
export declare const convertAppearanceProps: (props: AppearanceProps) => React.CSSProperties;
export declare const convertCornerRadius: (radius?: number | string | {
    topLeft?: number | string;
    topRight?: number | string;
    bottomRight?: number | string;
    bottomLeft?: number | string;
}) => React.CSSProperties;
export declare const createAppearanceVariations: (baseProps: AppearanceProps, variations: {
    hover?: Partial<AppearanceProps>;
    active?: Partial<AppearanceProps>;
    focus?: Partial<AppearanceProps>;
    disabled?: Partial<AppearanceProps>;
}) => {
    base: React.CSSProperties;
    hover: React.CSSProperties;
    active: React.CSSProperties;
    focus: React.CSSProperties;
    disabled: React.CSSProperties;
};
