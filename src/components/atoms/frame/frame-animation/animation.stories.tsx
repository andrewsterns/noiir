import React, { useState } from 'react';
import { Frame } from '../Frame';
import type { AnimateProps } from './core';
import { AlignmentTest } from './alignment-test';

export default {
  title: 'Frame/Animation',
  component: Frame,
  parameters: {
    docs: {
      description: {
        component: 'Frame animation system with Figma-like interactions. Click, hover, and see smooth transitions between variants.',
      },
    },
  },
};

// Common variants for all stories
const buttonVariants = {
  default: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 8, width: 120, height: 40 },
    fill: { type: 'solid' as const, color: 'neutral2' },
    stroke: { type: 'solid' as const, color: 'neutral4', width: 1 },
    appearance: { radius: 6 },
    typography: { fontSize: 14, fontWeight: 500, color: 'neutral9' }
  },
  hover: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 8, width: 120, height: 40 },
    fill: { type: 'solid' as const, color: 'neutral3' },
    stroke: { type: 'solid' as const, color: 'neutral5', width: 1 },
    appearance: { radius: 6 },
    typography: { fontSize: 14, fontWeight: 500, color: 'neutral10' }
  },
  active: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 8, width: 120, height: 40 },
    fill: { type: 'solid' as const, color: 'primary6' },
    stroke: { type: 'solid' as const, color: 'primary7', width: 1 },
    appearance: { radius: 6 },
    typography: { fontSize: 14, fontWeight: 500, color: 'white' }
  },
  success: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 8, width: 120, height: 40 },
    fill: { type: 'solid' as const, color: 'success6' },
    stroke: { type: 'solid' as const, color: 'success7', width: 1 },
    appearance: { radius: 6 },
    typography: { fontSize: 14, fontWeight: 500, color: 'white' }
  },
  danger: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 8, width: 120, height: 40 },
    fill: { type: 'solid' as const, color: 'error6' },
    stroke: { type: 'solid' as const, color: 'error7', width: 1 },
    appearance: { radius: 6 },
    typography: { fontSize: 14, fontWeight: 500, color: 'white' }
  },
};

// Variants for hover animation (only override on hover)
const hoverVariants = {
  default: {}, // Empty - use Frame's own properties
  hover: {
    fill: { type: 'solid' as const, color: 'neutral3' },
    stroke: { type: 'solid' as const, color: 'neutral5', weight: 1 },
    typography: { fontSize: 14, fontWeight: 500, color: 'neutral10' }
  }
};

const cardVariants = {
  default: {
    fill: { type: 'solid' as const, color: 'white' },
    stroke: { type: 'solid' as const, color: 'neutral3', width: 1 },
    effects: { dropShadow: [{ x: 0, y: 2, blur: 4, color: 'neutral12' }] }
  },
  hover: {
    fill: { type: 'solid' as const, color: 'white' },
    stroke: { type: 'solid' as const, color: 'neutral4', width: 1 },
    effects: { dropShadow: [{ x: 0, y: 4, blur: 8, color: '#0000004d' }] }
  },
  active: {
    fill: { type: 'solid' as const, color: '#eff6ff' },
    stroke: { type: 'solid' as const, color: '#3b82f6', width: 2 },
    effects: { dropShadow: [{ x: 0, y: 6, blur: 12, color: '#3b82f640' }] }
  },
};

export const BasicClickAnimation = () => (
  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3>Click to Change Color</h3>
    <Frame
      variant="default"
      variants={buttonVariants}
      autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 40 }}
      appearance={{ radius: 6 }}
      animation={[
        {
          trigger: 'onClick',
          action: 'changeTo',
          destination: 'active',
          animation: 'dissolve',
          duration: 200,
        }
      ]}
    >
      Click Me
    </Frame>
  </div>
);

export const HoverAnimation = () => (
  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3>Hover to Change (with revert)</h3>
    <Frame
      variants={hoverVariants}
      autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 40 }}
      fill={{ type: 'solid', color: '#f3f4f6' }}
      stroke={{ color: '#d1d5db', weight: 1 }}
      appearance={{ radius: 6 }}
      typography={{ fontSize: 14, fontWeight: 500, color: '#374151' }}
      animation={{ trigger: 'onHover', action: 'changeTo', destination: 'hover', animation: 'dissolve', duration: 150 }}
    >
      Hover Me
    </Frame>
  </div>
);

export const CardHoverEffect = () => (
  <div style={{ padding: 20 }}>
    <h3>Card Hover Effect</h3>
    <Frame
      variants={cardVariants}
      autoLayout={{ flow: 'horizontal', alignment: 'center', width: 300, height: 150 }}
      fill={{ type: 'solid', color: '#ffffff' }}
      stroke={{ color: '#e5e7eb', weight: 1 }}
      appearance={{ radius: 8 }}
      effects={{ dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0,0,0,0.1)' }] }}
      position={{ x: 0, y: 0 }}
      animation={{ trigger: 'onHover', action: 'changeTo', destination: 'hover', animation: 'smart', duration: 300 }}
    >
      <Frame
        autoLayout={{ flow: 'vertical', alignment: 'center', gap: 8, width: '100%', height: 'auto' }}
      >
        <Frame
          typography={{ fontSize: 18, fontWeight: 600, color: '#374151' }}
        >
          Interactive Card
        </Frame>
        <Frame
          typography={{ fontSize: 14, color: '#6b7280' }}
        >
          Hover for effect
        </Frame>
      </Frame>
    </Frame>
  </div>
);

export const ButtonStateCycle = () => {
  // Custom action that cycles through states without external state management
  const cycleAction = (context: import('./core').AnimationContext) => {
    const variantNames = Object.keys(context.variants);
    const currentIndex = variantNames.indexOf(context.currentVariant);
    const nextIndex = (currentIndex + 1) % variantNames.length;
    return { variant: variantNames[nextIndex] };
  };

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3>State Cycle Button (Custom Action)</h3>
      <p>Click to cycle through states automatically using a custom action function</p>
      <Frame
        variant="default"
        variants={buttonVariants}
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 140, height: 40 }}
        appearance={{ radius: 6 }}
        animation={{ trigger: 'onClick', action: cycleAction, animation: 'dissolve', duration: 250 }}
      >
        Cycle States
      </Frame>
    </div>
  );
};

export const DifferentAnimationTypes = () => (
  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
    <h3>Different Animation Types</h3>

    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Dissolve</label>
        <Frame
          variants={buttonVariants}
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 100, height: 36 }}
          fill={{ type: 'solid', color: '#f3f4f6' }}
          stroke={{ color: '#d1d5db', weight: 1 }}
          appearance={{ radius: 4 }}
          typography={{ fontSize: 14, fontWeight: 500, color: '#374151' }}
          variant="default"
          animation={{ trigger: 'onClick', action: 'changeTo', destination: 'active', animation: 'dissolve', duration: 300 }}
        >
          Dissolve
        </Frame>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Smart</label>
        <Frame
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 100, height: 36 }}
          fill={{ type: 'solid', color: '#f3f4f6' }}
          stroke={{ color: '#d1d5db', weight: 1 }}
          appearance={{ radius: 4 }}
          typography={{ fontSize: 14, fontWeight: 500, color: '#374151' }}
          variant="default"
          animation={{ trigger: 'onClick', action: 'changeTo', destination: 'success', animation: 'smart', duration: 400 }}
        >
          Smart
        </Frame>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Instant</label>
        <Frame
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 100, height: 36 }}
          fill={{ type: 'solid', color: '#f3f4f6' }}
          stroke={{ color: '#d1d5db', weight: 1 }}
          appearance={{ radius: 4 }}
          typography={{ fontSize: 14, fontWeight: 500, color: '#374151' }}
          variant="default"
          animation={{ trigger: 'onClick', action: 'changeTo', destination: 'danger', animation: 'instant' }}
        >
          Instant
        </Frame>
      </div>
    </div>
  </div>
);

export const InteractiveDemo = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const demoVariants = {
    idle: {
      fill: { type: 'solid' as const, color: '#f3f4f6' },
      stroke: { type: 'solid' as const, color: '#d1d5db', width: 1 },
      typography: { fontSize: 14, fontWeight: 400, color: '#6b7280' }
    },
    selected: {
      fill: { type: 'solid' as const, color: '#dbeafe' },
      stroke: { type: 'solid' as const, color: '#3b82f6', width: 2 },
      typography: { fontSize: 14, fontWeight: 600, color: '#1d4ed8' }
    },
  };

  const buttons = [
    { id: 'home', label: 'Home' },
    { id: 'profile', label: 'Profile' },
    { id: 'settings', label: 'Settings' },
    { id: 'help', label: 'Help' },
  ];

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h3>Interactive Navigation Demo</h3>
      <p>Selected: <strong>{selectedButton || 'None'}</strong></p>

      <div style={{ display: 'flex', gap: 12 }}>
        {buttons.map((button) => (
          <Frame
            key={button.id}
            variants={demoVariants}
            autoLayout={{ flow: 'horizontal', alignment: 'center', padding: { left: 16, right: 16, top: 8, bottom: 8 }, width: 'auto', height: 36 }}
            appearance={{ radius: 6 }}
            variant={selectedButton === button.id ? 'selected' : 'idle'}
            animation={{ trigger: 'onClick', action: 'changeTo', destination: selectedButton === button.id ? 'idle' : 'selected', animation: 'dissolve', duration: 200 }}
            onClick={() => setSelectedButton(selectedButton === button.id ? null : button.id)}
          >
            {button.label}
          </Frame>
        ))}
      </div>
    </div>
  );
};

export const ClickCounter = () => {
  const [clickCount, setClickCount] = useState(0);

  // Custom action that counts clicks and changes appearance based on count
  const counterAction = (context: import('./core').AnimationContext) => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Determine variant based on click count
    let variant = 'default';
    if (newCount >= 10) variant = 'success';
    else if (newCount >= 5) variant = 'active';
    else if (newCount >= 1) variant = 'hover';

    return { variant };
  };

  const counterVariants = {
    default: {
      fill: { type: 'solid' as const, color: '#f3f4f6' },
      stroke: { type: 'solid' as const, color: '#d1d5db', width: 1 },
      typography: { fontSize: 14, fontWeight: 500, color: '#374151' }
    },
    hover: {
      fill: { type: 'solid' as const, color: '#e5e7eb' },
      stroke: { type: 'solid' as const, color: '#9ca3af', width: 1 },
      typography: { fontSize: 14, fontWeight: 500, color: '#111827' }
    },
    active: {
      fill: { type: 'solid' as const, color: '#dbeafe' },
      stroke: { type: 'solid' as const, color: '#3b82f6', width: 2 },
      typography: { fontSize: 14, fontWeight: 600, color: '#1d4ed8' }
    },
    success: {
      fill: { type: 'solid' as const, color: '#d1fae5' },
      stroke: { type: 'solid' as const, color: '#10b981', width: 2 },
      typography: { fontSize: 14, fontWeight: 600, color: '#047857' }
    }
  };

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3>Click Counter with Custom Action</h3>
      <p>Click the button to count clicks. It changes appearance based on count!</p>
      <p>Current count: <strong>{clickCount}</strong></p>
      <Frame
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 160, height: 40 }}
        appearance={{ radius: 6 }}
        animation={{ trigger: 'onClick', action: counterAction, animation: 'dissolve', duration: 200 }}
      >
        Click to Count!
      </Frame>
    </div>
  );
};

export const CursorDemo = () => (
  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
    <h3>Automatic Cursor Detection</h3>
    <p>Frames with interactive triggers automatically get pointer cursors</p>

    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Click Trigger (pointer cursor)</label>
        <Frame
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 40 }}
          fill={{ type: 'solid', color: '#f3f4f6' }}
          stroke={{ color: '#d1d5db', weight: 1 }}
          appearance={{ radius: 6 }}
          animation={{
            trigger: 'onClick',
            action: 'changeTo',
            destination: 'active',
            animation: 'dissolve',
            duration: 200,
          }}
        >
          Click Me
        </Frame>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Hover Trigger (pointer cursor)</label>
        <Frame
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 40 }}
          fill={{ type: 'solid', color: '#f3f4f6' }}
          stroke={{ color: '#d1d5db', weight: 1 }}
          appearance={{ radius: 6 }}
          animation={{
            trigger: 'onHover',
            action: 'changeTo',
            destination: 'hover',
            animation: 'dissolve',
            duration: 150,
          }}
        >
          Hover Me
        </Frame>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Manual Cursor Override (grab)</label>
        <Frame
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 40 }}
          fill={{ type: 'solid', color: '#f3f4f6' }}
          stroke={{ color: '#d1d5db', weight: 1 }}
          appearance={{ radius: 6 }}
          animation={{
            trigger: 'onClick',
            action: 'changeTo',
            destination: 'active',
            animation: 'dissolve',
            duration: 200,
            cursor: 'grab', // Manual override
          }}
        >
          Grab Me
        </Frame>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>No Trigger (default cursor)</label>
        <Frame
          autoLayout={{ width: 120, height: 40, flow: 'horizontal', alignment: 'center' }}
          fill={{ type: 'solid', color: '#f3f4f6' }}
          stroke={{ color: '#d1d5db', weight: 1 }}
          appearance={{ radius: 6 }}
        >
          Static
        </Frame>
      </div>
    </div>
  </div>
);

export const PolymorphicFrame = () => (
  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
    <h3>Polymorphic Frame - Render as Different Elements</h3>
    <p>Use the 'as' prop to render Frame as any HTML element</p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <label style={{ minWidth: 120 }}>Default (div):</label>
        <Frame
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 36 }}
          fill={{ type: 'solid', color: '#f3f4f6' }}
          stroke={{ color: '#d1d5db', weight: 1 }}
          appearance={{ radius: 4 }}
          animation={{
            trigger: 'onClick',
            action: 'changeTo',
            destination: 'active',
            animation: 'dissolve',
            duration: 200,
          }}
        >
          I'm a div
        </Frame>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <label style={{ minWidth: 120 }}>As button:</label>
        <Frame
          as="button"
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 36 }}
          fill={{ type: 'solid', color: '#f3f4f6' }}
          stroke={{ color: '#d1d5db', weight: 1 }}
          appearance={{ radius: 4 }}
          animation={{
            trigger: 'onClick',
            action: 'changeTo',
            destination: 'active',
            animation: 'dissolve',
            duration: 200,
          }}
        >
          I'm a button
        </Frame>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <label style={{ minWidth: 120 }}>As span:</label>
        <Frame
          as="span"
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 36 }}
          fill={{ type: 'solid', color: '#f3f4f6' }}
          stroke={{ color: '#d1d5db', weight: 1 }}
          appearance={{ radius: 4 }}
          animation={{
            trigger: 'onClick',
            action: 'changeTo',
            destination: 'active',
            animation: 'dissolve',
            duration: 200,
          }}
        >
          I'm a span
        </Frame>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <label style={{ minWidth: 120 }}>As section:</label>
        <Frame
          as="section"
          variants={buttonVariants}
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 200, height: 50 }}
          fill={{ type: 'solid', color: '#f0f9ff' }}
          stroke={{ color: '#0ea5e9', weight: 1 }}
          appearance={{ radius: 6 }}
          animation={{
            trigger: 'onClick',
            action: 'changeTo',
            destination: 'active',
            animation: 'dissolve',
            duration: 300,
          }}
        >
          I'm a section element
        </Frame>
      </div>
    </div>
  </div>
);






