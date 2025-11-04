import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavbarNoiirWrapper } from './NavbarNoiirWrapper';

const meta: Meta<typeof NavbarNoiirWrapper> = {
  title: 'Noiir/Navbar Wrapper',
  component: NavbarNoiirWrapper,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A React wrapper that loads and renders .noiir files at runtime using the ?raw import syntax.',
      },
    },
  },
  argTypes: {
    logo: {
      control: { type: 'text' },
      description: 'Logo content to display in the navbar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: 'Noiir Logo',
  },
};

export const WithReactLogo: Story = {
  args: {
    logo: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#61dafb' }}>
          ⚛️
        </span>
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
          React
        </span>
      </div>
    ),
  },
};

export const WithImageLogo: Story = {
  args: {
    logo: (
      <img
        src="https://via.placeholder.com/120x40/4f46e5/ffffff?text=LOGO"
        alt="Company Logo"
        style={{ height: '40px' }}
      />
    ),
  },
};

export const NoLogo: Story = {
  args: {},
};