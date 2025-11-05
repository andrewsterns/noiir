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
