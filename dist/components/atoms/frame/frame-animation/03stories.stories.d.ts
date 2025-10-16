/**
 * Combined Frame Animation Examples
 *
 * Comprehensive examples showing multiple animation types working together.
 * For specific animation controls, see the individual animation folders:
 * - Appearance animations: /Appearance
 * - Effects animations: /Effects
 * - Layout animations: /Layout
 * - Position animations: /Position
 */
import type { Meta, StoryObj } from '@storybook/react';
interface StoryArgs {
    width: number;
    height: number;
    layoutFlow: 'vertical' | 'horizontal' | 'freeform';
    layoutAlignment: string;
    padding: number;
    radius: number;
    opacity: number;
    backgroundColor: string;
    borderColor?: string;
    borderWeight: number;
    textColor: string;
    fontSize: number;
    fontWeight: number;
    textAlign: 'left' | 'center' | 'right';
    animationPreset: string;
    hoverScale: number;
    hoverColorShift: boolean;
    clickScale: number;
    enableHover: boolean;
    enableClick: boolean;
    disabled: boolean;
    children: string;
}
declare const meta: Meta<StoryArgs>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Interactive: Story;
export declare const Button: Story;
export declare const Card: Story;
export declare const Disabled: Story;
export declare const FlowAnimation: Story;
export declare const LayoutHoverAnimation: Story;
