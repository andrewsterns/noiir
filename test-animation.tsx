import React from 'react';
import { Frame } from './src/components/frame/Frame';

export const TestAnimation = () => (
  <Frame
    fill={{ type: 'solid', color: 'blue' }}
    autoLayout={{ width: 100, height: 50 }}
  >
    Test Animation
  </Frame>
);