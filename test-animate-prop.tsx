import React from 'react';
import { Frame } from './src/components/frame/Frame';

// Test the new multiple animation actions feature with correct "animate" prop
export const TestMultipleAnimations = () => {
  const VARIANT_LIBRARY = {
    startingVariant: {
      fill: { type: 'solid' as const, color: 'blue5' },
      appearance: { radius: 8 },
      animate: [
        { type: 'click' as const, variant: 'destinationVariant', duration: '1s' },
        { type: 'hover' as const, variant: 'otherVariant', duration: '0.5s' },
        { type: 'hotKey' as const, key: 'a', variant: 'destinationVariant', duration: '3s' }
      ]
    },
    destinationVariant: {
      fill: { type: 'solid' as const, color: 'red5' },
      appearance: { radius: 8 }
    },
    otherVariant: {
      fill: { type: 'solid' as const, color: 'green5' },
      appearance: { radius: 8 }
    }
  };

  return (
    <Frame
      id='uniqueID'
      variant='startingVariant'
      variants={VARIANT_LIBRARY}
      autoLayout={{ width: 200, height: 200 }}
    >
      Test Multiple Animations
    </Frame>
  );
};