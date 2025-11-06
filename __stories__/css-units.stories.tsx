import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Frame } from '../src/components/frame/Frame';

/**
 * # CSS Units & Grid Layout
 * 
 * The Frame component now supports all standard CSS units and grid layout with shorthand syntax.
 * 
 * ## Supported Units
 * - **px** - Pixels (default when using plain numbers)
 * - **%** - Percentage of parent
 * - **em** - Relative to font size
 * - **rem** - Relative to root font size
 * - **vh** - Viewport height percentage
 * - **vw** - Viewport width percentage
 * - **vmin** - Smaller of vh or vw
 * - **vmax** - Larger of vh or vw
 * - **ch** - Width of "0" character
 * - **ex** - x-height of font
 * 
 * ## Usage
 * ```tsx
 * // Plain number (treated as px)
 * <Frame autoLayout={{ width: 200, height: 100 }} />
 * 
 * // String with unit
 * <Frame autoLayout={{ width: "50%", height: "10rem" }} />
 * 
 * // CSS functions work too
 * <Frame autoLayout={{ width: "clamp(200px, 50%, 600px)" }} />
 * ```
 * 
 * ## Grid Layout
 * Use grid layout with simple shorthand syntax:
 * ```tsx
 * <Frame autoLayout={{ 
 *   flow: "grid", 
 *   grid: "3x4" // 3 columns, 4 rows
 * }} />
 * ```
 */

const meta: Meta<typeof Frame> = {
  title: 'Frame/CSS Units & Grid',
  component: Frame,
  tags: ['autodocs'],
  argTypes: {
    autoLayout: {
      description: 'Layout properties with CSS unit support',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Frame>;

export const PlainNumbers: Story = {
  args: {
    autoLayout: {
      width: 300,
      height: 150,
      padding: 20,
      flow: 'vertical',
      gap: 10,
    },
    fill: { color: '#f0f0f0' },
  },
  render: (args) => (
    <Frame {...args}>
      <div>Width: 300 (treated as 300px)</div>
      <div>Height: 150 (treated as 150px)</div>
      <div>Padding: 20 (treated as 20px)</div>
    </Frame>
  ),
};

export const PercentageUnits: Story = {
  render: () => (
    <div style={{ width: '100%', height: '400px', border: '2px dashed #ccc', padding: '1rem' }}>
      <Frame
        autoLayout={{
          width: "50%",
          height: "50%",
          padding: "5%",
          flow: 'vertical',
        }}
        fill={{ color: '#e0e0ff' }}
      >
        <div>Width: "50%" of parent</div>
        <div>Height: "50%" of parent</div>
        <div>Padding: "5%" of parent</div>
      </Frame>
    </div>
  ),
};

export const RemUnits: Story = {
  render: () => (
    <Frame
      autoLayout={{
        width: "30rem",
        height: "15rem",
        padding: "2rem",
        gap: "1rem",
        flow: 'vertical',
      }}
      fill={{ color: '#ffe0e0' }}
    >
      <div style={{ fontSize: '1.2rem' }}>Width: "30rem"</div>
      <div>Height: "15rem"</div>
      <div>Padding: "2rem"</div>
      <div>Gap: "1rem"</div>
    </Frame>
  ),
};

export const ViewportUnits: Story = {
  render: () => (
    <Frame
      autoLayout={{
        width: "80vw",
        height: "40vh",
        padding: "2vh",
        gap: "1vw",
        flow: 'horizontal',
      }}
      fill={{ color: '#e0ffe0' }}
    >
      <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.3)' }}>
        Width: "80vw" (80% of viewport width)
      </div>
      <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.3)' }}>
        Height: "40vh" (40% of viewport height)
      </div>
      <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.3)' }}>
        Gap: "1vw"
      </div>
    </Frame>
  ),
};

export const EmUnits: Story = {
  render: () => (
    <div style={{ fontSize: '20px' }}>
      <Frame
        autoLayout={{
          width: "20em",
          height: "10em",
          padding: "1em",
          gap: "0.5em",
          flow: 'vertical',
        }}
        fill={{ color: '#fff0e0' }}
      >
        <div>Width: "20em" (20 × parent font size)</div>
        <div>Height: "10em"</div>
        <div>Padding: "1em"</div>
        <div>Gap: "0.5em"</div>
      </Frame>
    </div>
  ),
};

export const MixedUnits: Story = {
  render: () => (
    <Frame
      autoLayout={{
        width: "clamp(200px, 50%, 600px)",
        height: 200,
        padding: { top: "1rem", right: "2em", bottom: "10%", left: "20px" },
        gap: "0.5rem",
        flow: 'vertical',
      }}
      fill={{ color: '#f0e0ff' }}
    >
      <div>Width: "clamp(200px, 50%, 600px)"</div>
      <div>Padding object with mixed units:</div>
      <div style={{ fontSize: '0.9em', opacity: 0.8 }}>
        - top: "1rem"<br />
        - right: "2em"<br />
        - bottom: "10%"<br />
        - left: "20px"
      </div>
    </Frame>
  ),
};

export const GridLayout3x2: Story = {
  render: () => (
    <Frame
      autoLayout={{
        width: "100%",
        height: 400,
        flow: 'grid',
        grid: "3x2", // 3 columns, 2 rows
        gap: "1rem",
        padding: "1rem",
      }}
      fill={{ color: '#f8f9fa' }}
    >
      <div style={{ background: '#ff6b6b', padding: '2rem', borderRadius: '8px', color: 'white' }}>
        Item 1
      </div>
      <div style={{ background: '#4ecdc4', padding: '2rem', borderRadius: '8px', color: 'white' }}>
        Item 2
      </div>
      <div style={{ background: '#45b7d1', padding: '2rem', borderRadius: '8px', color: 'white' }}>
        Item 3
      </div>
      <div style={{ background: '#96ceb4', padding: '2rem', borderRadius: '8px', color: 'white' }}>
        Item 4
      </div>
      <div style={{ background: '#ffeaa7', padding: '2rem', borderRadius: '8px', color: '#333' }}>
        Item 5
      </div>
      <div style={{ background: '#dfe6e9', padding: '2rem', borderRadius: '8px', color: '#333' }}>
        Item 6
      </div>
    </Frame>
  ),
};

export const GridLayout4x3: Story = {
  render: () => (
    <Frame
      autoLayout={{
        width: "90vw",
        height: "60vh",
        flow: 'grid',
        grid: "4x3", // 4 columns, 3 rows
        gap: "0.5rem",
        padding: "1rem",
      }}
      fill={{ color: '#ecf0f1' }}
    >
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          style={{
            background: `hsl(${(i * 30) % 360}, 70%, 60%)`,
            padding: '1.5rem',
            borderRadius: '4px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
        >
          {i + 1}
        </div>
      ))}
    </Frame>
  ),
};

export const GridWithCustomConfig: Story = {
  render: () => (
    <Frame
      autoLayout={{
        width: "100%",
        height: 500,
        flow: 'grid',
        grid: {
          columns: 3,
          rows: 2,
          columnGap: "2rem",
          rowGap: "1rem",
        },
        padding: "2rem",
      }}
      fill={{ color: '#f5f5f5' }}
    >
      <div style={{ background: '#667eea', padding: '2rem', borderRadius: '8px', color: 'white' }}>
        Column gap: 2rem
      </div>
      <div style={{ background: '#764ba2', padding: '2rem', borderRadius: '8px', color: 'white' }}>
        Row gap: 1rem
      </div>
      <div style={{ background: '#f093fb', padding: '2rem', borderRadius: '8px', color: 'white' }}>
        Custom config
      </div>
      <div style={{ background: '#4facfe', padding: '2rem', borderRadius: '8px', color: 'white' }}>
        3 columns
      </div>
      <div style={{ background: '#00f2fe', padding: '2rem', borderRadius: '8px', color: '#333' }}>
        2 rows
      </div>
      <div style={{ background: '#43e97b', padding: '2rem', borderRadius: '8px', color: '#333' }}>
        GridConfig object
      </div>
    </Frame>
  ),
};

export const BorderRadiusWithUnits: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <Frame
        autoLayout={{ width: 200, height: 200, padding: "2rem" }}
        appearance={{ radius: "2rem" }}
        fill={{ color: '#e0f0ff' }}
      >
        <div>radius: "2rem"</div>
      </Frame>
      
      <Frame
        autoLayout={{ width: 200, height: 200, padding: "2rem" }}
        appearance={{ radius: "50%" }}
        fill={{ color: '#ffe0e0' }}
      >
        <div style={{ textAlign: 'center' }}>radius: "50%"<br />(circle)</div>
      </Frame>
      
      <Frame
        autoLayout={{ width: 200, height: 200, padding: "2rem" }}
        appearance={{ 
          radiusTopLeft: "4rem",
          radiusTopRight: "1rem",
          radiusBottomRight: "4rem",
          radiusBottomLeft: "1rem"
        }}
        fill={{ color: '#e0ffe0' }}
      >
        <div>Individual corners with different units</div>
      </Frame>
    </div>
  ),
};

export const ResponsiveExample: Story = {
  render: () => (
    <Frame
      autoLayout={{
        width: "min(90vw, 1200px)",
        height: "clamp(300px, 50vh, 600px)",
        padding: "clamp(1rem, 5vw, 3rem)",
        gap: "clamp(0.5rem, 2vw, 2rem)",
        flow: 'vertical',
      }}
      fill={{ color: '#f0f0f0' }}
    >
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        Responsive Layout with CSS Functions
      </div>
      <div>Width: "min(90vw, 1200px)" - Never wider than 1200px</div>
      <div>Height: "clamp(300px, 50vh, 600px)" - Between 300px and 600px</div>
      <div>Padding: "clamp(1rem, 5vw, 3rem)" - Responsive padding</div>
      <div>Gap: "clamp(0.5rem, 2vw, 2rem)" - Responsive gap</div>
      <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: '8px' }}>
        Try resizing your browser window to see the responsive behavior!
      </div>
    </Frame>
  ),
};
