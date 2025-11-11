// --- Menu stories ---
import React, { useState } from 'react';

export const Basic: Story = {
  args: {
    items: [
      { id: '1', label: 'Home', onClick: () => console.log('Home clicked') },
      { id: '2', label: 'About', onClick: () => console.log('About clicked') },
      { id: '3', label: 'Contact', onClick: () => console.log('Contact clicked') },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { id: '1', label: 'Home', icon: '🏠', onClick: () => console.log('Home clicked') },
      { id: '2', label: 'About', icon: 'ℹ️', onClick: () => console.log('About clicked') },
      { id: '3', label: 'Contact', icon: '📧', onClick: () => console.log('Contact clicked') },
    ],
  },
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    items: [
      { id: '1', label: 'Home', onClick: () => console.log('Home clicked') },
      { id: '2', label: 'About', onClick: () => console.log('About clicked') },
      { id: '3', label: 'Contact', onClick: () => console.log('Contact clicked') },
    ],
  },
};
// --- Basic variant stories ---
import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from '../../../__components__/molecules/menu/menu';
import { Frame } from '../../../__components__/frame/Frame';

const meta: Meta<typeof Menu> = {
  title: 'Molecules/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A menu component that displays a list of menu items with support for icons, links, and different orientations.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Vertical: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'services', label: 'Services' },
      { id: 'contact', label: 'Contact' },
    ],
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'services', label: 'Services', disabled: true },
      { id: 'contact', label: 'Contact' },
    ],
  },
};

export const WithLinks: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '#home' },
      { id: 'about', label: 'About', href: '#about' },
      { id: 'services', label: 'Services', href: '#services' },
      { id: 'contact', label: 'Contact', href: '#contact' },
    ],
  },
};

export const NavigationMenu: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 20 }}>
      <Frame autoLayout={{ flow: 'horizontal', gap: 20, alignment: 'center' }}>
        <h3>Navigation Menu</h3>
      </Frame>

      <Menu
        orientation="horizontal"
        items={[
          { id: 'dashboard', label: 'Dashboard', icon: '📊' },
          { id: 'users', label: 'Users', icon: '👥' },
          { id: 'settings', label: 'Settings', icon: '⚙️' },
          { id: 'help', label: 'Help', icon: '❓' },
        ]}
      />

      <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
        <h4>Vertical Menu</h4>
        <Menu
          items={[
            { id: 'profile', label: 'Profile', icon: '👤' },
            { id: 'notifications', label: 'Notifications', icon: '🔔' },
            { id: 'security', label: 'Security', icon: '🔒' },
            { id: 'logout', label: 'Logout', icon: '🚪' },
          ]}
        />
      </Frame>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete navigation example with horizontal and vertical menus.',
      },
    },
  },
};

export const InteractiveMenu: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 20 }}>
        <div>Selected: {selectedItem || 'None'}</div>

        <Menu
          items={[
            { id: 'option1', label: 'Option 1', onClick: () => setSelectedItem('Option 1') },
            { id: 'option2', label: 'Option 2', onClick: () => setSelectedItem('Option 2') },
            { id: 'option3', label: 'Option 3', onClick: () => setSelectedItem('Option 3') },
            { id: 'option4', label: 'Option 4', disabled: true, onClick: () => setSelectedItem('Option 4') },
          ]}
        />
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive menu with state management showing selected items.',
      },
    },
  },
};