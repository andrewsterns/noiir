import type { Meta, StoryObj } from '@storybook/react';
import { Frame, FrameProps } from '../../../../__components__/frame/Frame';

// Position story controls interface
interface PositionArgs extends Partial<FrameProps> {
  positionX: number;
  positionY: number;
  positionRotation: number;
}

const meta: Meta<typeof Frame> = {
  title: 'Frame/Properties/Position',
  component: Frame,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Position properties allow you to control the placement and rotation of frames within their container.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type PositionStory = StoryObj<PositionArgs>;

// Position Example with Controls
export const Position: PositionStory = {
  args: {
    children: 'Positioned Frame',
    fill: { type: 'solid', color: 'primary6' },
    appearance: { radius: 8 },
    positionX: 50,
    positionY: 50,
    positionRotation: 0
  },
  argTypes: {
    // Focus only on position-related controls
    children: {
      control: { type: 'text' },
      description: 'Child content'
    },
    positionX: {
      control: { type: 'number', min: 0, max: 300, step: 5 },
      description: 'X coordinate for absolute positioning',
      table: { category: 'Position' }
    },
    positionY: {
      control: { type: 'number', min: 0, max: 200, step: 5 },
      description: 'Y coordinate for absolute positioning',
      table: { category: 'Position' }
    },
    positionRotation: {
      control: { type: 'range', min: -180, max: 180, step: 5 },
      description: 'Rotation in degrees',
      table: { category: 'Position' }
    },
    // Hide other controls to focus on position
    fill: { control: false },
    appearance: { control: false },
    autoLayout: { control: false },
    stroke: { control: false }
  },
  render: (args: PositionArgs) => (
    <Frame
      position={{ x: 0, y: 0 }}
      autoLayout={{ width: 400, height: 300 }}
      fill={{ type: 'solid', color: '#F9FAFB' }}
      stroke={{ color: '#D1D5DB', weight: 2, dashPattern: [5, 5] }}
    >
      <Frame
        position={{
          x: args.positionX,
          y: args.positionY,
          rotation: args.positionRotation
        }}
        autoLayout={{ width: 120, height: 80 }}
        fill={args.fill}
        appearance={args.appearance}
      >
        <Frame
          typography={{ color: 'white', fontSize: 12, textAlign: 'center' }}
          autoLayout={{ padding: 8 }}
        >
          {args.children}
        </Frame>
      </Frame>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive position controls - adjust X, Y coordinates and rotation. The dashed border shows the container bounds.'
      }
    },
    controls: {
      exclude: ['position', 'size', 'fill', 'appearance', 'autoLayout', 'stroke', 'className', 'style', 'onClick', 'onMouseEnter', 'onMouseLeave']
    }
  }
};

// Sticky Position Example
export const StickyPosition: StoryObj<typeof Frame> = {
  render: () => (
    <div style={{ width: 600, height: 400, overflow: 'auto' }}>
      <Frame
        autoLayout={{ flow: 'vertical', gap: 0, width: 'fill-container' }}
        fill={{ type: 'solid', color: '#F9FAFB' }}
      >
      {/* Sticky Header */}
      <Frame
        position={{ type: 'sticky', top: 0, zIndex: 100 }}
        autoLayout={{ width: 'fill-container', height: 60, padding: 16, alignment: 'centerLeft' }}
        fill={{ type: 'solid', color: '#3B82F6' }}
        typography={{ color: '#FFFFFF', fontSize: 18, fontWeight: 600 }}
      >
        Sticky Header (Scroll Down)
      </Frame>

      {/* Scrollable Content */}
      <Frame autoLayout={{ flow: 'vertical', gap: 16, padding: 16, width: 'fill-container' }}>
        {Array.from({ length: 20 }, (_, i) => (
          <Frame
            key={i}
            autoLayout={{ padding: 16, width: 'fill-container' }}
            fill={{ type: 'solid', color: '#FFFFFF' }}
            stroke={{ color: '#E5E7EB', weight: 1 }}
            appearance={{ radius: 8 }}
            typography={{ color: '#1F2937', fontSize: 14 }}
          >
            Content Block {i + 1}
          </Frame>
        ))}
      </Frame>
      </Frame>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sticky positioning keeps the header visible while scrolling. Uses `position: { type: "sticky", top: 0, zIndex: 100 }`.'
      }
    }
  }
};

// Z-Index Layering Example
export const ZIndexLayering: StoryObj<typeof Frame> = {
  render: () => (
    <Frame
      position={{ type: 'relative' }}
      autoLayout={{ width: 600, height: 400 }}
      fill={{ type: 'solid', color: '#F9FAFB' }}
    >
      {/* Base Layer - z-index: 1 */}
      <Frame
        position={{ type: 'absolute', top: 50, left: 50, zIndex: 1 }}
        autoLayout={{ width: 200, height: 150, padding: 16 }}
        fill={{ type: 'solid', color: '#EF4444' }}
        appearance={{ radius: 8 }}
        typography={{ color: '#FFFFFF', fontSize: 16, fontWeight: 600 }}
      >
        Layer 1 (z-index: 1)
      </Frame>

      {/* Middle Layer - z-index: 10 */}
      <Frame
        position={{ type: 'absolute', top: 100, left: 150, zIndex: 10 }}
        autoLayout={{ width: 200, height: 150, padding: 16 }}
        fill={{ type: 'solid', color: '#3B82F6' }}
        appearance={{ radius: 8 }}
        typography={{ color: '#FFFFFF', fontSize: 16, fontWeight: 600 }}
      >
        Layer 2 (z-index: 10)
      </Frame>

      {/* Top Layer - z-index: 100 */}
      <Frame
        position={{ type: 'absolute', top: 150, left: 250, zIndex: 100 }}
        autoLayout={{ width: 200, height: 150, padding: 16 }}
        fill={{ type: 'solid', color: '#10B981' }}
        appearance={{ radius: 8 }}
        typography={{ color: '#FFFFFF', fontSize: 16, fontWeight: 600 }}
      >
        Layer 3 (z-index: 100)
      </Frame>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Z-index controls layering order. Higher values appear on top. Use with position: absolute, fixed, relative, or sticky.'
      }
    }
  }
};

// Overlay with High Z-Index
export const OverlayExample: StoryObj<typeof Frame> = {
  render: () => (
    <Frame
      position={{ type: 'relative' }}
      autoLayout={{ width: 600, height: 400 }}
      fill={{ type: 'solid', color: '#F9FAFB' }}
    >
      {/* Content Below */}
      <Frame
        autoLayout={{ flow: 'vertical', gap: 16, padding: 32, width: 'fill-container' }}
      >
        <Frame
          autoLayout={{ padding: 16 }}
          fill={{ type: 'solid', color: '#FFFFFF' }}
          stroke={{ color: '#E5E7EB', weight: 1 }}
          appearance={{ radius: 8 }}
          typography={{ color: '#1F2937', fontSize: 14 }}
        >
          This content is below the overlay
        </Frame>
        <Frame
          autoLayout={{ padding: 16 }}
          fill={{ type: 'solid', color: '#FFFFFF' }}
          stroke={{ color: '#E5E7EB', weight: 1 }}
          appearance={{ radius: 8 }}
          typography={{ color: '#1F2937', fontSize: 14 }}
        >
          More content underneath
        </Frame>
      </Frame>

      {/* Overlay with High Z-Index */}
      <Frame
        position={{ type: 'fixed', top: '50%', left: '50%', zIndex: 1000 }}
        autoLayout={{ width: 300, height: 200, padding: 24, alignment: 'center' }}
        fill={{ type: 'solid', color: '#FFFFFF' }}
        appearance={{ radius: 12 }}
        effects={{ dropShadow: [{ x: 0, y: 20, blur: 25, spread: -5, color: '#00000026' }] }}
        {...{ style: { transform: 'translate(-50%, -50%)' } }}
      >
        <Frame
          autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}
        >
          <Frame typography={{ color: '#1F2937', fontSize: 20, fontWeight: 700 }}>
            Overlay Modal
          </Frame>
          <Frame typography={{ color: '#6B7280', fontSize: 14, textAlign: 'center' }}>
            This overlay has z-index: 1000 and appears above all other content
          </Frame>
        </Frame>
      </Frame>

      {/* Semi-transparent Backdrop */}
      <Frame
        position={{ type: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}
        fill={{ type: 'solid', color: '#00000066' }}
      />
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overlay pattern with backdrop. Modal has z-index: 1000, backdrop has z-index: 999. Use `position: fixed` with high z-index values for overlays.'
      }
    }
  }
};