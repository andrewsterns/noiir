import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Molecules/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive button with automatic hover and click animations. States transition smoothly between default, hover, and multiple click states based on user interaction.',
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'click1', 'click2', 'click3', 'disabled'],
      description: 'Button visual state - animations are handled automatically on interaction',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
    // Allow customization of visual properties
    fill: { control: 'object' },
    appearance: { control: 'object' },
    typography: { control: 'object' },
    autoLayout: { control: 'object' },
    // Hide internal props
    onClick: { control: false },
    className: { control: false },
    style: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Interactive Button - Try hovering and clicking to see all 4 animation states
 */
export const Interactive: Story = {
  args: {
    children: 'Interactive Button',
    state: 'default',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Interactive button with automatic state transitions: Default → Hover (on mouse enter) → back to Default (on mouse leave). Click to cycle through Click1 → Click2 → Click3, then hover on Click3 to return to Default. No hover animations on click states.',
      },
    },
  },
};

/**
 * Custom Styled Button
 */
export const CustomStyled: Story = {
  args: {
    children: 'Custom Button',
    state: 'default',
    variant: 'secondary',
    appearance: { radius: 12 },
    typography: { fontSize: 18, fontWeight: 600 },
    autoLayout: { width: 180, height: 50 },
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with custom styling while maintaining all interactive behavior. The state system still works with custom visual properties.',
      },
    },
  },
};
