import type { Meta, StoryObj } from '@storybook/react';
import { Frame } from '../../Frame';

const meta: Meta<typeof Frame> = {
  title: 'Frame/Properties/Animation',
  component: Frame,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Animation properties for Frame components. Demonstrates hover, click, and clickHold behaviors.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Frame>;

export const AllAnimations: Story = {
  render: () => {
    return (<Frame autoLayout={{ flow: 'vertical', gap: 20 }}>
      <Frame
        children="Hover me!"
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 200, height: 120 }}
        appearance={{ radius: 8 }}
        variant="default"
        cursor={'pointer'}
        variants={{
          default: {
            animate: { hover: { variant: 'hover' } },
            fill: { type: 'solid', color: 'gray1' },
            stroke: { type: 'solid', color: 'gray5' },
            typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' }
          },
          hover: {
            fill: { type: 'solid', color: 'gray2' },
            stroke: { type: 'solid', color: 'black4' },
            typography: { color: 'white1', textAlign: 'center' }
          }
        }} />
      <Frame
        children="Click me (explicit animate)!"
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 200, height: 120 }}
        appearance={{ radius: 8 }}
        variant="primary"
        animate={{ click: { variant: 'active' } }}
        cursor={'pointer'}
        variants={{
          primary: {
            fill: { type: 'solid', color: 'gray4' },
            stroke: { type: 'solid', color: 'gray5' },
            typography: { color: 'white1', fontSize: 16, fontWeight: 400, textAlign: 'center' }
          },
          active: {
            fill: { type: 'solid', color: 'red' },
            stroke: { type: 'solid', color: 'red5' },
            typography: { color: 'white', fontSize: 16, fontWeight: 400, textAlign: 'center' }
          }
        }} />
      <Frame
        children="Click me to toggle!"
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 200, height: 120 }}
        appearance={{ radius: 8 }}
        variant="default"
        animate={{ click: { variant: 'clicked' } }}
        variants={{
          default: {
            fill: { type: 'solid', color: 'gray5' },
            stroke: { type: 'solid', color: 'gray5' },
            typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' }
          },
          clicked: {
            fill: { type: 'solid', color: '#ffffff' },
            stroke: { type: 'solid', color: '#ffffff' },
            typography: { color: 'black5' },
            cursor: 'pointer'
          }
        }} />
      <Frame
        children="Hold click!"
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 200, height: 120 }}
        appearance={{ radius: 8 }}
        variant="default"
        animate={{ clickHold: { variant: 'pressed' } }}
        variants={{
          default: {
            fill: { type: 'solid', color: 'gray1' },
            stroke: { type: 'solid', color: 'gray5' },
            typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' }
          },
          pressed: {
            fill: { type: 'solid', color: 'red' },
            stroke: { type: 'solid', color: 'pink' },
            typography: { color: 'white' }
          }
        }} />
      <Frame
        children="Hover, Click, or Hold!"
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 200, height: 120 }}
        appearance={{ radius: 8 }}
        variant="default"
        animate={{
          hover: { variant: 'hover' },
          click: { variant: 'clicked' },
          clickHold: { variant: 'pressed' }
        }}
        variants={{
          default: {
            fill: { type: 'solid', color: 'gray1' },
            stroke: { type: 'solid', color: 'gray5' },
            typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' }
          },
          hover: {
            fill: { type: 'solid', color: 'black7' },
            stroke: { type: 'solid', color: 'lightblue' },
            typography: { color: 'white1', textAlign: 'center' }
          },
          clicked: {
            fill: { type: 'solid', color: 'green' },
            stroke: { type: 'solid', color: 'lightgreen' },
            typography: { color: 'white', textAlign: 'center' }
          },
          pressed: {
            fill: { type: 'solid', color: 'red' },
            stroke: { type: 'solid', color: 'pink' },
            typography: { color: 'white', textAlign: 'center' }
          }
        }} />
      <Frame
        children="Smooth hover transition!"
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 200, height: 120 }}
        appearance={{ radius: 8 }}
        variant="default"
        animate={{ hover: { variant: 'hover', duration: '0.5s', curve: 'ease-in-out' } }}
        variants={{
          default: {
            fill: { type: 'solid', color: '#cccccc' },
            stroke: { type: 'solid', color: '#999999' },
            typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' }
          },
          hover: {
            fill: { type: 'solid', color: '#0000ff' },
            stroke: { type: 'solid', color: '#add8e6' },
            typography: { color: 'white', textAlign: 'center' }
          }
        }} />
      <Frame
        children="Linear transition"
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 200, height: 120 }}
        appearance={{ radius: 8 }}
        variant="default"
        animate={{ click: { variant: 'click', duration: '1s', curve: 'linear' } }}
        variants={{
          default: {
            fill: { type: 'solid', color: '#f0f0f0' },
            stroke: { type: 'solid', color: '#cccccc' },
            typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' }
          },
          click: {
            fill: { type: 'solid', color: '#ff6b6b' },
            stroke: { type: 'solid', color: '#ff5252' },
            typography: { color: 'white', textAlign: 'center' }
          }
        }} />
      <Frame
        children="Ease In (slow start)"
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 200, height: 120 }}
        appearance={{ radius: 8 }}
        variant="default"
        animate={{ click: { variant: 'click', duration: '1.2s', curve: 'ease-in' } }}
        variants={{
          default: {
            fill: { type: 'solid', color: '#e8f5e8' },
            stroke: { type: 'solid', color: '#c8e6c9' },
            typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' }
          },
          click: {
            fill: { type: 'solid', color: '#4caf50' },
            stroke: { type: 'solid', color: '#388e3c' },
            typography: { color: 'white', textAlign: 'center' }
          }
        }} />
      <Frame
        children="Ease Out (slow end)"
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 200, height: 120 }}
        appearance={{ radius: 8 }}
        variant="default"
        animate={{ click: { variant: 'click', duration: '1.2s', curve: 'ease-out' } }}
        variants={{
          default: {
            fill: { type: 'solid', color: '#fff3e0' },
            stroke: { type: 'solid', color: '#ffcc02' },
            typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' }
          },
          click: {
            fill: { type: 'solid', color: '#ff9800' },
            stroke: { type: 'solid', color: '#f57c00' },
            typography: { color: 'white', textAlign: 'center' }
          }
        }} />
      <Frame
        children="Custom Cubic Bezier"
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 200, height: 120 }}
        appearance={{ radius: 8 }}
        variant="default"
        animate={{ click: { variant: 'click', duration: '1.5s', curve: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' } }}
        variants={{
          default: {
            fill: { type: 'solid', color: '#f3e5f5' },
            stroke: { type: 'solid', color: '#ce93d8' },
            typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' }
          },
          click: {
            fill: { type: 'solid', color: '#9c27b0' },
            stroke: { type: 'solid', color: '#7b1fa2' },
            typography: { color: 'white', textAlign: 'center' }
          }
        }} />
      <Frame
        children="Bounce Effect"
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 200, height: 120 }}
        appearance={{ radius: 8 }}
        variant="default"
        animate={{ click: { variant: 'click', duration: '0.8s', curve: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' } }}
        variants={{
          default: {
            fill: { type: 'solid', color: '#fce4ec' },
            stroke: { type: 'solid', color: '#f8bbd9' },
            typography: { color: 'black12', fontSize: 16, fontWeight: 400, textAlign: 'center' }
          },
          click: {
            fill: { type: 'solid', color: '#e91e63' },
            stroke: { type: 'solid', color: '#c2185b' },
            typography: { color: 'white', textAlign: 'center' },
            appearance: { radius: 16 }
          }
        }} />
    </Frame>
    );
  }
};

export const PositionAnimations: Story = {
  render: () => (
    <Frame
      autoLayout={{ flow: 'vertical', gap: 20 }}
    >
      {/* Linear */}
      <Frame
        autoLayout={{ flow: 'freeform', width: 400, height: 80 }}
        fill={{ type: 'solid', color: '#f0f0f0' }}
        appearance={{ radius: 8 }}
        stroke={{ type: 'solid', color: '#cccccc' }}
      >
        <Frame
          variant="default"
          autoLayout={{ width: 50, height: 50 }}
          appearance={{ radius: 4 }}
          animate={{ click: { variant: 'moved', duration: '1s', curve: 'linear' } }}
          variants={{
            default: {
              fill: { type: 'solid', color: '#ff6b6b' },
              typography: { fontSize: 12, color: 'white1', textAlign: 'center' },
              position: { x: 0, y: 15 }
            },
            moved: {
              position: { x: 320, y: 15 }
            }
          }}
        >Click
        </Frame>
      </Frame>
      {/* Ease In */}
      <Frame
        autoLayout={{ flow: 'freeform', width: 400, height: 80 }}
        fill={{ type: 'solid', color: '#e8f5e8' }}
        
        appearance={{ radius: 8 }}
        stroke={{ type: 'solid', color: '#c8e6c9' }}
      >
        <Frame
          variant="default"
          autoLayout={{ width: 50, height: 50 }}
          appearance={{ radius: 4 }}
          animate={{ click: { variant: 'moved', duration: '1.2s', curve: 'ease-in' } }}
          variants={{
            default: {
              fill: { type: 'solid', color: '#4caf50' },
              typography: { fontSize: 12, color: 'white1', textAlign: 'center' },
              position: { x: 0, y: 15 }
            },
            moved: {
              position: { x: 320, y: 15 }
            }
          }}
        >Click</Frame>
      </Frame>
      {/* Ease Out */}
      <Frame
        autoLayout={{ flow: 'freeform', width: 400, height: 80 }}
        fill={{ type: 'solid', color: '#fff3e0' }}
        appearance={{ radius: 8 }}
        stroke={{ type: 'solid', color: '#ffcc02' }}
      >
        <Frame
          variant="default"
          autoLayout={{ width: 50, height: 50 }}
          appearance={{ radius: 4 }}
          animate={{ click: { variant: 'moved', duration: '1.2s', curve: 'ease-out' } }}
          variants={{
            default: {
              fill: { type: 'solid', color: '#ff9800' },
              typography: { fontSize: 12, color: 'white1', textAlign: 'center' },
              position: { x: 0, y: 15 }
            },
            moved: {
              position: { x: 320, y: 15 }
            }
          }}
        >Click</Frame>
      </Frame>
      {/* Ease In Out */}
      <Frame
        autoLayout={{ flow: 'freeform', width: 400, height: 80 }}
        fill={{ type: 'solid', color: '#e3f2fd' }}
        appearance={{ radius: 8 }}
        stroke={{ type: 'solid', color: '#bbdefb' }}
      >
        <Frame
          variant="default"
          autoLayout={{ width: 50, height: 50 }}
          appearance={{ radius: 4 }}
          animate={{ click: { variant: 'moved', duration: '1s', curve: 'ease-in-out' } }}
          variants={{
            default: {
              fill: { type: 'solid', color: '#2196f3' },
              typography: { fontSize: 12, color: 'white1', textAlign: 'center' },
              position: { x: 0, y: 15 }
            },
            moved: {
              position: { x: 320, y: 15 }
            }
          }}
        >Click</Frame>
      </Frame>
      {/* Cubic Bezier */}
      <Frame
        autoLayout={{ flow: 'freeform', width: 400, height: 80 }}
        fill={{ type: 'solid', color: '#f3e5f5' }}
        appearance={{ radius: 8 }}
        stroke={{ type: 'solid', color: '#ce93d8' }}
      >
        <Frame
          variant="default"
          autoLayout={{ width: 50, height: 50 }}
          appearance={{ radius: 4 }}
          animate={{ click: { variant: 'moved', duration: '1.5s', curve: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' } }}
          variants={{
            default: {
              fill: { type: 'solid', color: '#9c27b0' },
              typography: { fontSize: 12, color: 'white1', textAlign: 'center' },
              position: { x: 0, y: 15 }
            },
            moved: {
              position: { x: 320, y: 15 }
            }
          }}
        >Click</Frame>
      </Frame>
      {/* Bounce */}
      <Frame
        autoLayout={{ flow: 'freeform', width: 400, height: 80 }}
        fill={{ type: 'solid', color: '#fce4ec' }}
        appearance={{ radius: 8 }}
        stroke={{ type: 'solid', color: '#f8bbd9' }}
      >
        <Frame
          variant="default"
          autoLayout={{ width: 50, height: 50 }}
          appearance={{ radius: 4 }}
          animate={{ click: { variant: 'moved', duration: '0.8s', curve: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' } }}
          variants={{
            default: {
              fill: { type: 'solid', color: '#e91e63' },
              typography: { fontSize: 12, color: 'white1', textAlign: 'center' },
              position: { x: 0, y: 15 }
            },
            moved: {
              position: { x: 320, y: 15 }
            }
          }}
        >Click</Frame>
      </Frame>
    </Frame>
  )
};
