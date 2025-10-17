import React, { useState } from 'react';
import { Frame } from '../components/atoms/frame/Frame';
import { Button } from '../components/molecules/button/button';

/**
 * Simple State Switching Example
 *
 * This demonstrates how states can contain their own animation logic
 * to switch between different states.
 */

export const SimpleVariantExample: React.FC = () => {
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2>Simple State Switching</h2>
      <p>Click the button to switch between stateDefault (blue) and stateActive (green).</p>

      <Button>
        Click to Switch States
      </Button>

      <h3>Frame with Custom States</h3>
      <p>This Frame has its own custom states that switch on click.</p>

      <Frame
        state="stateDefault"
        states={{
          stateDefault: {
            autoLayout: { flow: 'horizontal', alignment: 'center', width: 200, height: 50 },
            appearance: { radius: 8 },
            fill: { type: 'solid', color: 'primary6' },
            typography: { color: 'white', fontWeight: 500 },
            animation: [
              {
                trigger: 'onClick',
                action: 'changeTo',
                destination: 'stateActive',
                animation: 'dissolve',
                duration: 300,
              }
            ]
          },
          stateActive: {
            autoLayout: { flow: 'horizontal', alignment: 'center', width: 200, height: 50 },
            appearance: { radius: 8 },
            fill: { type: 'solid', color: 'success6' },
            typography: { color: 'white', fontWeight: 600 },
            animation: [
              {
                trigger: 'onClick',
                action: 'changeTo',
                destination: 'stateDefault',
                animation: 'dissolve',
                duration: 300,
              }
            ]
          }
        }}
      >
        Frame: Click to Switch
      </Frame>
    </div>
  );
};
