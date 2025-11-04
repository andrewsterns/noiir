import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Frame } from '../..';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A custom input component built using Frame with support for typing, focus states, and cursor blinking.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email'],
    },
    value: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    autoFocus: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '');
    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 10, alignment: 'center' }}>
        <Input {...args} value={value} onChange={setValue} />
        <Frame>Current value: {value}</Frame>
      </Frame>
    );
  },
  args: {
    type: 'text',
    placeholder: 'Type something...',
    disabled: false,
    autoFocus: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic input with controlled value. Click to focus, type to change value, and see the cursor blink when focused.',
      },
    },
  },
};
