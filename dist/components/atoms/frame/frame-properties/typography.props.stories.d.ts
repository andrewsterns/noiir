import type { Meta, StoryObj } from '@storybook/react';
import { Frame, FrameProps } from '../Frame';
interface TypographyArgs extends Partial<FrameProps> {
    fontFamily: string;
    fontSize: number;
    fontWeight: number | string;
    lineHeight: number | string;
    letterSpacing: number | string;
    textAlign: 'left' | 'center' | 'right' | 'justify';
    textDecoration: 'none' | 'underline' | 'line-through';
    textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    textColor: string;
    sampleText: string;
}
declare const meta: Meta<typeof Frame>;
export default meta;
type TypographyStory = StoryObj<TypographyArgs>;
export declare const Typography: TypographyStory;
