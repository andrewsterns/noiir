import React from 'react';
import { Frame } from '../Frame';

export const AlignmentTest = () => (
  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
    <h3>Alignment Test - Center</h3>

    {/* Test horizontal flow with center alignment */}
    <div>
      <h4>Horizontal Flow - Center</h4>
      <Frame
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 300, height: 100 }}
        fill={{ type: 'solid', color: '#f3f4f6' }}
        stroke={{ color: '#d1d5db', weight: 1 }}
        appearance={{ radius: 8 }}
      >
        <Frame
          autoLayout={{ width: 60, height: 40 }}
          fill={{ type: 'solid', color: '#3b82f6' }}
          appearance={{ radius: 4 }}
        >
          <div style={{ color: 'white', textAlign: 'center', padding: '8px', fontSize: '12px' }}>Item 1</div>
        </Frame>
        <Frame
          autoLayout={{ width: 60, height: 40 }}
          fill={{ type: 'solid', color: '#10b981' }}
          appearance={{ radius: 4 }}
        >
          <div style={{ color: 'white', textAlign: 'center', padding: '8px', fontSize: '12px' }}>Item 2</div>
        </Frame>
      </Frame>
    </div>

    {/* Test vertical flow with center alignment */}
    <div>
      <h4>Vertical Flow - Center</h4>
      <Frame
        autoLayout={{ flow: 'vertical', alignment: 'center', width: 300, height: 150 }}
        fill={{ type: 'solid', color: '#f3f4f6' }}
        stroke={{ color: '#d1d5db', weight: 1 }}
        appearance={{ radius: 8 }}
      >
        <Frame
          autoLayout={{ width: 60, height: 40 }}
          fill={{ type: 'solid', color: '#3b82f6' }}
          appearance={{ radius: 4 }}
        >
          <div style={{ color: 'white', textAlign: 'center', padding: '8px', fontSize: '12px' }}>Item 1</div>
        </Frame>
        <Frame
          autoLayout={{ width: 60, height: 40 }}
          fill={{ type: 'solid', color: '#10b981' }}
          appearance={{ radius: 4 }}
        >
          <div style={{ color: 'white', textAlign: 'center', padding: '8px', fontSize: '12px' }}>Item 2</div>
        </Frame>
      </Frame>
    </div>

    {/* Test compound alignments */}
    <div>
      <h4>Compound Alignments</h4>
      <div style={{ display: 'flex', gap: 20 }}>
        <Frame
          autoLayout={{ flow: 'horizontal', alignment: 'top-center', width: 140, height: 100 }}
          fill={{ type: 'solid', color: '#f3f4f6' }}
          stroke={{ color: '#d1d5db', weight: 1 }}
          appearance={{ radius: 8 }}
        >
          <Frame
            autoLayout={{ width: 40, height: 30 }}
            fill={{ type: 'solid', color: '#3b82f6' }}
            appearance={{ radius: 4 }}
          >
            <div style={{ color: 'white', textAlign: 'center', padding: '4px', fontSize: '10px' }}>Top</div>
          </Frame>
        </Frame>

        <Frame
          autoLayout={{ flow: 'horizontal', alignment: 'bottom-center', width: 140, height: 100 }}
          fill={{ type: 'solid', color: '#f3f4f6' }}
          stroke={{ color: '#d1d5db', weight: 1 }}
          appearance={{ radius: 8 }}
        >
          <Frame
            autoLayout={{ width: 40, height: 30 }}
            fill={{ type: 'solid', color: '#10b981' }}
            appearance={{ radius: 4 }}
          >
            <div style={{ color: 'white', textAlign: 'center', padding: '4px', fontSize: '10px' }}>Bottom</div>
          </Frame>
        </Frame>
      </div>
    </div>
  </div>
);