import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './dropdown';

// Sample data for dropdown items
const sampleItems = [
  { id: 'item-1', label: 'First Option', value: 'first' },
  { id: 'item-2', label: 'Second Option', value: 'second' },
  { id: 'item-3', label: 'Third Option', value: 'third' },
  { id: 'item-4', label: 'Fourth Option', value: 'fourth' },
  { id: 'item-5', label: 'Disabled Option', value: 'disabled', disabled: true },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive dropdown component with selectable items, smooth animations, and keyboard navigation.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'open', 'closed', 'disabled'],
      description: 'Dropdown visual state',
    },
    items: {
      control: 'object',
      description: 'Array of dropdown items',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

/**
 * Basic Dropdown - Click to open/close and select items
 */
export const Basic: Story = {
  args: {
    items: sampleItems,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic dropdown with selectable items. Click the trigger to open/close the menu.',
      },
    },
  },
};

/**
 * Dropdown with Pre-selected Item
 */
export const WithSelection: Story = {
  args: {
    items: sampleItems,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with a pre-selected item highlighted.',
      },
    },
  },
};

/**
 * Disabled Dropdown
 */
export const Disabled: Story = {
  args: {
    items: sampleItems,
    variant: 'disabled',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled dropdown that cannot be interacted with.',
      },
    },
  },
};

/**
 * Controlled Dropdown - External state management
 */
export const Controlled: Story = {
  args: {
    items: sampleItems,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with externally controlled open state. Use the controls to toggle open/closed.',
      },
    },
  },
};
