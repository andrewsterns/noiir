import type { Meta, StoryObj } from '@storybook/react';
import { List } from './list';
import { useState } from 'react';

const meta: Meta<typeof List> = {
  title: 'Molecules/List',
  component: List,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A list component that renders multiple Label components with selection support.',
      },
    },
  },
  argTypes: {
    items: {
      control: { type: 'object' },
    },
    selectedIndex: {
      control: { type: 'number' },
    },
    multiSelect: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

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

export const SingleSelect: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    return (
      <List
        items={sampleItems}
        selectedIndex={selectedIndex}
        onItemClick={(index) => setSelectedIndex(index)}
        fill={{ type: 'solid', color: 'gray1' }}
        appearance={{ radius: 8 }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Single selection list - click to select one item.',
      },
    },
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

    const handleItemClick = (index: number) => {
      setSelectedIndices(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    };

    return (
      <List
        items={sampleItems}
        selectedIndices={selectedIndices}
        multiSelect={true}
        onItemClick={handleItemClick}
        fill={{ type: 'solid', color: 'gray1' }}
        appearance={{ radius: 8 }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-selection list - click to toggle selection of multiple items.',
      },
    },
  },
};

export const WithDisabledItems: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    return (
      <List
        items={sampleItemsWithDisabled}
        selectedIndex={selectedIndex}
        onItemClick={(index) => setSelectedIndex(index)}
        fill={{ type: 'solid', color: 'gray1' }}
        appearance={{ radius: 8 }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'List with disabled items that cannot be selected.',
      },
    },
  },
};

export const StyledList: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(0);

    return (
      <List
        items={sampleItems}
        selectedIndex={selectedIndex}
        onItemClick={(index) => setSelectedIndex(index)}
        fill={{ type: 'solid', color: 'blue1' }}
        stroke={{ type: 'solid', color: 'blue4', weight: 1 }}
        appearance={{ radius: 12 }}
        effects={{ dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0,0,0,0.1)' }] }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Styled list with custom colors, borders, and shadows.',
      },
    },
  },
};
