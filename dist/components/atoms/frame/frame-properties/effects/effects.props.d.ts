import * as React from 'react';
export interface EffectProps {
    dropShadow?: {
        x: number;
        y: number;
        blur: number;
        spread?: number;
        color: string;
    }[];
    innerShadow?: {
        x: number;
        y: number;
        blur: number;
        spread?: number;
        color: string;
    }[];
    layerBlur?: {
        radius: number;
    };
    backgroundBlur?: {
        radius: number;
    };
    noise?: {
        intensity: number;
        seed?: number;
    };
    texture?: {
        url: string;
        opacity?: number;
        blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light';
    };
}
/**
 * Convert effect props to CSS styles
 */
export declare const convertEffectProps: (props: EffectProps) => React.CSSProperties;
