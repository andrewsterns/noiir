import type { Meta, StoryObj } from '@storybook/react';
import { Frame, FrameProps } from '../../../../src/components/frame/Frame';
import { NoiirBk, NoiirOutlineBk } from '../../../../src/theme/icons/noiir.svg';

const Group26 = new URL('../../../../src/theme/icons/Group 26.png', import.meta.url).href;

//ALL FILL RELATED PROPS AND STORIES SHOULD GO IN THIS FILE

interface FillArgs extends Partial<FrameProps> {
  fillType: 'none' | 'solid' | 'linear-gradient' | 'radial-gradient' | 'conic-gradient' | 'image';
  // Overall fill opacity
  fillOpacity: number;
  // Solid fill controls
  solidColorType: 'hex' | 'theme';
  solidColorHex: string;
  solidColorTheme: string;
  solidColorShade: number;
  solidColorOpacity: number;
  // Gradient controls
  gradientType: 'linear' | 'radial' | 'angular';
  gradientAngle: number;
  gradientStop1ColorType: 'hex' | 'theme';
  gradientStop1ColorHex: string;
  gradientStop1ColorTheme: string;
  gradientStop1ColorShade: number;
  gradientStop1Position: number;
  gradientStop2ColorType: 'hex' | 'theme';
  gradientStop2ColorHex: string;
  gradientStop2ColorTheme: string;
  gradientStop2ColorShade: number;
  gradientStop2Position: number;
  gradientStop3ColorType: 'hex' | 'theme';
  gradientStop3ColorHex: string;
  gradientStop3ColorTheme: string;
  gradientStop3ColorShade: number;
  gradientStop3Position: number;
  // Image fill controls
  imageUrl: string;
  imageScaleMode: 'fill' | 'fit' | 'crop' | 'tile';
}

const meta: Meta<typeof Frame> = {
  title: 'Frame/Properties/Fill',
  component: Frame,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Fill properties control the background appearance of frames including solid colors, gradients, and images.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type FillStory = StoryObj<FillArgs>;

export const Fill: FillStory = {
  args: {
    children: 'Fill Demo',
    appearance: { radius: 8 },
    // Fill controls
    fillType: 'solid',
    fillOpacity: 0.9,
    // Solid defaults
    solidColorType: 'theme',
    solidColorHex: '#3B82F6',
    solidColorTheme: 'white',
    solidColorShade: 2,
    solidColorOpacity: 0.9,
    // Gradient defaults
    gradientType: 'linear',
    gradientAngle: 45,
    gradientStop1ColorType: 'theme',
    gradientStop1ColorHex: '#3B82F6',
    gradientStop1ColorTheme: 'primary',
    gradientStop1ColorShade: 6,
    gradientStop1Position: 0,
    gradientStop2ColorType: 'theme',
    gradientStop2ColorHex: '#8B5CF6',
    gradientStop2ColorTheme: 'accent',
    gradientStop2ColorShade: 6,
    gradientStop2Position: 0.5,
    gradientStop3ColorType: 'theme',
    gradientStop3ColorHex: '#EF4444',
    gradientStop3ColorTheme: 'error',
    gradientStop3ColorShade: 6,
    gradientStop3Position: 1,
    // Image defaults
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    imageScaleMode: 'fill'
  },
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Frame content'
    },
    fillType: {
      control: { type: 'select' },
      options: ['none', 'solid', 'linear-gradient', 'radial-gradient', 'conic-gradient', 'image'],
      description: 'Type of fill to apply',
      table: { category: 'Fill Type' }
    },
    fillOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Overall fill opacity (0-1)',
      table: { category: 'Fill Type' }
    },
    // Solid fill controls
    solidColorType: {
      control: { type: 'select' },
      options: ['hex', 'theme'],
      description: 'Color input type (hex code or theme color)',
      table: { category: 'Solid Fill' },
      if: { arg: 'fillType', eq: 'solid' }
    },
    solidColorHex: {
      control: { type: 'color' },
      description: 'Hex color code',
      table: { category: 'Solid Fill' },
      if: { arg: 'solidColorType', eq: 'hex' }
    },
    solidColorTheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'Theme color name',
      table: { category: 'Solid Fill' },
      if: { arg: 'solidColorType', eq: 'theme' }
    },
    solidColorShade: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      description: 'Theme color shade',
      table: { category: 'Solid Fill' },
      if: { arg: 'solidColorType', eq: 'theme' }
    },
    solidColorOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Color opacity (0-1)',
      table: { category: 'Solid Fill' },
      if: { arg: 'fillType', eq: 'solid' }
    },
    // Gradient controls
    gradientAngle: {
      control: { type: 'range', min: 0, max: 360, step: 5 },
      description: 'Gradient angle in degrees',
      table: { category: 'Gradient Fill' }
    },
    // Gradient stop 1 controls
    gradientStop1ColorType: {
      control: { type: 'select' },
      options: ['hex', 'theme'],
      description: 'First stop color type',
      table: { category: 'Gradient Stop 1' }
    },
    gradientStop1ColorHex: {
      control: { type: 'color' },
      description: 'First gradient stop hex color',
      table: { category: 'Gradient Stop 1' },
      if: { arg: 'gradientStop1ColorType', eq: 'hex' }
    },
    gradientStop1ColorTheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'First gradient stop theme color',
      table: { category: 'Gradient Stop 1' },
      if: { arg: 'gradientStop1ColorType', eq: 'theme' }
    },
    gradientStop1ColorShade: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      description: 'First gradient stop color shade',
      table: { category: 'Gradient Stop 1' },
      if: { arg: 'gradientStop1ColorType', eq: 'theme' }
    },
    gradientStop1Position: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'First gradient stop position (0-1)',
      table: { category: 'Gradient Stop 1' }
    },
    // Gradient stop 2 controls
    gradientStop2ColorType: {
      control: { type: 'select' },
      options: ['hex', 'theme'],
      description: 'Second stop color type',
      table: { category: 'Gradient Stop 2' }
    },
    gradientStop2ColorHex: {
      control: { type: 'color' },
      description: 'Second gradient stop hex color',
      table: { category: 'Gradient Stop 2' },
      if: { arg: 'gradientStop2ColorType', eq: 'hex' }
    },
    gradientStop2ColorTheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'Second gradient stop theme color',
      table: { category: 'Gradient Stop 2' },
      if: { arg: 'gradientStop2ColorType', eq: 'theme' }
    },
    gradientStop2ColorShade: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      description: 'Second gradient stop color shade',
      table: { category: 'Gradient Stop 2' },
      if: { arg: 'gradientStop2ColorType', eq: 'theme' }
    },
    gradientStop2Position: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Second gradient stop position (0-1)',
      table: { category: 'Gradient Stop 2' }
    },
    // Gradient stop 3 controls
    gradientStop3ColorType: {
      control: { type: 'select' },
      options: ['hex', 'theme'],
      description: 'Third stop color type',
      table: { category: 'Gradient Stop 3' }
    },
    gradientStop3ColorHex: {
      control: { type: 'color' },
      description: 'Third gradient stop hex color',
      table: { category: 'Gradient Stop 3' },
      if: { arg: 'gradientStop3ColorType', eq: 'hex' }
    },
    gradientStop3ColorTheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'Third gradient stop theme color',
      table: { category: 'Gradient Stop 3' },
      if: { arg: 'gradientStop3ColorType', eq: 'theme' }
    },
    gradientStop3ColorShade: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      description: 'Third gradient stop color shade',
      table: { category: 'Gradient Stop 3' },
      if: { arg: 'gradientStop3ColorType', eq: 'theme' }
    },
    gradientStop3Position: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Third gradient stop position (0-1)',
      table: { category: 'Gradient Stop 3' }
    },
    // Image controls
    imageUrl: {
      control: { type: 'text' },
      description: 'Image URL for background fill',
      table: { category: 'Image Fill' },
      if: { arg: 'fillType', eq: 'image' }
    },
    imageScaleMode: {
      control: { type: 'select' },
      options: ['fill', 'fit', 'crop', 'tile'],
      description: 'How the image should scale within the frame',
      table: { category: 'Image Fill' },
      if: { arg: 'fillType', eq: 'image' }
    },
    // Hide other controls to focus on fills
    position: { control: false },
    autoLayout: { control: false },
    fill: { control: false },
    stroke: { control: false },
    appearance: { control: false },
    onClick: { control: false },
    onMouseEnter: { control: false },
    onMouseLeave: { control: false }
  },
  render: (args: FillArgs) => {
    // Helper function to resolve color based on type
    const resolveColor = (colorType: 'hex' | 'theme', hexColor: string, themeColor: string, shade: number, opacity: number = 1) => {
      if (colorType === 'hex') {
        return opacity < 1 ? hexColor + Math.round(opacity * 255).toString(16).padStart(2, '0') : hexColor;
      } else {
        // Use the new 1-12 naming system: 'primary6', 'success3', etc.
        return `${themeColor}${shade}`;
      }
    };

    // Build fill object based on type
    let fillProps: any = undefined;
    
    switch (args.fillType) {
      case 'none':
        fillProps = undefined;
        break;
      case 'solid':
        fillProps = {
          type: 'solid',
          color: resolveColor(args.solidColorType, args.solidColorHex, args.solidColorTheme, args.solidColorShade, args.solidColorOpacity),
          ...(args.fillOpacity < 1 && { opacity: args.fillOpacity })
        };
        break;
      case 'linear-gradient':
      case 'radial-gradient':
      case 'conic-gradient':
        fillProps = {
          type: args.fillType,
          angle: args.gradientAngle,
          stops: [
            { 
              color: resolveColor(args.gradientStop1ColorType, args.gradientStop1ColorHex, args.gradientStop1ColorTheme, args.gradientStop1ColorShade), 
              position: args.gradientStop1Position 
            },
            { 
              color: resolveColor(args.gradientStop2ColorType, args.gradientStop2ColorHex, args.gradientStop2ColorTheme, args.gradientStop2ColorShade), 
              position: args.gradientStop2Position 
            },
            { 
              color: resolveColor(args.gradientStop3ColorType, args.gradientStop3ColorHex, args.gradientStop3ColorTheme, args.gradientStop3ColorShade), 
              position: args.gradientStop3Position 
            }
          ],
          ...(args.fillOpacity < 1 && { opacity: args.fillOpacity })
        };
        break;
      case 'image':
        fillProps = {
          type: 'image',
          image: {
            url: args.imageUrl,
            scaleMode: args.imageScaleMode
          },
          ...(args.fillOpacity < 1 && { opacity: args.fillOpacity })
        };
        break;
    }

    const isLightFill = args.fillType === 'solid' && (
      (args.solidColorType === 'hex' && (args.solidColorHex === '#FFFFFF' || args.solidColorHex === '#ffffff' || args.solidColorHex.toLowerCase().includes('white'))) ||
      (args.solidColorType === 'theme' && (args.solidColorTheme === 'neutral' && args.solidColorShade <= 3) || args.solidColorTheme === 'secondary')
    );
    const hasNoFill = args.fillType === 'none';

    return (

        <Frame
          fill={fillProps}
          stroke={{ type: 'solid', color: 'white4', weight: 1, opacity: 0 }}
          appearance={args.appearance}
          autoLayout={{
            flow: 'vertical',
            alignment: 'center',
            gap: 16,
            padding: 24,
            width: 280,
            height: 200
          }}
        >
          <Frame
fill={{type: 'none'}}
            typography={{
              type: 'h3',
              color: 'gray5',
              wrap: 'nowrap',
              textAlign: 'center'
            }}
          >
            Title Frame
          </Frame>

          <Frame
            typography={{
              type: 'h6',
              color: hasNoFill || isLightFill ? 'gray7' : 'neutral2',
              wrap: 'nowrap',
              textAlign: 'center'
            }}
          >
            Fill: {args.fillType.charAt(0).toUpperCase() + args.fillType.slice(1)}
            {(args.fillType === 'linear-gradient' || args.fillType === 'radial-gradient' || args.fillType === 'conic-gradient') && ` (${args.gradientAngle}°)`}
            {args.fillType === 'image' && ` (${args.imageScaleMode})`}
          </Frame>
        </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive fill controls - experiment with different fill types including none, solid colors, gradients (linear, radial, conic), and images with comprehensive styling options.'
      }
    },
    controls: {
      exclude: ['position', 'autoLayout', 'size', 'fill', 'stroke', 'appearance', 'className', 'style', 'onClick', 'onMouseEnter', 'onMouseLeave']
    }
  }
};

export const MultipleFills: FillStory = {
  name: 'Multiple Fills',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 20 }}>
      {/* Example from user: Two gradients layered */}
      <Frame
        id='frame-multiple-fills-1'
        autoLayout={{
          flow: 'grid',
          grid: { columns: 2, rows: 2, columnGap: 10, rowGap: 10 },
          width: 222,
          height: 138,
          alignment: 'center'
        }}
        fill={[
          {
            type: 'linear-gradient',
            opacity: 0.79,
            angle: 356.1,
            stops: [
              { color: '#ca2b2b', position: 0 },
              { color: '#999999', position: 1 }
            ]
          },
          {
            type: 'linear-gradient',
            opacity: 0.2,
            angle: 270,
            stops: [
              { color: '#000000', position: 0 },
              { color: '#3deb51', position: 1 }
            ]
          }
        ]}
        stroke={{ left: { type: 'solid', color: '#000000', weight: 1 }, position: 'inside' }}
        appearance={{ radius: 0 }}
      >
        <div style={{ color: '#fff', fontSize: 14, textAlign: 'center', fontWeight: 600 }}>
          Two Gradients<br />Layered
        </div>
      </Frame>

      {/* Solid + Gradient overlay */}
      <Frame
        autoLayout={{ width: 200, height: 150, alignment: 'center' }}
        fill={[
          {
            type: 'solid',
            color: 'primary6',
            opacity: 1
          },
          {
            type: 'linear-gradient',
            opacity: 0.5,
            angle: 135,
            stops: [
              { color: '#ffffff', position: 0 },
              { color: 'transparent', position: 1 }
            ]
          }
        ]}
        appearance={{ radius: 12 }}
      >
        <div style={{ color: '#fff', fontSize: 14, textAlign: 'center', fontWeight: 600 }}>
          Solid + Gradient<br />Overlay
        </div>
      </Frame>

      {/* Three gradients */}
      <Frame
        autoLayout={{ width: 200, height: 150, alignment: 'center' }}
        fill={[
          {
            type: 'linear-gradient',
            opacity: 0.8,
            angle: 0,
            stops: [
              { color: 'primary6', position: 0 },
              { color: 'accent6', position: 1 }
            ]
          },
          {
            type: 'radial-gradient',
            opacity: 0.3,
            stops: [
              { color: '#ffffff', position: 0 },
              { color: 'transparent', position: 1 }
            ]
          },
          {
            type: 'linear-gradient',
            opacity: 0.2,
            angle: 90,
            stops: [
              { color: 'error6', position: 0 },
              { color: 'warning6', position: 1 }
            ]
          }
        ]}
        appearance={{ radius: 12 }}
      >
        <div style={{ color: '#fff', fontSize: 14, textAlign: 'center', fontWeight: 600 }}>
          Three Gradients<br />Mixed Types
        </div>
      </Frame>

      {/* Multiple solids for color mixing */}
      <Frame
        autoLayout={{ width: 200, height: 150, alignment: 'center' }}
        fill={[
          {
            type: 'solid',
            color: 'success6',
            opacity: 1
          },
          {
            type: 'solid',
            color: '#000000',
            opacity: 0.3
          },
          {
            type: 'solid',
            color: '#ffffff',
            opacity: 0.1
          }
        ]}
        appearance={{ radius: 12 }}
      >
        <div style={{ color: '#fff', fontSize: 14, textAlign: 'center', fontWeight: 600 }}>
          Multiple Solids<br />Color Mixing
        </div>
      </Frame>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates multiple fills (gradients, solids) stacked together, similar to Figma\'s multiple fill feature. Fills are layered with the first being on top.'
      }
    }
  }
};

export const ReactElementFill: FillStory = {
  name: 'React Element as Fill',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 20, alignItems: 'center' }}>
      {/* Using NoiirBk logo as fill with src prop */}
      <Frame
        autoLayout={{ width: 200, height: 200, alignment: 'center' }}
        fill={{
          type: 'image',
          image: {
            src: <NoiirBk />,
            scaleMode: 'fit'
          },
          color: 'neutral10'
        }}
        appearance={{ radius: 12 }}
        stroke={{ type: 'solid', color: 'neutral4', weight: 2 }}
      >
        <div style={{ 
          position: 'relative',
          zIndex: 1,
          bottom: -70,
          textAlign: 'center',
          color: '#000', 
          fontSize: 12, 
          fontWeight: 600,
          background: 'rgba(255,255,255,0.8)',
          padding: '4px 8px',
          borderRadius: 4
        }}>
          src: {'{<NoiirBk />}'}
        </div>
      </Frame>

      {/* Using NoiirOutlineBk logo as fill with element prop */}
      <Frame
        autoLayout={{ width: 200, height: 200, alignment: 'center' }}
        fill={{
          type: 'image',
          image: {
            element: <NoiirOutlineBk />,
            scaleMode: 'fit'
          },
          color: 'primary6'
        }}
        appearance={{ radius: 12 }}
        stroke={{ type: 'solid', color: 'primary6', weight: 2 }}
      >
        <div style={{ 
          position: 'relative',
          zIndex: 1,
          bottom: -70,
          textAlign: 'center',
          color: '#000', 
          fontSize: 12, 
          fontWeight: 600,
          background: 'rgba(255,255,255,0.8)',
          padding: '4px 8px',
          borderRadius: 4
        }}>
          element: {'{<NoiirOutlineBk />}'}
        </div>
      </Frame>

      {/* Using Group 26 PNG as fill with imported asset */}
      <Frame
        autoLayout={{ width: 200, height: 200, alignment: 'center' }}
        fill={[{
          type: 'image',
          image: {
            src: Group26,
            scaleMode: 'fill'
          }
        }, {type: 'solid', color: 'green10'}]}
        appearance={{ radius: 12 }}
        stroke={{ type: 'solid', color: 'neutral4', weight: 2 }}
      >
      
          Group 26 PNG (imported)

      </Frame>

      {/* Using external PNG URL as fill */}
      <Frame
        autoLayout={{ width: 200, height: 200, alignment: 'center' }}
        fill={{
          type: 'image',
          image: {
            src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
            scaleMode: 'fill'
          }
        }}
        appearance={{ radius: 12 }}
        stroke={{ type: 'solid', color: 'accent6', weight: 2 }}
      >
        <div style={{ 
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          textAlign: 'center',
          color: '#fff', 
          fontSize: 12, 
          fontWeight: 600,
          background: 'rgba(0,0,0,0.5)',
          padding: '4px 8px',
          borderRadius: 4
        }}>
          External PNG
        </div>
      </Frame>

      {/* Image fill with opacity - children should remain fully opaque */}
      <Frame
        autoLayout={{ width: 200, height: 200, alignment: 'center' }}
        fill={{
          type: 'image',
          image: {
            src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
            scaleMode: 'fill'
          },
          opacity: 0.4
        }}
        appearance={{ radius: 12 }}
        stroke={{ type: 'solid', color: 'warning6', weight: 2 }}
      >
        <Frame
          autoLayout={{ width: 150, height: 80, alignment: 'center' }}
          fill={{ type: 'solid', color: 'primary6' }}
          appearance={{ radius: 8 }}
        >
          <div style={{ 
            color: '#fff', 
            fontSize: 14, 
            fontWeight: 600,
            textAlign: 'center'
          }}>
            Child Frame<br />
            (Fully Opaque)
          </div>
        </Frame>
        <div style={{ 
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          textAlign: 'center',
          color: '#000', 
          fontSize: 12, 
          fontWeight: 600,
          background: 'rgba(255,255,255,0.9)',
          padding: '4px 8px',
          borderRadius: 4
        }}>
          Image opacity: 0.4<br />
          Children unaffected
        </div>
      </Frame>

      {/* Colored icon with gradient background */}
      <Frame
        autoLayout={{ width: 200, height: 200, alignment: 'center', padding: 20 }}
        fill={{
          type: 'linear-gradient',
          angle: 135,
          stops: [
            { color: 'primary6', position: 0 },
            { color: 'accent6', position: 1 }
          ]
        }}
        appearance={{ radius: 12 }}
      >
        <div style={{ color: '#fff', fontSize: 80 }}>
          <NoiirBk />
        </div>
        <div style={{ 
          marginTop: 10,
          textAlign: 'center',
          color: '#fff', 
          fontSize: 12, 
          fontWeight: 600
        }}>
          Icon on Gradient
        </div>
      </Frame>

      {/* Multiple sizes demonstration */}
      <Frame
        autoLayout={{ 
          flow: 'horizontal',
          gap: 16,
          padding: 24,
          alignment: 'center'
        }}
        fill={{ type: 'solid', color: 'neutral2' }}
        appearance={{ radius: 12 }}
      >
        <Frame autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}
          fill={{ type: 'solid', color: 'error7' }}>
          <NoiirBk />
        </Frame>

        <div style={{ color: 'accent6', fontSize: 48 }}>
          <NoiirBk />
        </div>
        <div style={{ color: 'success6', fontSize: 64 }}>
          <NoiirBk />
        </div>
        <div style={{ color: 'error6', fontSize: 80 }}>
          <NoiirBk />
        </div>
      </Frame>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates using React elements (like SVG components) as the image src. In this example, we use the NoiirBk and NoiirOutlineBk logo components. Note: React elements in fill.image.src currently render as children since CSS background-image cannot use React elements directly.'
      }
    }
  }
};