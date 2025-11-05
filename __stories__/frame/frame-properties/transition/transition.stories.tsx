import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Frame } from '../../../../src/components/frame/Frame';
import { TransitionProvider, Transitions } from '../../../../packages/frame-core/src/transition/transition.props';

/**
 * Transition Stories
 * 
 * Demonstrates the transition system for Frame components.
 * The transition system manages state changes between variants based on events.
 * 
 * Key concepts:
 * - Logical State: The base variant (e.g., 'primary', 'active') - persistent state
 * - Visual State: Temporary overlay (e.g., 'primaryHover') that doesn't change logical state
 * - Hover events only affect visual state, click events change logical state
 * 
 * FIXES APPLIED:
 * 1. Added getVisualVariant() to TransitionContextType interface
 * 2. Updated Frame.tsx to use getVisualVariant() instead of getVariant()
 * 3. Removed unnecessary key event checks in mouseEnter/mouseLeave handler
 * 4. Added debug logging to help diagnose transition issues
 * 
 * How it works:
 * - Frame uses getVisualVariant() which returns visualFrames[id] || frames[id]
 * - Hover events update only visualFrames (temporary overlay)
 * - Click events update frames and clear visualFrames (persistent state change)
 */

const meta: Meta = {
  title: 'Frame/Properties/Transitions',
  component: Frame,
  decorators: [
    (Story) => (
      <TransitionProvider>
        <Story />
      </TransitionProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Basic Click Toggle
 * Click the box to toggle between two variants
 */
export const ClickToggle: Story = {
  render: () => {
    const transitions: Transitions = [
      {
        event: 'click',
        targetId: 'box1',
        toggle: true,
        toggleVariants: ['blue', 'red'],
        duration: '0.3s',
        curve: 'ease',
      },
    ];

    return (
      <Frame
        id="box1"
        variant="blue"
        variants={{
          blue: {
            fill: { type: 'solid', color: 'blue5' },
            autoLayout: { width: 150, height: 150 },
            appearance: { radius: 8 },
          },
          red: {
            fill: { type: 'solid', color: 'red5' },
            autoLayout: { width: 150, height: 150 },
            appearance: { radius: 8 },
          },
        }}
        transitions={transitions}
      />
    );
  },
};

/**
 * Hover Transition
 * Hover over the box to see it change color
 */
export const HoverTransition: Story = {
  render: () => {
    const transitions: Transitions = [
      {
        event: 'hover',
        targetId: 'box2',
        fromVariant: 'default',
        toVariant: 'hovered',
        duration: '0.2s',
        curve: 'ease',
      },
      {
        event: 'hover',
        targetId: 'box2',
        fromVariant: 'hovered',
        toVariant: 'default',
        duration: '0.2s',
        curve: 'ease',
      },
    ];

    return (
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
            fill: { type: 'solid', color: 'purple5' },
            autoLayout: { width: 150, height: 150 },
            appearance: { radius: 8 },
          },
        }}
        transitions={transitions}
      />
    );
  },
};

/**
 * MouseEnter/MouseLeave (Explicit)
 * Uses explicit mouseEnter and mouseLeave events
 */
export const MouseEnterLeave: Story = {
  render: () => {
    const transitions: Transitions = [
      {
        event: 'mouseEnter',
        targetId: 'box3',
        fromVariant: 'idle',
        toVariant: 'active',
        duration: '0.2s',
        curve: 'ease-in',
      },
      {
        event: 'mouseLeave',
        targetId: 'box3',
        fromVariant: 'active',
        toVariant: 'idle',
        duration: '0.2s',
        curve: 'ease-out',
      },
    ];

    return (
      <Frame
        id="box3"
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
        transitions={transitions}
      />
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
    const transitions: Transitions = [
      // Click toggles between off and on
      {
        event: 'click',
        targetId: 'box4',
        toggle: true,
        toggleVariants: ['off', 'on'],
        duration: '0.2s',
        curve: 'ease',
      },
      // Hover transitions from off to offHover
      {
        event: 'hover',
        targetId: 'box4',
        fromVariant: 'off',
        toVariant: 'offHover',
        duration: '0.1s',
        curve: 'ease',
      },
      {
        event: 'hover',
        targetId: 'box4',
        fromVariant: 'offHover',
        toVariant: 'off',
        duration: '0.1s',
        curve: 'ease',
      },
      // Hover transitions from on to onHover
      {
        event: 'hover',
        targetId: 'box4',
        fromVariant: 'on',
        toVariant: 'onHover',
        duration: '0.1s',
        curve: 'ease',
      },
      {
        event: 'hover',
        targetId: 'box4',
        fromVariant: 'onHover',
        toVariant: 'on',
        duration: '0.1s',
        curve: 'ease',
      },
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
        transitions={transitions}
      >
        Click to toggle, hover for feedback
      </Frame>
    );
  },
};

/**
 * Listen Event (Cross-Frame Communication)
 * One frame listens to another frame's variant changes
 */
export const ListenEvent: Story = {
  render: () => {
    const transitions: Transitions = [
      // Controller toggles on click
      {
        event: 'click',
        sourceId: 'controller',
        targetId: 'controller',
        toggle: true,
        toggleVariants: ['inactive', 'active'],
        duration: '0.2s',
        curve: 'ease',
      },
      // Listener responds to controller's active state
      {
        event: 'listen',
        listenId: 'controller',
        listenVariant: 'active',
        targetId: 'listener',
        toVariant: 'responding',
        duration: '0.3s',
        curve: 'ease',
      },
      // Listener responds to controller's inactive state
      {
        event: 'listen',
        listenId: 'controller',
        listenVariant: 'inactive',
        targetId: 'listener',
        toVariant: 'idle',
        duration: '0.3s',
        curve: 'ease',
      },
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
          transitions={transitions}
        >
          Controller (Click me)
        </Frame>

        <Frame
          id="listener"
          variant="idle"
          variants={{
            idle: {
              fill: { type: 'solid', color: 'gray3' },
              autoLayout: { width: 150, height: 150, alignment: 'center' },
              appearance: { radius: 8 },
              typography: { color: 'gray8', fontSize: 14, fontWeight: 500 },
            },
            responding: {
              fill: { type: 'solid', color: 'green5' },
              autoLayout: { width: 150, height: 150, alignment: 'center' },
              appearance: { radius: 8 },
              typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
            },
          }}
          transitions={transitions}
        >
          Listener (Responds)
        </Frame>
      </Frame>
    );
  },
};

/**
 * Multi-Target Transitions
 * One click affects multiple frames
 */
export const MultiTarget: Story = {
  render: () => {
    const transitions: Transitions = [
      // Clicking button affects box1
      {
        event: 'click',
        sourceId: 'button',
        targetId: 'box1',
        toggle: true,
        toggleVariants: ['small', 'large'],
        duration: '0.3s',
        curve: 'ease-in-out',
      },
      // Clicking button also affects box2
      {
        event: 'click',
        sourceId: 'button',
        targetId: 'box2',
        toggle: true,
        toggleVariants: ['circle', 'square'],
        duration: '0.3s',
        curve: 'ease-in-out',
      },
    ];

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
          transitions={transitions}
        >
          Click to affect both boxes
        </Frame>

        <Frame autoLayout={{ flow: 'horizontal', gap: 16 }}>
          <Frame
            id="box1"
            variant="small"
            variants={{
              small: {
                fill: { type: 'solid', color: 'purple5' },
                autoLayout: { width: 80, height: 80 },
                appearance: { radius: 8 },
              },
              large: {
                fill: { type: 'solid', color: 'purple7' },
                autoLayout: { width: 120, height: 120 },
                appearance: { radius: 8 },
              },
            }}
            transitions={transitions}
          />

          <Frame
            id="box2"
            variant="circle"
            variants={{
              circle: {
                fill: { type: 'solid', color: 'pink5' },
                autoLayout: { width: 80, height: 80 },
                appearance: { radius: 40 },
              },
              square: {
                fill: { type: 'solid', color: 'pink7' },
                autoLayout: { width: 80, height: 80 },
                appearance: { radius: 4 },
              },
            }}
            transitions={transitions}
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
    const transitions: Transitions = [
      {
        event: 'click',
        targetId: 'trafficLight',
        toggle: true,
        toggleVariants: ['red', 'yellow', 'green'],
        duration: '0.3s',
        curve: 'ease',
      },
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
        transitions={transitions}
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
    const transitions: Transitions = [
      {
        event: 'mouseDown',
        targetId: 'pressable',
        fromVariant: 'idle',
        toVariant: 'pressed',
        duration: '0.1s',
        curve: 'ease-in',
      },
      {
        event: 'mouseUp',
        targetId: 'pressable',
        fromVariant: 'pressed',
        toVariant: 'idle',
        duration: '0.2s',
        curve: 'ease-out',
      },
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
        transitions={transitions}
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
    const transitions: Transitions = [
      // Click toggle
      {
        event: 'click',
        targetId: 'complex',
        toggle: true,
        toggleVariants: ['stateA', 'stateB', 'stateC'],
        duration: '0.25s',
        curve: 'ease',
      },
      // Hover from stateA
      {
        event: 'hover',
        targetId: 'complex',
        fromVariant: 'stateA',
        toVariant: 'stateAHover',
        duration: '0.15s',
        curve: 'ease',
      },
      {
        event: 'hover',
        targetId: 'complex',
        fromVariant: 'stateAHover',
        toVariant: 'stateA',
        duration: '0.15s',
        curve: 'ease',
      },
      // Hover from stateB
      {
        event: 'hover',
        targetId: 'complex',
        fromVariant: 'stateB',
        toVariant: 'stateBHover',
        duration: '0.15s',
        curve: 'ease',
      },
      {
        event: 'hover',
        targetId: 'complex',
        fromVariant: 'stateBHover',
        toVariant: 'stateB',
        duration: '0.15s',
        curve: 'ease',
      },
      // Hover from stateC
      {
        event: 'hover',
        targetId: 'complex',
        fromVariant: 'stateC',
        toVariant: 'stateCHover',
        duration: '0.15s',
        curve: 'ease',
      },
      {
        event: 'hover',
        targetId: 'complex',
        fromVariant: 'stateCHover',
        toVariant: 'stateC',
        duration: '0.15s',
        curve: 'ease',
      },
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
        transitions={transitions}
      >
        Click to cycle • Hover for feedback
      </Frame>
    );
  },
};

/**
 * Conditional Transition (fromVariant)
 * Only transitions when in a specific variant
 */
export const ConditionalTransition: Story = {
  render: () => {
    const transitions: Transitions = [
      // First click: locked -> unlocked
      {
        event: 'click',
        targetId: 'lock',
        fromVariant: 'locked',
        toVariant: 'unlocked',
        duration: '0.3s',
        curve: 'ease',
      },
      // Second click: unlocked -> open (only works when unlocked)
      {
        event: 'click',
        targetId: 'lock',
        fromVariant: 'unlocked',
        toVariant: 'open',
        duration: '0.3s',
        curve: 'ease',
      },
      // Third click: open -> locked (resets)
      {
        event: 'click',
        targetId: 'lock',
        fromVariant: 'open',
        toVariant: 'locked',
        duration: '0.3s',
        curve: 'ease',
      },
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
        transitions={transitions}
      >
        🔒 Locked → 🔓 Unlocked → ✅ Open
      </Frame>
    );
  },
};
