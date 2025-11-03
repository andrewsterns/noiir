import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toggle } from './toggle';
import { Frame } from '../../frame/Frame';

const meta: Meta<typeof Toggle> = {
  title: 'Atoms/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toggle switch component built with Frame, supporting various sizes and controlled/uncontrolled usage.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['1', '2', '3'],
      description: 'Size of the toggle switch',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is in the "on" state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is disabled',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the toggle state changes',
    },
  },
  args: {
    size: '2',
    checked: false,
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'The default toggle switch showing both off and on states.',
      },
    },
  },
  render: (args) => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
      <Frame
        autoLayout={{ flow: 'vertical', gap: 8, alignment: 'center' }}
        typography={{ fontSize: 14, color: 'gray7' }}
      >
        Off State
      </Frame>
      <Toggle {...args} />

      <Frame
        autoLayout={{ flow: 'vertical', gap: 8, alignment: 'center' }}
        typography={{ fontSize: 14, color: 'gray7' }}
      >
        On State
      </Frame>
      <Toggle {...args} checked />
    </Frame>
  ),
};

export const Sizes: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Toggle switches in different sizes (1, 2, 3).',
      },
    },
  },
  render: (args) => (
    <Frame autoLayout={{ flow: 'vertical', gap: 24, alignment: 'center' }}>
      <Frame
        autoLayout={{ flow: 'vertical', gap: 12, alignment: 'center' }}
        typography={{ fontSize: 16, fontWeight: 'bold' }}
      >
        Size 1 (Small)
      </Frame>
      <Frame autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}>
        <Toggle {...args} size="1" />
        <Toggle {...args} size="1" checked />
      </Frame>

      <Frame
        autoLayout={{ flow: 'vertical', gap: 12, alignment: 'center' }}
        typography={{ fontSize: 16, fontWeight: 'bold' }}
      >
        Size 2 (Medium)
      </Frame>
      <Frame autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}>
        <Toggle {...args} size="2" />
        <Toggle {...args} size="2" checked />
      </Frame>

      <Frame
        autoLayout={{ flow: 'vertical', gap: 12, alignment: 'center' }}
        typography={{ fontSize: 16, fontWeight: 'bold' }}
      >
        Size 3 (Large)
      </Frame>
      <Frame autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}>
        <Toggle {...args} size="3" />
        <Toggle {...args} size="3" checked />
      </Frame>
    </Frame>
  ),
};

export const Controlled: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'A controlled toggle where the parent component manages the state.',
      },
    },
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
        <Toggle
          {...args}
          checked={checked}
          onChange={(newChecked) => setChecked(newChecked)}
        />
        <Frame
          autoLayout={{ flow: 'vertical', gap: 8, alignment: 'center' }}
          fill={{ type: 'solid', color: 'gray1', opacity: 0.5 }}
          appearance={{ radius: 8 }}
          stroke={{ type: 'solid', color: 'gray3', weight: 1 }}
        >
          <Frame
            typography={{
              fontSize: 14,
              fontWeight: 'bold',
              color: checked ? 'blue6' : 'gray6'
            }}
          >
            State: {checked ? 'ON' : 'OFF'}
          </Frame>
        </Frame>
      </Frame>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled toggle switches that cannot be interacted with.',
      },
    },
  },
  render: (args) => (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
      <Frame
        autoLayout={{ flow: 'vertical', gap: 8, alignment: 'center' }}
        typography={{ fontSize: 14, color: 'gray7' }}
      >
        Disabled Off
      </Frame>
      <Toggle {...args} checked={false} />

      <Frame
        autoLayout={{ flow: 'vertical', gap: 8, alignment: 'center' }}
        typography={{ fontSize: 14, color: 'gray7' }}
      >
        Disabled On
      </Frame>
      <Toggle {...args} checked />
    </Frame>
  ),
};

export const InteractiveDemo: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'An interactive demo showing multiple toggles with different states.',
      },
    },
  },
  render: (args) => {
    const [toggles, setToggles] = React.useState([
      { id: 1, checked: false, label: 'WiFi' },
      { id: 2, checked: true, label: 'Bluetooth' },
      { id: 3, checked: false, label: 'Notifications' },
      { id: 4, checked: true, label: 'Dark Mode' },
    ]);

    const handleToggle = (id: number, checked: boolean) => {
      setToggles(prev =>
        prev.map(toggle =>
          toggle.id === id ? { ...toggle, checked } : toggle
        )
      );
    };

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 20, alignment: 'center' }}>
        <Frame
          typography={{ fontSize: 18, fontWeight: 'bold' }}
          autoLayout={{ flow: 'vertical', gap: 4, alignment: 'center' }}
        >
          Settings Panel
        </Frame>

        {toggles.map((toggle) => (
          <Frame
            key={toggle.id}
            autoLayout={{
              flow: 'horizontal',
              gap: 12,
              alignment: 'center',
              width: 'hug',
              paddingHorizontal: 16,
              paddingVertical: 8
            }}
            fill={{ type: 'solid', color: 'white1', opacity: 0.5 }}
            appearance={{ radius: 8 }}
            stroke={{ type: 'solid', color: 'gray2', weight: 1 }}
          >
            <Frame
              typography={{
                fontSize: 14,
                color: toggle.checked ? 'gray8' : 'gray6'
              }}
              autoLayout={{ width: 100, alignment: 'left' }}
            >
              {toggle.label}
            </Frame>
            <Toggle
              {...args}
              checked={toggle.checked}
              onChange={(checked) => handleToggle(toggle.id, checked)}
            />
          </Frame>
        ))}

        <Frame
          autoLayout={{ flow: 'vertical', gap: 8, alignment: 'center' }}
          fill={{ type: 'solid', color: 'blue1', opacity: 0.3 }}
          appearance={{ radius: 8 }}
          stroke={{ type: 'solid', color: 'blue3', weight: 1 }}
        >
          <Frame
            typography={{ fontSize: 12, color: 'blue7' }}
          >
            Active Settings: {toggles.filter(t => t.checked).map(t => t.label).join(', ')}
          </Frame>
        </Frame>
      </Frame>
    );
  },
};

export const Playground: Story = {
  args: {
    size: '2',
    checked: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Playground for testing different toggle configurations. Use the controls to experiment.',
      },
    },
  },
  render: (args) => (
    <Frame autoLayout={{ flow: 'vertical', gap: 20, alignment: 'center' }}>
      <Frame
        typography={{ fontSize: 16, fontWeight: 'bold' }}
        autoLayout={{ flow: 'vertical', gap: 4, alignment: 'center' }}
      >
        Toggle Playground
      </Frame>

      <Toggle {...args} />

      <Frame
        autoLayout={{ flow: 'vertical', gap: 8, alignment: 'center' }}
        fill={{ type: 'solid', color: 'gray1', opacity: 0.5 }}
        appearance={{ radius: 8 }}
        stroke={{ type: 'solid', color: 'gray3', weight: 1 }}
      >
        <Frame
          typography={{
            fontSize: 14,
            color: args.checked ? 'blue6' : 'gray6'
          }}
        >
          Current State: {args.checked ? 'ON' : 'OFF'}
        </Frame>
        <Frame
          typography={{
            fontSize: 12,
            color: 'gray5'
          }}
        >
          Size: {typeof args.size === 'string' ? args.size : 'custom'} | Disabled: {args.disabled ? 'Yes' : 'No'}
        </Frame>
      </Frame>
    </Frame>
  ),
};