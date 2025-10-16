import React from 'react';
import { Frame } from './src/components/atoms/frame/Frame';

/**
 * Test component to verify variant animation system works
 */
export const VariantAnimationTest: React.FC = () => {
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2>Variant Animation Test</h2>

      <Frame
        variant="default"
        variants={{
          default: {
            autoLayout: { flow: 'horizontal', alignment: 'center', width: 200, height: 50 },
            appearance: { radius: 8 },
            fill: { type: 'solid', color: 'primary6' },
            typography: { color: 'white', fontWeight: 500 },
            animate: {
              trigger: 'onClick',
              action: 'changeTo',
              destination: 'active',
              animation: 'dissolve',
              duration: 300,
            }
          },
          active: {
            autoLayout: { flow: 'horizontal', alignment: 'center', width: 200, height: 50 },
            appearance: { radius: 8 },
            fill: { type: 'solid', color: 'success6' },
            typography: { color: 'white', fontWeight: 600 },
            animate: {
              trigger: 'onClick',
              action: 'changeTo',
              destination: 'default',
              animation: 'dissolve',
              duration: 300,
            }
          }
        }}
      >
        Click to Animate!
      </Frame>
    </div>
  );
};