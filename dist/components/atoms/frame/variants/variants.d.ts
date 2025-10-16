import type { FrameProps } from '../Frame';
export type FrameVariantName = string;
export interface FrameVariantProps extends Omit<FrameProps, 'id' | 'variant' | 'animate' | 'children' | 'className' | 'style' | 'onClick' | 'onMouseEnter' | 'onMouseLeave'> {
}
export interface FrameVariants {
    [variant: string]: FrameVariantProps;
}
export declare function getVariantProps(variants: FrameVariants, variant: FrameVariantName, baseProps?: FrameVariantProps): FrameVariantProps;
export interface AnimationVariantsProps {
    variants?: FrameVariants;
    initialVariant?: FrameVariantName;
}
export declare const semanticVariants: FrameVariants;
export declare function createComponentVariants(baseVariants: FrameVariants, overrides?: Record<string, Partial<FrameVariantProps>>): FrameVariants;
