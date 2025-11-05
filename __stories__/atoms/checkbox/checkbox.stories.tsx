import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../../src/components/atoms/checkbox/checkbox';
import { Frame } from '../../../src/components/frame/Frame';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An animated checkbox component that uses variant-based animations for automatic state transitions.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['1', '2', '3'],
      description: 'Size of the checkbox',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  args: {
    size: '2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic checkbox with automatic state transitions. Click to toggle between unchecked/checked states - the animation system handles all state changes internally.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 20, alignment: 'center' }}>
      <Frame autoLayout={{ flow: 'vertical', gap: 12 }}>
        <h3>Checkbox Sizes</h3>
        <p>Click any checkbox to see the automatic state transitions</p>
      </Frame>

      <Frame autoLayout={{ flow: 'horizontal', gap: 20, alignment: 'center' }}>
        <Frame autoLayout={{ flow: 'vertical', gap: 8, alignment: 'center' }}>
          <span>Size 1</span>
          <Checkbox size="1" />
        </Frame>
        <Frame autoLayout={{ flow: 'vertical', gap: 8, alignment: 'center' }}>
          <span>Size 2</span>
          <Checkbox size="2" />
        </Frame>
        <Frame autoLayout={{ flow: 'vertical', gap: 8, alignment: 'center' }}>
          <span>Size 3</span>
          <Checkbox size="3" />
        </Frame>
      </Frame>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox component in different sizes showing how the animation system works across all variants.',
      },
    },
  },
};

export const AnimationDemo: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 20, alignment: 'center' }}>
      <Frame autoLayout={{ flow: 'vertical', gap: 12, alignment: 'center' }}>
        <h3>Animation States</h3>
        <p>The checkbox automatically transitions between:</p>
        <ul style={{ textAlign: 'left', margin: '8px 0' }}>
          <li><strong>unchecked</strong> → click → <strong>checked</strong></li>
          <li><strong>checked</strong> → click → <strong>unchecked</strong></li>
          <li>Hover states available in both checked/unchecked</li>
        </ul>
      </Frame>

      <Frame autoLayout={{ flow: 'horizontal', gap: 12, alignment: 'center' }}>
        <Checkbox size="2" />
        <Checkbox size="2" />
        <Checkbox size="2" />
      </Frame>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the automatic state transitions handled by the animation system. No external state management needed.',
      },
    },
  },
};
