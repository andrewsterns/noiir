import React from 'react';
import { Frame } from './src/components/frame/Frame';

export const TestFreeformPositioning = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Freeform Positioning Test</h2>
      <Frame
        autoLayout={{ flow: 'freeform', padding: 8, width: 600, height: 100 }}
        fill={{ type: 'solid', color: 'white2', opacity: 0.9 }}
        stroke={{ type: 'solid', color: 'white4', weight: 1, opacity: 0 }}
        appearance={{ radius: 8 }}
      >
        <Frame
          fill={{ type: 'solid', color: 'blue6' }}
          autoLayout={{ width: 100, height: 40 }}
          appearance={{ radius: 4 }}
          position={{ x: 0, y: 0 }}
        >
          A (0,0)
        </Frame>
        <Frame
          fill={{ type: 'solid', color: 'tomato6' }}
          autoLayout={{ width: 100, height: 40 }}
          appearance={{ radius: 4 }}
          position={{ x: 150, y: 0 }}
        >
          B (150,0)
        </Frame>
        <Frame
          fill={{ type: 'solid', color: 'grass6' }}
          autoLayout={{ width: 100, height: 40 }}
          appearance={{ radius: 4 }}
          position={{ x: 300, y: 0 }}
        >
          C (300,0)
        </Frame>
      </Frame>
    </div>
  );
};