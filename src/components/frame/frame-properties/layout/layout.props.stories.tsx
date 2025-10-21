export const HorizontalVsFreeform: LayoutStory = {
  args: {
    fill: { type: 'solid', color: 'black8' },
    stroke: { type: 'none' },
    appearance: { radius: 8 },
    width: 600,
    height: 120,
    gap: 16,
    padding: 8,
    childWidth: 100,
    childHeight: 40,
  },
  render: (args: LayoutArgs) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <>
        <Frame
          autoLayout={{ flow: 'vertical', gap: 32 }}
          style={{ width: 640 }}
        >
          <Frame typography={{ fontWeight: 600, fontSize: 16, color: 'gray2' }} style={{ marginBottom: 4 }}>Horizontal Layout (gap, shifting)</Frame>
          <Frame
            autoLayout={{ flow: 'horizontal', gap: 16, padding: 8, width: 'hug', height: 60 }}
            fill={{ type: 'solid', color: 'black8' }}
            appearance={{ radius: 8 }}
          >
            <Frame
              fill={{ type: 'solid', color: 'blue6' }}
              autoLayout={{ width: 140, height: 40 }}
              appearance={{ radius: 4 }}
              style={{ transition: 'width 0.3s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.width = '260px'}
              onMouseLeave={e => e.currentTarget.style.width = '140px'}
            >
              A (hover me)
            </Frame>
            <Frame fill={{ type: 'solid', color: 'tomato6' }} autoLayout={{ width: 140, height: 40 }} appearance={{ radius: 4 }}>B</Frame>
            <Frame fill={{ type: 'solid', color: 'grass6' }} autoLayout={{ width: 140, height: 40 }} appearance={{ radius: 4 }}>C</Frame>
          </Frame>
          <Frame typography={{ fontWeight: 600, fontSize: 16, color: 'gray2' }}>Freeform Layout (no shifting)</Frame>
          <Frame
            autoLayout={{ flow: 'freeform', padding: 8, width: 'hug', height: 60, gap: 16 }}
            fill={{ type: 'solid', color: 'black8' }}
            appearance={{ radius: 8 }}
          >
            <Frame
              fill={{ type: 'solid', color: 'blue6' }}
              autoLayout={{ width: 140, height: 40 }}
              appearance={{ radius: 4 }}
              position={{ x: 0, y: 0 }}
              style={{ transition: 'width 0.3s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.width = '260px'}
              onMouseLeave={e => e.currentTarget.style.width = '140px'}
            >
              A (hover me)
            </Frame>
            <Frame fill={{ type: 'solid', color: 'tomato6' }} autoLayout={{ width: 140, height: 40 }} appearance={{ radius: 4 }} position={{ x: 180, y: 0 }}>B</Frame>
            <Frame fill={{ type: 'solid', color: 'grass6' }} autoLayout={{ width: 140, height: 40 }} appearance={{ radius: 4 }} position={{ x: 340, y: 0 }}>C</Frame>
          </Frame>
        </Frame>
      </>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the difference between horizontal (gap, shifting) and freeform (absolute, no shifting) layout flows.'
      }
    },
    controls: { exclude: ['autoLayout', 'position', 'size', 'fill', 'appearance', 'stroke', 'className', 'style', 'onClick', 'onMouseEnter', 'onMouseLeave'] }
  }
};
import type { Meta, StoryObj } from '@storybook/react';
import { Frame, FrameProps } from '../../Frame';

// Layout story controls interface
interface LayoutArgs extends Partial<FrameProps> {
  flow?: 'freeform' | 'horizontal' | 'vertical' | 'grid' | 'curved';
  alignment?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  gap: number;
  padding: number;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  clipContent: boolean;
  width?: string | number | 'hug' | 'fill-container';
  height?: string | number | 'hug' | 'fill-container';
  // Child frame controls
  childWidth: number;
  childHeight: number;
  childAlignment?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  path?: { d: string };
}

const meta: Meta<typeof Frame> = {
  title: 'Frame/Properties/Layout',
  component: Frame,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Layout properties control how frames position and arrange their children using auto layout.'
      }
    }
  },
  tags: ['autodocs']
};
export default meta;
type LayoutStory = StoryObj<LayoutArgs>;

export const Layout: LayoutStory = {
  args: {
    fill: { type: 'solid', color: 'black8' },
    stroke: { type: 'none' },
    appearance: { radius: 8 },
    flow: 'freeform',
    path: { d: 'M 40 200 Q 120 40 200 200 T 360 200' },
    width: 400,
    height: 240,
    gap: 32,
    padding: 0,
    wrap: 'nowrap',
    clipContent: false,
    childWidth: 32,
    childHeight: 32,
    childAlignment: 'center',
  },
  argTypes: {
    flow: {
      control: { type: 'select' },
      options: [undefined, 'freeform', 'horizontal', 'vertical', 'grid', 'curved'],
      description: 'Layout flow type',
      table: { category: 'Layout' }
    },
    path: {
      control: { type: 'object' },
      description: 'SVG path object ({ d: "M ..." })',
      table: { category: 'Layout' }
    },
    gap: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Space between items in pixels',
      table: { category: 'Layout' }
    },
    padding: {
      control: { type: 'number', min: 0, max: 50, step: 2 },
      description: 'Internal padding in pixels',
      table: { category: 'Layout' }
    },
    width: {
      control: { type: 'number', min: 100, max: 600, step: 10 },
      description: 'Frame width',
      table: { category: 'Layout' }
    },
    height: {
      control: { type: 'number', min: 100, max: 600, step: 10 },
      description: 'Frame height',
      table: { category: 'Layout' }
    },
    childWidth: {
      control: { type: 'number', min: 8, max: 128, step: 4 },
      description: 'Child width',
      table: { category: 'Children' }
    },
    childHeight: {
      control: { type: 'number', min: 8, max: 128, step: 4 },
      description: 'Child height',
      table: { category: 'Children' }
    },
    childAlignment: {
      control: { type: 'select' },
      options: [undefined, 'top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'],
      description: 'Child alignment',
      table: { category: 'Children' }
    },
  },
  render: (args: LayoutArgs) => {
    const autoLayoutProps = args.flow ? {
      flow: args.flow,
      alignment: args.alignment,
      gap: args.gap,
      padding: args.padding,
      wrap: args.wrap,
      clipContent: args.clipContent,
      width: args.width,
      height: args.height,
      path: args.path
    } : undefined;
    return (
      <Frame
        autoLayout={autoLayoutProps}
        fill={args.fill}
        stroke={args.stroke}
        appearance={args.appearance}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Frame
            key={i}
            stroke={{ type: 'none' }}
            fill={{ type: 'solid', color: i === 1 ? 'gray6' : i === 2 ? 'tomato6' : i === 3 ? 'grass6' : i === 4 ? 'blue6' : 'warning6' }}
            autoLayout={{
              width: args.childWidth,
              height: args.childHeight,
              alignment: args.childAlignment
            }}
            appearance={{ radius: 4 }}
          >
            <Frame
              stroke={{ type: 'none' }}
              typography={{ color: 'gray10', fontSize: 10, textAlign: 'center' }}
              autoLayout={{ padding: 8 }}
            >
              {`Item ${i}`}
            </Frame>
          </Frame>
        ))}
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive layout controls - adjust auto layout flow, gap, path, width, height, and padding options to see how they affect child positioning.'
      }
    },
    controls: {
      exclude: ['autoLayout', 'position', 'size', 'fill', 'appearance', 'stroke', 'className', 'style', 'onClick', 'onMouseEnter', 'onMouseLeave']
    }
  }
};

export const CurvedLayout: LayoutStory = {
  args: {
    fill: { type: 'solid', color: 'neutral2' },
    stroke: { type: 'none' },
    appearance: { radius: 8 },
    flow: 'curved',
    path: { d: 'M 40 200 Q 120 40 200 200 T 360 200' }, // random curve
    width: 400,
    height: 240,
    gap: 32,
    padding: 0,
    wrap: 'nowrap',
    clipContent: false,
    childWidth: 32,
    childHeight: 32,
    childAlignment: 'center',
    children: Array.from({ length: 10 }).map((_, i) => (
      <Frame
        key={i}
        fill={{ type: 'solid', color: `primary12` }}
        appearance={{ radius: 16 }}
        autoLayout={{ width: 'hug', height: 'hug', alignment: 'center' }}
      >
        <Frame
          autoLayout={{ padding: 4 }}
          typography={{ color: 'gray12', fontSize: 12, textAlign: 'center' }}
        >
          {i + 1}
        </Frame>
      </Frame>
    ))
  },
  argTypes: {
    flow: {
      control: { type: 'select' },
      options: [undefined, 'freeform', 'horizontal', 'vertical', 'grid', 'curved'],
      description: 'Layout flow type',
      table: { category: 'Layout' }
    },
    path: {
      control: { type: 'object' },
      description: 'SVG path object ({ d: "M ..." })',
      table: { category: 'Layout' }
    },
    gap: {
      control: { type: 'number', min: 0, max: 50, step: 2 },
      description: 'Space between items in pixels',
      table: { category: 'Layout' }
    },
    padding: {
      control: { type: 'number', min: 0, max: 50, step: 2 },
      description: 'Internal padding in pixels',
      table: { category: 'Layout' }
    },
    wrap: {
      control: { type: 'select' },
      options: [undefined, 'nowrap', 'wrap', 'wrap-reverse'],
      description: 'Flex wrap behavior',
      table: { category: 'Layout' }
    },
    clipContent: {
      control: { type: 'boolean' },
      description: 'Clip content that overflows (overflow: hidden)',
      table: { category: 'Layout' }
    },
    width: {
      control: { type: 'select' },
      options: [undefined, 'hug', 'fill-container', 200, 300, 400],
      description: 'Container width behavior',
      table: { category: 'Layout' }
    },
    height: {
      control: { type: 'select' },
      options: [undefined, 'hug', 'fill-container', 100, 150, 200],
      description: 'Container height behavior',
      table: { category: 'Layout' }
    },
    // Child frame controls
    childWidth: {
      control: { type: 'select' },
      options: [undefined, 'hug', 'fill-container', 30, 40, 50, 60, 80, 100, 120, 150],
      description: 'Width behavior of child frames',
      table: { category: 'Children' }
    },
    childHeight: {
      control: { type: 'select' },
      options: [undefined, 'hug', 'fill-container', 20, 30, 40, 50, 60, 80, 100],
      description: 'Height behavior of child frames',
      table: { category: 'Children' }
    },
    childAlignment: {
      control: { type: 'select' },
      options: [undefined, 'top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right', 'top', 'center', 'bottom', 'left', 'right'],
      description: 'Alignment of content within child frames',
      table: { category: 'Children' }
    },
    // Hide other controls to focus on layout
    position: { control: false },
    fill: { control: false },
    appearance: { control: false },
    stroke: { control: false },
    onClick: { control: false },
    onMouseEnter: { control: false },
    onMouseLeave: { control: false }
  },
  render: (args: LayoutArgs) => (
    <>
      {/* Original curve */}
      <Frame
        autoLayout={{
          flow: args.flow,
          path: args.path,
          gap: args.gap,
          width: args.width,
          height: args.height
        }}
        fill={args.fill}
        stroke={args.stroke}
        appearance={args.appearance}
      >
        {args.children}
      </Frame>
      {/* Random curve 1: S-curve */}
      <Frame
        autoLayout={{
          flow: 'curved',
          path: { d: 'M 40 200 Q 120 40 200 200 Q 280 360 360 200' },
          gap: args.gap,
          width: 'hug',
          height: 'hug'
        }}
        fill={{ type: 'solid', color: 'black8' }}
        appearance={{ radius: 8 }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <Frame
            key={i}
            fill={{ type: 'solid', color: 'blue6' }}
            appearance={{ radius: 16 }}
            autoLayout={{ width: 32, height: 32, alignment: 'center' }}
          >
            <Frame
              autoLayout={{ padding: 4 }}
              typography={{ color: 'gray12', fontSize: 12, textAlign: 'center' }}
            >
              {i + 1}
            </Frame>
          </Frame>
        ))}
      </Frame>
      {/* Random curve 2: Spiral-like */}
      <Frame
        autoLayout={{
          flow: 'curved',
          path: { d: 'M 100 200 Q 150 100 200 200 Q 250 300 300 200 Q 350 100 400 200' },
          gap: args.gap,
          width: 'hug',
          height: 'hug'
        }}
        fill={{ type: 'solid', color: 'black8' }}
        appearance={{ radius: 8 }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <Frame
            key={i}
            fill={{ type: 'solid', color: 'tomato6' }}
            appearance={{ radius: 16 }}
            autoLayout={{ width: 32, height: 32, alignment: 'center' }}
          >
            <Frame
              autoLayout={{ padding: 4 }}
              typography={{ color: 'gray12', fontSize: 12, textAlign: 'center' }}
            >
              {i + 1}
            </Frame>
          </Frame>
        ))}
      </Frame>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Curved auto layout: children are distributed along a custom SVG curve.'
      }
    },
    controls: {
      exclude: ['autoLayout', 'position', 'size', 'fill', 'appearance', 'stroke', 'className', 'style', 'onClick', 'onMouseEnter', 'onMouseLeave']
    }
  }
};