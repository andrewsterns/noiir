// --- Animate + custom event logic demo ---
import React, { useState } from 'react';

export const Animate: Story = {
  args: {
    children: 'Animate Button',
    variant: 'primary',
  },
};

export const AnimateWithHandlers: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    const [hoverCount, setHoverCount] = useState(0);
    const addNumber = () => setCount((c) => c + 5);
    const hoverCounter = () => setHoverCount((h) => h + 1);
    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 22, alignment: 'center' }}>
        <div>Click count: {count}</div>
        <div>Hover count: {hoverCount}</div>
        <Button
          variant="primary"
          onClick={addNumber}
          onMouseEnter={hoverCounter}
          autoLayout={{ width: 'hug' }}
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
import { Frame } from '../..';
import { ArrowUp } from '../../../theme/icons/arrows';
import { HappyFace } from '../../../theme/icons/fun';

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
      options: ['primary', 'secondary', 'disabled'],
    },
    size: {
      control: { type: 'select' },
      options: ['1', '2', '3'],
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
    size: '1',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: '2',
    children: 'Secondary Button',
  },
};

export const WithIcons: Story = {
  args: {
    variant: 'primary',
    size: '3',
    children: 'Button with Icons',
    iconStart: '←',
    iconEnd: '→',
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
    <Frame autoLayout={{ flow: 'vertical', gap: 20 }}>
      <Frame autoLayout={{ flow: 'vertical', gap: 5, paddingBottom: 20 }}>
        <h3>Interactive State Demo</h3>
        <p>Buttons have persistent toggle states:</p>
        <p>• <strong>Hover</strong> → surface variant (neutral background)</p>
        <p>• <strong>Click</strong> → toggles active variant (darker blue, persists)</p>
        <p>• <strong>Click & hold</strong> → active variant during press</p>
      </Frame>
      <Frame autoLayout={{ flow: 'grid', gap: 20, alignment: 'center', width: 'fill' }}>
        <Button variant="primary" >Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="primary" autoLayout={{ width: 220, height: 220 }} iconStart="🎯">With Icons</Button>
      </Frame>

      <Frame autoLayout={{ flow: 'horizontal', gap: 12, alignment: 'center' }}>


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
    <Frame autoLayout={{ flow: 'horizontal', gap: 20, alignment: 'center' }}>
      <Button size="1" variant="primary">Small</Button>
      <Button size="2" variant="primary">Medium</Button>
      <Button size= '3' variant="primary">Large</Button>
    </Frame>  
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with different sizes (1, 2, 3) showing varying padding applied in addition to the primary variant styling.',
      },
    },
  },
};