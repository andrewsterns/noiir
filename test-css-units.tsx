import React from 'react';
import { Frame } from './src/components/frame/Frame';

/**
 * Test file demonstrating the new CSS unit support
 * 
 * You can now use:
 * - Plain numbers: width: 100 (treated as px)
 * - CSS units: width: "50%", width: "10rem", width: "80vw", width: "5em"
 * - All standard units: px, em, rem, vh, vw, %, vmin, vmax, ch, ex
 * - Grid shorthand: flow: "grid", grid: "3x4"
 */

export default function TestCSSUnits() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>CSS Units Test</h1>
      
      {/* Plain number (treated as px) */}
      <Frame
        autoLayout={{ 
          width: 200, 
          height: 100,
          padding: 16,
          flow: 'vertical'
        }}
        fill={{ color: '#f0f0f0' }}
      >
        <div>Plain number: width: 200 (200px)</div>
      </Frame>

      <br />

      {/* Percentage units */}
      <Frame
        autoLayout={{ 
          width: "50%", 
          height: 100,
          padding: "1rem",
          flow: 'vertical'
        }}
        fill={{ color: '#e0e0ff' }}
      >
        <div>Percentage: width: "50%"</div>
      </Frame>

      <br />

      {/* REM units */}
      <Frame
        autoLayout={{ 
          width: "20rem", 
          height: "8rem",
          padding: "2rem",
          gap: "1rem",
          flow: 'vertical'
        }}
        fill={{ color: '#ffe0e0' }}
      >
        <div>REM units: width: "20rem", height: "8rem"</div>
        <div>padding: "2rem", gap: "1rem"</div>
      </Frame>

      <br />

      {/* Viewport units */}
      <Frame
        autoLayout={{ 
          width: "80vw", 
          height: "30vh",
          padding: "2vh",
          flow: 'horizontal',
          gap: "2vw"
        }}
        fill={{ color: '#e0ffe0' }}
      >
        <div>Viewport units: width: "80vw", height: "30vh"</div>
        <div>padding: "2vh", gap: "2vw"</div>
      </Frame>

      <br />

      {/* Grid layout with shorthand */}
      <Frame
        autoLayout={{ 
          width: "100%", 
          height: 300,
          flow: 'grid',
          grid: "3x2", // 3 columns, 2 rows
          gap: "1rem",
          padding: "1rem"
        }}
        fill={{ color: '#fff0e0' }}
      >
        <div style={{ background: '#ff6b6b', padding: '1rem' }}>Item 1</div>
        <div style={{ background: '#4ecdc4', padding: '1rem' }}>Item 2</div>
        <div style={{ background: '#45b7d1', padding: '1rem' }}>Item 3</div>
        <div style={{ background: '#96ceb4', padding: '1rem' }}>Item 4</div>
        <div style={{ background: '#ffeaa7', padding: '1rem' }}>Item 5</div>
        <div style={{ background: '#dfe6e9', padding: '1rem' }}>Item 6</div>
      </Frame>

      <br />

      {/* Mixed units */}
      <Frame
        autoLayout={{ 
          width: "clamp(200px, 50%, 600px)", 
          height: 150,
          padding: { top: "1rem", right: "2rem", bottom: "1rem", left: "2rem" },
          gap: "0.5em",
          flow: 'horizontal'
        }}
        fill={{ color: '#f0e0ff' }}
      >
        <div>Mixed: width: "clamp(200px, 50%, 600px)"</div>
        <div>Object padding with different units</div>
      </Frame>

      <br />

      {/* Border radius with units */}
      <Frame
        autoLayout={{ 
          width: 200, 
          height: 200,
          padding: "2rem"
        }}
        appearance={{ 
          radius: "2rem" 
        }}
        fill={{ color: '#e0f0ff' }}
      >
        <div>Border radius: "2rem"</div>
      </Frame>
    </div>
  );
}
