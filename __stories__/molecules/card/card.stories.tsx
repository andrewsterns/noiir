import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../../../__components__/molecules/card/card';
import { Frame } from '../../../__components__/frame/Frame';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card component with avatar, title, and subheader that supports hover animations and multiple sizes.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['1', '2', '3'],
      description: 'Size of the card',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated'],
      description: 'Visual variant of the card',
    },
    title: {
      control: { type: 'text' },
      description: 'Card title',
    },
    subheader: {
      control: { type: 'text' },
      description: 'Card subheader',
    },
    avatarSrc: {
      control: { type: 'text' },
      description: 'Avatar image source',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'John Doe',
    subheader: 'Software Engineer',
    avatarSrc: 'https://i.pravatar.cc/100',
    size: '2',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default card with avatar, title, and subheader. Hover to see the animation.',
      },
    },
  },
};

export const Elevated: Story = {
  args: {
    title: 'Jane Smith',
    subheader: 'Product Designer',
    avatarSrc: 'https://i.pravatar.cc/101',
    size: '2',
    variant: 'elevated',
  },
  parameters: {
    docs: {
      description: {
        story: 'Elevated card variant with enhanced shadow effects.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 20, alignment: 'center' }}>
      <Frame autoLayout={{ flow: 'vertical', gap: 8, alignment: 'center' }}>
        <span>Small Size</span>
        <Card
          title="Alex Johnson"
          subheader="UX Researcher"
          avatarSrc="https://i.pravatar.cc/102"
          size="1"
        />
      </Frame>

      <Frame autoLayout={{ flow: 'vertical', gap: 8, alignment: 'center' }}>
        <span>Medium Size</span>
        <Card
          title="Maria Garcia"
          subheader="Frontend Developer"
          avatarSrc="https://i.pravatar.cc/103"
          size="2"
        />
      </Frame>

      <Frame autoLayout={{ flow: 'vertical', gap: 8, alignment: 'center' }}>
        <span>Large Size</span>
        <Card
          title="David Chen"
          subheader="Tech Lead"
          avatarSrc="https://i.pravatar.cc/104"
          size="3"
        />
      </Frame>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card component in different sizes (sm, md, lg) showing varying padding and avatar sizes.',
      },
    },
  },
};

export const WithoutAvatar: Story = {
  args: {
    title: 'Team Announcement',
    subheader: 'Important updates from the development team',
    size: '2',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card without avatar showing just title and subheader.',
      },
    },
  },
};
