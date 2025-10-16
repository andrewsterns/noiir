import type { Meta, StoryObj } from '@storybook/react';
import { FrameProps } from '../../Frame';
interface AppearanceAnimationArgs extends Partial<FrameProps> {
    children: string;
}
declare const meta: Meta<AppearanceAnimationArgs>;
export default meta;
type Story = StoryObj<AppearanceAnimationArgs>;
export declare const OpacityAnimation: Story;
export declare const RadiusAnimation: Story;
export declare const ButtonExample: Story;
export declare const CombinedAppearance: Story;
