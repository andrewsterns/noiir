import React from 'react';
import { Frame } from '../../Frame';

export default {
  title: 'Frame/Animation/Trigger',
  component: Frame,
  parameters: {
    docs: {
      description: {
        component: 'Trigger demonstrations - testing different event triggers for animations.',
      },
    },
  },
};

// Common variants for trigger testing
const triggerVariants = {
  default: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 16, width: 150, height: 50 },
    fill: { type: 'solid' as const, color: 'neutral2' },
    stroke: { type: 'solid' as const, color: 'neutral4', width: 1 },
    appearance: { radius: 8 },
    typography: { fontSize: 14, fontWeight: 500, color: 'neutral9' }
  },
  hover: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 16, width: 150, height: 50 },
    fill: { type: 'solid' as const, color: 'primary3' },
    stroke: { type: 'solid' as const, color: 'primary6', width: 2 },
    appearance: { radius: 8 },
    typography: { fontSize: 14, fontWeight: 600, color: 'primary8' }
  },
  click: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 16, width: 150, height: 50 },
    fill: { type: 'solid' as const, color: 'success3' },
    stroke: { type: 'solid' as const, color: 'success6', width: 2 },
    appearance: { radius: 8 },
    typography: { fontSize: 14, fontWeight: 600, color: 'success8' }
  },
  active: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 16, width: 150, height: 50 },
    fill: { type: 'solid' as const, color: 'warning3' },
    stroke: { type: 'solid' as const, color: 'warning6', width: 2 },
    appearance: { radius: 8 },
    typography: { fontSize: 14, fontWeight: 600, color: 'warning9' }
  }
};

export const ClickTrigger = () => (
  <div style={{ padding: 20 }}>
    <h3>Click Trigger</h3>
    <p>Click the frame to trigger animation to 'click' variant</p>
    <Frame
      variant="default"
      variants={triggerVariants}
      animation={{
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'click',
        animation: 'dissolve',
        duration: 300
      }}
    >
      Click Me
    </Frame>
  </div>
);

export const HoverTrigger = () => (
  <div style={{ padding: 20 }}>
    <h3>Hover Trigger</h3>
    <p>Hover over the frame to trigger animation to 'hover' variant</p>
    <Frame
      variant="default"
      variants={triggerVariants}
      animation={{
        trigger: 'onHover',
        action: 'changeTo',
        destination: 'hover',
        animation: 'dissolve',
        duration: 200
      }}
    >
      Hover Me
    </Frame>
  </div>
);

export const MouseEnterLeaveTrigger = () => (
  <div style={{ padding: 20 }}>
    <h3>Mouse Enter/Leave Trigger</h3>
    <p>Move mouse in/out to see enter/leave triggers</p>
    <Frame
      variant="default"
      variants={triggerVariants}
      animation={[
        {
          trigger: 'mouseEnter',
          action: 'changeTo',
          destination: 'hover',
          animation: 'dissolve',
          duration: 200
        },
        {
          trigger: 'mouseLeave',
          action: 'changeTo',
          destination: 'default',
          animation: 'dissolve',
          duration: 300
        }
      ]}
    >
      Mouse Enter/Leave
    </Frame>
  </div>
);

export const MouseDownUpTrigger = () => (
  <div style={{ padding: 20 }}>
    <h3>Mouse Down/Up Trigger</h3>
    <p>Press and release mouse button to see down/up triggers</p>
    <Frame
      variant="default"
      variants={triggerVariants}
      animation={[
        {
          trigger: 'mouseDown',
          action: 'changeTo',
          destination: 'active',
          animation: 'dissolve',
          duration: 100
        },
        {
          trigger: 'mouseUp',
          action: 'changeTo',
          destination: 'default',
          animation: 'dissolve',
          duration: 200
        }
      ]}
    >
      Press & Release
    </Frame>
  </div>
);

export const CombinedTriggers = () => (
  <div style={{ padding: 20 }}>
    <h3>Combined Triggers</h3>
    <p>Hover, click, and mouse interactions all trigger different animations</p>
    <Frame
      variant="default"
      variants={triggerVariants}
      animation={[
        {
          trigger: 'onHover',
          action: 'changeTo',
          destination: 'hover',
          animation: 'dissolve',
          duration: 200
        },
        {
          trigger: 'onClick',
          action: 'changeTo',
          destination: 'click',
          animation: 'dissolve',
          duration: 300
        },
        {
          trigger: 'mouseLeave',
          action: 'changeTo',
          destination: 'default',
          animation: 'dissolve',
          duration: 400
        },
        {
          trigger: 'mouseDown',
          action: 'changeTo',
          destination: 'active',
          animation: 'dissolve',
          duration: 100
        }
      ]}
    >
      Multi-Trigger Frame
    </Frame>
  </div>
);