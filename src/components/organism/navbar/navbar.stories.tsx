// --- Navbar stories ---
import React from 'react';

export const Basic: Story = {
  args: {
    logo: 'Logo',
    menuItems: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'services', label: 'Services' },
      { id: 'contact', label: 'Contact' },
    ],
    actions: [
      <Frame fill={{ type: 'solid', color: 'primary5' }} autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }} typography={{ color: 'white1' }}>Sign In</Frame>,
      <Frame fill={{ type: 'solid', color: 'primary6' }} autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }} typography={{ color: 'white1' }}>Sign Up</Frame>,
    ],
  },
};

export const Transparent: Story = {
  args: {
    transparent: true,
    logo: 'Logo',
    menuItems: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'contact', label: 'Contact' },
    ],
    actions: [
      <Frame fill={{ type: 'solid', color: 'white1' }} autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }} typography={{ color: 'gray8' }}>Sign In</Frame>,
    ],
  },
};
// --- Basic variant stories ---
import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './navbar';
import { Frame } from '../..';

const meta: Meta<typeof Navbar> = {
  title: 'Organism/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A complete navigation bar component with logo, menu, actions, and mobile responsiveness.',
      },
    },
  },
  argTypes: {
    sticky: {
      control: { type: 'boolean' },
    },
    transparent: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    logo: (
      <Frame typography={{ fontSize: 24, fontWeight: 700, color: 'primary6' }}>
        MyApp
      </Frame>
    ),
    menuItems: [
      { id: 'home', label: 'Home' },
      { id: 'products', label: 'Products' },
      { id: 'about', label: 'About' },
      { id: 'contact', label: 'Contact' },
    ],
    actions: [
      <Frame
        fill={{ type: 'solid', color: 'primary5' }}
        autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
        typography={{ color: 'white1' }}
        cursor="pointer"
      >
        Sign In
      </Frame>,
    ],
  },
};

export const WithMultipleActions: Story = {
  args: {
    logo: (
      <Frame typography={{ fontSize: 24, fontWeight: 700, color: 'primary6' }}>
        Dashboard
      </Frame>
    ),
    menuItems: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'users', label: 'Users' },
      { id: 'settings', label: 'Settings' },
    ],
    actions: [
      <Frame
        fill={{ type: 'solid', color: 'gray3' }}
        autoLayout={{ paddingHorizontal: 12, paddingVertical: 8 }}
        typography={{ color: 'gray8' }}
        cursor="pointer"
      >
        Help
      </Frame>,
      <Frame
        fill={{ type: 'solid', color: 'primary5' }}
        autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
        typography={{ color: 'white1' }}
        cursor="pointer"
      >
        Sign Out
      </Frame>,
    ],
  },
};

export const Minimal: Story = {
  args: {
    logo: (
      <Frame typography={{ fontSize: 20, fontWeight: 600, color: 'gray8' }}>
        Brand
      </Frame>
    ),
    menuItems: [
      { id: 'home', label: 'Home' },
      { id: 'blog', label: 'Blog' },
      { id: 'about', label: 'About' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    logo: (
      <Frame autoLayout={{ flow: 'horizontal', gap: 8, alignment: 'center' }}>
        <Frame typography={{ fontSize: 24, fontWeight: 700, color: 'primary6' }}>
          🚀
        </Frame>
        <Frame typography={{ fontSize: 20, fontWeight: 600, color: 'gray8' }}>
          Startup
        </Frame>
      </Frame>
    ),
    menuItems: [
      { id: 'features', label: 'Features', icon: '✨' },
      { id: 'pricing', label: 'Pricing', icon: '💰' },
      { id: 'docs', label: 'Docs', icon: '📚' },
      { id: 'support', label: 'Support', icon: '🆘' },
    ],
    actions: [
      <Frame
        fill={{ type: 'solid', color: 'primary5' }}
        autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
        typography={{ color: 'white1' }}
        cursor="pointer"
      >
        Get Started
      </Frame>,
    ],
  },
};

export const Sticky: Story = {
  args: {
    sticky: true,
    logo: (
      <Frame typography={{ fontSize: 24, fontWeight: 700, color: 'primary6' }}>
        StickyNav
      </Frame>
    ),
    menuItems: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'services', label: 'Services' },
      { id: 'contact', label: 'Contact' },
    ],
    actions: [
      <Frame
        fill={{ type: 'solid', color: 'primary5' }}
        autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
        typography={{ color: 'white1' }}
        cursor="pointer"
      >
        CTA
      </Frame>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Navbar with sticky positioning that stays at the top when scrolling.',
      },
    },
  },
};