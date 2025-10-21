import React from 'react';
import { Frame } from '../frame/Frame';

export const Guage: React.FC = () => {

  // Upward-facing top half-circle: left -> top -> right (arc at top)
  const semicirclePath = {
    d: "M2,95 A93,93 0 0,1 188,95"
  };
  console.log('Gauge path:', semicirclePath.d);

  // Half circle circumference: pi * r; gap = (pi * 93) / 11 ≈ 26.6
  return (
    <Frame
      autoLayout={{ flow: 'curved', path: semicirclePath, width: 'hug', height: 'hug', gap: 'full', padding: 8}}
      fill={{ type: 'solid', color: 'gray3' }}
    >
      {Array.from({ length: 13 }).map((_, i) => (
        <Frame
          key={i}
          fill={{ type: 'solid', color: 'primary12' }}
          appearance={{ radius: 16 }}
          autoLayout={{ width: 'hug', height: 'hug', alignment: 'center' }}
          position={{ rotation: 0 }}
        >
          <Frame
            autoLayout={{ padding: 4 }}
            typography={{ color: 'gray12', fontSize: 12, textAlign: 'center' }}
          >
            {i + 1}
          </Frame>
        </Frame>
      ))}
    </Frame>
  );
};
