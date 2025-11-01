// --- Radio Button stories ---
import React, { useState } from 'react';

export const Basic: Story = {
  args: {
    checked: false,
    label: 'Radio Option',
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('option1');

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 12 }}>
        <RadioButton
          checked={selectedValue === 'option1'}
          radioValue="option1"
          onValueChange={(value) => setSelectedValue(value as string)}
          label="Option 1"
        />
        <RadioButton
          checked={selectedValue === 'option2'}
          radioValue="option2"
          onValueChange={(value) => setSelectedValue(value as string)}
          label="Option 2"
        />
        <RadioButton
          checked={selectedValue === 'option3'}
          radioValue="option3"
          onValueChange={(value) => setSelectedValue(value as string)}
          label="Option 3"
        />
        <Frame autoLayout={{ flow: 'vertical', gap: 4, paddingTop: 16 }}>
          <div>Selected: {selectedValue}</div>
        </Frame>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons in a group with shared state management.',
      },
    },
  },
};
// --- Basic variant stories ---
import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './radio-button';
import { Frame } from '../..';

const meta: Meta<typeof RadioButton> = {
  title: 'Atoms/Radio Button',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A radio button component built using Frame with support for checked/unchecked states and group functionality.',
      },
    },
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Unchecked: Story = {
  args: {
    checked: false,
    label: 'Unchecked Radio',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checked Radio',
  },
};

export const Small: Story = {
  args: {
    checked: true,
    size: 'small',
    label: 'Small Radio',
  },
};

export const Large: Story = {
  args: {
    checked: false,
    size: 'large',
    label: 'Large Radio',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled Radio',
  },
};

export const WithoutLabel: Story = {
  args: {
    checked: true,
  },
};

export const States: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
      <Frame autoLayout={{ flow: 'vertical', gap: 8 }}>
        <h3>Radio Button States</h3>
        <Frame autoLayout={{ flow: 'horizontal', gap: 20, alignment: 'center' }}>
          <RadioButton checked={false} label="Unchecked" />
          <RadioButton checked={true} label="Checked" />
          <RadioButton checked={false} disabled label="Disabled" />
        </Frame>
      </Frame>

      <Frame autoLayout={{ flow: 'vertical', gap: 8 }}>
        <h3>Sizes</h3>
        <Frame autoLayout={{ flow: 'horizontal', gap: 20, alignment: 'center' }}>
          <RadioButton checked={true} size="small" label="Small" />
          <RadioButton checked={true} size="default" label="Default" />
          <RadioButton checked={true} size="large" label="Large" />
        </Frame>
      </Frame>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of different radio button states and sizes.',
      },
    },
  },
};