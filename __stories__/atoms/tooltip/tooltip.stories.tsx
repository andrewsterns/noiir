// --- Tooltip stories ---
import React from 'react';

export const Basic: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Frame fill={{ type: 'solid', color: 'primary5' }} autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }} typography={{ color: 'white1' }}>Hover me</Frame>,
  },
};

export const Positions: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 32, alignment: 'center' }}>
      <Tooltip content="Tooltip on top" tooltipPosition="top">
        <Frame fill={{ type: 'solid', color: 'primary5' }} autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }} typography={{ color: 'white1' }}>Top</Frame>
      </Tooltip>

      <Frame autoLayout={{ flow: 'horizontal', gap: 32, alignment: 'center' }}>
        <Tooltip content="Tooltip on left" tooltipPosition="left">
          <Frame fill={{ type: 'solid', color: 'primary5' }} autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }} typography={{ color: 'white1' }}>Left</Frame>
        </Tooltip>

        <Tooltip content="Tooltip on right" tooltipPosition="right">
          <Frame fill={{ type: 'solid', color: 'primary5' }} autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }} typography={{ color: 'white1' }}>Right</Frame>
        </Tooltip>
      </Frame>

      <Tooltip content="Tooltip on bottom" tooltipPosition="bottom">
        <Frame fill={{ type: 'solid', color: 'primary5' }} autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }} typography={{ color: 'white1' }}>Bottom</Frame>
      </Tooltip>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips positioned in different directions relative to their trigger elements.',
      },
    },
  },
};
// --- Basic variant stories ---
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../../../__components__/atoms/tooltip/tooltip';
import { Frame } from '../../../__components__/frame/Frame';

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tooltip component that displays content on hover, focus, or click with support for different positions.',
      },
    },
  },
  argTypes: {
    content: {
      control: { type: 'text' },
    },
    tooltipPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'focus', 'click'],
    },
    delay: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  args: {
    content: 'This tooltip appears on top',
    tooltipPosition: 'top',
    children: <Frame fill={{ type: 'solid', color: 'primary5' }} autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }} typography={{ color: 'white1' }}>Hover for tooltip</Frame>,
  },
};

export const Bottom: Story = {
  args: {
    content: 'This tooltip appears on bottom',
    tooltipPosition: 'bottom',
    children: <Frame fill={{ type: 'solid', color: 'primary5' }} autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }} typography={{ color: 'white1' }}>Hover for tooltip</Frame>,
  },
};

export const Left: Story = {
  args: {
    content: 'This tooltip appears on left',
    tooltipPosition: 'left',
    children: <Frame fill={{ type: 'solid', color: 'primary5' }} autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }} typography={{ color: 'white1' }}>Hover for tooltip</Frame>,
  },
};

export const Right: Story = {
  args: {
    content: 'This tooltip appears on right',
    tooltipPosition: 'right',
    children: <Frame fill={{ type: 'solid', color: 'primary5' }} autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }} typography={{ color: 'white1' }}>Hover for tooltip</Frame>,
  },
};

export const FocusTrigger: Story = {
  args: {
    content: 'This tooltip appears on focus',
    trigger: 'focus',
    children: <Frame as="button" fill={{ type: 'solid', color: 'primary5' }} autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }} typography={{ color: 'white1' }}>Focus me (Tab)</Frame>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip triggered by focus events, useful for accessibility.',
      },
    },
  },
};

export const ClickTrigger: Story = {
  args: {
    content: 'This tooltip appears on click',
    trigger: 'click',
    children: <Frame as="button" fill={{ type: 'solid', color: 'primary5' }} autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }} typography={{ color: 'white1' }}>Click me</Frame>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip triggered by click events, stays visible until clicked again.',
      },
    },
  },
};

export const WithDelay: Story = {
  args: {
    content: 'This tooltip has a delay',
    delay: 1000,
    children: <Frame fill={{ type: 'solid', color: 'primary5' }} autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }} typography={{ color: 'white1' }}>Hover and wait</Frame>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with a 1 second delay before appearing.',
      },
    },
  },
};