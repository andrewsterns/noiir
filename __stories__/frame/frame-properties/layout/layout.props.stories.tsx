export const HorizontalVsFreeform: LayoutStory = {
  args: {
    fill: { type: 'solid', color: 'white2', opacity: 0.9 },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 8 },
    width: 600,
    height: 120,
    gap: 16,
    padding: 8,
    childWidth: 100,
    childHeight: 40,
  },
  render: (args: LayoutArgs) => (

        <Frame
          autoLayout={{ flow: 'vertical', gap: 32 }}
        >
          <Frame typography={{ type: 'h6', color: 'gray7', wrap: 'nowrap', textAlign: 'left' }} >Horizontal Layout (gap, shifting)</Frame>
          <Frame
            autoLayout={{ flow: 'horizontal', gap: 16, padding: 8, width: 'hug', height: 60 }}
            fill={{ type: 'solid', color: 'white2', opacity: 0.9 }}
            stroke={{ type: 'solid', color: 'white4', weight: 1, opacity: 0 }}
            appearance={{ radius: 8 }}
          >
            <Frame
              fill={{ type: 'solid', color: 'white7' }}
              autoLayout={{ width: 140, height: 40 }}
              appearance={{ radius: 4 }}
              onMouseEnter={e => e.currentTarget.style.width = '260px'}
              onMouseLeave={e => e.currentTarget.style.width = '140px'}
            >
              A (hover me)
            </Frame>
            <Frame fill={{ type: 'solid', color: 'white4' }} autoLayout={{ width: 140, height: 40 }} appearance={{ radius: 4 }}>B</Frame>
            <Frame fill={{ type: 'solid', color: 'white4' }} autoLayout={{ width: 140, height: 40 }} appearance={{ radius: 4 }}>C</Frame>
          </Frame>
          <Frame typography={{ type: 'h6', color: 'gray7', wrap: 'nowrap', textAlign: 'left' }}>Freeform Layout (no shifting)</Frame>
          <Frame
            autoLayout={{ flow: 'freeform', padding: 8, width: 'hug', height: 60, gap: 16 }}
            fill={{ type: 'solid', color: 'white2', opacity: 0.9 }}
            stroke={{ type: 'solid', color: 'white4', weight: 1, opacity: 0 }}
            appearance={{ radius: 8 }}
          >
            <Frame
              fill={{ type: 'solid', color: 'white7' }}
              autoLayout={{ width: 140, height: 40 }}
              appearance={{ radius: 4 }}
              position={{ x: 0, y: 0 }}
              onMouseEnter={e => e.currentTarget.style.width = '260px'}
              onMouseLeave={e => e.currentTarget.style.width = '140px'}
            >
              <Frame
                typography={{ type: 'h6', color: 'gray7', wrap: 'nowrap', textAlign: 'center' }}
                autoLayout={{ padding: 8, alignment: 'center' }}
              >
                A (hover me)
              </Frame>
            </Frame>
            <Frame 
              fill={{ type: 'solid', color: 'white4' }} 
              autoLayout={{ width: 140, height: 40 }} 
              appearance={{ radius: 4 }} 
              position={{ x: 180, y: 0 }}
            >
              <Frame
                typography={{ type: 'h6', color: 'gray7', wrap: 'nowrap', textAlign: 'center' }}
                autoLayout={{ padding: 8, alignment: 'center' }}
              >
                B
              </Frame>
            </Frame>
            <Frame 
              fill={{ type: 'solid', color: 'white4' }} 
              autoLayout={{ width: 140, height: 40 }} 
              appearance={{ radius: 4 }} 
              position={{ x: 340, y: 0 }}
            >
              <Frame
                typography={{ type: 'h6', color: 'gray7', wrap: 'nowrap', textAlign: 'center' }}
                autoLayout={{ padding: 8, alignment: 'center' }}
              >
                C
              </Frame>
            </Frame>
          </Frame>
        </Frame>
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
import { Frame, FrameProps } from '../../../../src/components/frame/Frame';

// Layout story controls interface
interface LayoutArgs extends Partial<FrameProps> {
  children?: React.ReactNode;
  flow?: 'freeform' | 'horizontal' | 'vertical' | 'grid' | 'curved';
  alignment?: 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'center' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'top' | 'center' | 'bottom' | 'left' | 'right';
  gap: number;
  padding: number;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  clipContent: boolean;
  width?: string | number | 'hug' | 'fill-container';
  height?: string | number | 'hug' | 'fill-container';
  // Child frame controls
  childWidth: number;
  childHeight: number;
  childAlignment?: 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'center' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
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
    fill: { type: 'solid', color: 'white2', opacity: 0.9 },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
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
    alignment: {
      control: { type: 'select' },
      options: [undefined, 'topLeft', 'topCenter', 'topRight', 'centerLeft', 'center', 'centerRight', 'bottomLeft', 'bottomCenter', 'bottomRight'],
      description: 'Container alignment',
      table: { category: 'Layout' }
    },
    wrap: {
      control: { type: 'select' },
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Flex wrap behavior',
      table: { category: 'Layout' }
    },
    clipContent: {
      control: { type: 'boolean' },
      description: 'Clip content that overflows',
      table: { category: 'Layout' }
    },
    gap: {
      control: { type: 'select' },
      options: [0, 4, 8, 12, 16, 24, 32, 48, 64],
      description: 'Space between items in pixels',
      table: { category: 'Layout' }
    },
    padding: {
      control: { type: 'select' },
      options: [0, 4, 8, 12, 16, 24, 32],
      description: 'Internal padding in pixels',
      table: { category: 'Layout' }
    },
    width: {
      control: { type: 'select' },
      options: ['hug', 'fill-container', 200, 300, 400, 500, 600],
      description: 'Frame width',
      table: { category: 'Layout' }
    },
    height: {
      control: { type: 'select' },
      options: ['hug', 'fill-container', 150, 200, 250, 300, 400, 500, 600],
      description: 'Frame height',
      table: { category: 'Layout' }
    },
    childWidth: {
      control: { type: 'select' },
      options: ['hug', 'fill-container', 24, 32, 40, 48, 56, 64, 80, 96, 112, 128],
      description: 'Child width',
      table: { category: 'Children' }
    },
    childHeight: {
      control: { type: 'select' },
      options: ['hug', 'fill-container', 24, 32, 40, 48, 56, 64, 80, 96, 112, 128],
      description: 'Child height',
      table: { category: 'Children' }
    },
    childAlignment: {
      control: { type: 'select' },
      options: [undefined, 'topLeft', 'topCenter', 'topRight', 'centerLeft', 'center', 'centerRight', 'bottomLeft', 'bottomCenter', 'bottomRight'],
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
            fill={{ type: 'solid', color: i === 1 ? 'gray3' : i === 2 ? 'gray4' : i === 3 ? 'gray5' : i === 4 ? 'gray6' : 'gray7' }}
            autoLayout={{
              flow: 'vertical',
              width: args.childWidth,
              height: args.childHeight,
              alignment: args.childAlignment,
              gap: 12
            }}
            appearance={{ radius: 4 }}
            typography={{type: 'h6'}}
          >
            <Frame
              stroke={{ type: 'none' }}
              typography={{ fontSize: 9, color: 'white4', wrap: 'nowrap', textAlign: 'center' }}
              autoLayout={{ flow: 'grid', alignment: 'center', padding: 8, width: 'hug', height: 'hug' }}
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
    fill: { type: 'solid', color: 'white2', opacity: 0.9 },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
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
        fill={{ type: 'solid', color: 'white2', opacity: 0.9 }}
        stroke={{ type: 'solid', color: 'white4', weight: 1, opacity: 0 }}
        appearance={{ radius: 8 }}
        autoLayout={{ width: 'hug', height: 'hug', alignment: 'center' }}
      >
        <Frame
          autoLayout={{ padding: 4 }}
          typography={{ type: 'h6', color: 'gray7', wrap: 'nowrap', textAlign: 'center' }}
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
        fill={{ type: 'solid', color: 'white2', opacity: 0.9 }}
        stroke={{ type: 'solid', color: 'white4', weight: 1, opacity: 0 }}
        appearance={{ radius: 8 }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <Frame
            key={i}
            fill={{ type: 'solid', color: 'blue6' }}
            appearance={{ radius: 8 }}
            autoLayout={{ width: 32, height: 32, alignment: 'center' }}
          >
            <Frame
              autoLayout={{ padding: 4 }}
              typography={{ type: 'h6', color: 'gray7', wrap: 'nowrap', textAlign: 'center' }}
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
        fill={{ type: 'solid', color: 'white2', opacity: 0.9 }}
        stroke={{ type: 'solid', color: 'white4', weight: 1, opacity: 0 }}
        appearance={{ radius: 8 }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <Frame
            key={i}
            fill={{ type: 'solid', color: 'tomato6' }}
            appearance={{ radius: 8 }}
            autoLayout={{ width: 32, height: 32, alignment: 'center' }}
          >
            <Frame
              autoLayout={{ padding: 4 }}
              typography={{ type: 'h6', color: 'gray7', wrap: 'nowrap', textAlign: 'center' }}
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

export const WrapAndClip: LayoutStory = {
  args: {
    fill: { type: 'solid', color: 'white2', opacity: 0.9 },
    stroke: { type: 'solid', color: 'white4', weight: 1, opacity: 0 },
    appearance: { radius: 8 },
    width: 120,
    height: 'hug',
    gap: 8,
    padding: 8,
    wrap: 'nowrap',
    clipContent: false,
    childWidth: 50,
    childHeight: 30,
  },
  argTypes: {
    wrap: {
      control: { type: 'select' },
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Flex wrap behavior - nowrap keeps in one line, wrap brings children below',
      table: { category: 'Layout' }
    },
    clipContent: {
      control: { type: 'boolean' },
      description: 'Clip content that overflows - hides children outside bounds',
      table: { category: 'Layout' }
    },
    width: {
      control: { type: 'number', min: 80, max: 200, step: 10 },
      description: 'Fixed container width to demonstrate wrapping/clipping',
      table: { category: 'Layout' }
    },
    childWidth: {
      control: { type: 'number', min: 30, max: 80, step: 5 },
      description: 'Child width - make larger than container width to see overflow',
      table: { category: 'Children' }
    },
  },
  render: (args: LayoutArgs) => (
    <Frame
      autoLayout={{
        flow: 'horizontal',
        gap: args.gap,
        padding: args.padding,
        wrap: args.wrap,
        clipContent: args.clipContent,
        width: args.width,
        height: args.height
      }}
      fill={args.fill}
      stroke={args.stroke}
      appearance={args.appearance}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Frame
          key={i}
          stroke={{ type: 'none' }}
          fill={{ type: 'solid', color: i === 1 ? 'blue6' : i === 2 ? 'tomato6' : i === 3 ? 'grass6' : i === 4 ? 'warning6' : 'purple6' }}
          autoLayout={{
            width: args.childWidth,
            height: args.childHeight,
            alignment: 'center'
          }}
          appearance={{ radius: 4 }}
        >
          <Frame
            stroke={{ type: 'none' }}
            typography={{ type: 'h6', color: 'gray7', wrap: 'nowrap', textAlign: 'center' }}
            autoLayout={{ padding: 4 }}
          >
            {`Item ${i}`}
          </Frame>
        </Frame>
      ))}
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates wrapping (children flow to next line) and clipping (overflow hidden) with fixed width container.'
      }
    },
    controls: {
      exclude: ['autoLayout', 'position', 'size', 'fill', 'appearance', 'stroke', 'className', 'style', 'onClick', 'onMouseEnter', 'onMouseLeave', 'flow', 'alignment', 'padding', 'gap', 'height', 'childHeight', 'childAlignment', 'path']
    }
  }
};