import type { Meta, StoryObj } from '@storybook/react';
import { Frame, FrameProps } from '../../../../src/components/frame/Frame';

// ALL MASK RELATED PROPS AND STORIES SHOULD GO IN THIS FILE

const meta: Meta<typeof Frame> = {
  title: 'Frame/Properties/Mask',
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
      <Frame
        mask={true}
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
            Content clipped (mask: true)
          </div>
        </Frame>
      </Frame>

      {/* Circular mask */}
      <Frame
        mask={true}
        autoLayout={{ width: 200, height: 200, padding: 0, alignment: 'center' }}
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

      {/* Image mask */}
      <Frame
        mask={true}
        autoLayout={{ width: 200, height: 200 }}
        appearance={{ radius: 20 }}
      >
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" 
          alt="Masked" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Frame>
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
      <Frame
        mask={{ type: 'clip', enabled: true }}
        autoLayout={{ width: 200, height: 200 }}
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

      {/* Complex shape mask */}
      <Frame
        mask={true}
        autoLayout={{ width: 200, height: 200 }}
        fill={{ type: 'solid', color: 'accent6' }}
        appearance={{ 
          radius: '20% 50% 30% 40%'
        }}
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

      {/* Nested masks */}
      <Frame
        mask={true}
        autoLayout={{ width: 200, height: 200, padding: 20, alignment: 'center' }}
        fill={{ type: 'solid', color: 'neutral10' }}
        appearance={{ radius: 20 }}
      >
        <Frame
          mask={true}
          autoLayout={{ width: 150, height: 150 }}
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
      </Frame>
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
      <Frame
        mask={true}
        autoLayout={{ width: 200, height: 200, padding: 24, alignment: 'center' }}
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

      {/* Multiple elements mask */}
      <Frame
        mask={true}
        autoLayout={{ 
          flow: 'vertical',
          width: 200, 
          height: 200, 
          padding: 16,
          gap: 8
        }}
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

      {/* Icon mask */}
      <Frame
        mask={true}
        autoLayout={{ width: 200, height: 200, alignment: 'center' }}
        fill={{ type: 'solid', color: 'info6' }}
        appearance={{ radius: 20 }}
      >
        <div style={{ fontSize: 120 }}>
          ⭐
        </div>
      </Frame>
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
