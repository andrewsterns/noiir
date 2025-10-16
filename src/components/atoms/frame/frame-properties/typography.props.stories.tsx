import type { Meta, StoryObj } from '@storybook/react';
import { Frame, FrameProps } from '../Frame';

interface TypographyArgs extends Partial<FrameProps> {
  fontFamily: string;
  fontSize: number;
  fontWeight: number | string;
  lineHeight: number | string;
  letterSpacing: number | string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  textDecoration: 'none' | 'underline' | 'line-through';
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textColor: string;
  sampleText: string;
}

const meta: Meta<typeof Frame> = {
  title: 'Frame/Properties/Typography',
  component: Frame,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Typography properties control text styling within frames including font family, size, weight, alignment and decoration.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type TypographyStory = StoryObj<TypographyArgs>;

export const Typography: TypographyStory = {
  args: {
    sampleText: 'Sample Typography Text',
    fontFamily: 'Arial, sans-serif',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: 0,
    textAlign: 'left',
    textDecoration: 'none',
    textTransform: 'none',
    textColor: '#374151',
    fill: { type: 'solid', color: 'neutral1' },
    autoLayout: { width: 300, height: 150 }
  },
  argTypes: {
    sampleText: {
      control: { type: 'text' },
      description: 'Sample text to demonstrate typography styles',
      table: { category: 'Content' }
    },
    fontFamily: {
      control: { type: 'select' },
      options: ['Arial, sans-serif', 'Georgia, serif', 'Courier New, monospace', 'Helvetica, sans-serif', 'Times New Roman, serif'],
      description: 'Font family for the text',
      table: { category: 'Typography' }
    },
    fontSize: {
      control: { type: 'range', min: 12, max: 48, step: 2 },
      description: 'Font size in pixels',
      table: { category: 'Typography' }
    },
    fontWeight: {
      control: { type: 'select' },
      options: [100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold', 'lighter', 'bolder'],
      description: 'Font weight',
      table: { category: 'Typography' }
    },
    lineHeight: {
      control: { type: 'range', min: 1, max: 3, step: 0.1 },
      description: 'Line height as a multiplier',
      table: { category: 'Typography' }
    },
    letterSpacing: {
      control: { type: 'range', min: -2, max: 5, step: 0.1 },
      description: 'Letter spacing in pixels',
      table: { category: 'Typography' }
    },
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
      table: { category: 'Typography' }
    },
    textDecoration: {
      control: { type: 'select' },
      options: ['none', 'underline', 'line-through'],
      description: 'Text decoration',
      table: { category: 'Typography' }
    },
    textTransform: {
      control: { type: 'select' },
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      description: 'Text transformation',
      table: { category: 'Typography' }
    },
    textColor: {
      control: { type: 'color' },
      description: 'Text color',
      table: { category: 'Typography' }
    },
    // Hide other controls to focus on typography
    position: { control: false },
    autoLayout: { control: false },
    fill: { control: false },
    stroke: { control: false },
    appearance: { control: false },
    onClick: { control: false },
    onMouseEnter: { control: false },
    onMouseLeave: { control: false }
  },
  render: (args: TypographyArgs) => (
    <Frame
      fill={args.fill}
      appearance={{ radius: 8 }}
      autoLayout={{
        ...args.autoLayout,
        flow: 'vertical',
        alignment: 'top-left',
        padding: 20
      }}
    >
      <div
        style={{
          fontFamily: args.fontFamily,
          fontSize: `${args.fontSize}px`,
          fontWeight: args.fontWeight,
          lineHeight: args.lineHeight,
          letterSpacing: `${args.letterSpacing}px`,
          textAlign: args.textAlign,
          textDecoration: args.textDecoration,
          textTransform: args.textTransform,
          color: args.textColor,
          width: '100%'
        }}
      >
        {args.sampleText}
      </div>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive typography controls - adjust font properties to see how they affect text rendering within frames.'
      }
    },
    controls: {
      exclude: ['position', 'autoLayout', 'size', 'fill', 'stroke', 'appearance', 'className', 'style', 'onClick', 'onMouseEnter', 'onMouseLeave']
    }
  }
};