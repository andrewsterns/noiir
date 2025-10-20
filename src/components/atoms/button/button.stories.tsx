import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { ButtonVariant } from './button.variants';
import { Frame } from '../..';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A button component built using Frame with support for variants, sizes, icons, and hover states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'active', 'hovered', 'disabled', 'ghost', 'surface', 'glass'] as ButtonVariant[],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    children: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Secondary Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    children: 'Ghost Button',
  },
};

export const Surface: Story = {
  args: {
    variant: 'surface',
    size: 'md',
    children: 'Surface Button',
  },
};

export const Active: Story = {
  args: {
    variant: 'active',
    size: 'md',
    children: 'Active Button',
  },
};

export const Hovered: Story = {
  args: {
    variant: 'hovered',
    size: 'md',
    children: 'Hovered Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'disabled',
    size: 'md',
    children: 'Disabled Button',
    disabled: true,
  },
};

export const WithIcons: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button with Icons',
    iconStart: '←',
    iconEnd: '→',
    iconStartActive: '⭐',
    iconEndActive: '✨',
  },
  parameters: {
    docs: {
      description: {
        story: 'This button demonstrates hover states with icon changes and variant transitions. Hover to see surface variant and active icons, click to see ghost variant.',
      },
    },
  },
};

export const StateDemo: Story = {
  render: () => (
    <Frame autoLayout={{flow: 'grid'}}>
      <h3>Interactive State Demo</h3>
      <p>Buttons have persistent toggle states:</p>
      <p>• <strong>Hover</strong> → surface variant (neutral background)</p>
      <p>• <strong>Click</strong> → toggles active variant (darker blue, persists)</p>
      <p>• <strong>Click & hold</strong> → active variant during press</p>
      
      <Frame autoLayout={{flow: 'grid'}}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="surface">Surface</Button>
      </Frame>
      
      <Frame autoLayout={{flow: 'horizontal', gap: 12, alignment: 'center'}}>
        <Button variant="primary" iconStart="🎯" iconStartActive="✅">With Icons</Button>
        <Button variant="outline" size="lg">Large Outline</Button>
      </Frame>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates persistent active state toggling on click, plus hover and press states.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Small (prop available)</Button>
      <Button size="md">Medium (prop available)</Button>
      <Button size="lg">Large (prop available)</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Size prop is available but sizing logic not implemented yet. Use Frame props for custom sizing.',
      },
    },
  },
};