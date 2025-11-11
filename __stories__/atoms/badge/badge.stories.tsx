import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../../__components__/atoms/badge/badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    color: { control: 'color' },
    size: { control: { type: 'number', min: 12, max: 48, step: 2 } },
    variant: { control: { type: 'select', options: ['neutral', 'accent', 'outline', 'softDark', 'softLight', 'primary', 'neutral-hover', 'active'] } },
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


export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="neutral" size={20}>Neutral</Badge>
      <Badge variant="accent" size={20}>Accent</Badge>
      <Badge variant="outline" size={20}>Outline</Badge>
      <Badge variant="softDark" size={20}>Soft Dark</Badge>
      <Badge variant="softLight" size={20}>Soft Light</Badge>
      <Badge variant="primary" size={20}>Primary</Badge>
      <Badge variant="neutral-hover" size={20}>Neutral Hover</Badge>
      <Badge variant="active" size={20}>Active</Badge>
    </div>
  ),
};

export const WithColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="primary" size={20} color="blue7">Blue</Badge>
      <Badge variant="primary" size={20} color="green7">Green</Badge>
      <Badge variant="primary" size={20} color="yellow7">Yellow</Badge>
      <Badge variant="primary" size={20} color="purple7">Purple</Badge>
      <Badge variant="primary" size={20} color="orange7">Orange</Badge>
      <Badge variant="primary" size={20} color="red7">Red</Badge>
    </div>
  ),
};
