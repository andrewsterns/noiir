import React from 'react';
import { Frame } from '../../Frame';

export default {
  title: 'Frame/Animation/Action',
  component: Frame,
  parameters: {
    docs: {
      description: {
        component: 'Action demonstrations - testing different animation actions like changeTo, cycleVariants, etc.',
      },
    },
  },
};

// Common variants for action testing
const actionVariants = {
  default: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 16, width: 150, height: 50 },
    fill: { type: 'solid' as const, color: 'neutral2' },
    stroke: { type: 'solid' as const, color: 'neutral4', width: 1 },
    appearance: { radius: 8 },
    typography: { fontSize: 14, fontWeight: 500, color: 'neutral9' }
  },
  primary: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 16, width: 150, height: 50 },
    fill: { type: 'solid' as const, color: 'primary3' },
    stroke: { type: 'solid' as const, color: 'primary6', width: 2 },
    appearance: { radius: 8 },
    typography: { fontSize: 14, fontWeight: 600, color: 'primary8' }
  },
  success: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 16, width: 150, height: 50 },
    fill: { type: 'solid' as const, color: 'success3' },
    stroke: { type: 'solid' as const, color: 'success6', width: 2 },
    appearance: { radius: 8 },
    typography: { fontSize: 14, fontWeight: 600, color: 'success8' }
  },
  warning: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 16, width: 150, height: 50 },
    fill: { type: 'solid' as const, color: 'warning3' },
    stroke: { type: 'solid' as const, color: 'warning6', width: 2 },
    appearance: { radius: 8 },
    typography: { fontSize: 14, fontWeight: 600, color: 'warning9' }
  },
  danger: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, padding: 16, width: 150, height: 50 },
    fill: { type: 'solid' as const, color: 'error3' },
    stroke: { type: 'solid' as const, color: 'error6', width: 2 },
    appearance: { radius: 8 },
    typography: { fontSize: 14, fontWeight: 600, color: 'error7' }
  }
};

export const ChangeToAction = () => (
  <div style={{ padding: 20 }}>
    <h3>Change To Action</h3>
    <p>Click to change to the 'primary' variant</p>
    <Frame
      variant="default"
      variants={actionVariants}
      animation={{
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'primary',
        animation: 'dissolve',
        duration: 300
      }}
    >
      Change to Primary
    </Frame>
  </div>
);

export const ChangeToDifferentDestinations = () => (
  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3>Change To - Different Destinations</h3>
    <p>Each button changes to a different variant on click</p>

    <Frame
      variant="default"
      variants={actionVariants}
      animation={{
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'success',
        animation: 'dissolve',
        duration: 300
      }}
    >
      To Success
    </Frame>

    <Frame
      variant="default"
      variants={actionVariants}
      animation={{
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'warning',
        animation: 'dissolve',
        duration: 300
      }}
    >
      To Warning
    </Frame>

    <Frame
      variant="default"
      variants={actionVariants}
      animation={{
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'danger',
        animation: 'dissolve',
        duration: 300
      }}
    >
      To Danger
    </Frame>
  </div>
);

export const MultipleActions = () => (
  <div style={{ padding: 20 }}>
    <h3>Multiple Actions</h3>
    <p>Hover changes to primary, click changes to success</p>
    <Frame
      variant="default"
      variants={actionVariants}
      animation={[
        {
          trigger: 'onHover',
          action: 'changeTo',
          destination: 'primary',
          animation: 'dissolve',
          duration: 200
        },
        {
          trigger: 'onClick',
          action: 'changeTo',
          destination: 'success',
          animation: 'dissolve',
          duration: 300
        }
      ]}
    >
      Hover + Click Actions
    </Frame>
  </div>
);

export const ActionWithCursor = () => (
  <div style={{ padding: 20 }}>
    <h3>Action with Cursor Change</h3>
    <p>Hover changes cursor and variant</p>
    <Frame
      variant="default"
      variants={actionVariants}
      animation={{
        trigger: 'onHover',
        action: 'changeTo',
        destination: 'primary',
        animation: 'dissolve',
        duration: 200
      }}
    >
      Hover for Primary Variant
    </Frame>
  </div>
);