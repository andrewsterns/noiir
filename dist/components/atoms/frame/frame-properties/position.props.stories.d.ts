import type { Meta, StoryObj } from '@storybook/react';
import { Frame, FrameProps } from '../Frame';
interface PositionArgs extends Partial<FrameProps> {
    positionX: number;
    positionY: number;
    positionRotation: number;
}
declare const meta: Meta<typeof Frame>;
export default meta;
type PositionStory = StoryObj<PositionArgs>;
export declare const Position: PositionStory;
