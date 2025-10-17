import React from 'react';
import { Frame, FrameProps } from '../../atoms/frame/Frame';
import { FrameStateProps } from '../../atoms/frame/states/states';

export type ButtonState = 
  | 'default'      // Default state
  | 'hover'        // Hover state
  | 'click1'       // First click state
  | 'click2'       // Second click state
  | 'click3'       // Third click state
  | 'disabled';    // Disabled state

export interface ButtonProps extends Omit<FrameProps, 'state' | 'states'> {
  children?: React.ReactNode;
  state?: ButtonState;
  variant?: 'primary' | 'secondary';
}

/**
 * Button component - pure Frame wrapper with button-specific states
 * Animates between default, hover, and active states on interactions
 */
export const Button = (props: ButtonProps) => {
  const {
    state = 'default',
    variant = 'primary',
    children,
    ...frameProps
  } = props;


  const buttonStates: { [key: string]: FrameStateProps } = {
    default: {
      autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, width: 200, height: 40, padding: { left: 16, right: 16 } },
      appearance: { radius: 6 },
      fill: { type: 'solid' as const, color: 'primary2' },
      typography: { color: 'primary1', fontWeight: 500 },
      animation: [
        {
          trigger: 'mouseEnter',
          action: 'changeTo',
          destination: 'hover',
          animation: 'dissolve',
          duration: 150
        },
        {
          trigger: 'click',
          action: 'changeTo',
          destination: 'click1',
          animation: 'dissolve',
          duration: 100
        }
      ]
    },
    hover: {
      autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, width: 200, height: 40, padding: { left: 16, right: 16 } },
      appearance: { radius: 6 },
      fill: { type: 'solid' as const, color: 'primary1' },
      typography: { color: 'primary1', fontWeight: 600 },
      animation: [
        {
          trigger: 'mouseLeave',
          action: 'changeTo',
          destination: 'default',
          animation: 'dissolve',
          duration: 150
        },
        {
          trigger: 'click',
          action: 'changeTo',
          destination: 'click1',
          animation: 'dissolve',
          duration: 100
        }
      ]
    },
    click1: {
      autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, width: 200, height: 40, padding: { left: 16, right: 16 } },
      appearance: { radius: 6 },
      fill: { type: 'solid' as const, color: 'success5' },
      typography: { color: 'primary1', fontWeight: 500 },
      animation: [
        {
          trigger: 'click',
          action: 'changeTo',
          destination: 'click2',
          animation: 'dissolve',
          duration: 100
        }
      ]
    },
    click2: {
      autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, width: 200, height: 40, padding: { left: 16, right: 16 } },
      appearance: { radius: 6 },
      fill: { type: 'solid' as const, color: 'success4' },
      typography: { color: 'primary1', fontWeight: 500 },
      animation: [
        {
          trigger: 'click',
          action: 'changeTo',
          destination: 'click3',
          animation: 'dissolve',
          duration: 100
        }
      ]
    },
    click3: {
      autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, width: 200, height: 40, padding: { left: 16, right: 16 } },
      appearance: { radius: 6 },
      fill: { type: 'solid' as const, color: 'success3' },
      typography: { color: 'primary1', fontWeight: 500 },
      animation: [
        {
          trigger: 'mouseEnter',
          action: 'changeTo',
          destination: 'default',
          animation: 'dissolve',
          duration: 150
        }
      ]
    },
    disabled: {
      autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, width: 200, height: 40, padding: { left: 16, right: 16 } },
      appearance: { radius: 6, opacity: 0.5 },
      fill: { type: 'solid' as const, color: 'neutral4' },
      typography: { color: 'neutral6', fontWeight: 500 }
    }
  };

  return (
    <Frame
      {...frameProps}
      state={state}
      states={buttonStates}
    >
      {children}
    </Frame>
  );
};

Button.displayName = 'Button';
