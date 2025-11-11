import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem } from '../../../__components__/molecules/list/list';
import { useState } from 'react';
import { Frame } from '../../../__components__/frame/Frame';
import { Label } from '../../../__components__/atoms/label/label';

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

export const MultiSelect: Story = {
  render: () => {
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

    const handleItemClick = (index: number, item: ListItem) => {
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
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-selection list - hover over labels and click to toggle selection of multiple items.',
      },
    },
  },
};

export const SingleSelect: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    const handleItemClick = (index: number, item: ListItem) => {
      setSelectedIndex(index);
    };

    return (
      <List
        items={sampleItems}
        selectedIndex={selectedIndex}
        selectedVariant="primaryActive"
        multiSelect={false}
        onItemClick={handleItemClick}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Single-selection list - click to select one item at a time. Only one item can be selected.',
      },
    },
  },
};

export const WithDisabled: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    const handleItemClick = (index: number, item: ListItem) => {
      setSelectedIndex(index);
    };

    return (
      <List
        items={sampleItemsWithDisabled}
        selectedIndex={selectedIndex}
        selectedVariant="primaryActive"
        multiSelect={false}
        onItemClick={handleItemClick}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'List with disabled items - disabled items cannot be selected. Click enabled items to select them.',
      },
    },
  },
};

export const TwoLists: Story = {
  render: () => {
    const [selectedIndex1, setSelectedIndex1] = useState<number | undefined>(undefined);
    const [selectedIndex2, setSelectedIndex2] = useState<number | undefined>(undefined);

    const handleItemClick1 = (index: number, item: ListItem) => {
      setSelectedIndex1(index);
    };

    const handleItemClick2 = (index: number, item: ListItem) => {
      setSelectedIndex2(index);
    };

    return (
      <Frame autoLayout={{ flow: 'horizontal', gap: 32 }}>
        <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
          <Label variant="primary">List 1</Label>
          <List
            items={sampleItems}
            selectedIndex={selectedIndex1}
            selectedVariant="primaryActive"
            multiSelect={false}
            onItemClick={handleItemClick1}
          />
        </Frame>
        <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
          <h3>List 2</h3>
          <List
            items={sampleItems}
            selectedIndex={selectedIndex2}
            selectedVariant="primaryActive"
            multiSelect={false}
            onItemClick={handleItemClick2}
          />
        </Frame>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Two separate lists to test if selection state is properly isolated between components. Click items to select them.',
      },
    },
  },
};

export const ClickOrder: Story = {
  render: () => {
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
    const [clickOrder, setClickOrder] = useState<string[]>([]);

    const getItemLabel = (item: ListItem): string => {
      return typeof item === 'string' ? item : item.label;
    };

    const handleMultiClick = (index: number, item: ListItem) => {
      setSelectedIndices(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
      setClickOrder(prev => [...prev, getItemLabel(item)]);
    };

    const handleSingleClick = (index: number, item: ListItem) => {
      setSelectedIndex(index);
      setClickOrder(prev => [...prev, getItemLabel(item)]);
    };

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 32 }}>
        <Frame autoLayout={{ flow: 'horizontal', gap: 32 }}>
          <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
            <h3>Multi-Select List</h3>
            <List
              items={sampleItems}
              selectedIndices={selectedIndices}
              multiSelect={true}
              onItemClick={handleMultiClick}
            />
          </Frame>
          <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
            <h3>Single-Select List</h3>
            <List
              items={sampleItems}
              selectedIndex={selectedIndex}
              selectedVariant="primaryActive"
              multiSelect={false}
              onItemClick={handleSingleClick}
            />
          </Frame>
        </Frame>
        <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
          <h3>Click Order: {clickOrder.join(', ')}</h3>
        </Frame>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Two lists (multi-select and single-select) that track and display the order of clicked items. Single-select list always has exactly one selected item.',
      },
    },
  },
};
