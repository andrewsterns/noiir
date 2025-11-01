import React from 'react';
import { Frame } from './src/components/frame/Frame';
import { TransitionProvider } from './src/components/frame/frame-properties/transition/transition';
import { TEST_FRAME_V } from './test-button.variants';

export const TestAnimation = () => {
  console.log('TestAnimation component rendered');

  return (
    <TransitionProvider>
      <div style={{ padding: '20px', position: 'relative', height: '200px', background: '#f0f0f0' }}>
        <h2>Animation Test</h2>
        <button
          id="testButton"
          style={{ padding: '10px 20px', marginBottom: '20px' }}
          onClick={() => console.log('Button clicked')}
        >
          Test Animation
        </button>

        <Frame
          id="testFrame"
          variant="positionState1"
          variants={TEST_FRAME_V}
          transitions={[
            {
              event: 'click',
              sourceId: 'testButton',
              toVariant: 'positionState2',
              duration: '2s',
              curve: 'ease-in-out',
              delay: '0.5s'
            }
          ]}
        >
          <div style={{ color: 'white', fontWeight: 'bold' }}>Test Frame</div>
        </Frame>
      </div>
    </TransitionProvider>
  );
};