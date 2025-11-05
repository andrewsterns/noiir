import type { Meta, StoryObj } from '@storybook/react';
import { TestButton } from './test-button';
import { Button } from './src/components/atoms/button/button';
import { Frame } from './src/components/frame/Frame';
import { TransitionProvider } from './packages/frame-core/src/transition/transition';
import { TEST_BUTTON_V, TEST_FRAME_V } from './test-button.variants';

const meta: Meta<typeof TestButton> = {
  title: 'Test/Button Transitions',
  component: TestButton,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithTransitions: Story = {
  args: {
    transitions: [
      { event: 'click', targetId: 'button2', toVariant: 'state2' },
      { event: 'mouseEnter', toVariant: 'state3' },
      { event: 'mouseLeave', toVariant: 'state1' },
      { event: 'click', targetId: 'frame2', toVariant: 'state2' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates button transitions where clicking button1 changes button2 and two frames based on mouse enter/leave and click events. The mouse enter/leave events target button1 itself (self-targeting).',
      },
    },
  },
};

export const ToggleTransition: Story = {
  args: {
    transitions: [
      { event: 'click', targetId: 'button2', toggle: true, toggleVariants: ['state1', 'state2'] },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Click button1 to toggle button2 between state1 and state2.',
      },
    },
  },
};

export const CycleTransition: Story = {
  args: {
    transitions: [
      { event: 'click', targetId: 'button2', toggle: true, toggleVariants: ['state1', 'state2', 'state3', 'state4'] },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Click button1 to cycle button2 through state1, state2, state3, state4.',
      },
    },
  },
};

export const PositionTransition: Story = {
  args: {
    transitions: [
      { event: 'click', targetId: 'frame2', toggle: true, toggleVariants: ['state1', 'state2', 'state3'] },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Click button1 to change frame2 position and stroke.',
      },
    },
  },
};

export const AnimationTimingStory: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Hover over the button to animate 7 frames through different positions with smooth transitions.',
      },
    },
  },
  render: () => (
    <TransitionProvider>
      <div style={{ padding: '20px', position: 'relative', height: '500px' }}>
        <h2>7-Frame Position Animation</h2>
        <p>Hover over the button to cycle all frames through their position states.</p>
        
        <Button 
          id="animationTrigger"
          variant="state1" 
          variants={TEST_BUTTON_V}
          transitions={[
            { event: 'click', targetId: 'frame1', toVariant: 'positionState2', duration: '1.2s', curve: 'ease-in-out' },

          ]}
        >
          Animate All Frames
        </Button>

        <Frame
          autoLayout={{ flow: 'horizontal', gap: 36, wrap: 'nowrap', padding: 16, width: 800, height: 500 }}
        >
          <Frame
            id="frame1"
            variant="positionState1"
            variants={TEST_FRAME_V}
          >
            <Frame fill={{ type: 'solid', color: 'tomato4' }} autoLayout={{ flow:'horizontal', alignment: 'center', width: 30, height: 30 }}>1</Frame>
          </Frame>

      
        </Frame>
      </div>
    </TransitionProvider>
  ),
};
