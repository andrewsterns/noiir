import type { Meta, StoryObj } from '@storybook/react';
import { Guage } from './guage';

const meta: Meta<typeof Guage> = {
  title: 'Organism/Gauge',
  component: Guage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A minimal semicircular gauge with 12 tick marks using Frame primitives and curved auto layout.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Guage>;

export const Default: Story = {
  render: () => <Guage />
};