import type { Meta, StoryObj } from '@storybook/react';
import { Frame, FrameProps } from '../Frame';
interface StrokeArgs extends Partial<FrameProps> {
    strokeType: 'none' | 'solid' | 'gradient' | 'image';
    strokeWeight: number;
    strokePosition: 'inside' | 'center' | 'outside';
    strokeColor: string;
    strokeDashed: boolean;
    strokeGradientType: 'linear' | 'radial' | 'angular';
    strokeGradientAngle: number;
    strokeGradientStop1Color: string;
    strokeGradientStop1Position: number;
    strokeGradientStop2Color: string;
    strokeGradientStop2Position: number;
    strokeImageUrl: string;
    strokeImageScaleMode: 'fill' | 'fit' | 'crop' | 'tile';
}
declare const meta: Meta<typeof Frame>;
export default meta;
type StrokeStory = StoryObj<StrokeArgs>;
export declare const Stroke: StrokeStory;
