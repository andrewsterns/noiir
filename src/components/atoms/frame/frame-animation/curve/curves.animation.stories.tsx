import React from 'react';
import { Frame } from '../../Frame';

export default {
  title: 'Frame/Animation/Curves',
  component: Frame,
  parameters: {
    docs: {
      description: {
        component: 'Animation easing curves demonstration. See how different easing functions affect motion.',
      },
    },
  },
};

// States that move the frame horizontally to demonstrate easing curves
const positionStates = {
  start: {
    position: { x: 0, y: 0 },
    fill: { type: 'solid' as const, color: 'neutral2' },
    stroke: { type: 'solid' as const, color: 'neutral4', width: 1 },
    typography: { fontSize: 14, fontWeight: 500, color: 'neutral9' }
  },
  end: {
    position: { x: 200, y: 0 },
    fill: { type: 'solid' as const, color: 'primary6' },
    stroke: { type: 'solid' as const, color: 'primary7', width: 1 },
    typography: { fontSize: 14, fontWeight: 500, color: 'white' }
  },
};

// Custom action that toggles between start and end positions
const togglePosition = (context: import('../core').AnimationContext) => {
  return { state: context.currentState === 'start' ? 'end' : 'start' };
};

export const AllCurves = () => (
  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
    <h3>All Animation Easing Curves - Position Animation</h3>
    <p>Click each button to see how different easing curves affect the movement back and forth</p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: 400 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Linear - Constant speed</label>
        <div style={{ position: 'relative', height: 40 }}>
          <Frame
            autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 36 }}
            appearance={{ radius: 4 }}
            state='start'
            states={positionStates}
            animation={[{ trigger: 'onClick', action: togglePosition, animation: 'move', curve: 'linear', duration: 1000 }]}
          >
             Linear
          </Frame>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Ease - Smooth acceleration and deceleration</label>
        <div style={{ position: 'relative', height: 40 }}>
          <Frame
            autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 36 }}
            appearance={{ radius: 4 }}
            state='start'
            states={positionStates}
            animation={[{ trigger: 'onClick', action: togglePosition, animation: 'move', curve: 'ease', duration: 1000 }]}
          >
             Ease
          </Frame>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Ease In - Starts slow, accelerates</label>
        <div style={{ position: 'relative', height: 40 }}>
          <Frame
            autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 36 }}
            appearance={{ radius: 4 }}
            state='start'
            states={positionStates}
            animation={[{ trigger: 'onClick', action: togglePosition, animation: 'move', curve: 'ease-in', duration: 1000 }]}
          >
             Ease In
          </Frame>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Ease Out - Fast start, gradual end</label>
        <div style={{ position: 'relative', height: 40 }}>
          <Frame
            autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 36 }}
            appearance={{ radius: 4 }}
            state='start'
            states={positionStates}
            animation={[{ trigger: 'onClick', action: togglePosition, animation: 'move', curve: 'ease-out', duration: 1000 }]}
          >
             Ease Out
          </Frame>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Ease In Out - Gradual start and end</label>
        <div style={{ position: 'relative', height: 40 }}>
          <Frame
            autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 36 }}
            appearance={{ radius: 4 }}
            state='start'
            states={positionStates}
            animation={[{ trigger: 'onClick', action: togglePosition, animation: 'move', curve: 'ease-in-out', duration: 1000 }]}
          >
             Ease In Out
          </Frame>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Bounce - Bounces at the end</label>
        <div style={{ position: 'relative', height: 40 }}>
          <Frame
            autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 36 }}
            appearance={{ radius: 4 }}
            state='start'
            states={positionStates}
            animation={[{ trigger: 'onClick', action: togglePosition, animation: 'move', curve: 'bounce', duration: 1500 }]}
          >
             Bounce
          </Frame>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Elastic - Elastic/spring-like motion</label>
        <div style={{ position: 'relative', height: 40 }}>
          <Frame
            autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 36 }}
            appearance={{ radius: 4 }}
            state='start'
            states={positionStates}
            animation={[{ trigger: 'onClick', action: togglePosition, animation: 'move', curve: 'elastic', duration: 1500 }]}
          >
             Elastic
          </Frame>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Spring - Spring-like bounce</label>
        <div style={{ position: 'relative', height: 40 }}>
          <Frame
            autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 36 }}
            appearance={{ radius: 4 }}
            state='start'
            states={positionStates}
            animation={[{ trigger: 'onClick', action: togglePosition, animation: 'move', curve: 'spring', duration: 1200 }]}
          >
             Spring
          </Frame>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Custom - Custom cubic-bezier curve</label>
        <div style={{ position: 'relative', height: 40 }}>
          <Frame
            autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 36 }}
            appearance={{ radius: 4 }}
            state='start'
            states={positionStates}
            animation={[{ trigger: 'onClick', action: togglePosition, animation: 'move', curve: 'custom', duration: 1000 }]}
          >
             Custom
          </Frame>
        </div>
      </div>
    </div>
  </div>
);
