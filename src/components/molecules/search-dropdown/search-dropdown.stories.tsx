import type { Meta, StoryObj } from '@storybook/react';
import { SearchDropdown } from './search-dropdown';

const meta: Meta<typeof SearchDropdown> = {
  title: 'Molecules/SearchDropdown',
  component: SearchDropdown,
};

export default meta;

type Story = StoryObj<typeof SearchDropdown>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
    ],
    placeholder: 'Type to search...',
  },
};
