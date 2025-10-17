import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem } from './list';

// Reusable sample data generators for consistent testing across stories
const createSampleItems = (count: number = 5): ListItem[] => [
  { id: 'item-1', label: 'First Option', value: 'first' },
  { id: 'item-2', label: 'Second Option', value: 'second' },
  { id: 'item-3', label: 'Third Option', value: 'third' },
  { id: 'item-4', label: 'Fourth Option', value: 'fourth' },
  { id: 'item-5', label: 'Disabled Option', value: 'disabled', disabled: true },
].slice(0, count);

const createIdenticalItems = (count: number): ListItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `item-${i + 1}`,
    label: 'Same Option',
    value: `same-${i + 1}`,
  }));

const createNumberedItems = (count: number, includeDisabled: boolean = false): ListItem[] => {
  const items: ListItem[] = Array.from({ length: count }, (_, i) => ({
    id: `item-${i + 1}`,
    label: `Option ${i + 1}`,
    value: `option-${i + 1}`,
  }));

  if (includeDisabled) {
    items.push({
      id: 'item-disabled',
      label: 'Disabled Option',
      value: 'disabled',
      disabled: true,
    });
  }

  return items;
};

const meta: Meta<typeof List> = {
  title: 'Molecules/List',
  component: List,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive list component with selectable items and smooth animations.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'],
      description: 'Visual style variant for the list container',
    },
    items: {
      control: 'object',
      description: 'Array of items to display in the list',
    },
    selectedItemId: {
      control: 'text',
      description: 'ID of the currently selected item',
    },
    onItemClick: { control: false },
    onSelectionChange: { control: false },
    // Allow customization of visual properties
    fill: { control: 'object' },
    appearance: { control: 'object' },
    autoLayout: { control: 'object' },
    // Hide internal props
    className: { control: false },
    style: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

/**
 * Interactive List - Click items to select/deselect them
 */
export const Interactive: Story = {
  args: {
    variant: 'default',
    items: createSampleItems(5), // 4 regular items + 1 disabled
    selectedItemId: 'item-2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive list with selectable items. Hover over items to see hover effects, click to select/deselect. The last item is disabled and cannot be selected.',
      },
    },
  },
};

/**
 * Compact List - Minimal spacing with 4 items
 */
export const Compact: Story = {
  args: {
    variant: 'default',
    items: createSampleItems(4), // 4 regular items (no disabled)
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact list variant with minimal spacing between items. Shows 4 identical regular items.',
      },
    },
  },
};

/**
 * Spaced List - Extra spacing with 4 items
 */
export const Spaced: Story = {
  args: {
    variant: 'default',
    items: createSampleItems(4), // 4 regular items (no disabled)
  },
  parameters: {
    docs: {
      description: {
        story: 'Spaced list variant with extra padding and gaps between items. Shows 4 identical regular items.',
      },
    },
  },
};

/**
 * Custom Styled List with all 5 items
 */
export const CustomStyled: Story = {
  args: {
    variant: 'default',
    items: createSampleItems(5), // 4 regular items + 1 disabled
    fill: { type: 'solid', color: 'secondary1' },
    appearance: { radius: 12 },
    autoLayout: { width: 300 },
  },
  parameters: {
    docs: {
      description: {
        story: 'List with custom styling while maintaining all interactive behavior. Shows all 5 items including the disabled one.',
      },
    },
  },
};

/**
 * Four Identical Items - Testing consistency
 */
export const FourIdentical: Story = {
  args: {
    variant: 'default',
    items: createIdenticalItems(4), // 4 identical items
    // No pre-selected item so all appear identical
  },
  parameters: {
    docs: {
      description: {
        story: 'List with 4 identical items to test consistent behavior. All items have the same label "Same Option" and should appear identical until interacted with.',
      },
    },
  },
};

/**
 * Many Numbered Items with Disabled
 */
export const ManyItems: Story = {
  args: {
    variant: 'default',
    items: createNumberedItems(8, true), // 8 numbered items + 1 disabled
    autoLayout: { width: 250, height: 300 },
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact list with many items and scrolling. Shows 8 numbered options plus one disabled item at the end.',
      },
    },
  },
};