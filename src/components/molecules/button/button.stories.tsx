import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Molecules/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive button with self-contained animation states. Supports hover, click, and combined interactions with smooth transitions.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['variantDefault', 'variantActive', 'variantHover', 'variantActiveHover'],
      description: 'Button visual state - each variant has self-contained animation logic',
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
    variant: 'variantDefault',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive button demonstrating all 4 animation states: Default → Hover → Active → ActiveHover. Each state transition is animated with dissolve effects.',
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
    variant: 'variantDefault',
    fill: { type: 'solid', color: 'secondary6' },
    appearance: { radius: 12 },
    typography: { fontSize: 18, fontWeight: 600 },
    autoLayout: { width: 180, height: 50 },
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with custom styling while maintaining all interactive behavior. The variant system still works with custom visual properties.',
      },
    },
  },
};
