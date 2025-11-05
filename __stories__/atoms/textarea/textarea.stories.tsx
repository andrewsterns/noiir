// --- Textarea stories ---
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../../../src/components/atoms/textarea/textarea';
import { Frame } from '../../../src/components';

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A textarea component built using Frame with support for different variants, validation states, and form integration.',
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
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'boolean' },
    },
    success: {
      control: { type: 'boolean' },
    },
    rows: {
      control: { type: 'number' },
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'both', 'horizontal', 'vertical', 'block', 'inline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Solid: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

export const Soft: Story = {
  args: {
    variant: 'soft',
    size: 'medium',
    placeholder: 'Type something here...',
    rows: 4,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'medium',
    placeholder: 'Ghost variant textarea...',
    rows: 4,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'medium',
    placeholder: 'Outline variant textarea...',
    rows: 4,
  },
};

export const Sizes: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
      <Textarea size="small" placeholder="Small textarea" rows={2} />
      <Textarea size="medium" placeholder="Medium textarea" rows={3} />
      <Textarea size="large" placeholder="Large textarea" rows={5} />
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textareas with different sizes (small, medium, large) showing varying padding and typography.',
      },
    },
  },
};

export const ValidationStates: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
      <Textarea
        variant="solid"
        placeholder="Default state"
        rows={3}
      />
      <Textarea
        variant="solid"
        placeholder="Success state"
        success={true}
        rows={3}
      />
      <Textarea
        variant="solid"
        placeholder="Error state"
        error={true}
        rows={3}
      />
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textareas showing different validation states: default, success, and error.',
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('This is a controlled textarea.\n\nYou can type here and the value is managed by React state.');
    const [charCount, setCharCount] = useState(value.length);

    const handleChange = (newValue: string) => {
      setValue(newValue);
      setCharCount(newValue.length);
    };

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
        <Textarea
          value={value}
          onChange={handleChange}
          placeholder="Controlled textarea..."
          rows={6}
        />
        <div style={{ fontSize: '12px', color: '#666' }}>
          Character count: {charCount}
        </div>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A controlled textarea with external value management and character counting.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'This textarea is disabled and cannot be edited.',
    rows: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled textarea that cannot be interacted with.',
      },
    },
  },
};

export const ResizeOptions: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
      <Textarea
        placeholder="No resize (resize: 'none')"
        resize="none"
        rows={3}
      />
      <Textarea
        placeholder="Vertical resize only (resize: 'vertical')"
        resize="vertical"
        rows={3}
      />
      <Textarea
        placeholder="Both directions (resize: 'both')"
        resize="both"
        rows={3}
      />
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textareas with different resize behaviors: none, vertical, and both directions.',
      },
    },
  },
};