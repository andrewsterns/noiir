import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Molecules/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component extends Frame with click interactions. Inherits ALL Frame properties for complete layout control.',
      },
    },
  },
  argTypes: {
    // Button-specific controls
    onClick: { action: 'clicked' },
    disabled: { 
      control: 'boolean',
      description: 'Disable the button'
    },
    
    // Frame Fill Controls - Prove we can change fill
    fill: {
      control: 'object',
      description: 'Fill properties (solid, gradients) - Frame capability',
      table: { category: 'Frame: Visual' }
    },
    
    // Frame Stroke Controls
    stroke: {
      control: 'object', 
      description: 'Stroke properties - Frame capability',
      table: { category: 'Frame: Visual' }
    },
    
    // Frame Appearance Controls
    appearance: {
      control: 'object',
      description: 'Appearance (radius, opacity) - Frame capability',
      table: { category: 'Frame: Visual' }
    },
    
    // Frame Typography Controls
    typography: {
      control: 'object',
      description: 'Typography (fontSize, color, align) - Frame capability',
      table: { category: 'Frame: Typography' }
    },
    
    // Frame Auto Layout Controls - PROVE LAYOUT WORKS!
    autoLayout: {
      control: 'object',
      description: 'Auto Layout (flow, alignment, padding, gap) - Frame capability',
      table: { category: 'Frame: Layout' }
    },
    
    // Frame Position Controls - Show positioning works
    position: {
      control: 'object',
      description: 'Position (x, y, rotation) - Frame capability', 
      table: { category: 'Frame: Layout' }
    },
    
    // Hide less important props
    constraints: { control: false },
    className: { control: false },
    style: { control: false },
    cursor: { control: false },
    'aria-label': { control: false },
    onMouseEnter: { control: false },
    onMouseLeave: { control: false },
    onFocus: { control: false },
    onBlur: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Interactive Button demonstrating ALL Frame capabilities
 * This proves that Button inherits complete layout control from Frame
 */
export const Interactive: Story = {
  args: {
    children: 'Frame-Powered Button',
    fill: { type: 'solid', color: 'primary6' },
    appearance: { radius: 8, opacity: 1 },
    typography: { 
      fontSize: 16, 
      fontWeight: 500, 
      textAlign: 'center',
      color: 'white'
    },
    autoLayout: {
      width: 200,
      height: 60,
      flow: 'horizontal',
      alignment: 'center',
      gap: 8,
      padding: { top: 12, right: 20, bottom: 12, left: 20 }
    },
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'This button demonstrates that it has ALL Frame capabilities: fill, stroke, sizing, typography, auto layout, and positioning. Use the controls to modify any Frame property!',
      },
    },
  },
};
