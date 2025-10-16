import type { Meta, StoryObj } from '@storybook/react';
import { Frame, FrameProps } from '../Frame';
interface AppearanceArgs extends Partial<FrameProps> {
    parentOpacity: number;
    parentVisible: boolean;
    parentRadius: number;
    parentRadiusTopLeft: number;
    parentRadiusTopRight: number;
    parentRadiusBottomRight: number;
    parentRadiusBottomLeft: number;
    parentBlendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light';
    childOpacity: number;
    childVisible: boolean;
    childRadius: number;
    childRadiusTopLeft: number;
    childRadiusTopRight: number;
    childRadiusBottomRight: number;
    childRadiusBottomLeft: number;
    childBlendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light';
}
declare const meta: Meta<typeof Frame>;
export default meta;
type AppearanceStory = StoryObj<AppearanceArgs>;
export declare const Appearance: AppearanceStory;
