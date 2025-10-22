// --- Animate + custom event logic demo ---
import React, { useState } from 'react';

export const Animate: Story = {
  args: {
    children: 'Animate Button',
    variant: 'primary',
    animate: { hover: 'primary-hover', click: 'active' },
  },
};

export const AnimateWithHandlers: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    const [hoverCount, setHoverCount] = useState(0);
    const addNumber = () => setCount((c) => c + 5);
    const hoverCounter = () => setHoverCount((h) => h + 1);
    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 12, alignment: 'center' }}>
        <div>Click count: {count}</div>
        <div>Hover count: {hoverCount}</div>
        <Button
          variant="primary"
          onClick={addNumber}
          onMouseEnter={hoverCounter}
        >
          Primary
        </Button>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Button uses animate prop for variant switching and custom onClick/onHover handlers for counting.',
      },
    },
  },
};
// --- Basic variant stories ---
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
        <Button variant="primary" >Primary</Button>
        <Button variant="secondary">Secondary</Button>
       
      </Frame>
      
      <Frame autoLayout={{flow: 'horizontal', gap: 12, alignment: 'center'}}>
        <Button variant="primary" iconStart="🎯" iconStartActive="✅">With Icons</Button>

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
    <Frame autoLayout={{ flow: 'horizontal', gap: 12, alignment: 'center' }}>
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium</Button>
      <Button size="lg" variant="primary">Large</Button>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with different sizes (sm, md, lg) showing varying padding applied in addition to the primary variant styling.',
      },
    },
  },
};