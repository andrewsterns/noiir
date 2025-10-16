import React, { useState } from 'react';
import { Frame } from '../components/atoms/frame/Frame';
import { Button } from '../components/molecules/button/button';

/**
 * Simple Variant Switching Example
 *
 * This demonstrates how variants can contain their own animation logic
 * to switch between different states.
 */

export const SimpleVariantExample: React.FC = () => {
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2>Simple Variant Switching</h2>
      <p>Click the button to switch between variantDefault (blue) and variantActive (green).</p>

      <Button>
        Click to Switch States
      </Button>

      <h3>Frame with Custom Variants</h3>
      <p>This Frame has its own custom variants that switch on click.</p>

      <Frame
        variant="variantDefault"
        variants={{
          variantDefault: {
            autoLayout: { flow: 'horizontal', alignment: 'center', width: 200, height: 50 },
            appearance: { radius: 8 },
            fill: { type: 'solid', color: 'primary6' },
            typography: { color: 'white', fontWeight: 500 },
            animation: [
              {
                trigger: 'onClick',
                action: 'changeTo',
                destination: 'variantActive',
                animation: 'dissolve',
                duration: 300,
              }
            ]
          },
          variantActive: {
            autoLayout: { flow: 'horizontal', alignment: 'center', width: 200, height: 50 },
            appearance: { radius: 8 },
            fill: { type: 'solid', color: 'success6' },
            typography: { color: 'white', fontWeight: 600 },
            animation: [
              {
                trigger: 'onClick',
                action: 'changeTo',
                destination: 'variantDefault',
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