import React from 'react';
import { Button } from './src/components/atoms/button/button';
import { Frame } from './src/components/frame/Frame';
import { TransitionProvider } from './packages/frame-core/src/transition/transition';
import { TEST_BUTTON_V, TEST_FRAME_V } from './test-button.variants';

interface TestButtonProps {
  transitions?: any[];
}

export const TestButton: React.FC<TestButtonProps> = ({ transitions = [] }) => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <TransitionProvider>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2>Button Variant Switching Demo</h2>
        <p>Hover over buttons to see <strong>surface</strong> variant, click and hold to see <strong>ghost</strong> variant</p>
        
        <Button 
          id="button1"
          variant="state1" 
          variants={TEST_BUTTON_V}
          transitions={transitions}
          onClick={handleClick}
        >
          Primary Button (Triggers Others)
        </Button>

        <Button 
          id="button2"
          variant="state1" 
          variants={TEST_BUTTON_V}
        >
          Secondary Button (Changes on Click)
        </Button>

        <Frame 
          id="frame1"
          variant="state1"
          variants={TEST_FRAME_V}
        >
          Frame 1 (Changes on Hover)
        </Frame>

        <Frame 
          id="frame2"
          variant="state1"
          variants={TEST_FRAME_V}
        >
          Frame 2 (Changes on Click)
        </Frame>

        <Button variant="secondary" size="lg">
          Secondary Large
        </Button>

        <Button
          variant="outline"
          iconStart="🔍"
          iconEnd="→"
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
    </TransitionProvider>
  );
};