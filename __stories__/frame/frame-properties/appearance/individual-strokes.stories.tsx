import type { Meta, StoryObj } from '@storybook/react';
import { Frame } from '../../../../src/components/frame/Frame';

const meta: Meta<typeof Frame> = {
  title: 'Frame/Properties/Appearance/Individual Strokes',
  component: Frame,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Frame>;

/**
 * Individual strokes allow you to apply borders to specific sides,
 * just like Figma's individual stroke feature.
 */
export const SingleSide: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Frame
        autoLayout={{ width: 120, height: 120, alignment: 'center' }}
        fill={{ type: 'solid', color: 'gray1' }}
        stroke={{
          top: { type: 'solid', color: 'primary7', weight: 3 }
        }}
      >
        <div style={{ fontSize: 14, color: '#666' }}>Top Only</div>
      </Frame>

      <Frame
        autoLayout={{ width: 120, height: 120, alignment: 'center' }}
        fill={{ type: 'solid', color: 'gray1' }}
        stroke={{
          bottom: { type: 'solid', color: 'success7', weight: 3 }
        }}
      >
        <div style={{ fontSize: 14, color: '#666' }}>Bottom Only</div>
      </Frame>

      <Frame
        autoLayout={{ width: 120, height: 120, alignment: 'center' }}
        fill={{ type: 'solid', color: 'gray1' }}
        stroke={{
          left: { type: 'solid', color: 'warning7', weight: 3 }
        }}
      >
        <div style={{ fontSize: 14, color: '#666' }}>Left Only</div>
      </Frame>

      <Frame
        autoLayout={{ width: 120, height: 120, alignment: 'center' }}
        fill={{ type: 'solid', color: 'gray1' }}
        stroke={{
          right: { type: 'solid', color: 'error7', weight: 3 }
        }}
      >
        <div style={{ fontSize: 14, color: '#666' }}>Right Only</div>
      </Frame>
    </div>
  ),
};

/**
 * You can combine multiple sides with different colors and weights
 */
export const MultipleSides: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Frame
        autoLayout={{ width: 140, height: 140, alignment: 'center' }}
        fill={{ type: 'solid', color: 'white2' }}
        stroke={{
          top: { type: 'solid', color: 'primary7', weight: 4 },
          bottom: { type: 'solid', color: 'primary7', weight: 4 }
        }}
      >
        <div style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>Top + Bottom</div>
      </Frame>

      <Frame
        autoLayout={{ width: 140, height: 140, alignment: 'center' }}
        fill={{ type: 'solid', color: 'white2' }}
        stroke={{
          left: { type: 'solid', color: 'success7', weight: 4 },
          right: { type: 'solid', color: 'success7', weight: 4 }
        }}
      >
        <div style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>Left + Right</div>
      </Frame>

      <Frame
        autoLayout={{ width: 140, height: 140, alignment: 'center' }}
        fill={{ type: 'solid', color: 'white2' }}
        stroke={{
          top: { type: 'solid', color: 'primary7', weight: 2 },
          left: { type: 'solid', color: 'success7', weight: 2 },
          bottom: { type: 'solid', color: 'warning7', weight: 2 },
          right: { type: 'solid', color: 'error7', weight: 2 }
        }}
      >
        <div style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>All Four<br/>Different Colors</div>
      </Frame>
    </div>
  ),
};

/**
 * Each side can have different stroke weights
 */
export const DifferentWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Frame
        autoLayout={{ width: 140, height: 140, alignment: 'center' }}
        fill={{ type: 'solid', color: 'white2' }}
        stroke={{
          top: { type: 'solid', color: 'primary7', weight: 1 },
          bottom: { type: 'solid', color: 'primary7', weight: 8 }
        }}
      >
        <div style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>Thin Top<br/>Thick Bottom</div>
      </Frame>

      <Frame
        autoLayout={{ width: 140, height: 140, alignment: 'center' }}
        fill={{ type: 'solid', color: 'white2' }}
        stroke={{
          left: { type: 'solid', color: 'success7', weight: 1 },
          right: { type: 'solid', color: 'success7', weight: 6 }
        }}
      >
        <div style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>Progressive<br/>Width</div>
      </Frame>
    </div>
  ),
};

/**
 * Individual strokes support opacity and dashed patterns
 */
export const WithOpacityAndDashes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Frame
        autoLayout={{ width: 140, height: 140, alignment: 'center' }}
        fill={{ type: 'solid', color: 'white2' }}
        stroke={{
          top: { type: 'solid', color: 'primary7', weight: 3, opacity: 0.3 },
          bottom: { type: 'solid', color: 'primary7', weight: 3, opacity: 1 }
        }}
      >
        <div style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>Opacity<br/>Fade</div>
      </Frame>

      <Frame
        autoLayout={{ width: 140, height: 140, alignment: 'center' }}
        fill={{ type: 'solid', color: 'white2' }}
        stroke={{
          top: { type: 'solid', color: 'success7', weight: 2, dashPattern: [5, 5] },
          right: { type: 'solid', color: 'warning7', weight: 2, dashPattern: [2, 2] },
          bottom: { type: 'solid', color: 'error7', weight: 2, dashPattern: [10, 5] },
          left: { type: 'solid', color: 'primary7', weight: 2 }
        }}
      >
        <div style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>Mixed<br/>Dash Patterns</div>
      </Frame>
    </div>
  ),
};

/**
 * Practical use case: Card with accent border
 */
export const CardWithAccent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Frame
        autoLayout={{ 
          width: 280, 
          height: 160, 
          flow: 'vertical',
          alignment: 'topLeft',
          padding: 20,
          gap: 12
        }}
        fill={{ type: 'solid', color: 'white2' }}
        stroke={{
          left: { type: 'solid', color: 'primary7', weight: 4 },
          top: { type: 'solid', color: 'gray3', weight: 1 },
          right: { type: 'solid', color: 'gray3', weight: 1 },
          bottom: { type: 'solid', color: 'gray3', weight: 1 }
        }}
        appearance={{ radius: 8 }}
        effects={{
          dropShadow: [{
            x: 0,
            y: 2,
            blur: 8,
            color: 'rgba(0, 0, 0, 0.1)'
          }]
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, color: '#333' }}>Featured Card</div>
        <div style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>
          This card has a colored accent border on the left side and subtle borders on the other sides.
        </div>
      </Frame>

      <Frame
        autoLayout={{ 
          width: 280, 
          height: 160, 
          flow: 'vertical',
          alignment: 'topLeft',
          padding: 20,
          gap: 12
        }}
        fill={{ type: 'solid', color: 'white2' }}
        stroke={{
          bottom: { type: 'solid', color: 'success7', weight: 3 }
        }}
        appearance={{ radius: 8 }}
        effects={{
          dropShadow: [{
            x: 0,
            y: 2,
            blur: 8,
            color: 'rgba(0, 0, 0, 0.1)'
          }]
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, color: '#333' }}>Success Card</div>
        <div style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>
          This card has a success-colored accent border on the bottom.
        </div>
      </Frame>
    </div>
  ),
};

/**
 * Setting a side to 'none' type removes that border
 */
export const WithNoneSides: Story = {
  render: () => (
    <Frame
      autoLayout={{ 
        width: 280, 
        height: 160, 
        alignment: 'center'
      }}
      fill={{ type: 'solid', color: 'white2' }}
      stroke={{
        top: { type: 'solid', color: 'primary7', weight: 2 },
        right: { type: 'none' },
        bottom: { type: 'solid', color: 'primary7', weight: 2 },
        left: { type: 'none' }
      }}
    >
      <div style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>
        Only top and bottom borders
      </div>
    </Frame>
  ),
};
