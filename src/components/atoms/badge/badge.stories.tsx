import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    color: { control: 'color' },
    size: { control: { type: 'number', min: 12, max: 48, step: 2 } },
    variant: { control: { type: 'select', options: ['neutral', 'accent', 'outline', 'softDark', 'softLight', 'primary'] } },
    children: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: '99+',
    color: 'blue7',
    size: 20,
  },
};

export const Animate: Story = {
  args: {
    children: 'Animate',
    variant: 'primary',
    animate: { hover: 'neutral-hover', click: 'active' },
    size: 24,
  },
};
