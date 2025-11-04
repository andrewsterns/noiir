// --- Popup stories ---
import React, { useState } from 'react';

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ position: 'relative', minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 40, background: '#f0f0f0' }}>
        <button
          style={{ background: '#2563eb', color: '#fff', padding: '8px 16px', borderRadius: 4, border: 'none', fontSize: 16, cursor: 'pointer', zIndex: 1, position: 'relative' }}
          onClick={() => {
            console.log('Opening popup');
            setIsOpen(true);
          }}
        >
          Open Popup
        </button>

        <div style={{ marginTop: 20, padding: 20, background: 'white', borderRadius: 8 }}>
          <p>This is some content below the button.</p>
          <p>The popup should appear OVER everything, including this text and the button above.</p>
        </div>

        <Popup
          isOpen={isOpen}
          onClose={() => {
            console.log('Closing popup');
            setIsOpen(false);
          }}
          title="Basic Popup"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>This is a basic popup with some content using Frame components.</div>
            <button
              style={{ background: '#2563eb', color: '#fff', padding: '8px 16px', borderRadius: 4, border: 'none', fontSize: 16, cursor: 'pointer' }}
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </Popup>
      </div>
    );
  },
};
// --- Basic variant stories ---
import type { Meta, StoryObj } from '@storybook/react';
import { Popup } from './popup';
import { Button, Frame } from '../..';

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
        <Button
          onClick={() => setIsOpen(true)}
        >
          Open Small Popup
        </Button>

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
        <Button
          onClick={() => setIsOpen(true)}

        >
          Open Medium Popup
        </Button>

        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Medium Popup"
          size="medium"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>This is a medium-sized popup with more content space.</div>
            <div>You can put forms, images, or any content here.</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <Button
                onClick={() => setIsOpen(false)}
                
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
               
              >
                Confirm
              </Button>
            </div>
          </div>
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
        <Button
          onClick={() => setIsOpen(true)}
          
        >
          Open Large Popup
        </Button>

        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Large Popup"
          size="large"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>This is a large popup with plenty of space for content.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>Feature 1: Lots of space</div>
              <div>Feature 2: Can contain complex layouts</div>
              <div>Feature 3: Perfect for forms or detailed content</div>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <Button
                onClick={() => setIsOpen(false)}
                
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                >
                Save Changes
              </Button>
            </div>
          </div>
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
        <Button
          onClick={() => setIsOpen(true)}
         
        >
          Open Minimal Popup
        </Button>

        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showCloseButton={false}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
            <div>🎉</div>
            <div>Success! Your action was completed.</div>
            <Button
              onClick={() => setIsOpen(false)}
             >
              OK
            </Button>
          </div>
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
        <Button
          onClick={() => setIsOpen(true)}
          
        >
          Open Fullscreen Popup
        </Button>

        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Fullscreen Modal"
          size="fullscreen"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 40 }}>
            <div>This popup takes up the entire screen.</div>
            <div>Perfect for important dialogs or complex workflows.</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <Button
                onClick={() => setIsOpen(false)}
                
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
               >
                Complete
              </Button>
            </div>
          </div>
        </Popup>
      </Frame>
    );
  },
};