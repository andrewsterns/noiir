import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';
import type { LabelVariant } from './label';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A label component with interactive states for hovered, disabled, and active. Supports toggle functionality and hover states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['normal', 'hovered', 'disabled', 'active'] as LabelVariant[],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    children: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Normal: Story = {
  args: {
    variant: 'normal',
    children: 'Normal Label',
  },
};

export const Hovered: Story = {
  args: {
    variant: 'hovered',
    children: 'Hovered Label',
  },
};

export const Active: Story = {
  args: {
    variant: 'active',
    children: 'Active Label',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'disabled',
    children: 'Disabled Label',
    disabled: true,
  },
};

export const InteractiveDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
      <h3>Interactive Label Demo</h3>
      <p>Labels have persistent toggle states:</p>
      <p>• <strong>Hover</strong> → hovered variant</p>
      <p>• <strong>Click</strong> → toggles active variant (persists)</p>
      <p>• <strong>Click & hold</strong> → active variant during press</p>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Label variant="normal">Normal</Label>
        <Label variant="hovered">Hovered</Label>
        <Label variant="active">Active</Label>
        <Label variant="disabled" disabled>Disabled</Label>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '20px' }}>
        <Label
          variant="normal"
          fill={{ type: 'solid', color: 'primary3' }}
          appearance={{ radius: 4 }}
          typography={{ fontSize: 14, color: 'primary9' }}
        >
          Styled Label
        </Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates persistent active state toggling on click, plus hover and press states.',
      },
    },
  },
};
