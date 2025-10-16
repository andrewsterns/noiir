import * as React from 'react';
export interface StrokeProps {
    color?: string;
    position?: 'inside' | 'outside' | 'center';
    weight?: number;
    dashPattern?: number[];
    lineCap?: 'none' | 'round' | 'square';
    lineJoin?: 'miter' | 'round' | 'bevel';
}
/**
 * Convert stroke props to CSS styles
 */
export declare const convertStrokeProps: (props: StrokeProps) => React.CSSProperties;
/**
 * Create stroke pattern string
 */
export declare const createStrokePattern: (pattern: number[]) => string;
