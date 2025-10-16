import type { Meta, StoryObj } from '@storybook/react';
import { Frame, FrameProps } from '../Frame';
interface LayoutArgs extends Partial<FrameProps> {
    flow?: 'freeform' | 'horizontal' | 'vertical' | 'grid';
    alignment?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    gap: number;
    padding: number;
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    clipContent: boolean;
    width?: string | number | 'hug' | 'fill-container';
    height?: string | number | 'hug' | 'fill-container';
    childWidth: number;
    childHeight: number;
    childAlignment?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}
declare const meta: Meta<typeof Frame>;
export default meta;
type LayoutStory = StoryObj<LayoutArgs>;
export declare const Layout: LayoutStory;
