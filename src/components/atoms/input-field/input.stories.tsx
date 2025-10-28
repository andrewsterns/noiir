import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './input';

const meta: Meta<typeof InputField> = {
  title: 'Atoms/Input',
  component: InputField,
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    placeholder: 'Type here...',
    value: '',
  },
};
