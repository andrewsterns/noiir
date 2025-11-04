// --- Slider stories ---
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './slider';
import { Frame } from '../..';

const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A slider component built using Frame with support for different variants, sizes, and interactive value changes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'soft', 'ghost', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    min: {
      control: { type: 'number' },
    },
    max: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
    showValue: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Solid: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    showValue: true,
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    size: 'medium',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 30,
    showValue: true,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'medium',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 70,
    showValue: true,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'medium',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 40,
    showValue: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 120, alignment: 'center' }}>
      <Slider size="small" defaultValue={25} showValue />
      <Slider size="medium" defaultValue={50} showValue />
      <Slider size="large" defaultValue={75} showValue />
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sliders with different sizes (small, medium, large) showing varying track heights.',
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
        <div>Current value: {value}</div>
        <Slider
          value={value}
          onChange={setValue}
          showValue
          min={0}
          max={100}
          step={5}
        />
        <Frame autoLayout={{ flow: 'horizontal', gap: 8 }}>
          <button onClick={() => setValue(Math.max(0, value - 10))}>-</button>
          <button onClick={() => setValue(Math.min(100, value + 10))}>+</button>
        </Frame>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A controlled slider with external value management and buttons to adjust the value.',
      },
    },
  },
};

export const Range: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
      <Slider min={-50} max={50} defaultValue={0} showValue />
      <Slider min={0} max={10} step={0.5} defaultValue={5} showValue />
      <Slider min={1000} max={5000} step={100} defaultValue={3000} showValue />
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sliders with different ranges and step values to demonstrate flexibility.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 75,
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled slider that cannot be interacted with.',
      },
    },
  },
};