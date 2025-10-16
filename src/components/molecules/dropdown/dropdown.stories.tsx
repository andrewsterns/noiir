import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownMenuItem } from './dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable dropdown menu component built with two Frame components featuring cross-frame animations and interactions.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right']
    },
    closeOnItemClick: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Basic: Story = {
  args: {
    trigger: 'Select Option',
    position: 'bottom-left',
    closeOnItemClick: true,
    children: (
      <>
        <DropdownMenuItem onClick={() => console.log('Option 1 clicked')}>
          Option 1
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Option 2 clicked')}>
          Option 2
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Option 3 clicked')} disabled>
          Disabled Option
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Option 4 clicked')} selected>
          Selected Option
        </DropdownMenuItem>
      </>
    )
  }
};

export const WithIcons: Story = {
  args: {
    trigger: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>⚙️</span>
        <span>Settings</span>
      </div>
    ),
    position: 'bottom-right',
    children: (
      <>
        <DropdownMenuItem onClick={() => console.log('Profile clicked')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>👤</span>
            <span>Profile</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Settings clicked')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚙️</span>
            <span>Settings</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Help clicked')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>❓</span>
            <span>Help</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Logout clicked')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🚪</span>
            <span>Logout</span>
          </div>
        </DropdownMenuItem>
      </>
    )
  }
};

export const Positions: Story = {
  args: {
    trigger: 'Position Test',
    position: 'bottom-left',
    children: (
      <>
        <DropdownMenuItem>Bottom Left</DropdownMenuItem>
        <DropdownMenuItem>Position</DropdownMenuItem>
        <DropdownMenuItem>Test</DropdownMenuItem>
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Test different dropdown positions. Use the controls to change position.'
      }
    }
  }
};

export const CustomStyling: Story = {
  args: {
    trigger: 'Custom Styled',
    position: 'bottom-left',
    triggerProps: {
      fill: { type: 'solid', color: 'primary6' },
      stroke: { type: 'solid', color: 'primary8', weight: 2 },
      appearance: { radius: 12 }
    },
    menuProps: {
      fill: { type: 'solid', color: 'neutral1' },
      stroke: { type: 'solid', color: 'primary5', weight: 2 },
      appearance: { radius: 12 },
      effects: {
        dropShadow: [{
          x: 0,
          y: 8,
          blur: 16,
          color: 'rgba(0, 0, 0, 0.15)'
        }]
      }
    },
    children: (
      <>
        <DropdownMenuItem
          frameProps={{
            fill: { type: 'solid', color: 'primary2' }
          }}
          onClick={() => console.log('Custom item clicked')}
        >
          Custom Item 1
        </DropdownMenuItem>
        <DropdownMenuItem
          frameProps={{
            fill: { type: 'solid', color: 'secondary2' }
          }}
        >
          Custom Item 2
        </DropdownMenuItem>
        <DropdownMenuItem
          frameProps={{
            fill: { type: 'solid', color: 'accent2' }
          }}
        >
          Custom Item 3
        </DropdownMenuItem>
      </>
    )
  }
};