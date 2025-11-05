import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from '../../../src/components/organism/navbar/navbar';
import { Button } from '../../../src/components/atoms/button/button';
import { Frame } from '../../../src/components';
import { NoiirLogo } from '../../../src/theme/noiir.svg';

const meta = {
  title: 'Organism/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default navbar with navigation items and actions
 */
export const Default: Story = {
  args: {
    logo: <NoiirLogo />,
    items: [
      { label: 'Home', href: '#' },
      { label: 'About', href: '#about' },
      { 
        label: 'Products', 
        items: [
          { label: 'Product 1', href: '#product-1' },
          { label: 'Product 2', href: '#product-2' },
          { label: 'Product 3', href: '#product-3' },
        ]
      },
      { label: 'Contact', href: '#contact' },
    ],
    actions: [
      <Button key="signin" variant="primary">Sign In</Button>,
      <Button key="signup" variant="primary">Sign Up</Button>,
    ],
  },
};

/**
 * Navbar with multiple dropdown menus
 */
export const WithDropdowns: Story = {
  args: {
    logo: <NoiirLogo />,
    items: [
      { label: 'Home', href: '#' },
      { 
        label: 'Products', 
        items: [
          { label: 'Web Apps', href: '#web' },
          { label: 'Mobile Apps', href: '#mobile' },
          { label: 'Desktop Apps', href: '#desktop' },
        ]
      },
      { 
        label: 'Services', 
        items: [
          { label: 'Consulting', href: '#consulting' },
          { label: 'Development', href: '#development' },
          { label: 'Design', href: '#design' },
        ]
      },
      { 
        label: 'Resources', 
        items: [
          { label: 'Documentation', href: '#docs' },
          { label: 'Blog', href: '#blog' },
          { label: 'Support', href: '#support' },
        ]
      },
      { label: 'About', href: '#about' },
    ],
    actions: [
      <Button key="login" variant="primary">Login</Button>,
      <Button key="started" variant="primary">Get Started</Button>,
    ],
  },
};

/**
 * Fixed navbar that stays at top of page
 */
export const Fixed: Story = {
  args: {
    logo: <NoiirLogo />,
    position: 'fixed',
    items: [
      { label: 'Home', href: '#' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'About', href: '#about' },
    ],
    actions: [
      <Button key="action" variant="primary">Get Started</Button>,
    ],
  },
  decorators: [
    (Story) => (
      <Frame 
      autoLayout={{height:1200}}
      fill={{
        type: 'linear-gradient',
        angle: 180,
        stops: [
          { color: 'white2', position: 0 },
          { color: 'white10', position: 1 }
        ]
      }}>
        <Story />
        <div style={{ padding: '100px 24px' }}>
          <h1>Scroll down to see fixed navbar</h1>
          <p>The navbar will stay at the top of the viewport.</p>
        </div>
      </Frame>
    ),
  ],
};

/**
 * Sticky navbar that scrolls with page initially then sticks
 */
export const Sticky: Story = {
  args: {
    logo: <NoiirLogo />,
    position: 'relative',
    items: [
      { label: 'Home', href: '#' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
    ],
    actions: [
      <Button key="contact" variant="primary">Contact</Button>,
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200vh' }}>
        <div style={{ height: '100px', background: '#f0f0f0', padding: '24px' }}>
          <h2>Header content above navbar</h2>
        </div>
        <Story />
        <div style={{ padding: '100px 24px' }}>
          <h1>Scroll down</h1>
          <p>The navbar will stick to the top after scrolling past the header.</p>
        </div>
      </div>
    ),
  ],
};

/**
 * Simple navbar with minimal actions
 */
export const Minimal: Story = {
  args: {
    logo: <NoiirLogo />,
    items: [
      { label: 'Home', href: '#' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },
};

/**
 * Navbar with onClick handlers instead of hrefs
 */
export const WithClickHandlers: Story = {
  args: {
    logo: <NoiirLogo />,
    items: [
      { 
        label: 'Alert', 
        onClick: () => alert('You clicked Alert!') 
      },
      { 
        label: 'Console', 
        onClick: () => console.log('Logged to console') 
      },
      { 
        label: 'Dropdown', 
        items: [
          { label: 'Option 1', onClick: () => alert('Option 1') },
          { label: 'Option 2', onClick: () => alert('Option 2') },
          { label: 'Option 3', onClick: () => alert('Option 3') },
        ]
      },
    ],
    actions: [
      <Button key="action" variant="primary" onClick={() => alert('Action button clicked!')}>
        Action
      </Button>,
    ],
  },
};

/**
 * Mobile-responsive navbar (resize viewport to see mobile menu)
 */
export const MobileResponsive: Story = {
  args: {
    logo: <NoiirLogo />,
    items: [
      { label: 'Home', href: '#' },
      { label: 'Features', href: '#features' },
      { 
        label: 'Products', 
        items: [
          { label: 'Product A', href: '#a' },
          { label: 'Product B', href: '#b' },
          { label: 'Product C', href: '#c' },
        ]
      },
      { label: 'Pricing', href: '#pricing' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
    actions: [
      <Button key="signin" variant="primary">Sign In</Button>,
      <Button key="signup" variant="primary">Sign Up</Button>,
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
