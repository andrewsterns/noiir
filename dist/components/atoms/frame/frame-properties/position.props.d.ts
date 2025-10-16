import React from 'react';
export interface PositionProps {
    alignment?: 'left' | 'center' | 'right' | 'justify';
    rotation?: number;
    x?: number;
    y?: number;
}
export interface ConstraintProps {
    horizontal?: 'left' | 'right' | 'center' | 'left-right' | 'scale';
    vertical?: 'top' | 'bottom' | 'center' | 'top-bottom' | 'scale';
}
export declare const convertPositionProps: (props: PositionProps, hasAutoLayout?: boolean) => React.CSSProperties;
export declare const convertConstraintProps: (props: ConstraintProps, parentWidth?: number, parentHeight?: number) => React.CSSProperties;
export declare const convertPositionAndConstraints: (positionProps?: PositionProps, constraintProps?: ConstraintProps, hasAutoLayout?: boolean, parentWidth?: number, parentHeight?: number) => React.CSSProperties;
