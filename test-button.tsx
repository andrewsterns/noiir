import React from 'react';
import { Button } from './src/components/atoms/button/button';

export const TestButton = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h2>Button Variant Switching Demo</h2>
      <p>Hover over buttons to see <strong>surface</strong> variant, click and hold to see <strong>ghost</strong> variant</p>
      
      <Button variant="primary" onClick={handleClick}>
        Primary Button
      </Button>

      <Button variant="secondary" size="lg">
        Secondary Large
      </Button>

      <Button
        variant="outline"
        iconStart="🔍"
        iconStartActive="⭐"
        iconEnd="→"
        iconEndActive="✨"
      >
        Search with Icons
      </Button>

      <Button variant="ghost" disabled>
        Disabled Ghost
      </Button>
      
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="secondary" size="md">Medium</Button>
        <Button variant="outline" size="lg">Large</Button>
      </div>
    </div>
  );
};