import type { Meta, StoryObj } from '@storybook/react';
import { FrameProps } from '../../Frame';
interface EffectsAnimationArgs extends FrameProps {
    children?: React.ReactNode;
}
declare const meta: Meta<EffectsAnimationArgs>;
export default meta;
type Story = StoryObj<EffectsAnimationArgs>;
export declare const DropShadowAnimation: Story;
export declare const BlurAnimation: Story;
export declare const CardExample: Story;
export declare const MultipleEffects: Story;
