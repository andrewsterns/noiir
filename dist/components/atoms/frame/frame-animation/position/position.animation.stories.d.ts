import type { Meta, StoryObj } from '@storybook/react';
import { FrameProps } from '../../Frame';
interface PositionAnimationArgs extends Partial<FrameProps> {
    children: string;
}
declare const meta: Meta<PositionAnimationArgs>;
export default meta;
type Story = StoryObj<PositionAnimationArgs>;
export declare const PositionMovement: Story;
export declare const RotationAnimation: Story;
export declare const CombinedTransforms: Story;
