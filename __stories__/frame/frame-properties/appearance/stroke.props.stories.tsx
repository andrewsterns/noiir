import type { Meta, StoryObj } from '@storybook/react';
import { Frame, FrameProps } from '../../../../src/components/frame/Frame';

interface StrokeArgs extends Partial<FrameProps> {
  children?: React.ReactNode;
  strokeType: 'none' | 'solid' | 'gradient';
  // Solid stroke controls
  solidColorType: 'hex' | 'theme';
  solidColorHex: string;
  solidColorTheme: string;
  solidColorShade: number;
  solidOpacity: number;
  strokeWeight: number;
  strokePosition: 'inside' | 'outside' | 'center';
  // Gradient stroke controls
  gradientStop1ColorType: 'hex' | 'theme';
  gradientStop1ColorHex: string;
  gradientStop1ColorTheme: string;
  gradientStop1ColorShade: number;
  gradientStop1Opacity: number;
  gradientStop2ColorType: 'hex' | 'theme';
  gradientStop2ColorHex: string;
  gradientStop2ColorTheme: string;
  gradientStop2ColorShade: number;
  gradientStop2Opacity: number;
  gradientAngle: number;
  gradientOpacity: number;
  // Dash pattern
  useDashPattern: boolean;
  dashPattern1: number;
  dashPattern2: number;
}

const meta: Meta<typeof Frame> = {
  title: 'Frame/Properties/Stroke',
  component: Frame,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Stroke properties control the border appearance of frames including none, solid colors, gradients, and opacity.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type StrokeStory = StoryObj<StrokeArgs>;

export const Stroke: StrokeStory = {
  args: {
    children: 'Stroke Demo',
    // Stroke controls
    strokeType: 'solid',
    // Solid stroke defaults
    solidColorType: 'theme',
    solidColorHex: '#3B82F6',
    solidColorTheme: 'white4',
    solidColorShade: 4,
    solidOpacity: 0,
    strokeWeight: 1,
    strokePosition: 'inside',
    // Gradient stroke defaults
    gradientStop1ColorType: 'theme',
    gradientStop1ColorHex: '#3B82F6',
    gradientStop1ColorTheme: 'primary',
    gradientStop1ColorShade: 6,
    gradientStop1Opacity: 1,
    gradientStop2ColorType: 'theme',
    gradientStop2ColorHex: '#EF4444',
    gradientStop2ColorTheme: 'error',
    gradientStop2ColorShade: 6,
    gradientStop2Opacity: 1,
    gradientAngle: 45,
    gradientOpacity: 1,
    // Dash pattern defaults
    useDashPattern: false,
    dashPattern1: 8,
    dashPattern2: 4
  },
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Frame content'
    },
    strokeType: {
      control: { type: 'select' },
      options: ['none', 'solid', 'gradient'],
      description: 'Type of stroke to apply',
      table: { category: 'Stroke Type' }
    },
    // Solid stroke controls
    solidColorType: {
      control: { type: 'select' },
      options: ['hex', 'theme'],
      description: 'Color input type (hex code or theme color)',
      table: { category: 'Solid Stroke' },
      if: { arg: 'strokeType', eq: 'solid' }
    },
    solidColorHex: {
      control: { type: 'color' },
      description: 'Hex color code',
      table: { category: 'Solid Stroke' },
      if: { arg: 'solidColorType', eq: 'hex' }
    },
    solidColorTheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'Theme color name',
      table: { category: 'Solid Stroke' },
      if: { arg: 'solidColorType', eq: 'theme' }
    },
    solidColorShade: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      description: 'Theme color shade',
      table: { category: 'Solid Stroke' },
      if: { arg: 'solidColorType', eq: 'theme' }
    },
    solidOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Stroke opacity (0-1)',
      table: { category: 'Solid Stroke' },
      if: { arg: 'strokeType', eq: 'solid' }
    },
    strokeWeight: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
      description: 'Stroke width in pixels',
      table: { category: 'Stroke Style' }
    },
    strokePosition: {
      control: { type: 'select' },
      options: ['inside', 'center', 'outside'],
      description: 'Stroke position relative to frame bounds',
      table: { category: 'Stroke Style' }
    },
    // Gradient stroke controls
    gradientStop1ColorType: {
      control: { type: 'select' },
      options: ['hex', 'theme'],
      description: 'First stop color type',
      table: { category: 'Gradient Stroke' },
      if: { arg: 'strokeType', eq: 'gradient' }
    },
    gradientStop1ColorHex: {
      control: { type: 'color' },
      description: 'First gradient stop hex color',
      table: { category: 'Gradient Stroke' },
      if: { arg: 'gradientStop1ColorType', eq: 'hex' }
    },
    gradientStop1ColorTheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'First gradient stop theme color',
      table: { category: 'Gradient Stroke' },
      if: { arg: 'gradientStop1ColorType', eq: 'theme' }
    },
    gradientStop1ColorShade: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      description: 'First gradient stop shade',
      table: { category: 'Gradient Stroke' },
      if: { arg: 'gradientStop1ColorType', eq: 'theme' }
    },
    gradientStop1Opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'First gradient stop opacity (0-1)',
      table: { category: 'Gradient Stroke' },
      if: { arg: 'strokeType', eq: 'gradient' }
    },
    gradientStop2ColorType: {
      control: { type: 'select' },
      options: ['hex', 'theme'],
      description: 'Second stop color type',
      table: { category: 'Gradient Stroke' },
      if: { arg: 'strokeType', eq: 'gradient' }
    },
    gradientStop2ColorHex: {
      control: { type: 'color' },
      description: 'Second gradient stop hex color',
      table: { category: 'Gradient Stroke' },
      if: { arg: 'gradientStop2ColorType', eq: 'hex' }
    },
    gradientStop2ColorTheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'Second gradient stop theme color',
      table: { category: 'Gradient Stroke' },
      if: { arg: 'gradientStop2ColorType', eq: 'theme' }
    },
    gradientStop2ColorShade: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      description: 'Second gradient stop shade',
      table: { category: 'Gradient Stroke' },
      if: { arg: 'gradientStop2ColorType', eq: 'theme' }
    },
    gradientStop2Opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Second gradient stop opacity (0-1)',
      table: { category: 'Gradient Stroke' },
      if: { arg: 'strokeType', eq: 'gradient' }
    },
    gradientAngle: {
      control: { type: 'range', min: 0, max: 360, step: 5 },
      description: 'Gradient angle in degrees',
      table: { category: 'Gradient Stroke' },
      if: { arg: 'strokeType', eq: 'gradient' }
    },
    gradientOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Gradient stroke opacity (0-1)',
      table: { category: 'Gradient Stroke' },
      if: { arg: 'strokeType', eq: 'gradient' }
    },
    // Dash pattern controls
    useDashPattern: {
      control: { type: 'boolean' },
      description: 'Enable dashed stroke pattern',
      table: { category: 'Dash Pattern' }
    },
    dashPattern1: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
      description: 'Dash length',
      table: { category: 'Dash Pattern' },
      if: { arg: 'useDashPattern', eq: true }
    },
    dashPattern2: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
      description: 'Gap length',
      table: { category: 'Dash Pattern' },
      if: { arg: 'useDashPattern', eq: true }
    },
    // Hide other controls to focus on strokes
    onClick: { control: false },
    onMouseEnter: { control: false },
    onMouseLeave: { control: false }
  },
  render: (args: StrokeArgs) => {
    // Helper function to resolve color based on type
    const resolveColor = (colorType: 'hex' | 'theme', hexColor: string, themeColor: string, shade: number) => {
      if (colorType === 'hex') {
        return hexColor;
      } else {
        // Use the new 1-12 naming system: 'primary6', 'success3', etc.
        return `${themeColor}${shade}`;
      }
    };

    // Build stroke object based on type
    let strokeProps: any = undefined;

    switch (args.strokeType) {
      case 'none':
        strokeProps = { type: 'none' };
        break;
      case 'solid':
        strokeProps = {
          type: 'solid',
          color: resolveColor(args.solidColorType, args.solidColorHex, args.solidColorTheme, args.solidColorShade),
          weight: args.strokeWeight,
          position: args.strokePosition,
          ...(args.solidOpacity < 1 && { opacity: args.solidOpacity }),
          ...(args.useDashPattern && { dashPattern: [args.dashPattern1, args.dashPattern2] })
        };
        break;
      case 'gradient':
        strokeProps = {
          type: 'gradient',
          weight: args.strokeWeight,
          position: args.strokePosition,
          stops: [
            {
              color: resolveColor(args.gradientStop1ColorType, args.gradientStop1ColorHex, args.gradientStop1ColorTheme, args.gradientStop1ColorShade),
              position: 0,
              opacity: args.gradientStop1Opacity
            },
            {
              color: resolveColor(args.gradientStop2ColorType, args.gradientStop2ColorHex, args.gradientStop2ColorTheme, args.gradientStop2ColorShade),
              position: 1,
              opacity: args.gradientStop2Opacity
            }
          ],
          gradientType: 'linear',
          angle: args.gradientAngle,
          ...(args.gradientOpacity < 1 && { opacity: args.gradientOpacity }),
          ...(args.useDashPattern && { dashPattern: [args.dashPattern1, args.dashPattern2] })
        };
        break;
    }

    return (
      <Frame
        appearance={{ radius: 8 }}
        autoLayout={{
          flow: 'vertical',
          alignment: 'center',
          gap: 16,
          padding: 24,
          width: 280,
          height: 200
        }}
        fill={{ type: 'solid', color: 'white2', opacity: 0.9 }}
        typography={{
          type: 'h6',
          color: 'gray7',
          wrap: 'nowrap',
          textAlign: 'center'
        }}
        {...args}
        stroke={strokeProps}
      />
    );
  }
};

export const IndividualStrokes: StrokeStory = {
  name: 'Individual Strokes',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      {/* Left only, position inside */}
      <Frame
        id='frame73364'
        autoLayout={{ flow: 'freeform', width: 307, height: 164 }}
        fill={{ type: 'solid', color: '#ffffff' }}
        stroke={{ left: { type: 'solid', color: '#000000', weight: 4 }, position: 'inside' }}
        appearance={{ radius: 0 }}
      >
        <div style={{ color: '#222', fontSize: 14, textAlign: 'center' }}>Left Only<br/>position: 'inside'</div>
      </Frame>

      {/* Top and bottom, different colors */}
      <Frame
        autoLayout={{ width: 180, height: 120, alignment: 'center' }}
        fill={{ type: 'solid', color: 'white2' }}
        stroke={{
          top: { type: 'solid', color: 'primary7', weight: 3 },
          bottom: { type: 'solid', color: 'success7', weight: 3 }
        }}
        appearance={{ radius: 8 }}
      >
        <div style={{ color: '#222', fontSize: 14, textAlign: 'center' }}>Top + Bottom</div>
      </Frame>

      {/* All four sides, different weights */}
      <Frame
        autoLayout={{ width: 180, height: 120, alignment: 'center' }}
        fill={{ type: 'solid', color: 'white2' }}
        stroke={{
          top: { type: 'solid', color: 'primary7', weight: 1 },
          right: { type: 'solid', color: 'success7', weight: 2 },
          bottom: { type: 'solid', color: 'warning7', weight: 4 },
          left: { type: 'solid', color: 'error7', weight: 6 }
        }}
        appearance={{ radius: 8 }}
      >
        <div style={{ color: '#222', fontSize: 14, textAlign: 'center' }}>All Sides<br/>Different Weights</div>
      </Frame>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates individual strokes (per-side borders) including left-only, top+bottom, and all sides with different weights. This matches Figma\'s individual stroke feature.'
      }
    }
  }
};

export const MultipleStrokes: StrokeStory = {
  name: 'Multiple Strokes',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 20 }}>
      {/* Two strokes: primary outer, secondary inner */}
      <Frame
        autoLayout={{ width: 180, height: 120, alignment: 'center' }}
        fill={{ type: 'solid', color: 'white2' }}
        stroke={[
          { type: 'solid', color: 'primary7', weight: 4, position: 'inside' },
          { type: 'solid', color: 'accent7', weight: 2, position: 'inside' }
        ]}
        appearance={{ radius: 8 }}
      >
        <div style={{ color: '#222', fontSize: 14, textAlign: 'center' }}>
          Two Strokes<br/>Different Colors
        </div>
      </Frame>

      {/* Three strokes: rainbow effect */}
      <Frame
        autoLayout={{ width: 180, height: 120, alignment: 'center' }}
        fill={{ type: 'solid', color: 'white2' }}
        stroke={[
          { type: 'solid', color: 'error7', weight: 2, position: 'inside' },
          { type: 'solid', color: 'warning7', weight: 2, position: 'inside' },
          { type: 'solid', color: 'success7', weight: 2, position: 'inside' }
        ]}
        appearance={{ radius: 12 }}
      >
        <div style={{ color: '#222', fontSize: 14, textAlign: 'center' }}>
          Three Strokes<br/>Rainbow Effect
        </div>
      </Frame>

      {/* Multiple strokes with opacity */}
      <Frame
        autoLayout={{ width: 180, height: 120, alignment: 'center' }}
        fill={{ type: 'solid', color: 'neutral2' }}
        stroke={[
          { type: 'solid', color: 'primary7', weight: 3, opacity: 1 },
          { type: 'solid', color: 'primary7', weight: 2, opacity: 0.5 },
          { type: 'solid', color: 'primary7', weight: 2, opacity: 0.25 }
        ]}
        appearance={{ radius: 8 }}
      >
        <div style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>
          Fading Strokes<br/>with Opacity
        </div>
      </Frame>

      {/* Mixed weights for border frame effect */}
      <Frame
        autoLayout={{ width: 180, height: 120, alignment: 'center' }}
        fill={{ type: 'solid', color: 'white1' }}
        stroke={[
          { type: 'solid', color: 'neutral8', weight: 1, position: 'inside' },
          { type: 'solid', color: 'primary5', weight: 3, position: 'inside' },
          { type: 'solid', color: 'neutral8', weight: 1, position: 'inside' }
        ]}
        appearance={{ radius: 0 }}
      >
        <div style={{ color: '#222', fontSize: 14, textAlign: 'center' }}>
          Bordered Frame<br/>Effect
        </div>
      </Frame>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates multiple strokes stacked together, similar to Figma\'s multiple stroke feature. Strokes are layered from innermost to outermost using CSS box-shadow technique.'
      }
    }
  }
};
