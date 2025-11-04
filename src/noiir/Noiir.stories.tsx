import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Noiir } from '../noiir/Noiir';

const meta: Meta<typeof Noiir> = {
  title: 'Runtime/Noiir',
  component: Noiir,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Runtime Noiir component loader that parses .noiir files at runtime.',
      },
    },
  },
  argTypes: {
    src: {
      control: { type: 'text' },
      description: 'Path to the .noiir file to load',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RuntimeNavbar: Story = {
  args: {
    src: './components/navbar/Navbar.noiir',
  },
};

export const WithFallback: Story = {
  args: {
    src: './components/navbar/Navbar.noiir',
    fallback: <div style={{ padding: '20px', border: '2px dashed #ccc', color: '#666' }}>
      Loading Noiir component...
    </div>,
  },
};