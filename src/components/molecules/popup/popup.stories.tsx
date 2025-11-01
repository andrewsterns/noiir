// --- Popup stories ---
import React, { useState } from 'react';

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 20, alignment: 'center', padding: 40 }}>
        <Frame
          as="button"
          fill={{ type: 'solid', color: 'primary5' }}
          autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
          typography={{ color: 'white1' }}
          onClick={() => setIsOpen(true)}
        >
          Open Popup
        </Frame>

        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Basic Popup"
        >
          <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
            <div>This is a basic popup with some content.</div>
            <Frame
              as="button"
              fill={{ type: 'solid', color: 'primary5' }}
              autoLayout={{ paddingHorizontal: 16, paddingVertical: 8, width: 'hug' }}
              typography={{ color: 'white1' }}
              onClick={() => setIsOpen(false)}
            >
              Close
            </Frame>
          </Frame>
        </Popup>
      </Frame>
    );
  },
};
// --- Basic variant stories ---
import type { Meta, StoryObj } from '@storybook/react';
import { Popup } from './popup';
import { Frame } from '../..';

const meta: Meta<typeof Popup> = {
  title: 'Molecules/Popup',
  component: Popup,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A popup/modal component with overlay, different sizes, and keyboard/click-to-close functionality.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'fullscreen'],
    },
    showCloseButton: {
      control: { type: 'boolean' },
    },
    closeOnOverlayClick: {
      control: { type: 'boolean' },
    },
    closeOnEscape: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popup>;

export const Small: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 20, alignment: 'center', padding: 40 }}>
        <Frame
          as="button"
          fill={{ type: 'solid', color: 'primary5' }}
          autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
          typography={{ color: 'white1' }}
          onClick={() => setIsOpen(true)}
        >
          Open Small Popup
        </Frame>

        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Small Popup"
          size="small"
        >
          <div>This is a small popup with compact content.</div>
        </Popup>
      </Frame>
    );
  },
};

export const Medium: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 20, alignment: 'center', padding: 40 }}>
        <Frame
          as="button"
          fill={{ type: 'solid', color: 'primary5' }}
          autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
          typography={{ color: 'white1' }}
          onClick={() => setIsOpen(true)}
        >
          Open Medium Popup
        </Frame>

        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Medium Popup"
          size="medium"
        >
          <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
            <div>This is a medium-sized popup with more content space.</div>
            <div>You can put forms, images, or any content here.</div>
            <Frame autoLayout={{ flow: 'horizontal', gap: 12, alignment: 'right' }}>
              <Frame
                as="button"
                fill={{ type: 'solid', color: 'gray3' }}
                autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
                typography={{ color: 'gray8' }}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Frame>
              <Frame
                as="button"
                fill={{ type: 'solid', color: 'primary5' }}
                autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
                typography={{ color: 'white1' }}
                onClick={() => setIsOpen(false)}
              >
                Confirm
              </Frame>
            </Frame>
          </Frame>
        </Popup>
      </Frame>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 20, alignment: 'center', padding: 40 }}>
        <Frame
          as="button"
          fill={{ type: 'solid', color: 'primary5' }}
          autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
          typography={{ color: 'white1' }}
          onClick={() => setIsOpen(true)}
        >
          Open Large Popup
        </Frame>

        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Large Popup"
          size="large"
        >
          <Frame autoLayout={{ flow: 'vertical', gap: 20 }}>
            <div>This is a large popup with plenty of space for content.</div>
            <Frame autoLayout={{ flow: 'vertical', gap: 12 }}>
              <div>Feature 1: Lots of space</div>
              <div>Feature 2: Can contain complex layouts</div>
              <div>Feature 3: Perfect for forms or detailed content</div>
            </Frame>
            <Frame autoLayout={{ flow: 'horizontal', gap: 12, alignment: 'right' }}>
              <Frame
                as="button"
                fill={{ type: 'solid', color: 'gray3' }}
                autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
                typography={{ color: 'gray8' }}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Frame>
              <Frame
                as="button"
                fill={{ type: 'solid', color: 'primary5' }}
                autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
                typography={{ color: 'white1' }}
                onClick={() => setIsOpen(false)}
              >
                Save Changes
              </Frame>
            </Frame>
          </Frame>
        </Popup>
      </Frame>
    );
  },
};

export const WithoutTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 20, alignment: 'center', padding: 40 }}>
        <Frame
          as="button"
          fill={{ type: 'solid', color: 'primary5' }}
          autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
          typography={{ color: 'white1' }}
          onClick={() => setIsOpen(true)}
        >
          Open Minimal Popup
        </Frame>

        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showCloseButton={false}
        >
          <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
            <div>🎉</div>
            <div>Success! Your action was completed.</div>
            <Frame
              as="button"
              fill={{ type: 'solid', color: 'primary5' }}
              autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
              typography={{ color: 'white1' }}
              onClick={() => setIsOpen(false)}
            >
              OK
            </Frame>
          </Frame>
        </Popup>
      </Frame>
    );
  },
};

export const Fullscreen: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 20, alignment: 'center', padding: 40 }}>
        <Frame
          as="button"
          fill={{ type: 'solid', color: 'primary5' }}
          autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
          typography={{ color: 'white1' }}
          onClick={() => setIsOpen(true)}
        >
          Open Fullscreen Popup
        </Frame>

        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Fullscreen Modal"
          size="fullscreen"
        >
          <Frame autoLayout={{ flow: 'vertical', gap: 20, padding: 40 }}>
            <div>This popup takes up the entire screen.</div>
            <div>Perfect for important dialogs or complex workflows.</div>
            <Frame autoLayout={{ flow: 'horizontal', gap: 12, alignment: 'right' }}>
              <Frame
                as="button"
                fill={{ type: 'solid', color: 'gray3' }}
                autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
                typography={{ color: 'gray8' }}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Frame>
              <Frame
                as="button"
                fill={{ type: 'solid', color: 'primary5' }}
                autoLayout={{ paddingHorizontal: 16, paddingVertical: 8 }}
                typography={{ color: 'white1' }}
                onClick={() => setIsOpen(false)}
              >
                Complete
              </Frame>
            </Frame>
          </Frame>
        </Popup>
      </Frame>
    );
  },
};