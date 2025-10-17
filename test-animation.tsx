import React from 'react';
import { Frame } from './src/components/atoms/frame/Frame';

const testStates = {
  default: {
    fill: { type: 'solid' as const, color: 'blue' },
    autoLayout: { width: 100, height: 50 }
  },
  hover: {
    fill: { type: 'solid' as const, color: 'red' },
    autoLayout: { width: 100, height: 50 }
  }
};

export const TestAnimation = () => (
  <Frame
    states={testStates}
    animation={{
      trigger: 'mouseEnter',
      action: 'changeTo',
      destination: 'hover'
    }}
  >
    Test Animation
  </Frame>
);