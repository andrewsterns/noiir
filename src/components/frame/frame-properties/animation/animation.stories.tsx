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
      <Frame
        children="Array Animate: Hover + Click + Hotkey!"
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 200, height: 120 }}
        appearance={{ radius: 8 }}
        variant="multiAction"
        tabIndex={0}
        variants={{
          multiAction: {
            fill: { type: 'solid', color: 'purple5' },
            stroke: { type: 'solid', color: 'purple7' },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500, textAlign: 'center' },
            appearance: { radius: 8 },
            animate: [
              { type: 'hover', variant: 'multiHover', duration: '0.3s', curve: 'ease-in-out' },
              { type: 'click', variant: 'multiClick', duration: '0.5s', curve: 'ease-out' },
              { type: 'hotKey', key: 'space', variant: 'multiHotkey', duration: '0.8s', curve: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }
            ]
          },
          multiHover: {
            fill: { type: 'solid', color: 'green5' },
            stroke: { type: 'solid', color: 'green7' },
            typography: { color: 'white1', textAlign: 'center' },
            appearance: { radius: 12 }
          },
          multiClick: {
            fill: { type: 'solid', color: 'orange5' },
            stroke: { type: 'solid', color: 'orange7' },
            typography: { color: 'white1', textAlign: 'center' },
            appearance: { radius: 16 }
          },
          multiHotkey: {
            fill: { type: 'solid', color: 'red5' },
            stroke: { type: 'solid', color: 'red7' },
            typography: { color: 'white1', textAlign: 'center' },
            appearance: { radius: 20 }
          }
        }} />
      <Frame
        children="Array Animate: After Delay + Click"
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 200, height: 120 }}
        appearance={{ radius: 8 }}
        variant="delayed"
        variants={{
          delayed: {
            fill: { type: 'solid', color: 'blue5' },
            stroke: { type: 'solid', color: 'blue7' },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500, textAlign: 'center' },
            appearance: { radius: 8 },
            animate: [
              { type: 'afterDelay', delay: '2s', variant: 'autoPulse', duration: '1s', curve: 'ease-in-out' },
              { type: 'click', variant: 'manualPulse', duration: '0.5s', curve: 'ease-out' }
            ]
          },
          autoPulse: {
            fill: { type: 'solid', color: 'yellow5' },
            stroke: { type: 'solid', color: 'yellow7' },
            typography: { color: 'black12', textAlign: 'center' },
            appearance: { radius: 12 }
          },
          manualPulse: {
            fill: { type: 'solid', color: 'red5' },
            stroke: { type: 'solid', color: 'red7' },
            typography: { color: 'white1', textAlign: 'center' },
            appearance: { radius: 16 }
          }
        }} />
    </Frame>
    );
  }
};

export const MultipleActions: Story = {
  render: () => {
    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 20, alignment: 'center' }}>
        <Frame
          children="Multiple Actions Demo - Hover, Click, or Press 'A'!"
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 300, height: 60 }}
          appearance={{ radius: 8 }}
          variant="starting"
          tabIndex={0} // Make focusable for keyboard events
          variants={{
            starting: {
              fill: { type: 'solid', color: 'blue5' },
              stroke: { type: 'solid', color: 'blue7' },
              typography: { color: 'white1', fontSize: 14, fontWeight: 500, textAlign: 'center' },
              appearance: { radius: 8 },
              animate: [
                { type: 'hover', variant: 'hoverState', duration: '0.3s', curve: 'ease-in-out' },
                { type: 'click', variant: 'clickState', duration: '0.5s', curve: 'ease-out' },
                { type: 'hotKey', key: 'a', variant: 'hotkeyState', duration: '1s', curve: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }
              ]
            },
            hoverState: {
              fill: { type: 'solid', color: 'green5' },
              stroke: { type: 'solid', color: 'green7' },
              typography: { color: 'white1', fontSize: 14, fontWeight: 500, textAlign: 'center' },
              appearance: { radius: 12 },
              effects: {
                dropShadow: [{ x: 0, y: 4, blur: 12, color: 'rgba(0, 255, 0, 0.3)' }]
              }
            },
            clickState: {
              fill: { type: 'solid', color: 'orange5' },
              stroke: { type: 'solid', color: 'orange7' },
              typography: { color: 'white1', fontSize: 14, fontWeight: 500, textAlign: 'center' },
              appearance: { radius: 16 },
              effects: {
                dropShadow: [{ x: 0, y: 6, blur: 16, color: 'rgba(255, 165, 0, 0.4)' }]
              }
            },
            hotkeyState: {
              fill: { type: 'solid', color: 'purple5' },
              stroke: { type: 'solid', color: 'purple7' },
              typography: { color: 'white1', fontSize: 14, fontWeight: 500, textAlign: 'center' },
              appearance: { radius: 20 },
              effects: {
                dropShadow: [{ x: 0, y: 8, blur: 20, color: 'rgba(128, 0, 128, 0.5)' }]
              }
            }
          }} />

        <Frame
          children="Instructions: Hover over the box above, click it, or press 'A' key while focused"
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 400, height: 40 }}
          appearance={{ radius: 4 }}
          fill={{ type: 'solid', color: 'gray2' }}
          typography={{ color: 'black12', fontSize: 12, textAlign: 'center' }} />
      </Frame>
    );
  }
};

export const MultiAnimation: Story = {
  render: () => {
    const VARIANT_LIBRARY = {
      startingVariant: {
        fill: { type: 'solid' as const, color: 'blue5' },
        stroke: { type: 'solid' as const, color: 'blue7' },
        typography: { color: 'white1', fontSize: 14, fontWeight: 500, textAlign: 'center' as const },
        appearance: { radius: 8 },
        animate: [
          { type: 'click', id: 'frame2', variant: 'destinationVariant', duration: '1s' },
          { type: 'hover', variant: 'otherVariant', duration: '0.5s' },
          { type: 'hotKey', id: 'frame2', key: 'a', variant: 'destinationVariant', duration: '3s' }
        ]
      },
      destinationVariant: {
        fill: { type: 'solid' as const, color: 'red5' },
        stroke: { type: 'solid' as const, color: 'red7' },
        typography: { color: 'white1', textAlign: 'center' as const },
        appearance: { radius: 12 }
      },
      otherVariant: {
        fill: { type: 'solid' as const, color: 'green5' },
        stroke: { type: 'solid' as const, color: 'green7' },
        typography: { color: 'white1', textAlign: 'center' as const },
        appearance: { radius: 16 }
      }
    };

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 20, alignment: 'center' }}>
        <Frame
          children="Cross-Frame Animation Demo"
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 400, height: 40 }}
          appearance={{ radius: 4 }}
          fill={{ type: 'solid', color: 'gray2' }}
          typography={{ color: 'black12', fontSize: 16, fontWeight: 600, textAlign: 'center' }} />

        <Frame autoLayout={{ flow: 'horizontal', gap: 20, alignment: 'center' }}>
          <Frame
            id="frame1"
            children="Frame 1 - Click me!"
            autoLayout={{ flow: 'horizontal', alignment: 'center', width: 150, height: 100 }}
            appearance={{ radius: 8 }}
            variant="startingVariant"
            variants={VARIANT_LIBRARY}
            cursor="pointer"
            tabIndex={0} />

          <Frame
            id="frame2"
            children="Frame 2 - Watch me!"
            autoLayout={{ flow: 'horizontal', alignment: 'center', width: 150, height: 100 }}
            appearance={{ radius: 8 }}
            variant="startingVariant"
            variants={VARIANT_LIBRARY}
            cursor="pointer"
            tabIndex={0} />
        </Frame>

        <Frame
          children="Instructions: Click Frame 1 to animate Frame 2, hover Frame 1 for its own animation, or press 'A' while focused on Frame 1 to animate Frame 2"
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 500, height: 60 }}
          appearance={{ radius: 4 }}
          fill={{ type: 'solid', color: 'gray1' }}
          typography={{ color: 'black12', fontSize: 12, textAlign: 'center' }} />
      </Frame>
    );
  }
};

