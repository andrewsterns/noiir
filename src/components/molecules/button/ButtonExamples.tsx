import React from 'react';
import { Button } from './button';

/**
 * Examples demonstrating Button with ALL Frame capabilities
 */

// Basic button with solid fill
export const BasicExample = () => (
  <Button
    fill={{ type: 'solid', color: 'primary6' }}
    appearance={{ radius: 8 }}
    autoLayout={{ width: 150, height: 40 }}
    typography={{ 
      fontSize: 16, 
      fontWeight: 500, 
      textAlign: 'center',
      color: 'white'
    }}
    onClick={() => alert('Basic button clicked!')}
  >
    Click me
  </Button>
);

// Button with gradient and complex styling
export const GradientExample = () => (
  <Button
    fill={{
      type: 'linear-gradient',
      angle: 45,
      stops: [
        { color: 'primary4', position: 0 },
        { color: 'primary8', position: 1 }
      ]
    }}
    stroke={{ color: 'white', weight: 2 }}
    appearance={{ radius: 12, opacity: 1 }}
    autoLayout={{ width: 200, height: 60 }}
    typography={{ 
      fontSize: 18, 
      fontWeight: 700, 
      textAlign: 'center',
      color: 'white'
    }}
    onClick={() => alert('Gradient button clicked!')}
  >
    🌈 Gradient Button
  </Button>
);

// Button with positioning (using Frame's position props)
export const PositionedExample = () => (
  <div style={{ position: 'relative', width: 400, height: 200, backgroundColor: '#f0f0f0' }}>
    <Button
      fill={{ type: 'solid', color: 'success6' }}
      appearance={{ radius: 8 }}
      autoLayout={{ width: 120, height: 40 }}
      typography={{ 
        fontSize: 14, 
        fontWeight: 600, 
        textAlign: 'center',
        color: 'white'
      }}
      position={{ x: 50, y: 50 }}
      onClick={() => alert('Positioned button clicked!')}
    >
      Positioned
    </Button>
    
    <Button
      fill={{ type: 'solid', color: 'error6' }}
      appearance={{ radius: 8 }}
      autoLayout={{ width: 120, height: 40 }}
      typography={{ 
        fontSize: 14, 
        fontWeight: 600, 
        textAlign: 'center',
        color: 'white'
      }}
      position={{ x: 200, y: 100 }}
      onClick={() => alert('Another positioned button clicked!')}
    >
      Also Positioned
    </Button>
  </div>
);

// Button with auto layout (using Frame's autoLayout props)
export const AutoLayoutExample = () => (
  <Button
    fill={{ type: 'solid', color: 'warning6' }}
    appearance={{ radius: 16 }}
    autoLayout={{
      flow: 'horizontal',
      alignment: 'center',
      gap: 8,
      padding: { top: 16, right: 24, bottom: 16, left: 24 }
    }}
    typography={{ 
      fontSize: 16, 
      fontWeight: 600, 
      textAlign: 'center',
      color: 'white'
    }}
    onClick={() => alert('Auto layout button clicked!')}
  >
    <span>🔥</span>
    <span>Auto Layout Button</span>
    <span>🚀</span>
  </Button>
);

// Outline button (no fill, just stroke)
export const OutlineExample = () => (
  <Button
    stroke={{ color: 'primary6', weight: 2 }}
    appearance={{ radius: 8 }}
    autoLayout={{ width: 150, height: 40 }}
    typography={{ 
      fontSize: 16, 
      fontWeight: 500, 
      textAlign: 'center',
      color: 'primary6'
    }}
    onClick={() => alert('Outline button clicked!')}
  >
    Outline Button
  </Button>
);

// Disabled button
export const DisabledExample = () => (
  <Button
    fill={{ type: 'solid', color: 'neutral5' }}
    appearance={{ radius: 8 }}
    autoLayout={{ width: 150, height: 40 }}
    typography={{ 
      fontSize: 16, 
      fontWeight: 500, 
      textAlign: 'center',
      color: 'white'
    }}
    disabled={true}
    onClick={() => alert('This should not fire!')}
  >
    Disabled
  </Button>
);

// Button with complex radial gradient
export const RadialGradientExample = () => (
  <Button
    fill={{
      type: 'radial-gradient',
      stops: [
        { color: '#ffffff', position: 0 },
        { color: 'success6', position: 1 }
      ]
    }}
    appearance={{ radius: 50 }}
    autoLayout={{ width: 100, height: 100 }}
    typography={{ 
      fontSize: 14, 
      fontWeight: 600, 
      textAlign: 'center',
      color: 'white'
    }}
    onClick={() => alert('Radial gradient button clicked!')}
  >
    Radial
  </Button>
);

// Button gallery component
export const ButtonGallery = () => (
  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <h2>Button Component - ALL Frame Powers!</h2>
    
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <BasicExample />
      <OutlineExample />
      <DisabledExample />
    </div>
    
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <GradientExample />
      <RadialGradientExample />
    </div>
    
    <div>
      <h3>Auto Layout Button:</h3>
      <AutoLayoutExample />
    </div>
    
    <div>
      <h3>Positioned Buttons:</h3>
      <PositionedExample />
    </div>
  </div>
);

export default ButtonGallery;