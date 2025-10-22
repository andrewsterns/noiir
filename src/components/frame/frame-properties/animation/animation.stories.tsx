import type { Meta, StoryObj } from '@storybook/react';
import { Frame } from '../../Frame';

const meta: Meta<typeof Frame> = {
  title: 'Frame/Properties/Animation',
  component: Frame,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Animation properties for Frame components. Demonstrates hover, click, and clickHold behaviors.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Frame>;

export const HoverAnimation: Story = {
  args: {
    children: 'Hover me!',
    autoLayout: { flow: 'horizontal', alignment: 'center', width: 200, height: 120 },
    fill: { type: 'solid', color: 'gray1' },
    appearance: { radius: 8 },
    typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' },
    stroke: { type: 'solid', color: 'gray5' },
    animate: { hover: 'hover' },
    variants: {
      hover: {
        fill: { type: 'solid', color: 'blue' },
        stroke: { type: 'solid', color: 'lightblue' },
        typography: { color: 'white' }
      }
    }
  }
};

export const ClickAnimation: Story = {
  args: {
    children: 'Click me to toggle!',
    autoLayout: { flow: 'horizontal', alignment: 'center', width: 200, height: 120 },
    fill: { type: 'solid', color: 'gray5' },
    appearance: { radius: 8 },
    typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' },
    stroke: { type: 'solid', color: 'gray5' },
    animate: { click: 'clicked' },
    variants: {
      clicked: {
        fill: { type: 'solid', color: '#ffffff' },
        stroke: { type: 'solid', color: '#ffffff' },
        typography: { color: 'black5' },
        cursor: 'pointer'
      }
    }
  }
};

export const ClickHoldAnimation: Story = {
  args: {
    children: 'Hold click!',
    autoLayout: { flow: 'horizontal', alignment: 'center', width: 200, height: 120 },
    fill: { type: 'solid', color: 'gray1' },
    appearance: { radius: 8 },
    typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' },
    stroke: { type: 'solid', color: 'gray5' },
    animate: { clickHold: 'pressed' },
    variants: {
      pressed: {
        fill: { type: 'solid', color: 'red' },
        stroke: { type: 'solid', color: 'pink' },
        typography: { color: 'white' }
      }
    }
  }
};

export const CombinedAnimations: Story = {
  args: {
    children: 'Hover, Click, or Hold!',
    autoLayout: { flow: 'horizontal', alignment: 'center', width: 200, height: 120 },
    fill: { type: 'solid', color: 'gray1' },
    appearance: { radius: 8 },
    typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' },
    stroke: { type: 'solid', color: 'gray5' },
    animate: {
      hover: 'hover',
      click: 'clicked',
      clickHold: 'pressed'
    },
    variants: {
      hover: {
        fill: { type: 'solid', color: 'blue' },
        stroke: { type: 'solid', color: 'lightblue' },
        typography: { color: 'white' }
      },
      clicked: {
        fill: { type: 'solid', color: 'green' },
        stroke: { type: 'solid', color: 'lightgreen' },
        typography: { color: 'white' }
      },
      pressed: {
        fill: { type: 'solid', color: 'red' },
        stroke: { type: 'solid', color: 'pink' },
        typography: { color: 'white' }
      }
    }
  }
};

export const WithEventDefault: Story = {
  args: {
    children: 'Default state',
    autoLayout: { flow: 'horizontal', alignment: 'center', width: 200, height: 120 },
    fill: { type: 'solid', color: 'gray1' },
    appearance: { radius: 8 },
    typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' },
    stroke: { type: 'solid', color: 'gray5' },
    animate: {
      event: 'default',
      hover: 'hover',
      click: 'clicked'
    },
    variants: {
      default: {
        fill: { type: 'solid', color: 'purple' },
        stroke: { type: 'solid', color: 'lavender' },
        typography: { color: 'white' }
      },
      hover: {
        fill: { type: 'solid', color: 'blue' },
        stroke: { type: 'solid', color: 'lightblue' },
        typography: { color: 'white' }
      },
      clicked: {
        fill: { type: 'solid', color: 'green' },
        stroke: { type: 'solid', color: 'lightgreen' },
        typography: { color: 'white' }
      }
    }
  }
};
