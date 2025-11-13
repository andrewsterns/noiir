import type { Meta, StoryObj } from '@storybook/react';
import { Frame, FrameProps } from '../../__components__/frame/Frame';
import { Mask } from '../../__components__/mask/mask';

// ALL MASK RELATED PROPS AND STORIES SHOULD GO IN THIS FILE

const meta: Meta<typeof Frame> = {
  title: 'Core/Mask',
  component: Frame,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Mask properties control the clipping and masking behavior of frames, similar to Figma\'s mask feature.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type MaskStory = StoryObj<typeof Frame>;

export const BasicMask: MaskStory = {
  name: 'Basic Mask',
  render: () => (
    <div style={{ display: 'flex', gap: 32, padding: 20, flexWrap: 'wrap' }}>
      {/* Without mask - content overflows */}
      <Frame
        autoLayout={{ width: 200, height: 200, padding: 20 }}
        fill={{ type: 'solid', color: 'neutral3' }}
        appearance={{ radius: 20 }}
      >
        <Frame
          autoLayout={{ width: 250, height: 250 }}
          fill={{ type: 'linear-gradient', angle: 45, stops: [
            { color: 'primary6', position: 0 },
            { color: 'accent6', position: 1 }
          ]}}
          appearance={{ radius: 12 }}
        >
          <div style={{ padding: 20, color: '#fff', fontWeight: 600 }}>
            Content overflows (no mask)
          </div>
        </Frame>
      </Frame>

      {/* With mask - content clipped */}
      <Mask autoLayout={{ width: 200, height: 200, padding: 20 }}>
        <Frame
          fill={{ type: 'solid', color: 'neutral3' }}
          appearance={{ radius: 20 }}
        >
          <Frame
            autoLayout={{ width: 250, height: 250 }}
            fill={{ type: 'linear-gradient', angle: 45, stops: [
              { color: 'primary6', position: 0 },
              { color: 'accent6', position: 1 }
            ]}}
            appearance={{ radius: 12 }}
          >
            <div style={{ padding: 20, color: '#fff', fontWeight: 600 }}>
              Content clipped (mask: true)
            </div>
          </Frame>
        </Frame>
      </Mask>

      {/* Circular mask */}
      <Mask autoLayout={{ width: 200, height: 200, padding: 0, alignment: 'center' }}>
        <Frame
          fill={{ type: 'solid', color: 'success6' }}
          appearance={{ radius: '50%' }}
        >
          <Frame
            autoLayout={{ padding: 20 }}
            fill={{ type: 'none' }}
          >
            <div style={{ color: '#fff', fontWeight: 600, textAlign: 'center' }}>
              Circular<br />Mask
            </div>
          </Frame>
        </Frame>
      </Mask>

      {/* Image mask */}
      <Mask autoLayout={{ width: 200, height: 200 }}>
        <Frame appearance={{ radius: 20 }}>
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" 
            alt="Masked" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Frame>
      </Mask>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic mask functionality clips content to the bounds of the frame. Set `mask={true}` to enable clipping.'
      }
    }
  }
};

export const AdvancedMask: MaskStory = {
  name: 'Advanced Mask Types',
  render: () => (
    <div style={{ display: 'flex', gap: 32, padding: 20, flexWrap: 'wrap' }}>
      {/* Clip mask (default) */}
      <Mask autoLayout={{ width: 200, height: 200 }}>
        <Frame
          fill={{ type: 'solid', color: 'primary6' }}
          appearance={{ radius: 20 }}
        >
          <div style={{ 
            width: 300, 
            height: 300, 
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            padding: 20,
            color: '#fff',
            fontWeight: 600
          }}>
            Clip Mask
          </div>
        </Frame>
      </Mask>

      {/* Complex shape mask */}
      <Mask 
        autoLayout={{ width: 200, height: 200 }}
        maskPath="M100,0 L200,100 L100,200 L0,100 Z"
      >
        <Frame
          fill={{ type: 'solid', color: 'accent6' }}
        >
          <div style={{ 
            width: 300, 
            height: 300, 
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            padding: 20,
            color: '#fff',
            fontWeight: 600
          }}>
            Custom Shape Mask
          </div>
        </Frame>
      </Mask>

      {/* Nested masks */}
      <Mask autoLayout={{ width: 200, height: 200, padding: 20, alignment: 'center' }}>
        <Frame
          fill={{ type: 'solid', color: 'neutral10' }}
          appearance={{ radius: 20 }}
        >
          <Mask autoLayout={{ width: 150, height: 150 }}>
            <Frame
              fill={{ type: 'solid', color: 'warning6' }}
              appearance={{ radius: '50%' }}
            >
              <div style={{ 
                width: 200, 
                height: 200, 
                background: 'linear-gradient(to right, #fa709a, #fee140)',
                padding: 20,
                color: '#fff',
                fontWeight: 600,
                textAlign: 'center'
              }}>
                Nested Masks
              </div>
            </Frame>
          </Mask>
        </Frame>
      </Mask>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Advanced mask types including clip masks and nested masks for complex clipping effects.'
      }
    }
  }
};

export const MaskWithContent: MaskStory = {
  name: 'Mask with Various Content',
  render: () => (
    <div style={{ display: 'flex', gap: 32, padding: 20, flexWrap: 'wrap' }}>
      {/* Text mask */}
      <Mask autoLayout={{ width: 200, height: 200, padding: 24, alignment: 'center' }}>
        <Frame
          fill={{ type: 'solid', color: 'error6' }}
          appearance={{ radius: 16 }}
        >
          <div style={{ 
            color: '#fff', 
            fontSize: 48,
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.2
          }}>
            MASKED TEXT CONTENT
          </div>
        </Frame>
      </Mask>

      {/* Multiple elements mask */}
      <Mask autoLayout={{ 
        flow: 'vertical',
        width: 200, 
        height: 200, 
        padding: 16,
        gap: 8
      }}>
        <Frame
          fill={{ type: 'solid', color: 'success6' }}
          appearance={{ radius: 16 }}
        >
          <Frame fill={{ type: 'solid', color: 'white' }} autoLayout={{ padding: 8 }}>
            <div style={{ fontWeight: 600 }}>Item 1</div>
          </Frame>
          <Frame fill={{ type: 'solid', color: 'white' }} autoLayout={{ padding: 8 }}>
            <div style={{ fontWeight: 600 }}>Item 2</div>
          </Frame>
          <Frame fill={{ type: 'solid', color: 'white' }} autoLayout={{ padding: 8 }}>
            <div style={{ fontWeight: 600 }}>Item 3</div>
          </Frame>
          <Frame fill={{ type: 'solid', color: 'white' }} autoLayout={{ padding: 8 }}>
            <div style={{ fontWeight: 600 }}>Item 4 (clipped)</div>
          </Frame>
        </Frame>
      </Mask>

      {/* Icon mask */}
      <Mask autoLayout={{ width: 200, height: 200, alignment: 'center' }}>
        <Frame
          fill={{ type: 'solid', color: 'info6' }}
          appearance={{ radius: 20 }}
        >
          <div style={{ fontSize: 120 }}>
            ⭐
          </div>
        </Frame>
      </Mask>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Masks work with any content type including text, icons, and multiple nested elements.'
      }
    }
  }
};
