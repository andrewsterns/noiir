import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Frame } from '../../../../__components__/frame/Frame';
import { Text } from '@components/index';
import { AnimateProvider, Animate, AnimateDSL } from '../../../../__frame-core__/animate/animate.props';

/**
 * Animate Stories - New DSL Format
 * 
 * Demonstrates the new object-based DSL for the Animate system.
 * This format is more declarative and Figma-like, using triggers as keys.
 * 
 * Key concepts:
 * - DSL Format: { onHover: 'id.variant' } or { onClick: { toVariant: 'id.variant', ... } }
 * - Shorthand: 'id.variant' parses to targetId + variantName
 * - Cross-Frame: Target different Frames easily
 * - Time-based: afterDelay for auto-animations
 * - Conditional: fromVariant for state-dependent actions
 * 
 * All examples use the new DSL format, parsed internally to FrameAnimation[].
 */

const meta: Meta = {
  title: 'Frame/Properties/animate',
  component: Frame,
  decorators: [
    (Story) => (
      <AnimateProvider>
        <Story />
      </AnimateProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Basic Click Toggle - DSL Format
 * Click the box to toggle between two variants using shorthand
 */
export const ClickToggle: Story = {
  render: () => {
    const animation1: AnimateDSL[] = [
      { onClick: { toggleVariant: ['box1.blue', 'box1.red'], duration: '0.3s', curve: 'ease' } },
    ];
    const animation2: AnimateDSL[] = [
      { onClick: { toggleVariant: ['blue', 'red'], duration: '0.3s', curve: 'ease' } },
    ];

    return (
      <Frame autoLayout={{ flow: 'horizontal', gap: 16 }}>
      <Frame
        id="box1"
        variant="blue"
        variants={{
          blue: {
            fill: { type: 'solid', color: 'blue5' },
            autoLayout: { flow: 'vertical', alignment: 'center', width: 150, height: 150 },
            appearance: { radius: 8 },
          },
          red: {
            fill: { type: 'solid', color: 'red5' },
            autoLayout: { flow: 'vertical', alignment: 'center', width: 150, height: 150 },
            appearance: { radius: 8 },
          },
        }}
        animate={animation1 as Animate}
      >I'm the first box! <Text>(id: box1)</Text></Frame>
       <Frame
        id="box1"
        variant="blue"
        variants={{
          blue: {
            fill: { type: 'solid', color: 'blue5' },
            autoLayout: { flow: 'vertical', alignment: 'center', width: 150, height: 150 },
            appearance: { radius: 8 },
          },
          red: {
            fill: { type: 'solid', color: 'red5' },
            autoLayout: { flow: 'vertical', alignment: 'center', width: 150, height: 150 },
            appearance: { radius: 8 },
          },
        }}
      >I react to the first!<Text>(id: box1)</Text></Frame>
      <Frame
        id="box2"
        variant="blue"
        variants={{
          blue: {
            fill: { type: 'solid', color: 'blue5' },
            autoLayout: { flow: 'vertical', alignment: 'center', width: 180, height: 150 },
            appearance: { radius: 8 },
          },
          red: {
            fill: { type: 'solid', color: 'success5' },
            autoLayout: { flow: 'vertical', alignment: 'center', width: 180, height: 150 },
            appearance: { radius: 8 },
          },
        }}
        animate={animation2 as Animate}
      >I am box 2. I do my own thing!<Text>(id: box2)</Text></Frame>
      </Frame>
    );
  },
};

/**
 * Hover Animate - DSL Format
 * Hover over the boxes to see them change color and revert on mouse leave
 * Tests multiple frames with same/different IDs
 */
export const HoverAnimate: Story = {
  render: () => {
    const animations: AnimateDSL[] = [
      { onHover: { fromVariant: 'default', toVariant: 'hovered', duration: '1.7s' } },
    ];

    return (
      <Frame autoLayout={{ flow: 'horizontal', gap: 16 }}>
        <Frame
          id="box2"
          variant="default"
          variants={{
            default: {
              fill: { type: 'solid', color: 'gray5' },
              autoLayout: { width: 150, height: 150 },
              appearance: { radius: 8 },
            },
            hovered: {
              fill: { type: 'solid', color: 'red5' },
              autoLayout: { width: 150, height: 150 },
              appearance: { radius: 8 },
            },
          }}
          animate={animations as Animate}
        >
          ID: box2
        </Frame>
        <Frame
          id="box2"
          variant="default"
          variants={{
            default: {
              fill: { type: 'solid', color: 'gray7' },
              autoLayout: { width: 150, height: 150 },
              appearance: { radius: 8 },
            },
            hovered: {
              fill: { type: 'solid', color: 'blue7' },
              autoLayout: { width: 150, height: 150 },
              appearance: { radius: 8 },
            },
          }}
        >
          ID: box2 (duplicate)
        </Frame>
        <Frame
          id="box3"
          variant="default"
          variants={{
            default: {
              fill: { type: 'solid', color: 'gray5' },
              autoLayout: { width: 150, height: 150 },
              appearance: { radius: 8 },
            },
            hovered: {
              fill: { type: 'solid', color: 'red5' },
              autoLayout: { width: 150, height: 150 },
              appearance: { radius: 8 },
            },
          }}
          animate={animations as Animate}
        >
          ID: box3
        </Frame>
      </Frame>
    );
  },
};

/**
 * MouseEnter/MouseLeave (Explicit) - DSL Format
 * Uses explicit mouseEnter and mouseLeave events with full options
 * Tests multiple frames with mouseEnter/mouseLeave animations
 */
export const MouseEnterLeave: Story = {
  render: () => {
    const animations: AnimateDSL[] = [
      { mouseEnter: { toVariant: 'active', duration: '0.2s', curve: 'ease-in' } },
      { mouseLeave: { toVariant: 'idle', duration: '0.2s', curve: 'ease-out' } },
    ];

    return (
      <Frame autoLayout={{ flow: 'horizontal', gap: 16 }}>
        <Frame
          id="box3a"
          variant="idle"
          variants={{
            idle: {
              fill: { type: 'solid', color: 'green5' },
              autoLayout: { width: 150, height: 150 },
              appearance: { radius: 8 },
              effects: { dropShadow: [{ x: 0, y: 2, blur: 4, color: 'rgba(0,0,0,0.1)' }] },
            },
            active: {
              fill: { type: 'solid', color: 'green7' },
              autoLayout: { width: 150, height: 150 },
              appearance: { radius: 8 },
              effects: { dropShadow: [{ x: 0, y: 4, blur: 12, color: 'rgba(0,0,0,0.2)' }] },
            },
          }}
          animate={animations as Animate}
        >
          mouseEnter/Leave
        </Frame>
        <Frame
          id="box3b"
          variant="idle"
          variants={{
            idle: {
              fill: { type: 'solid', color: 'blue5' },
              autoLayout: { width: 150, height: 150 },
              appearance: { radius: 8 },
              effects: { dropShadow: [{ x: 0, y: 2, blur: 4, color: 'rgba(0,0,0,0.1)' }] },
            },
            active: {
              fill: { type: 'solid', color: 'blue7' },
              autoLayout: { width: 150, height: 150 },
              appearance: { radius: 8 },
              effects: { dropShadow: [{ x: 0, y: 4, blur: 12, color: 'rgba(0,0,0,0.2)' }] },
            },
          }}
          animate={animations as Animate}
        >
          mouseEnter/Leave
        </Frame>
        <Frame
          id="box3c"
          variant="idle"
          variants={{
            idle: {
              fill: { type: 'solid', color: 'purple5' },
              autoLayout: { width: 150, height: 150 },
              appearance: { radius: 8 },
              effects: { dropShadow: [{ x: 0, y: 2, blur: 4, color: 'rgba(0,0,0,0.1)' }] },
            },
            active: {
              fill: { type: 'solid', color: 'purple7' },
              autoLayout: { width: 150, height: 150 },
              appearance: { radius: 8 },
              effects: { dropShadow: [{ x: 0, y: 4, blur: 12, color: 'rgba(0,0,0,0.2)' }] },
            },
          }}
          animate={animations as Animate}
        >
          mouseEnter/Leave
        </Frame>
      </Frame>
    );
  },
};

/**
 * Click with Hover
 * Click to toggle base state, hover for temporary visual feedback
 * Demonstrates how hover doesn't interfere with click state
 */
export const ClickWithHover: Story = {
  render: () => {
    const animations: AnimateDSL[] = [
      { onClick: { toggleVariant: ['off', 'on'], duration: '0.2s', curve: 'ease' } },
      { onHover: { fromVariant: 'off', toVariant: 'offHover', duration: '0.1s', curve: 'ease' } },
      { onHover: { fromVariant: 'on', toVariant: 'onHover', duration: '0.1s', curve: 'ease' } },
    ];

    return (
      <Frame
        id="box4"
        variant="off"
        variants={{
          off: {
            fill: { type: 'solid', color: 'gray5' },
            autoLayout: { width: 150, height: 150, alignment: 'center', gap: 8 },
            appearance: { radius: 8 },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
          },
          offHover: {
            fill: { type: 'solid', color: 'gray6' },
            autoLayout: { width: 150, height: 150, alignment: 'center', gap: 8 },
            appearance: { radius: 8 },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
          },
          on: {
            fill: { type: 'solid', color: 'blue5' },
            autoLayout: { width: 150, height: 150, alignment: 'center', gap: 8 },
            appearance: { radius: 8 },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
          },
          onHover: {
            fill: { type: 'solid', color: 'blue6' },
            autoLayout: { width: 150, height: 150, alignment: 'center', gap: 8 },
            appearance: { radius: 8 },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
          },
        }}
        animate={animations as Animate}
      >
        Click to toggle, hover for feedback
      </Frame>
    );
  },
};

/**
 * Listen Event (Cross-Frame Communication) - DSL Format
 * One frame listens to another frame's variant changes
 */
export const ListenEvent: Story = {
  render: () => {
    const controllerAnimations: AnimateDSL[] = [
      { onClick: { toggleVariant: ['inactive', 'active'], duration: '0.2s', curve: 'ease' }},
      { onClick: { toggleVariant: ['uniqueID.idle', 'uniqueID.active'], duration: '0.2s', curve: 'ease' } },
    ];
   

    return (
      <Frame
        autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}
      > 
        <Frame
          id="controller"
          variant="inactive"
          variants={{
            inactive: {
              fill: { type: 'solid', color: 'gray5' },
              autoLayout: { width: 150, height: 150, alignment: 'center' },
              appearance: { radius: 8 },
              typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
            },
            active: {
              fill: { type: 'solid', color: 'orange5' },
              autoLayout: { width: 150, height: 150, alignment: 'center' },
              appearance: { radius: 8 },
              typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
            },
          }}
          animate={controllerAnimations as Animate}
        >
          Controller (Click me)
        </Frame>

        <Frame
          id="uniqueID"
          variant="idle"
          variants={{
            idle: {
              fill: { type: 'solid', color: 'gray3' },
              autoLayout: { width: 150, height: 150, alignment: 'center' },
              appearance: { radius: 8 },
              typography: { color: 'gray8', fontSize: 14, fontWeight: 500 },
            },
            active: {
              fill: { type: 'solid', color: 'red5' },
              autoLayout: { width: 150, height: 150, alignment: 'center' },
              appearance: { radius: 8 },
              typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
            },
          }}
        >
          Listener (Responds)
        </Frame>
      </Frame>
    );
  },
};

export const MultiTarget: Story = {
  render: () => {
    const animations: AnimateDSL[] = [
      { onClick: { targetId: 'box1', toggleVariant: ['small', 'large'], duration: '0.3s', curve: 'ease-in-out' } },
      { onClick: { targetId: 'box2', toggleVariant: ['circle', 'square'], duration: '2s', curve: 'ease-in-out' } },
    ];

    console.log('[MultiTarget] Animations:', animations);

    return (
      <Frame
        autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}
      >
        <Frame
          id="button"
          as="button"
          variant="primary"
          variants={{
            primary: {
              fill: { type: 'solid', color: 'blue5' },
              autoLayout: { paddingHorizontal: 16, paddingVertical: 8 },
              appearance: { radius: 4 },
              typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
            },
          }}
          animate={animations as Animate}
        >
          Click to affect both boxes
        </Frame>

        <Frame autoLayout={{ flow: 'horizontal', gap: 16 }}>
          <Frame
            id="box1"
            variant="small"
            variants={{
              small: {
                fill: { type: 'solid', color: 'gray5' },
                autoLayout: { width: 80, height: 80 },
                appearance: { radius: 8 },
              },
              large: {
                fill: { type: 'solid', color: 'blue7' },
                autoLayout: { width: 120, height: 120 },
                appearance: { radius: 8 },
              },
            }}
            onClick={() => console.log('[box1] Clicked - should not trigger animation')}
          />

          <Frame
            id="box2"
            variant="circle"
            variants={{
              circle: {
                fill: { type: 'solid', color: 'gray5' },
                autoLayout: { width: 80, height: 80 },
                appearance: { radius: 40 },
              },
              square: {
                fill: { type: 'solid', color: 'blue7' },
                autoLayout: { width: 80, height: 80 },
                appearance: { radius: 4 },
              },
            }}
          />
        </Frame>
      </Frame>
    );
  },
};

/**
 * Sequential Toggle (3+ States)
 * Click to cycle through multiple variants
 */
export const SequentialToggle: Story = {
  render: () => {
    const animations: AnimateDSL[] = [
      { onClick: { toggleVariant: ['red', 'yellow', 'green'], duration: '0.3s', curve: 'ease' } },
    ];

    return (
      <Frame
        id="trafficLight"
        variant="red"
        variants={{
          red: {
            fill: { type: 'solid', color: 'red5' },
            autoLayout: { width: 150, height: 150, alignment: 'center' },
            appearance: { radius: 8 },
            typography: { color: 'white1', fontSize: 16, fontWeight: 600 },
          },
          yellow: {
            fill: { type: 'solid', color: 'yellow5' },
            autoLayout: { width: 150, height: 150, alignment: 'center' },
            appearance: { radius: 8 },
            typography: { color: 'gray9', fontSize: 16, fontWeight: 600 },
          },
          green: {
            fill: { type: 'solid', color: 'green5' },
            autoLayout: { width: 150, height: 150, alignment: 'center' },
            appearance: { radius: 8 },
            typography: { color: 'white1', fontSize: 16, fontWeight: 600 },
          },
        }}
        animate={animations as Animate}
      >
        Click to cycle
      </Frame>
    );
  },
};

/**
 * MouseDown and MouseUp
 * Different states for pressing and releasing
 */
export const MouseDownUp: Story = {
  render: () => {
    const animations: AnimateDSL[] = [
      { mouseDown: { fromVariant: 'idle', toVariant: 'pressed', duration: '0.1s', curve: 'ease-in' } },
      { mouseUp: { fromVariant: 'pressed', toVariant: 'idle', duration: '0.2s', curve: 'ease-out' } },
    ];

    return (
      <Frame
        id="pressable"
        variant="idle"
        variants={{
          idle: {
            fill: { type: 'solid', color: 'blue5' },
            autoLayout: { width: 150, height: 150, alignment: 'center' },
            appearance: { radius: 8 },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
            effects: { dropShadow: [{ x: 0, y: 4, blur: 8, color: 'rgba(0,0,0,0.2)' }] },
          },
          pressed: {
            fill: { type: 'solid', color: 'blue7' },
            autoLayout: { width: 150, height: 150, alignment: 'center' },
            appearance: { radius: 8 },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
            effects: { dropShadow: [{ x: 0, y: 1, blur: 2, color: 'rgba(0,0,0,0.3)' }] },
          },
        }}
        animate={animations as Animate}
      >
        Press me
      </Frame>
    );
  },
};

/**
 * Complex Interaction
 * Combines click toggle with hover feedback at each state
 */
export const ComplexInteraction: Story = {
  render: () => {
    const animations: AnimateDSL[] = [
      { onClick: { toggleVariant: ['stateA', 'stateB', 'stateC'], duration: '0.25s', curve: 'ease' } },
      { onHover: { fromVariant: 'stateA', toVariant: 'stateAHover', duration: '0.15s', curve: 'ease' } },
      { onHover: { fromVariant: 'stateAHover', toVariant: 'stateA', duration: '0.15s', curve: 'ease' } },
      { onHover: { fromVariant: 'stateB', toVariant: 'stateBHover', duration: '0.15s', curve: 'ease' } },
      { onHover: { fromVariant: 'stateBHover', toVariant: 'stateB', duration: '0.15s', curve: 'ease' } },
      { onHover: { fromVariant: 'stateC', toVariant: 'stateCHover', duration: '0.15s', curve: 'ease' } },
      { onHover: { fromVariant: 'stateCHover', toVariant: 'stateC', duration: '0.15s', curve: 'ease' } },
    ];

    return (
      <Frame
        id="complex"
        variant="stateA"
        variants={{
          stateA: {
            fill: { type: 'solid', color: 'red5' },
            autoLayout: { width: 180, height: 100, alignment: 'center' },
            appearance: { radius: 12 },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
          },
          stateAHover: {
            fill: { type: 'solid', color: 'red6' },
            autoLayout: { width: 180, height: 100, alignment: 'center' },
            appearance: { radius: 12 },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
            effects: { dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(255,0,0,0.3)' }] },
          },
          stateB: {
            fill: { type: 'solid', color: 'green5' },
            autoLayout: { width: 180, height: 100, alignment: 'center' },
            appearance: { radius: 12 },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
          },
          stateBHover: {
            fill: { type: 'solid', color: 'green6' },
            autoLayout: { width: 180, height: 100, alignment: 'center' },
            appearance: { radius: 12 },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
            effects: { dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0,255,0,0.3)' }] },
          },
          stateC: {
            fill: { type: 'solid', color: 'blue5' },
            autoLayout: { width: 180, height: 100, alignment: 'center' },
            appearance: { radius: 12 },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
          },
          stateCHover: {
            fill: { type: 'solid', color: 'blue6' },
            autoLayout: { width: 180, height: 100, alignment: 'center' },
            appearance: { radius: 12 },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
            effects: { dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0,0,255,0.3)' }] },
          },
        }}
        animate={animations as Animate}
      >
        Click to cycle • Hover for feedback
      </Frame>
    );
  },
};

/**
 * Conditional Animate (fromVariant)
 * Only animate when in a specific variant
 */
export const ConditionalAnimate: Story = {
  render: () => {
    const animations: AnimateDSL[] = [
      { onClick: { fromVariant: 'locked', toVariant: 'unlocked', duration: '0.3s', curve: 'ease' } },
      { onClick: { fromVariant: 'unlocked', toVariant: 'open', duration: '0.3s', curve: 'ease' } },
      { onClick: { fromVariant: 'open', toVariant: 'locked', duration: '0.3s', curve: 'ease' } },
    ];

    return (
      <Frame
        id="lock"
        variant="locked"
        variants={{
          locked: {
            fill: { type: 'solid', color: 'red5' },
            autoLayout: { width: 150, height: 150, alignment: 'center' },
            appearance: { radius: 8 },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500, textAlign: 'center' },
          },
          unlocked: {
            fill: { type: 'solid', color: 'yellow5' },
            autoLayout: { width: 150, height: 150, alignment: 'center' },
            appearance: { radius: 8 },
            typography: { color: 'gray9', fontSize: 14, fontWeight: 500, textAlign: 'center' },
          },
          open: {
            fill: { type: 'solid', color: 'green5' },
            autoLayout: { width: 150, height: 150, alignment: 'center' },
            appearance: { radius: 8 },
            typography: { color: 'white1', fontSize: 14, fontWeight: 500, textAlign: 'center' },
          },
        }}
        animate={animations as Animate}
      >
        🔒 Locked → 🔓 Unlocked → ✅ Open
      </Frame>
    );
  },
};

/**
 * Multi-Layered Hierarchical Targeting
 * Demonstrates targeting deeply nested Frames using dot-separated paths
 * Shows how to drill down through multiple levels of hierarchy
 */
export const MultiLayeredHierarchy: Story = {
  render: () => {
    const buttonAnimations: AnimateDSL[] = [
      { onClick: { toVariant: 'grandparent.parent.child.active', duration: '2.5s', curve: 'ease-in-out' } },
      { onClick: { toVariant: 'grandparent.parent2.child2.highlighted', duration: '1.3s', curve: 'ease' } },
    ];

    console.log('[MultiLayeredHierarchy] Button animations:', buttonAnimations);

    return (
      <AnimateProvider>
        <Frame autoLayout={{ flow: 'vertical', gap: 20, alignment: 'center' }}>
          <Frame
            id="button"
            as="button"
            variant="default"
            variants={{
              default: {
                fill: { type: 'solid', color: 'blue5' },
                autoLayout: { paddingHorizontal: 20, paddingVertical: 12 },
                appearance: { radius: 6 },
                typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
              },
            }}
            animate={buttonAnimations as Animate}
            onClick={() => {
              console.log('[MultiLayeredHierarchy] Button clicked!');
              console.log('[MultiLayeredHierarchy] Animations:', buttonAnimations);
            }}
          >
            Click to target nested Frames
          </Frame>

          {/* Simple test first */}
          <Frame autoLayout={{ flow: 'horizontal', gap: 20 }}>
            <Frame
              id="testButton"
              as="button"
              variant="default"
              variants={{
                default: {
                  fill: { type: 'solid', color: 'purple5' },
                  autoLayout: { paddingHorizontal: 16, paddingVertical: 8 },
                  appearance: { radius: 4 },
                  typography: { color: 'white1', fontSize: 12, fontWeight: 500 },
                },
                clicked: {
                  fill: { type: 'solid', color: 'purple7' },
                  autoLayout: { paddingHorizontal: 16, paddingVertical: 8 },
                  appearance: { radius: 4 },
                  typography: { color: 'white1', fontSize: 12, fontWeight: 500 },
                },
              }}
              animate={[
                { onClick: { toVariant: 'clicked', duration: '0.3s', curve: 'ease' } },
                { onClick: { toVariant: 'testParent.testChild.active', duration: '0.3s', curve: 'ease' } }
              ] as Animate}
              onClick={() => console.log('[Test] Simple hierarchy button clicked')}
            >
              Test: testParent.testChild.active
            </Frame>

            <Frame
              id="testParent"
              variant="default"
              variants={{
                default: {
                  fill: { type: 'solid', color: 'gray3' },
                  autoLayout: { flow: 'vertical', gap: 10, padding: 10 },
                  appearance: { radius: 8 },
                  stroke: { width: 2, color: 'gray4' },
                },
              }}
            >
              <Frame
                id="testChild"
                variant="default"
                variants={{
                  default: {
                    fill: { type: 'solid', color: 'green4' },
                    autoLayout: { width: 80, height: 60, alignment: 'center' },
                    appearance: { radius: 4 },
                    typography: { color: 'white1', fontSize: 10, fontWeight: 500 },
                  },
                  active: {
                    fill: { type: 'solid', color: 'green7' },
                    autoLayout: { width: 80, height: 60, alignment: 'center' },
                    appearance: { radius: 4 },
                    typography: { color: 'white1', fontSize: 10, fontWeight: 500 },
                    effects: { dropShadow: [{ x: 0, y: 2, blur: 4, color: 'rgba(0,255,0,0.3)' }] },
                  },
                }}
              >
                Test Child
              </Frame>
            </Frame>
          </Frame>

          <Frame autoLayout={{ flow: 'horizontal', gap: 20 }}>
            {/* Grandparent Level */}
            <Frame
              id="grandparent"
              variant="default"
              variants={{
                default: {
                  fill: { type: 'solid', color: 'gray3' },
                  autoLayout: { flow: 'vertical', gap: 10, padding: 10 },
                  appearance: { radius: 8 },
                  stroke: { width: 2, color: 'gray4' },
                },
              }}
            >
              <Frame
                typography={{ fontSize: 12, color: 'gray7', fontWeight: 600 }}
              >
                Grandparent
              </Frame>

              {/* Parent Level 1 */}
              <Frame
                id="parent"
                variant="default"
                variants={{
                  default: {
                    fill: { type: 'solid', color: 'gray4' },
                    autoLayout: { flow: 'vertical', gap: 8, padding: 8 },
                    appearance: { radius: 6 },
                  },
                }}
              >
                <Frame
                  typography={{ fontSize: 11, color: 'gray6', fontWeight: 500 }}
                >
                  Parent
                </Frame>

                {/* Child Level */}
                <Frame
                  id="child"
                  variant="default"
                  variants={{
                    default: {
                      fill: { type: 'solid', color: 'red4' },
                      autoLayout: { width: 80, height: 60, alignment: 'center' },
                      appearance: { radius: 4 },
                      typography: { color: 'white1', fontSize: 10, fontWeight: 500 },
                    },
                    active: {
                      fill: { type: 'solid', color: 'blue7' },
                      autoLayout: { width: 80, height: 60, alignment: 'center' },
                      appearance: { radius: 4 },
                      typography: { color: 'white1', fontSize: 10, fontWeight: 500 },
                      effects: { dropShadow: [{ x: 0, y: 2, blur: 4, color: 'rgba(255,0,0,0.3)' }] },
                    },
                  }}
                >
                  Child
                </Frame>
              </Frame>

              {/* Parent Level 2 */}
              <Frame
                id="parent2"
                variant="default"
                variants={{
                  default: {
                    fill: { type: 'solid', color: 'gray4' },
                    autoLayout: { flow: 'vertical', gap: 8, padding: 8 },
                    appearance: { radius: 6 },
                  },
                }}
              >
                <Frame
                  typography={{ fontSize: 11, color: 'gray6', fontWeight: 500 }}
                >
                  Parent2
                </Frame>

                {/* Child2 Level */}
                <Frame
                  id="child2"
                  variant="default"
                  variants={{
                    default: {
                      fill: { type: 'solid', color: 'blue4' },
                      autoLayout: { width: 80, height: 60, alignment: 'center' },
                      appearance: { radius: 4 },
                      typography: { color: 'white1', fontSize: 10, fontWeight: 500 },
                    },
                    highlighted: {
                      fill: { type: 'solid', color: 'green9' },
                      autoLayout: { width: 80, height: 60, alignment: 'center' },
                      appearance: { radius: 4 },
                      typography: { color: 'white1', fontSize: 10, fontWeight: 500 },
                      effects: { dropShadow: [{ x: 0, y: 2, blur: 4, color: 'rgba(0,0,255,0.3)' }] },
                    },
                  }}
                >
                  Child2
                </Frame>
              </Frame>
            </Frame>
          </Frame>
        </Frame>
      </AnimateProvider>
    );
  },
};
