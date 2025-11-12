import type { Meta, StoryObj } from '@storybook/react';
import { SearchDropdown } from '../../../__components__/molecules/search-dropdown/search-dropdown';
import { S_DROPDOWN_VARIANTS } from '../../../__variants__/molecules/search-dropdown/search-dropdown.variants';
import { useState } from 'react';
import { Frame } from '../../../__components__/frame/Frame';
import { AnimateProvider } from '../../../__frame-core__/animate/animate.props';

const meta: Meta<typeof SearchDropdown> = {
  title: 'Molecules/SearchDropdown',
  component: SearchDropdown,
  decorators: [
    (Story) => (
      <AnimateProvider>
        <Story />
      </AnimateProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A search dropdown component that allows users to search through a list of items and select one. Supports both string items and object items with custom labels and searchable text.',
      },
    },
  },
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'Array of items to search through. Can be strings or objects with label/value/searchableText properties.',
    },
    selectedIndex: {
      control: { type: 'number' },
      description: 'Index of the currently selected item.',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text shown when no item is selected.',
    },
    searchPlaceholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the search input.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the search dropdown is disabled.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchDropdown>;

const sampleStringItems = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Honeydew',
  'Kiwi',
  'Lemon'
];

const sampleObjectItems = [
  { label: 'Apple', value: 'apple', searchableText: 'red fruit apple' },
  { label: 'Banana', value: 'banana', searchableText: 'yellow fruit banana' },
  { label: 'Cherry', value: 'cherry', searchableText: 'red small cherry' },
  { label: 'Date', value: 'date', searchableText: 'brown sweet date' },
  { label: 'Elderberry', value: 'elderberry', searchableText: 'purple berry elderberry' },
  { label: 'Fig', value: 'fig', searchableText: 'purple fruit fig' },
  { label: 'Grape', value: 'grape', searchableText: 'purple green grape' },
  { label: 'Honeydew', value: 'honeydew', searchableText: 'green melon honeydew' },
  { label: 'Kiwi', value: 'kiwi', searchableText: 'brown fuzzy kiwi' },
  { label: 'Lemon', value: 'lemon', searchableText: 'yellow sour lemon' }
];

export const Basic: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    const handleChange = (index: number, item: any) => {
      setSelectedIndex(index);
      console.log('Selected:', index, item);
    };

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16, width: 400 }}>
        <h3>Basic Search Dropdown</h3>
        <SearchDropdown
          items={sampleStringItems}
          selectedIndex={selectedIndex}
          placeholder="Choose a fruit..."
          searchPlaceholder="Search fruits..."
          onChange={handleChange}
        />
        <p>Selected index: {selectedIndex !== undefined ? selectedIndex : 'none'}</p>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic search dropdown with string items. Type to search and click to select.',
      },
    },
  },
};

export const WithObjectItems: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    const handleChange = (index: number, item: any) => {
      setSelectedIndex(index);
      console.log('Selected:', index, item);
    };

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16, width: 400 }}>
        <h3>Search Dropdown with Object Items</h3>
        <SearchDropdown
          items={sampleObjectItems}
          selectedIndex={selectedIndex}
          placeholder="Choose a fruit..."
          searchPlaceholder="Search fruits (try 'red', 'yellow', etc.)..."
          onChange={handleChange}
        />
        <p>Selected index: {selectedIndex !== undefined ? selectedIndex : 'none'}</p>
        <small>Note: Search works on the 'searchableText' property, display shows the 'label'</small>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Search dropdown with object items that have separate labels and searchable text. Demonstrates advanced search capabilities.',
      },
    },
  },
};

export const PreSelected: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(2); // Pre-select "Cherry"

    const handleChange = (index: number, item: any) => {
      setSelectedIndex(index);
      console.log('Selected:', index, item);
    };

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16, width: 400 }}>
        <h3>Pre-selected Item</h3>
        <SearchDropdown
          items={sampleStringItems}
          selectedIndex={selectedIndex}
          placeholder="Choose a fruit..."
          searchPlaceholder="Search fruits..."
          onChange={handleChange}
        />
        <p>Selected index: {selectedIndex} (Cherry is pre-selected)</p>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Search dropdown with a pre-selected item. Shows how to control the selected state externally.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, width: 400 }}>
      <h3>Disabled Search Dropdown</h3>
      <SearchDropdown
        items={sampleStringItems}
        placeholder="Cannot search..."
        searchPlaceholder="Disabled..."
        disabled={true}
      />
      <p>Note: The search dropdown is disabled and cannot be interacted with</p>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled search dropdown that cannot be opened or searched.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    const handleChange = (index: number, item: any) => {
      setSelectedIndex(index);
      console.log('Selected:', index, item);
    };

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16, width: 400 }}>
        <h3>Custom Styled Search Dropdown</h3>
        <SearchDropdown
          items={sampleStringItems}
          selectedIndex={selectedIndex}
          placeholder="Choose a fruit..."
          searchPlaceholder="Search fruits..."
          onChange={handleChange}
          variant="custom"
          variants={{
            custom: {
              fill: { type: 'solid', color: 'primary1' },
              stroke: { type: 'solid', color: 'primary4', weight: 2 },
              appearance: { radius: 12 },
              autoLayout: { flow: 'vertical', gap: 8 },
            }
          }}
        />
        <p>Selected index: {selectedIndex !== undefined ? selectedIndex : 'none'}</p>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Search dropdown with custom styling applied through variants.',
      },
    },
  },
};
