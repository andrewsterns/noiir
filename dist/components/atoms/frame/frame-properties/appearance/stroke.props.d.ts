import * as React from 'react';
export interface StrokeProps {
    type?: 'none' | 'solid' | 'gradient';
    color?: string;
    position?: 'inside' | 'outside' | 'center';
    weight?: number;
    opacity?: number;
    dashPattern?: number[];
    lineCap?: 'none' | 'round' | 'square';
    lineJoin?: 'miter' | 'round' | 'bevel';
    stops?: Array<{
        color: string;
        position: number;
    }>;
    gradientType?: 'linear' | 'radial' | 'angular';
    angle?: number;
}
/**
 * Convert stroke props to CSS styles
 */
export declare const convertStrokeProps: (props: StrokeProps) => React.CSSProperties;
/**
 * Create stroke pattern string
 */
export declare const createStrokePattern: (pattern: number[]) => string;
