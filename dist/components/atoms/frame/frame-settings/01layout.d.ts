import React from 'react';
export interface AutoLayoutProps {
    flow?: 'freeform' | 'horizontal' | 'vertical' | 'grid';
    alignment?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    width?: string | number | 'hug' | 'fill-container';
    height?: string | number | 'hug' | 'fill-container';
    gap?: number;
    itemSpacing?: number;
    padding?: number | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
    paddingHorizontal?: number | string;
    paddingVertical?: number | string;
    paddingLeft?: number | string;
    paddingRight?: number | string;
    paddingTop?: number | string;
    paddingBottom?: number | string;
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    clipContent?: boolean;
}
export interface SizeProps {
    width?: number | string | 'auto' | 'fill-parent';
    height?: number | string | 'auto' | 'fill-parent' | 'hug-contents';
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
}
export declare const convertAutoLayoutProps: (props: AutoLayoutProps) => React.CSSProperties;
export declare const convertSizeProps: (props: SizeProps) => React.CSSProperties;
