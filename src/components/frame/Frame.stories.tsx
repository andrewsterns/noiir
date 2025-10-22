import type { Meta, StoryObj } from '@storybook/react';
import { Frame } from './Frame';
import { BUTTON_VARIANTS } from '../atoms/button/button.variants';

const meta: Meta<typeof Frame> = {
  title: 'Components/Frame',
  component: Frame,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Frame component - The foundation of Figma layouts. For detailed property controls, see the individual property stories under "Frame/Properties/".'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Frame>;

export const Default: Story = {
  args: {
    children: 'Hello Frame',
    
    autoLayout: { flow: 'horizontal', alignment: 'center', width: 200, height: 120 },
    fill: { type: 'solid', color: 'gray1' },
    appearance: { radius: 8 },
    typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' },
    stroke: { type: 'solid', color: 'gray5' }
  }
};

export const CycleAnimation: Story = {
  args: {
    children: 'Cycle Button',
    variant: 'primary',
    variants: BUTTON_VARIANTS,
    cursor: 'pointer'
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates cycling animation: primary → hover primary-hover → click secondary → hover secondary-hover → click primary → repeat.'
      }
    }
  }
};
