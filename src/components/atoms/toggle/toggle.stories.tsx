import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toggle } from './toggle';
import { Frame } from '../../frame/Frame';

const meta: Meta<typeof Toggle> = {
  title: 'Atoms/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toggle switch component built with Frame, supporting various variants and sizes.',
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
      options: ['1', '2', '3'],
    },
    checked: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Solid: Story = {
  args: {
    variant: 'solid',
    size: '2',
    checked: false,
  },
  render: (args) => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
      <Toggle {...args} />
      <Toggle {...args} checked />
    </Frame>
  ),
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    size: '2',
    checked: false,
  },
  render: (args) => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
      <Toggle {...args} />
      <Toggle {...args} checked />
    </Frame>
  ),
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: '2',
    checked: false,
  },
  render: (args) => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
      <Toggle {...args} />
      <Toggle {...args} checked />
    </Frame>
  ),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: '2',
    checked: false,
  },
  render: (args) => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
      <Toggle {...args} />
      <Toggle {...args} checked />
    </Frame>
  ),
};

export const Sizes: Story = {
  args: {
    variant: 'solid',
    checked: false,
  },
  render: (args) => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
      <Frame autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}>
        <Toggle {...args} size="1" />
        <Toggle {...args} size="2" />
        <Toggle {...args} size="3" />
      </Frame>
      <Frame autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}>
        <Toggle {...args} size="1" checked />
        <Toggle {...args} size="2" checked />
        <Toggle {...args} size="3" checked />
      </Frame>
    </Frame>
  ),
};

export const Disabled: Story = {
  args: {
    variant: 'solid',
    size: '2',
    disabled: true,
  },
  render: (args) => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
      <Toggle {...args} checked={false} />
      <Toggle {...args} checked />
    </Frame>
  ),
};

export const Controlled: Story = {
  args: {
    variant: 'solid',
    size: '2',
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
        <Toggle
          {...args}
          checked={checked}
          onChange={(newChecked) => setChecked(newChecked)}
        />
        <Frame
          autoLayout={{ flow: 'vertical', gap: 8, alignment: 'center' }}
          fill={{ type: 'solid', color: 'gray1' }}
        >
          State: {checked ? 'ON' : 'OFF'}
        </Frame>
      </Frame>
    );
  },
};

export const AllVariants: Story = {
  args: {
    size: '2',
  },
  render: (args) => (
    <Frame autoLayout={{ flow: 'vertical', gap: 24, alignment: 'center' }}>
      {(['solid', 'soft', 'ghost', 'outline'] as const).map((variant) => (
        <Frame key={variant} autoLayout={{ flow: 'vertical', gap: 8, alignment: 'center' }}>
          <Frame
            autoLayout={{ flow: 'vertical', gap: 4, alignment: 'center' }}
            typography={{ fontSize: 14, fontWeight: 'bold' }}
          >
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Frame>
          <Frame autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}>
            <Toggle {...args} variant={variant} checked={false} />
            <Toggle {...args} variant={variant} checked />
          </Frame>
        </Frame>
      ))}
    </Frame>
  ),
};