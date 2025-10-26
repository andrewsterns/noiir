import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './dropdown';
import { useState } from 'react';
import { Frame } from '../../frame/Frame';

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown component that supports both single and multiple selection with customizable styling.',
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
    selectedIndices: {
      control: { type: 'object' },
    },
    multiSelect: {
      control: { type: 'boolean' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    buttonSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
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

export const SingleSelect: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    const handleChange = (index: number, item: any) => {
      setSelectedIndex(index);
      console.log('Selected:', index, item);
    };

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16, width: 300 }}>
        <h3>Single Select Dropdown</h3>
        <Dropdown
          items={sampleItems}
          selectedIndex={selectedIndex}
          placeholder="Choose a fruit..."
          onChange={handleChange}
          variant="primary"
        />
        <p>Selected index: {selectedIndex !== undefined ? selectedIndex : 'none'}</p>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Single selection dropdown - click to open and select one item.',
      },
    },
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

    const handleMultiChange = (indices: number[], items: any[]) => {
      setSelectedIndices(indices);
      console.log('Selected:', indices, items);
    };

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16, width: 300 }}>
        <h3>Multi Select Dropdown</h3>
        <Dropdown
          items={sampleItems}
          selectedIndices={selectedIndices}
          multiSelect={true}
          placeholder="Choose fruits..."
          onMultiChange={handleMultiChange}
          variant="primary"
        />
        <p>Selected indices: [{selectedIndices.join(', ')}]</p>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple selection dropdown - click to open and select multiple items.',
      },
    },
  },
};

export const WithDisabledItems: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    const handleChange = (index: number, item: any) => {
      setSelectedIndex(index);
      console.log('Selected:', index, item);
    };

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16, width: 300 }}>
        <h3>Dropdown with Disabled Items</h3>
        <Dropdown
          items={sampleItemsWithDisabled}
          selectedIndex={selectedIndex}
          placeholder="Choose a fruit..."
          onChange={handleChange}
          variant="primary"
        />
        <p>Note: "Cherry" is disabled and cannot be selected</p>
      </Frame>
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

export const SecondaryVariant: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    const handleChange = (index: number, item: any) => {
      setSelectedIndex(index);
      console.log('Selected:', index, item);
    };

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16, width: 300 }}>
        <h3>Secondary Variant Dropdown</h3>
        <Dropdown
          items={sampleItems}
          selectedIndex={selectedIndex}
          placeholder="Choose a fruit..."
          onChange={handleChange}
          variant="secondary"
        />
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with secondary styling variant.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, width: 300 }}>
      <h3>Disabled Dropdown</h3>
      <Dropdown
        items={sampleItems}
        placeholder="Cannot select..."
        disabled={true}
        variant="primary"
      />
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled dropdown that cannot be opened.',
      },
    },
  },
};

export const ButtonSizes: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    const handleChange = (index: number, item: any) => {
      setSelectedIndex(index);
      console.log('Selected:', index, item);
    };

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16, width: 400 }}>
        <h3>Dropdown Button Sizes</h3>
        <Frame autoLayout={{ flow: 'vertical', gap: 12 }}>
          <Dropdown
            items={sampleItems}
            selectedIndex={selectedIndex}
            placeholder="Small button..."
            onChange={handleChange}
            variant="primary"
            buttonSize="sm"
          />
          <Dropdown
            items={sampleItems}
            selectedIndex={selectedIndex}
            placeholder="Medium button..."
            onChange={handleChange}
            variant="primary"
            buttonSize="md"
          />
          <Dropdown
            items={sampleItems}
            selectedIndex={selectedIndex}
            placeholder="Large button..."
            onChange={handleChange}
            variant="primary"
            buttonSize="lg"
          />
        </Frame>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown buttons with different sizes (sm, md, lg) showing varying padding and dimensions.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    const handleChange = (index: number, item: any) => {
      setSelectedIndex(index);
      console.log('Selected:', index, item);
    };

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16, width: 500 }}>
        <h3>Dropdown Container Sizes</h3>
        <Frame autoLayout={{ flow: 'vertical', gap: 12 }}>
          <Dropdown
            items={sampleItems}
            selectedIndex={selectedIndex}
            placeholder="Small container..."
            onChange={handleChange}
            variant="primary"
            size="sm"
          />
          <Dropdown
            items={sampleItems}
            selectedIndex={selectedIndex}
            placeholder="Medium container..."
            onChange={handleChange}
            variant="primary"
            size="md"
          />
          <Dropdown
            items={sampleItems}
            selectedIndex={selectedIndex}
            placeholder="Large container..."
            onChange={handleChange}
            variant="primary"
            size="lg"
          />
        </Frame>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown containers with different sizes (sm, md, lg) showing varying widths and dimensions.',
      },
    },
  },
};
