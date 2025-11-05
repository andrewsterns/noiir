import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '../../../src/components/molecules/dialog/dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Molecules/Dialog',
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    open: true,
    children: 'Dialog content goes here',
  },
};
