// --- Progress Bar stories ---
import React, { useState, useEffect } from 'react';

export const Basic: Story = {
  args: {
    progressValue: 50,
    max: 100,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => (prev + 1) % 101);
      }, 100);
      return () => clearInterval(interval);
    }, []);

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
        <ProgressBar progressValue={progress} max={100} />
        <div>Progress: {progress}%</div>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with animated progress value that cycles from 0 to 100.',
      },
    },
  },
};
// --- Basic variant stories ---
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './progress-bar';
import { Frame } from '../..';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/Progress Bar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A progress bar component built using Frame with support for determinate and indeterminate states.',
      },
    },
  },
  argTypes: {
    progressValue: {
      control: { type: 'range', min: 0, max: 100 },
    },
    max: {
      control: { type: 'number' },
    },
    indeterminate: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Medium: Story = {
  args: {
    progressValue: 75,
    max: 100,
    size: '2',
  },
};

export const Small: Story = {
  args: {
    progressValue: 60,
    max: 100,
    size: '1',
  },
};

export const Large: Story = {
  args: {
    progressValue: 40,
    max: 100,
    size: '3',
  },
};

export const Success: Story = {
  args: {
    progressValue: 85,
    max: 100,
    variant: 'success',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with success variant styling.',
      },
    },
  },
};

export const Warning: Story = {
  args: {
    progressValue: 30,
    max: 100,
    variant: 'warning',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with warning variant styling.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    progressValue: 15,
    max: 100,
    variant: 'error',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with error variant styling.',
      },
    },
  },
};

export const MultipleBars: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 20, width: 300 }}>
      <Frame autoLayout={{ flow: 'vertical', gap: 8 }}>
        <div>Task 1</div>
        <ProgressBar progressValue={100} max={100} variant="success" size="2" />
      </Frame>

      <Frame autoLayout={{ flow: 'vertical', gap: 8 }}>
        <div>Task 2</div>
        <ProgressBar progressValue={75} max={100} size="2"  />
      </Frame>

      <Frame autoLayout={{ flow: 'vertical', gap: 8 }}>
        <div>Task 3</div>
        <ProgressBar progressValue={25} max={100} variant="warning" size="2" />
      </Frame>

      <Frame autoLayout={{ flow: 'vertical', gap: 8 }}>
        <div>Loading...</div>
        <ProgressBar indeterminate />
      </Frame>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple progress bars showing different states and variants.',
      },
    },
  },
};