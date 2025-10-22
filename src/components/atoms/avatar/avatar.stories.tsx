import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    size: { control: { type: 'number', min: 16, max: 128, step: 4 } },
    fallback: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/100',
    alt: 'User',
    size: 48,
  },
};

export const WithFallback: Story = {
  args: {
    size: 48,
    fallback: 'AB',
  },
};
