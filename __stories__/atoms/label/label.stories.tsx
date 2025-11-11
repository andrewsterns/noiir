import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../../../__components__/atoms/label/label';
import { useState } from 'react';

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
      options: ['primary', 'primary-hover', 'primary-active', 'primary-active-hover', 'disabled'],
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

export const AnimationCycle: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 20, padding: 20 }}>
      <h3>Label Animation Cycle Test</h3>
      <p>Test the natural hover/click interactions:</p>
      <p>• <strong>Hover</strong> over each label to see hover animations</p>
      <p>• <strong>Click</strong> while hovering to trigger state changes</p>
      <p>• Each label starts in its base state and responds to interactions</p>

      <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
        <div>
          <h4>Primary State</h4>
          <p>Hover → primary-hover | Click → primary-active</p>
          <Label variant="primary" onClick={() => {}}>Primary (hover & click me)</Label>
        </div>

        <div>
          <h4>Primary-Hover State</h4>
          <p>Hover → stays primary-hover | Click → primary-active</p>
          <Label variant="primaryHover" onClick={() => {}}>Primary Hover (hover & click me)</Label>
        </div>

        <div>
          <h4>Primary-Active State</h4>
          <p>Hover → primary-active-hover | Click → stays primary-active</p>
          <Label variant="primaryActive" onClick={() => {}}>Primary Active (hover & click me)</Label>
        </div>

        <div>
          <h4>Primary-Active-Hover State</h4>
          <p>Hover → stays primary-active-hover | Click → primary</p>
          <Label variant="primaryActiveHover" onClick={() => {}}>Primary Active Hover (hover & click me)</Label>
        </div>
      </Frame>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Test story showing each variant state and its hover/click behavior to verify the animation cycle works correctly.',
      },
    },
  },
};


export const Sizes: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'horizontal', gap: 12, alignment: 'center' }}>
      <Label variant="primary">Primary</Label>
      <Label variant="primaryActive">Active</Label>
      <Label variant="disabled" disabled>Disabled</Label>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels with different variants showing the available states.',
      },
    },
  },
};

import { Frame } from '../../../__components__/frame/Frame';

export const InteractiveDemo: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, padding: 20 }}>
      <h3>Interactive Label Demo</h3>
      <p>Labels support hover animations:</p>
      <p>• <strong>Hover</strong> → hover variant animation</p>
      <p>• <strong>Click</strong> → onClick handler (if provided)</p>

      <Frame autoLayout={{ flow: 'horizontal', gap: 12 }}>
        <Label variant="primary">Primary</Label>
        <Label variant="primaryActive">Active</Label>
        <Label variant="primaryHover">Hover</Label>
        <Label variant="primaryActiveHover">Active Hover</Label>
        <Label variant="disabled" disabled>Disabled</Label>
      </Frame>

      <Frame autoLayout={{ flow: 'freeform' }}>
        <Label variant="primary">Primary (freeform)</Label>
        <Label variant="primaryActive">Active (freeform)</Label>
        <Label variant="primaryHover">Hover (freeform)</Label>
        <Label variant="primaryActiveHover">Active Hover (freeform)</Label>
      </Frame>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates hover animations and different label variants.',
      },
    },
  },
};
