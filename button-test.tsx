import React from 'react';
import { Button } from './src/components/molecules/button/button';

/**
 * Test component to verify button variant animation works
 */
export const ButtonAnimationTest: React.FC = () => {
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2>Button Animation Test</h2>

      <div>
        <h3>Default Button (starts as variantDefault)</h3>
        <p>Click to toggle between blue (variantDefault) and green (variantActive)</p>
        <Button>Click to Toggle States</Button>
      </div>

      <div>
        <h3>Button starting as Active</h3>
        <p>Click to toggle back to default</p>
        <Button variant="variantActive">Start as Active</Button>
      </div>

      <div>
        <h3>Button with Hover variant</h3>
        <p>This variant doesn't have animation, so it stays static</p>
        <Button variant="variantHover">Hover Variant (No Animation)</Button>
      </div>
    </div>
  );
};