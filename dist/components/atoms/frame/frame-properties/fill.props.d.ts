import React from 'react';
/**
 * Simplified Fill Props with flattened gradient API
 * Examples:
 * - <Frame fill={{type: 'solid', color: 'primary3'}} />
 * - <Frame fill={{type: 'linear-gradient', angle: 45, stops: [{color: 'primary3', position: 0}, {color: 'primary8', position: 1}]}} />
 */
export interface FillProps {
    type?: 'none' | 'solid' | 'linear-gradient' | 'radial-gradient' | 'conic-gradient' | 'image';
    color?: string;
    stops?: Array<{
        color: string;
        position: number;
    }>;
    angle?: number;
    image?: {
        url: string;
        scaleMode?: 'fill' | 'fit' | 'crop' | 'tile';
    };
}
/**
 * Convert fill props to CSS styles
 */
export declare const convertFillProps: (props: FillProps, isTextElement?: boolean) => React.CSSProperties;
/**
 * Create gradient strings with flattened API
 */
declare const createGradientString: (type: "linear-gradient" | "radial-gradient" | "conic-gradient", stops: Array<{
    color: string;
    position: number;
}>, angle?: number) => string;
/**
 * Create image fill styles
 */
declare const createImageFillStyles: (image: FillProps["image"]) => React.CSSProperties;
export { createGradientString };
export { createImageFillStyles };
export declare const createMultipleFills: (fills: FillProps[]) => React.CSSProperties;
export declare const convertFillPropsUnified: (props: FillProps, isTextElement?: boolean) => React.CSSProperties;
export declare const convertSimpleFillProps: (props: FillProps, isTextElement?: boolean) => React.CSSProperties;
