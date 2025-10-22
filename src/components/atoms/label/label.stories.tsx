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
  options: ['primary', 'secondary', 'outline', 'active', 'hovered', 'disabled', 'ghost', 'surface', 'glass'] as LabelVariant[],
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

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Label',
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

import { Frame } from '../../frame/Frame';

export const InteractiveDemo: Story = {
  render: () => (
  <Frame autoLayout={{ flow: 'vertical', gap: 16, padding: 20 }}>
      <h3>Interactive Label Demo</h3>
      <p>Labels have persistent toggle states:</p>
      <p>• <strong>Hover</strong> → hovered variant</p>
      <p>• <strong>Click</strong> → toggles active variant (persists)</p>
      <p>• <strong>Click & hold</strong> → active variant during press</p>

  <Frame autoLayout={{ flow: 'horizontal', gap: 12 }} style={{ alignItems: 'center' }}>
        <Label variant="primary">Primary</Label>
        <Label variant="hovered">Hovered</Label>
        <Label variant="active">Active</Label>
        <Label variant="disabled" disabled>Disabled</Label>
      </Frame>

  <Frame autoLayout={{ flow: 'freeform' }} style={{ alignItems: 'center', marginTop: 20 }}>
    <Label
      variant="primary"
      fill={{ type: 'solid', color: 'primary3' }}
      appearance={{ radius: 4 }}
      typography={{ fontSize: 14, color: 'primary9' }}
      position={{ x: 0, y: 0 }}
    >
      Primary (freeform)
    </Label>
    <Label
      variant="hovered"
      fill={{ type: 'solid', color: 'primary3' }}
      appearance={{ radius: 4 }}
      typography={{ fontSize: 14, color: 'primary9' }}
      position={{ x: 180, y: 0 }}
    >
      Hovered (freeform)
    </Label>
    <Label
      variant="active"
      fill={{ type: 'solid', color: 'primary3' }}
      appearance={{ radius: 4 }}
      typography={{ fontSize: 14, color: 'primary9' }}
      position={{ x: 360, y: 0 }}
    >
      Active (freeform)
    </Label>
    <Label
      variant="disabled"
      fill={{ type: 'solid', color: 'primary3' }}
      appearance={{ radius: 4 }}
      typography={{ fontSize: 14, color: 'primary9' }}
      disabled
      position={{ x: 540, y: 0 }}
    >
      Disabled (freeform)
    </Label>
  </Frame>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates persistent active state toggling on click, plus hover and press states.',
      },
    },
  },
};
