import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './dropdown';
import { useState } from 'react';

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown component that combines a Button trigger with a List of selectable options.',
      },
    },
  },
  argTypes: {
    items: {
      control: { type: 'object' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const sampleItems = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry'
];

const sampleItemsWithDisabled = [
  'Apple',
  'Banana',
  { label: 'Cherry', disabled: true },
  'Date',
  'Elderberry'
];

export const Basic: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    return (
      <Dropdown
        items={sampleItems}
        selectedIndex={selectedIndex}
        onChange={(index) => setSelectedIndex(index)}
        placeholder="Choose a fruit..."
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic dropdown with simple string items.',
      },
    },
  },
};

export const WithDisabledItems: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    return (
      <Dropdown
        items={sampleItemsWithDisabled}
        selectedIndex={selectedIndex}
        onChange={(index) => setSelectedIndex(index)}
        placeholder="Choose a fruit..."
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with some disabled items that cannot be selected.',
      },
    },
  },
};

export const Preselected: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(2);

    return (
      <Dropdown
        items={sampleItems}
        selectedIndex={selectedIndex}
        onChange={(index) => setSelectedIndex(index)}
        placeholder="Choose a fruit..."
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with a pre-selected item.',
      },
    },
  },
};

export const Styled: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    return (
      <Dropdown
        items={sampleItems}
        selectedIndex={selectedIndex}
        onChange={(index) => setSelectedIndex(index)}
        placeholder="Choose a fruit..."
        buttonProps={{
          fill: { type: 'solid', color: 'gray3' },
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Styled dropdown with custom button appearance.',
      },
    },
  },
};
