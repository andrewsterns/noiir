import React, { useState } from 'react';
import { Frame } from '../../Frame';

export default {
  title: 'Frame/Animation/Actions',
  component: Frame,
  parameters: {
    docs: {
      description: {
        component: 'Animation action demonstrations. See how different actions affect frame behavior and state.',
      },
    },
  },
};

// Common variants for action demonstrations
const actionVariants = {
  default: {
    fill: { type: 'solid' as const, color: 'neutral2' },
    stroke: { type: 'solid' as const, color: 'neutral4', width: 1 },
    typography: { fontSize: 14, fontWeight: 500, color: 'neutral9' }
  },
  active: {
    fill: { type: 'solid' as const, color: 'primary2' },
    stroke: { type: 'solid' as const, color: 'primary6', width: 2 },
    typography: { fontSize: 14, fontWeight: 600, color: 'primary8' }
  },
  success: {
    fill: { type: 'solid' as const, color: 'success2' },
    stroke: { type: 'solid' as const, color: 'success6', width: 2 },
    typography: { fontSize: 14, fontWeight: 600, color: 'success8' }
  },
  warning: {
    fill: { type: 'solid' as const, color: 'warning2' },
    stroke: { type: 'solid' as const, color: 'warning6', width: 2 },
    typography: { fontSize: 14, fontWeight: 600, color: 'warning9' }
  },
  danger: {
    fill: { type: 'solid' as const, color: 'error2' },
    stroke: { type: 'solid' as const, color: 'error6', width: 2 },
    typography: { fontSize: 14, fontWeight: 600, color: 'error7' }
  },
};

export const ChangeToAction = () => (
  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3>Change To Action - Switch to Specific Variant</h3>
    <p>Click to change to the 'active' variant</p>

    <Frame
      variants={actionVariants}
      autoLayout={{ flow: 'horizontal', alignment: 'center', width: 160, height: 40 }}
      appearance={{ radius: 6 }}
      animation={[
        {
          trigger: 'onClick',
          action: 'changeTo',
          destination: 'active',
          animation: 'dissolve',
          duration: 300,
        }
      ]}
    >
      Change to Active
    </Frame>
  </div>
);

export const CycleVariantsAction = () => (
  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3>Cycle Variants Action - Cycle Through All States</h3>
    <p>Click to cycle through: default → active → success → warning → danger → default...</p>

    <Frame
      variants={actionVariants}
      autoLayout={{ flow: 'horizontal', alignment: 'center', width: 180, height: 40 }}
      appearance={{ radius: 6 }}
      animation={[
        {
          trigger: 'onClick',
          action: 'cycleVariants',
          animation: 'dissolve',
          duration: 300,
        }
      ]}
    >
      Cycle States
    </Frame>
  </div>
);

export const CustomFunctionAction = () => {
  const [clickCount, setClickCount] = useState(0);

  // Custom action that counts clicks and changes appearance based on count
  const counterAction = (context: import('../types').AnimationContext) => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Determine variant based on click count
    let variant = 'default';
    if (newCount >= 10) variant = 'success';
    else if (newCount >= 5) variant = 'warning';
    else if (newCount >= 1) variant = 'active';

    return { variant };
  };

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3>Custom Function Action - Complex Logic</h3>
      <p>Click counter with custom logic. Changes appearance based on count!</p>
      <p>Current count: <strong>{clickCount}</strong></p>

      <Frame
        variants={actionVariants}
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 160, height: 40 }}
        appearance={{ radius: 6 }}
        animation={[
          {
            trigger: 'onClick',
            action: counterAction,
            animation: 'dissolve',
            duration: 200,
          }
        ]}
      >
        Click to Count!
      </Frame>
    </div>
  );
};

export const OpenLinkAction = () => (
  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3>Open Link Action - Open External URLs</h3>
    <p>Click to open Google in a new tab</p>

    <Frame
      variants={actionVariants}
      autoLayout={{ flow: 'horizontal', alignment: 'center', width: 160, height: 40 }}
      appearance={{ radius: 6 }}
      animation={{
        trigger: 'onClick',
        action: 'openLink',
        destination: 'https://www.google.com',
        animation: 'dissolve',
        duration: 200,
      }}
    >
      Open Google
    </Frame>
  </div>
);

export const ConditionalAction = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  // Conditional action that only works when enabled
  const conditionalAction = (context: import('../types').AnimationContext) => {
    if (isEnabled) {
      return { variant: 'success' };
    }
    return { variant: 'danger' };
  };

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3>Conditional Action - Logic-Based Actions</h3>
      <p>Custom function with conditional logic</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <label>
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
          />
          Enabled
        </label>
      </div>

      <Frame
        variants={actionVariants}
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 160, height: 40 }}
        appearance={{ radius: 6 }}
        animation={{
          trigger: 'onClick',
          action: conditionalAction,
          animation: 'dissolve',
          duration: 300,
        }}
      >
        Test Condition
      </Frame>

      <p style={{ fontSize: 14, color: '#6b7280' }}>
        {isEnabled ? 'Will show success state' : 'Will show danger state'}
      </p>
    </div>
  );
};

export const MultipleActionsDemo = () => {
  const [actionLog, setActionLog] = useState<string[]>([]);

  // Custom action that logs and changes state
  const loggingAction = (context: import('../types').AnimationContext) => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = `${timestamp}: Action triggered`;
    setActionLog(prev => [newLog, ...prev.slice(0, 4)]); // Keep last 5 entries

    return { variant: 'active' };
  };

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3>Multiple Actions Demo - Combined Behaviors</h3>
      <p>Custom action that logs events and changes appearance</p>

      <Frame
        variants={actionVariants}
        autoLayout={{ flow: 'horizontal', alignment: 'center', width: 180, height: 40 }}
        appearance={{ radius: 6 }}
        animation={{
          trigger: 'onClick',
          action: loggingAction,
          animation: 'dissolve',
          duration: 300,
        }}
      >
        Log & Change
      </Frame>

      <div style={{ marginTop: 16 }}>
        <h4>Action Log:</h4>
        <div style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: 6,
          padding: 12,
          fontFamily: 'monospace',
          fontSize: 12,
          maxHeight: 120,
          overflowY: 'auto'
        }}>
          {actionLog.length === 0 ? (
            <div style={{ color: '#9ca3af' }}>No actions logged yet</div>
          ) : (
            actionLog.map((log, index) => (
              <div key={index} style={{ marginBottom: 4 }}>{log}</div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const ActionComparison = () => (
  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
    <h3>Action Types Comparison</h3>
    <p>See different action types side by side</p>

    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>changeTo Action</label>
        <Frame
          variants={actionVariants}
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 36 }}
          appearance={{ radius: 4 }}
          animation={{
            trigger: 'onClick',
            action: 'changeTo',
            destination: 'active',
            animation: 'dissolve',
            duration: 300,
          }}
        >
          To Active
        </Frame>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>cycleVariants Action</label>
        <Frame
          variants={actionVariants}
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 36 }}
          appearance={{ radius: 4 }}
          animation={{
            trigger: 'onClick',
            action: 'cycleVariants',
            animation: 'dissolve',
            duration: 300,
          }}
        >
          Cycle
        </Frame>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>Custom Function</label>
        <Frame
          variants={actionVariants}
          autoLayout={{ flow: 'horizontal', alignment: 'center', width: 120, height: 36 }}
          appearance={{ radius: 4 }}
          animation={{
            trigger: 'onClick',
            action: () => ({ variant: 'success' }),
            animation: 'dissolve',
            duration: 300,
          }}
        >
          Custom
        </Frame>
      </div>
    </div>
  </div>
);


