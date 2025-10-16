import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FrameProps } from '../../Frame';
interface LayoutAnimationArgs extends FrameProps {
    children?: React.ReactNode;
}
declare const meta: Meta<LayoutAnimationArgs>;
export default meta;
type Story = StoryObj<LayoutAnimationArgs>;
export declare const SizeAnimation: Story;
export declare const AutoLayoutFlow: Story;
export declare const ResponsiveSize: Story;
