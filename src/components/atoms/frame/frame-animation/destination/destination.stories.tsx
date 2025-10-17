import React from 'react';
import { Frame } from '../../Frame';

export default {
  title: 'Frame/Animation/Destination',
  component: Frame,
  parameters: {
    docs: {
      description: {
        component: 'Destination demonstrations - testing how different destination types work in animations.',
      },
    },
  },
};

// Common variants for destination testing
const destinationStates = {
  default: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 16, width: 180, height: 50 },
    fill: { type: 'solid' as const, color: 'neutral2' },
    stroke: { type: 'solid' as const, color: 'neutral4', width: 1 },
    appearance: { radius: 8 },
    typography: { fontSize: 14, fontWeight: 500, color: 'neutral9' }
  },
  state1: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 16, width: 180, height: 50 },
    fill: { type: 'solid' as const, color: 'primary3' },
    stroke: { type: 'solid' as const, color: 'primary6', width: 2 },
    appearance: { radius: 8 },
    typography: { fontSize: 14, fontWeight: 600, color: 'primary8' }
  },
  state2: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 16, width: 180, height: 50 },
    fill: { type: 'solid' as const, color: 'success3' },
    stroke: { type: 'solid' as const, color: 'success6', width: 2 },
    appearance: { radius: 8 },
    typography: { fontSize: 14, fontWeight: 600, color: 'success8' }
  },
  state3: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 16, width: 180, height: 50 },
    fill: { type: 'solid' as const, color: 'warning3' },
    stroke: { type: 'solid' as const, color: 'warning6', width: 2 },
    appearance: { radius: 8 },
    typography: { fontSize: 14, fontWeight: 600, color: 'warning9' }
  },
  state4: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 16, width: 180, height: 50 },
    fill: { type: 'solid' as const, color: 'error3' },
    stroke: { type: 'solid' as const, color: 'error6', width: 2 },
    appearance: { radius: 8 },
    typography: { fontSize: 14, fontWeight: 600, color: 'error7' }
  }
};

export const StringDestination = () => (
  <div style={{ padding: 20 }}>
    <h3>String Destination</h3>
    <p>Click to go to 'state1' variant</p>
    <Frame
      state="default"
      states={destinationStates}
      animation={{
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'state1',
        animation: 'dissolve',
        duration: 300
      }}
    >
      To State 1
    </Frame>
  </div>
);

export const MultipleStringDestinations = () => (
  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3>Multiple String Destinations</h3>
    <p>Each button goes to a different variant</p>

    <Frame
      state="default"
      states={destinationStates}
      animation={{
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'state1',
        animation: 'dissolve',
        duration: 300
      }}
    >
      To State 1
    </Frame>

    <Frame
      state="default"
      states={destinationStates}
      animation={{
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'state2',
        animation: 'dissolve',
        duration: 300
      }}
    >
      To State 2
    </Frame>

    <Frame
      state="default"
      states={destinationStates}
      animation={{
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'state3',
        animation: 'dissolve',
        duration: 300
      }}
    >
      To State 3
    </Frame>

    <Frame
      state="default"
      states={destinationStates}
      animation={{
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'state4',
        animation: 'dissolve',
        duration: 300
      }}
    >
      To State 4
    </Frame>
  </div>
);

export const DestinationWithHoverBack = () => (
  <div style={{ padding: 20 }}>
    <h3>Destination with Hover Back</h3>
    <p>Click to go to state2, hover to go back to default</p>
    <Frame
      state="default"
      states={destinationStates}
      animation={[
        {
          trigger: 'onClick',
          action: 'changeTo',
          destination: 'state2',
          animation: 'dissolve',
          duration: 300
        },
        {
          trigger: 'onHover',
          action: 'changeTo',
          destination: 'default',
          animation: 'dissolve',
          duration: 200
        }
      ]}
    >
      Click to State 2, Hover to Reset
    </Frame>
  </div>
);

export const ComplexDestinationFlow = () => (
  <div style={{ padding: 20 }}>
    <h3>Complex Destination Flow</h3>
    <p>Hover → State1, Click → State3, MouseLeave → Default</p>
    <Frame
      state="default"
      states={destinationStates}
      animation={[
        {
          trigger: 'onHover',
          action: 'changeTo',
          destination: 'state1',
          animation: 'dissolve',
          duration: 200
        },
        {
          trigger: 'onClick',
          action: 'changeTo',
          destination: 'state3',
          animation: 'dissolve',
          duration: 300
        },
        {
          trigger: 'mouseLeave',
          action: 'changeTo',
          destination: 'default',
          animation: 'dissolve',
          duration: 400
        }
      ]}
    >
      Complex Flow
    </Frame>
  </div>
);
